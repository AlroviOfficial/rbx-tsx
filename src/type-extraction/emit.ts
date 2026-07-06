/**
 * Maps the extracted Luau type AST to TypeScript source and assembles the
 * `declare module` block for a package.
 */

import type { LuauType } from "./type-parser.ts";
import type { ExtractedMember, ExtractedModule, ExtractedTypeAlias } from "./module-extractor.ts";

/** Direct Luau primitive → TS primitive mappings. */
const PRIMITIVES: Record<string, string> = {
  string: "string",
  number: "number",
  boolean: "boolean",
  nil: "undefined",
  any: "any",
  unknown: "unknown",
  never: "never",
  void: "void",
  thread: "unknown",
  buffer: "unknown",
  // Roblox value types are declared globally by the bundled types.
};

/**
 * Well-known generic aliases from the jsdotlua / luau-polyfill ecosystem that
 * have clean TS equivalents. Resolves the cross-module-reference gap cheaply
 * for the most common cases without full resolution.
 */
function knownAlias(name: string, args: string[]): string | null {
  // Qualified names (ES7Types.Array) match on their final segment.
  const base = name.includes(".") ? name.slice(name.lastIndexOf(".") + 1) : name;
  switch (base) {
    case "Array":
      return args.length === 1 ? arrayElement(args[0]!) : "any[]";
    case "Map":
      return args.length === 2 ? `Map<${args[0]}, ${args[1]}>` : "Map<any, any>";
    case "Set":
      return args.length === 1 ? `Set<${args[0]}>` : "Set<any>";
    case "WeakMap":
      return args.length === 2 ? `WeakMap<${args[0]}, ${args[1]}>` : "WeakMap<any, any>";
    case "Object":
      return "Record<string, any>";
    case "Function":
      return "(...args: any[]) => any";
    default:
      return null;
  }
}

export function luauTypeToTS(type: LuauType, knownNames: Set<string>): string {
  switch (type.kind) {
    case "any":
      return "any";
    case "unknown":
      return "unknown";
    case "optional":
      return `${luauTypeToTS(type.inner, knownNames)} | undefined`;
    case "literal":
      if (type.literalKind === "string") return JSON.stringify(type.value);
      return type.value;
    case "union": {
      const parts = [...new Set(type.types.map((t) => luauTypeToTS(t, knownNames)))];
      if (parts.includes("any")) return "any";
      return parts.length === 1 ? parts[0]! : parts.join(" | ");
    }
    case "intersection":
      return type.types.map((t) => luauTypeToTS(t, knownNames)).join(" & ");
    case "tuple":
      if (type.types.length === 0) return "void";
      return `[${type.types.map((t) => luauTypeToTS(t, knownNames)).join(", ")}]`;
    case "function": {
      // Type parameters of a generic function are in scope for its signature.
      const scoped = type.typeParams?.length
        ? new Set([...knownNames, ...type.typeParams])
        : knownNames;
      // Drop a leading `self` param: methods are called with rbx-tsx's colon
      // convention (`obj.method(args)` → `obj:method(args)`), which binds the
      // receiver as self — passing it explicitly would double it at runtime.
      const effectiveParams =
        type.params[0]?.name === "self" ? type.params.slice(1) : type.params;
      const params = effectiveParams.map((p, idx) => {
        const name = safeParamName(p.name ?? `arg${idx}`);
        if (p.variadic) return `...${name}: ${luauTypeToTS(p.type, scoped)}[]`;
        return `${name}: ${luauTypeToTS(p.type, scoped)}`;
      });
      const ret =
        type.returns.length === 0
          ? "void"
          : type.returns.length === 1
            ? luauTypeToTS(type.returns[0]!, scoped)
            : `[${type.returns.map((t) => luauTypeToTS(t, scoped)).join(", ")}]`;
      const generics = type.typeParams?.length ? `<${type.typeParams.join(", ")}>` : "";
      return `${generics}(${params.join(", ")}) => ${ret}`;
    }
    case "table": {
      if (type.arrayElement) return arrayElement(luauTypeToTS(type.arrayElement, knownNames));
      const parts: string[] = [];
      if (type.indexer) {
        const keyTS = luauTypeToTS(type.indexer.key, knownNames);
        const valTS = luauTypeToTS(type.indexer.value, knownNames);
        // TS index signatures only accept string/number keys.
        if (keyTS === "string" || keyTS === "number") {
          parts.push(`[key: ${keyTS}]: ${valTS}`);
        } else {
          return `Record<${keyTS}, ${valTS}>`;
        }
      }
      for (const f of type.fields) {
        const opt = f.optional ? "?" : "";
        parts.push(`${tsPropName(f.name)}${opt}: ${luauTypeToTS(f.type, knownNames)}`);
      }
      if (parts.length === 0) return "Record<string, any>";
      return `{ ${parts.join("; ")} }`;
    }
    case "name": {
      const args = type.typeArgs.map((a) => luauTypeToTS(a, knownNames));
      const prim = PRIMITIVES[type.name];
      if (prim) return prim;
      const alias = knownAlias(type.name, args);
      if (alias) return alias;
      // A locally-declared type alias or an in-scope type parameter — keep its
      // name (+ args). Anything else (e.g. an unresolved cross-module reference)
      // degrades to `any` to avoid emitting a dangling type name.
      const base = type.name.includes(".") ? type.name.slice(type.name.lastIndexOf(".") + 1) : type.name;
      if (knownNames.has(base)) {
        return args.length ? `${base}<${args.join(", ")}>` : base;
      }
      return "any";
    }
  }
}

