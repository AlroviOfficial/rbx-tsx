/**
 * Minimal Luau lexer for type extraction. Produces a flat token stream with
 * comments and whitespace stripped. It is deliberately permissive — it only
 * needs to tokenize well enough to scan type declarations and module shapes,
 * not to validate Luau.
 */

export type TokenType = "name" | "number" | "string" | "punct";

export interface Token {
  type: TokenType;
  value: string;
}

const PUNCT3 = ["..."];
const PUNCT2 = ["->", "::", "==", "~=", "<=", ">=", "..", "&&", "||"];
const PUNCT1 = "{}()[]<>:,|&?=.;+-*/%#^".split("");

const NAME_START = /[A-Za-z_]/;
const NAME_PART = /[A-Za-z0-9_]/;
const DIGIT = /[0-9]/;

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = source.length;

  while (i < n) {
    const ch = source[i]!;

    // Whitespace
    if (ch === " " || ch === "\t" || ch === "\r" || ch === "\n") {
      i++;
      continue;
    }

    // Comments: --[[ ... ]] (with optional = levels) or -- line
    if (ch === "-" && source[i + 1] === "-") {
      i += 2;
      if (source[i] === "[") {
        // Possible long comment --[==[ ... ]==]
        let eq = 0;
        let j = i + 1;
        while (source[j] === "=") {
          eq++;
          j++;
        }
        if (source[j] === "[") {
          const close = "]" + "=".repeat(eq) + "]";
          const end = source.indexOf(close, j + 1);
          i = end === -1 ? n : end + close.length;
          continue;
        }
      }
      // Line comment
      while (i < n && source[i] !== "\n") i++;
      continue;
    }

    // Strings: "..." '...' `...`
    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      let value = "";
      while (j < n && source[j] !== quote) {
        if (source[j] === "\\") {
          value += source[j]! + (source[j + 1] ?? "");
          j += 2;
        } else {
          value += source[j];
          j++;
        }
      }
      tokens.push({ type: "string", value });
      i = j + 1;
      continue;
    }

    // Long strings [[ ... ]] / [==[ ... ]==]
    if (ch === "[" && (source[i + 1] === "[" || source[i + 1] === "=")) {
      let eq = 0;
      let j = i + 1;
      while (source[j] === "=") {
        eq++;
        j++;
      }
      if (source[j] === "[") {
        const close = "]" + "=".repeat(eq) + "]";
        const end = source.indexOf(close, j + 1);
        const value = source.slice(j + 1, end === -1 ? n : end);
        tokens.push({ type: "string", value });
        i = end === -1 ? n : end + close.length;
        continue;
      }
    }

    // Numbers (incl. hex, decimals) — kept coarse, we rarely inspect them
    if (DIGIT.test(ch) || (ch === "." && DIGIT.test(source[i + 1] ?? ""))) {
      let j = i;
      while (j < n && /[0-9a-fA-FxXeE.+_-]/.test(source[j]!)) {
        // A '+'/'-' is only part of a number as an exponent sign (e.g. 1e-5);
        // otherwise it's an operator and ends the number.
        if ((source[j] === "-" || source[j] === "+") && !/[eE]/.test(source[j - 1] ?? "")) break;
        j++;
      }
      tokens.push({ type: "number", value: source.slice(i, j) });
      i = j;
      continue;
    }

    // Names / keywords
    if (NAME_START.test(ch)) {
      let j = i + 1;
      while (j < n && NAME_PART.test(source[j]!)) j++;
      tokens.push({ type: "name", value: source.slice(i, j) });
      i = j;
      continue;
    }

    // Punctuation (longest match first)
    const three = source.slice(i, i + 3);
    if (PUNCT3.includes(three)) {
      tokens.push({ type: "punct", value: three });
      i += 3;
      continue;
    }
    const two = source.slice(i, i + 2);
    if (PUNCT2.includes(two)) {
      tokens.push({ type: "punct", value: two });
      i += 2;
      continue;
    }
    if (PUNCT1.includes(ch)) {
      tokens.push({ type: "punct", value: ch });
      i++;
      continue;
    }

    // Unknown character — skip it rather than fail.
    i++;
  }

  return tokens;
}
