import { describe, test, expect, beforeAll, afterAll } from "bun:test";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  existsSync,
  readFileSync,
  rmSync,
} from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { isCopyableLuau } from "../../src/cli.ts";

const cliPath = join(import.meta.dir, "..", "..", "src", "index.ts");

function runCompile(args: string[]) {
  const result = Bun.spawnSync([process.execPath, "run", cliPath, "compile", ...args]);
  return {
    exitCode: result.exitCode,
    stdout: result.stdout.toString(),
    stderr: result.stderr.toString(),
  };
}

describe("isCopyableLuau", () => {
  test("accepts .luau and .lua files", () => {
    expect(isCopyableLuau("config.luau")).toBe(true);
    expect(isCopyableLuau("legacy.lua")).toBe(true);
    expect(isCopyableLuau("nested/dir/module.luau")).toBe(true);
  });

  test("rejects other extensions", () => {
    expect(isCopyableLuau("component.tsx")).toBe(false);
    expect(isCopyableLuau("module.ts")).toBe(false);
    expect(isCopyableLuau("styles.css")).toBe(false);
  });

  test("rejects test, spec, and declaration files", () => {
    expect(isCopyableLuau("config.test.luau")).toBe(false);
    expect(isCopyableLuau("config.spec.luau")).toBe(false);
    expect(isCopyableLuau("globalTypes.d.luau")).toBe(false);
    expect(isCopyableLuau("globalTypes.d.lua")).toBe(false);
  });
});

describe("Luau passthrough in directory compilation", () => {
  let projectDir: string;
  let srcDir: string;
  let outDir: string;

  beforeAll(() => {
    projectDir = mkdtempSync(join(tmpdir(), "rbx-tsx-passthrough-"));
    srcDir = join(projectDir, "src");
    outDir = join(projectDir, "out");
    mkdirSync(join(srcDir, "shared"), { recursive: true });

    writeFileSync(
      join(srcDir, "main.ts"),
      "export function add(a: number, b: number): number { return a + b }\n"
    );
    writeFileSync(
      join(srcDir, "shared", "config.luau"),
      'return { greeting = "hello" }\n'
    );
    writeFileSync(join(srcDir, "legacy.lua"), "return 42\n");
    writeFileSync(
      join(srcDir, "shared", "config.test.luau"),
      "return nil\n"
    );
    writeFileSync(join(srcDir, "types.d.luau"), "declare foo: number\n");

    const result = runCompile([srcDir, "-o", outDir]);
    expect(result.exitCode).toBe(0);
  });

  afterAll(() => {
    rmSync(projectDir, { recursive: true, force: true });
  });

  test("compiles TS sources into the output tree", () => {
    expect(existsSync(join(outDir, "main.luau"))).toBe(true);
  });

  test("copies .luau files verbatim, preserving directory structure", () => {
    const copied = join(outDir, "shared", "config.luau");
    expect(existsSync(copied)).toBe(true);
    expect(readFileSync(copied, "utf-8")).toBe('return { greeting = "hello" }\n');
  });

  test("copies .lua files", () => {
    const copied = join(outDir, "legacy.lua");
    expect(existsSync(copied)).toBe(true);
    expect(readFileSync(copied, "utf-8")).toBe("return 42\n");
  });

  test("does not copy test or declaration files", () => {
    expect(existsSync(join(outDir, "shared", "config.test.luau"))).toBe(false);
    expect(existsSync(join(outDir, "types.d.luau"))).toBe(false);
  });
});

describe("Luau passthrough with the output directory inside the input", () => {
  let projectDir: string;
  let outDir: string;

  beforeAll(() => {
    projectDir = mkdtempSync(join(tmpdir(), "rbx-tsx-nested-out-"));
    outDir = join(projectDir, "out");
    writeFileSync(join(projectDir, "main.ts"), "export const x: number = 1\n");
    writeFileSync(join(projectDir, "config.luau"), "return 1\n");
  });

  afterAll(() => {
    rmSync(projectDir, { recursive: true, force: true });
  });

  test("repeated runs do not re-copy the output into itself", () => {
    expect(runCompile([projectDir, "-o", outDir]).exitCode).toBe(0);
    expect(runCompile([projectDir, "-o", outDir]).exitCode).toBe(0);

    expect(existsSync(join(outDir, "main.luau"))).toBe(true);
    expect(existsSync(join(outDir, "config.luau"))).toBe(true);
    expect(existsSync(join(outDir, "out"))).toBe(false);
  });
});

describe("Luau passthrough collision with compiled output", () => {
  let projectDir: string;
  let srcDir: string;
  let outDir: string;

  beforeAll(() => {
    projectDir = mkdtempSync(join(tmpdir(), "rbx-tsx-collision-"));
    srcDir = join(projectDir, "src");
    outDir = join(projectDir, "out");
    mkdirSync(srcDir);
    writeFileSync(join(srcDir, "foo.ts"), "export const x: number = 1\n");
    writeFileSync(join(srcDir, "foo.luau"), "return 2\n");
  });

  afterAll(() => {
    rmSync(projectDir, { recursive: true, force: true });
  });

  test("keeps the compiled file and warns instead of overwriting", () => {
    const result = runCompile([srcDir, "-o", outDir]);
    expect(result.exitCode).toBe(0);
    expect(result.stderr).toContain("collides with a compiled output");
    // The compiled module wins; the hand-written copy is skipped.
    expect(readFileSync(join(outDir, "foo.luau"), "utf-8")).toContain(
      "const x: number = 1"
    );
  });
});

describe("Luau passthrough with in-place compilation", () => {
  let srcDir: string;

  beforeAll(() => {
    srcDir = mkdtempSync(join(tmpdir(), "rbx-tsx-inplace-"));
    writeFileSync(join(srcDir, "main.ts"), "export const x: number = 1\n");
    writeFileSync(join(srcDir, "module.luau"), "return 1\n");
  });

  afterAll(() => {
    rmSync(srcDir, { recursive: true, force: true });
  });

  test("leaves hand-written Luau files untouched when output is the input dir", () => {
    const result = runCompile([srcDir]);
    expect(result.exitCode).toBe(0);
    expect(readFileSync(join(srcDir, "module.luau"), "utf-8")).toBe("return 1\n");
  });
});
