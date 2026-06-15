import { dirname, join, normalize } from "path";
import { fileURLToPath } from "url";

/** Serves the built playground in `dist/` as a static site. */

const DIST = join(dirname(fileURLToPath(import.meta.url)), "dist");
const port = Number(process.env.PORT ?? 5757);

const server = Bun.serve({
  port,
  fetch(req) {
    const url = new URL(req.url);
    const rel = url.pathname === "/" ? "/index.html" : url.pathname;
    // Confine to DIST; normalize away any `..` traversal.
    const path = join(DIST, normalize(rel).replace(/^(\.\.[/\\])+/, ""));
    const file = Bun.file(path);
    return file.exists().then((ok) =>
      ok ? new Response(file) : new Response("Not found", { status: 404 })
    );
  },
});

console.log(`rbx-tsx playground → http://localhost:${server.port}`);
