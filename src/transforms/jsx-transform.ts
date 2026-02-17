import ts from "typescript";
import type { LuauExpression, LuauStatement, LuauTableEntry } from "../ast/luau-ast.ts";
import {
  ident, str, num, bool, nil, call, methodCall, index, bracketIndex,
  table, binary, unary, ifExpr, funcExpr, concat, raw,
} from "../ast/luau-ast.ts";
import { HTML_TO_ROBLOX, TEXT_ELEMENTS, CONTAINER_ELEMENTS, ROBLOX_GUI_CLASSES } from "../mappings/elements.ts";
import { EVENT_MAP, UNSUPPORTED_EVENTS } from "../mappings/events.ts";
import { ROBLOX_PROPERTIES } from "../mappings/roblox-properties.ts";
import type { TransformContext } from "./transform-context.ts";
import { transformExpression } from "./expression-transform.ts";
import { transformStatements } from "./statement-transform.ts";

/**
 * Transform a JSX element/fragment to a React.createElement (or createFragment) call.
 */
export function transformJSX(
  node: ts.JsxElement | ts.JsxSelfClosingElement | ts.JsxFragment,
  ctx: TransformContext,
): LuauExpression {
  ctx.needsReact = true;

  // Fragment
  if (ts.isJsxFragment(node)) {
    return transformJSXFragment(node, ctx);
  }

  // Self-closing: <Foo prop="val" />
  if (ts.isJsxSelfClosingElement(node)) {
    return transformJSXElement(
      node.tagName,
      node.attributes,
      [],
      ctx,
    );
  }

  // Full element: <Foo prop="val">children</Foo>
  const children = node.children ? Array.from(node.children) : [];
  return transformJSXElement(
    node.openingElement.tagName,
    node.openingElement.attributes,
    children,
    ctx,
  );
}

function transformJSXFragment(
  node: ts.JsxFragment,
  ctx: TransformContext,
): LuauExpression {
  const children = processJSXChildren(Array.from(node.children), null, ctx);

  if (children.length === 0) {
    return call(index(ident("React"), "createFragment"), [table([])]);
  }

  return call(index(ident("React"), "createFragment"), [
    table(children),
  ]);
}

function transformJSXElement(
  tagName: ts.JsxTagNameExpression,
  attributes: ts.JsxAttributes,
  children: ts.JsxChild[],
  ctx: TransformContext,
): LuauExpression {
  // Determine the element type
  const { elementArg, robloxClass, isComponent } = resolveElementType(tagName, ctx);

  // Special: portal
  if (!isComponent && ts.isIdentifier(tagName) && tagName.text === "portal") {
    return transformPortal(attributes, children, ctx);
  }

  // Process attributes → props table
  const { propsEntries, keyExpr, spreadProps } = processAttributes(
    attributes,
    robloxClass,
    isComponent,
    ctx,
  );

  // Process children
  const childEntries = processJSXChildren(children, robloxClass, ctx);

  // Build the React.createElement call
  let propsArg: LuauExpression;

  if (spreadProps.length > 0) {
    // Has spread props: merge(spreadObj, { localProps })
    ctx.requireHelper("merge");
    const localProps = propsEntries.length > 0 ? table(propsEntries) : null;
    const mergeArgs = [...spreadProps];
    if (localProps) mergeArgs.push(localProps);
    propsArg = mergeArgs.length === 1 ? mergeArgs[0]! : call(ident("_merge"), mergeArgs);
  } else if (propsEntries.length > 0) {
    propsArg = table(propsEntries);
  } else {
    propsArg = table([]);
  }

  const args: LuauExpression[] = [elementArg, propsArg];

  if (childEntries.length > 0) {
    args.push(table(childEntries));
  }

  let createCall = call(index(ident("React"), "createElement"), args);

  // If inside a .map() context, the key is handled by the parent
  // Otherwise, key is not directly used in createElement (it's used as table key)
  // React-lua uses table keys for reconciliation
  return createCall;
}

// ── Element Type Resolution ──

