import { readFileSync } from "fs";

export interface CSSManifest {
  classes: Record<string, { overflowScroll: boolean }>;
  elementMap: Record<string, string>;
}

export function loadManifest(manifestPath: string): CSSManifest | null {
  try {
    const content = readFileSync(manifestPath, "utf-8");
    return JSON.parse(content) as CSSManifest;
  } catch {
    return null;
  }
}

export function mergeManifests(manifests: CSSManifest[]): CSSManifest {
  const merged: CSSManifest = { classes: {}, elementMap: {} };

  for (const manifest of manifests) {
    // Merge element map
    Object.assign(merged.elementMap, manifest.elementMap);

    // Merge classes — OR the overflowScroll booleans
    for (const [className, info] of Object.entries(manifest.classes)) {
      if (merged.classes[className]?.overflowScroll) continue;
      merged.classes[className] = info;
    }
  }

  return merged;
}
