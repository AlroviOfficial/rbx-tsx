import { Command } from "commander";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  statSync,
  readdirSync,
  existsSync,
} from "fs";
import { join, resolve, dirname, relative, basename } from "path";
import { compile, getOutputPath, type CompilerOptions } from "./compiler.ts";
import {
  loadManifest,
  mergeManifests,
  type CSSManifest,
} from "./css-manifest.ts";
import { startWatch } from "./watch.ts";
import type { WarningLevel } from "./warnings.ts";
import { execSync } from "child_process";
import { handleInit, type InitOptions } from "./init.ts";

export function createCLI(): Command {
  const program = new Command();
  program
    .name("rbx-tsx")
    .description("TSX to Luau compiler targeting react-lua for Roblox")
    .version("0.1.0");

  program
    .command("compile")
    .description("Compile TSX/TS files to Luau")
    .argument("<input>", "Input file or directory")
    .option("-o, --output <path>", "Output file or directory")
    .option("--css", "Also compile .css files via rbx-css", false)
    .option(
      "--react-path <path>",
      "Require path for react-lua",
      "ReplicatedStorage.Packages.React"
    )
    .option(
      "--react-roblox-path <path>",
      "Require path for react-roblox",
      "ReplicatedStorage.Packages.ReactRoblox"
    )
    .option("--strict", "Treat warnings as errors", false)
    .option("--sourcemap", "Emit source map comments", false)
    .option("--warn <level>", "Warning level: all, unsupported, none", "all")
    .action((input: string, opts) => {
      handleCompile(input, opts);
    });

  program
    .command("watch")
    .description("Watch files and recompile on changes")
    .argument("<path>", "Directory or file to watch")
    .option("-o, --output <path>", "Output directory")
    .option(
      "--react-path <path>",
      "Require path for react-lua",
      "ReplicatedStorage.Packages.React"
    )
    .option(
      "--react-roblox-path <path>",
      "Require path for react-roblox",
      "ReplicatedStorage.Packages.ReactRoblox"
    )
    .option("--warn <level>", "Warning level", "all")
    .action((watchPath: string, opts) => {
      handleWatch(watchPath, opts);
    });

  program
    .command("init")
    .description("Scaffold a new rbx-tsx project")
    .argument("[directory]", "Project directory (defaults to current dir)")
    .option("-n, --name <name>", "Project name (defaults to directory name)")
    .action((directory: string | undefined, opts: InitOptions) => {
      handleInit(directory, opts);
    });

  program
    .command("check")
    .description("Type check only (no emit)")
    .argument("<input>", "Input file or directory")
    .option("--strict", "Treat warnings as errors", false)
    .option("--warn <level>", "Warning level", "all")
    .action((input: string, opts) => {
      handleCheck(input, opts);
    });

  return program;
}

// ── Rojo Project Integration ──

interface RojoPathMapping {
  /** Filesystem path relative to project root */
  fsPath: string;
  /** Roblox instance path segments (e.g. ["ReplicatedStorage", "Shared"]) */
  robloxPath: string[];
}

