/**
 * Public entry point for Luau → TypeScript type extraction.
 *
 * Given a project directory containing a wally/pesde manifest and installed
 * packages, produces one `.d.ts` worth of `declare module` blocks per
 * dependency. Designed to be callable both from the `rbx-tsx types` command and
 * (later) from `compile`/`watch`.
 */

import { readFileSync } from "fs";
import { dirname } from "path";
import {
  findManifestDir,
  findPackageManifest,
  type PackageManifest,
} from "../package-manifest.ts";
import {
  extractModule,
  type ExtractedModule,
  type ExtractedMember,
} from "./module-extractor.ts";
import type { LuauType } from "./type-parser.ts";
import { emitDeclareModule } from "./emit.ts";
import {
  packagesDir,
  resolveEntry,
  resolveSubModule,
  packagesDirExists,
} from "./resolver.ts";

/** Packages that ship hand-written bundled types — never overwrite these. */
const BUNDLED = new Set(["react", "reactroblox", "reactdom"]);

const MAX_HOPS = 2;

export interface PackageTypes {
  /** Dependency key from the manifest (e.g. "React"). */
  key: string;
  /** Module specifiers the declarations are emitted for (e.g. ["react", "React"]). */
  specifiers: string[];
  /** The generated `.d.ts` text. */
  dts: string;
}

export interface ExtractResult {
  manifest: PackageManifest;
  /** Directory containing the manifest and the installed packages folder. */
  manifestDir: string;
  packages: PackageTypes[];
  /** Dependency keys that were skipped (bundled) or unresolved. */
  skipped: { key: string; reason: "bundled" | "unresolved" }[];
}

export function extractProjectTypes(projectDir: string): ExtractResult | null {
  const manifestDir = findManifestDir(projectDir);
  if (!manifestDir) return null;
  const manifest = findPackageManifest(manifestDir);
  if (!manifest) return null;
  if (!packagesDirExists(manifestDir, manifest.pm)) {
    return { manifest, manifestDir, packages: [], skipped: [] };
  }

  const pkgDir = packagesDir(manifestDir, manifest.pm);
  const packages: PackageTypes[] = [];
  const skipped: ExtractResult["skipped"] = [];

  for (const [normalized, key] of manifest.dependencyKeys) {
    if (BUNDLED.has(normalized)) {
      skipped.push({ key, reason: "bundled" });
      continue;
    }

    const resolved = resolveEntry(pkgDir, key);
    if (!resolved) {
      skipped.push({ key, reason: "unresolved" });
      continue;
    }

    const module = resolveModuleShape(resolved.entryFile, resolved.baseDir, MAX_HOPS);
    const specifiers = specifiersFor(key);
    const dts = specifiers
      .map((specifier) => emitDeclareModule(module, { specifier }))
      .join("\n");
    packages.push({ key, specifiers, dts });
  }

  return { manifest, manifestDir, packages, skipped };
}

/**
 * Extract and resolve a single module given its entry file. Exposed for
 * testing and for callers that already know the entry path.
 */
export function extractFromEntry(
  entryFile: string,
  baseDir: string,
  hops = MAX_HOPS
): ExtractedModule {
  return resolveModuleShape(entryFile, baseDir, hops);
}

/** Distinct module specifiers to declare for a dependency key. */
function specifiersFor(key: string): string[] {
  const lower = key.toLowerCase();
  return lower === key ? [key] : [lower, key];
}

/**
 * Extract a module and resolve its `require(script.x)` members up to `hops`
 * levels deep, replacing them with concrete types.
 */
function resolveModuleShape(
  entryFile: string,
  baseDir: string,
  hops: number
): ExtractedModule {
  const source = safeRead(entryFile);
  const module = extractModule(source);

  if (module.shape.kind === "reexport" && hops > 0) {
    const sub = resolveSubModule(baseDir, module.shape.target);
    if (sub) {
      const subDir = dirname(sub);
      const resolved = resolveModuleShape(sub, subDir, hops - 1);
      // Adopt the sub-module's shape, but keep our own type aliases too.
      return {
        typeAliases: [...module.typeAliases, ...resolved.typeAliases],
        shape: resolved.shape,
      };
    }
  }

  if (module.shape.kind === "object" && hops > 0) {
    const members = module.shape.members.map((m) =>
      resolveMember(m, baseDir, hops)
    );
    return { typeAliases: module.typeAliases, shape: { kind: "object", members } };
  }

  return module;
}

function resolveMember(
  member: ExtractedMember,
  baseDir: string,
  hops: number
): ExtractedMember {
  if (member.value.kind !== "require") return member;
  const sub = resolveSubModule(baseDir, member.value.target);
  if (!sub) return { name: member.name, value: { kind: "type", type: { kind: "any" } } };
  const type = resolveDefaultType(sub, dirname(sub), hops - 1);
  return { name: member.name, value: { kind: "type", type } };
}

/** Resolve a sub-module to the TS-facing type of its default export. */
function resolveDefaultType(entryFile: string, baseDir: string, hops: number): LuauType {
  const module = resolveModuleShape(entryFile, baseDir, hops);
  const shape = module.shape;
  if (shape.kind === "value") return shape.type;
  if (shape.kind === "object") {
    return {
      kind: "table",
      fields: shape.members.map((m) => ({
        name: m.name,
        optional: false,
        type: m.value.kind === "type" ? m.value.type : { kind: "any" },
      })),
    };
  }
  return { kind: "any" };
}

function safeRead(file: string): string {
  try {
    return readFileSync(file, "utf-8");
  } catch {
    return "";
  }
}
