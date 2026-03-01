import { describe, test, expect } from "bun:test";
import { generateLuau } from "../../src/codegen/luau-codegen.ts";
import type { LuauStatement } from "../../src/ast/luau-ast.ts";
import {
  ident, str, num, bool, nil, call, methodCall, index, bracketIndex,
  table, binary, unary, ifExpr, funcExpr, concat, templateLiteral,
} from "../../src/ast/luau-ast.ts";

function gen(stmts: LuauStatement[]): string {
  return generateLuau(stmts, {}).trim();
}

describe("local declarations", () => {
  test("simple local", () => {
    const result = gen([{ type: "local", name: "x", value: num(5) }]);
    expect(result).toContain("local x = 5");
  });

  test("local with type annotation", () => {
    const result = gen([{ type: "local", name: "x", value: num(5), typeAnnotation: "number" }]);
    expect(result).toContain("local x: number = 5");
  });

  test("multi-local", () => {
    const result = gen([{
      type: "multi-local",
      names: ["a", "b"],
      values: [call(ident("foo"), [])],
    }]);
    expect(result).toContain("local a, b = foo()");
  });
});

describe("function declarations", () => {
  test("local function", () => {
    const result = gen([{
      type: "function-decl",
      local: true,
      name: "hello",
      params: [{ name: "x", type: "number" }],
      body: [{ type: "return", value: binary(ident("x"), "+", num(1)) }],
    }]);
    expect(result).toContain("local function hello(x: number)");
    expect(result).toContain("return x + 1");
    expect(result).toContain("end");
  });
});

describe("if statements", () => {
  test("simple if", () => {
    const result = gen([{
      type: "if",
      condition: ident("x"),
      body: [{ type: "expression-statement", expr: call(ident("print"), [str("yes")]) }],
    }]);
    expect(result).toContain("if x then");
    expect(result).toContain('print("yes")');
    expect(result).toContain("end");
  });

  test("if/elseif/else", () => {
    const result = gen([{
      type: "if",
      condition: binary(ident("x"), ">", num(0)),
      body: [{ type: "return", value: str("positive") }],
      elseIfs: [{ condition: binary(ident("x"), "<", num(0)), body: [{ type: "return", value: str("negative") }] }],
      elseBody: [{ type: "return", value: str("zero") }],
    }]);
    expect(result).toContain("if x > 0 then");
    expect(result).toContain("elseif x < 0 then");
    expect(result).toContain("else");
  });
});

describe("for loops", () => {
  test("numeric for", () => {
    const result = gen([{
      type: "for-numeric",
      var: "i",
      start: num(1),
      end: num(10),
      body: [{ type: "expression-statement", expr: call(ident("print"), [ident("i")]) }],
    }]);
    expect(result).toContain("for i = 1, 10 do");
  });

  test("for-in", () => {
    const result = gen([{
      type: "for-in",
      vars: ["_", "item"],
      iterators: [ident("items")],
      body: [{ type: "expression-statement", expr: call(ident("print"), [ident("item")]) }],
    }]);
    expect(result).toContain("for _, item in items do");
  });
});

describe("expressions", () => {
  test("string literal", () => {
    const result = gen([{ type: "return", value: str("hello") }]);
    expect(result).toContain('return "hello"');
  });

  test("number literal", () => {
    const result = gen([{ type: "return", value: num(42) }]);
    expect(result).toContain("return 42");
  });

  test("boolean literal", () => {
    const result = gen([{ type: "return", value: bool(true) }]);
    expect(result).toContain("return true");
  });

  test("nil", () => {
    const result = gen([{ type: "return", value: nil() }]);
    expect(result).toContain("return nil");
  });

  test("function call", () => {
    const result = gen([{
      type: "expression-statement",
      expr: call(ident("print"), [str("hello"), num(42)]),
    }]);
    expect(result).toContain('print("hello", 42)');
  });

  test("method call", () => {
    const result = gen([{
      type: "expression-statement",
      expr: methodCall(ident("game"), "GetService", [str("Players")]),
    }]);
    expect(result).toContain('game:GetService("Players")');
  });

  test("property access", () => {
    const result = gen([{ type: "return", value: index(ident("a"), "b") }]);
    expect(result).toContain("return a.b");
  });

  test("bracket index", () => {
    const result = gen([{ type: "return", value: bracketIndex(ident("a"), str("b")) }]);
    expect(result).toContain('return a["b"]');
  });

  test("binary expression", () => {
    const result = gen([{ type: "return", value: binary(ident("a"), "+", ident("b")) }]);
    expect(result).toContain("return a + b");
  });

  test("unary not", () => {
    const result = gen([{ type: "return", value: unary("not", ident("x")) }]);
    expect(result).toContain("return not x");
  });

  test("unary length #", () => {
    const result = gen([{ type: "return", value: unary("#", ident("arr")) }]);
    expect(result).toContain("return #arr");
  });

  test("if expression", () => {
    const result = gen([{
      type: "return",
      value: ifExpr(ident("cond"), str("yes"), str("no")),
    }]);
    expect(result).toContain('return if cond then "yes" else "no"');
  });

  test("concat", () => {
    const result = gen([{
      type: "return",
      value: concat([str("hello "), call(ident("tostring"), [ident("x")])]),
    }]);
    expect(result).toContain('return "hello " .. tostring(x)');
  });

  test("template literal", () => {
    const result = gen([{
      type: "return",
      value: templateLiteral("hello ", [{ expr: ident("x"), text: " world" }]),
    }]);
    expect(result).toContain("return `hello {x} world`");
  });

  test("table constructor", () => {
    const result = gen([{
      type: "return",
      value: table([
        { key: str("a"), value: num(1) },
        { key: str("b"), value: num(2) },
      ]),
    }]);
    expect(result).toContain("a = 1");
    expect(result).toContain("b = 2");
  });

  test("empty table", () => {
    const result = gen([{ type: "return", value: table([]) }]);
    expect(result).toContain("return {}");
  });

  test("function expression (short)", () => {
    const result = gen([{
      type: "return",
      value: funcExpr(
        [{ name: "x" }],
        [{ type: "return", value: binary(ident("x"), "+", num(1)) }],
      ),
    }]);
    expect(result).toContain("function(x) return x + 1 end");
  });
});

describe("type aliases", () => {
  test("simple type alias", () => {
    const result = gen([{ type: "type-alias", name: "Foo", definition: "string" }]);
    expect(result).toContain("type Foo = string");
  });

  test("export type alias", () => {
    const result = gen([{ type: "export-type-alias", name: "Bar", definition: "{ x: number }" }]);
    expect(result).toContain("export type Bar = { x: number }");
  });
});

describe("comments", () => {
  test("single line comment", () => {
    const result = gen([{ type: "comment", text: "hello world" }]);
    expect(result).toContain("-- hello world");
  });
});

describe("special numbers", () => {
  test("math.huge for infinity", () => {
    const result = gen([{ type: "return", value: num(Infinity) }]);
    expect(result).toContain("return math.huge");
  });

  test("negative infinity", () => {
    const result = gen([{ type: "return", value: num(-Infinity) }]);
    expect(result).toContain("return -math.huge");
  });
});

// ── Task 6: Source map comments ──

describe("source map comments", () => {
  test("sourcemap option emits source comments", () => {
    const { compile } = require("../../src/compiler.ts");
    const result = compile(`
      export default function App() {
        return "hello";
      }
    `, "App.tsx", { sourcemap: true });
    expect(result.luau).toContain("-- source: App.tsx:");
  });
});
