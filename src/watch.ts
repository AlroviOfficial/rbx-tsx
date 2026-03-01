import { watch as fsWatch, type FSWatcher } from "fs";
import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";

export function startWatch(
  watchPath: string,
  onCompile: (files: string[]) => void
): void {
  const absPath = resolve(watchPath);
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;

  const collectFiles = (): string[] => {
    const stat = statSync(absPath);
    if (stat.isFile()) return [absPath];
    return findTSXFiles(absPath);
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
      if (!filename.match(/\.(tsx?|jsx?)$/)) return;
      if (filename.includes(".test.") || filename.includes(".spec.")) return;

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

function findTSXFiles(dir: string): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === "node_modules" || entry.name === ".git") continue;
        files.push(...findTSXFiles(fullPath));
      } else if (
        entry.name.match(/\.(tsx?|jsx?)$/) &&
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
