---
title: JSX & React
description: How JSX and React hooks compile to React.createElement for react-lua, and how props map to Roblox.
---

JSX elements compile directly to `React.createElement()` calls for
[react-lua](https://github.com/jsdotlua/react-lua) — no separate type packages or
`tsconfig.json` JSX setup required.

## Supported features

- JSX elements compile to `React.createElement()` calls
- HTML elements map to Roblox GUI classes (see [Element Mapping](/reference/element-mapping/))
- All React hooks: `useState`, `useEffect`, `useCallback`, `useContext`, `useRef`,
  `useMemo`, `useReducer`, `useImperativeHandle`, `useLayoutEffect`
- JSX fragments, spread attributes, conditional rendering, `.map()` in children
- `key` and `ref` prop handling
- Portals via `ReactRoblox.createPortal`

## Props mapping

JSX props are translated to their Roblox/react-lua equivalents:

| TSX | Luau |
|-----|------|
| `className="card"` | `[React.Tag] = "card"` |
| `id="sidebar"` | `Name = "sidebar"` |
| `onClick={fn}` | `[React.Event.Activated] = fn` |
| `onChange={fn}` | `[React.Change.Text] = fn` |
| `ref={r}` | `ref = r` |
| `key={k}` | Table key in children |
| Roblox-native props | Passthrough |

Any Roblox GUI class name (e.g. `<Frame>`, `<ScrollingFrame>`, `<TextLabel>`) can be used
directly as a JSX element and is passed through. Default props are only applied when you
don't specify them yourself.

## Example

```tsx
import React, { useState, useCallback } from "react";

export default function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);

  return (
    <div className="counter">
      <h1>{label}</h1>
      <span>Count: {count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}
```

Compiles to a `React.createElement("Frame", …)` tree with `<h1>` → `TextLabel`,
`<button>` → `TextButton`, and `onClick` → `[React.Event.Activated]`. See the full
output on the [Getting Started](/getting-started/#your-first-component) page.
