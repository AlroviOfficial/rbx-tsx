import ts from "typescript";

/**
 * A `ts.CompilerHost` backed entirely by an in-memory map of file path → text.
 * `ts.sys` does not exist in the browser, so the Node host that `program.ts`
 * builds with `ts.createCompilerHost` cannot run there. This host serves the
 * bundled `lib.*.d.ts` and the Roblox/React `types/` ambient declarations (both
 * embedded into the page at build time) plus the user's source file, which is
 * enough for a full `ts.TypeChecker` in the browser.
 *
 * All files live in a flat virtual root: lib files at `/lib.*.d.ts`, ambient
 * declarations under `/types/`, and the user's file at `/input.tsx`. Triple-slash
 * `<reference path="..."/>` directives resolve relative to the referencing file,
 * which matches how the real `types/index.d.ts` pulls in its siblings.
 */
export function createVirtualHost(
  fsMap: Map<string, string>,
  options: ts.CompilerOptions
): ts.CompilerHost {
  const sourceFileCache = new Map<string, ts.SourceFile | undefined>();
  const defaultLib = "/" + ts.getDefaultLibFileName(options);

  return {
    getSourceFile(name) {
      if (sourceFileCache.has(name)) return sourceFileCache.get(name);
      const text = fsMap.get(name);
      const sf =
        text === undefined
          ? undefined
          : ts.createSourceFile(name, text, options.target ?? ts.ScriptTarget.ESNext, true);
      sourceFileCache.set(name, sf);
      return sf;
    },
    writeFile() {
      /* no emit */
    },
    getDefaultLibFileName: () => defaultLib,
    getDefaultLibLocation: () => "/",
    getCurrentDirectory: () => "/",
    getCanonicalFileName: (n) => n,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (name) => fsMap.has(name),
    readFile: (name) => fsMap.get(name),
    directoryExists: () => true,
    getDirectories: () => [],
    realpath: (n) => n,
  };
}
