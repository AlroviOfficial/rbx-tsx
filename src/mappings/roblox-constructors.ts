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
 * Roblox types that have static factory methods (e.g., Color3.fromRGB).
 * These are NOT called with `new` but should still use `.` syntax.
 */
export const ROBLOX_STATIC_METHODS: Record<string, Set<string>> = {
  Color3: new Set(["new", "fromRGB", "fromHSV", "fromHex"]),
  UDim2: new Set(["new", "fromScale", "fromOffset"]),
  Vector2: new Set(["new"]),
  Vector3: new Set(["new"]),
  CFrame: new Set([
    "new",
    "fromEulerAnglesXYZ",
    "fromEulerAnglesYXZ",
    "lookAt",
    "fromAxisAngle",
    "fromOrientation",
    "fromMatrix",
    "identity",
  ]),
  Instance: new Set(["new"]),
  TweenInfo: new Set(["new"]),
  Font: new Set(["new"]),
  BrickColor: new Set([
    "new",
    "random",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "White",
    "Black",
  ]),
};
