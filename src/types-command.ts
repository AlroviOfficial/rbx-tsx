import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { basename, dirname, join, relative, resolve } from "path";
import {
  extractFromEntry,
  extractProjectTypes,
  type ExtractResult,
} from "./type-extraction/index.ts";
import { emitStandaloneDts } from "./type-extraction/emit.ts";

export interface TypesOptions {
  output?: string;
}

/** Write the generated declarations to disk, returning the absolute paths. */
function writePackageTypes(result: ExtractResult, outDir: string): string[] {
  mkdirSync(outDir, { recursive: true });
  const written: string[] = [];
  for (const pkg of result.packages) {
    const file = join(outDir, `${pkg.key}.d.ts`);
    writeFileSync(file, pkg.dts);
    written.push(file);
  }
  return written;
}

/** Default output directory: <manifestDir>/types/packages. */
function defaultOutDir(result: ExtractResult): string {
  return join(result.manifestDir, "types", "packages");
}

/**
 * Generate package types as a side-step of `compile`/`watch`. Quietly no-ops
 * when there is nothing to generate; logs a one-line summary otherwise.
 */
export function generatePackageTypes(projectDir: string): void {
  const result = extractProjectTypes(projectDir);
  if (!result || result.packages.length === 0) return;
  const outDir = defaultOutDir(result);
  writePackageTypes(result, outDir);
  console.log(
    `Types: ${result.packages.length} package declaration(s) -> ${relative(
      process.cwd(),
      outDir
    )}`
  );
}

/**
 * `rbx-tsx types [dir]` — generate TypeScript declarations from installed
 * wally/pesde Luau packages so they import with real types.
 */
export function handleTypes(directory: string | undefined, opts: TypesOptions): void {
  const target = directory ? resolve(directory) : process.cwd();

  // A plain .luau/.lua module file: emit a sibling .d.ts.
  if (/\.luau?$/.test(target) && existsSync(target) && statSync(target).isFile()) {
    const written = writeLocalModuleTypes([target]);
    console.log(`Generated ${written.length} declaration(s).`);
    return;
  }

  const result = extractProjectTypes(target);

  // An explicitly-given directory that is not itself the manifest dir (e.g.
  // `rbx-tsx types src`) is treated as a tree of local .luau modules, not as
  // the package project the manifest above it belongs to.
  const localMode = !result || (directory !== undefined && result.manifestDir !== target);
  if (localMode) {
    const modules = findLocalModules(target);
    if (modules.length === 0) {
      console.error(
        result
          ? "No .luau modules found under the given path."
          : "No wally.toml or pesde.toml found, and no .luau modules under the given path."
      );
      process.exit(1);
    }
    const written = writeLocalModuleTypes(modules);
    console.log(`Generated ${written.length} local module declaration(s).`);
    return;
  }

  const outDir = opts.output ? resolve(opts.output) : defaultOutDir(result);

  if (result.packages.length === 0) {
    console.log(
      `No package types to generate (${result.manifest.pm}). ` +
        "Install dependencies first, or they may all have bundled types."
    );
  } else {
    const written = writePackageTypes(result, outDir);
    for (let i = 0; i < written.length; i++) {
      console.log(`  ${result.packages[i]!.key} -> ${relative(process.cwd(), written[i]!)}`);
    }
    console.log(`\nGenerated ${result.packages.length} package declaration(s).`);
  }

  const bundled = result.skipped.filter((s) => s.reason === "bundled");
  const unresolved = result.skipped.filter((s) => s.reason === "unresolved");
  if (bundled.length) {
    console.log(`Skipped (bundled types): ${bundled.map((s) => s.key).join(", ")}`);
  }
  if (unresolved.length) {
    console.log(
      `Could not resolve: ${unresolved.map((s) => s.key).join(", ")} ` +
        "(not installed, or an unsupported layout)"
    );
  }

  if (result.packages.length > 0) warnIfNotIncluded(result.manifestDir, outDir);
}

/** Directories that hold installed packages or tooling, not project modules. */
const SKIP_DIRS = new Set([
  "node_modules",
  "Packages",
  "ServerPackages",
  "DevPackages",
  "roblox_packages",
  "roblox_server_packages",
  "luau_packages",
  "lune_packages",
  "_Index",
  ".pesde",
  ".git",
]);

/** Recursively find local ModuleScript .luau/.lua files (skips Scripts/LocalScripts). */
function findLocalModules(dir: string): string[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (!SKIP_DIRS.has(entry)) found.push(...findLocalModules(full));
      continue;
    }
    if (!/\.luau?$/.test(entry)) continue;
    // .server/.client files are Scripts — they don't return a module.
    if (/\.(server|client)\.luau?$/.test(entry)) continue;
    found.push(full);
  }
  return found;
}

/** Emit a sibling .d.ts for each local module; returns the written paths. */
function writeLocalModuleTypes(files: string[]): string[] {
  const written: string[] = [];
  for (const file of files) {
    const module = extractFromEntry(file, dirname(file));
    const dts = emitStandaloneDts(module);
    const out = file.replace(/\.luau?$/, ".d.ts");
    writeFileSync(out, dts);
    console.log(`  ${basename(file)} -> ${relative(process.cwd(), out)}`);
    written.push(out);
  }
  return written;
}

/** Warn (don't patch) if the project's tsconfig won't pick up the output dir. */
function warnIfNotIncluded(projectDir: string, outDir: string): void {
  const tsconfigPath = join(projectDir, "tsconfig.json");
  if (!existsSync(tsconfigPath)) return;
  try {
    const text = readFileSync(tsconfigPath, "utf-8");
    const rel = relative(projectDir, outDir).replaceAll("\\", "/");
    if (!text.includes(rel) && !text.includes("types/**")) {
      console.log(
        `\nNote: add "${rel}/**/*" (or "types/**/*") to "include" in tsconfig.json ` +
          "so TypeScript picks up the generated declarations."
      );
    }
  } catch {
    // ignore unreadable tsconfig
  }
}
