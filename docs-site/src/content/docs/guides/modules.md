---
title: Module System
description: How ES module imports and exports compile to Luau require() calls and module returns.
---

ES module `import`/`export` syntax compiles to Luau `require()` calls and module returns,
with Rojo-aware path resolution.

| TypeScript | Luau |
|------------|------|
| `import React from "react"` | `const React = require(...)` |
| `import { useState } from "react"` | `const useState = React.useState` |
| `import { Players } from "@rbx-services"` | `const Players = game:GetService("Players")` |
| `import Card from "./Card"` | `const Card = require(script.Parent.Card)` |
| `import * as Utils from "./utils"` | `const Utils = require(script.Parent.utils)` |
| `import styles from "./Card.module.css"` | `const styles = require(script.Parent["Card.style"])` |
| `export default function App()` | `return App` |
| `export function helper()` | `return { helper = helper }` |
| `export { X } from "./module"` | Re-export handling |

## Path resolution

- File naming follows Rojo conventions: `index.tsx` becomes `init.luau`.
- Package imports resolve to `ReplicatedStorage.Packages.<PackageName>`.
- Rojo-aware path resolution reads `default.project.json` for alias mapping, so source
  directories map to the correct `game:GetService(...)` require paths.

## Roblox services

The `@rbx-services` virtual module maps named imports to `game:GetService()`:

```ts
import { Players, RunService } from "@rbx-services";
```

```lua
const Players = game:GetService("Players")
const RunService = game:GetService("RunService")
```

See [Roblox Integration](/guides/roblox/) for more on services and the Instance API.
