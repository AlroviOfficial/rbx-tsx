import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

/** Serves the built docs site in `dist/` as a static site (for local preview). */

const DIST = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT ?? 4321);

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let rel = url.pathname;
    // Map directory paths to their index.html (Astro builds dir-style routes).
    if (rel.endsWith("/")) rel += "index.html";
    const safe = normalize(rel).replace(/^(\.\.[/\\])+/, "");
    let path = join(DIST, safe);

    let file = Bun.file(path);
    if (!(await file.exists())) {
      // Retry as a directory index (e.g. /getting-started → /getting-started/index.html).
      file = Bun.file(join(DIST, safe, "index.html"));
      if (!(await file.exists())) {
        const notFound = Bun.file(join(DIST, "404.html"));
        return (await notFound.exists())
          ? new Response(notFound, { status: 404 })
          : new Response("Not found", { status: 404 });
      }
    }
    return new Response(file);
  },
});

console.log(`rbx-tsx docs → http://localhost:${server.port}`);
