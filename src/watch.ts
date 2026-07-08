import { watch as fsWatch, type FSWatcher } from "fs";
import { readdirSync, statSync } from "fs";
import { join, resolve, sep } from "path";

export function startWatch(
  watchPath: string,
  outputDir: string | null,
  onCompile: (files: string[]) => void
): void {
  const absPath = resolve(watchPath);
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  // When the output directory lives inside the watched tree (watch . -o out),
  // writes into it must be invisible to the watcher — both to the change
  // events and to file collection — or every compile would feed back into
  // another compile and the copied tree would nest one level per cycle.
  const excludeDir =
    outputDir && outputDir !== absPath && outputDir.startsWith(absPath + sep)
      ? outputDir
      : null;

  const collectFiles = (): string[] => {
    const stat = statSync(absPath);
    if (stat.isFile()) return [absPath];
    return findWatchedFiles(absPath, excludeDir);
  };

  // Initial compile
  const files = collectFiles();
  if (files.length > 0) {
    onCompile(files);
  }

  console.log(`Watching ${absPath} for changes...`);

  const watcher = fsWatch(
    absPath,
    { recursive: true },
    (eventType, filename) => {
      if (!filename) return;
      if (!filename.match(/\.(tsx?|jsx?|luau?)$/)) return;
      if (filename.includes(".test.") || filename.includes(".spec.")) return;
      if (excludeDir) {
        const fullPath = join(absPath, filename);
        if (fullPath === excludeDir || fullPath.startsWith(excludeDir + sep))
          return;
      }

      // Debounce
      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const files = collectFiles();
        if (files.length > 0) {
          onCompile(files);
        }
      }, 100);
    }
  );

  process.on("SIGINT", () => {
    watcher.close();
    process.exit(0);
  });
}

function findWatchedFiles(dir: string, excludeDir: string | null): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        if (fullPath === excludeDir) continue;
        files.push(...findWatchedFiles(fullPath, excludeDir));
      } else if (
        entry.name.match(/\.(tsx?|jsx?|luau?)$/) &&
        !entry.name.includes(".test.") &&
        !entry.name.includes(".spec.")
      ) {
        files.push(fullPath);
      }
    }
  } catch {
    // Ignore permission errors
  }

  return files;
}
