import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileStmt(source: string): string {
  return compile(source, "test.ts", { warnLevel: "none" }).luau;
}

// ── #1 JS truthiness translation ──

describe("JS truthiness in conditions", () => {
  test("number condition checks ~= 0 and not-NaN", () => {
    const result = compileStmt(
      'function f(n: number) { if (n) { print("t"); } }'
    );
    expect(result).toContain("if n ~= 0 and n == n then");
  });

  test("number does NOT compile to bare truthiness", () => {
    const result = compileStmt(
      'function f(n: number) { if (n) { print("t"); } }'
    );
    expect(result).not.toMatch(/if n then/);
  });

  test("string condition checks ~= empty string", () => {
    const result = compileStmt(
      'function f(s: string) { if (s) { print("t"); } }'
    );
    expect(result).toContain('if s ~= "" then');
  });

  test("boolean condition stays bare", () => {
    const result = compileStmt(
      'function f(b: boolean) { if (b) { print("t"); } }'
    );
    expect(result).toContain("if b then");
    expect(result).not.toContain("~= 0");
  });

  test("unknown-typed condition stays bare", () => {
    const result = compileStmt('if (x) { doThing(); }');
    expect(result).toContain("if x then");
  });

  test("while with number condition", () => {
    const result = compileStmt("function f(n: number) { while (n) { tick(); } }");
    expect(result).toContain("while n ~= 0 and n == n do");
  });

  test("do-while with number condition", () => {
    const result = compileStmt("function f(n: number) { do { tick(); } while (n); }");
    expect(result).toContain("until not (n ~= 0 and n == n)");
  });

  test("ternary with number condition", () => {
    const result = compileStmt(
      "function f(n: number) { const x = n ? 1 : 2; }"
    );
    expect(result).toContain("if n ~= 0 and n == n then");
  });

  test("logical not on number", () => {
    const result = compileStmt("function f(n: number) { const x = !n; }");
    expect(result).toContain("not (n ~= 0 and n == n)");
  });

  test("logical not on boolean stays bare", () => {
    const result = compileStmt("function f(b: boolean) { const x = !b; }");
    expect(result).toContain("not b");
    expect(result).not.toContain("~= 0");
  });
});

// ── #5 short-circuit value semantics ──

describe("&& / || value semantics", () => {
  test("number && b preserves operand value (JS falsiness)", () => {
    const result = compileStmt(
      "function f(n: number, b: string) { const x = n && b; }"
    );
    expect(result).toContain("if n ~= 0 and n == n then b else n");
  });

  test("number || b preserves operand value", () => {
    const result = compileStmt(
      "function f(n: number, b: string) { const x = n || b; }"
    );
    expect(result).toContain("if n ~= 0 and n == n then n else b");
  });

  test("unknown && unknown stays plain and", () => {
    const result = compileStmt("const x = a && b;");
    expect(result).toContain("a and b");
  });

  test("unknown || unknown stays plain or", () => {
    const result = compileStmt("const x = a || b;");
    expect(result).toContain("a or b");
  });

  test("value-form && in if condition is parenthesized (valid Luau)", () => {
    const result = compileStmt(
      "function f(n: number, m: number) { if (n && m) { go(); } }"
    );
    expect(result).toContain("if (if n ~= 0 and n == n then m else n) then");
    expect(result).not.toContain("if if ");
  });

  test("?? in if condition is parenthesized (valid Luau)", () => {
    const result = compileStmt("const a = 1;\nif (a ?? 2) { go(); }");
    expect(result).not.toContain("if if ");
  });

  test("template-literal && does not double-evaluate interpolated calls", () => {
    const result = compileStmt('function f() { const x = `${g()}` && "y"; }');
    const matches = result.match(/g\(\)/g) ?? [];
    expect(matches.length).toBe(1);
    expect(result).toContain("_opt");
  });
});

describe("logical assignment truthiness", () => {
  test("&&= on number target uses numeric truthiness", () => {
    const result = compileStmt(
      "function f(n: number) { n &&= 5; }"
    );
    expect(result).toContain("if n ~= 0 and n == n then");
    expect(result).toContain("n = 5");
  });

  test("||= on number target uses negated numeric truthiness", () => {
    const result = compileStmt("function f(n: number) { n ||= 5; }");
    expect(result).toContain("if not (n ~= 0 and n == n) then");
  });

  test("&&= computed target is transformed once (no duplicate temps)", () => {
    const result = compileStmt("a[foo().bar?.c] &&= 1;");
    const matches = result.match(/(?:local|const) _opt\d+ =/g) ?? [];
    expect(matches.length).toBe(1);
  });
});

// ── #2 type-driven index shift ──

