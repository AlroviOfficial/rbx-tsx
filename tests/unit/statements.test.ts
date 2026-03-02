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

// ── Task 13: Logical assignment operators ──

describe("logical assignment operators", () => {
  test("&&= → if x then x = y end", () => {
    const result = compileStmt("x &&= y;");
    expect(result).toContain("if x then");
    expect(result).toContain("x = y");
  });

  test("||= → if not x then x = y end", () => {
    const result = compileStmt("x ||= y;");
    expect(result).toContain("if not x then");
    expect(result).toContain("x = y");
  });

  test("??= → if x == nil then x = y end", () => {
    const result = compileStmt("x ??= y;");
    expect(result).toContain("== nil");
    expect(result).toContain("x = y");
  });
});

// ── Task 14: Nested destructuring ──

describe("nested destructuring", () => {
  test("nested object destructuring", () => {
    const result = compileStmt("const { a: { b, c } } = obj;");
    expect(result).toContain("local b = ");
    expect(result).toContain("local c = ");
  });

  test("mixed nested destructuring (object → array)", () => {
    const result = compileStmt("const { items: [first, second] } = data;");
    expect(result).toContain("local first = ");
    expect(result).toContain("local second = ");
  });
});

// ── Task 4: Async/await ──

describe("async/await", () => {
  test("async function wraps body in Promise.new", () => {
    const result = compileStmt(`
      async function fetchData() {
        return "data";
      }
    `);
    expect(result).toContain("Promise.new");
    expect(result).toContain("resolve");
  });

  test("await expr → expr:expect()", () => {
    const result = compileStmt(`
      async function run() {
        const data = await fetchData();
        return data;
      }
    `);
    expect(result).toContain(":expect()");
  });

  test("async function generates Promise require", () => {
    const result = compileStmt(`
      async function fetchData() {
        return "data";
      }
    `);
    expect(result).toContain("Promise");
  });
});

describe("class declarations", () => {
  test("basic class with constructor and method", () => {
    const result = compileStmt(`
      class Animal {
        name: string;
        constructor(name: string) { this.name = name; }
        speak(): string { return this.name + " makes a noise"; }
      }
    `);
    expect(result).toContain("local Animal = {}");
    expect(result).toContain("Animal.__index = Animal");
    expect(result).toContain("type Animal = typeof(setmetatable({} :: AnimalData, Animal))");
    expect(result).toContain("function Animal.new(name: string): Animal");
    expect(result).toContain("local self = {}");
    expect(result).toContain("self.name = name");
    expect(result).toContain("return setmetatable(self, Animal)");
    expect(result).toContain("function Animal.speak(self: Animal): string");
  });

  test("class with inheritance", () => {
    const result = compileStmt(`
      class Animal {
        name: string;
        constructor(name: string) { this.name = name; }
      }
      class Dog extends Animal {
        constructor(name: string) { super(name); }
        speak(): string { return this.name + " barks"; }
      }
    `);
    expect(result).toContain("type Dog = typeof(setmetatable({} :: DogData, Dog))");
    expect(result).toContain("Dog.__index = Dog");
    expect(result).toContain("function Dog.new(name: string): Dog");
    expect(result).toContain("local self = (Animal.new(name) :: any) :: DogData");
    expect(result).toContain("return (setmetatable(self, Dog) :: any) :: Dog");
    expect(result).toContain("function Dog.speak(self: Dog): string");
  });

  test("static methods use dot syntax", () => {
    const result = compileStmt(`
      class Factory {
        static create(): Factory { return new Factory(); }
      }
    `);
    expect(result).toContain("function Factory.create(): Factory");
    expect(result).not.toContain("function Factory:create");
  });

  test("property declarations with default values", () => {
    const result = compileStmt(`
      class Counter {
        count: number = 0;
        constructor() {}
      }
    `);
    expect(result).toContain("self.count = 0");
  });

  test("class generates type alias", () => {
    const result = compileStmt(`
      class Point {
        x: number;
        y: number;
        constructor(x: number, y: number) { this.x = x; this.y = y; }
        distanceTo(other: Point): number { return 0; }
      }
    `);
    expect(result).toContain("type PointData = {");
    expect(result).toContain("x: number");
    expect(result).toContain("y: number");
    expect(result).toContain("type Point = typeof(setmetatable({} :: PointData, Point))");
    expect(result).toContain("function Point.distanceTo(self: Point, other: Point): number");
  });

  test("class without explicit constructor generates default", () => {
    const result = compileStmt(`
      class Simple {
        value: number;
      }
    `);
    expect(result).toContain("function Simple.new(): Simple");
    expect(result).toContain("local self = {}");
    expect(result).toContain("return setmetatable(self, Simple)");
  });

  test("inherited class type extends parent type", () => {
    const result = compileStmt(`
      class Base {
        id: number;
        constructor(id: number) { this.id = id; }
      }
      class Child extends Base {
        name: string;
        constructor(id: number, name: string) { super(id); this.name = name; }
      }
    `);
    expect(result).toContain("type ChildData = BaseData & {");
    expect(result).toContain("type Child = typeof(setmetatable({} :: ChildData, Child))");
  });

  test("super.method() calls parent with self", () => {
    const result = compileStmt(`
      class Base {
        greet(): string { return "hello"; }
      }
      class Child extends Base {
        greet(): string { return super.greet() + " world"; }
      }
    `);
    expect(result).toContain("Base.greet((self :: any) :: Base)");
  });

  test("static property initializers", () => {
    const result = compileStmt(`
      class Config {
        static defaultValue: number = 42;
      }
    `);
    expect(result).toContain("Config.defaultValue = 42");
  });

  test("export default class", () => {
    const result = compileStmt(`
      export default class MyClass {
        constructor() {}
      }
    `);
    expect(result).toContain("local MyClass = {}");
    expect(result).toContain("return MyClass");
  });
});