interface ResolvedElement {
  /** The first argument to React.createElement */
  elementArg: LuauExpression;
  /** The Roblox class name (null for components) */
  robloxClass: string | null;
  /** Whether this is a user component (uppercase) */
  isComponent: boolean;
}

function resolveElementType(
  tagName: ts.JsxTagNameExpression,
  ctx: TransformContext,
): ResolvedElement {
  if (ts.isIdentifier(tagName)) {
    const name = tagName.text;

    // Lowercase = HTML element
    if (name[0] === name[0]!.toLowerCase()) {
      const robloxClass = HTML_TO_ROBLOX[name];

      if (!robloxClass && !ROBLOX_GUI_CLASSES.has(name)) {
        ctx.warn("unsupported-element", `HTML element '${name}' has no Roblox mapping`);
        return { elementArg: str(name), robloxClass: name, isComponent: false };
      }

      const className = robloxClass ?? name;
      return { elementArg: str(className), robloxClass: className, isComponent: false };
    }

    // Uppercase = Component
    return { elementArg: ident(name), robloxClass: null, isComponent: true };
  }

  // Property access: e.g., ThemeContext.Provider
  if (ts.isPropertyAccessExpression(tagName)) {
    return {
      elementArg: transformExpression(tagName, ctx),
      robloxClass: null,
      isComponent: true,
    };
  }

  return { elementArg: str("Frame"), robloxClass: "Frame", isComponent: false };
}

// ── Portal ──

function transformPortal(
  attributes: ts.JsxAttributes,
  children: ts.JsxChild[],
  ctx: TransformContext,
): LuauExpression {
  ctx.needsReactRoblox = true;

  let targetExpr: LuauExpression = nil();

  for (const attr of attributes.properties) {
    if (ts.isJsxAttribute(attr) && attr.name.text === "target") {
      if (attr.initializer && ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
        targetExpr = transformExpression(attr.initializer.expression, ctx);
      }
    }
  }

  const childEntries = processJSXChildren(children, "Frame", ctx);
  const childArg = childEntries.length > 0
    ? call(index(ident("React"), "createElement"), [str("Frame"), table([]), table(childEntries)])
    : nil();

  return call(index(ident("ReactRoblox"), "createPortal"), [childArg, targetExpr]);
}

// ── Attributes Processing ──

interface ProcessedAttributes {
  propsEntries: LuauTableEntry[];
  keyExpr: LuauExpression | null;
  spreadProps: LuauExpression[];
}

function processAttributes(
  attributes: ts.JsxAttributes,
  robloxClass: string | null,
  isComponent: boolean,
  ctx: TransformContext,
): ProcessedAttributes {
  const propsEntries: LuauTableEntry[] = [];
  let keyExpr: LuauExpression | null = null;
  const spreadProps: LuauExpression[] = [];

  for (const attr of attributes.properties) {
    // Spread attribute: {...props}
    if (ts.isJsxSpreadAttribute(attr)) {
      spreadProps.push(transformExpression(attr.expression, ctx));
      continue;
    }

    if (!ts.isJsxAttribute(attr)) continue;

    const propName = attr.name.text;
    const propValue = getAttributeValue(attr, ctx);

    // key → stored separately (used as table key in parent)
    if (propName === "key") {
      keyExpr = propValue;
      continue;
    }

    // ref → passthrough
    if (propName === "ref") {
      propsEntries.push({ key: str("ref"), value: propValue });
      continue;
    }

    // className → [React.Tag]
    if (propName === "className") {
      propsEntries.push({
        key: bracketIndex(ident("React"), str("Tag")),
        value: propValue,
      });
      continue;
    }

    // id → Name
    if (propName === "id") {
      propsEntries.push({ key: str("Name"), value: propValue });
      continue;
    }

    // style → inline properties (simplified: pass as-is for components, expand for native)
    if (propName === "style") {
      if (isComponent) {
        propsEntries.push({ key: str("style"), value: propValue });
      } else {
        // For native elements, inline styles would need expansion
        // For now, pass through as a table (user can use Roblox props directly)
        propsEntries.push({ key: str("style"), value: propValue });
      }
      continue;
    }

    // dangerouslySetInnerHTML → warning
    if (propName === "dangerouslySetInnerHTML") {
      ctx.warn("unsupported-prop", "'dangerouslySetInnerHTML' is not supported");
      continue;
    }

    // Event handlers
    if (propName.startsWith("on")) {
      const eventEntry = transformEventProp(propName, propValue, attr, robloxClass, ctx);
      if (eventEntry) {
        propsEntries.push(eventEntry);
      }
      continue;
    }

    // Roblox property passthrough
    if (ROBLOX_PROPERTIES.has(propName)) {
      propsEntries.push({ key: str(propName), value: propValue });
      continue;
    }

    // For components, pass all props through
    if (isComponent) {
      propsEntries.push({ key: str(propName), value: propValue });
      continue;
    }

    // Unknown prop on native element
    ctx.warn("unsupported-prop", `Unknown prop '${propName}' on <${robloxClass ?? "unknown"}>`);
    propsEntries.push({ key: str(propName), value: propValue });
  }

  return { propsEntries, keyExpr, spreadProps };
}

