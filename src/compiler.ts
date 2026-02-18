import ts from "typescript";
import { transformSourceFile } from "./transforms/transform.ts";
import { TransformContext, DEFAULT_OPTIONS, type CompileOptions } from "./transforms/transform-context.ts";
import { generateLuau } from "./codegen/luau-codegen.ts";
import { WarningCollector, type WarningLevel } from "./warnings.ts";
import type { CSSManifest } from "./css-manifest.ts";

export interface CompilerOptions {
  reactPath?: string;
  reactRobloxPath?: string;
  strict?: boolean;
  sourcemap?: boolean;
  warnLevel?: WarningLevel;
  cssManifest?: CSSManifest;
}

export interface CompileResult {
  /** Generated Luau source code */
  luau: string;
  /** Warnings collector */
  warnings: WarningCollector;
}

/**
 * Compile a single TSX/TS source file to Luau.
 */
export function compile(
  source: string,
  filename: string,
  options: CompilerOptions = {},
): CompileResult {
  const warnings = new WarningCollector(
    options.warnLevel ?? "all",
    options.strict ?? false,
  );

  const compileOpts: CompileOptions = {
    reactPath: options.reactPath ?? DEFAULT_OPTIONS.reactPath,
    reactRobloxPath: options.reactRobloxPath ?? DEFAULT_OPTIONS.reactRobloxPath,
    strict: options.strict ?? false,
    sourcemap: options.sourcemap ?? false,
    filename,
    cssManifest: options.cssManifest ?? null,
  };

  // Parse TSX/TS with TypeScript compiler API
  const sourceFile = ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true, // setParentNodes
    filename.endsWith(".tsx") || filename.endsWith(".jsx")
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS,
  );

  // Transform
  const ctx = new TransformContext(warnings, compileOpts);
  const luauStatements = transformSourceFile(sourceFile, ctx);

  // Generate Luau code
  const luau = generateLuau(luauStatements, {
    sourceFile: filename,
  });

  return { luau, warnings };
}

/**
 * Compile a directory of TSX/TS files.
 * Returns a map of output paths → Luau source code.
 */
export function compileProject(
  files: Map<string, string>,
  options: CompilerOptions = {},
): Map<string, CompileResult> {
  const results = new Map<string, CompileResult>();

  for (const [filename, source] of files) {
    // Skip test files
    if (filename.includes(".test.") || filename.includes(".spec.")) {
      continue;
    }

    const result = compile(source, filename, options);
    const outputPath = getOutputPath(filename);
    results.set(outputPath, result);
  }

  return results;
}

/**
 * Map input filename to output filename.
 */
export function getOutputPath(inputPath: string): string {
  return inputPath
    .replace(/\.tsx?$/, ".luau")
    .replace(/\.jsx?$/, ".luau")
    .replace(/index(\.(?:client|server))?\.luau$/, "init$1.luau");
}
