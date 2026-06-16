---
title: Examples
description: Side-by-side TypeScript → Luau input/output pairs, plus the full Rojo + Wally demo project.
---

The [`examples/`](https://github.com/AlroviOfficial/rbx-tsx/tree/master/examples) directory
has side-by-side input/output pairs showing specific features. Each `.ts`/`.tsx` file has a
matching `.luau` file showing the compiled output.

| Example | Features shown |
|---------|---------------|
| [react-component](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/react-component.tsx) | `useState`, `useCallback`, JSX, props, element mapping |
| [async-await](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/async-await.ts) | `async`/`await` to Promise transform |
| [decorators](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/decorators.ts) | Class and method decorators |
| [flow](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/flow.ts) | Generator functions, coroutine adapter |
| [optional-chaining](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/optional-chaining.ts) | `?.`, `??`, temp-var extraction |
| [regex](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/regex.ts) | RegExp literals and methods |
| [roblox-services](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/roblox-services.ts) | `@rbx-services`, Instance API, `:` method calls |
| [types](https://github.com/AlroviOfficial/rbx-tsx/blob/master/examples/types.ts) | Interfaces, type aliases, generics, enums |

:::tip[Run them live]
Every example above is loaded into the [Playground](/playground/) — pick one from the
**Examples** dropdown to see it compile in real time.
:::

## Demo project

The [`demo/`](https://github.com/AlroviOfficial/rbx-tsx/tree/master/demo) directory contains
a full Roblox project that demonstrates rbx-tsx in a real setup:

- Rojo project configuration (`default.project.json`)
- Wally package manager config for React and ReactRoblox dependencies
- Source TypeScript files and their compiled Luau output
- Build scripts for both Windows and Unix
