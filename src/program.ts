import ts from "typescript";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

/**
 * Builds in-memory `ts.Program`s so the codegen can query real types via a
 * `ts.TypeChecker` instead of relying purely on syntactic heuristics. Two entry
 * points share one host:
 *
 * - `createSingleFileProgram` — one source file + the bundled `types/`. Used by
 *   the single-file `compile()` API (and the test suite).
 * - `createProjectProgram` — all of a project's source files + `types/`, so the
 *   checker resolves types across `import` boundaries.
 *
 * Both include the repo's bundled Roblox/React `.d.ts` ambient declarations
 * (under `types/`) when they can be located. Programs are built incrementally:
 * the host is reused and each new program is handed the previous one as
 * `oldProgram`, so the (unchanged) lib and `types/` declarations keep their
 * bound/checked state across compiles. Rebuilding from scratch is ~30x slower,
 * dominated by re-binding the standard library.
 */

const HERE = dirname(fileURLToPath(import.meta.url));

// `types/` ships alongside the package (sibling of both `src/` in dev and
// `dist/` once built), so resolve relative to this module either way.
const TYPES_INDEX = join(HERE, "..", "types", "index.d.ts");
const HAS_TYPES = existsSync(TYPES_INDEX);

// Mirrors the relevant settings from the repo tsconfig.json. Hardcoded rather
// than read at runtime because tsconfig.json is not part of the published
// package, whereas these settings must stay stable.
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
  // Disable automatic inclusion of `@types/*` packages (e.g. node, bun-types);
  // we only want our own ambient declarations and the lib, and scanning them is
  // slow and irrelevant to Roblox/Luau output.
  types: [],
};

function scriptKindFor(filename: string): ts.ScriptKind {
  if (filename.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (filename.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (filename.endsWith(".js")) return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

interface OverlayFile {
  source: string;
  kind: ts.ScriptKind;
}

// The in-memory file(s) currently being compiled, read by the shared host
// during program construction (which is synchronous, so there is no reentrancy
// concern). `currentDirs` holds every ancestor directory of those files so
// module resolution sees them as real directories.
let currentFiles = new Map<string, OverlayFile>();
let currentDirs = new Set<string>();

// Cache of parsed overlay SourceFiles keyed by canonical path. Reusing the same
// instance when content is unchanged lets `oldProgram` skip re-binding it (the
// fast path for watch, where most files are unchanged between rebuilds).
const overlayCache = new Map<string, { text: string; sf: ts.SourceFile }>();

// Lib + `.d.ts` SourceFiles never change, so cache them across every program.
const libCache = new Map<string, ts.SourceFile | undefined>();

let canonicalize: ((n: string) => string) | null = null;
let host: ts.CompilerHost | null = null;
let oldSingleProgram: ts.Program | undefined;
let oldProjectProgram: ts.Program | undefined;

function toFilePath(filename: string): string {
  return ts.sys.resolvePath(filename).split("\\").join("/");
}

function getHost(): ts.CompilerHost {
  if (host) return host;
  const base = ts.createCompilerHost(COMPILER_OPTIONS, true);
  // TypeScript normalizes paths to forward slashes internally, so match on a
  // slash-normalized, case-folded key (resolvePath yields backslashes on
  // Windows, which would otherwise never match the program's lookups).
  canonicalize = (n: string) => base.getCanonicalFileName(n.split("\\").join("/"));
  const canonical = canonicalize;

  const overlayFor = (name: string): OverlayFile | undefined =>
    currentFiles.get(canonical(name));

  host = {
    ...base,
    getSourceFile(name, languageVersionOrOptions, onError, shouldCreate) {
      const key = canonical(name);
      const overlay = currentFiles.get(key);
      if (overlay) {
        const cached = overlayCache.get(key);
        if (cached && cached.text === overlay.source) return cached.sf;
        const sf = ts.createSourceFile(
          name,
          overlay.source,
          languageVersionOrOptions,
          true,
          overlay.kind
        );
        overlayCache.set(key, { text: overlay.source, sf });
        return sf;
      }
      if (libCache.has(key)) return libCache.get(key);
      const sf = base.getSourceFile(
        name,
        languageVersionOrOptions,
        onError,
        shouldCreate
      );
      libCache.set(key, sf);
      return sf;
    },
    fileExists(name) {
      if (overlayFor(name)) return true;
      return base.fileExists(name);
    },
    readFile(name) {
      const overlay = overlayFor(name);
      if (overlay) return overlay.source;
      return base.readFile(name);
    },
    directoryExists(name) {
      if (currentDirs.has(canonical(name))) return true;
      return base.directoryExists ? base.directoryExists(name) : false;
    },
  };
  return host;
}

/** Populate the overlay with the given files and their ancestor directories. */
function setOverlay(files: Map<string, OverlayFile>): void {
  currentFiles = files;
  currentDirs = new Set();
  const canonical = canonicalize!;
  for (const key of files.keys()) {
    let dir = key;
    while (true) {
      const parent = dir.slice(0, dir.lastIndexOf("/"));
      if (!parent || parent === dir) break;
      currentDirs.add(canonical(parent));
      dir = parent;
    }
  }
}

export interface SingleFileProgram {
  sourceFile: ts.SourceFile;
  checker: ts.TypeChecker;
}

/**
 * Build a type-checked program for a single `source`. Returns `null` if the
 * program cannot be constructed (e.g. the TypeScript lib files are
 * unavailable), in which case the caller should fall back to a parse-only
 * `ts.SourceFile`.
 */
export function createSingleFileProgram(
  filename: string,
  source: string
): SingleFileProgram | null {
  try {
    const h = getHost();
    const canonical = canonicalize!;
    const filePath = toFilePath(filename);
    setOverlay(
      new Map([[canonical(filePath), { source, kind: scriptKindFor(filename) }]])
    );

    const rootNames = [filePath];
    if (HAS_TYPES) rootNames.push(TYPES_INDEX);

    const program = ts.createProgram({
      rootNames,
      options: COMPILER_OPTIONS,
      host: h,
      oldProgram: oldSingleProgram,
    });
    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) return null;

    oldSingleProgram = program;
    return { sourceFile, checker: program.getTypeChecker() };
  } catch {
    return null;
  }
}

export interface ProjectProgram {
  checker: ts.TypeChecker;
  getSourceFile(filename: string): ts.SourceFile | undefined;
}

/**
 * Build one type-checked program over all `files` (keyed by filename → source)
 * plus the bundled `types/`. The shared checker resolves types across `import`
 * boundaries between the given files. Returns `null` if the program cannot be
 * constructed.
 */
export function createProjectProgram(
  files: Map<string, string>
): ProjectProgram | null {
  try {
    const h = getHost();
    const canonical = canonicalize!;
    const overlay = new Map<string, OverlayFile>();
    const rootNames: string[] = [];
    for (const [filename, source] of files) {
      const filePath = toFilePath(filename);
      overlay.set(canonical(filePath), {
        source,
        kind: scriptKindFor(filename),
      });
      rootNames.push(filePath);
    }
    setOverlay(overlay);
    if (HAS_TYPES) rootNames.push(TYPES_INDEX);

    const program = ts.createProgram({
      rootNames,
      options: COMPILER_OPTIONS,
      host: h,
      oldProgram: oldProjectProgram,
    });
    oldProjectProgram = program;
    const checker = program.getTypeChecker();
    return {
      checker,
      getSourceFile: (filename) => program.getSourceFile(toFilePath(filename)),
    };
  } catch {
    return null;
  }
}