function getAttributeValue(
  attr: ts.JsxAttribute,
  ctx: TransformContext,
): LuauExpression {
  if (!attr.initializer) {
    // Boolean attribute: <button disabled /> → true
    return bool(true);
  }

  if (ts.isStringLiteral(attr.initializer)) {
    return str(attr.initializer.text);
  }

  if (ts.isJsxExpression(attr.initializer)) {
    if (attr.initializer.expression) {
      return transformExpression(attr.initializer.expression, ctx);
    }
    return nil();
  }

  return nil();
}

// ── Event Prop Transform ──

function transformEventProp(
  propName: string,
  value: LuauExpression,
  attr: ts.JsxAttribute,
  robloxClass: string | null,
  ctx: TransformContext,
): LuauTableEntry | null {
  // Check unsupported events
  if (UNSUPPORTED_EVENTS.has(propName)) {
    ctx.warn("unsupported-event", `'${propName}' has no Roblox equivalent - skipped`);
    return null;
  }

  const mapping = EVENT_MAP[propName];
  if (!mapping) {
    // Unknown event — try to pass through
    ctx.warn("unsupported-event", `Unknown event '${propName}'`);
    return null;
  }

  // Build the Roblox event key: [React.Event.X] or [React.Change.X]
  const eventKey = bracketIndex(
    index(ident("React"), mapping.kind),
    str(mapping.name),
  );

  // Special handling for onSubmit: wrap in enterPressed check
  if (propName === "onSubmit") {
    return {
      key: eventKey,
      value: buildOnSubmitHandler(value, attr, ctx),
    };
  }

  // Special handling for onChange with e.target.value pattern
  if (propName === "onChange") {
    return {
      key: eventKey,
      value: buildOnChangeHandler(value, attr, ctx),
    };
  }

  // For simple event handlers, we may need to adjust the callback signature
  // React: (e) => ... → Roblox: (rbx, ...) => ...
  const wrappedValue = wrapEventHandler(value, attr, mapping, ctx);

  return { key: eventKey, value: wrappedValue };
}

function buildOnSubmitHandler(
  value: LuauExpression,
  attr: ts.JsxAttribute,
  ctx: TransformContext,
): LuauExpression {
  // FocusLost handler that checks enterPressed
  // function(rbx, enterPressed, _input)
  //   if enterPressed then handler(rbx.Text) end
  // end
  const handlerCall = isSimpleCallback(attr)
    ? call(getCallbackBody(value), [index(ident("rbx"), "Text")])
    : call(value, [index(ident("rbx"), "Text")]);

  return funcExpr(
    [{ name: "rbx" }, { name: "enterPressed" }, { name: "_inputThatCausedFocusLoss" }],
    [{
      type: "if",
      condition: ident("enterPressed"),
      body: [{ type: "expression-statement", expr: handlerCall }],
    }],
  );
}

