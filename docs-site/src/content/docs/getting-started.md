---
title: Getting Started
description: Install rbx-tsx, scaffold a Rojo-ready project, and compile your first TSX component to Luau.
---

## Why rbx-tsx?

[roblox-ts](https://roblox-ts.com/) is the established TypeScript-to-Luau compiler for
Roblox. rbx-tsx takes a different approach:

| | rbx-tsx | roblox-ts |
|---|---|---|
| **Runtime dependency** | None — compiles to standalone Luau | Requires `@rbxts/compiler-types` runtime |
| **Luau type output** | Full Luau type annotations preserved — interfaces, generics, unions, optionals | Types are erased; output is untyped Luau |
| **React / JSX** | Built-in. JSX compiles directly to `React.createElement` for react-lua | Requires separate `@rbxts/react` type packages and manual `tsconfig.json` JSX setup |
| **HTML elements** | Write `<div>`, `<button>`, `<input>` — mapped to Roblox GUI classes automatically | Must use Roblox class names directly |
| **JS API coverage** | `console`, `Math`, `JSON`, `Array`, `String`, `Object`, `RegExp`, `setTimeout` — compiled inline | Requires runtime package for JS API polyfills |
| **CSS support** | Companion `rbx-css` compiler with `--css` flag | Not built-in |
| **Output readability** | Clean, 1:1 Luau with types | Readable but includes runtime calls, no types |
| **Ecosystem** | Rojo + Wally | Rojo + npm (`@rbxts/*` packages) |
| **Setup** | `npm install rbx-tsx` — that's it | Requires `@rbxts/*` type packages, compiler config, and matching versions |

Both compilers support async/await, generators, and decorators. roblox-ts handles these
via installed runtime packages, while rbx-tsx inlines the polyfills directly into the output.

## Install

```bash
npm install rbx-tsx
```

## Scaffold a new project

```bash
rbx-tsx init my-app
cd my-app
rbx-tsx compile src/ -o out/
```

This generates a Rojo-ready project with `wally.toml`, `default.project.json`, and
starter components.

## Compile

```bash
# Compile a single file (to stdout)
rbx-tsx compile App.tsx

# Compile to a file
rbx-tsx compile App.tsx -o App.luau

# Compile a directory
rbx-tsx compile src/ -o out/

# Watch mode
rbx-tsx watch src/ -o out/

# Type check only (no emit)
rbx-tsx check src/
```

## Your first component

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
const React = require(game:GetService("ReplicatedStorage").Packages.React)
const useState = React.useState
const useCallback = React.useCallback

type CounterProps = {
    label: string,
    initialCount: number?,
}

const function Counter(props: CounterProps)
    const label = props.label
    const initialCount = if props.initialCount ~= nil then props.initialCount else 0
    const count, setCount = useState(initialCount)
    const increment = useCallback(function()
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

:::tip[Try it live]
Paste this into the [Playground](/playground/) to see the compiled output update as you type,
with TypeScript type errors surfaced in the problems panel.
:::

## What's next

- Browse the [Examples](/reference/examples/) for side-by-side input/output pairs.
- Read the [CLI Reference](/guides/cli/) for every command and flag.
- Learn how [JSX & React](/guides/jsx-react/) map to react-lua.
