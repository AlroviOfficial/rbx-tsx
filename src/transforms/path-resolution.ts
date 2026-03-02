import { posix } from "node:path";
import type { TransformContext } from "./transform-context.ts";

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
      if (rest) {
        return `${luauBase}.${rest.split("/").join(".")}`;
      }
      return luauBase;
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
  if (aliasPath) return aliasPath;
  if (
    moduleSpecifier.startsWith("./") ||
    moduleSpecifier.startsWith("../")
  ) {
    return relativePathToRequirePath(moduleSpecifier, ctx.isIndexFile);
  }
  return ctx.resolvePackageRequirePath(moduleSpecifier);
}