function buildOnChangeHandler(
  value: LuauExpression,
  attr: ts.JsxAttribute,
  ctx: TransformContext,
): LuauExpression {
  ctx.warn("lossy-transform", "'onChange' with e.target.value transformed to rbx.Text");

  // Detect (e) => setText(e.target.value) pattern
  if (attr.initializer && ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
    const expr = attr.initializer.expression;
    if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
      // Rewrite: function(rbx) originalCallback(rbx.Text) end
      const body = rewriteEventTargetValue(expr, ctx);
      if (body) {
        return funcExpr(
          [{ name: "rbx" }],
          body,
        );
      }
    }
  }

  // Fallback: wrap
  return funcExpr(
    [{ name: "rbx" }],
    [{ type: "expression-statement", expr: call(value, [index(ident("rbx"), "Text")]) }],
  );
}

function rewriteEventTargetValue(
  fn: ts.ArrowFunction | ts.FunctionExpression,
  ctx: TransformContext,
): LuauStatement[] | null {
  // Try to detect (e) => setText(e.target.value) and rewrite to setText(rbx.Text)
  if (!ts.isBlock(fn.body)) {
    // Expression body: (e) => setText(e.target.value)
    const expr = fn.body as ts.Expression;
    if (ts.isCallExpression(expr)) {
      const rewrittenArgs = expr.arguments.map((arg) => {
        const text = arg.getText();
        if (text.includes(".target.value")) {
          return index(ident("rbx"), "Text");
        }
        return transformExpression(arg, ctx);
      });
      const callee = transformExpression(expr.expression, ctx);
      return [{
        type: "expression-statement",
        expr: call(callee, rewrittenArgs),
      }];
    }
  }
  return null;
}

function wrapEventHandler(
  value: LuauExpression,
  attr: ts.JsxAttribute,
  mapping: typeof EVENT_MAP[string],
  ctx: TransformContext,
): LuauExpression {
  // If the handler is already a function expression with the right params, adjust
  if (!mapping.params) return value;

  // For simple callbacks like onClick={handleClick}, wrap in Roblox signature
  if (value.type === "identifier") {
    // onClick={handleClick} → function(_rbx, ...) handleClick(...) end
    const robloxParams = mapping.params.robloxParams.map((n) => ({ name: n }));
    const eventArgIdx = mapping.params.eventArgIndex;

    if (eventArgIdx >= 0 && eventArgIdx < robloxParams.length) {
      return funcExpr(robloxParams, [{
        type: "expression-statement",
        expr: call(value, [ident(robloxParams[eventArgIdx]!.name)]),
      }]);
    }

    return funcExpr(robloxParams, [{
      type: "expression-statement",
      expr: call(value, []),
    }]);
  }

  // For inline function expressions, they're already transformed
  return value;
}

function isSimpleCallback(attr: ts.JsxAttribute): boolean {
  if (attr.initializer && ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
    return ts.isIdentifier(attr.initializer.expression);
  }
  return false;
}

function getCallbackBody(value: LuauExpression): LuauExpression {
  return value;
}

// ── Children Processing ──

