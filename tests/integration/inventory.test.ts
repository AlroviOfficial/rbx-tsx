import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";
import { readFileSync } from "fs";
import { join } from "path";

function compileFixture(name: string) {
  const path = join(import.meta.dir, "..", "fixtures", name);
  const source = readFileSync(path, "utf-8");
  return compile(source, name, { warnLevel: "none" });
}

const result = compileFixture("Inventory.tsx");
const luau = result.luau;

// ── Preamble: Imports & Requires ──

describe("Inventory: imports and requires", () => {
  test("compiles without hard errors", () => {
    expect(luau).toBeDefined();
    expect(luau.length).toBeGreaterThan(0);
  });

  test("requires React via GetService", () => {
    expect(luau).toContain(
      'local React = require(game:GetService("ReplicatedStorage").Packages.React)'
    );
  });

  test("imports all seven React hooks as locals", () => {
    expect(luau).toContain("local useState = React.useState");
    expect(luau).toContain("local useEffect = React.useEffect");
    expect(luau).toContain("local useCallback = React.useCallback");
    expect(luau).toContain("local useMemo = React.useMemo");
    expect(luau).toContain("local useRef = React.useRef");
    expect(luau).toContain("local createContext = React.createContext");
    expect(luau).toContain("local useContext = React.useContext");
  });

  test("imports Roblox services via GetService", () => {
    expect(luau).toContain('local Players = game:GetService("Players")');
    expect(luau).toContain('local RunService = game:GetService("RunService")');
  });
});

// ── Helper Functions ──

describe("Inventory: auto-generated helper functions", () => {
  test("generates _arrayFilter helper", () => {
    expect(luau).toContain("local function _arrayFilter(t, fn)");
    expect(luau).toContain("table.insert(result, v)");
  });

  test("generates _arrayFind helper", () => {
    expect(luau).toContain("local function _arrayFind(t, fn)");
  });

  test("generates _arrayMap helper", () => {
    expect(luau).toContain("local function _arrayMap(t, fn)");
  });

  test("generates _merge helper for object spread", () => {
    expect(luau).toContain("local function _merge(...: any)");
  });
});

// ── Type Declarations ──

describe("Inventory: type system", () => {
  test("compiles interface with optional fields", () => {
    expect(luau).toContain("type ItemStats = {");
    expect(luau).toContain("damage: number?,");
    expect(luau).toContain("defense: number?,");
    expect(luau).toContain("speed: number?,");
  });

  test("compiles string union type alias", () => {
    expect(luau).toContain(
      'type Rarity = "common" | "uncommon" | "rare" | "legendary"'
    );
  });

  test("compiles complex interface referencing other types", () => {
    expect(luau).toContain("type Item = {");
    expect(luau).toContain("rarity: Rarity,");
    expect(luau).toContain("stats: ItemStats?,");
    expect(luau).toContain("equipped: boolean?,");
  });

  test("compiles interface with function-typed fields", () => {
    expect(luau).toContain("type TooltipAPI = {");
    expect(luau).toContain("show: ((string) -> ()),");
    expect(luau).toContain("hide: (() -> ()),");
  });

  test("compiles Record type to index signature", () => {
    expect(luau).toContain("local RARITY_ORDER: { [string]: number }");
  });

  test("compiles inline prop type", () => {
    expect(luau).toContain(
      "local function Inventory(props: { playerId: number })"
    );
  });
});

// ── Constants & Context ──

describe("Inventory: constants and context", () => {
  test("compiles Record literal as table", () => {
    expect(luau).toContain("common = 0, uncommon = 1, rare = 2, legendary = 3");
  });

  test("compiles numeric constant", () => {
    expect(luau).toContain("local MAX_EQUIPPED = 3");
  });

  test("compiles createContext call", () => {
    expect(luau).toContain("local TooltipContext = createContext(nil)");
  });
});

// ── Sub-component: ItemSlot ──

