import { posix } from "node:path";
import type { TransformContext } from "./transform-context.ts";

/**
 * Convert an instance require path to a Luau string-require path:
 * `game:GetService("X").a.b` → `@game/X/a/b`, `script.Parent.a` → `./a`,
 * `script.a` → `@self/a`, each additional `.Parent` hop → `../`. Returns
 * null when the expression doesn't fit either shape (bracket indexing,
 * user-supplied custom paths) so callers can keep the instance form.
 */
export function instancePathToStringRequire(path: string): string | null {
  const game = path.match(/^game:GetService\("(\w+)"\)((?:\.\w+)*)$/);
  if (game) {
    const rest = game[2] ? game[2].slice(1).split(".") : [];
    return ["@game", game[1], ...rest].join("/");
  }

  const relative = path.match(/^script((?:\.Parent)*)((?:\.\w+)*)$/);
  if (relative) {
    const parents = relative[1] ? relative[1].split(".Parent").length - 1 : 0;
    const rest = relative[2] ? relative[2].slice(1).split(".") : [];
    if (parents === 0) return ["@self", ...rest].join("/");
    if (parents === 1) return [".", ...rest].join("/");
    return [...Array<string>(parents - 1).fill(".."), ...rest].join("/");
  }

  return null;
}

/**
 * Finalize a require argument: when string requires are enabled, emit the
 * quoted string-require form; otherwise (or when the path can't be
 * converted) keep the instance path unchanged.
 */
export function finalizeRequirePath(
  path: string,
  stringRequires: boolean
): string {
  if (!stringRequires) return path;
  const stringPath = instancePathToStringRequire(path);
  return stringPath ? `"${stringPath}"` : path;
}

/** `game:GetService("X").a.b` → ["X", "a", "b"], or null if not that shape. */
function parseInstancePath(path: string): string[] | null {
  const match = path.match(/^game:GetService\("(\w+)"\)((?:\.\w+)*)$/);
  if (!match) return null;
  return [match[1]!, ...(match[2] ? match[2].slice(1).split(".") : [])];
}

/**
 * Prefer a tree-relative require over an absolute alias target when the
 * importing module's own tree position is known (it has an alias too) and
 * both live under the same service. Alias targets don't mirror the source
 * layout, so the relative chain is derived from the two *tree* positions,
 * not from the filesystem. Cross-service imports keep the absolute path.
 */
export function preferTreeRelative(
  targetPath: string,
  ctx: TransformContext
): string {
  const importerKey = ctx.filename
    .replaceAll("\\", "/")
    .replace(/\.(tsx?|jsx?)$/, "");
  const importerAlias = ctx.pathAliases.get(importerKey);
  if (!importerAlias) return targetPath;

  const target = parseInstancePath(targetPath);
  const importer = parseInstancePath(importerAlias);
  if (!target || !importer || target[0] !== importer[0]) return targetPath;

  const importerParent = importer.slice(0, -1);
  let common = 0;
  while (
    common < importerParent.length &&
    common < target.length &&
    importerParent[common] === target[common]
  ) {
    common++;
  }
  const ups = importerParent.length - common;
  const downs = target.slice(common);
  if (downs.length === 0) return targetPath; // target is an ancestor; keep absolute

  let base = "script";
  for (let i = 0; i <= ups; i++) base += ".Parent";
  for (const segment of downs) base += `.${segment}`;
  return base;
}

function resolvePathAlias(
  moduleSpecifier: string,
  ctx: TransformContext
): string | null {
  if (ctx.pathAliases.size === 0) return null;

  const fileDir = posix.dirname(ctx.filename.replaceAll("\\", "/"));
  const resolved = posix
    .normalize(posix.join(fileDir, moduleSpecifier))
    .replace(/\.(tsx?|jsx?)$/, "");

  for (const [prefix, luauBase] of ctx.pathAliases) {
    if (fileDir === prefix || fileDir.startsWith(prefix + "/")) continue;
    if (resolved === prefix || resolved.startsWith(prefix + "/")) {
      const rest = resolved.slice(prefix.length).replace(/^\//, "");
      const target = rest
        ? `${luauBase}.${rest.split("/").join(".")}`
        : luauBase;
      return preferTreeRelative(target, ctx);
    }
  }

  return null;
}

function relativePathToRequirePath(
  specifier: string,
  isIndexFile: boolean
): string {
  const parts = specifier
    .replace(/\.(tsx?|jsx?)$/, "")
    .split("/");

  let base = "script";
  for (const part of parts) {
    if (part === ".") {
      if (!isIndexFile) base += ".Parent";
    } else if (part === "..") {
      base += isIndexFile ? ".Parent" : ".Parent.Parent";
    } else if (part !== "index") {
      base += `.${part}`;
    }
  }

  return base;
}

/**
 * Resolve a module specifier to a Luau require path.
 * Uses the same logic as static imports (path aliases, relative paths, packages).
 */
export function resolveModuleSpecifierToRequirePath(
  moduleSpecifier: string,
  ctx: TransformContext
): string {
  const aliasPath = resolvePathAlias(moduleSpecifier, ctx);
  const requirePath =
    aliasPath ??
    (moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../")
      ? relativePathToRequirePath(moduleSpecifier, ctx.isIndexFile)
      : ctx.resolvePackageRequirePath(moduleSpecifier));
  return finalizeRequirePath(requirePath, ctx.options.stringRequires);
}