function processJSXChildren(
  children: ts.JsxChild[],
  robloxClass: string | null,
  ctx: TransformContext,
): LuauTableEntry[] {
  const entries: LuauTableEntry[] = [];
  const isTextElement = robloxClass ? TEXT_ELEMENTS.has(robloxClass) : false;
  const isContainer = robloxClass ? CONTAINER_ELEMENTS.has(robloxClass) : false;

  // Filter out whitespace-only text
  const meaningful = children.filter((child) => {
    if (ts.isJsxText(child)) {
      return child.text.trim().length > 0;
    }
    return true;
  });

  // Separate text and element children
  const textParts: LuauExpression[] = [];
  const elementChildren: { key: LuauExpression | null; value: LuauExpression }[] = [];
  let hasText = false;
  let hasElements = false;

  for (const child of meaningful) {
    if (ts.isJsxText(child)) {
      const text = child.text.trim();
      if (text) {
        textParts.push(str(text));
        hasText = true;
      }
    } else if (ts.isJsxExpression(child)) {
      if (child.expression) {
        // Check if it's a text expression or an element expression
        if (isTextExpression(child.expression)) {
          textParts.push(wrapToString(transformExpression(child.expression, ctx)));
          hasText = true;
        } else if (isMapExpression(child.expression)) {
          // .map() in JSX context → for loop
          const mapResult = transformJSXMap(child.expression as ts.CallExpression, ctx);
          if (mapResult) {
            elementChildren.push({ key: null, value: mapResult });
            hasElements = true;
          }
        } else if (isConditionalJSX(child.expression)) {
          // Conditional rendering
          elementChildren.push({
            key: null,
            value: transformExpression(child.expression, ctx),
          });
          hasElements = true;
        } else {
          // Could be text or element — treat as expression child
          const expr = transformExpression(child.expression, ctx);
          elementChildren.push({ key: null, value: expr });
          hasElements = true;
        }
      }
    } else if (ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child)) {
      const key = extractKeyFromElement(child);
      const childExpr = transformJSX(child, ctx);
      const childName = getChildName(child, elementChildren.length);
      elementChildren.push({
        key: key ? transformExpression(key, ctx) : str(childName),
        value: childExpr,
      });
      hasElements = true;
    } else if (ts.isJsxFragment(child)) {
      const childExpr = transformJSX(child, ctx);
      elementChildren.push({ key: null, value: childExpr });
      hasElements = true;
    }
  }

  // Text-capable element with only text children → Text property on parent
  if (hasText && !hasElements && isTextElement) {
    // Text is set as Text property on the parent element — handled by caller
    // Return empty (text is consumed as a prop, not a child)
    return [];
  }

  // Container with text children → wrap in TextLabel
  if (hasText && !hasElements && isContainer) {
    ctx.warn("text-in-container", `Text inside <${robloxClass}> will be wrapped in TextLabel`);
    const textExpr = textParts.length === 1 ? textParts[0]! : concat(textParts);
    entries.push({
      key: str("_text"),
      value: call(index(ident("React"), "createElement"), [
        str("TextLabel"),
        table([{ key: str("Text"), value: textExpr }]),
      ]),
    });
    return entries;
  }

  // Mixed text + elements
  if (hasText && hasElements) {
    ctx.warn("mixed-children", `Mixed text and element children in <${robloxClass ?? "component"}>`);
    // Wrap text in TextLabel
    const textExpr = textParts.length === 1 ? textParts[0]! : concat(textParts);
    entries.push({
      key: str("_text"),
      value: call(index(ident("React"), "createElement"), [
        str("TextLabel"),
        table([{ key: str("Text"), value: textExpr }]),
      ]),
    });
  }

  // Add element children with LayoutOrder
  let layoutOrder = 1;
  for (const child of elementChildren) {
    entries.push({
      key: child.key ?? undefined,
      value: child.value,
    });
    layoutOrder++;
  }

  return entries;
}

/**
 * Extract the text content from JSX children to be used as the Text property.
 * Returns null if children aren't pure text.
 */
export function extractTextFromChildren(
  children: ts.JsxChild[],
  ctx: TransformContext,
): LuauExpression | null {
  const meaningful = children.filter((child) => {
    if (ts.isJsxText(child)) return child.text.trim().length > 0;
    return true;
  });

  if (meaningful.length === 0) return null;

  // Check if all children are text or text expressions
  const parts: LuauExpression[] = [];
  for (const child of meaningful) {
    if (ts.isJsxText(child)) {
      const text = child.text.trim();
      if (text) parts.push(str(text));
    } else if (ts.isJsxExpression(child) && child.expression) {
      if (isTextExpression(child.expression)) {
        parts.push(wrapToString(transformExpression(child.expression, ctx)));
      } else {
        return null; // Not pure text
      }
    } else {
      return null; // Has element children
    }
  }

  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0]!;
  return concat(parts);
}

// ── JSX .map() transform ──

