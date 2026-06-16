---
title: Roblox Integration
description: Constructors, value-type math, method-call syntax, services, and CSS support for Roblox.
---

rbx-tsx understands the Roblox environment — constructors, value types, services, and
method-call syntax all compile to idiomatic Luau.

## Constructors

Both the JavaScript `new` form and the idiomatic Roblox `.new()` form compile to `.new()`:

```ts
const a = new Vector3(1, 2, 3);   // → Vector3.new(1, 2, 3)
const b = Vector3.new(1, 2, 3);   // → Vector3.new(1, 2, 3)
```

Static value-type calls use `.` dot syntax:

```ts
Color3.fromRGB(255, 0, 0);   // → Color3.fromRGB(255, 0, 0)
CFrame.lookAt(a, b);         // → CFrame.lookAt(a, b)
Instance.new("Part");        // → Instance.new("Part")
```

## Value-type math

TypeScript has no operator overloading, so value types expose arithmetic as methods that
compile to native Luau operators:

```ts
position.add(offset);   // → position + offset
size.mul(2);            // → size * 2
a.idiv(b);              // → a // b
```

## Method-call syntax

Roblox instance method calls automatically use `:` colon syntax:

```ts
part.WaitForChild("Handle");      // → part:WaitForChild("Handle")
event.Connect(handler);           // → event:Connect(handler)
```

The compiler distinguishes method calls (`:`) from static/value-type calls (`.`) using the
resolved type from the TypeScript checker.

## Services

The `@rbx-services` module maps named imports to `game:GetService()`:

```ts
import { Players, RunService, ReplicatedStorage } from "@rbx-services";
```

```lua
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
```

## CSS support

A companion `rbx-css` compiler handles `.css` files when you pass the `--css` flag. CSS
modules import as style tables:

```ts
import styles from "./Card.module.css";
```

See the [roblox-services example](/reference/examples/) for the Instance API and `:` method
calls in context.
