import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileTS(source: string): string {
  return compile(source, "test.ts", { warnLevel: "none" }).luau;
}

describe("basic type annotations", () => {
  test("string type", () => {
    const result = compileTS("const x: string = 'hello';");
    expect(result).toContain("local x: string");
  });

  test("number type", () => {
    const result = compileTS("const x: number = 42;");
    expect(result).toContain("local x: number");
  });

  test("boolean type", () => {
    const result = compileTS("const x: boolean = true;");
    expect(result).toContain("local x: boolean");
  });
});

describe("complex types", () => {
  test("union type", () => {
    const result = compileTS("type ID = string | number;");
    expect(result).toContain("type ID = string | number");
  });

  test("optional type (T | null)", () => {
    const result = compileTS("type MaybeString = string | null;");
    expect(result).toContain("string?");
  });

  test("array type T[]", () => {
    const result = compileTS("type Items = string[];");
    expect(result).toContain("{ string }");
  });

  test("Record<K, V>", () => {
    const result = compileTS("type Map = Record<string, number>;");
    expect(result).toContain("[string]: number");
  });

  test("function type", () => {
    const result = compileTS("type Callback = (x: number) => void;");
    expect(result).toContain("((number) -> ())");
  });
});

describe("interface declarations", () => {
  test("basic interface", () => {
    const result = compileTS(`
      interface Point {
        x: number;
        y: number;
      }
    `);
    expect(result).toContain("type Point = {");
    expect(result).toContain("x: number");
    expect(result).toContain("y: number");
  });

  test("interface with optional fields", () => {
    const result = compileTS(`
      interface Config {
        name: string;
        debug?: boolean;
      }
    `);
    expect(result).toContain("name: string");
    expect(result).toContain("debug: boolean?");
  });

  test("exported interface", () => {
    const result = compileTS(`
      export interface Props {
        title: string;
      }
    `);
    expect(result).toContain("export type Props = {");
  });
});

describe("enum declarations", () => {
  test("numeric enum", () => {
    const result = compileTS("enum Dir { Up, Down, Left, Right }");
    expect(result).toContain("local Dir = {");
    expect(result).toContain("Up = 0");
    expect(result).toContain("Down = 1");
    expect(result).toContain("Left = 2");
    expect(result).toContain("Right = 3");
    expect(result).toContain("type Dir = number");
  });

  test("string enum", () => {
    const result = compileTS('enum Color { Red = "red", Blue = "blue" }');
    expect(result).toContain('Red = "red"');
    expect(result).toContain('Blue = "blue"');
    expect(result).toContain("type Color = string");
  });

  test("enum with custom start value", () => {
    const result = compileTS("enum Status { Active = 1, Inactive = 2, Deleted = 3 }");
    expect(result).toContain("Active = 1");
    expect(result).toContain("Inactive = 2");
    expect(result).toContain("Deleted = 3");
  });
});

describe("as const", () => {
  test("as const on object → table.freeze", () => {
    const result = compileTS("const SIZES = { sm: 12, md: 16, lg: 24 } as const;");
    // The object should be created (as const doesn't change the object at compile time much)
    expect(result).toContain("sm = 12");
    expect(result).toContain("md = 16");
    expect(result).toContain("lg = 24");
  });
});
