import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileStmt(source: string): string {
  return compile(source, "test.ts", { warnLevel: "none" }).luau;
}

// ── Fix #1: Async function return rewriting (recursive) ──

describe("async function recursive return rewriting", () => {
  test("top-level return is rewritten to resolve()", () => {
    const result = compileStmt(`
      async function fetchData() {
        return "data";
      }
    `);
    expect(result).toContain("Promise.new");
    expect(result).toContain('resolve("data")');
  });

  test("return inside if-branch is rewritten to resolve()", () => {
    const result = compileStmt(`
      async function fetch(id: number) {
        if (!id) return null;
        return "ok";
      }
    `);
    expect(result).toContain("Promise.new");
    // Both returns should be rewritten
    expect(result).toContain("resolve(nil)");
    expect(result).toContain('resolve("ok")');
  });

  test("return inside else-branch is rewritten to resolve()", () => {
    const result = compileStmt(`
      async function check(x: boolean) {
        if (x) {
          return "yes";
        } else {
          return "no";
        }
      }
    `);
    expect(result).toContain('resolve("yes")');
    expect(result).toContain('resolve("no")');
  });

  test("return inside elseif-branch is rewritten to resolve()", () => {
    const result = compileStmt(`
      async function classify(n: number) {
        if (n > 0) {
          return "positive";
        } else if (n < 0) {
          return "negative";
        } else {
          return "zero";
        }
      }
    `);
    expect(result).toContain('resolve("positive")');
    expect(result).toContain('resolve("negative")');
    expect(result).toContain('resolve("zero")');
  });

  test("return inside for loop body is rewritten to resolve()", () => {
    const result = compileStmt(`
      async function findItem(items: string[]) {
        for (const item of items) {
          if (item === "target") return item;
        }
        return null;
      }
    `);
    expect(result).toContain("resolve(item)");
    expect(result).toContain("resolve(nil)");
  });

  test("return inside while loop body is rewritten to resolve()", () => {
    const result = compileStmt(`
      async function waitForReady() {
        while (true) {
          if (ready) return "done";
        }
      }
    `);
    expect(result).toContain('resolve("done")');
  });

  test("bare return (no value) is rewritten to resolve(nil)", () => {
    const result = compileStmt(`
      async function earlyExit(flag: boolean) {
        if (flag) return;
        doWork();
      }
    `);
    expect(result).toContain("resolve(nil)");
  });
});

// ── Fix #2: Switch fall-through semantics ──

describe("switch fall-through", () => {
  test("consecutive cases without bodies merge conditions with or", () => {
    const result = compileStmt(`
      switch (x) {
        case 1:
        case 2:
        case 3:
          doStuff();
          break;
      }
    `);
    // All three cases should be merged into one condition with `or`
    expect(result).toContain("x == 1 or x == 2 or x == 3");
    expect(result).toContain("doStuff()");
  });

  test("two cases fall through to shared body", () => {
    const result = compileStmt(`
      switch (action) {
        case "inc":
        case "increment":
          count += 1;
          break;
        case "dec":
          count -= 1;
          break;
      }
    `);
    expect(result).toContain('action == "inc" or action == "increment"');
    expect(result).toContain('action == "dec"');
  });

  test("fall-through cases with default", () => {
    const result = compileStmt(`
      switch (dir) {
        case "up":
        case "north":
          goUp();
          break;
        default:
          goDown();
          break;
      }
    `);
    expect(result).toContain('dir == "up" or dir == "north"');
    expect(result).toContain("else");
    expect(result).toContain("goDown()");
  });

  test("single cases still work normally (no or)", () => {
    const result = compileStmt(`
      switch (x) {
        case 1:
          doA();
          break;
        case 2:
          doB();
          break;
      }
    `);
    expect(result).not.toContain("or");
    expect(result).toContain("x == 1");
    expect(result).toContain("x == 2");
  });

  test("mixed fall-through and separate cases", () => {
    const result = compileStmt(`
      switch (ch) {
        case "a":
        case "e":
        case "i":
        case "o":
        case "u":
          handleVowel();
          break;
        case "y":
          handleMaybe();
          break;
        default:
          handleConsonant();
      }
    `);
    expect(result).toContain(
      'ch == "a" or ch == "e" or ch == "i" or ch == "o" or ch == "u"'
    );
    expect(result).toContain('ch == "y"');
    expect(result).toContain("else");
    expect(result).toContain("handleConsonant()");
  });
});

