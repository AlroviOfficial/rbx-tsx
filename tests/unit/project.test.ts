import { describe, test, expect } from "bun:test";
import { compileProject } from "../../src/compiler.ts";

describe("cross-file type inference (project program)", () => {
  test("imported function return type drives numeric truthiness", () => {
    const files = new Map([
      ["counter.ts", "export function getCount(): number { return 0; }"],
      [
        "main.ts",
        'import { getCount } from "./counter";\nconst n = getCount();\nif (n) { print(n); }',
      ],
    ]);
    const results = compileProject(files, { warnLevel: "none" });
    const main = results.get("main.luau");
    expect(main).toBeDefined();
    expect(main!.luau).toContain("if n ~= 0 and n == n then");
  });

  test("imported interface field type drives string truthiness", () => {
    const files = new Map([
      ["types.ts", "export interface User { name: string; }"],
      [
        "app.ts",
        'import type { User } from "./types";\nfunction f(u: User) { if (u.name) { print(u.name); } }',
      ],
    ]);
    const results = compileProject(files, { warnLevel: "none" });
    const app = results.get("app.luau");
    expect(app).toBeDefined();
    expect(app!.luau).toContain('if u.name ~= "" then');
  });

  test("imported array return type drives index shift", () => {
    const files = new Map([
      ["data.ts", "export function getItems(): number[] { return []; }"],
      [
        "use.ts",
        'import { getItems } from "./data";\nconst arr = getItems();\nconst v = arr[0];',
      ],
    ]);
    const results = compileProject(files, { warnLevel: "none" });
    const use = results.get("use.luau");
    expect(use).toBeDefined();
    expect(use!.luau).toContain("arr[1]");
  });
});
