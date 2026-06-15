/**
 * Extracts the type-relevant shape of a Luau module from its source:
 *   - `export type` / `type` aliases
 *   - the module's return shape (a table of members, a single re-export, a
 *     single value, or nothing)
 *
 * It does NOT do filesystem work — `require(script.x)` members are reported as
 * pending re-export targets for the resolver to follow one hop.
 */

import { tokenize, type Token } from "./lexer.ts";
import { parseTypeExpression, type LuauType } from "./type-parser.ts";

export interface ExtractedTypeAlias {
  name: string;
  typeParams: string[];
  type: LuauType;
  exported: boolean;
}

export type MemberValue =
  | { kind: "type"; type: LuauType }
  | { kind: "require"; target: string };

export interface ExtractedMember {
  name: string;
  value: MemberValue;
}

export type ModuleShape =
  | { kind: "object"; members: ExtractedMember[] }
  | { kind: "reexport"; target: string }
  | { kind: "value"; type: LuauType }
  | { kind: "none" };

export interface ExtractedModule {
  typeAliases: ExtractedTypeAlias[];
  shape: ModuleShape;
}

// Keywords that end a type expression when seen at bracket depth 0.
const TYPE_BOUNDARY = new Set([
  "local", "function", "return", "export", "type", "end", "do", "then",
  "else", "elseif", "until", "if", "for", "while", "repeat", "in",
]);

// Type-expression brackets — include `<>` for generic arguments.
const OPENERS: Record<string, string> = { "{": "}", "(": ")", "[": "]", "<": ">" };
const CLOSERS = new Set(["}", ")", "]", ">"]);

// Statement-level brackets — exclude `<>`, which are comparison operators in
// ordinary Lua code (`if i < n`, `while x > 0`). Using the type set here would
// corrupt the bracket depth on every comparison.
const STMT_OPENERS: Record<string, string> = { "{": "}", "(": ")", "[": "]" };
const STMT_CLOSERS = new Set(["}", ")", "]"]);

function isPunct(t: Token | undefined, v: string): boolean {
  return t?.type === "punct" && t.value === v;
}

/**
 * Walk forward from `start` collecting a generous token span for a type
 * expression. Over-collecting is safe: the type parser only consumes the valid
 * prefix and ignores the rest.
 */
function collectTypeSpan(tokens: Token[], start: number): number {
  let i = start;
  let depth = 0;
  while (i < tokens.length) {
    const t = tokens[i]!;
    if (t.type === "punct" && OPENERS[t.value]) {
      depth++;
    } else if (t.type === "punct" && CLOSERS.has(t.value)) {
      if (depth === 0) break;
      depth--;
    } else if (depth === 0 && t.type === "name" && TYPE_BOUNDARY.has(t.value)) {
      break;
    } else if (depth === 0 && isPunct(t, "=") ) {
      break;
    }
    i++;
  }
  return i;
}

/** Find the matching close for an opener at `start`, returning its index. */
function matchBalanced(tokens: Token[], start: number): number {
  const open = tokens[start]!.value;
  const close = OPENERS[open]!;
  let depth = 0;
  for (let i = start; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (t.type === "punct" && t.value === open) depth++;
    else if (t.type === "punct" && t.value === close) {
      depth--;
      if (depth === 0) return i;
    }
  }
  return tokens.length - 1;
}

/**
 * Split a token slice at top-level occurrences of any separator punct.
 * Defaults to type-expression brackets (with `<>` for generics); pass `stmt`
 * to split value expressions where `<`/`>` are comparison operators.
 */
function splitTopLevel(tokens: Token[], seps: string[], stmt = false): Token[][] {
  const openers = stmt ? STMT_OPENERS : OPENERS;
  const closers = stmt ? STMT_CLOSERS : CLOSERS;
  const groups: Token[][] = [];
  let current: Token[] = [];
  let depth = 0;
  for (const t of tokens) {
    if (t.type === "punct" && openers[t.value]) depth++;
    else if (t.type === "punct" && closers.has(t.value)) depth = Math.max(0, depth - 1);
    if (depth === 0 && t.type === "punct" && seps.includes(t.value)) {
      groups.push(current);
      current = [];
    } else {
      current.push(t);
    }
  }
  if (current.length) groups.push(current);
  return groups;
}

