---
title: API Transforms
description: How JavaScript standard-library APIs (console, Math, JSON, Array, String, Object, RegExp) compile to Luau.
---

JavaScript standard-library APIs are compiled inline — no runtime polyfill package is
required. Array and Object helpers that have no direct Luau equivalent are emitted as
auto-generated helper functions in the output preamble, included only when used.

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
| `Map`/`Set` `.get/.set/.has/.add/.delete/.clear/.size` | Table operations (resolved via the type checker) |
| `/regex/flags` | `RegExp("regex", "flags")` via luau-regexp |
| `v.add/sub/mul/div/idiv(x)` | `v + x` / `v - x` / `v * x` / `v / x` / `v // x` (value-type operators) |

## RegExp

JavaScript regex literals (`/pattern/flags`) and `RegExp` methods compile to calls into
[`luau-regexp`](https://github.com/Dekkonot/luau-regexp). See the
[regex example](/reference/examples/) for the full mapping of `.test`, `.exec`, `.match`,
and `.replace`.

## Value-type math

Since TypeScript lacks operator overloading, Roblox value types expose arithmetic as
methods that compile to native Luau operators:

```ts
const moved = position.add(offset);   // → position + offset
const scaled = size.mul(2);           // → size * 2
```