describe("type-driven index shift", () => {
  test("Record<number, V> numeric key is NOT shifted", () => {
    const result = compileStmt(
      'const scores: Record<number, string> = { 0: "a", 5: "b" }; const v = scores[5];'
    );
    expect(result).toContain("scores[5]");
    expect(result).not.toContain("scores[6]");
  });

  test("object literal numeric key is NOT shifted", () => {
    const result = compileStmt('const o = { 0: "a" }; const v = o[0];');
    expect(result).toContain("o[0]");
  });

  test("array literal access IS shifted", () => {
    const result = compileStmt("const arr = [10, 20, 30]; const v = arr[0];");
    expect(result).toContain("arr[1]");
  });

  test("typed array access IS shifted", () => {
    const result = compileStmt(
      "function f(arr: number[]) { const v = arr[0]; }"
    );
    expect(result).toContain("arr[1]");
  });

  test("untyped base still shifts (backward compatible)", () => {
    const result = compileStmt("const v = arr[0];");
    expect(result).toContain("arr[1]");
  });

  test("Map variable index is NOT shifted", () => {
    const result = compileStmt(
      "const m = new Map<number, string>(); const v = m[5];"
    );
    expect(result).toContain("m[5]");
    expect(result).not.toContain("m[6]");
  });
});

// ── #2 optional-chain index consistency ──

describe("optional-chain index consistency", () => {
  test("array optional index shifts like plain index", () => {
    const result = compileStmt(
      "function f(arr: number[]) { const v = arr?.[0]; }"
    );
    expect(result).toContain("arr[1]");
  });

  test("Record optional index is NOT shifted", () => {
    const result = compileStmt(
      "function f(scores: Record<number, string>) { const v = scores?.[5]; }"
    );
    expect(result).toContain("scores[5]");
    expect(result).not.toContain("scores[6]");
  });
});

// ── #3 optional-chain single-evaluation ──

describe("optional chaining single-evaluation", () => {
  test("optional index receiver is hoisted, evaluated once", () => {
    const result = compileStmt(
      "declare const obj: { items: number[] };\nconst v = obj.items?.[0] ?? -1;"
    );
    const matches = result.match(/obj\.items/g) ?? [];
    expect(matches.length).toBe(1);
    expect(result).toContain("_opt");
  });

  test("optional property receiver is hoisted, evaluated once", () => {
    const result = compileStmt(
      "declare const obj: { inner: { value: number } };\nconst v = obj.inner?.value;"
    );
    const matches = result.match(/obj\.inner/g) ?? [];
    expect(matches.length).toBe(1);
  });
});

// ── #4 bitwise operators ──

describe("bitwise operators map to bit32", () => {
  const pre = "declare const a: number, b: number;\n";
  test("| → bit32.bor", () => {
    expect(compileStmt(pre + "const x = a | b;")).toContain("bit32.bor(a, b)");
  });
  test("& → bit32.band", () => {
    expect(compileStmt(pre + "const x = a & b;")).toContain("bit32.band(a, b)");
  });
  test("^ → bit32.bxor", () => {
    expect(compileStmt(pre + "const x = a ^ b;")).toContain("bit32.bxor(a, b)");
  });
  test("<< → bit32.lshift", () => {
    expect(compileStmt(pre + "const x = a << b;")).toContain(
      "bit32.lshift(a, b)"
    );
  });
  test(">> → bit32.arshift", () => {
    expect(compileStmt(pre + "const x = a >> b;")).toContain(
      "bit32.arshift(a, b)"
    );
  });
  test(">>> → bit32.rshift", () => {
    expect(compileStmt(pre + "const x = a >>> b;")).toContain(
      "bit32.rshift(a, b)"
    );
  });
  test("** still maps to ^ (not bitwise)", () => {
    expect(compileStmt(pre + "const x = a ** b;")).toContain("a ^ b");
  });
});

// ── checker-resolved types (no explicit annotation) ──

describe("type-checker resolved inference", () => {
  test("inferred numeric variable gets numeric truthiness without annotation", () => {
    const result = compileStmt(
      "declare function getCount(): number;\nconst n = getCount();\nif (n) { go(); }"
    );
    expect(result).toContain("if n ~= 0 and n == n then");
  });

  test("inferred string variable gets empty-string truthiness", () => {
    const result = compileStmt(
      'declare function getName(): string;\nconst s = getName();\nif (s) { go(); }'
    );
    expect(result).toContain('if s ~= "" then');
  });

  test("impure call condition is left bare (not duplicated)", () => {
    const result = compileStmt(
      "declare function getCount(): number;\nif (getCount()) { go(); }"
    );
    // A number-typed call must NOT be coerced, since the NaN guard would
    // duplicate the call and invoke its side effects multiple times.
    expect(result).toContain("if getCount() then");
    expect(result).not.toContain("== getCount()");
  });

  test("inferred Record return type suppresses index shift", () => {
    const result = compileStmt(
      "declare function getScores(): Record<number, string>;\nconst s = getScores();\nconst v = s[5];"
    );
    expect(result).toContain("s[5]");
    expect(result).not.toContain("s[6]");
  });

  test("inferred array return type still shifts index", () => {
    const result = compileStmt(
      "declare function getItems(): number[];\nconst arr = getItems();\nconst v = arr[0];"
    );
    expect(result).toContain("arr[1]");
  });
});
