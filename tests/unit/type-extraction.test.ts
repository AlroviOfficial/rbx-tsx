import { describe, test, expect } from "bun:test";
import { join } from "path";
import { tokenize } from "../../src/type-extraction/lexer.ts";
import { parseTypeExpression } from "../../src/type-extraction/type-parser.ts";
import { extractModule } from "../../src/type-extraction/module-extractor.ts";
import { luauTypeToTS, emitDeclareModule } from "../../src/type-extraction/emit.ts";
import { extractProjectTypes } from "../../src/type-extraction/index.ts";

/** Parse a Luau type string straight to a TS type string. */
function toTS(luau: string, known: string[] = []): string {
  return luauTypeToTS(parseTypeExpression(tokenize(luau)), new Set(known));
}

describe("type-parser → TS mapping", () => {
  test("primitives", () => {
    expect(toTS("string")).toBe("string");
    expect(toTS("number")).toBe("number");
    expect(toTS("boolean")).toBe("boolean");
    expect(toTS("nil")).toBe("undefined");
    expect(toTS("any")).toBe("any");
  });

  test("optionals", () => {
    expect(toTS("string?")).toBe("string | undefined");
  });

  test("unions and intersections", () => {
    expect(toTS("string | number")).toBe("string | number");
    expect(toTS("A & B", ["A", "B"])).toBe("A & B");
  });

  test("array and indexer tables", () => {
    expect(toTS("{ number }")).toBe("number[]");
    expect(toTS("{ [string]: any }")).toBe("{ [key: string]: any }");
    expect(toTS("{ [number]: T }", ["T"])).toBe("{ [key: number]: T }");
  });

  test("record fields with optional", () => {
    expect(toTS("{ name: string, age: number? }")).toBe(
      "{ name: string; age?: number }"
    );
  });

  test("function types", () => {
    expect(toTS("(a: number, b: string) -> boolean")).toBe(
      "(a: number, b: string) => boolean"
    );
    expect(toTS("() -> ()")).toBe("() => void");
    expect(toTS("(...any) -> ...any")).toBe("(...arg0: any[]) => any");
  });

  test("literal string types", () => {
    expect(toTS('"left" | "right"')).toBe('"left" | "right"');
  });

  test("array element precedence", () => {
    expect(toTS("Array<T | V>", ["T", "V"])).toBe("(T | V)[]");
    expect(toTS("{ string | number }")).toBe("(string | number)[]");
  });

  test("well-known aliases", () => {
    expect(toTS("Array<string>")).toBe("string[]");
    expect(toTS("Map<string, number>")).toBe("Map<string, number>");
    expect(toTS("Set<T>", ["T"])).toBe("Set<T>");
    expect(toTS("Object")).toBe("Record<string, any>");
    expect(toTS("ES7Types.Array<number>")).toBe("number[]");
  });

  test("typeof(...) degrades to any", () => {
    expect(toTS("typeof(setmetatable({}, {}))")).toBe("any");
  });

  test("reserved words are sanitized as parameter names", () => {
    expect(toTS("(tbl: any, class: any) -> boolean")).toBe(
      "(tbl: any, class_: any) => boolean"
    );
  });

  test("unresolved cross-module references degrade to any", () => {
    // `Table` is not declared in scope, so it must not leak as a dangling name.
    expect(toTS("{ value: Set<any> | Table | string }")).toBe(
      "{ value: any }"
    );
  });

  test("self-referential / circular union of any collapses", () => {
    expect(toTS("any | string")).toBe("any");
  });

  test("generic named type kept when known", () => {
    expect(toTS("Foo<string>", ["Foo"])).toBe("Foo<string>");
  });
});

