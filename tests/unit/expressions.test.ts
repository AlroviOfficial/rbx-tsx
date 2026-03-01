import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileExpr(expr: string, preamble = ""): string {
  const source = `${preamble}\nconst result = ${expr};`;
  const result = compile(source, "test.ts", { warnLevel: "none" });
  return result.luau;
}

function compileStmt(stmt: string): string {
  const result = compile(stmt, "test.ts", { warnLevel: "none" });
  return result.luau;
}

describe("literals", () => {
  test("string literal", () => {
    expect(compileExpr('"hello"')).toContain('local result = "hello"');
  });

  test("number literal", () => {
    expect(compileExpr("42")).toContain("local result = 42");
  });

  test("boolean true", () => {
    expect(compileExpr("true")).toContain("local result = true");
  });

  test("boolean false", () => {
    expect(compileExpr("false")).toContain("local result = false");
  });

  test("null → nil", () => {
    expect(compileExpr("null")).toContain("local result = nil");
  });

  test("undefined → nil", () => {
    expect(compileExpr("undefined")).toContain("local result = nil");
  });
});

describe("operators", () => {
  test("=== → ==", () => {
    expect(compileExpr("a === b", "declare const a: any, b: any;")).toContain("==");
  });

  test("!== → ~=", () => {
    expect(compileExpr("a !== b", "declare const a: any, b: any;")).toContain("~=");
  });

  test("! → not", () => {
    expect(compileExpr("!x", "declare const x: boolean;")).toContain("not");
  });

  test("&& → and", () => {
    expect(compileExpr("a && b", "declare const a: any, b: any;")).toContain("and");
  });

  test("|| → or", () => {
    expect(compileExpr("a || b", "declare const a: any, b: any;")).toContain("or");
  });

  test("?? → if/then/else", () => {
    const result = compileExpr("a ?? b", "declare const a: any, b: any;");
    expect(result).toContain("~= nil");
  });

  test("** → ^", () => {
    expect(compileExpr("a ** b", "declare const a: number, b: number;")).toContain("^");
  });
});

describe("template literals", () => {
  test("simple template", () => {
    const result = compileStmt("const x = `hello ${name}`;");
    expect(result).toContain("`hello {name}`");
  });
});

describe("ternary", () => {
  test("ternary expression", () => {
    const result = compileStmt("const x = cond ? 'a' : 'b';");
    expect(result).toContain("if cond then");
    expect(result).toContain("else");
  });
});

describe("typeof", () => {
  test("typeof x → typeof(x)", () => {
    const result = compileStmt("const t = typeof x;");
    expect(result).toContain("typeof(x)");
  });
});

describe("nullish coalescing", () => {
  test("a ?? b → if a ~= nil then a else b", () => {
    const result = compileStmt("const x = a ?? 'default';");
    expect(result).toContain("~= nil");
    expect(result).toContain('"default"');
  });
});

describe("new expressions", () => {
  test("new Instance() → Instance.new()", () => {
    const result = compileStmt('const x = new Instance("Frame");');
    expect(result).toContain('Instance.new("Frame")');
  });

  test("new Color3() → Color3.new()", () => {
    const result = compileStmt("const x = new Color3(1, 0, 0);");
    expect(result).toContain("Color3.new(1, 0, 0)");
  });

  test("new UDim2() → UDim2.new()", () => {
    const result = compileStmt("const x = new UDim2(1, 0, 0, 50);");
    expect(result).toContain("UDim2.new(1, 0, 0, 50)");
  });
});

describe("console methods", () => {
  test("console.log → print", () => {
    const result = compileStmt('console.log("hello");');
    expect(result).toContain('print("hello")');
  });

  test("console.warn → warn", () => {
    const result = compileStmt('console.warn("warning");');
    expect(result).toContain('warn("warning")');
  });

  test("console.error → warn with [ERROR]", () => {
    const result = compileStmt('console.error("bad");');
    expect(result).toContain('[ERROR]');
  });
});

describe("Math methods", () => {
  test("Math.floor → math.floor", () => {
    const result = compileStmt("const x = Math.floor(1.5);");
    expect(result).toContain("math.floor(1.5)");
  });

  test("Math.PI → math.pi", () => {
    const result = compileStmt("const x = Math.PI;");
    expect(result).toContain("math.pi");
  });

  test("Math.max → math.max", () => {
    const result = compileStmt("const x = Math.max(1, 2);");
    expect(result).toContain("math.max(1, 2)");
  });
});

describe("string methods", () => {
  test(".toLowerCase() → string.lower()", () => {
    const result = compileStmt('const x = s.toLowerCase();');
    expect(result).toContain("string.lower(s)");
  });

  test(".toUpperCase() → string.upper()", () => {
    const result = compileStmt('const x = s.toUpperCase();');
    expect(result).toContain("string.upper(s)");
  });

  test(".includes() → find check", () => {
    const result = compileStmt('const x = s.includes("test");');
    // Without type info, includes is treated as array method (table.find)
    expect(result).toContain("~= nil");
  });

  test(".split() → string.split", () => {
    const result = compileStmt('const x = s.split(",");');
    expect(result).toContain("string.split");
  });

  test(".length → #s", () => {
    const result = compileStmt("const x = s.length;");
    expect(result).toContain("#s");
  });
});

