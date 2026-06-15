import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, relative, resolve } from "path";
import { extractProjectTypes, type ExtractResult } from "./type-extraction/index.ts";

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
  const projectDir = directory ? resolve(directory) : process.cwd();

  const result = extractProjectTypes(projectDir);
  if (!result) {
    console.error(
      "No wally.toml or pesde.toml found. Run this from a project with installed packages."
    );
    process.exit(1);
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
