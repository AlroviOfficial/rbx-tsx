---
title: CLI Reference
description: Every rbx-tsx command and flag — compile, watch, check, init, and types.
---

## `rbx-tsx compile <input>`

Compiles a file or directory of TS/TSX to Luau.

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <path>` | Output file or directory | stdout |
| `--css` | Also compile `.css` files via rbx-css | `false` |
| `--react-path <path>` | Require path for React | `ReplicatedStorage.Packages.React` |
| `--react-roblox-path <path>` | Require path for ReactRoblox | `ReplicatedStorage.Packages.ReactRoblox` |
| `--strict` | Treat warnings as errors | `false` |
| `--sourcemap` | Emit source map comments | `false` |
| `--warn <level>` | `all`, `unsupported`, or `none` | `all` |

```bash
rbx-tsx compile App.tsx              # → stdout
rbx-tsx compile App.tsx -o App.luau  # → file
rbx-tsx compile src/ -o out/         # → directory
```

Unsupported constructs emit **warnings, not errors**, by default. Use `--strict` to promote
them to errors, or `--warn` to filter which warnings appear.

## `rbx-tsx watch <path>`

Watches a directory or file for changes and recompiles. Accepts the same flags as `compile`.

```bash
rbx-tsx watch src/ -o out/
```

## `rbx-tsx check <input>`

Runs the compiler without emitting files. Reports warnings and errors only.

```bash
rbx-tsx check src/
```

## `rbx-tsx init <name>`

Scaffolds a new Roblox project with starter components, `tsconfig.json`, `wally.toml`,
and `default.project.json`.

```bash
rbx-tsx init my-app
```

## `rbx-tsx types [directory]`

Generates TypeScript declarations (`.d.ts`) from your installed wally/pesde Luau packages,
so downloaded packages import with real types instead of `any`.

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <dir>` | Output directory for the generated `.d.ts` files | `types/packages` |

```bash
wally install   # or: pesde install
rbx-tsx types   # reads wally.toml / pesde.toml + the Packages/ folder
```

See [Package Type Extraction](/guides/type-extraction/) for details on what it captures.

## Output filename mapping

- `*.tsx` / `*.ts` / `*.jsx` / `*.js` → `.luau`
- `index.tsx` → `init.luau` (Rojo convention)
- `index.client.tsx` → `init.client.luau`

## Path resolution

Package imports resolve to `ReplicatedStorage.Packages.<PackageName>`. Rojo-aware path
resolution reads `default.project.json` to map source directories to
`game:GetService(...)` require paths. Package manifests (`wally.toml` / `pesde.toml`) are
auto-detected.