describe("array methods", () => {
  test(".push() → table.insert", () => {
    const result = compileStmt("arr.push(5);");
    expect(result).toContain("table.insert(arr, 5)");
  });

  test(".includes() → table.find ~= nil", () => {
    const result = compileStmt("const x = arr.includes(5);");
    expect(result).toContain("table.find(arr, 5) ~= nil");
  });

  test(".length → #arr", () => {
    const result = compileStmt("const x = arr.length;");
    expect(result).toContain("#arr");
  });

  test(".join() → table.concat", () => {
    const result = compileStmt('const x = arr.join(", ");');
    expect(result).toContain("table.concat");
  });
});

describe("parseInt/parseFloat", () => {
  test("parseInt → tonumber", () => {
    const result = compileStmt('const x = parseInt("42");');
    expect(result).toContain("tonumber");
  });

  test("parseFloat → tonumber", () => {
    const result = compileStmt('const x = parseFloat("3.14");');
    expect(result).toContain("tonumber");
  });
});

describe("JSON methods", () => {
  test("JSON.stringify → HttpService:JSONEncode", () => {
    const result = compileStmt("const x = JSON.stringify(obj);");
    expect(result).toContain("HttpService:JSONEncode(obj)");
  });

  test("JSON.parse → HttpService:JSONDecode", () => {
    const result = compileStmt('const x = JSON.parse(str);');
    expect(result).toContain("HttpService:JSONDecode(str)");
  });
});

describe("setTimeout/setInterval", () => {
  test("setTimeout → task.delay", () => {
    const result = compileStmt("setTimeout(fn, 1000);");
    expect(result).toContain("task.delay");
    expect(result).toContain("/ 1000");
  });

  test("clearTimeout → task.cancel", () => {
    const result = compileStmt("clearTimeout(id);");
    expect(result).toContain("task.cancel(id)");
  });
});

// ── Task 9: Missing array helpers ──

describe("array flat/flatMap/fill methods", () => {
  test(".flat() emits _arrayFlat helper", () => {
    const result = compileStmt("const x = arr.flat();");
    expect(result).toContain("_arrayFlat(arr, 1)");
    expect(result).toContain("local function _arrayFlat");
  });

  test(".flat(2) passes depth argument", () => {
    const result = compileStmt("const x = arr.flat(2);");
    expect(result).toContain("_arrayFlat(arr, 2)");
  });

  test(".flatMap() emits _arrayFlatMap helper", () => {
    const result = compileStmt("const x = arr.flatMap(fn);");
    expect(result).toContain("_arrayFlatMap(arr, fn)");
    expect(result).toContain("local function _arrayFlatMap");
  });

  test(".fill() emits _arrayFill helper", () => {
    const result = compileStmt("const x = arr.fill(0);");
    expect(result).toContain("_arrayFill(arr, 0)");
    expect(result).toContain("local function _arrayFill");
  });
});

describe("Number static methods", () => {
  test("Number.isInteger emits helper", () => {
    const result = compileStmt("const x = Number.isInteger(val);");
    expect(result).toContain("_numberIsInteger");
    expect(result).toContain("local function _numberIsInteger");
  });

  test("Number.isNaN emits helper", () => {
    const result = compileStmt("const x = Number.isNaN(val);");
    expect(result).toContain("_numberIsNaN");
    expect(result).toContain("local function _numberIsNaN");
  });
});

// ── Task 15: Regex literal warning ──

describe("regex literals", () => {
  test("regex literal emits warning and nil", () => {
    const result = compile("const r = /test/gi;", "test.ts", { warnLevel: "all" });
    expect(result.luau).toContain("nil");
    const warnings = result.warnings.getWarnings();
    expect(warnings.some(w => w.code === "unsupported-syntax")).toBe(true);
  });
});

// ── Task 10: Optional chaining for calls and bracket access ──

describe("optional chaining extensions", () => {
  test("a?.() → nil check with call", () => {
    const result = compileStmt("const x = a?.();");
    expect(result).toContain("~= nil");
  });

  test("a?.[b] → nil check with bracket access", () => {
    const result = compileStmt("const x = a?.[b];");
    expect(result).toContain("~= nil");
  });
});

// ── Task 18: 0-to-1 based indexing ──

describe("0-to-1 based indexing", () => {
  test("arr[0] → arr[1]", () => {
    const result = compileStmt("const x = arr[0];");
    expect(result).toContain("arr[1]");
  });

  test("arr[5] → arr[6]", () => {
    const result = compileStmt("const x = arr[5];");
    expect(result).toContain("arr[6]");
  });

  test('obj["key"] unchanged (string keys)', () => {
    const result = compileStmt('const x = obj["key"];');
    expect(result).toContain('obj["key"]');
    expect(result).not.toContain("+ 1");
  });

  test("arr[i] → arr[i + 1]", () => {
    const result = compileStmt("const x = arr[i];");
    expect(result).toContain("i + 1");
  });
});
