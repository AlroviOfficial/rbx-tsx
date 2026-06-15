/**
 * Recursive-descent parser for the subset of Luau type syntax we care about.
 * Operates on the token stream from the lexer. Anything it cannot understand
 * degrades to `{ kind: "any" }` rather than throwing — graceful degradation is
 * the whole strategy here.
 */

import type { Token } from "./lexer.ts";

export type LuauType =
  | { kind: "name"; name: string; typeArgs: LuauType[] }
  | { kind: "literal"; value: string; literalKind: "string" | "number" | "boolean" }
  | { kind: "table"; fields: LuauField[]; indexer?: { key: LuauType; value: LuauType }; arrayElement?: LuauType }
  | { kind: "function"; params: LuauParam[]; returns: LuauType[] }
  | { kind: "union"; types: LuauType[] }
  | { kind: "intersection"; types: LuauType[] }
  | { kind: "optional"; inner: LuauType }
  | { kind: "tuple"; types: LuauType[] }
  | { kind: "any" }
  | { kind: "unknown" };

export interface LuauField {
  name: string;
  optional: boolean;
  type: LuauType;
}

export interface LuauParam {
  name?: string;
  type: LuauType;
  variadic?: boolean;
}

const ANY: LuauType = { kind: "any" };

class Parser {
  private pos = 0;
  constructor(private readonly tokens: Token[]) {}

  private peek(offset = 0): Token | undefined {
    return this.tokens[this.pos + offset];
  }

  private next(): Token | undefined {
    return this.tokens[this.pos++];
  }

  private isPunct(value: string, offset = 0): boolean {
    const t = this.peek(offset);
    return t?.type === "punct" && t.value === value;
  }

  private eat(value: string): boolean {
    if (this.isPunct(value)) {
      this.pos++;
      return true;
    }
    return false;
  }

  atEnd(): boolean {
    return this.pos >= this.tokens.length;
  }

  /** Entry point: parse a full type expression (lowest precedence = union). */
  parseType(): LuauType {
    return this.parseUnion();
  }

  private parseUnion(): LuauType {
    // Leading `|` is allowed in Luau multiline unions.
    this.eat("|");
    const parts = [this.parseIntersection()];
    while (this.eat("|")) parts.push(this.parseIntersection());
    return parts.length === 1 ? parts[0]! : { kind: "union", types: parts };
  }

  private parseIntersection(): LuauType {
    this.eat("&");
    const parts = [this.parsePostfix()];
    while (this.eat("&")) parts.push(this.parsePostfix());
    return parts.length === 1 ? parts[0]! : { kind: "intersection", types: parts };
  }

  private parsePostfix(): LuauType {
    let type = this.parsePrimary();
    while (this.isPunct("?")) {
      this.pos++;
      type = { kind: "optional", inner: type };
    }
    return type;
  }

  private parsePrimary(): LuauType {
    const t = this.peek();
    if (!t) return ANY;

    // Parenthesized group: either `( ... ) -> ret` (function) or a tuple/paren.
    if (t.type === "punct" && t.value === "(") {
      return this.parseParenOrFunction();
    }

    // Table type.
    if (t.type === "punct" && t.value === "{") {
      return this.parseTable();
    }

    // Literal types.
    if (t.type === "string") {
      this.pos++;
      return { kind: "literal", value: t.value, literalKind: "string" };
    }
    if (t.type === "number") {
      this.pos++;
      return { kind: "literal", value: t.value, literalKind: "number" };
    }

    if (t.type === "name") {
      // `typeof(...)` — degrade, consuming the balanced parens.
      if (t.value === "typeof" && this.peek(1)?.value === "(") {
        this.pos++;
        this.skipBalanced("(", ")");
        return ANY;
      }
      if (t.value === "true" || t.value === "false") {
        this.pos++;
        return { kind: "literal", value: t.value, literalKind: "boolean" };
      }
      return this.parseNamed();
    }

    // Unknown leading token — consume it and degrade.
    this.pos++;
    return ANY;
  }

  /** Dotted name with optional `<...>` type arguments. */
  private parseNamed(): LuauType {
    let name = this.next()!.value;
    while (this.isPunct(".") && this.peek(1)?.type === "name") {
      this.pos++;
      name += "." + this.next()!.value;
    }

    let typeArgs: LuauType[] = [];
    if (this.isPunct("<")) {
      typeArgs = this.parseTypeArgs();
    }
    return { kind: "name", name, typeArgs };
  }

