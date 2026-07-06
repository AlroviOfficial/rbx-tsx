/**
 * Filesystem resolution for installed Luau packages: locating the packages
 * directory, following wally/pesde redirect files to a package's entry module,
 * and resolving one `require(script.x)` hop to a sibling sub-module.
 */

import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { dirname, join } from "path";
import type { PackageManager } from "../package-manifest.ts";

const LUAU_EXTS = [".luau", ".lua"];

/** The packages install directories for a given package manager. pesde splits
 * installs by scope (shared vs server-only), so it has more than one. */
export function packagesDirs(projectDir: string, pm: PackageManager): string[] {
  const names =
    pm === "pesde"
      ? ["roblox_packages", "roblox_server_packages"]
      : ["Packages", "ServerPackages", "DevPackages"];
  return names.map((name) => join(projectDir, name));
}

function firstExisting(paths: string[]): string | null {
  for (const p of paths) if (existsSync(p) && statSync(p).isFile()) return p;
  return null;
}

/** Look for init.luau / init.lua inside a directory. */
function findInit(dir: string): string | null {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return null;
  return firstExisting(LUAU_EXTS.map((e) => join(dir, "init" + e)));
}

/**
 * Parse a redirect/link file. Two formats exist:
 *   wally: return require(script.Parent._Index["jsdotlua_react@17.2.1"]["react"])
 *   pesde: require(script.Parent:FindFirstChild(".pesde"):FindFirstChild("lm-loleris_profilestore@1.0.3"):FindFirstChild("profilestore"))
 * Returns the container dir name and the two path keys under it.
 */
function parseIndexRedirect(
  content: string
): { container: string; full: string; inner: string } | null {
  const idx = content.indexOf("_Index");
  if (idx !== -1) {
    const after = content.slice(idx);
    const keys = [...after.matchAll(/\[\s*["']([^"']+)["']\s*\]/g)].map((m) => m[1]!);
    if (keys.length >= 2) return { container: "_Index", full: keys[0]!, inner: keys[1]! };
  }
  const children = [
    ...content.matchAll(/FindFirstChild\(\s*["']([^"']+)["']\s*\)/g),
  ].map((m) => m[1]!);
  if (children.length >= 3 && children[0] === ".pesde") {
    return { container: ".pesde", full: children[1]!, inner: children[2]! };
  }
  return null;
}

/**
 * Resolve a package key to its entry module file and the directory the entry
 * lives in (used for sub-module hops). Returns null if it can't be found.
 */
export function resolveEntry(
  pkgDir: string,
  key: string
): { entryFile: string; baseDir: string } | null {
  // 1. Redirect file: Packages/<Key>.lua(u)
  const redirect = firstExisting(LUAU_EXTS.map((e) => join(pkgDir, key + e)));
  let innerDir: string | null = null;

  if (redirect) {
    const parsed = parseIndexRedirect(readFileSync(redirect, "utf-8"));
    if (parsed) {
      innerDir = join(pkgDir, parsed.container, parsed.full, parsed.inner);
    }
  }

  // 2. Fall back to a direct directory: Packages/<Key>/
  if (!innerDir || !existsSync(innerDir)) {
    const direct = join(pkgDir, key);
    if (existsSync(direct) && statSync(direct).isDirectory()) innerDir = direct;
  }

  if (!innerDir || !existsSync(innerDir)) return null;

  const entryFile = resolveEntryInDir(innerDir);
  if (!entryFile) return null;
  return { entryFile, baseDir: dirname(entryFile) };
}

function resolveEntryInDir(innerDir: string): string | null {
  // a. init directly in the inner dir
  const init = findInit(innerDir);
  if (init) return init;

  // b. default.project.json $path
  const projPath = join(innerDir, "default.project.json");
  if (existsSync(projPath)) {
    try {
      const proj = JSON.parse(readFileSync(projPath, "utf-8"));
      const p = proj?.tree?.$path;
      if (typeof p === "string") {
        const target = join(innerDir, p);
        if (existsSync(target)) {
          if (statSync(target).isFile()) return target;
          const nested = findInit(target);
          if (nested) return nested;
        }
        // $path may omit the extension for a file module
        const asFile = firstExisting(LUAU_EXTS.map((e) => join(innerDir, p + e)));
        if (asFile) return asFile;
      }
    } catch {
      // ignore malformed project files
    }
  }

  // c. src/init
  const srcInit = findInit(join(innerDir, "src"));
  if (srcInit) return srcInit;

  return null;
}

/** Resolve one `require(script.<target>)` hop to a sibling sub-module file. */
export function resolveSubModule(baseDir: string, target: string): string | null {
  const sibling = firstExisting(LUAU_EXTS.map((e) => join(baseDir, target + e)));
  if (sibling) return sibling;
  return findInit(join(baseDir, target));
}

/** List dependency keys for which a packages directory has a resolvable entry. */
export function packagesDirExists(projectDir: string, pm: PackageManager): boolean {
  return packagesDirs(projectDir, pm).some((dir) => {
    try {
      return existsSync(dir) && readdirSync(dir).length > 0;
    } catch {
      return false;
    }
  });
}
