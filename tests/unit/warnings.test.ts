import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileWithWarnings(source: string, filename = "test.tsx") {
  return compile(source, filename, { warnLevel: "all" });
}

describe("warning line/column info", () => {
  test("var declaration warning includes line info", () => {
    const result = compileWithWarnings("var x = 5;", "test.ts");
    const warnings = result.warnings.getWarnings();
    expect(warnings.length).toBeGreaterThan(0);
    const varWarning = warnings.find(w => w.code === "var-declaration");
    expect(varWarning).toBeDefined();
    expect(varWarning!.line).toBeDefined();
    expect(varWarning!.line).toBeGreaterThan(0);
  });

  test("warnings.format() includes file:line:col", () => {
    const result = compileWithWarnings("var x = 5;", "test.ts");
    const formatted = result.warnings.format();
    expect(formatted).toMatch(/test\.ts:\d+:\d+/);
  });
});
