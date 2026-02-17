import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileStmt(source: string): string {
  return compile(source, "test.ts", { warnLevel: "none" }).luau;
}

describe("variable declarations", () => {
  test("const → local", () => {
    const result = compileStmt("const x = 5;");
    expect(result).toContain("local x = 5");
  });

  test("let → local", () => {
    const result = compileStmt("let y = 'hello';");
    expect(result).toContain('local y = "hello"');
  });

  test("const with type annotation", () => {
    const result = compileStmt("const x: number = 5;");
    expect(result).toContain("local x: number = 5");
  });
});

describe("control flow", () => {
  test("if/else", () => {
    const result = compileStmt("if (x) { doA(); } else { doB(); }");
    expect(result).toContain("if x then");
    expect(result).toContain("doA()");
    expect(result).toContain("else");
    expect(result).toContain("doB()");
    expect(result).toContain("end");
  });

  test("if/else if/else", () => {
    const result = compileStmt("if (a) { f1(); } else if (b) { f2(); } else { f3(); }");
    expect(result).toContain("if a then");
    expect(result).toContain("elseif b then");
    expect(result).toContain("else");
  });

  test("switch → if/elseif chain", () => {
    const result = compileStmt(`
      switch (action) {
        case "inc": return count + 1;
        case "dec": return count - 1;
        default: return count;
      }
    `);
    expect(result).toContain('action == "inc"');
    expect(result).toContain('action == "dec"');
    expect(result).toContain("else");
  });
});

describe("loops", () => {
  test("for (let i = 0; i < 10; i++) → for i = 0, 9", () => {
    const result = compileStmt("for (let i = 0; i < 10; i++) { doSomething(i); }");
    expect(result).toContain("for i = 0, ");
    expect(result).toContain("doSomething(i)");
  });

  test("for..of → for _, item in", () => {
    const result = compileStmt("for (const item of items) { process(item); }");
    expect(result).toContain("for _, item in items do");
  });

  test("for..in → for key, _ in", () => {
    const result = compileStmt("for (const key in obj) { use(key); }");
    expect(result).toContain("for key, _ in obj do");
  });

  test("while loop", () => {
    const result = compileStmt("while (running) { tick(); }");
    expect(result).toContain("while running do");
    expect(result).toContain("tick()");
    expect(result).toContain("end");
  });
});

describe("function declarations", () => {
  test("function → local function", () => {
    const result = compileStmt("function hello(x: number): string { return tostring(x); }");
    expect(result).toContain("local function hello");
  });

  test("arrow function in variable", () => {
    const result = compileStmt("const add = (a: number, b: number) => a + b;");
    expect(result).toContain("local add = function(a: number, b: number)");
    expect(result).toContain("return a + b");
  });
});

describe("destructuring", () => {
  test("object destructuring", () => {
    const result = compileStmt("const { a, b } = obj;");
    expect(result).toContain("local a = obj.a");
    expect(result).toContain("local b = obj.b");
  });

  test("object destructuring with defaults", () => {
    const result = compileStmt("const { x = 0, y = 0 } = point;");
    expect(result).toContain("~= nil");
  });

  test("array destructuring", () => {
    const result = compileStmt("const [first, second] = items;");
    expect(result).toContain("local first = ");
    expect(result).toContain("local second = ");
  });
});

describe("type declarations", () => {
  test("interface → type alias", () => {
    const result = compileStmt(`
      interface Point {
        x: number;
        y: number;
      }
    `);
    expect(result).toContain("type Point = {");
    expect(result).toContain("x: number");
    expect(result).toContain("y: number");
  });

  test("type alias", () => {
    const result = compileStmt("type ID = string | number;");
    expect(result).toContain("type ID = string | number");
  });

  test("enum → table + type", () => {
    const result = compileStmt("enum Direction { Up, Down, Left, Right }");
    expect(result).toContain("local Direction = {");
    expect(result).toContain("Up = 0");
    expect(result).toContain("Right = 3");
    expect(result).toContain("type Direction = number");
  });

  test("string enum", () => {
    const result = compileStmt('enum Color { Red = "red", Blue = "blue" }');
    expect(result).toContain('Red = "red"');
    expect(result).toContain('Blue = "blue"');
    expect(result).toContain("type Color = string");
  });
});

describe("try/catch", () => {
  test("try/catch → pcall", () => {
    const result = compileStmt("try { doSomething(); } catch (err) { handleError(err); }");
    expect(result).toContain("pcall");
    expect(result).toContain("not _ok");
  });
});

describe("throw", () => {
  test("throw → error()", () => {
    const result = compileStmt('throw new Error("bad");');
    expect(result).toContain("error(");
  });
});
