import { spawnSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Builds the standalone playground (the existing `playground/build.ts`) and
 * copies its static output into `public/playground/`, so the docs site ships
 * the editor as a full-screen page at `/playground/`. Run automatically by the
 * `prebuild` script before `astro build`.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const DOCS_SITE = join(HERE, "..");
const REPO_ROOT = join(DOCS_SITE, "..");
const PLAYGROUND_DIST = join(REPO_ROOT, "playground", "dist");
const TARGET = join(DOCS_SITE, "public", "playground");

console.log("› building playground bundle…");
const result = spawnSync("bun", ["run", join("playground", "build.ts")], {
  cwd: REPO_ROOT,
  stdio: "inherit",
  shell: process.platform === "win32",
});
if (result.status !== 0) {
  throw new Error(`playground build failed (exit ${result.status})`);
}

if (!existsSync(PLAYGROUND_DIST)) {
  throw new Error(`expected playground output at ${PLAYGROUND_DIST}`);
}

rmSync(TARGET, { recursive: true, force: true });
mkdirSync(TARGET, { recursive: true });
cpSync(PLAYGROUND_DIST, TARGET, { recursive: true });
console.log(`› copied playground → ${TARGET}`);