// Reserved words that TypeScript rejects as parameter names. Param names in
// type positions are cosmetic, so a trailing underscore keeps them valid.
const RESERVED_PARAMS = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default",
  "delete", "do", "else", "enum", "export", "extends", "false", "finally", "for",
  "function", "if", "import", "in", "instanceof", "new", "null", "return",
  "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void",
  "while", "with", "yield",
]);

function safeParamName(name: string): string {
  return RESERVED_PARAMS.has(name) ? `${name}_` : name;
}

/** Wrap an array element type in parens when needed (unions, functions). */
function arrayElement(ts: string): string {
  return /[|&]|=>/.test(ts) ? `(${ts})[]` : `${ts}[]`;
}

function tsPropName(name: string): string {
  return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(name) ? name : JSON.stringify(name);
}

function memberType(member: ExtractedMember, knownNames: Set<string>): string {
  if (member.value.kind === "type") return luauTypeToTS(member.value.type, knownNames);
  // Unresolved require target — the resolver should have replaced this. Degrade.
  return "any";
}

export interface EmitOptions {
  /** The import specifier, e.g. "react" → declare module "react". */
  specifier: string;
}

export function emitDeclareModule(module: ExtractedModule, opts: EmitOptions): string {
  const lines: string[] = [];
  lines.push(`declare module ${JSON.stringify(opts.specifier)} {`);
  lines.push(...moduleBody(module).map((l) => (l ? "\t" + l : l)));
  lines.push("}");
  return lines.join("\n") + "\n";
}

/**
 * Emit a standalone `.d.ts` (no `declare module` wrapper) for a local Luau
 * module, meant to sit next to the `.luau` file so relative imports from TS
 * resolve to it.
 */
export function emitStandaloneDts(module: ExtractedModule): string {
  const lines = moduleBody(module).map((l) =>
    l.startsWith("const _default") ? `declare ${l}` : l
  );
  return lines.join("\n") + "\n";
}

function moduleBody(module: ExtractedModule): string[] {
  const knownNames = new Set(module.typeAliases.map((a) => a.name));
  const lines: string[] = [];
  for (const alias of module.typeAliases) {
    lines.push(emitTypeAlias(alias, knownNames));
  }
  if (module.typeAliases.length) lines.push("");
  lines.push(...emitDefault(module, knownNames));
  return lines;
}

function emitTypeAlias(alias: ExtractedTypeAlias, knownNames: Set<string>): string {
  const generics = alias.typeParams.length ? `<${alias.typeParams.join(", ")}>` : "";
  const keyword = alias.exported ? "export type" : "type";
  // Type params are valid names inside their own RHS.
  const scoped = new Set(knownNames);
  for (const p of alias.typeParams) scoped.add(p);
  let rhs = luauTypeToTS(alias.type, scoped);
  // Guard against self-referential aliases (e.g. a package's `Map<K,V>` that
  // resolves back to a same-named global) — TS rejects these as circular.
  if (rhs === alias.name || rhs.startsWith(`${alias.name}<`)) rhs = "any";
  return `${keyword} ${alias.name}${generics} = ${rhs};`;
}

function emitDefault(module: ExtractedModule, knownNames: Set<string>): string[] {
  const shape = module.shape;
  const lines: string[] = [];

  if (shape.kind === "object") {
    if (shape.members.length === 0) {
      lines.push("const _default: Record<string, any>;");
    } else {
      lines.push("const _default: {");
      for (const m of shape.members) {
        lines.push(`\t${tsPropName(m.name)}: ${memberType(m, knownNames)};`);
      }
      lines.push("};");
    }
    lines.push("export default _default;");
    return lines;
  }

  if (shape.kind === "value") {
    lines.push(`const _default: ${luauTypeToTS(shape.type, knownNames)};`);
    lines.push("export default _default;");
    return lines;
  }

  // reexport / none — we could not determine a concrete shape.
  lines.push("const _default: any;");
  lines.push("export default _default;");
  return lines;
}