/** Walk up from startDir to find default.project.json */
function findRojoProject(startDir: string): string | null {
  let dir = startDir;
  for (;;) {
    const candidate = join(dir, "default.project.json");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

/** Recursively walk a Rojo tree node, collecting $path entries */
function walkRojoTree(
  node: Record<string, unknown>,
  path: string[] = []
): RojoPathMapping[] {
  const results: RojoPathMapping[] = [];
  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$") || typeof value !== "object" || value === null)
      continue;
    const child = value as Record<string, unknown>;
    const childPath = [...path, key];
    if (typeof child.$path === "string") {
      results.push({
        fsPath: (child.$path as string).replaceAll("\\", "/"),
        robloxPath: childPath,
      });
    }
    results.push(...walkRojoTree(child, childPath));
  }
  return results;
}

/**
 * Parse a Rojo default.project.json and derive path aliases.
 * Maps source-relative directories to Luau require paths.
 */
function buildAliasesFromRojo(
  projectPath: string,
  outputDir: string
): Map<string, string> {
  const projectRoot = dirname(projectPath);
  const project = JSON.parse(readFileSync(projectPath, "utf-8"));
  if (!project.tree) return new Map();

  const mappings = walkRojoTree(project.tree);
  const outRel = relative(projectRoot, outputDir).replaceAll("\\", "/");
  const aliases = new Map<string, string>();

  for (const { fsPath, robloxPath } of mappings) {
    // Only care about $path entries under the output directory
    const isUnder =
      fsPath === outRel || fsPath.startsWith(outRel + "/");
    if (!isUnder) continue;

    const sourceDir =
      fsPath === outRel ? "" : fsPath.slice(outRel.length + 1);
    if (!sourceDir) continue; // skip root output dir itself

    // Build Luau path: game:GetService("TopService").rest.of.path
    const [service, ...rest] = robloxPath;
    let luauPath = `game:GetService("${service}")`;
    for (const seg of rest) luauPath += `.${seg}`;
    aliases.set(sourceDir, luauPath);
  }

  return aliases;
}

function handleCompile(
  input: string,
  opts: {
    output?: string;
    css: boolean;
    reactPath: string;
    reactRobloxPath: string;
    strict: boolean;
    sourcemap: boolean;
    warn: string;
  }
): void {
  const absInput = resolve(input);
  const stat = statSync(absInput);

  const compilerOpts: CompilerOptions = {
    reactPath: opts.reactPath,
    reactRobloxPath: opts.reactRobloxPath,
    strict: opts.strict,
    sourcemap: opts.sourcemap,
    warnLevel: opts.warn as WarningLevel,
  };

  if (stat.isFile()) {
    // Single file compilation
    const source = readFileSync(absInput, "utf-8");
    const result = compile(source, basename(absInput), compilerOpts);

    // Print warnings
    const warningText = result.warnings.format();
    if (warningText) {
      process.stderr.write(warningText + "\n");
    }

    if (result.warnings.hasErrors()) {
      process.exit(1);
    }

    if (opts.output) {
      mkdirSync(dirname(resolve(opts.output)), { recursive: true });
      writeFileSync(resolve(opts.output), result.luau);
      console.log(`Written to ${opts.output}`);
    } else {
      process.stdout.write(result.luau);
    }
  } else if (stat.isDirectory()) {
    // Directory compilation
    const outputDir = opts.output ? resolve(opts.output) : absInput;

    // Auto-detect Rojo project for cross-boundary import resolution
    if (!compilerOpts.pathAliases) {
      const rojoProject = findRojoProject(absInput);
      if (rojoProject) {
        const aliases = buildAliasesFromRojo(rojoProject, outputDir);
        if (aliases.size > 0) {
          compilerOpts.pathAliases = aliases;
          console.log(
            `Rojo: ${relative(process.cwd(), rojoProject)}`
          );
        }
      }
    }

    // Phase 1: Compile CSS files first (--css flag) to generate manifests
    if (opts.css) {
      const cssFiles = findCSSFiles(absInput);
      if (cssFiles.length > 0) {
        // Generate css.d.ts for TypeScript CSS import support
        const cssDtsPath = join(absInput, "css.d.ts");
        if (!existsSync(cssDtsPath)) {
          writeFileSync(
            cssDtsPath,
            'declare module "*.css" {\n  const createStyleSheet: () => Instance;\n  export default createStyleSheet;\n}\n'
          );
          console.log("Generated css.d.ts for CSS import support");
        }

        for (const cssFile of cssFiles) {
          const relCssPath = relative(absInput, cssFile);
          const cssOutputPath = join(
            outputDir,
            relCssPath.replace(/\.css$/, ".style.luau")
          );
          try {
            mkdirSync(dirname(cssOutputPath), { recursive: true });
            execSync(
              `rbx-css compile "${cssFile}" -o "${cssOutputPath}" --manifest`,
              { stdio: "pipe" }
            );
            console.log(
              `CSS: ${relCssPath} -> ${relative(process.cwd(), cssOutputPath)}`
            );
          } catch {
            console.warn(
              `Warning: Could not compile ${relCssPath}. Is rbx-css installed?`
            );
          }
        }

        // Read and merge all manifests
        const manifests: CSSManifest[] = [];
        for (const cssFile of cssFiles) {
          const relCssPath = relative(absInput, cssFile);
          const manifestPath = join(
            outputDir,
            relCssPath.replace(/\.css$/, ".style.manifest.json")
          );
          const manifest = loadManifest(manifestPath);
          if (manifest) {
            manifests.push(manifest);
          }
        }
        if (manifests.length > 0) {
          compilerOpts.cssManifest = mergeManifests(manifests);
        }
      }
    }

    // Phase 2: Compile TSX/TS files (with manifest available from Phase 1)
    const files = findSourceFiles(absInput);
    let hasErrors = false;

    for (const file of files) {
      const relPath = relative(absInput, file);
      const outputPath = getOutputPath(join(outputDir, relPath));

      try {
        const source = readFileSync(file, "utf-8");
        const result = compile(source, relPath, compilerOpts);

        const warningText = result.warnings.format();
        if (warningText) {
          process.stderr.write(warningText + "\n");
        }

        if (result.warnings.hasErrors()) {
          hasErrors = true;
          continue;
        }

        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, result.luau);
        console.log(`${relPath} -> ${relative(process.cwd(), outputPath)}`);
      } catch (err) {
        console.error(`Error compiling ${relPath}:`, err);
        hasErrors = true;
      }
    }

    if (hasErrors && opts.strict) {
      process.exit(1);
    }
  }
}

