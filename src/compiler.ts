import { createSingleFileProgram, createProjectProgram } from "./program.ts";
import { WarningCollector } from "./warnings.ts";
import {
  emitFromSource,
  parseSourceFile,
  type CompilerOptions,
  type CompileResult,
} from "./emit.ts";

export type { CompilerOptions, CompileResult } from "./emit.ts";

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
  return emitFromSource(sourceFile, program?.checker, filename, options);
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
        emitFromSource(sourceFile, program?.checker, filename, options)
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
