---
title: Package Type Extraction
description: Generate TypeScript .d.ts declarations from installed wally/pesde Luau packages so imports resolve to real types.
---

Installed Luau packages don't ship TypeScript types, so importing them would normally
resolve to `any`. The `rbx-tsx types` command reads each package's Luau source and emits a
`declare module` block, giving your imports real types.

## Usage

```bash
wally install   # or: pesde install
rbx-tsx types   # reads wally.toml / pesde.toml + all package folders
```

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <dir>` | Output directory for the generated `.d.ts` files | `types/packages` |
| `-f, --force` | Overwrite existing `.d.ts` files next to local modules | `false` |

All install locations are searched — `Packages/`, `ServerPackages/`, and `DevPackages/`
for wally, `roblox_packages/` and `roblox_server_packages/` for pesde — so
`[server-dependencies]` and `[dev-dependencies]` resolve like regular dependencies.

Add the output directory to your `tsconfig.json` `include` (e.g. `"types/**/*"`) so
TypeScript picks the declarations up. Re-run after installing or updating packages.

## Local modules

Pass a `.luau` file or a directory to generate declarations for your own hand-written
Luau modules instead of installed packages:

```bash
rbx-tsx types src/util.luau   # emits src/util.d.ts
rbx-tsx types src/            # one sibling .d.ts per module under src/
```

The `.d.ts` lands next to the `.luau` file so relative imports from TypeScript resolve
to it. `.server`/`.client` scripts and package/tooling directories are skipped, and an
existing `.d.ts` is never overwritten without `--force`.

## What it captures

For each dependency it reads the package's Luau source, extracts `export type` aliases and
the module's exported shape, and emits a `declare module` block:

- Exported type aliases (with generics)
- Function signatures, including generic function types (`<T>(x: T) -> T`)
- Table / record shapes
- Unions, optionals
- Explicit type annotations on the returned module local (`local M: Module = ...`)
- Common ecosystem aliases (`Array` → `T[]`, `Map`/`Set` → TS `Map`/`Set`,
  `Object` → `Record<string, any>`)

A leading `self` parameter on a member is dropped from the TS signature when it refers
to the enclosing table (rbx-tsx compiles member calls with colon syntax, which binds the
receiver implicitly); a differently-typed `self` — e.g. a callback field — keeps its slot.

## What degrades to `any`

Constructs the extractor can't resolve degrade gracefully to `any` rather than failing:

- Metatable classes and `typeof(setmetatable(...))`
- Cross-module type references
- Luau type functions

Packages that ship bundled hand-written types (`react`, `react-roblox`, `react-dom`) are
skipped.

:::note
The extractor is a hand-rolled Luau type-expression parser (lexer + recursive descent)
covering the common subset — primitives, named types with generics, table types, function
types, unions, intersections, optionals, and literal types. It aims for pragmatic fidelity,
not 100% coverage.
:::