function handleWatch(
  watchPath: string,
  opts: {
    output?: string;
    reactPath: string;
    reactRobloxPath: string;
    warn: string;
  }
): void {
  const absPath = resolve(watchPath);
  const outputDir = opts.output ? resolve(opts.output) : dirname(absPath);

  const compilerOpts: CompilerOptions = {
    reactPath: opts.reactPath,
    reactRobloxPath: opts.reactRobloxPath,
    strict: false,
    warnLevel: opts.warn as WarningLevel,
  };

  startWatch(absPath, (files) => {
    for (const file of files) {
      try {
        const relPath = relative(dirname(absPath), file);
        const outputPath = getOutputPath(join(outputDir, relPath));

        const source = readFileSync(file, "utf-8");
        const result = compile(source, basename(file), compilerOpts);

        const warningText = result.warnings.format();
        if (warningText) {
          process.stderr.write(warningText + "\n");
        }

        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, result.luau);
        console.log(`Compiled -> ${outputPath}`);
      } catch (err) {
        console.error(`Error compiling ${file}:`, err);
      }
    }
  });
}

function handleCheck(
  input: string,
  opts: {
    strict: boolean;
    warn: string;
  }
): void {
  const absInput = resolve(input);
  const stat = statSync(absInput);

  const compilerOpts: CompilerOptions = {
    strict: opts.strict,
    warnLevel: opts.warn as WarningLevel,
  };

  const files = stat.isFile() ? [absInput] : findSourceFiles(absInput);
  let hasErrors = false;

  for (const file of files) {
    try {
      const source = readFileSync(file, "utf-8");
      const result = compile(source, basename(file), compilerOpts);

      const warningText = result.warnings.format();
      if (warningText) {
        process.stderr.write(warningText + "\n");
      }

      if (result.warnings.hasErrors()) {
        hasErrors = true;
      }
    } catch (err) {
      console.error(`Error checking ${file}:`, err);
      hasErrors = true;
    }
  }

  if (hasErrors) {
    process.exit(1);
  }

  console.log("Check passed.");
}

function findCSSFiles(dir: string): string[] {
  const files: string[] = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        files.push(...findCSSFiles(fullPath));
      } else if (entry.name.endsWith(".css")) {
        files.push(fullPath);
      }
    }
  } catch {
    // Ignore permission errors
  }
  return files;
}

function findSourceFiles(dir: string): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        files.push(...findSourceFiles(fullPath));
      } else if (
        entry.name.match(/\.(tsx?|jsx?)$/) &&
        !entry.name.includes(".test.") &&
        !entry.name.includes(".spec.") &&
        !entry.name.endsWith(".d.ts")
      ) {
        files.push(fullPath);
      }
    }
  } catch {
    // Ignore permission errors
  }

  return files;
}