describe("Inventory: ItemSlot sub-component", () => {
  test("declares ItemSlot as local function with typed props", () => {
    expect(luau).toContain(
      "local function ItemSlot(props: ItemSlotProps)"
    );
  });

  test("destructures props from props table", () => {
    expect(luau).toContain("local item = props.item");
    expect(luau).toContain("local isSelected = props.isSelected");
    expect(luau).toContain("local onSelect = props.onSelect");
    expect(luau).toContain("local onEquip = props.onEquip");
  });

  test("calls useContext with TooltipContext", () => {
    expect(luau).toContain("local tooltip = useContext(TooltipContext)");
  });

  test("compiles useCallback with dependency array", () => {
    expect(luau).toContain("local handleClick = useCallback(function()");
    expect(luau).toContain("end, { item.id, onSelect })");
  });

  test("compiles nullish coalescing in arithmetic", () => {
    // (item.stats.damage ?? 0) should produce nil-check pattern
    expect(luau).toContain("item.stats.damage ~= nil then item.stats.damage else 0");
  });

  test("maps button to TextButton", () => {
    expect(luau).toContain('React.createElement("TextButton"');
  });

  test("compiles ternary className as if-expression", () => {
    expect(luau).toContain(
      '[React.Tag] = if isSelected then "item-slot selected" else "item-slot"'
    );
  });

  test("passes onClick handler directly (no over-wrapping)", () => {
    expect(luau).toContain("[React.Event.Activated] = handleClick");
  });

  test("compiles && conditional children", () => {
    expect(luau).toContain("item.equipped and React.createElement");
    expect(luau).toContain("item.quantity > 1 and React.createElement");
  });
});

// ── Sub-component: DetailPanel ──

describe("Inventory: DetailPanel sub-component", () => {
  test("declares DetailPanel with nullable item prop", () => {
    expect(luau).toContain("type DetailPanelProps = {");
    expect(luau).toContain("item: Item?,");
  });

  test("compiles early return with null check", () => {
    expect(luau).toContain("if not item then");
    // The early return should produce a createElement call
    expect(luau).toContain(
      'return React.createElement("Frame", { [React.Tag] = "detail-panel empty" }'
    );
  });

  test("extracts static text children as Text prop", () => {
    expect(luau).toContain('Text = "Select an item to view details"');
    expect(luau).toContain('Text = "Drop"');
    expect(luau).toContain('Text = "E"');
  });

  test("compiles ternary text content in children", () => {
    expect(luau).toContain(
      'if item.equipped then "Unequip" else "Equip"'
    );
  });

  test("derives unique child keys from className", () => {
    expect(luau).toContain("EquipBtnButton = React.createElement");
    expect(luau).toContain("DropBtnButton = React.createElement");
  });

  test("generates div className keys with PascalCase", () => {
    expect(luau).toContain("ActionsDiv = React.createElement");
  });

  test("compiles nested && conditional rendering", () => {
    expect(luau).toContain(
      "item.stats and React.createElement"
    );
    expect(luau).toContain(
      "item.stats.damage ~= nil and React.createElement"
    );
  });
});

// ── Main Component: Inventory ──

describe("Inventory: main component state and hooks", () => {
  test("compiles multiple useState calls", () => {
    expect(luau).toContain("local items, setItems = useState(");
    expect(luau).toContain("local selectedId, setSelectedId = useState(nil)");
    expect(luau).toContain('local filter, setFilter = useState("")');
    expect(luau).toContain('local sortBy, setSortBy = useState("name")');
    expect(luau).toContain("local tooltipText, setTooltipText = useState(nil)");
  });

  test("compiles useRef", () => {
    expect(luau).toContain("local containerRef = useRef(nil)");
  });

  test("compiles useEffect with cleanup return", () => {
    expect(luau).toContain("useEffect(function()");
    expect(luau).toContain("return function()");
  });

  test("calls Roblox methods with colon syntax", () => {
    expect(luau).toContain("Players:GetPlayerByUserId(playerId)");
    expect(luau).toContain("RunService.Heartbeat:Connect(");
    expect(luau).toContain("conn:Disconnect()");
  });

  test("compiles useMemo for computed values", () => {
    expect(luau).toContain("local displayItems = useMemo(function()");
    expect(luau).toContain("local selectedItem = useMemo(function()");
    expect(luau).toContain("local equippedCount = useMemo(function()");
  });

  test("uses _arrayFilter inside useMemo", () => {
    expect(luau).toContain("_arrayFilter(items, function(item)");
  });

  test("uses _arrayFind for item lookup", () => {
    expect(luau).toContain("_arrayFind(items, function(item)");
    expect(luau).toContain("item.id == selectedId");
  });

  test("compiles string method toLowerCase to string.lower", () => {
    expect(luau).toContain("string.lower(item.name)");
    expect(luau).toContain("string.lower(filter)");
  });

  test("compiles string .includes() to string.find with plain flag", () => {
    // string.includes() should use string.find, not table.find
    expect(luau).toContain("string.find(string.lower(item.name), string.lower(filter), 1, true)");
    expect(luau).toContain("~= nil");
  });
});

