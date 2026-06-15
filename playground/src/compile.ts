import ts from "typescript";
import { createVirtualHost } from "./virtual-host.ts";
import { emitFromSource } from "../../src/emit.ts";
import type { CompilerWarning } from "../../src/warnings.ts";
import { LIB_FILES, TYPE_FILES } from "./generated/embedded.ts";

/**
 * Browser entry point for the compiler. Mirrors `createSingleFileProgram` from
 * `program.ts`, but builds the `ts.Program` over a virtual filesystem instead of
 * `ts.sys`, so the full `ts.TypeChecker` runs client-side and the output matches
 * the CLI byte-for-byte.
 */

// Mirrors COMPILER_OPTIONS in src/program.ts so type resolution matches the CLI.
const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  lib: ["lib.esnext.d.ts"],
  module: ts.ModuleKind.Preserve,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  allowJs: true,
  allowImportingTsExtensions: true,
  noEmit: true,
  skipLibCheck: true,
  strict: true,
  types: [],
};

// Built once from the embedded lib + ambient declarations; the user's source is
// added per compile into a fresh clone.
const baseFsMap = new Map<string, string>();
for (const [name, text] of Object.entries(LIB_FILES)) baseFsMap.set(name, text);
for (const [name, text] of Object.entries(TYPE_FILES)) baseFsMap.set(name, text);

const ALL_TYPE_FILES = Object.keys(TYPE_FILES);

let oldProgram: ts.Program | undefined;

export interface Diagnostic {
  /** Character offset range into the source, for inline underlining. */
  from: number;
  to: number;
  line: number;
  column: number;
  severity: "error" | "warning" | "info";
  message: string;
  /** "ts" for type-checker diagnostics, "rbx-tsx" for compiler warnings. */
  source: "ts" | "rbx-tsx";
}

export interface PlaygroundResult {
  luau: string;
  warnings: readonly CompilerWarning[];
  diagnostics: Diagnostic[];
  /** Set when the transform itself throws (malformed input the parser accepts). */
  error?: string;
}

const SEVERITY: Record<ts.DiagnosticCategory, "error" | "warning" | "info"> = {
  [ts.DiagnosticCategory.Error]: "error",
  [ts.DiagnosticCategory.Warning]: "warning",
  [ts.DiagnosticCategory.Suggestion]: "info",
  [ts.DiagnosticCategory.Message]: "info",
};

function tsDiagnostics(
  program: ts.Program,
  sourceFile: ts.SourceFile
): Diagnostic[] {
  const raw = [
    ...program.getSyntacticDiagnostics(sourceFile),
    ...program.getSemanticDiagnostics(sourceFile),
  ];
  return raw.map((d) => {
    const from = d.start ?? 0;
    const to = from + (d.length ?? 0);
    const pos = d.file?.getLineAndCharacterOfPosition(from) ?? { line: 0, character: 0 };
    return {
      from,
      to,
      line: pos.line + 1,
      column: pos.character + 1,
      severity: SEVERITY[d.category],
      message: ts.flattenDiagnosticMessageText(d.messageText, "\n"),
      source: "ts" as const,
    };
  });
}

export function compileToLuau(source: string, filename = "input.tsx"): PlaygroundResult {
  const userPath = "/" + filename;
  const fsMap = new Map(baseFsMap);
  fsMap.set(userPath, source);

  try {
    const host = createVirtualHost(fsMap, COMPILER_OPTIONS);
    // All ambient `types/` files are roots so the checker resolves `react`,
    // `react-roblox`, etc. for the diagnostics panel. `index.d.ts` (and its
    // triple-slash refs) is what the CLI loads; the extra ambient module files
    // only add `declare module` resolution, which doesn't affect codegen — the
    // emit step is verified byte-identical to the CLI.
    const rootNames = [userPath, ...ALL_TYPE_FILES];
    const program = ts.createProgram({
      rootNames,
      options: COMPILER_OPTIONS,
      host,
      oldProgram,
    });
    oldProgram = program;

    const sourceFile = program.getSourceFile(userPath);
    if (!sourceFile) {
      return { luau: "", warnings: [], diagnostics: [], error: "Could not parse source file." };
    }
    const diagnostics = tsDiagnostics(program, sourceFile);
    const result = emitFromSource(sourceFile, program.getTypeChecker(), filename, {});
    return { luau: result.luau, warnings: result.warnings.getWarnings(), diagnostics };
  } catch (err) {
    return {
      luau: "",
      warnings: [],
      diagnostics: [],
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
