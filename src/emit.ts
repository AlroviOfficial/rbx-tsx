import ts from "typescript";
import { transformSourceFile } from "./transforms/transform.ts";
import {
  TransformContext,
  DEFAULT_OPTIONS,
  type CompileOptions,
} from "./transforms/transform-context.ts";
import { generateLuau } from "./codegen/luau-codegen.ts";
import { WarningCollector, type WarningLevel } from "./warnings.ts";
import type { CSSManifest } from "./css-manifest.ts";
import type { PackageManifest } from "./package-manifest.ts";

/**
 * The pure TS-AST → Luau pipeline, with no dependency on the filesystem or the
 * Node program builder (`program.ts`). `compiler.ts` wires this together with an
 * in-process `ts.Program`; the browser playground wires it to a virtual program
 * built over an in-memory filesystem. Both share this emit step so the output is
 * identical.
 */

export interface CompilerOptions {
  reactPath?: string;
  reactRobloxPath?: string;
  regExpPath?: string;
  promisePath?: string;
  /** Base instance path where wally/pesde packages are mounted */
  packagesPath?: string;
  strict?: boolean;
  sourcemap?: boolean;
  /** Emit Luau string requires (`require("@game/...")`) instead of instance paths */
  stringRequires?: boolean;
  /** Omit the auto-generated header comments in the Luau output */
  silent?: boolean;
  /** Emit `local` everywhere instead of promoting unmodified bindings to `const` */
  noConst?: boolean;
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

export function buildCompileOptions(
  filename: string,
  options: CompilerOptions
): CompileOptions {
  return {
    reactPath: options.reactPath ?? DEFAULT_OPTIONS.reactPath,
    reactRobloxPath: options.reactRobloxPath ?? DEFAULT_OPTIONS.reactRobloxPath,
    regExpPath: options.regExpPath ?? DEFAULT_OPTIONS.regExpPath,
    promisePath: options.promisePath ?? DEFAULT_OPTIONS.promisePath,
    packagesPath: options.packagesPath ?? DEFAULT_OPTIONS.packagesPath,
    strict: options.strict ?? false,
    sourcemap: options.sourcemap ?? false,
    stringRequires: options.stringRequires ?? false,
    filename,
    cssManifest: options.cssManifest ?? null,
    pathAliases: options.pathAliases,
    packageManifest: options.packageManifest ?? null,
  };
}

/** Parse-only fallback used when no type-checked program is available. */
export function parseSourceFile(filename: string, source: string): ts.SourceFile {
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
export function emitFromSource(
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

  // Promote top-of-file hot-comments (//!native, //!optimize, ...) to Luau
  // directives, which must be the first lines of the output.
  const directives: string[] = [];
  let directiveEnd = -1;
  for (const range of ts.getLeadingCommentRanges(sourceFile.text, 0) ?? []) {
    const text = sourceFile.text.slice(range.pos, range.end).trim();
    if (text.startsWith("//!")) {
      directives.push(`--${text.slice(2)}`);
      directiveEnd = range.end;
    }
  }
  let directiveGap = false;
  if (directiveEnd >= 0 && sourceFile.statements.length > 0) {
    const endLine = sourceFile.getLineAndCharacterOfPosition(directiveEnd).line;
    const nextLine = sourceFile.getLineAndCharacterOfPosition(
      sourceFile.statements[0].getStart(sourceFile)
    ).line;
    directiveGap = nextLine - endLine > 1;
  }

  const luau = generateLuau(luauStatements, {
    sourceFile: filename,
    silent: options.silent ?? false,
    noConst: options.noConst ?? false,
    directives,
    directiveGap,
  });
  return { luau, warnings };
}