  private parseTypeArgs(): LuauType[] {
    this.eat("<");
    const args: LuauType[] = [];
    if (this.isPunct(">")) {
      this.pos++;
      return args;
    }
    args.push(this.parseType());
    while (this.eat(",")) {
      if (this.isPunct(">")) break;
      args.push(this.parseType());
    }
    this.eat(">");
    return args;
  }

  private parseTable(): LuauType {
    this.eat("{");
    const fields: LuauField[] = [];
    let indexer: { key: LuauType; value: LuauType } | undefined;
    let arrayElement: LuauType | undefined;

    while (!this.isPunct("}") && !this.atEnd()) {
      // Indexer: [KeyType]: ValueType
      if (this.isPunct("[")) {
        this.pos++;
        // A string key like ["foo"]: T is a named field, not an indexer.
        const inner = this.peek();
        if (inner?.type === "string" && this.peek(1)?.value === "]") {
          const fieldName = inner.value;
          this.pos += 2; // string + ]
          this.eat(":");
          const type = this.parseType();
          fields.push(stripOptional(fieldName, type));
        } else {
          const key = this.parseType();
          this.eat("]");
          this.eat(":");
          const value = this.parseType();
          indexer = { key, value };
        }
      } else if (this.peek()?.type === "name" && this.peek(1)?.value === ":") {
        const fieldName = this.next()!.value;
        this.pos++; // ':'
        const type = this.parseType();
        fields.push(stripOptional(fieldName, type));
      } else {
        // Array-style element type: { T }
        const type = this.parseType();
        if (fields.length === 0 && !indexer) arrayElement = type;
      }

      // Field separators: , or ;
      if (!this.eat(",")) this.eat(";");
    }

    this.eat("}");
    return { kind: "table", fields, indexer, arrayElement };
  }

  private parseParenOrFunction(): LuauType {
    this.eat("(");
    const entries: LuauParam[] = [];
    while (!this.isPunct(")") && !this.atEnd()) {
      if (this.isPunct("...")) {
        this.pos++;
        const type = this.atEndOfParamType() ? ANY : this.parseType();
        entries.push({ type, variadic: true });
      } else if (this.peek()?.type === "name" && this.peek(1)?.value === ":") {
        const name = this.next()!.value;
        this.pos++; // ':'
        entries.push({ name, type: this.parseType() });
      } else {
        entries.push({ type: this.parseType() });
      }
      if (!this.eat(",")) break;
    }
    this.eat(")");

    if (this.isPunct("->")) {
      this.pos++;
      return { kind: "function", params: entries, returns: this.parseReturn() };
    }

    // Not a function — a parenthesized or tuple type.
    const types = entries.map((e) => e.type);
    if (types.length === 1) return types[0]!;
    return { kind: "tuple", types };
  }

  private parseReturn(): LuauType[] {
    if (this.isPunct("(")) {
      this.eat("(");
      const types: LuauType[] = [];
      while (!this.isPunct(")") && !this.atEnd()) {
        if (this.isPunct("...")) {
          this.pos++;
          if (!this.atEndOfParamType()) this.parseType();
          types.push(ANY);
        } else {
          types.push(this.parseType());
        }
        if (!this.eat(",")) break;
      }
      this.eat(")");
      return types;
    }
    if (this.isPunct("...")) {
      this.pos++;
      if (!this.atEndOfParamType()) this.parseType();
      return [ANY];
    }
    return [this.parseType()];
  }

  private atEndOfParamType(): boolean {
    return this.isPunct(")") || this.isPunct(",");
  }

  private skipBalanced(open: string, close: string): void {
    if (!this.eat(open)) return;
    let depth = 1;
    while (depth > 0 && !this.atEnd()) {
      const t = this.next()!;
      if (t.type === "punct" && t.value === open) depth++;
      else if (t.type === "punct" && t.value === close) depth--;
    }
  }
}

function stripOptional(name: string, type: LuauType): LuauField {
  if (type.kind === "optional") {
    return { name, optional: true, type: type.inner };
  }
  return { name, optional: false, type };
}

/**
 * Parse a type-expression token stream into a LuauType. Never throws — any
 * failure degrades to `any`.
 */
export function parseTypeExpression(tokens: Token[]): LuauType {
  try {
    const parser = new Parser(tokens);
    if (parser.atEnd()) return ANY;
    return parser.parseType();
  } catch {
    return ANY;
  }
}
