# rbx-tsx

TSX to Luau compiler targeting react-lua for Roblox. Write React components in TypeScript/TSX, get Luau modules that work with [react-lua](https://github.com/jsdotlua/react-lua).

## Install

```bash
npm install rbx-tsx
# or
bun add rbx-tsx
```

## Usage

```bash
# Compile a single file (stdout)
rbx-tsx compile App.tsx

# Compile to file
rbx-tsx compile App.tsx -o App.luau

# Compile a directory
rbx-tsx compile src/ -o out/

# Watch mode
rbx-tsx watch src/ -o out/

# Type check only (no emit)
rbx-tsx check src/
```

## CLI Reference

### `rbx-tsx compile <input>`

| Flag | Description | Default |
|------|-------------|---------|
| `-o, --output <path>` | Output file or directory | stdout |
| `--css` | Also compile `.css` files via rbx-css | `false` |
| `--react-path <path>` | Require path for React | `ReplicatedStorage.Packages.React` |
| `--react-roblox-path <path>` | Require path for ReactRoblox | `ReplicatedStorage.Packages.ReactRoblox` |
| `--strict` | Treat warnings as errors | `false` |
| `--sourcemap` | Emit source map comments | `false` |
| `--warn <level>` | `all`, `unsupported`, or `none` | `all` |

### `rbx-tsx watch <path>`

Watches a directory or file for changes and recompiles. Accepts `-o`, `--react-path`, `--react-roblox-path`, and `--warn`.

### `rbx-tsx check <input>`

Runs the compiler without emitting files. Reports warnings and errors.

## Element Mapping

| TSX | Luau | Default behavior |
|-----|------|------------------|
| `<div>` | `Frame` | |
| `<span>`, `<p>`, `<h1>`–`<h6>`, `<label>` | `TextLabel` | |
| `<button>`, `<a>` | `TextButton` | |
| `<input>`, `<textarea>` | `TextBox` | |
| `<img>` | `ImageLabel` | |
| `<canvas>` | `ViewportFrame` | |
| `<video>` | `VideoFrame` | |
| `<scroll>` | `ScrollingFrame` | |
| `<nav>`, `<header>`, `<footer>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<form>` | `Frame` | Transparent, auto-height, full-width |
| `<ul>`, `<ol>` | `Frame` | Vertical `UIListLayout` auto-injected |
| `<li>` | `Frame` | Transparent, auto-height, full-width |
| `<table>`, `<thead>`, `<tbody>`, `<tfoot>` | `Frame` | Vertical `UIListLayout` auto-injected |
| `<tr>` | `Frame` | Horizontal `UIListLayout` auto-injected |
| `<td>` | `TextLabel` | Transparent, auto-sized |
| `<th>` | `TextLabel` | Transparent, auto-sized, bold font |
| `<dialog>` | `Frame` | Centered (`AnchorPoint` + `Position`) |
| `<details>` | `Frame` | Transparent, auto-height |
| `<summary>` | `TextButton` | |
| `<select>` | `Frame` | Vertical `UIListLayout` auto-injected |
| `<option>` | `TextButton` | |
| `<optgroup>` | `Frame` | Transparent, auto-height |

Default props are only applied when you don't specify them yourself — your props always take precedence.

Unsupported elements (`iframe`, `embed`, `object`, `audio`, `source`, `track`, `map`, `area`, `svg` and SVG shapes) have no Roblox equivalent and produce a compiler warning.

## Props Mapping

| TSX | Luau |
|-----|------|
| `className="card"` | `[React.Tag] = "card"` |
| `id="sidebar"` | `Name = "sidebar"` |
| `onClick={fn}` | `[React.Event.Activated] = fn` |
| `onChange={fn}` | `[React.Change.Text] = fn` |
| `ref={r}` | `ref = r` |
| `key={k}` | Table key in children |
| Roblox-native props | Passthrough |

## Language Transforms

| TypeScript | Luau |
|------------|------|
| `const` / `let` | `local` |
| `===` / `!==` | `==` / `~=` |
| `&&` / `\|\|` / `!` | `and` / `or` / `not` |
| `a ?? b` | `if a ~= nil then a else b` |
| `a?.b` | `if a ~= nil then a.b else nil` |
| `cond ? a : b` | `if cond then a else b` |
| `for..of` | `for _, v in items do` |
| `for..in` | `for k, _ in obj do` |
| `try/catch` | `pcall` |
| `throw` | `error()` |
| `new Color3()` | `Color3.new()` |
| `typeof x` | `typeof(x)` |
| `` `hello ${name}` `` | `"hello " .. tostring(name)` |

## API Transforms

| TypeScript | Luau |
|------------|------|
| `console.log()` | `print()` |
| `console.warn()` | `warn()` |
| `Math.floor()` | `math.floor()` |
| `Math.PI` | `math.pi` |
| `JSON.stringify()` | `HttpService:JSONEncode()` |
| `JSON.parse()` | `HttpService:JSONDecode()` |
| `parseInt()` / `parseFloat()` | `tonumber()` |
| `setTimeout(fn, ms)` | `task.delay(ms / 1000, fn)` |
| `clearTimeout(id)` | `task.cancel(id)` |
| `arr.push(x)` | `table.insert(arr, x)` |
| `arr.includes(x)` | `table.find(arr, x) ~= nil` |
| `s.toLowerCase()` | `string.lower(s)` |
| `.length` | `#` operator |

## Module System

| TypeScript | Luau |
|------------|------|
| `import React from "react"` | `local React = require(...)` |
| `import { useState } from "react"` | `local useState = React.useState` |
| `import { Players } from "@rbx-services"` | `local Players = game:GetService("Players")` |
| `import Card from "./Card"` | `local Card = require(script.Parent.Card)` |
| `import styles from "./Card.module.css"` | `local styles = require(script.Parent["Card.style"])` |
| `export default function App()` | `return App` |
| `export function helper()` | `return { helper = helper }` |

File naming follows Rojo conventions: `index.tsx` → `init.luau`, `Component.tsx` → `Component.luau`.

## Type System

TypeScript types compile to Luau type annotations:

```typescript
interface Props {           // type Props = {
  title: string;            //   title: string,
  count?: number;           //   count: number?,
  items: string[];          //   items: { string },
  data: Record<string, number>; //   data: { [string]: number },
  onClick: () => void;      //   onClick: (() -> ()),
}                           // }

enum Direction { Up, Down } // local Direction = { Up = 0, Down = 1 }
                            // type Direction = number
```

## License

MIT