describe("Inventory: state updater patterns", () => {
  test("compiles functional setState with map + spread", () => {
    // { ...item, equipped: !item.equipped } → _merge(item, { equipped = not item.equipped })
    expect(luau).toContain("_merge(item, { equipped = not item.equipped })");
  });

  test("compiles functional setState with filter", () => {
    expect(luau).toContain(
      "_arrayFilter(prev, function(item) return item.id ~= id end)"
    );
  });

  test("compiles map inside setState updater", () => {
    expect(luau).toContain("_arrayMap(prev, function(item)");
  });
});

// ── JSX Structure ──

describe("Inventory: JSX element mapping and structure", () => {
  test("uses dot notation for React.Tag", () => {
    expect(luau).toContain("[React.Tag]");
    expect(luau).not.toContain('React["Tag"]');
  });

  test("uses dot notation for React.Event.Activated", () => {
    expect(luau).toContain("[React.Event.Activated]");
    expect(luau).not.toContain('React.Event["Activated"]');
  });

  test("uses dot notation for React.Change.Text", () => {
    expect(luau).toContain("[React.Change.Text]");
    expect(luau).not.toContain('React.Change["Text"]');
  });

  test("maps div to Frame", () => {
    expect(luau).toContain('React.createElement("Frame"');
  });

  test("maps h1 to TextLabel", () => {
    expect(luau).toContain('React.createElement("TextLabel"');
  });

  test("maps button to TextButton", () => {
    expect(luau).toContain('React.createElement("TextButton"');
  });

  test("maps input to TextBox", () => {
    expect(luau).toContain('React.createElement("TextBox"');
  });

  test("passes ref prop through", () => {
    expect(luau).toContain("ref = containerRef");
  });

  test("generates className-derived child keys", () => {
    // <div className="inventory-header"> → InventoryHeaderDiv
    expect(luau).toContain("InventoryHeaderDiv = React.createElement");
    // <div className="search-bar"> → SearchBarDiv
    expect(luau).toContain("SearchBarDiv = React.createElement");
    // <div className="sort-controls"> → SortControlsDiv
    expect(luau).toContain("SortControlsDiv = React.createElement");
    // <div className="inventory-body"> → InventoryBodyDiv
    expect(luau).toContain("InventoryBodyDiv = React.createElement");
    // <div className="item-grid"> → ItemGridDiv
    expect(luau).toContain("ItemGridDiv = React.createElement");
  });

  test("auto-increments keys for duplicate tag names without className", () => {
    // Three <button> siblings with different classNames already get unique keys
    // but buttons without static classNames would get Button, Button2, Button3
    expect(luau).toContain("Button = React.createElement");
    expect(luau).toContain("Button2 = React.createElement");
    expect(luau).toContain("Button3 = React.createElement");
  });

  test("extracts static text as Text prop on text elements", () => {
    expect(luau).toContain('Text = "Inventory"');
    expect(luau).toContain('Text = "Name"');
    expect(luau).toContain('Text = "Rarity"');
    expect(luau).toContain('Text = "Qty"');
  });
});

// ── Component Rendering ──

