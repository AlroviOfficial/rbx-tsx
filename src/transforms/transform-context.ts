import ts from "typescript";
import type { WarningCollector, WarningCode } from "../warnings.ts";
import type { LuauStatement, LuauExpression } from "../ast/luau-ast.ts";
import type { CSSManifest } from "../css-manifest.ts";
import {
  type PackageManifest,
  resolvePackageName,
} from "../package-manifest.ts";

export interface CompileOptions {
  reactPath: string;
  reactRobloxPath: string;
  regExpPath: string;
  promisePath: string;
  strict: boolean;
  sourcemap: boolean;
  filename?: string;
  cssManifest?: CSSManifest | null;
  /** Directory-to-Luau-path mappings for cross-boundary imports */
  pathAliases?: Map<string, string>;
  /** Package manifest for resolving import specifiers to correct dependency keys */
  packageManifest?: PackageManifest | null;
}

export const DEFAULT_OPTIONS: CompileOptions = {
  reactPath: "ReplicatedStorage.Packages.React",
  reactRobloxPath: "ReplicatedStorage.Packages.ReactRoblox",
  regExpPath: "ReplicatedStorage.Packages.RegExp",
  promisePath: "ReplicatedStorage.Packages.Promise",
  strict: false,
  sourcemap: false,
};

/**
 * Shared context passed through all transform phases.
 * Tracks imports, helpers, and accumulated state.
 */
export class TransformContext {
  /** Warnings collector */
  readonly warnings: WarningCollector;
  /** Compile options */
  readonly options: CompileOptions;
  /** Source filename */
  readonly filename: string;

  /** Whether React import is needed (always true for TSX files) */
  needsReact = false;
  /** Whether ReactRoblox import is needed */
  needsReactRoblox = false;
  /** Whether the Promise library is needed */
  needsPromise = false;
  /** Whether the RegExp library is needed (luau-regexp) */
  needsRegExp = false;

  /** Named React imports needed (useState, useEffect, etc.) */
  readonly reactImports = new Set<string>();

  /** Roblox services that need game:GetService() */
  readonly requiredServices = new Set<string>();

  /** Helper functions that need to be emitted */
  readonly requiredHelpers = new Set<string>();

  /** Tracks what the default export is */
  defaultExport: string | null = null;
  /** Named exports */
  readonly namedExports = new Map<string, string>();
  /** Type exports */
  readonly typeExports = new Set<string>();

  /** Whether this file has any non-default exports */
  hasNamedExports = false;

  /** Accumulated top-level statements (before return) */
  readonly bodyStatements: LuauStatement[] = [];

  /** Track imported modules for require path resolution */
  readonly importedModules = new Map<string, string>();

  /** Track require paths already emitted → Luau variable name (deduplication) */
  readonly requiredModulePaths = new Map<string, string>();

  /** CSS module imports: localName → style require path */
  readonly cssModuleImports = new Map<string, string>();

  /** Side-effect CSS imports awaiting auto-attachment to createRoot container */
  readonly pendingStylesheets: string[] = [];

  /** CSS manifest for cross-compiler collaboration */
  readonly cssManifest: CSSManifest | null;

  /** Directory-to-Luau-path mappings for cross-boundary imports */
  readonly pathAliases: Map<string, string>;

  /** Package manifest for resolving import specifiers to correct dependency keys */
  readonly packageManifest: PackageManifest | null;

  /** Source file reference for line/column extraction */
  sourceFile?: ts.SourceFile;

  /** Whether the current file is an index file (becomes init.luau — script IS the folder) */
  readonly isIndexFile: boolean;

  /** Variables known to be Map instances (for method → table operation transforms) */
  readonly mapVariables = new Set<string>();

  /** Variables known to be Set instances (for method → table operation transforms) */
  readonly setVariables = new Set<string>();

  /** Const array declarations with all-string-literal elements: name → element values */
  readonly constArrayValues = new Map<string, string[]>();

  /** Object literal declarations: name → key names */
  readonly constObjectKeys = new Map<string, string[]>();

  /** Pre-statements accumulated during expression transforms (e.g., temp vars for optional chains) */
  readonly preStatements: LuauStatement[] = [];

  /** Counter for generating unique temp variable names */
  private _tempCounter = 0;

  /** The class currently being transformed (null when outside a class) */
  currentClassName: string | null = null;

  /** The parent class name (from extends clause) of the class being transformed */
  currentParentClassName: string | null = null;

  /** Class names in this file — used to emit dot vs colon for static vs instance method calls */
  readonly knownClassNames = new Set<string>();

  /** When transforming a namespace body, the table expression to assign exports to */
  namespacePrefix: LuauExpression | null = null;

  /** When transforming a generator function body, yields become coroutine.yield */
  isGenerator = false;

  /** Stack of (label, flagVar) for labeled loops — used for break label */
  breakLabelStack: Array<{ label: string; flag: string }> = [];

  constructor(warnings: WarningCollector, options: CompileOptions) {
    this.warnings = warnings;
    this.options = options;
    this.filename = options.filename ?? "unknown";
    this.cssManifest = options.cssManifest ?? null;
    this.pathAliases = options.pathAliases ?? new Map();
    this.packageManifest = options.packageManifest ?? null;
    this.isIndexFile =
      /(?:^|[\\/])index(?:\.(?:client|server))?\.[tj]sx?$/.test(this.filename);
  }

  warn(
    code: WarningCode,
    message: string,
    line?: number,
    column?: number
  ): void {
    this.warnings.warn({
      code,
      message,
      file: this.filename,
      line,
      column,
    });
  }

  /** Warn with automatic line/column extraction from a TS node */
  warnAtNode(code: WarningCode, message: string, node: ts.Node): void {
    let line: number | undefined;
    let column: number | undefined;
    if (this.sourceFile) {
      const pos = node.getStart(this.sourceFile);
      const lineAndChar = ts.getLineAndCharacterOfPosition(
        this.sourceFile,
        pos
      );
      line = lineAndChar.line + 1;
      column = lineAndChar.character + 1;
    }
    this.warn(code, message, line, column);
  }

  /** Request a Roblox service to be auto-imported */
  requireService(name: string): void {
    this.requiredServices.add(name);
  }

  /** Request a helper function to be generated */
  requireHelper(name: string): void {
    this.requiredHelpers.add(name);
  }

  /** Check if a CSS className triggers ScrollingFrame upgrade */
  isScrollingFrameClass(className: string): boolean {
    return this.cssManifest?.classes[className]?.overflowScroll === true;
  }

  /** Resolve a package import specifier to its Luau require path */
  resolvePackageRequirePath(specifier: string): string {
    const packageName = resolvePackageName(specifier, this.packageManifest);
    return `ReplicatedStorage.Packages.${packageName}`;
  }

  /** Generate a unique temp variable name for optional chain extraction */
  nextTempVar(): string {
    return `_opt${this._tempCounter++}`;
  }

  /** Add a statement that must be emitted before the current expression's containing statement */
  pushPreStatement(stmt: LuauStatement): void {
    this.preStatements.push(stmt);
  }

  /** Drain and return all accumulated pre-statements */
  flushPreStatements(): LuauStatement[] {
    if (this.preStatements.length === 0) return [];
    return this.preStatements.splice(0);
  }
}
