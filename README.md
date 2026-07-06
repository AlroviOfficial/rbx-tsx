# rbx-tsx

TSX/TypeScript → Luau compiler targeting [react-lua](https://github.com/jsdotlua/react-lua) for Roblox. Write React components in TypeScript/TSX, get clean, **fully typed, dependency-free** Luau that works inside Roblox.

📖 **[Documentation](https://rbx-tsx.alrovi.com)** &nbsp;·&nbsp; 🛝 **[Playground](https://rbx-tsx.alrovi.com/playground/)**

## Why rbx-tsx?

Unlike [roblox-ts](https://roblox-ts.com/), rbx-tsx compiles to **standalone Luau with no runtime dependency** and **preserves your TypeScript types** as Luau type annotations. JSX is built in (no `@rbxts/*` packages or `tsconfig.json` JSX setup), HTML elements map to Roblox GUI classes automatically, and JS APIs (`console`, `Math`, `JSON`, `Array`, `RegExp`, …) are inlined directly into the output.

See the [full comparison](https://rbx-tsx.alrovi.com/getting-started/#why-rbx-tsx) in the docs.

## Quick Start

```bash
npm install rbx-tsx

rbx-tsx init my-app        # scaffold a Rojo-ready project
cd my-app
rbx-tsx compile src/ -o out/
```

## Example

**Input** (`Counter.tsx`):

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

**Output** (`Counter.luau`):

```lua
const React = require(game:GetService("ReplicatedStorage").Packages.React)
const useState = React.useState
const useCallback = React.useCallback

const function Counter(props: { label: string })
    const label = props.label
    const count, setCount = useState(0)
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

Try it live in the **[Playground](https://rbx-tsx.alrovi.com/playground/)**, or browse [`examples/`](examples/) for side-by-side input/output pairs (async/await, decorators, generators, optional chaining, regex, Roblox services, types). The [`demo/`](demo/) directory is a full Rojo + Wally project.

## CLI

```bash
rbx-tsx compile <input>   # compile a file or directory (stdout or -o <path>)
rbx-tsx watch <path>      # recompile on change
rbx-tsx check <input>     # type-check without emitting
rbx-tsx init <name>       # scaffold a new project
rbx-tsx types [path]      # generate .d.ts from wally/pesde packages or local .luau modules
```

Full flag reference and feature details are in the **[docs](https://rbx-tsx.alrovi.com/guides/cli/)**:

- [JSX & React](https://rbx-tsx.alrovi.com/guides/jsx-react/) — hooks, element & props mapping
- [Language](https://rbx-tsx.alrovi.com/guides/language-transforms/) & [API Transforms](https://rbx-tsx.alrovi.com/guides/api-transforms/)
- [Module System](https://rbx-tsx.alrovi.com/guides/modules/) & [Roblox Integration](https://rbx-tsx.alrovi.com/guides/roblox/)
- [Type System](https://rbx-tsx.alrovi.com/guides/types/) & [Package Type Extraction](https://rbx-tsx.alrovi.com/guides/type-extraction/)

## Contributing

The docs site lives in [`docs-site/`](docs-site/) (Astro Starlight) and the in-browser playground in [`playground/`](playground/). See [`CLAUDE.md`](CLAUDE.md) for the compiler architecture.

## License

[MIT](LICENSE)