/** Parse generic params `<T, U, V>` starting at `<`, returning names + end index. */
function parseGenericParams(tokens: Token[], start: number): { params: string[]; end: number } {
  const params: string[] = [];
  const close = matchBalanced(tokens, start);
  const inner = tokens.slice(start + 1, close);
  for (const group of splitTopLevel(inner, [","])) {
    const nameTok = group.find((t) => t.type === "name");
    if (nameTok) params.push(nameTok.value);
  }
  return { params, end: close };
}

/** Build a Luau function type from a declaration's `(params)` and `: ret`. */
function parseFunctionDecl(
  tokens: Token[],
  parenStart: number
): { type: LuauType; end: number } {
  const parenEnd = matchBalanced(tokens, parenStart);
  const paramTokens = tokens.slice(parenStart + 1, parenEnd);
  const params = splitTopLevel(paramTokens, [","])
    .filter((g) => g.length > 0)
    .map((g) => {
      if (isPunct(g[0], "...")) {
        return { type: parseTypeExpression(g.slice(1)), variadic: true };
      }
      if (g[0]?.type === "name" && isPunct(g[1], ":")) {
        return { name: g[0].value, type: parseTypeExpression(g.slice(2)) };
      }
      return { type: parseTypeExpression(g) };
    });

  let end = parenEnd;
  let returns: LuauType[] = [{ kind: "any" }];
  if (isPunct(tokens[parenEnd + 1], ":")) {
    const retStart = parenEnd + 2;
    const retEnd = collectTypeSpan(tokens, retStart);
    returns = [parseTypeExpression(tokens.slice(retStart, retEnd))];
    end = retEnd - 1;
  }
  return { type: { kind: "function", params, returns }, end };
}

/** Last child segment of a `require(script....)` expression, or null. */
function requireTarget(tokens: Token[]): string | null {
  // Find `require` `(` … `)` and take the last string/name child segment.
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i]?.type === "name" && tokens[i]!.value === "require" && isPunct(tokens[i + 1], "(")) {
      const end = matchBalanced(tokens, i + 1);
      const inner = tokens.slice(i + 2, end);
      // Reject cross-package redirects (script.Parent._Index[...]).
      if (inner.some((t) => t.value === "_Index" || t.value === "Parent")) return null;
      let last: string | null = null;
      for (let j = 0; j < inner.length; j++) {
        const t = inner[j]!;
        if (t.type === "string") last = t.value;
        else if (t.type === "name" && t.value !== "script" && t.value !== "require" &&
                 t.value !== "WaitForChild" && t.value !== "FindFirstChild") {
          last = t.value;
        }
      }
      return last;
    }
  }
  return null;
}

function classifyValue(valueTokens: Token[], localFuncs: Map<string, LuauType>, localRequires: Map<string, string>): MemberValue {
  const first = valueTokens[0];
  if (!first) return { kind: "type", type: { kind: "any" } };

  if (first.type === "name" && first.value === "require") {
    const target = requireTarget(valueTokens);
    if (target) return { kind: "require", target };
    return { kind: "type", type: { kind: "any" } };
  }
  if (first.type === "name" && first.value === "function" && isPunct(valueTokens[1], "(")) {
    return { kind: "type", type: parseFunctionDecl(valueTokens, 1).type };
  }
  if (first.type === "string") return { kind: "type", type: { kind: "name", name: "string", typeArgs: [] } };
  if (first.type === "number") return { kind: "type", type: { kind: "name", name: "number", typeArgs: [] } };
  if (first.type === "name" && (first.value === "true" || first.value === "false")) {
    return { kind: "type", type: { kind: "name", name: "boolean", typeArgs: [] } };
  }
  if (first.type === "name") {
    const fn = localFuncs.get(first.value);
    if (fn) return { kind: "type", type: fn };
    const req = localRequires.get(first.value);
    if (req) return { kind: "require", target: req };
  }
  return { kind: "type", type: { kind: "any" } };
}

