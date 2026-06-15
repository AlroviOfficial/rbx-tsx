# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

rbx-tsx is a TSX/TypeScript → Luau compiler targeting [react-lua](https://github.com/jsdotlua/react-lua) for Roblox. It parses TS/TSX with the real TypeScript compiler API, transforms the AST into an output-only Luau AST, and stringifies that to dependency-free Luau with full type annotations preserved. See `README.md` for the user-facing feature matrix and the input/output examples in `examples/`.

## Commands

Runtime is **Bun** (ESM, `"type": "module"`). Source imports use explicit `.ts` extensions (`allowImportingTsExtensions`) — keep that convention; do not drop extensions or add `.js`.

- Build: `bun run build` (bundles `src/index.ts` → `dist/`, externalizes `typescript`)
- Run the CLI from source: `bun run dev -- compile examples/react-component.tsx` (or `bun run src/index.ts ...`)
- Regenerate bundled `types/` from the Roblox API dump: `bun run generate` (`scripts/generate-types.ts`)
- All tests: `bun test`
- Single test file: `bun test tests/unit/expressions.test.ts`
- Single test by name: `bun test -t "=== → =="`

There is no separate lint step; `tsc` is configured `noEmit` purely for type-checking (`bunx tsc`).

## Pipeline

`compile(source, filename, options)` in `src/compiler.ts` is the core entry point. Three stages:

1. **Program build** (`src/program.ts`) — constructs an in-memory `ts.Program` + `ts.TypeChecker` over the source plus the bundled `types/` ambient declarations. The checker lets codegen query real resolved types instead of pure syntax. Programs are built **incrementally** (the `CompilerHost` is reused and the prior program is passed as `oldProgram`) — rebuilding from scratch is ~30x slower because of stdlib re-binding. If the program can't be built it falls back to a parse-only `ts.SourceFile` with no checker.
2. **Transform** (`src/transforms/transform.ts` → `transformSourceFile`) — walks the TS AST and emits a `LuauStatement[]` (the Luau AST in `src/ast/luau-ast.ts`).
3. **Codegen** (`src/codegen/luau-codegen.ts` → `generateLuau`) — stringifies the Luau AST to source text.

`compileProject(files, options)` (used by the CLI for directory/watch builds) builds **one** program over all files so the checker resolves types across `import` boundaries; one file throwing is captured per-file (`CompileResult.error`) rather than aborting the batch.

## TransformContext — the spine of the transform

`src/transforms/transform-context.ts` defines `TransformContext`, a single mutable object threaded through every transform function. Understand this before editing transforms. It accumulates everything the preamble needs:

- **Demand-driven imports/helpers**: transforms call `ctx.requireService("Players")`, `ctx.requireHelper("array_map")`, or set `ctx.needsPromise` / `ctx.needsRegExp` / `ctx.needsReactRoblox` as they discover a need. This is why `transformSourceFile` runs in phases: **the body is transformed first**, then the preamble (requires, `game:GetService` calls, helper function definitions) is emitted *before* it — by which point the context knows exactly what to emit. Helper function bodies live in `getHelperFunction` at the bottom of `transform.ts`, keyed by the same strings passed to `requireHelper`.
- **Exports**: `defaultExport`, `namedExports`, `typeExports` drive `generateModuleReturn` (`module-transform.ts`).
- **Scoping**: `ctx.withScope(fn)` snapshots `localTypes` at function boundaries so a param's inferred type doesn't leak outward. `localTypes` (a `Map<string, JsType>`) is the coarse type inference (`js-type.ts`) that drives JS-truthiness coercion and array-vs-record index `+1` shifting.
- **Pre-statements**: `ctx.pushPreStatement` / `flushPreStatements` let an expression transform emit statements that must precede the containing statement (e.g. temp vars for optional-chain extraction). The caller in `transformSourceFile` flushes these after each body statement.
- Class transform state (`currentClassName`, `knownClassNames` — used to pick `.` vs `:` call syntax), generator state (`isGenerator`), labeled-break state (`breakLabelStack`).

## Directory map

- `src/transforms/` — the transform passes: `expression-transform.ts`, `statement-transform.ts`, `jsx-transform.ts` (JSX → `React.createElement`), `type-transform.ts` (TS types → Luau type annotations), `module-transform.ts` (imports/exports/re-exports), `path-resolution.ts`, `comments.ts`, `js-type.ts` (coarse `JsType` inference; prefers the `ts.TypeChecker` when present, falls back to syntactic heuristics).
- `src/mappings/` — static lookup tables only (no logic): `elements.ts` (`<div>` → `Frame`), `events.ts` (`onClick` → `React.Event.Activated`), `default-styles.ts`, `roblox-services.ts`, `roblox-methods.ts`, `roblox-constructors.ts`, `roblox-properties.ts`. New element/event/service support usually means editing these.
- `src/ast/luau-ast.ts` — the Luau AST node types plus builder helpers (`ident`, `call`, `table`, `binary`, `ifExpr`, …). Transforms construct AST via these builders; never emit strings directly except via the `raw(...)` escape hatch.
- `src/type-extraction/` — a **separate subsystem** for the `rbx-tsx types` command: parses installed Luau package source (`lexer.ts` → `type-parser.ts`) and emits `.d.ts` `declare module` blocks (`emit.ts`), so downloaded wally/pesde packages import with real types instead of `any`. Independent of the main TS→Luau pipeline.
- `src/cli.ts` — Commander setup and the `compile`/`watch`/`init`/`types`/`check` command handlers. Also holds Rojo integration (`buildAliasesFromRojo` reads `default.project.json` to map source dirs → `game:GetService(...)` require paths) and package-manifest auto-detection (`wally.toml`/`pesde.toml`).
- `types/` — bundled ambient `.d.ts` for the Roblox/React environment, shipped with the package and fed into every program build. Regenerated by `scripts/generate-types.ts`.
- `examples/` — `.tsx`/`.ts` inputs each paired with the expected `.luau` output. `demo/` — a full Rojo + Wally project.

## Conventions

- **Output filename mapping** lives in `getOutputPath` (`compiler.ts`): `*.tsx?`/`*.jsx?` → `.luau`, and `index.luau` → `init.luau` (Rojo convention — `index.client.tsx` → `init.client.luau`).
- **Warnings, not exceptions**, for unsupported constructs: call `ctx.warn(...)` / `ctx.warnAtNode(...)` (auto line/col) via the `WarningCollector` (`src/warnings.ts`). `--strict` promotes warnings to errors; `--warn <all|unsupported|none>` filters them.
- Comments, commit messages, and test names must not reference incidents, dates, or this session — see the global rule in `~/.claude/CLAUDE.md`. Write pure technical rationale.
