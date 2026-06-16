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
rbx-tsx types   # reads wally.toml / pesde.toml + the Packages/ folder
```

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <dir>` | Output directory for the generated `.d.ts` files | `types/packages` |

Add the output directory to your `tsconfig.json` `include` (e.g. `"types/**/*"`) so
TypeScript picks the declarations up. Re-run after installing or updating packages.

## What it captures

For each dependency it reads the package's Luau source, extracts `export type` aliases and
the module's exported shape, and emits a `declare module` block:

- Exported type aliases (with generics)
- Function signatures
- Table / record shapes
- Unions, optionals
- Common ecosystem aliases (`Array` → `T[]`, `Map`/`Set` → TS `Map`/`Set`,
  `Object` → `Record<string, any>`)

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