function parseObjectLiteral(
  tokens: Token[],
  braceStart: number,
  localFuncs: Map<string, LuauType>,
  localRequires: Map<string, string>
): ExtractedMember[] {
  const end = matchBalanced(tokens, braceStart);
  const inner = tokens.slice(braceStart + 1, end);
  const members: ExtractedMember[] = [];
  for (const entry of splitTopLevel(inner, [",", ";"], true)) {
    if (entry.length === 0) continue;
    // key = value  (key is `name` or ["name"])
    let name: string | null = null;
    let valueStart = 0;
    if (entry[0]?.type === "name" && isPunct(entry[1], "=")) {
      name = entry[0].value;
      valueStart = 2;
    } else if (isPunct(entry[0], "[") && entry[1]?.type === "string" && isPunct(entry[2], "]") && isPunct(entry[3], "=")) {
      name = entry[1]!.value;
      valueStart = 4;
    }
    if (name === null) continue;
    members.push({ name, value: classifyValue(entry.slice(valueStart), localFuncs, localRequires) });
  }
  return members;
}

export function extractModule(source: string): ExtractedModule {
  const tokens = tokenize(source);
  const typeAliases: ExtractedTypeAlias[] = [];
  const localFuncs = new Map<string, LuauType>();
  const localRequires = new Map<string, string>();
  // Members assigned onto a table var: ownerVar -> [{name, value}]
  const tableMembers = new Map<string, ExtractedMember[]>();
  const tableVars = new Set<string>();
  let returnStart = -1;

  // Lua has no statement brackets, so we track block nesting by keyword to know
  // when a declaration/return is genuinely at module top level (e.g. ignoring
  // `return` statements inside function bodies). Block depth is only adjusted at
  // bracket depth 0 — function literals inside tables stay balanced internally.
  let bracketDepth = 0;
  let blockDepth = 0;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (t.type === "punct" && STMT_OPENERS[t.value]) { bracketDepth++; continue; }
    if (t.type === "punct" && STMT_CLOSERS.has(t.value)) { bracketDepth = Math.max(0, bracketDepth - 1); continue; }
    if (bracketDepth !== 0 || t.type !== "name") continue;

    // Block closers/openers. `do` opens loop bodies (for/while) AND standalone
    // do-blocks, so it is the opener we count; `for`/`while` headers themselves
    // are not counted to avoid double-counting their trailing `do`.
    if (t.value === "end" || t.value === "until") { blockDepth = Math.max(0, blockDepth - 1); continue; }
    if (t.value === "if" || t.value === "do" || t.value === "repeat") { blockDepth++; continue; }

    const topLevel = blockDepth === 0;

    // export type / type alias
    if (topLevel && ((t.value === "export" && tokens[i + 1]?.value === "type") || t.value === "type")) {
      const exported = t.value === "export";
      const nameIdx = exported ? i + 2 : i + 1;
      const nameTok = tokens[nameIdx];
      if (nameTok?.type !== "name") continue;
      let typeParams: string[] = [];
      let cursor = nameIdx + 1;
      if (isPunct(tokens[cursor], "<")) {
        const g = parseGenericParams(tokens, cursor);
        typeParams = g.params;
        cursor = g.end + 1;
      }
      if (!isPunct(tokens[cursor], "=")) continue;
      const rhsStart = cursor + 1;
      const rhsEnd = collectTypeSpan(tokens, rhsStart);
      const type = parseTypeExpression(tokens.slice(rhsStart, rhsEnd));
      typeAliases.push({ name: nameTok.value, typeParams, type, exported });
      i = rhsEnd - 1;
      continue;
    }

    // local function name(...) — opens a body block.
    if (topLevel && t.value === "local" && tokens[i + 1]?.value === "function" && tokens[i + 2]?.type === "name" && isPunct(tokens[i + 3], "(")) {
      const fnName = tokens[i + 2]!.value;
      const fn = parseFunctionDecl(tokens, i + 3);
      localFuncs.set(fnName, fn.type);
      i = fn.end;
      blockDepth++;
      continue;
    }

    // local name = require(...) / local name = {}
    if (topLevel && t.value === "local" && tokens[i + 1]?.type === "name" && isPunct(tokens[i + 2], "=")) {
      const varName = tokens[i + 1]!.value;
      const rhs = tokens[i + 3];
      if (rhs?.type === "name" && rhs.value === "require") {
        const target = requireTarget(tokens.slice(i + 3, collectStatementEnd(tokens, i + 3)));
        if (target) localRequires.set(varName, target);
      } else if (rhs?.type === "name" && rhs.value === "function" && isPunct(tokens[i + 4], "(")) {
        // local foo = function(...) ... end — opens a body block.
        const fn = parseFunctionDecl(tokens, i + 4);
        localFuncs.set(varName, fn.type);
        i = fn.end;
        blockDepth++;
      } else if (isPunct(rhs, "{")) {
        tableVars.add(varName);
      }
      continue;
    }

    // function Owner.field(...) / function Owner:field(...) — opens a body block.
    // Not gated on top level: members are sometimes defined inside a `do` block
    // to scope upvalues, but they still assign to the module table.
    if (t.value === "function" && tokens[i + 1]?.type === "name" &&
        (isPunct(tokens[i + 2], ".") || isPunct(tokens[i + 2], ":")) &&
        tokens[i + 3]?.type === "name" && isPunct(tokens[i + 4], "(")) {
      const owner = tokens[i + 1]!.value;
      const field = tokens[i + 3]!.value;
      const fn = parseFunctionDecl(tokens, i + 4);
      const list = tableMembers.get(owner) ?? [];
      list.push({ name: field, value: { kind: "type", type: fn.type } });
      tableMembers.set(owner, list);
      i = fn.end;
      blockDepth++;
      continue;
    }

    // Any other `function` (named or anonymous) opens a body block.
    if (t.value === "function") { blockDepth++; continue; }

    // Owner.field = value (gated by tableVars, so only module-table assignments;
    // not gated on top level, matching the function-member rule above).
    if (t.value !== "local" && tokens[i + 1] && isPunct(tokens[i + 1], ".") &&
        tokens[i + 2]?.type === "name" && isPunct(tokens[i + 3], "=") && tableVars.has(t.value)) {
      const owner = t.value;
      const field = tokens[i + 2]!.value;
      const stmtEnd = collectStatementEnd(tokens, i + 4);
      const value = classifyValue(tokens.slice(i + 4, stmtEnd), localFuncs, localRequires);
      const list = tableMembers.get(owner) ?? [];
      list.push({ name: field, value });
      tableMembers.set(owner, list);
      continue;
    }

    if (topLevel && t.value === "return") {
      returnStart = i + 1;
    }
  }

  const shape = analyzeReturn(tokens, returnStart, tableMembers, localFuncs, localRequires);
  return { typeAliases, shape };
}

