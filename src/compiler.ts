import ts from "typescript";
import { transformSourceFile } from "./transforms/transform.ts";
import {
  TransformContext,
  DEFAULT_OPTIONS,
  type CompileOptions,
} from "./transforms/transform-context.ts";
import { generateLuau } from "./codegen/luau-codegen.ts";
import { createSingleFileProgram, createProjectProgram } from "./program.ts";
import { WarningCollector, type WarningLevel } from "./warnings.ts";
import type { CSSManifest } from "./css-manifest.ts";
import type { PackageManifest } from "./package-manifest.ts";

export interface CompilerOptions {
  reactPath?: string;
  reactRobloxPath?: string;
  regExpPath?: string;
  promisePath?: string;
  strict?: boolean;
  sourcemap?: boolean;
  warnLevel?: WarningLevel;
  cssManifest?: CSSManifest;
  /** Directory-to-Luau-path mappings for cross-boundary imports */
  pathAliases?: Map<string, string>;
  /** Package manifest for resolving import specifiers to correct dependency keys */
  packageManifest?: PackageManifest;
}

export interface CompileResult {
  /** Generated Luau source code */
  luau: string;
  /** Warnings collector */
  warnings: WarningCollector;
  /**
   * Set by compileProject when a single file throws during transform, so one
   * bad file does not abort the whole batch. Undefined on success.
   */
  error?: unknown;
}

function buildCompileOptions(
  filename: string,
  options: CompilerOptions
): CompileOptions {
  return {
    reactPath: options.reactPath ?? DEFAULT_OPTIONS.reactPath,
    reactRobloxPath: options.reactRobloxPath ?? DEFAULT_OPTIONS.reactRobloxPath,
    regExpPath: options.regExpPath ?? DEFAULT_OPTIONS.regExpPath,
    promisePath: options.promisePath ?? DEFAULT_OPTIONS.promisePath,
    strict: options.strict ?? false,
    sourcemap: options.sourcemap ?? false,
    filename,
    cssManifest: options.cssManifest ?? null,
    pathAliases: options.pathAliases,
    packageManifest: options.packageManifest ?? null,
  };
}

/** Parse-only fallback used when no type-checked program is available. */
function parseSourceFile(filename: string, source: string): ts.SourceFile {
  return ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true, // setParentNodes
    filename.endsWith(".tsx") || filename.endsWith(".jsx")
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS
  );
}

/** Transform an (already parsed) source file to Luau, using `checker` if present. */
function emit(
  sourceFile: ts.SourceFile,
  checker: ts.TypeChecker | undefined,
  filename: string,
  options: CompilerOptions
): CompileResult {
  const warnings = new WarningCollector(
    options.warnLevel ?? "all",
    options.strict ?? false
  );
  const ctx = new TransformContext(warnings, buildCompileOptions(filename, options));
  ctx.checker = checker;
  const luauStatements = transformSourceFile(sourceFile, ctx);
  const luau = generateLuau(luauStatements, { sourceFile: filename });
  return { luau, warnings };
}

/**
 * Compile a single TSX/TS source file to Luau.
 */
export function compile(
  source: string,
  filename: string,
  options: CompilerOptions = {}
): CompileResult {
  // Build a type-checked program so codegen can query real types. Falls back to
  // a parse-only SourceFile (no checker) if the program cannot be constructed.
  const program = createSingleFileProgram(filename, source);
  const sourceFile = program?.sourceFile ?? parseSourceFile(filename, source);
  return emit(sourceFile, program?.checker, filename, options);
}

/**
 * Compile a project of TSX/TS files as a unit, so the type checker resolves
 * types across `import` boundaries between them.
 * Returns a map of output paths → compile results.
 */
export function compileProject(
  files: Map<string, string>,
  options: CompilerOptions = {}
): Map<string, CompileResult> {
  const sources = new Map<string, string>();
  for (const [filename, source] of files) {
    if (filename.includes(".test.") || filename.includes(".spec.")) continue;
    sources.set(filename, source);
  }

  const program = createProjectProgram(sources);

  const results = new Map<string, CompileResult>();
  for (const [filename, source] of sources) {
    try {
      const sourceFile =
        program?.getSourceFile(filename) ?? parseSourceFile(filename, source);
      results.set(
        getOutputPath(filename),
        emit(sourceFile, program?.checker, filename, options)
      );
    } catch (error) {
      results.set(getOutputPath(filename), {
        luau: "",
        warnings: new WarningCollector(options.warnLevel ?? "all", options.strict ?? false),
        error,
      });
    }
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
