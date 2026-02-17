/** Known Roblox GuiObject properties that should be passed through directly */
export const ROBLOX_PROPERTIES = new Set([
  // GuiObject
  "Active",
  "AnchorPoint",
  "AutomaticSize",
  "BackgroundColor3",
  "BackgroundTransparency",
  "BorderColor3",
  "BorderMode",
  "BorderSizePixel",
  "ClipsDescendants",
  "LayoutOrder",
  "Name",
  "Position",
  "Rotation",
  "Selectable",
  "SelectionBehaviorDown",
  "SelectionBehaviorLeft",
  "SelectionBehaviorRight",
  "SelectionBehaviorUp",
  "SelectionGroup",
  "SelectionImageObject",
  "SelectionOrder",
  "Size",
  "SizeConstraint",
  "Visible",
  "ZIndex",

  // TextLabel / TextButton / TextBox
  "Font",
  "FontFace",
  "LineHeight",
  "MaxVisibleGraphemes",
  "RichText",
  "Text",
  "TextColor3",
  "TextScaled",
  "TextSize",
  "TextStrokeColor3",
  "TextStrokeTransparency",
  "TextTransparency",
  "TextTruncate",
  "TextWrapped",
  "TextXAlignment",
  "TextYAlignment",

  // TextBox
  "ClearTextOnFocus",
  "CursorPosition",
  "MultiLine",
  "PlaceholderColor3",
  "PlaceholderText",
  "SelectionStart",
  "ShowNativeInput",
  "TextEditable",

  // ImageLabel / ImageButton
  "Image",
  "ImageColor3",
  "ImageRectOffset",
  "ImageRectSize",
  "ImageTransparency",
  "ResampleMode",
  "ScaleType",
  "SliceCenter",
  "SliceScale",
  "TileSize",

  // ScrollingFrame
  "AutomaticCanvasSize",
  "BottomImage",
  "CanvasPosition",
  "CanvasSize",
  "ElasticBehavior",
  "HorizontalScrollBarInset",
  "MidImage",
  "ScrollBarImageColor3",
  "ScrollBarImageTransparency",
  "ScrollBarThickness",
  "ScrollingDirection",
  "ScrollingEnabled",
  "TopImage",
  "VerticalScrollBarInset",
  "VerticalScrollBarPosition",

  // ViewportFrame
  "Ambient",
  "CurrentCamera",
  "ImageColor3",
  "ImageTransparency",
  "LightColor",
  "LightDirection",

  // VideoFrame
  "Looped",
  "Playing",
  "TimePosition",
  "Video",
  "Volume",

  // CanvasGroup
  "GroupColor3",
  "GroupTransparency",

  // UICorner
  "CornerRadius",

  // UIStroke
  "ApplyStrokeMode",
  "Color",
  "Thickness",
  "Transparency",

  // UIPadding
  "PaddingBottom",
  "PaddingLeft",
  "PaddingRight",
  "PaddingTop",

  // UIListLayout / UIGridLayout
  "FillDirection",
  "HorizontalAlignment",
  "HorizontalFlex",
  "ItemLineAlignment",
  "Padding",
  "SortOrder",
  "VerticalAlignment",
  "VerticalFlex",
  "Wraps",

  // UIFlexItem
  "FlexMode",
  "GrowRatio",
  "ItemLineAlignment",
  "ShrinkRatio",

  // UIGradient
  "Offset",
  // Color (already above)
  // Rotation (already above)
  // Transparency (already above)

  // UIAspectRatioConstraint
  "AspectRatio",
  "AspectType",
  "DominantAxis",

  // UISizeConstraint
  "MaxSize",
  "MinSize",

  // UIScale
  "Scale",

  // General Instance
  "Parent",
  "Archivable",
]);
