# rbx-tsx

TSX/TypeScript to Luau compiler targeting [react-lua](https://github.com/jsdotlua/react-lua) for Roblox. Write React components in TypeScript/TSX, get Luau modules that work inside Roblox.

## Why rbx-tsx?

[roblox-ts](https://roblox-ts.com/) is the established TypeScript-to-Luau compiler for Roblox. rbx-tsx takes a different approach:

| | rbx-tsx | roblox-ts |
|---|---|---|
| **Runtime dependency** | None — compiles to standalone Luau | Requires `@rbxts/compiler-types` runtime |
| **Luau type output** | Full Luau type annotations preserved from TypeScript — interfaces, generics, unions, optionals | Types are erased; output is untyped Luau |
| **React / JSX** | Built-in. JSX compiles directly to `React.createElement` for react-lua | Requires separate `@rbxts/react` type packages and manual `tsconfig.json` JSX setup |
| **HTML elements** | Write `<div>`, `<button>`, `<input>` — mapped to Roblox GUI classes automatically | Must use Roblox class names directly |
| **JS API coverage** | `console`, `Math`, `JSON`, `Array`, `String`, `Object`, `RegExp`, `setTimeout` — compiled inline | Requires runtime package for JS API polyfills |
| **CSS support** | Companion `rbx-css` compiler with `--css` flag | Not built-in |
| **Output readability** | Clean, 1:1 Luau with types — designed to be read and debugged | Readable but includes runtime calls, no types |
| **Labeled statements** | Supported via flag variable pattern | Not supported |
| **RegExp** | Compiles to `luau-regexp` calls | Not supported |
| **Ecosystem** | Rojo + Wally | Rojo + npm (`@rbxts/*` packages) |
| **Setup** | `npm install rbx-tsx` — that's it | Requires `@rbxts/*` type packages, compiler config, and matching package versions |

Both compilers support async/await, generators, and decorators. roblox-ts handles these via installed runtime packages, while rbx-tsx inlines the polyfills directly into the output.

rbx-tsx is designed for developers who want to write idiomatic React with TypeScript and get clean, fully typed, dependency-free Luau output.

## Quick Start

```bash
npm install rbx-tsx
```

Scaffold a new project:

```bash
rbx-tsx init my-app
cd my-app
rbx-tsx compile src/ -o out/
```

This generates a Rojo-ready project with `wally.toml`, `default.project.json`, and starter components.

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

## Example

**Input** (`Counter.tsx`):

```tsx
import React, { useState, useCallback } from "react";

interface CounterProps {
  label: string;
  initialCount?: number;
}

export default function Counter({ label, initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return (
    <div className="counter">
      <h1>{label}</h1>
      <span>Count: {count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

**Output** (`Counter.luau`):

```lua
local React = require(game:GetService("ReplicatedStorage").Packages.React)
local useState = React.useState
local useCallback = React.useCallback

type CounterProps = {
    label: string,
    initialCount: number?,
}

local function Counter(props: CounterProps)
    local label = props.label
    local initialCount = if props.initialCount ~= nil then props.initialCount else 0
    local count, setCount = useState(initialCount)
    local increment = useCallback(function()
        setCount(function(c) return c + 1 end)
    end, {})

    return React.createElement("Frame", { [React.Tag] = "counter" }, {
        H1 = React.createElement("TextLabel", { Text = label }),
        Span = React.createElement("TextLabel", { Text = `Count: {count}` }),
        Button = React.createElement("TextButton", {
            [React.Event.Activated] = increment,
            Text = "+",
        }),
    })
end

return Counter
```

See [`examples/`](examples/) for more side-by-side comparisons including async/await, decorators, generators, optional chaining, regex, Roblox services, and type annotations. The [`demo/`](demo/) directory contains a complete Roblox project with Rojo and Wally integration.

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

Watches a directory or file for changes and recompiles. Accepts the same flags as `compile`.

### `rbx-tsx check <input>`

Runs the compiler without emitting files. Reports warnings and errors.

### `rbx-tsx init <name>`

Scaffolds a new Roblox project with starter components, `tsconfig.json`, `wally.toml`, and `default.project.json`.

## Features

### JSX and React

- JSX elements compile to `React.createElement()` calls
- HTML elements map to Roblox GUI classes (see [Element Mapping](#element-mapping))
- All React hooks: `useState`, `useEffect`, `useCallback`, `useContext`, `useRef`, `useMemo`, `useReducer`, `useImperativeHandle`, `useLayoutEffect`
- JSX fragments, spread attributes, conditional rendering, `.map()` in children
- `key` and `ref` prop handling
- Portals via `ReactRoblox.createPortal`

### Language Transforms

| TypeScript | Luau |
|------------|------|
| `const` / `let` | `local` |
| `===` / `!==` | `==` / `~=` |
| `&&` / `\|\|` / `!` | `and` / `or` / `not` |
| `a ?? b` | `if a ~= nil then a else b` |
| `a?.b?.c` | temp-var optional chaining |
| `cond ? a : b` | `if cond then a else b` |
| `` `hello ${name}` `` | `"hello " .. tostring(name)` |
| `for...of` | `for _, v in items do` |
| `for...in` | `for k, _ in obj do` |
| Numeric `for` | `for i = 0, n - 1 do` |
| `switch/case` | `if/elseif/else` |
| `try/catch/finally` | `pcall` |
| `throw` | `error()` |
| `async/await` | Promise-based transform |
| `function*` / `yield` | Coroutine adapter |
| `new Color3()` | `Color3.new()` |
| `typeof x` | `typeof(x)` |
| `delete obj.key` | `obj.key = nil` |
| Decorators | Wrapper/descriptor calls |
| Labeled `break` | Flag variable pattern |
| `&&=` / `\|\|=` / `??=` | Logical assignment |
| Destructuring | Local variable extraction |
| Spread `{ ...a, ...b }` | `_merge(a, b)` |
| Classes with `extends` | Metatables with `__index` |

### API Transforms

| TypeScript | Luau |
|------------|------|
| `console.log()` / `console.warn()` / `console.error()` | `print()` / `warn()` |
| `Math.floor()` / `Math.PI` / `Math.*` | `math.floor()` / `math.pi` / `math.*` |
| `JSON.stringify()` / `JSON.parse()` | `HttpService:JSONEncode()` / `JSONDecode()` |
| `parseInt()` / `parseFloat()` | `tonumber()` |
| `setTimeout(fn, ms)` / `clearTimeout(id)` | `task.delay(ms / 1000, fn)` / `task.cancel(id)` |
| `arr.push/pop/shift/includes/indexOf` | Luau table equivalents |
| `arr.map/filter/reduce/find/some/every` | Auto-generated helper functions |
| `arr.slice/splice/flat/flatMap/concat/reverse/fill` | Auto-generated helper functions |
| `arr.length` / `str.length` | `#` operator |
| `str.toLowerCase/toUpperCase/trim/split` | `string.*` equivalents |
| `str.includes/startsWith/endsWith/replace` | `string.find` / `string.sub` / `string.gsub` |
| `Object.keys/values/entries/assign` | Auto-generated helpers |
| `Number.isInteger/isNaN/isFinite` | Inline Luau checks |
| `Array.isArray(x)` / `Array.from(x)` | Type check / table conversion |
| `/regex/flags` | `RegExp("regex", "flags")` via luau-regexp |

### Module System

| TypeScript | Luau |
|------------|------|
| `import React from "react"` | `local React = require(...)` |
| `import { useState } from "react"` | `local useState = React.useState` |
| `import { Players } from "@rbx-services"` | `local Players = game:GetService("Players")` |
| `import Card from "./Card"` | `local Card = require(script.Parent.Card)` |
| `import * as Utils from "./utils"` | `local Utils = require(script.Parent.utils)` |
| `import styles from "./Card.module.css"` | `local styles = require(script.Parent["Card.style"])` |
| `export default function App()` | `return App` |
| `export function helper()` | `return { helper = helper }` |
| `export { X } from "./module"` | Re-export handling |

File naming follows Rojo conventions: `index.tsx` becomes `init.luau`.

Package imports resolve to `ReplicatedStorage.Packages.<PackageName>`. Rojo-aware path resolution reads `default.project.json` for alias mapping.

### Type System

TypeScript types compile to Luau type annotations:

```typescript
interface Props {              // type Props = {
  title: string;               //   title: string,
  count?: number;              //   count: number?,
  items: string[];             //   items: { string },
  data: Record<string, number>; //  data: { [string]: number },
  onClick: () => void;         //   onClick: (() -> ()),
}                              // }

enum Direction { Up, Down }    // local Direction = { Up = 0, Down = 1 }
                               // type Direction = number
```

Supports generics, union types, intersection types, `Partial<T>`, `NonNullable<T>`, `Readonly<T>`, `Required<T>`, conditional types, mapped types, template literal types, and indexed access types.

### Roblox Integration

- Roblox constructors (`new Vector3()` becomes `Vector3.new()`)
- Roblox method calls use `:` colon syntax automatically (`WaitForChild`, `Connect`, etc.)
- `@rbx-services` maps to `game:GetService()` for all known services
- CSS module support with companion `rbx-css` compiler (`--css` flag)

## Element Mapping

| TSX | Roblox Class | Default behavior |
|-----|--------------|------------------|
| `<div>` | `Frame` | |
| `<span>`, `<p>`, `<h1>`-`<h6>`, `<label>` | `TextLabel` | |
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
| `<td>`, `<th>` | `TextLabel` | Transparent, auto-sized |
| `<dialog>` | `Frame` | Centered (`AnchorPoint` + `Position`) |
| `<select>` | `Frame` | Vertical `UIListLayout` auto-injected |
| `<option>`, `<summary>` | `TextButton` | |

Any Roblox GUI class name (e.g. `<Frame>`, `<ScrollingFrame>`, `<TextLabel>`) is passed through directly. Default props are only applied when you don't specify them yourself.

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

## Type Definitions

rbx-tsx ships with TypeScript type definitions for the Roblox environment in the [`types/`](types/) directory, covering React hooks, ReactRoblox, Roblox data types, enums, instances, services, and globals. These are included automatically when you install the package.

## Demo

The [`demo/`](demo/) directory contains a full Roblox project that demonstrates rbx-tsx in a real setup:

- Rojo project configuration (`default.project.json`)
- Wally package manager config for React and ReactRoblox dependencies
- Source TypeScript files and their compiled Luau output
- Build scripts for both Windows and Unix

## Examples

The [`examples/`](examples/) directory has side-by-side input/output pairs showing specific features:

| Example | Features shown |
|---------|---------------|
| [react-component](examples/react-component.tsx) | `useState`, `useCallback`, JSX, props, element mapping |
| [async-await](examples/async-await.ts) | `async`/`await` to Promise transform |
| [decorators](examples/decorators.ts) | Class and method decorators |
| [flow](examples/flow.ts) | Generator functions, coroutine adapter |
| [optional-chaining](examples/optional-chaining.ts) | `?.`, `??`, temp-var extraction |
| [regex](examples/regex.ts) | RegExp literals and methods |
| [roblox-services](examples/roblox-services.ts) | `@rbx-services`, Instance API, `:` method calls |
| [types](examples/types.ts) | Interfaces, type aliases, generics, enums |

Each `.ts`/`.tsx` file has a matching `.luau` file showing the compiled output.

## License

[MIT](LICENSE)
