---
title: Language Transforms
description: How TypeScript/JavaScript language constructs compile to idiomatic Luau.
---

rbx-tsx transforms JavaScript and TypeScript language constructs into idiomatic Luau.

| TypeScript | Luau |
|------------|------|
| `const` / `let` | `const` / `local` (see below) |
| `===` / `!==` | `==` / `~=` |
| `&&` / `\|\|` / `!` | `and` / `or` / `not` |
| `a ?? b` | `if a ~= nil then a else b` |
| `a?.b?.c` | temp-var optional chaining |
| `cond ? a : b` | `if cond then a else b` |
| `` `hello ${name}` `` | `` `hello {name}` `` (Luau string interpolation) |
| `for...of` | `for _, v in items do` |
| `for...in` | `for k, _ in obj do` |
| Numeric `for` | `for i = 0, n - 1 do` |
| `switch/case` | `if/elseif/else` |
| `try/catch/finally` | `pcall` |
| `throw` | `error()` |
| `async/await` | Promise-based transform |
| `function*` / `yield` | Coroutine adapter |
| `new Color3()` / `Color3.new()` | `Color3.new()` |
| `typeof x` | `typeof(x)` |
| `delete obj.key` | `obj.key = nil` |
| Decorators | Wrapper/descriptor calls |
| Labeled `break` | Flag variable pattern |
| `&&=` / `\|\|=` / `??=` | Logical assignment |
| Destructuring | Local variable extraction |
| Spread `{ ...a, ...b }` | `_merge(a, b)` |
| Classes with `extends` | Metatables with `__index` |
| `get x()` / `set x(v)` | Function `__index` / `__newindex` dispatch |
| `[key]() {}` / `"name"() {}` | Computed/string method name → `Class[key] = function` |
| `` tag`a${x}b` `` | `tag({ "a", "b" }, x)` |
| `LuaTuple<[A, B]>` return | `(A, B)` multiple return values |
| `const [a, b] = tupleCall()` | `const a, b = tupleCall()` |

## `const` bindings

Any binding that is never reassigned — including `let` variables and function
declarations — is emitted as Luau [`const`](https://rfcs.luau.org/const-keyword.html)
instead of `local`, so the immutability survives compilation. Reassigned bindings and
uninitialized locals stay `local`. If your toolchain doesn't support `const` yet, pass
`--no-const` to emit `local` everywhere.

## Async, generators, and decorators

Unlike roblox-ts, which relies on installed runtime packages, rbx-tsx **inlines the
polyfills** for these constructs directly into the output:

- `async`/`await` compiles to a Promise-based transform.
- `function*` / `yield` compiles to a coroutine adapter.
- Class and method decorators compile to wrapper/descriptor calls.

See the [async-await](/reference/examples/), [flow](/reference/examples/), and
[decorators](/reference/examples/) examples for full input/output pairs.