// ── Fix #3: For loop with > and >= conditions ──

describe("for loop with negative step", () => {
  test("for (i = 10; i > 0; i--) emits step -1", () => {
    const result = compileStmt(`
      for (let i = 10; i > 0; i--) {
        process(i);
      }
    `);
    expect(result).toContain("for i = 10,");
    expect(result).toContain(", -1 do");
    expect(result).toContain("process(i)");
  });

  test("for (i = 5; i >= 0; i--) emits step -1", () => {
    const result = compileStmt(`
      for (let i = 5; i >= 0; i--) {
        doThing(i);
      }
    `);
    expect(result).toContain("for i = 5,");
    expect(result).toContain("0, -1 do");
    expect(result).toContain("doThing(i)");
  });

  test("for (i = n; i >= 1; i--) with variable bound", () => {
    const result = compileStmt(`
      for (let i = n; i >= 1; i--) {
        step(i);
      }
    `);
    expect(result).toContain("for i = n, 1, -1 do");
  });

  test("for (i = 10; i > 0; i -= 2) emits step -2", () => {
    const result = compileStmt(`
      for (let i = 10; i > 0; i -= 2) {
        skip(i);
      }
    `);
    expect(result).toContain("for i = 10,");
    expect(result).toContain(", -2 do");
  });

  test("ascending for loop still works (i < N, i++)", () => {
    const result = compileStmt(`
      for (let i = 0; i < 10; i++) {
        work(i);
      }
    `);
    expect(result).toContain("for i = 0, 10 - 1 do");
    // Should NOT contain -1 step
    expect(result).not.toContain(", -1 do");
  });

  test("ascending for loop with <= still works", () => {
    const result = compileStmt(`
      for (let i = 1; i <= 10; i++) {
        work(i);
      }
    `);
    expect(result).toContain("for i = 1, 10 do");
    expect(result).not.toContain(", -1 do");
  });
});

// ── Fix #4: instanceof operator ──

describe("instanceof operator", () => {
  test("instanceof Roblox value type uses typeof()", () => {
    const result = compileStmt("const x = obj instanceof Color3;");
    expect(result).toContain('typeof(obj) == "Color3"');
  });

  test("instanceof Vector3 uses typeof()", () => {
    const result = compileStmt("const x = val instanceof Vector3;");
    expect(result).toContain('typeof(val) == "Vector3"');
  });

  test("instanceof UDim2 uses typeof()", () => {
    const result = compileStmt("const x = val instanceof UDim2;");
    expect(result).toContain('typeof(val) == "UDim2"');
  });

  test("instanceof Instance uses :IsA()", () => {
    const result = compileStmt("const x = obj instanceof Instance;");
    expect(result).toContain('obj:IsA("Instance")');
  });

  test("instanceof Roblox service uses :IsA()", () => {
    const result = compileStmt("const x = svc instanceof Players;");
    expect(result).toContain('svc:IsA("Players")');
  });

  test("instanceof unknown class uses :IsA() with warning", () => {
    const compiled = compile(
      "const x = obj instanceof Part;",
      "test.ts",
      { warnLevel: "all" }
    );
    expect(compiled.luau).toContain('obj:IsA("Part")');
    const warnings = compiled.warnings.getWarnings();
    expect(warnings.some((w) => w.code === "lossy-transform")).toBe(true);
  });

  test("instanceof no longer emits false", () => {
    const result = compileStmt("const x = obj instanceof Color3;");
    expect(result).not.toContain("false");
    expect(result).not.toContain("instanceof not supported");
  });
});