describe("module extraction", () => {
  test("exported type aliases", () => {
    const mod = extractModule(`
      export type Vector = { x: number, y: number }
      export type Id = string | number
      local x = 1
      return {}
    `);
    expect(mod.typeAliases.map((a) => a.name).sort()).toEqual(["Id", "Vector"]);
    const vector = mod.typeAliases.find((a) => a.name === "Vector")!;
    expect(luauTypeToTS(vector.type, new Set())).toBe(
      "{ x: number; y: number }"
    );
  });

  test("generic type alias params", () => {
    const mod = extractModule(`export type Box<T> = { value: T }`);
    expect(mod.typeAliases[0]!.typeParams).toEqual(["T"]);
  });

  test("module returning a table of require members", () => {
    const mod = extractModule(`
      return {
        foo = require(script:WaitForChild('foo')),
        bar = require(script.bar),
      }
    `);
    expect(mod.shape.kind).toBe("object");
    if (mod.shape.kind === "object") {
      expect(mod.shape.members.map((m) => m.name)).toEqual(["foo", "bar"]);
      expect(mod.shape.members.every((m) => m.value.kind === "require")).toBe(true);
    }
  });

  test("build-up module with annotated functions", () => {
    const mod = extractModule(`
      local M = {}
      function M.add(a: number, b: number): number
        return a + b
      end
      function M.greet(name: string): string
        return "hi"
      end
      return M
    `);
    expect(mod.shape.kind).toBe("object");
    if (mod.shape.kind === "object") {
      const add = mod.shape.members.find((m) => m.name === "add")!;
      expect(add.value.kind).toBe("type");
      if (add.value.kind === "type") {
        expect(luauTypeToTS(add.value.type, new Set())).toBe(
          "(a: number, b: number) => number"
        );
      }
    }
  });

  test("module returning an anonymous annotated function", () => {
    const mod = extractModule(`
      return function(value: string | number, digits: number?): string
        return "x"
      end
    `);
    expect(mod.shape.kind).toBe("value");
    if (mod.shape.kind === "value") {
      expect(luauTypeToTS(mod.shape.type, new Set())).toBe(
        "(value: string | number, digits: number | undefined) => string"
      );
    }
  });

  test("comparison operators in bodies don't corrupt bracket tracking", () => {
    // `<` / `>` are comparisons here, not generic brackets — they must not be
    // treated as unbalanced brackets that hide the top-level `return M`.
    const mod = extractModule(`
      local M = {}
      function M.check(a: number, b: number): boolean
        if a < b then
          return true
        end
        while a > 0 do
          a = a - 1
        end
        return false
      end
      return M
    `);
    expect(mod.shape.kind).toBe("object");
    if (mod.shape.kind === "object") {
      expect(mod.shape.members.map((m) => m.name)).toEqual(["check"]);
    }
  });

  test("members defined inside a do-block (upvalue scoping) are captured", () => {
    const mod = extractModule(`
      local M = {}
      do
        local cache
        function M.cached(): number
          return cache
        end
      end
      return M
    `);
    expect(mod.shape.kind).toBe("object");
    if (mod.shape.kind === "object") {
      expect(mod.shape.members.map((m) => m.name)).toEqual(["cached"]);
    }
  });

  test("standalone do...end block does not hijack the module return", () => {
    const mod = extractModule(`
      local M = {}
      do
        local scratch = require(script.helper)
        return scratch
      end
      function M.real(): number
        return 1
      end
      return M
    `);
    // The real module return is `return M`, not the `return scratch` inside the
    // do-block.
    expect(mod.shape.kind).toBe("object");
    if (mod.shape.kind === "object") {
      expect(mod.shape.members.map((m) => m.name)).toEqual(["real"]);
    }
  });

  test("local foo = function(...) is captured as a function member", () => {
    const mod = extractModule(`
      local helper = function(x: number): string
        return "y"
      end
      return { helper = helper }
    `);
    expect(mod.shape.kind).toBe("object");
    if (mod.shape.kind === "object") {
      const helper = mod.shape.members.find((m) => m.name === "helper")!;
      expect(helper.value.kind).toBe("type");
      if (helper.value.kind === "type") {
        expect(luauTypeToTS(helper.value.type, new Set())).toBe(
          "(x: number) => string"
        );
      }
    }
  });

  test("single re-export module", () => {
    const mod = extractModule(`
      local instanceof = require(script:WaitForChild('instanceof'))
      return instanceof
    `);
    expect(mod.shape).toEqual({ kind: "reexport", target: "instanceof" });
  });
});

describe("declare module emission", () => {
  test("emits a declare module with default export object", () => {
    const mod = extractModule(`
      export type Options = { verbose: boolean? }
      local M = {}
      function M.run(opts: Options): boolean
        return true
      end
      return M
    `);
    const dts = emitDeclareModule(mod, { specifier: "mylib" });
    expect(dts).toContain('declare module "mylib" {');
    expect(dts).toContain("export type Options = { verbose?: boolean };");
    expect(dts).toContain("run: (opts: Options) => boolean;");
    expect(dts).toContain("export default _default;");
  });
});

describe("self parameter handling", () => {
  test("drops self typed as the enclosing type; keeps a foreign self", () => {
    const mod = extractModule(`
      export type Thing = {
        Stop: (self: Thing, fade: number) -> (),
        onChanged: (self: Widget) -> (),
      }
      local T = {}
      return T
    `);
    const dts = emitDeclareModule(mod, { specifier: "t" });
    // colon-called method: receiver self is implicit in TS
    expect(dts).toContain("Stop: (fade: number) => void");
    // callback field with a differently-typed self keeps its arity
    expect(dts).toContain("onChanged: (self: any) => void");
  });

  test("standalone function type aliases never drop self", () => {
    const mod = extractModule(`
      export type Callback = (self: Widget, value: number) -> ()
      local T = {}
      return T
    `);
    const dts = emitDeclareModule(mod, { specifier: "t" });
    expect(dts).toContain("export type Callback = (self: any, value: number) => void;");
  });

  test("drops an untyped self on a module function member", () => {
    const mod = extractModule(`
      local M = {}
      function M.foo(self, x: number): number
        return x
      end
      return M
    `);
    const dts = emitDeclareModule(mod, { specifier: "m" });
    expect(dts).toContain("foo: (x: number) => number");
  });
});

describe("if-expression depth tracking", () => {
  test("if-expression after a binary operator does not drift block depth", () => {
    const mod = extractModule(`
      local M = {}
      local x = 1 + if true then 1 else 2
      function M.f(): number
        return 1
      end
      return M
    `);
    expect(mod.shape.kind).toBe("object");
    if (mod.shape.kind === "object") {
      expect(mod.shape.members.map((m) => m.name)).toContain("f");
    }
  });
});

describe("end-to-end extraction against demo packages", () => {
  const demoDir = join(import.meta.dir, "../../demo");

  test("extracts types from the installed wally packages", () => {
    const result = extractProjectTypes(demoDir);
    expect(result).not.toBeNull();
    if (!result) return;

    expect(result.manifest.pm).toBe("wally");
    // React is bundled and must be skipped, not regenerated.
    expect(result.skipped.some((s) => s.key === "React" && s.reason === "bundled")).toBe(
      true
    );
    expect(result.packages.some((p) => p.key === "React")).toBe(false);

    // Every generated package must be syntactically a declare module.
    for (const pkg of result.packages) {
      expect(pkg.dts).toContain("declare module");
      expect(pkg.dts).toContain("export default");
    }
  });
});
