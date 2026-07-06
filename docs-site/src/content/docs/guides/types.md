---
title: Type System
description: How TypeScript interfaces, generics, unions, and utility types compile to Luau type annotations.
---

TypeScript types compile to Luau type annotations — they are **preserved, not erased**.
This is one of the core differences from roblox-ts, whose output is untyped.

```typescript
interface Props {              // type Props = {
  title: string;               //   title: string,
  count?: number;              //   count: number?,
  items: string[];             //   items: { string },
  data: Record<string, number>; //  data: { [string]: number },
  onClick: () => void;         //   onClick: (() -> ()),
}                              // }

enum Direction { Up, Down }    // const Direction = { Up = 0, Down = 1 }
                               // type Direction = number
```

## Supported type constructs

- Interfaces and type aliases
- Generics
- Union and intersection types
- Optionals (`?`) and `Record<K, V>` index signatures
- Utility types: `Partial<T>`, `NonNullable<T>`, `Readonly<T>`, `Required<T>`
- Conditional types, mapped types, template literal types, indexed access types
- Enums (compiled to a value table plus a `number` type alias)

See the [types example](/reference/examples/) for a full side-by-side input/output pair.

## Type extraction for packages

Installed Luau packages don't ship TypeScript types. The
[`rbx-tsx types`](/guides/type-extraction/) command reads your installed wally/pesde
package source and emits `.d.ts` declarations so those imports resolve to real types
instead of `any`.
