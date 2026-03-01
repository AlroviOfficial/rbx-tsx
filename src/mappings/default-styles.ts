import type { LuauExpression, LuauTableEntry } from "../ast/luau-ast.ts";
import { str, num, call, index, ident, table, raw } from "../ast/luau-ast.ts";

/** Default transparent block-level container props */
const BLOCK_CONTAINER_DEFAULTS: LuauTableEntry[] = [
  { key: str("BackgroundTransparency"), value: num(1) },
  { key: str("AutomaticSize"), value: raw("Enum.AutomaticSize.Y") },
  { key: str("Size"), value: raw("UDim2.new(1, 0, 0, 0)") },
];

/** Helper to build React.createElement("ClassName", { props }) */
function createElement(
  className: string,
  props: LuauTableEntry[]
): LuauExpression {
  return call(index(ident("React"), "createElement"), [
    str(className),
    table(props),
  ]);
}

/** Vertical UIListLayout child entry */
const VERTICAL_LAYOUT: LuauTableEntry = {
  key: str("_layout"),
  value: createElement("UIListLayout", [
    { key: str("SortOrder"), value: raw("Enum.SortOrder.LayoutOrder") },
    {
      key: str("FillDirection"),
      value: raw("Enum.FillDirection.Vertical"),
    },
  ]),
};

/** Horizontal UIListLayout child entry */
const HORIZONTAL_LAYOUT: LuauTableEntry = {
  key: str("_layout"),
  value: createElement("UIListLayout", [
    { key: str("SortOrder"), value: raw("Enum.SortOrder.LayoutOrder") },
    {
      key: str("FillDirection"),
      value: raw("Enum.FillDirection.Horizontal"),
    },
  ]),
};

/**
 * Returns default Roblox properties for an HTML element.
 * User-provided props override these defaults.
 */
export function getDefaultProps(htmlTag: string): LuauTableEntry[] {
  switch (htmlTag) {
    // Semantic containers: transparent block-level
    case "nav":
    case "header":
    case "footer":
    case "main":
    case "section":
    case "article":
    case "aside":
    case "form":
    case "details":
    case "optgroup":
      return [...BLOCK_CONTAINER_DEFAULTS];

    // Lists: transparent block-level (children laid out by UIListLayout)
    case "ul":
    case "ol":
    case "select":
      return [...BLOCK_CONTAINER_DEFAULTS];

    // List items: transparent, auto-height, full-width
    case "li":
      return [...BLOCK_CONTAINER_DEFAULTS];

    // Table containers: transparent block-level
    case "table":
    case "thead":
    case "tbody":
    case "tfoot":
      return [...BLOCK_CONTAINER_DEFAULTS];

    // Table row: transparent, horizontal layout
    case "tr":
      return [
        { key: str("BackgroundTransparency"), value: num(1) },
        { key: str("AutomaticSize"), value: raw("Enum.AutomaticSize.Y") },
        { key: str("Size"), value: raw("UDim2.new(1, 0, 0, 0)") },
      ];

    // Table cells: auto-sized, transparent
    case "td":
      return [
        { key: str("AutomaticSize"), value: raw("Enum.AutomaticSize.XY") },
        { key: str("BackgroundTransparency"), value: num(1) },
      ];

    // Table header cells: auto-sized, transparent, bold
    case "th":
      return [
        { key: str("AutomaticSize"), value: raw("Enum.AutomaticSize.XY") },
        { key: str("BackgroundTransparency"), value: num(1) },
        {
          key: str("FontFace"),
          value: raw(
            'Font.new("rbxasset://fonts/families/GothamSSm.json", Enum.FontWeight.Bold)'
          ),
        },
      ];

    // Dialog: centered overlay
    case "dialog":
      return [
        { key: str("AnchorPoint"), value: raw("Vector2.new(0.5, 0.5)") },
        { key: str("Position"), value: raw("UDim2.fromScale(0.5, 0.5)") },
        { key: str("AutomaticSize"), value: raw("Enum.AutomaticSize.XY") },
      ];

    default:
      return [];
  }
}

/**
 * Returns default children to auto-inject for an HTML element.
 * Prepended before user-provided children.
 */
export function getDefaultChildren(htmlTag: string): LuauTableEntry[] {
  switch (htmlTag) {
    // Lists: vertical layout
    case "ul":
    case "ol":
    case "select":
      return [VERTICAL_LAYOUT];

    // Table + sections: vertical layout
    case "table":
    case "thead":
    case "tbody":
    case "tfoot":
      return [VERTICAL_LAYOUT];

    // Table rows: horizontal layout
    case "tr":
      return [HORIZONTAL_LAYOUT];

    default:
      return [];
  }
}