describe("namespace declarations", () => {
  test("namespace compiles to local table", () => {
    const result = compileStmt(`
      namespace Utils {
        const x = 1;
        function add(a: number, b: number) { return a + b; }
      }
    `);
    expect(result).toContain("local Utils = Utils or {}");
    expect(result).toContain("Utils.x = x");
    expect(result).toContain("function Utils.add");
  });

  test("nested namespace compiles to nested table", () => {
    const result = compileStmt(`
      namespace Outer {
        namespace Inner {
          const value = 42;
        }
      }
    `);
    expect(result).toContain("Outer.Inner = Outer.Inner or {}");
    expect(result).toContain("Outer.Inner.value = value");
  });

  test("merged namespace declarations", () => {
    const result = compileStmt(`
      namespace Foo { const a = 1; }
      namespace Foo { const b = 2; }
    `);
    expect(result).toContain("local Foo = Foo or {}");
    expect(result).toContain("Foo.a = a");
    expect(result).toContain("Foo.b = b");
  });
});

describe("generator functions", () => {
  test("function* compiles to coroutine.wrap", () => {
    const result = compileStmt(`
      function* gen() {
        yield 1;
        yield 2;
      }
    `);
    expect(result).toContain("coroutine.wrap");
    expect(result).toContain("coroutine.yield(1)");
    expect(result).toContain("coroutine.yield(2)");
  });

  test("for..of on generator uses iterator", () => {
    const result = compileStmt(`
      function* range(n: number) {
        for (let i = 0; i < n; i++) yield i;
      }
      for (const x of range(5)) { print(x); }
    `);
    expect(result).toContain("coroutine.wrap");
    expect(result).toContain("for _, x in range(5)");
  });

  test("yield* delegates to iterable", () => {
    const result = compileStmt(`
      function* gen() {
        yield* [1, 2, 3];
      }
    `);
    expect(result).toContain("coroutine.wrap");
    expect(result).toMatch(/for.*in.*do/);
    expect(result).toContain("coroutine.yield");
  });
});
