\# TSX to Luau Compiler — Specification



\## Overview



A compiler that transforms TSX (React + TypeScript) components into Luau modules targeting \*\*react-lua\*\* (Roblox's official React 17 port). This is \*\*Layer 2\*\* of the rbx-css pipeline, building on the CSS compiler (Layer 1) for styling.



Write standard React components in TSX. Get Luau modules that run natively in Roblox with full reactivity, hooks, and component composition — no roblox-ts runtime, no transpiler shims.



\### Goals



1\. \*\*Write React, get Roblox UI.\*\* Standard functional components with hooks, props, children — all the React patterns you know.

2\. \*\*HTML vocabulary.\*\* Write `<div>`, `<span>`, `<button>` — the compiler maps to Roblox instances.

3\. \*\*Seamless Layer 1 integration.\*\* `className` props connect to StyleSheet tags from the CSS compiler.

4\. \*\*Luau-native output.\*\* Generated code uses react-lua directly. No runtime library beyond react-lua itself.

5\. \*\*Type preservation.\*\* TypeScript types compile to Luau type annotations where possible.



\### Non-Goals



\- Full TypeScript language support (this is not roblox-ts — we compile a \*\*React-focused subset\*\*)

\- Runtime type checking

\- Server-side rendering

\- React class components (functional only)

\- Support for the entire npm ecosystem



---



\## CLI Interface



```bash

\# Compile a single component

rbx-tsx compile src/components/Card.tsx -o out/components/Card.luau



\# Compile a directory (preserves structure)

rbx-tsx compile src/components/ -o out/components/



\# Compile with paired CSS (Layer 1 + Layer 2 together)

rbx-tsx compile src/ -o out/ --css



\# Watch mode

rbx-tsx watch src/ -o out/



\# Type check only (no emit)

rbx-tsx check src/components/

```



\### Flags



| Flag | Description | Default |

|---|---|---|

| `-o, --output` | Output file or directory | stdout (single file) |

| `--css` | Also compile `.css` files found alongside components via rbx-css | `false` |

| `--react-path` | Require path for react-lua | `ReplicatedStorage.Packages.React` |

| `--react-roblox-path` | Require path for react-roblox | `ReplicatedStorage.Packages.ReactRoblox` |

| `--strict` | Treat warnings as errors | `false` |

| `--sourcemap` | Emit source maps (comment annotations in Luau) | `false` |



---



\## Project Structure Convention



```

src/

&nbsp; components/

&nbsp;   Card.tsx              -- Component source

&nbsp;   Card.css              -- Styles (compiled by Layer 1)

&nbsp;   Card.test.tsx         -- Tests (ignored by compiler)

&nbsp;   Button/

&nbsp;     index.tsx

&nbsp;     Button.css

&nbsp;     variants.ts         -- Pure logic module

&nbsp; hooks/

&nbsp;   useCounter.ts         -- Custom hooks

&nbsp; types/

&nbsp;   index.ts              -- Shared type definitions

&nbsp; App.tsx                 -- Root component

&nbsp; index.tsx               -- Entry point (mounting)



out/

&nbsp; components/

&nbsp;   Card.luau

&nbsp;   Card.style.luau       -- CSS compiled by Layer 1 (if --css)

&nbsp;   Button/

&nbsp;     init.luau           -- index.tsx becomes init.luau (Rojo convention)

&nbsp;     Button.style.luau

&nbsp;     variants.luau

&nbsp; hooks/

&nbsp;   useCounter.luau

&nbsp; types/

&nbsp;   init.luau

&nbsp; App.luau

&nbsp; init.luau

```



\### File Naming Rules



| Source | Output | Reason |

|---|---|---|

| `Component.tsx` | `Component.luau` | Direct mapping |

| `index.tsx` | `init.luau` | Rojo convention for folder modules |

| `Component.css` | `Component.style.luau` | Layer 1 CSS compiler output |

| `Component.test.tsx` | (skipped) | Test files not compiled |

| `types.ts` | `types.luau` | Pure type/logic modules also compiled |



---



\## Element Mapping



\### HTML to Roblox Instance Mapping



The compiler transforms HTML elements to Roblox instances in `React.createElement` calls:



| HTML Element | Roblox Class | Notes |

|---|---|---|

| `div` | `Frame` | Generic container |

| `span` | `TextLabel` | Inline text |

| `p` | `TextLabel` | Paragraph text |

| `h1` - `h6` | `TextLabel` | Headings (size handled by CSS) |

| `button` | `TextButton` | Clickable button |

| `input` | `TextBox` | Text input field |

| `img` | `ImageLabel` | Static image |

| `a` | `TextButton` | Link (navigation via callback) |

| `canvas` | `ViewportFrame` | 3D viewport |

| `label` | `TextLabel` | Label text |

| `textarea` | `TextBox` | Multi-line input (`MultiLine = true`) |

| `video` | `VideoFrame` | Video playback |



\### Special Elements



\#### `<scroll>` or `<div>` with `overflow` class



When the CSS compiler detects `overflow: scroll` on a className, it communicates this to the TSX compiler via a shared manifest. Alternatively, use the explicit `<scroll>` element:



```tsx

// Explicit scroll container

<scroll className="chat-log">

&nbsp; {messages.map(m => <span key={m.id}>{m.text}</span>)}

</scroll>



// Or detected from CSS — div upgrades to ScrollingFrame

<div className="scrollable-panel">

&nbsp; {children}

</div>

```



Both compile to `ScrollingFrame`.



\#### `<fragment>` / `<></>`



React fragments compile to `React.createFragment`:



```tsx

<>

&nbsp; <span>Hello</span>

&nbsp; <span>World</span>

</>

```



```lua

return React.createFragment({

&nbsp;   React.createElement("TextLabel", { Text = "Hello" }),

&nbsp;   React.createElement("TextLabel", { Text = "World" }),

})

```



\#### Portal via `<portal>`



```tsx

<portal target={Players.LocalPlayer.PlayerGui}>

&nbsp; <div className="hud">{children}</div>

</portal>

```



```lua

return ReactRoblox.createPortal(

&nbsp;   React.createElement("Frame", {}, { ... }),

&nbsp;   Players.LocalPlayer.PlayerGui

)

```



---



\## JSX Transform



\### Basic Elements



```tsx

<div className="card">

&nbsp; <span>Hello World</span>

&nbsp; <button onClick={() => console.log("clicked")}>Click me</button>

</div>

```



Compiles to:



```lua

React.createElement("Frame", {}, {

&nbsp;   React.createElement("TextLabel", {

&nbsp;       Text = "Hello World",

&nbsp;   }),

&nbsp;   React.createElement("TextButton", {

&nbsp;       Text = "Click me",

&nbsp;       \[React.Event.Activated] = function()

&nbsp;           print("clicked")

&nbsp;       end,

&nbsp;   }),

})

```



\### Key Transform Rules



\#### 1. Text Children Extraction



Text content inside elements is extracted into the `Text` property for text-capable instances:



```tsx

<span>Hello {name}, you have {count} items</span>

```



```lua

React.createElement("TextLabel", {

&nbsp;   Text = "Hello " .. tostring(name) .. ", you have " .. tostring(count) .. " items",

})

```



\*\*Rules:\*\*

\- Direct string children → `Text` property

\- Template expressions → string concatenation with `tostring()` wrapping

\- Mixed text + elements → Warning (Roblox TextLabel can't have child text nodes alongside instances). Fallback: wrap text in its own TextLabel.

\- Elements that don't support `Text` (like `Frame`/`div`) → text children are wrapped in a `TextLabel` automatically



```tsx

// This:

<div>Some text</div>



// Becomes:

React.createElement("Frame", {}, {

&nbsp;   React.createElement("TextLabel", {

&nbsp;       Text = "Some text",

&nbsp;   }),

})

```



\#### 2. className to Tags



`className` values are compiled to `CollectionService` tags applied via react-lua's ref system:



```tsx

<div className="card highlighted">

&nbsp; <span className="title">Hello</span>

</div>

```



```lua

React.createElement("Frame", {

&nbsp;   \[React.Tag] = "card highlighted",

}, {

&nbsp;   React.createElement("TextLabel", {

&nbsp;       Text = "Hello",

&nbsp;       \[React.Tag] = "title",

&nbsp;   }),

})

```



> \*\*Implementation note:\*\* react-lua supports a `React.Tag` symbol that applies CollectionService tags. If not available in the target react-lua version, fall back to a ref callback:

> ```lua

> ref = function(rbx)

>     if rbx then

>         CollectionService:AddTag(rbx, "card")

>         CollectionService:AddTag(rbx, "highlighted")

>     end

> end

> ```



\#### 3. Dynamic classNames



```tsx

<div className={`card ${isActive ? "active" : ""}`}>

```



```lua

React.createElement("Frame", {

&nbsp;   \[React.Tag] = "card " .. (if isActive then "active" else ""),

})

```



For the `clsx`/`classnames` pattern:



```tsx

import clsx from "clsx";

<div className={clsx("card", { active: isActive, disabled: isDisabled })}>

```



The compiler inlines a lightweight Luau helper:



```lua

React.createElement("Frame", {

&nbsp;   \[React.Tag] = joinClasses("card", isActive and "active" or nil, isDisabled and "disabled" or nil),

})

```



Where `joinClasses` is a generated utility:



```lua

local function joinClasses(...: string?)

&nbsp;   local parts = {}

&nbsp;   for i = 1, select("#", ...) do

&nbsp;       local v = select(i, ...)

&nbsp;       if v and v ~= "" then

&nbsp;           table.insert(parts, v)

&nbsp;       end

&nbsp;   end

&nbsp;   return table.concat(parts, " ")

end

```



\#### 4. CSS Modules (Scoped Classes)



When using CSS modules import syntax, class names are scoped to avoid collisions:



```tsx

import styles from "./Card.module.css";

<div className={styles.card}>

```



The CSS compiler generates scoped tag names (e.g., `Card\_card\_x7f2`) and exports a mapping. The TSX compiler imports this mapping:



```lua

local styles = require(script.Parent\["Card.style"])

React.createElement("Frame", {

&nbsp;   \[React.Tag] = styles.card,  -- "Card\_card\_x7f2"

})

```



---



\## Props Mapping



\### Standard HTML Props to Roblox Properties



| HTML Prop | Roblox Property | Notes |

|---|---|---|

| `className` | `\[React.Tag]` | CollectionService tags |

| `id` | `Name` | Instance name |

| `style` | (inline properties) | See Inline Styles |

| `key` | (React key) | Passed through to react-lua |

| `ref` | `ref` | Passed through to react-lua |

| `children` | (child elements) | Standard React children |

| `dangerouslySetInnerHTML` | Not supported | Warning |



\### Event Mapping



| HTML Event | Roblox Event | Applies To |

|---|---|---|

| `onClick` | `\[React.Event.Activated]` | TextButton, ImageButton |

| `onMouseEnter` | `\[React.Event.MouseEnter]` | GuiObject |

| `onMouseLeave` | `\[React.Event.MouseLeave]` | GuiObject |

| `onChange` | `\[React.Change.Text]` | TextBox |

| `onFocus` | `\[React.Event.Focused]` | TextBox |

| `onBlur` | `\[React.Event.FocusLost]` | TextBox |

| `onScroll` | `\[React.Change.CanvasPosition]` | ScrollingFrame |

| `onSubmit` | `\[React.Event.FocusLost]` | TextBox (check enterPressed param) |



\#### Event Handler Transform



```tsx

<button onClick={(e) => handleClick(e)}>

```



```lua

React.createElement("TextButton", {

&nbsp;   \[React.Event.Activated] = function(rbx, inputObject, clickCount)

&nbsp;       handleClick(inputObject)

&nbsp;   end,

})

```



\*\*Signature differences:\*\* Roblox event callbacks receive the instance as the first argument, then event-specific args. The compiler adjusts parameter mapping:



```tsx

// React: (event) => ...

// Roblox Activated: (rbx, inputObject, clickCount) => ...



// The `e` parameter maps to `inputObject` (second arg), not `rbx`

onClick={(e) => doSomething(e)}

// becomes:

\[React.Event.Activated] = function(\_rbx, inputObject, \_clickCount)

&nbsp;   doSomething(inputObject)

end

```



\#### onChange Special Handling



React's `onChange` fires on every keystroke. Roblox's equivalent is `GetPropertyChangedSignal("Text")`:



```tsx

<input onChange={(e) => setText(e.target.value)} />

```



```lua

React.createElement("TextBox", {

&nbsp;   \[React.Change.Text] = function(rbx)

&nbsp;       setText(rbx.Text)

&nbsp;   end,

})

```



Note: `e.target.value` is detected and transformed to `rbx.Text`. The compiler recognizes common `e.target.\*` patterns:



| React Pattern | Luau Transform |

|---|---|

| `e.target.value` | `rbx.Text` (TextBox) |

| `e.target.checked` | Not applicable — warning |

| `e.preventDefault()` | Ignored (no equivalent) |

| `e.stopPropagation()` | Ignored (no equivalent) |



\#### onSubmit for TextBox



```tsx

<input onSubmit={(value) => handleSubmit(value)} />

```



```lua

React.createElement("TextBox", {

&nbsp;   \[React.Event.FocusLost] = function(rbx, enterPressed, inputThatCausedFocusLoss)

&nbsp;       if enterPressed then

&nbsp;           handleSubmit(rbx.Text)

&nbsp;       end

&nbsp;   end,

})

```



\### Roblox-Specific Props (Passthrough)



Any prop that matches a known Roblox property name is passed through directly without transformation. This allows mixing HTML-style and Roblox-style props:



```tsx

// Mix of HTML and Roblox props

<div

&nbsp; className="panel"

&nbsp; ZIndex={5}

&nbsp; ClipsDescendants={true}

&nbsp; LayoutOrder={2}

>

```



```lua

React.createElement("Frame", {

&nbsp;   \[React.Tag] = "panel",

&nbsp;   ZIndex = 5,

&nbsp;   ClipsDescendants = true,

&nbsp;   LayoutOrder = 2,

})

```



\*\*Known Roblox property names\*\* are maintained in a lookup set. Any prop name found in this set is passed through. Any prop name NOT in this set and NOT in the HTML prop mapping triggers a warning.



\### Inline Styles



The `style` prop accepts an object that maps CSS-like properties to Roblox values, using the same property mapping as the CSS compiler:



```tsx

<div style={{

&nbsp; backgroundColor: "#1a1a2e",

&nbsp; width: "100%",

&nbsp; height: 48,

&nbsp; borderRadius: 8,

}}>

```



```lua

React.createElement("Frame", {

&nbsp;   BackgroundColor3 = Color3.fromHex("#1a1a2e"),

&nbsp;   Size = UDim2.new(1, 0, 0, 48),

}, {

&nbsp;   React.createElement("UICorner", {

&nbsp;       CornerRadius = UDim.new(0, 8),

&nbsp;   }),

})

```



\*\*Rules for inline styles:\*\*

\- camelCase CSS properties are mapped using the same table as the CSS compiler

\- Properties that map to pseudo-instances (`borderRadius`, `padding`, etc.) generate child elements rather than StyleRule pseudo-instances (since inline styles are per-element)

\- Numeric values without units are treated as `px` for dimensional properties

\- String values are parsed for units (`"100%"` → Scale, `"48px"` → Offset)



> \*\*Warning:\*\* Inline styles bypass the StyleSheet system. Prefer `className` + CSS for consistent theming. Inline styles are for dynamic, per-element overrides only.



---



\## Hooks



All standard React hooks compile to their react-lua equivalents.



\### useState



```tsx

const \[count, setCount] = useState(0);

const \[name, setName] = useState<string>("default");

```



```lua

local count, setCount = React.useState(0)

local name, setName = React.useState("default" :: string)

```



\### useEffect



```tsx

useEffect(() => {

&nbsp; const connection = someEvent.Connect(() => { ... });

&nbsp; return () => connection.Disconnect();

}, \[dependency]);

```



```lua

React.useEffect(function()

&nbsp;   local connection = someEvent:Connect(function() ... end)

&nbsp;   return function()

&nbsp;       connection:Disconnect()

&nbsp;   end

end, { dependency })

```



\*\*Key difference:\*\* The dependency array becomes a Luau table `{}` instead of JS array `\[]`.



\### useRef



```tsx

const frameRef = useRef<Frame>(null);

```



```lua

local frameRef = React.useRef(nil :: Frame?)

```



\### useMemo / useCallback



```tsx

const expensive = useMemo(() => computeValue(a, b), \[a, b]);

const handler = useCallback(() => doThing(id), \[id]);

```



```lua

local expensive = React.useMemo(function()

&nbsp;   return computeValue(a, b)

end, { a, b })



local handler = React.useCallback(function()

&nbsp;   doThing(id)

end, { id })

```



\### useContext



```tsx

const ThemeContext = createContext<Theme>(defaultTheme);

const theme = useContext(ThemeContext);

```



```lua

local ThemeContext = React.createContext(defaultTheme :: Theme)

local theme = React.useContext(ThemeContext)

```



\### Custom Hooks



Custom hooks compile as regular Luau functions:



```tsx

function useCounter(initial: number) {

&nbsp; const \[count, setCount] = useState(initial);

&nbsp; const increment = useCallback(() => setCount(c => c + 1), \[]);

&nbsp; const decrement = useCallback(() => setCount(c => c - 1), \[]);

&nbsp; return { count, increment, decrement };

}

```



```lua

local function useCounter(initial: number)

&nbsp;   local count, setCount = React.useState(initial)

&nbsp;   local increment = React.useCallback(function()

&nbsp;       setCount(function(c) return c + 1 end)

&nbsp;   end, {})

&nbsp;   local decrement = React.useCallback(function()

&nbsp;       setCount(function(c) return c - 1 end)

&nbsp;   end, {})

&nbsp;   return { count = count, increment = increment, decrement = decrement }

end

```



---



\## TypeScript to Luau



\### Type Annotations



| TypeScript | Luau | Notes |

|---|---|---|

| `string` | `string` | Direct |

| `number` | `number` | Direct |

| `boolean` | `boolean` | Direct |

| `null` / `undefined` | `nil` | Both map to nil |

| `void` | `()` | Return type |

| `any` | `any` | Direct |

| `unknown` | `unknown` (comment) | No Luau equivalent, use `any` |

| `T\[]` / `Array<T>` | `{ T }` | Luau array type |

| `Record<K, V>` | `{ \[K]: V }` | Luau map type |

| `T \\| null` | `T?` | Optional type |

| `T \\| U` | `T \\| U` | Union (Luau supports this) |

| `\[A, B, C]` (tuple) | `(A, B, C)` | For return types; otherwise `{ A }` |

| `{ a: string, b: number }` | `{ a: string, b: number }` | Table type |

| `Promise<T>` | Not supported | See Async section |



\### Interface / Type Declarations



```tsx

interface CardProps {

&nbsp; title: string;

&nbsp; subtitle?: string;

&nbsp; count: number;

&nbsp; onPress?: () => void;

&nbsp; children?: React.ReactNode;

}

```



```lua

type CardProps = {

&nbsp;   title: string,

&nbsp;   subtitle: string?,

&nbsp;   count: number,

&nbsp;   onPress: (() -> ())?,

&nbsp;   children: React.ReactNode?,

}

```



\### Generics



```tsx

function List<T>({ items, renderItem }: { items: T\[], renderItem: (item: T) => JSX.Element }) {

```



```lua

local function List(props: { items: { any }, renderItem: (item: any) -> React.ReactNode })

```



> \*\*Limitation:\*\* Luau generics exist but are more restricted than TypeScript's. Generic type parameters on components are erased to `any` in the output. A warning is emitted.



\### Enums



```tsx

enum Direction { Up, Down, Left, Right }

```



```lua

local Direction = {

&nbsp;   Up = 0,

&nbsp;   Down = 1,

&nbsp;   Left = 2,

&nbsp;   Right = 3,

}

type Direction = number

```



String enums:

```tsx

enum Color { Red = "red", Blue = "blue" }

```



```lua

local Color = {

&nbsp;   Red = "red",

&nbsp;   Blue = "blue",

}

type Color = string

```



\### Const Assertions / as const



```tsx

const SIZES = { sm: 12, md: 16, lg: 24 } as const;

```



```lua

local SIZES = table.freeze({

&nbsp;   sm = 12,

&nbsp;   md = 16,

&nbsp;   lg = 24,

})

```



---



\## Language Feature Mapping



\### Variables



```tsx

const x = 5;

let y = "hello";

// var is not supported — emit warning suggesting const/let

```



```lua

local x = 5

local y = "hello"

```



\*\*Reassignment:\*\* Both `const` and `let` compile to `local`. The compiler does NOT enforce const immutability at the Luau level (Luau doesn't have `const` locals in the same way). If `--strict` is enabled, the compiler verifies that `const` variables aren't reassigned in source.



\### Control Flow



```tsx

// if/else

if (condition) { doA(); } else { doB(); }



// ternary (often in JSX)

const result = condition ? valueA : valueB;



// switch

switch (action) {

&nbsp; case "increment": return count + 1;

&nbsp; case "decrement": return count - 1;

&nbsp; default: return count;

}

```



```lua

-- if/else

if condition then doA() else doB() end



-- ternary

local result = if condition then valueA else valueB



-- switch → if/elseif chain

if action == "increment" then

&nbsp;   return count + 1

elseif action == "decrement" then

&nbsp;   return count - 1

else

&nbsp;   return count

end

```



\### Loops



```tsx

for (let i = 0; i < 10; i++) { ... }

for (const item of items) { ... }

for (const \[key, value] of Object.entries(map)) { ... }

items.forEach((item, i) => { ... });

```



```lua

for i = 0, 9 do ... end

for \_, item in items do ... end

for key, value in map do ... end

for i, item in items do ... end

```



\### Array/Object Methods



| TypeScript | Luau | Notes |

|---|---|---|

| `arr.map(fn)` | Inline `for` loop building table | See JSX lists |

| `arr.filter(fn)` | Inline `for` loop with condition | |

| `arr.find(fn)` | `table.find` or inline loop | |

| `arr.includes(x)` | `table.find(arr, x) ~= nil` | |

| `arr.length` | `#arr` | |

| `arr.push(x)` | `table.insert(arr, x)` | |

| `arr.slice(a, b)` | `table.move(arr, a+1, b, 1, {})` | Adjust for 1-indexing |

| `arr.concat(other)` | Inline merge | |

| `arr.reduce(fn, init)` | Inline `for` loop with accumulator | |

| `arr.sort(fn)` | `table.sort(copy, fn)` | |

| `arr.reverse()` | Inline reverse loop | |

| `arr.join(sep)` | `table.concat(arr, sep)` | |

| `Object.keys(t)` | Inline loop collecting keys | |

| `Object.values(t)` | Inline loop collecting values | |

| `Object.entries(t)` | Direct iteration in `for..in` | |

| `Object.assign(a, b)` | Inline merge loop | |

| `{ ...a, ...b }` | Inline merge (see Spread) | |

| `JSON.stringify(x)` | `game:GetService("HttpService"):JSONEncode(x)` | |

| `JSON.parse(s)` | `game:GetService("HttpService"):JSONDecode(s)` | |

| `console.log(...)` | `print(...)` | |

| `console.warn(...)` | `warn(...)` | |

| `console.error(...)` | `warn("\[ERROR]", ...)` | |

| `Math.floor(x)` | `math.floor(x)` | |

| `Math.ceil(x)` | `math.ceil(x)` | |

| `Math.round(x)` | `math.round(x)` | |

| `Math.random()` | `math.random()` | |

| `Math.min(a, b)` | `math.min(a, b)` | |

| `Math.max(a, b)` | `math.max(a, b)` | |

| `Math.abs(x)` | `math.abs(x)` | |

| `Math.PI` | `math.pi` | |

| `parseInt(s)` | `tonumber(s)` | |

| `parseFloat(s)` | `tonumber(s)` | |

| `String(x)` / `x.toString()` | `tostring(x)` | |

| `typeof x` | `typeof(x)` | Luau has `typeof()` |

| `x instanceof Y` | Not supported | Warning |



\### String Operations



| TypeScript | Luau |

|---|---|

| Template literals `` `hello ${name}` `` | `"hello " .. tostring(name)` |

| `s.length` | `#s` or `string.len(s)` |

| `s.includes(sub)` | `string.find(s, sub, 1, true) ~= nil` |

| `s.startsWith(pre)` | `string.sub(s, 1, #pre) == pre` |

| `s.endsWith(suf)` | `string.sub(s, -#suf) == suf` |

| `s.slice(a, b)` | `string.sub(s, a + 1, b)` |

| `s.substring(a, b)` | `string.sub(s, a + 1, b)` |

| `s.indexOf(sub)` | `(string.find(s, sub, 1, true) or 0) - 1` |

| `s.replace(a, b)` | `string.gsub(s, a, b, 1)` |

| `s.replaceAll(a, b)` | `string.gsub(s, a, b)` |

| `s.split(sep)` | `string.split(s, sep)` |

| `s.trim()` | `string.match(s, "^%s\*(.-)%s\*$")` |

| `s.toLowerCase()` | `string.lower(s)` |

| `s.toUpperCase()` | `string.upper(s)` |

| `s.repeat(n)` | `string.rep(s, n)` |

| `s.padStart(n, ch)` | Custom inline |

| `s.charAt(i)` | `string.sub(s, i + 1, i + 1)` |



\### Spread Operator



\#### Object Spread



```tsx

const merged = { ...defaults, ...overrides, extra: true };

```



```lua

local merged = table.clone(defaults)

for k, v in overrides do

&nbsp;   merged\[k] = v

end

merged.extra = true

```



For simple cases (2 objects, no computed keys), the compiler can emit the one-liner merge pattern. For complex cases, a helper function is generated:



```lua

local function merge(...)

&nbsp;   local result = {}

&nbsp;   for i = 1, select("#", ...) do

&nbsp;       local t = select(i, ...)

&nbsp;       if t then

&nbsp;           for k, v in t do

&nbsp;               result\[k] = v

&nbsp;           end

&nbsp;       end

&nbsp;   end

&nbsp;   return result

end

```



\#### Array Spread



```tsx

const combined = \[...arr1, ...arr2, extra];

```



```lua

local combined = table.clone(arr1)

table.move(arr2, 1, #arr2, #combined + 1, combined)

table.insert(combined, extra)

```



\#### JSX Spread Props



```tsx

<Button {...props} onClick={handleClick} />

```



```lua

React.createElement(Button, merge(props, {

&nbsp;   \[React.Event.Activated] = handleClick,

}))

```



\### Destructuring



```tsx

const { title, count = 0, ...rest } = props;

const \[first, second, ...remaining] = items;

```



```lua

local title = props.title

local count = if props.count ~= nil then props.count else 0

local rest = table.clone(props)

rest.title = nil

rest.count = nil



local first = items\[1]

local second = items\[2]

local remaining = table.move(items, 3, #items, 1, {})

```



For simple destructuring without defaults or rest, the compiler can use Luau's table destructuring syntax (if targeting Luau 0.6+):



```lua

-- Simple case (no defaults, no rest)

local { title, count } = props -- hypothetical, use field access instead



-- The compiler always uses field access for reliability:

local title = props.title

local count = props.count

```



\### Nullish Operators



```tsx

const value = a ?? b;           // Nullish coalescing

const value = a?.b?.c;          // Optional chaining

const value = a?.b ?? "default"; // Combined

```



```lua

local value = if a ~= nil then a else b

local value = if a ~= nil and a.b ~= nil then a.b.c else nil

local value = if a ~= nil and a.b ~= nil then a.b else "default"

```



For simple cases, Luau's `or` works (but doesn't handle `false` correctly like `??` does):



```lua

-- Only safe when `a` is never `false`:

local value = a or b

```



The compiler uses `if a ~= nil then a else b` by default for correctness, and optimizes to `a or b` when it can prove `a` is never `false` (e.g., typed as `string?` or `number?`).



---



\## Module System



\### Imports



```tsx

import React, { useState, useEffect } from "react";

import { CardProps } from "../types";

import Card from "./Card";

import styles from "./Card.module.css";

```



```lua

local React = require(ReplicatedStorage.Packages.React)

local useState = React.useState

local useEffect = React.useEffect

local types = require(script.Parent.Parent.types)

type CardProps = types.CardProps

local Card = require(script.Parent.Card)

local styles = require(script.Parent\["Card.style"])

```



\### Import Resolution Rules



| Import Path | Resolution |

|---|---|

| `"react"` | Configured react-lua path (`--react-path`) |

| `"react-dom"` / `"react-roblox"` | Configured react-roblox path |

| `"./Card"` | `script.Parent.Card` |

| `"../types"` | `script.Parent.Parent.types` |

| `"../../hooks/useCounter"` | Walk up with `.Parent` |

| `"./Button/index"` | `script.Parent.Button` (index → folder) |

| `"@components/Card"` | Path alias (configured in tsconfig/compiler config) |



\### Special Import Handling



\#### React Import



```tsx

import React from "react";

// or

import { useState, useEffect, useRef } from "react";

```



Both produce:

```lua

local React = require(ReplicatedStorage.Packages.React)

local useState = React.useState

local useEffect = React.useEffect

local useRef = React.useRef

```



The compiler always ensures `React` is imported since `React.createElement` is needed for JSX.



\#### Roblox Services



A special import convention for Roblox services:



```tsx

import { Players, ReplicatedStorage, RunService } from "@rbx-services";

```



```lua

local Players = game:GetService("Players")

local ReplicatedStorage = game:GetService("ReplicatedStorage")

local RunService = game:GetService("RunService")

```



Alternatively, the compiler recognizes bare references to known service names and auto-imports them:



```tsx

// No import needed — compiler detects Players usage

const localPlayer = Players.LocalPlayer;

```



```lua

local Players = game:GetService("Players")

local localPlayer = Players.LocalPlayer

```



\### Exports



```tsx

export default function Card(props: CardProps) { ... }

export function helper() { ... }

export type { CardProps };

export const CONSTANT = 42;

```



```lua

local Card = function(props: CardProps) ... end

local helper = function() ... end

export type CardProps = CardProps

local CONSTANT = 42



return {

&nbsp;   default = Card,  -- or just return Card if only default export

&nbsp;   helper = helper,

&nbsp;   CONSTANT = CONSTANT,

}

```



\*\*Default-only export optimization:\*\* If a module has only a default export, the return is simplified:



```lua

-- Only default export:

return Card



-- Mixed exports:

return {

&nbsp;   default = Card,

&nbsp;   helper = helper,

}

```



When importing a module with mixed exports:

```tsx

import Card, { helper } from "./Card";

```



```lua

local \_Card\_module = require(script.Parent.Card)

local Card = \_Card\_module.default

local helper = \_Card\_module.helper

```



---



\## JSX Patterns



\### Conditional Rendering



```tsx

// \&\& pattern

{isVisible \&\& <div className="tooltip">Info</div>}



// Ternary

{isError ? <span className="error">{message}</span> : <span>{message}</span>}



// Early return

if (!data) return <span>Loading...</span>;

```



```lua

-- \&\& pattern

isVisible and React.createElement("Frame", { \[React.Tag] = "tooltip" }, {

&nbsp;   React.createElement("TextLabel", { Text = "Info" }),

}) or nil



-- Ternary

if isError then

&nbsp;   React.createElement("TextLabel", { \[React.Tag] = "error", Text = message })

else

&nbsp;   React.createElement("TextLabel", { Text = message })

end



-- Early return

if not data then

&nbsp;   return React.createElement("TextLabel", { Text = "Loading..." })

end

```



\### List Rendering



```tsx

{items.map((item, index) => (

&nbsp; <div key={item.id} className="item">

&nbsp;   <span>{item.name}</span>

&nbsp; </div>

))}

```



The compiler transforms `.map()` in JSX context into a Luau table construction:



```lua

local \_items\_elements = {}

for index, item in items do

&nbsp;   \_items\_elements\[item.id] = React.createElement("Frame", {

&nbsp;       \[React.Tag] = "item",

&nbsp;   }, {

&nbsp;       React.createElement("TextLabel", {

&nbsp;           Text = item.name,

&nbsp;       }),

&nbsp;   })

end

-- These elements are spread into the parent's children table

```



\*\*Key handling:\*\* The `key` prop is used as the table key in the children table, which is how react-lua identifies elements for reconciliation.



\### Fragments with Keys



```tsx

{items.map(item => (

&nbsp; <React.Fragment key={item.id}>

&nbsp;   <span>{item.title}</span>

&nbsp;   <span>{item.subtitle}</span>

&nbsp; </React.Fragment>

))}

```



```lua

local \_items\_elements = {}

for \_, item in items do

&nbsp;   \_items\_elements\[item.id] = React.createFragment({

&nbsp;       React.createElement("TextLabel", { Text = item.title }),

&nbsp;       React.createElement("TextLabel", { Text = item.subtitle }),

&nbsp;   })

end

```



---



\## Component Patterns



\### Functional Components



```tsx

interface ButtonProps {

&nbsp; label: string;

&nbsp; variant?: "primary" | "secondary";

&nbsp; onClick?: () => void;

&nbsp; children?: React.ReactNode;

}



export default function Button({ label, variant = "primary", onClick, children }: ButtonProps) {

&nbsp; return (

&nbsp;   <button className={`btn btn-${variant}`} onClick={onClick}>

&nbsp;     {children || label}

&nbsp;   </button>

&nbsp; );

}

```



```lua

local React = require(ReplicatedStorage.Packages.React)



export type ButtonProps = {

&nbsp;   label: string,

&nbsp;   variant: ("primary" | "secondary")?,

&nbsp;   onClick: (() -> ())?,

&nbsp;   children: React.ReactNode?,

}



local function Button(props: ButtonProps)

&nbsp;   local label = props.label

&nbsp;   local variant = if props.variant ~= nil then props.variant else "primary"

&nbsp;   local onClick = props.onClick

&nbsp;   local children = props.children



&nbsp;   return React.createElement("TextButton", {

&nbsp;       \[React.Tag] = "btn btn-" .. variant,

&nbsp;       \[React.Event.Activated] = onClick,

&nbsp;       Text = if children then "" else label,

&nbsp;   }, if children then { children } else nil)

end



return Button

```



\### forwardRef



```tsx

const FancyInput = forwardRef<TextBox, InputProps>((props, ref) => {

&nbsp; return <input ref={ref} className="fancy" />;

});

```



```lua

local FancyInput = React.forwardRef(function(props: InputProps, ref)

&nbsp;   return React.createElement("TextBox", {

&nbsp;       ref = ref,

&nbsp;       \[React.Tag] = "fancy",

&nbsp;   })

end)

```



\### memo



```tsx

const ExpensiveList = memo(function({ items }: ListProps) {

&nbsp; return <div>{items.map(...)}</div>;

});

```



```lua

local ExpensiveList = React.memo(function(props: ListProps)

&nbsp;   return React.createElement("Frame", {}, { ... })

end)

```



\### Context Provider Pattern



```tsx

const ThemeContext = createContext<Theme>({ mode: "dark", primary: "#335fff" });



function ThemeProvider({ children }: { children: React.ReactNode }) {

&nbsp; const \[theme, setTheme] = useState<Theme>({ mode: "dark", primary: "#335fff" });



&nbsp; return (

&nbsp;   <ThemeContext.Provider value={{ theme, setTheme }}>

&nbsp;     {children}

&nbsp;   </ThemeContext.Provider>

&nbsp; );

}

```



```lua

local ThemeContext = React.createContext({

&nbsp;   mode = "dark",

&nbsp;   primary = "#335fff",

} :: Theme)



local function ThemeProvider(props: { children: React.ReactNode })

&nbsp;   local theme, setTheme = React.useState({

&nbsp;       mode = "dark",

&nbsp;       primary = "#335fff",

&nbsp;   } :: Theme)



&nbsp;   return React.createElement(ThemeContext.Provider, {

&nbsp;       value = { theme = theme, setTheme = setTheme },

&nbsp;   }, { props.children })

end

```



---



\## Entry Point / Mounting



The entry point file handles mounting the React tree to a Roblox GUI container:



```tsx

// index.tsx

import React from "react";

import { createRoot } from "react-roblox";

import App from "./App";



const Players = game.GetService("Players");

const playerGui = Players.LocalPlayer.WaitForChild("PlayerGui");



const screenGui = new Instance("ScreenGui");

screenGui.Name = "AppUI";

screenGui.Parent = playerGui;

screenGui.ResetOnSpawn = false;



const root = createRoot(screenGui);

root.render(<App />);

```



```lua

local React = require(ReplicatedStorage.Packages.React)

local ReactRoblox = require(ReplicatedStorage.Packages.ReactRoblox)

local App = require(script.Parent.App)



local Players = game:GetService("Players")

local playerGui = Players.LocalPlayer:WaitForChild("PlayerGui")



local screenGui = Instance.new("ScreenGui")

screenGui.Name = "AppUI"

screenGui.Parent = playerGui

screenGui.ResetOnSpawn = false



local root = ReactRoblox.createRoot(screenGui)

root:render(React.createElement(App))

```



\### Roblox API Transforms in Entry Points



| TypeScript | Luau |

|---|---|

| `new Instance("ClassName")` | `Instance.new("ClassName")` |

| `game.GetService("X")` | `game:GetService("X")` |

| `obj.WaitForChild("X")` | `obj:WaitForChild("X")` |

| `obj.FindFirstChild("X")` | `obj:FindFirstChild("X")` |

| `obj.Clone()` | `obj:Clone()` |

| `obj.Destroy()` | `obj:Destroy()` |



\*\*Method call detection:\*\* The compiler maintains a set of known Roblox methods that use `:` (method call) syntax vs `.` (property access). Any function call on a Roblox instance type that matches a known method name is compiled with `:`.



---



\## Async Handling



\### Promises / async-await



Roblox Luau doesn't have native Promises or async/await. The compiler targets the widely-used `Promise` library by evaera:



```tsx

async function fetchData(url: string): Promise<Data> {

&nbsp; const response = await fetch(url);

&nbsp; return response.json();

}

```



```lua

local Promise = require(ReplicatedStorage.Packages.Promise)



local function fetchData(url: string)

&nbsp;   return Promise.new(function(resolve, reject)

&nbsp;       -- Note: fetch doesn't exist in Roblox. This is illustrative.

&nbsp;       -- Real Roblox network calls use HttpService.

&nbsp;       local response = HttpService:GetAsync(url)

&nbsp;       resolve(HttpService:JSONDecode(response))

&nbsp;   end)

end

```



\*\*Pragmatic approach:\*\* Since `async/await` doesn't map cleanly, the compiler:

1\. Transforms `async function` → function returning a Promise

2\. Transforms `await expr` → `:andThen()` chains (or `:expect()` for simple cases)

3\. Emits a warning suggesting developers review async code manually



For simple await patterns:

```tsx

const data = await fetchData(url);

doSomething(data);

```



```lua

fetchData(url):andThen(function(data)

&nbsp;   doSomething(data)

end)

```



For complex async flows, the compiler wraps in `Promise.new` and chains. This is a lossy transform — developers should review.



---



\## Roblox-Specific Extensions



\### Roblox Types in TypeScript



The compiler recognizes Roblox types used in TypeScript:



```tsx

const color: Color3 = new Color3(1, 0, 0);

const size: UDim2 = new UDim2(1, 0, 0, 50);

const position: Vector3 = new Vector3(0, 10, 0);

```



```lua

local color: Color3 = Color3.new(1, 0, 0)

local size: UDim2 = UDim2.new(1, 0, 0, 50)

local position: Vector3 = Vector3.new(0, 10, 0)

```



Known Roblox constructors: `Color3`, `Color3.fromRGB`, `Color3.fromHex`, `UDim`, `UDim2`, `UDim2.fromScale`, `UDim2.fromOffset`, `Vector2`, `Vector3`, `CFrame`, `BrickColor`, `Enum.\*`, `Instance.new`, `NumberSequence`, `ColorSequence`, `NumberRange`, `Rect`, `Font`, `Font.new`, `Ray`, `Region3`, `TweenInfo`.



\### Event Connections Outside JSX



```tsx

useEffect(() => {

&nbsp; const connection = RunService.Heartbeat.Connect((dt: number) => {

&nbsp;   // update logic

&nbsp; });

&nbsp; return () => connection.Disconnect();

}, \[]);

```



```lua

React.useEffect(function()

&nbsp;   local connection = RunService.Heartbeat:Connect(function(dt: number)

&nbsp;       -- update logic

&nbsp;   end)

&nbsp;   return function()

&nbsp;       connection:Disconnect()

&nbsp;   end

end, {})

```



\### TweenService Integration



For animations (since CSS transitions aren't available):



```tsx

import { TweenService } from "@rbx-services";



function useAnimation(ref: React.RefObject<GuiObject>, props: TweenProps) {

&nbsp; useEffect(() => {

&nbsp;   if (ref.current) {

&nbsp;     const tween = TweenService.Create(

&nbsp;       ref.current,

&nbsp;       new TweenInfo(0.3, Enum.EasingStyle.Quad),

&nbsp;       props

&nbsp;     );

&nbsp;     tween.Play();

&nbsp;   }

&nbsp; }, \[props]);

}

```



```lua

local TweenService = game:GetService("TweenService")



local function useAnimation(ref, tweenProps)

&nbsp;   React.useEffect(function()

&nbsp;       if ref.current then

&nbsp;           local tween = TweenService:Create(

&nbsp;               ref.current,

&nbsp;               TweenInfo.new(0.3, Enum.EasingStyle.Quad),

&nbsp;               tweenProps

&nbsp;           )

&nbsp;           tween:Play()

&nbsp;       end

&nbsp;   end, { tweenProps })

end

```



---



\## Error Handling \& Warnings



\### Warning Categories



| Code | Category | Example |

|---|---|---|

| `unsupported-element` | HTML element has no Roblox mapping | `<table>`, `<form>`, `<select>` |

| `unsupported-event` | Event has no Roblox equivalent | `onDoubleClick`, `onKeyDown` (partial) |

| `unsupported-prop` | HTML prop not mappable | `tabIndex`, `aria-\*`, `data-\*` |

| `text-in-container` | Text node inside a non-text element | `<div>text here</div>` (auto-wrapped) |

| `mixed-children` | Text mixed with elements | `<div>text <span>more</span></div>` |

| `complex-async` | Async pattern may not transform correctly | Nested awaits, try/catch with await |

| `generic-erasure` | TypeScript generic erased to `any` | `function Foo<T>(...)` |

| `implicit-service` | Roblox service auto-imported | `Players.LocalPlayer` without import |

| `lossy-transform` | Transform changes semantics | `e.target.value` → `rbx.Text` |



\### Warning Format



```

warning: Card.tsx:15:5 \[text-in-container] Text "Loading..." inside <div> will be wrapped in TextLabel

warning: Card.tsx:23:9 \[unsupported-event] 'onDoubleClick' has no Roblox equivalent - skipped

warning: Card.tsx:31:3 \[complex-async] Async transform may need manual review

```



---



\## Unsupported Features (Known Gaps)



| TypeScript/React Feature | Reason | Workaround |

|---|---|---|

| Class components | Functional only | Convert to functional |

| `useReducer` | Supported in react-lua | Actually works — compile normally |

| `useSyncExternalStore` | React 18+ | Not in react-lua (React 17) |

| `useTransition` / `useDeferredValue` | React 18+ | Not in react-lua |

| `Suspense` / `lazy` | React 18+ | Not in react-lua |

| `<form>`, `<select>`, `<option>` | No Roblox equivalent | Build custom components |

| CSS-in-JS (styled-components, emotion) | Different paradigm | Use CSS files (Layer 1) |

| `window` / `document` / DOM APIs | Browser-only | Use Roblox APIs |

| `setTimeout` / `setInterval` | Browser APIs | Use `task.delay` / `task.spawn` with loops |

| `fetch` / `XMLHttpRequest` | Browser APIs | Use `HttpService` |

| Regular expressions (full) | Luau patterns differ from regex | Basic patterns work, complex ones warn |

| `Symbol` | No Luau equivalent | Use string keys |

| `WeakMap` / `WeakSet` | Limited Luau support | `setmetatable({}, {\_\_mode = "v"})` |

| `for..in` (object enumeration) | Different semantics | Transforms to `for k, v in` |

| Decorators | Experimental TS feature | Not supported |

| Namespace imports (`import \* as X`) | Partial | Compiles to module table |



---



\## Timer / Task Transforms



| TypeScript | Luau |

|---|---|

| `setTimeout(fn, ms)` | `task.delay(ms / 1000, fn)` |

| `clearTimeout(id)` | `task.cancel(id)` |

| `setInterval(fn, ms)` | Custom loop with `task.delay` |

| `requestAnimationFrame(fn)` | `RunService.RenderStepped:Wait()` or `:Connect()` |

| `Date.now()` | `os.clock() \* 1000` or `tick() \* 1000` |

| `new Date()` | `os.date("\*t")` |



\### setInterval Implementation



```tsx

const id = setInterval(() => update(), 1000);

clearInterval(id);

```



```lua

local \_interval\_running = true

local \_interval\_thread = task.spawn(function()

&nbsp;   while \_interval\_running do

&nbsp;       task.wait(1)

&nbsp;       update()

&nbsp;   end

end)

-- clearInterval equivalent:

\_interval\_running = false

task.cancel(\_interval\_thread)

```



---



\## Full Example



\### Input: `Card.tsx`



```tsx

import React, { useState, useCallback } from "react";

import "./Card.css";



interface CardProps {

&nbsp; title: string;

&nbsp; initialCount?: number;

}



export default function Card({ title, initialCount = 0 }: CardProps) {

&nbsp; const \[count, setCount] = useState(initialCount);



&nbsp; const increment = useCallback(() => {

&nbsp;   setCount(c => c + 1);

&nbsp; }, \[]);



&nbsp; const decrement = useCallback(() => {

&nbsp;   setCount(c => c - 1);

&nbsp; }, \[]);



&nbsp; return (

&nbsp;   <div className="card">

&nbsp;     <h1>{title}</h1>

&nbsp;     <span>Count: {count}</span>

&nbsp;     <div className="button-row">

&nbsp;       <button className="primary" onClick={increment}>

&nbsp;         +

&nbsp;       </button>

&nbsp;       <button className="secondary" onClick={decrement}>

&nbsp;         -

&nbsp;       </button>

&nbsp;     </div>

&nbsp;   </div>

&nbsp; );

}

```



\### Output: `Card.luau`



```lua

-- Auto-generated by rbx-tsx

-- Source: Card.tsx



local React = require(game:GetService("ReplicatedStorage").Packages.React)

local useState = React.useState

local useCallback = React.useCallback



export type CardProps = {

&nbsp;   title: string,

&nbsp;   initialCount: number?,

}



local function Card(props: CardProps)

&nbsp;   local title = props.title

&nbsp;   local initialCount = if props.initialCount ~= nil then props.initialCount else 0



&nbsp;   local count, setCount = useState(initialCount)



&nbsp;   local increment = useCallback(function()

&nbsp;       setCount(function(c) return c + 1 end)

&nbsp;   end, {})



&nbsp;   local decrement = useCallback(function()

&nbsp;       setCount(function(c) return c - 1 end)

&nbsp;   end, {})



&nbsp;   return React.createElement("Frame", {

&nbsp;       \[React.Tag] = "card",

&nbsp;   }, {

&nbsp;       Title = React.createElement("TextLabel", {

&nbsp;           Text = title,

&nbsp;           LayoutOrder = 1,

&nbsp;       }),

&nbsp;       Counter = React.createElement("TextLabel", {

&nbsp;           Text = "Count: " .. tostring(count),

&nbsp;           LayoutOrder = 2,

&nbsp;       }),

&nbsp;       ButtonRow = React.createElement("Frame", {

&nbsp;           \[React.Tag] = "button-row",

&nbsp;           LayoutOrder = 3,

&nbsp;       }, {

&nbsp;           IncrementBtn = React.createElement("TextButton", {

&nbsp;               \[React.Tag] = "primary",

&nbsp;               Text = "+",

&nbsp;               \[React.Event.Activated] = increment,

&nbsp;               LayoutOrder = 1,

&nbsp;           }),

&nbsp;           DecrementBtn = React.createElement("TextButton", {

&nbsp;               \[React.Tag] = "secondary",

&nbsp;               Text = "-",

&nbsp;               \[React.Event.Activated] = decrement,

&nbsp;               LayoutOrder = 2,

&nbsp;           }),

&nbsp;       }),

&nbsp;   })

end



return Card

```



---



\## Layer 1 + Layer 2 Integration



When `--css` is passed, the TSX compiler invokes the CSS compiler for any imported `.css` files and coordinates:



\### Shared Manifest



The CSS compiler can emit a `.manifest.json` alongside its output:



```json

{

&nbsp; "classes": {

&nbsp;   "card": { "overflowScroll": false },

&nbsp;   "scrollable": { "overflowScroll": true },

&nbsp;   "button-row": { "overflowScroll": false }

&nbsp; },

&nbsp; "elementMap": {

&nbsp;   "div": "Frame",

&nbsp;   "span": "TextLabel"

&nbsp; }

}

```



The TSX compiler reads this to know:

\- Which classNames trigger `ScrollingFrame` instead of `Frame`

\- Any other CSS-driven element type overrides



\### StyleSheet Linking



The TSX compiler generates StyleLink setup in the entry point:



```lua

-- In the entry point, after mounting:

local CoreSheet = require(ReplicatedStorage.Styles.CoreSheet)

local styleSheet = CoreSheet()

styleSheet.Parent = ReplicatedStorage



local styleLink = Instance.new("StyleLink")

styleLink.StyleSheet = styleSheet

styleLink.Parent = screenGui

```



This connects the CSS compiler's StyleSheet to the react-lua component tree, so all `React.Tag` values match the StyleRule selectors.



---



\## Implementation Notes



\### Recommended Parser



Use the \*\*TypeScript Compiler API\*\* (`typescript` npm package) for parsing TSX. It provides:

\- Full TSX/JSX support

\- Type information (needed for smart transforms like `??` optimization)

\- Source position tracking for warnings



Alternative: \*\*SWC\*\* (Rust-based, faster, but less type info available). Good for a future performance optimization pass.



\### Architecture



```

TSX Source

&nbsp;   |

&nbsp;   v

+-------------------+

|  TS Parser         |  (TypeScript compiler API / SWC)

|  -> TS AST         |

+---------+---------+

&nbsp;         |

&nbsp;         v

+-------------------+

|  JSX Transform    |  HTML elements -> React.createElement with Roblox classes

+---------+---------+

&nbsp;         |

&nbsp;         v

+-------------------+

|  Props Transform  |  HTML props -> Roblox props, events -> React.Event

+---------+---------+

&nbsp;         |

&nbsp;         v

+-------------------+

|  Text Extraction  |  Text children -> Text property, interpolation -> concat

+---------+---------+

&nbsp;         |

&nbsp;         v

+-------------------+

|  Language Transform|  TS constructs -> Luau equivalents

+---------+---------+

&nbsp;         |

&nbsp;         v

+-------------------+

|  Module Transform |  imports/exports -> require/return

+---------+---------+

&nbsp;         |

&nbsp;         v

+-------------------+

|  Luau AST         |  Intermediate Luau representation

+---------+---------+

&nbsp;         |

&nbsp;         v

+-------------------+

|  Luau Codegen     |  Pretty-printed Luau source

+-------------------+

```



\### Key Design Decision: AST-to-AST vs String Templates



\*\*Recommended: AST-to-AST.\*\* Build a Luau AST intermediate representation rather than concatenating strings. This enables:

\- Proper indentation and formatting

\- Dead code elimination

\- Import deduplication

\- Future optimizations



The Luau AST can be simple — it's an output-only format:



```typescript

type LuauNode =

&nbsp; | { type: "local"; name: string; value?: LuauExpr; typeAnnotation?: string }

&nbsp; | { type: "assignment"; target: string; value: LuauExpr }

&nbsp; | { type: "return"; value: LuauExpr }

&nbsp; | { type: "function"; name?: string; params: LuauParam\[]; body: LuauNode\[]; returnType?: string }

&nbsp; | { type: "if"; condition: LuauExpr; then: LuauNode\[]; elseIf?: Array<{ condition: LuauExpr; body: LuauNode\[] }>; else?: LuauNode\[] }

&nbsp; | { type: "for-numeric"; var: string; start: LuauExpr; end: LuauExpr; step?: LuauExpr; body: LuauNode\[] }

&nbsp; | { type: "for-in"; vars: string\[]; iterators: LuauExpr\[]; body: LuauNode\[] }

&nbsp; | { type: "expression-statement"; expr: LuauExpr }

&nbsp; | { type: "do-block"; body: LuauNode\[] }

&nbsp; | { type: "comment"; text: string }

&nbsp; | { type: "type-alias"; name: string; exported: boolean; definition: string }

&nbsp; // ... etc



type LuauExpr =

&nbsp; | { type: "call"; callee: LuauExpr; args: LuauExpr\[]; method?: boolean }

&nbsp; | { type: "index"; object: LuauExpr; property: string }

&nbsp; | { type: "bracket-index"; object: LuauExpr; index: LuauExpr }

&nbsp; | { type: "identifier"; name: string }

&nbsp; | { type: "string"; value: string }

&nbsp; | { type: "number"; value: number }

&nbsp; | { type: "boolean"; value: boolean }

&nbsp; | { type: "nil" }

&nbsp; | { type: "table"; entries: Array<{ key?: LuauExpr; value: LuauExpr }> }

&nbsp; | { type: "binary"; left: LuauExpr; op: string; right: LuauExpr }

&nbsp; | { type: "unary"; op: string; operand: LuauExpr }

&nbsp; | { type: "if-expr"; condition: LuauExpr; then: LuauExpr; else: LuauExpr }

&nbsp; | { type: "function-expr"; params: LuauParam\[]; body: LuauNode\[] }

&nbsp; | { type: "concat"; parts: LuauExpr\[] }

&nbsp; | { type: "raw"; code: string }  // Escape hatch

&nbsp; // ... etc



type LuauParam = { name: string; type?: string }

```



---



\## Test Strategy



\### Unit Tests per Transform



Each transform phase should have isolated tests:



1\. \*\*Element mapping\*\*: `<div>` → `"Frame"`, `<button>` → `"TextButton"`, etc.

2\. \*\*Text extraction\*\*: `<span>hello {x}</span>` → `Text = "hello " .. tostring(x)`

3\. \*\*Event mapping\*\*: `onClick` → `React.Event.Activated`

4\. \*\*Props mapping\*\*: `className` → `React.Tag`, `id` → `Name`

5\. \*\*Hook transforms\*\*: `useState`, `useEffect`, etc.

6\. \*\*Type transforms\*\*: TS types → Luau types

7\. \*\*Module transforms\*\*: imports → requires, exports → returns

8\. \*\*Language transforms\*\*: ternary, nullish, spread, destructuring



\### Integration Tests



Full component files → expected Luau output. Start with:



1\. Simple stateless component

2\. Component with useState

3\. Component with useEffect + cleanup

4\. Component with event handlers

5\. Component with conditional rendering

6\. Component with list rendering (map)

7\. Component with context

8\. Component with refs

9\. Entry point (mounting)

10\. Custom hook module

11\. Multi-file project with imports



\### Snapshot Tests



For each fixture TSX file, maintain a `.expected.luau` snapshot. The test runner compiles the TSX and diffs against the snapshot.



---



\## Version



Spec version: \*\*0.1.0\*\* — Initial draft