describe("Inventory: component instantiation", () => {
  test("renders sub-components by identifier", () => {
    expect(luau).toContain("React.createElement(ItemSlot,");
    expect(luau).toContain("React.createElement(DetailPanel,");
  });

  test("passes callback props through to components", () => {
    expect(luau).toContain("onSelect = handleSelect");
    expect(luau).toContain("onEquip = handleEquip");
    expect(luau).toContain("onDrop = handleDrop");
  });

  test("renders Context.Provider as component", () => {
    expect(luau).toContain(
      "React.createElement(TooltipContext.Provider, { value = tooltipCtx }"
    );
  });

  test("compiles .map() with key into for-in loop", () => {
    expect(luau).toContain("for _idx, item in displayItems do");
    expect(luau).toContain("_map_result[item.id] = React.createElement(ItemSlot");
  });

  test("uses React.createElement(React.Fragment) for map results", () => {
    expect(luau).toContain("return React.createElement(React.Fragment, _map_result)");
  });

  test("compiles ternary conditional rendering in children", () => {
    expect(luau).toContain("#displayItems > 0 then React.createElement(React.Fragment,");
    expect(luau).toContain('else React.createElement("TextLabel"');
  });

  test("compiles && conditional at top level of children", () => {
    expect(luau).toContain(
      'tooltipText and React.createElement("Frame"'
    );
    expect(luau).toContain(
      "not canEquipMore and React.createElement"
    );
  });
});

// ── Template Literals & String Operations ──

describe("Inventory: template literals and strings", () => {
  test("compiles template literal to concatenation", () => {
    // `${items.length} items | ${equippedCount} equipped`
    expect(luau).toContain(
      'tostring(#items) .. " items | " .. tostring(equippedCount) .. " equipped"'
    );
  });

  test("compiles useMemo returning object literal", () => {
    expect(luau).toContain(
      "show = function(text: string) return setTooltipText(text) end"
    );
    expect(luau).toContain(
      "hide = function() return setTooltipText(nil) end"
    );
  });
});

// ── Event Handlers ──

describe("Inventory: event handler transforms", () => {
  test("onClick with direct identifier passes through", () => {
    expect(luau).toContain("[React.Event.Activated] = handleClick");
    expect(luau).toContain("[React.Event.Activated] = handleEquip");
    expect(luau).toContain("[React.Event.Activated] = handleDrop");
  });

  test("onClick with inline arrow compiles to function expression", () => {
    // onClick={() => setSortBy("name")} → function() return setSortBy("name") end
    expect(luau).toContain(
      '[React.Event.Activated] = function() return setSortBy("name") end'
    );
  });

  test("onChange maps to React.Change.Text", () => {
    expect(luau).toContain("[React.Change.Text] = function(rbx)");
  });

  test("ternary in className prop compiles to if-expression", () => {
    expect(luau).toContain(
      'if sortBy == "name" then "sort-btn active" else "sort-btn"'
    );
  });
});

// ── Regression: sort comparators preserved ──

describe("Inventory: sort comparators", () => {
  test("converts ternary comparator to boolean (name sort)", () => {
    // (a, b) => a.name > b.name ? 1 : -1  →  function(a, b) return a.name < b.name end
    expect(luau).toContain("table.sort(_s, function(a, b) return a.name < b.name end)");
  });

  test("converts subtraction comparator to boolean (rarity sort)", () => {
    // (a, b) => (RARITY_ORDER[a.rarity] ?? 0) - (RARITY_ORDER[b.rarity] ?? 0)
    // →  function(a, b) return (...) < (...) end
    expect(luau).toContain("RARITY_ORDER[a.rarity]");
    expect(luau).toContain("RARITY_ORDER[b.rarity]");
    // The subtraction is replaced with <
    expect(luau).not.toMatch(/RARITY_ORDER\[a\.rarity\].*-.*RARITY_ORDER\[b\.rarity\]/);
  });

  test("converts subtraction comparator to boolean (quantity sort)", () => {
    // (a, b) => b.quantity - a.quantity  →  function(a, b) return b.quantity < a.quantity end
    expect(luau).toContain("b.quantity < a.quantity");
    expect(luau).not.toContain("b.quantity - a.quantity");
  });

  test("sort clones the array before sorting", () => {
    expect(luau).toContain("table.clone(result)");
  });
});

// ── Regression: if-expression precedence ──

describe("Inventory: if-expression precedence in binary ops", () => {
  test("parenthesizes if-expressions inside addition", () => {
    // Each ?? 0 becomes (if x ~= nil then x else 0), and they're added together
    expect(luau).toContain(
      "(if item.stats.damage ~= nil then item.stats.damage else 0) + (if item.stats.defense ~= nil then item.stats.defense else 0)"
    );
  });
});