/** Find where a simple statement ends: the next top-level statement keyword. */
function collectStatementEnd(tokens: Token[], start: number): number {
  let i = start;
  let depth = 0;
  while (i < tokens.length) {
    const t = tokens[i]!;
    if (t.type === "punct" && STMT_OPENERS[t.value]) depth++;
    else if (t.type === "punct" && STMT_CLOSERS.has(t.value)) depth = Math.max(0, depth - 1);
    else if (depth === 0 && t.type === "name" &&
             (t.value === "local" || t.value === "function" || t.value === "return" ||
              t.value === "export" || t.value === "end")) break;
    i++;
  }
  return i;
}

function analyzeReturn(
  tokens: Token[],
  returnStart: number,
  tableMembers: Map<string, ExtractedMember[]>,
  localFuncs: Map<string, LuauType>,
  localRequires: Map<string, string>
): ModuleShape {
  if (returnStart < 0 || returnStart >= tokens.length) return { kind: "none" };
  const first = tokens[returnStart]!;

  // return { ... }
  if (isPunct(first, "{")) {
    return { kind: "object", members: parseObjectLiteral(tokens, returnStart, localFuncs, localRequires) };
  }

  // return function(...) ... end  (anonymous default export)
  if (first.type === "name" && first.value === "function" && isPunct(tokens[returnStart + 1], "(")) {
    return { kind: "value", type: parseFunctionDecl(tokens, returnStart + 1).type };
  }

  // return require(...)
  if (first.type === "name" && first.value === "require") {
    const target = requireTarget(tokens.slice(returnStart, collectStatementEnd(tokens, returnStart)));
    if (target) return { kind: "reexport", target };
    return { kind: "value", type: { kind: "any" } };
  }

  // return <identifier>
  if (first.type === "name") {
    const id = first.value;
    if (tableMembers.has(id)) return { kind: "object", members: tableMembers.get(id)! };
    if (localRequires.has(id)) return { kind: "reexport", target: localRequires.get(id)! };
    if (localFuncs.has(id)) return { kind: "value", type: localFuncs.get(id)! };
  }

  return { kind: "none" };
}
