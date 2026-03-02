import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";

export type PackageManager = "wally" | "pesde";

export interface PackageManifest {
  /** Which package manager this manifest belongs to */
  pm: PackageManager;
  /** Map from normalized import specifier to the actual dependency key */
  dependencyKeys: Map<string, string>;
}

/**
 * Normalize a package name for matching: strip non-alphanumeric, lowercase.
 * "my-cool-lib" → "mycoollib", "@scope/foo" → "scopefoo"
 */
export function normalizePackageName(name: string): string {
  return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

/**
 * Resolve a package import specifier to the correct dependency key.
 * If a manifest is available, looks up the normalized specifier.
 * Falls back to the legacy behavior: strip non-alphanum + capitalize first letter.
 */
export function resolvePackageName(
  specifier: string,
  manifest: PackageManifest | null | undefined
): string {
  const normalized = normalizePackageName(specifier);
  const key = manifest?.dependencyKeys.get(normalized);
  if (key) return key;

  // Legacy fallback: capitalize first letter of stripped name
  const stripped = specifier.replace(/[^a-zA-Z0-9]/g, "");
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

/**
 * Walk up from startDir to find a package manifest (wally.toml or pesde.toml).
 * Returns null if neither is found.
 */
export function findPackageManifest(
  startDir: string
): PackageManifest | null {
  let dir = startDir;
  for (;;) {
    // Check wally.toml first (more common, backwards compat)
    const wallyPath = join(dir, "wally.toml");
    if (existsSync(wallyPath)) {
      return parseWallyManifest(wallyPath);
    }

    const pesdePath = join(dir, "pesde.toml");
    if (existsSync(pesdePath)) {
      return parsePesdeManifest(pesdePath);
    }

    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

/**
 * Parse wally.toml and extract dependency keys from [dependencies].
 *
 * Format:
 *   [dependencies]
 *   React = "jsdotlua/react@17.1.0"
 *   MyCoolLib = "author/my-cool-lib@1.0.0"
 */
function parseWallyManifest(filePath: string): PackageManifest {
  const content = readFileSync(filePath, "utf-8");
  const keys = extractTomlSectionKeys(content, [
    "dependencies",
    "dev-dependencies",
    "server-dependencies",
  ]);
  return {
    pm: "wally",
    dependencyKeys: keys,
  };
}

/**
 * Parse pesde.toml and extract dependency keys from [dependencies].
 *
 * Format:
 *   [dependencies]
 *   React = { name = "jsdotlua/react", version = "^17.1.0" }
 */
function parsePesdeManifest(filePath: string): PackageManifest {
  const content = readFileSync(filePath, "utf-8");
  const keys = extractTomlSectionKeys(content, [
    "dependencies",
    "dev_dependencies",
    "peer_dependencies",
  ]);
  return {
    pm: "pesde",
    dependencyKeys: keys,
  };
}

/**
 * Extract keys from one or more TOML sections.
 * Returns a Map<normalizedKey, originalKey>.
 *
 * Handles:
 * - Simple values: Key = "value"
 * - Inline tables: Key = { name = "x", version = "y" }
 * - Multiline tables: Key = {\n  name = "x",\n  version = "y"\n}
 */
function extractTomlSectionKeys(
  content: string,
  sectionNames: string[]
): Map<string, string> {
  const keys = new Map<string, string>();
  const lines = content.split(/\r?\n/);

  let inTargetSection = false;
  let braceDepth = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip comments and empty lines
    if (trimmed === "" || trimmed.startsWith("#")) continue;

    // Check for section headers: [dependencies], [dev-dependencies], etc.
    const sectionMatch = trimmed.match(/^\[([^\]]+)\]$/);
    if (sectionMatch) {
      const sectionName = sectionMatch[1].trim();
      inTargetSection = sectionNames.includes(sectionName);
      braceDepth = 0;
      continue;
    }

    if (!inTargetSection) continue;

    // Inside a multiline value — just track brace depth
    if (braceDepth > 0) {
      for (const ch of trimmed) {
        if (ch === "{") braceDepth++;
        else if (ch === "}") braceDepth--;
      }
      continue;
    }

    // Match key = value lines
    const keyMatch = trimmed.match(/^([A-Za-z_][A-Za-z0-9_-]*)\s*=/);
    if (keyMatch) {
      const key = keyMatch[1];
      keys.set(normalizePackageName(key), key);

      // Check if this line opens a multiline brace
      const afterEquals = trimmed.slice(trimmed.indexOf("=") + 1);
      let depth = 0;
      for (const ch of afterEquals) {
        if (ch === "{") depth++;
        else if (ch === "}") depth--;
      }
      if (depth > 0) braceDepth = depth;
    }
  }

  return keys;
}