function transformJSXMap(
  callExpr: ts.CallExpression,
  ctx: TransformContext,
): LuauExpression | null {
  if (!ts.isPropertyAccessExpression(callExpr.expression)) return null;
  if (callExpr.expression.name.text !== "map") return null;
  if (callExpr.arguments.length < 1) return null;

  const arr = transformExpression(callExpr.expression.expression, ctx);
  const callback = callExpr.arguments[0]!;

  if (!ts.isArrowFunction(callback) && !ts.isFunctionExpression(callback)) {
    return null;
  }

  const params = callback.parameters;
  const itemName = params[0] ? params[0].name.getText() : "_item";
  const indexName = params[1] ? params[1].name.getText() : "_idx";

  // Build the loop body
  let bodyExpr: LuauExpression;
  if (ts.isBlock(callback.body)) {
    // Block body: extract the return value
    const stmts = transformStatements(callback.body.statements, ctx);
    // Find the return statement
    const returnStmt = stmts.find((s) => s.type === "return");
    if (returnStmt && returnStmt.type === "return" && returnStmt.value) {
      bodyExpr = returnStmt.value;
    } else {
      return call(index(ident("React"), "createFragment"), [table([])]);
    }
  } else {
    bodyExpr = transformExpression(callback.body as ts.Expression, ctx);
  }

  // Extract key from the rendered element (if any)
  // This is complex — for now, use the index as key
  // The body expression is a React.createElement call; we'd need to peek inside

  // Build: local _elements = {} ; for idx, item in arr do _elements[key] = expr end
  // Return as an IIFE
  const tempVar = `_map_result`;

  return funcExpr([], [
    { type: "local", name: tempVar, value: table([]) },
    {
      type: "for-in",
      vars: [indexName, itemName],
      iterators: [arr],
      body: [{
        type: "assignment",
        target: bracketIndex(ident(tempVar), ident(indexName)),
        value: bodyExpr,
      }],
    },
    { type: "return", value: call(index(ident("React"), "createFragment"), [ident(tempVar)]) },
  ]);
}

// ── Helper functions ──

function isTextExpression(expr: ts.Expression): boolean {
  // String/number literals, template literals, identifiers (likely string vars)
  if (ts.isStringLiteral(expr)) return true;
  if (ts.isNumericLiteral(expr)) return true;
  if (ts.isTemplateExpression(expr)) return true;
  if (ts.isNoSubstitutionTemplateLiteral(expr)) return true;
  // Identifiers could be anything, but in text context they're likely string/number
  if (ts.isIdentifier(expr)) return true;
  // Binary + of strings
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.PlusToken) return true;
  return false;
}

function isMapExpression(expr: ts.Expression): boolean {
  return (
    ts.isCallExpression(expr) &&
    ts.isPropertyAccessExpression(expr.expression) &&
    expr.expression.name.text === "map"
  );
}

function isConditionalJSX(expr: ts.Expression): boolean {
  if (ts.isConditionalExpression(expr)) return true;
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) return true;
  return false;
}

function wrapToString(expr: LuauExpression): LuauExpression {
  // If already a string literal, no need to wrap
  if (expr.type === "string") return expr;
  return call(ident("tostring"), [expr]);
}

function extractKeyFromElement(child: ts.JsxElement | ts.JsxSelfClosingElement): ts.Expression | null {
  const attrs = ts.isJsxElement(child)
    ? child.openingElement.attributes
    : child.attributes;

  for (const attr of attrs.properties) {
    if (ts.isJsxAttribute(attr) && attr.name.text === "key") {
      if (attr.initializer) {
        if (ts.isJsxExpression(attr.initializer) && attr.initializer.expression) {
          return attr.initializer.expression;
        }
        if (ts.isStringLiteral(attr.initializer)) {
          return attr.initializer;
        }
      }
    }
  }
  return null;
}

function getChildName(child: ts.JsxElement | ts.JsxSelfClosingElement, idx: number): string {
  const tag = ts.isJsxElement(child) ? child.openingElement.tagName : child.tagName;
  if (ts.isIdentifier(tag)) {
    const name = tag.text;
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
    return capitalized;
  }
  return `Child${idx + 1}`;
}
