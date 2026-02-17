/**
 * Roblox methods that use : (method call) syntax instead of . (property access).
 * When we see `obj.MethodName(args)` in TS, we compile to `obj:MethodName(args)` in Luau.
 */
export const ROBLOX_METHODS = new Set([
  // Instance
  "Clone",
  "Destroy",
  "FindFirstAncestor",
  "FindFirstAncestorOfClass",
  "FindFirstAncestorWhichIsA",
  "FindFirstChild",
  "FindFirstChildOfClass",
  "FindFirstChildWhichIsA",
  "FindFirstDescendant",
  "GetAttribute",
  "GetAttributeChangedSignal",
  "GetAttributes",
  "GetChildren",
  "GetDebugId",
  "GetDescendants",
  "GetFullName",
  "GetPropertyChangedSignal",
  "GetTags",
  "HasTag",
  "IsA",
  "IsAncestorOf",
  "IsDescendantOf",
  "SetAttribute",
  "WaitForChild",
  "AddTag",
  "RemoveTag",

  // Services
  "GetService",

  // RBXScriptSignal
  "Connect",
  "ConnectParallel",
  "Once",
  "Wait",
  "Disconnect",

  // TweenService
  "Create",

  // HttpService
  "GetAsync",
  "PostAsync",
  "RequestAsync",
  "JSONEncode",
  "JSONDecode",
  "UrlEncode",
  "GenerateGUID",

  // Players
  "GetPlayerByUserId",
  "GetPlayerFromCharacter",
  "GetPlayers",

  // CollectionService
  "GetTagged",
  "GetAllTags",

  // UserInputService
  "GetMouseLocation",
  "IsKeyDown",
  "IsMouseButtonPressed",

  // ReactRoblox
  "render",
  "unmount",

  // General Roblox patterns
  "Play",
  "Stop",
  "Pause",
  "Resume",
  "Cancel",
]);
