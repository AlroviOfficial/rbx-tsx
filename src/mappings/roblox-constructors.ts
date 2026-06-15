/**
 * Known Roblox constructor types.
 * `new X(args)` in TS compiles to `X.new(args)` in Luau for these types.
 */
export const ROBLOX_CONSTRUCTORS = new Set([
  "Color3",
  "UDim",
  "UDim2",
  "Vector2",
  "Vector3",
  "CFrame",
  "BrickColor",
  "NumberSequence",
  "NumberSequenceKeypoint",
  "ColorSequence",
  "ColorSequenceKeypoint",
  "NumberRange",
  "Rect",
  "Font",
  "Ray",
  "Region3",
  "TweenInfo",
  "Instance",
  "OverlapParams",
  "RaycastParams",
  "DockWidgetPluginGuiInfo",
  "PhysicalProperties",
  "PathWaypoint",
  "Random",
]);

/**
 * Math operator macros for Roblox value types. A method call like
 * `a.add(b)` compiles to the Luau binary expression `a + b`. This mirrors
 * roblox-ts, since TypeScript has no operator overloading but Luau's value
 * types (Vector3, CFrame, …) overload the arithmetic operators natively.
 */
export const ROBLOX_MATH_OPERATORS: Record<string, string> = {
  add: "+",
  sub: "-",
  mul: "*",
  div: "/",
  idiv: "//",
};
