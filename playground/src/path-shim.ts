/**
 * Minimal browser replacement for `node:path`'s `posix` namespace. The compiler
 * only uses a handful of pure-string path operations (`dirname`, `join`,
 * `normalize`) for module-specifier resolution; none of them touch a real
 * filesystem, so a small reimplementation lets the compiler bundle for the
 * browser. The build script aliases `node:path` to this module.
 */

function normalizeArray(parts: string[], allowAboveRoot: boolean): string[] {
  const result: string[] = [];
  for (const part of parts) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      if (result.length && result[result.length - 1] !== "..") {
        result.pop();
      } else if (allowAboveRoot) {
        result.push("..");
      }
    } else {
      result.push(part);
    }
  }
  return result;
}

export function normalize(path: string): string {
  const isAbsolute = path.startsWith("/");
  const trailingSlash = path.endsWith("/");
  let normalized = normalizeArray(path.split("/"), !isAbsolute).join("/");
  if (!normalized && !isAbsolute) normalized = ".";
  if (normalized && trailingSlash) normalized += "/";
  return (isAbsolute ? "/" : "") + normalized;
}

export function join(...segments: string[]): string {
  const joined = segments.filter((s) => s.length > 0).join("/");
  return joined === "" ? "." : normalize(joined);
}

export function dirname(path: string): string {
  const normalized = path.replace(/\/+$/, "");
  const idx = normalized.lastIndexOf("/");
  if (idx === -1) return ".";
  if (idx === 0) return "/";
  return normalized.slice(0, idx);
}

export function basename(path: string, ext?: string): string {
  const normalized = path.replace(/\/+$/, "");
  let base = normalized.slice(normalized.lastIndexOf("/") + 1);
  if (ext && base.endsWith(ext)) base = base.slice(0, -ext.length);
  return base;
}

export function extname(path: string): string {
  const base = basename(path);
  const idx = base.lastIndexOf(".");
  return idx <= 0 ? "" : base.slice(idx);
}

export function relative(from: string, to: string): string {
  const fromParts = normalize(from).split("/").filter(Boolean);
  const toParts = normalize(to).split("/").filter(Boolean);
  let i = 0;
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
    i++;
  }
  const up = fromParts.slice(i).map(() => "..");
  return [...up, ...toParts.slice(i)].join("/");
}

export const posix = {
  normalize,
  join,
  dirname,
  basename,
  extname,
  relative,
  sep: "/",
};

export default posix;