// ── Regression: string.find for string includes ──

describe("Inventory: string includes routing", () => {
  test("uses string.find (not table.find) for string receiver", () => {
    expect(luau).toContain("string.find(");
    // Should NOT use table.find for this string includes call
    expect(luau).not.toMatch(/table\.find\(string\.lower/);
  });

  test("passes plain=true flag to string.find", () => {
    expect(luau).toContain(", 1, true)");
  });
});

// ── Regression: e.target.value in standalone callbacks ──

describe("Inventory: e.target.value transform", () => {
  test("collapses e.target.value to just the parameter", () => {
    // The standalone callback (e) => setFilter(e.target.value) should compile
    // to function(e) setFilter(e) end — not setFilter(e.target.value)
    expect(luau).toContain("setFilter(e)");
    expect(luau).not.toContain("e.target.value");
  });
});

// ── Regression: property access recognized as text ──

describe("Inventory: property access text children", () => {
  test("extracts property access as Text prop", () => {
    expect(luau).toContain("Text = tostring(item.name)");
    expect(luau).toContain("Text = tostring(item.rarity)");
  });

  test("concatenates mixed text + property access", () => {
    expect(luau).toContain('Text = "DMG: " .. tostring(item.stats.damage)');
    expect(luau).toContain('Text = "DEF: " .. tostring(item.stats.defense)');
    expect(luau).toContain('Text = "SPD: " .. tostring(item.stats.speed)');
  });

  test("no mixed-children warnings for text elements", () => {
    // With property access now recognized as text, these should not produce warnings
    const withWarnings = compile(
      readFileSync(join(import.meta.dir, "..", "fixtures", "Inventory.tsx"), "utf-8"),
      "Inventory.tsx"
    );
    const mixedChildrenWarnings = withWarnings.warnings.getWarnings().filter(
      (w) => w.code === "mixed-children"
    );
    expect(mixedChildrenWarnings.length).toBe(0);
  });
});

// ── Regression: .map() IIFE is actually called ──

describe("Inventory: map IIFE invocation", () => {
  test("map loop function is invoked (IIFE, not bare function)", () => {
    // Should contain end)() — the function is called: (function() ... end)()
    expect(luau).toContain("end)()");
  });
});

// ── Regression: value prop → Text on TextBox ──

describe("Inventory: value prop on TextBox", () => {
  test("maps value prop to Text on TextBox", () => {
    // <input value={filter} /> should produce Text = filter, not value = filter
    expect(luau).toContain("Text = filter");
    expect(luau).not.toMatch(/value = filter/);
  });
});

// ── Regression: component on* props pass through ──

describe("Inventory: component callback props", () => {
  test("on* props on components are not treated as DOM events", () => {
    // onSelect, onEquip, onDrop should pass through as regular props on components
    expect(luau).toContain("onSelect = handleSelect");
    expect(luau).toContain("onEquip = handleEquip");
    expect(luau).toContain("onDrop = handleDrop");
  });
});

// ── Regression: ?? null optimization ──

describe("Inventory: nullish coalescing with null", () => {
  test("x ?? null does not produce double evaluation", () => {
    // items.find(...) ?? null should NOT produce:
    //   if _arrayFind(...) ~= nil then _arrayFind(...) else nil
    // Instead it should just produce _arrayFind(...) directly
    expect(luau).not.toMatch(/_arrayFind\(.*\) ~= nil then _arrayFind/);
  });

  test("selectedItem uses single _arrayFind call", () => {
    // Should be: if selectedId then _arrayFind(items, fn) else nil
    expect(luau).toContain(
      "return if selectedId then _arrayFind(items, function(item) return item.id == selectedId end) else nil"
    );
  });
});

// ── Module Return ──

describe("Inventory: module return", () => {
  test("returns the default export", () => {
    expect(luau).toContain("return Inventory");
  });

  test("does not export sub-components", () => {
    expect(luau).not.toContain("return ItemSlot");
    expect(luau).not.toContain("return DetailPanel");
  });
});
