import ts from "typescript";
import type {
  LuauExpression,
  LuauStatement,
  LuauTableEntry,
  LuauStringLiteral,
  LuauTemplateLiteralSpan,
} from "../ast/luau-ast.ts";
import {
  ident,
  str,
  num,
  bool,
  nil,
  call,
  methodCall,
  index,
  bracketIndex,
  table,
  binary,
  unary,
  ifExpr,
  funcExpr,
  templateLiteral,
  raw,
} from "../ast/luau-ast.ts";
import {
  HTML_TO_ROBLOX,
  TEXT_ELEMENTS,
  CONTAINER_ELEMENTS,
  ROBLOX_GUI_CLASSES,
} from "../mappings/elements.ts";
import { EVENT_MAP, UNSUPPORTED_EVENTS } from "../mappings/events.ts";
import { ROBLOX_PROPERTIES } from "../mappings/roblox-properties.ts";
import {
  getDefaultProps,
  getDefaultChildren,
} from "../mappings/default-styles.ts";
import type { TransformContext } from "./transform-context.ts";
import { transformExpression } from "./expression-transform.ts";
import { transformStatements } from "./statement-transform.ts";

/**
 * Transform a JSX element/fragment to a React.createElement (or createFragment) call.
 */
export function transformJSX(
  node: ts.JsxElement | ts.JsxSelfClosingElement | ts.JsxFragment,
  ctx: TransformContext
): LuauExpression {
  ctx.needsReact = true;

  // Fragment
  if (ts.isJsxFragment(node)) {
    return transformJSXFragment(node, ctx);
  }

  // Self-closing: <Foo prop="val" />
  if (ts.isJsxSelfClosingElement(node)) {
    return transformJSXElement(node.tagName, node.attributes, [], ctx);
  }

  // Full element: <Foo prop="val">children</Foo>
  const children = node.children ? Array.from(node.children) : [];
  return transformJSXElement(
    node.openingElement.tagName,
    node.openingElement.attributes,
    children,
    ctx
  );
}

function transformJSXFragment(
  node: ts.JsxFragment,
  ctx: TransformContext
): LuauExpression {
  const children = processJSXChildren(Array.from(node.children), null, ctx);

  if (children.length === 0) {
    return call(index(ident("React"), "createElement"), [
      index(ident("React"), "Fragment"),
      table([]),
    ]);
  }

  return call(index(ident("React"), "createElement"), [
    index(ident("React"), "Fragment"),
    raw("nil"),
    table(children),
  ]);
}

function transformJSXElement(
  tagName: ts.JsxTagNameExpression,
  attributes: ts.JsxAttributes,
  children: ts.JsxChild[],
  ctx: TransformContext
): LuauExpression {
  // Extract static className before element resolution (for manifest-driven upgrades)
  const staticClassName = extractStaticClassName(attributes);

  // Determine the element type
  const { elementArg, robloxClass, isComponent, htmlTag } = resolveElementType(
    tagName,
    ctx,
    staticClassName
  );

  // Special: portal
  if (!isComponent && ts.isIdentifier(tagName) && tagName.text === "portal") {
    return transformPortal(attributes, children, ctx);
  }

  // Process attributes → props table
  const { propsEntries, keyExpr, spreadProps } = processAttributes(
    attributes,
    robloxClass,
    isComponent,
    ctx
  );

  // Process children
  const childEntries = processJSXChildren(children, robloxClass, ctx);

  // Inject default props and children for mapped HTML elements
  if (htmlTag) {
    const defaultProps = getDefaultProps(htmlTag);
    if (defaultProps.length > 0) {
      mergeDefaultProps(propsEntries, defaultProps);
    }
    const defaultChildren = getDefaultChildren(htmlTag);
    if (defaultChildren.length > 0) {
      childEntries.unshift(...defaultChildren);
    }
  }

  // For text-capable elements, extract text children as the Text property
  if (
    childEntries.length === 0 &&
    robloxClass &&
    TEXT_ELEMENTS.has(robloxClass) &&
    children.length > 0
  ) {
    const textExpr = extractTextFromChildren(children, ctx);
    if (textExpr) {
      propsEntries.push({ key: str("Text"), value: textExpr });
    }
  }

  // Build the React.createElement call
  let propsArg: LuauExpression;

  if (spreadProps.length > 0) {
    // Has spread props: merge(spreadObj, { localProps })
    ctx.requireHelper("merge");
    const localProps = propsEntries.length > 0 ? table(propsEntries) : null;
    const mergeArgs = [...spreadProps];
    if (localProps) mergeArgs.push(localProps);
    propsArg =
      mergeArgs.length === 1 ? mergeArgs[0]! : call(ident("_merge"), mergeArgs);
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
  /** The original HTML tag name (null for components or Roblox passthrough) */
  htmlTag: string | null;
}

function resolveElementType(
  tagName: ts.JsxTagNameExpression,
  ctx: TransformContext,
  staticClassName?: string | null
): ResolvedElement {
  if (ts.isIdentifier(tagName)) {
    const name = tagName.text;

    // Lowercase = HTML element
    if (name[0] === name[0]!.toLowerCase()) {
      let robloxClass = HTML_TO_ROBLOX[name];

      // ScrollingFrame upgrade: if any className triggers overflow:scroll in the CSS manifest
      if (robloxClass === "Frame" && staticClassName && ctx.cssManifest) {
        const classNames = staticClassName.split(/\s+/);
        const needsScroll = classNames.some((cls) =>
          ctx.isScrollingFrameClass(cls)
        );
        if (needsScroll) {
          robloxClass = "ScrollingFrame";
        }
      }

      if (!robloxClass && !ROBLOX_GUI_CLASSES.has(name)) {
        ctx.warnAtNode(
          "unsupported-element",
          `HTML element '${name}' has no Roblox mapping`,
          tagName
        );
        return { elementArg: str(name), robloxClass: name, isComponent: false, htmlTag: null };
      }

      const className = robloxClass ?? name;
      return {
        elementArg: str(className),
        robloxClass: className,
        isComponent: false,
        htmlTag: robloxClass ? name : null,
      };
    }

    // Uppercase = Component
    return { elementArg: ident(name), robloxClass: null, isComponent: true, htmlTag: null };
  }

  // Property access: e.g., ThemeContext.Provider
  if (ts.isPropertyAccessExpression(tagName)) {
    return {
      elementArg: transformExpression(tagName, ctx),
      robloxClass: null,
      isComponent: true,
      htmlTag: null,
    };
  }

  return { elementArg: str("Frame"), robloxClass: "Frame", isComponent: false, htmlTag: null };
}

// ── Portal ──

function transformPortal(
  attributes: ts.JsxAttributes,
  children: ts.JsxChild[],
  ctx: TransformContext
): LuauExpression {
  ctx.needsReactRoblox = true;

  let targetExpr: LuauExpression = nil();

  for (const attr of attributes.properties) {
    if (ts.isJsxAttribute(attr) && attr.name.getText() === "target") {
      if (
        attr.initializer &&
        ts.isJsxExpression(attr.initializer) &&
        attr.initializer.expression
      ) {
        targetExpr = transformExpression(attr.initializer.expression, ctx);
      }
    }
  }

  const childEntries = processJSXChildren(children, "Frame", ctx);
  const childArg =
    childEntries.length > 0
      ? call(index(ident("React"), "createElement"), [
          str("Frame"),
          table([]),
          table(childEntries),
        ])
      : nil();

  return call(index(ident("ReactRoblox"), "createPortal"), [
    childArg,
    targetExpr,
  ]);
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
  ctx: TransformContext
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

    const propName = attr.name.getText();
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
        key: index(ident("React"), "Tag"),
        value: propValue,
      });
      continue;
    }

    // id → Name
    if (propName === "id") {
      propsEntries.push({ key: str("Name"), value: propValue });
      continue;
    }

    // value → Text (for TextBox elements, the Roblox equivalent of a controlled input)
    if (propName === "value" && robloxClass === "TextBox") {
      propsEntries.push({ key: str("Text"), value: propValue });
      continue;
    }

    // style → inline properties (expand for native elements, pass through for components)
    if (propName === "style") {
      if (isComponent) {
        propsEntries.push({ key: str("style"), value: propValue });
      } else {
        // For native elements, expand CSS-like properties to Roblox properties
        if (
          attr.initializer &&
          ts.isJsxExpression(attr.initializer) &&
          attr.initializer.expression
        ) {
          const styleExpr = attr.initializer.expression;
          if (ts.isObjectLiteralExpression(styleExpr)) {
            expandInlineStyle(styleExpr, propsEntries, ctx);
          } else {
            propsEntries.push({ key: str("style"), value: propValue });
          }
        } else {
          propsEntries.push({ key: str("style"), value: propValue });
        }
      }
      continue;
    }

    // dangerouslySetInnerHTML → warning
    if (propName === "dangerouslySetInnerHTML") {
      ctx.warnAtNode(
        "unsupported-prop",
        "'dangerouslySetInnerHTML' is not supported",
        attr
      );
      continue;
    }

    // Event handlers (only for native elements, not components)
    if (propName.startsWith("on") && !isComponent) {
      const eventEntry = transformEventProp(
        propName,
        propValue,
        attr,
        robloxClass,
        ctx
      );
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
    ctx.warnAtNode(
      "unsupported-prop",
      `Unknown prop '${propName}' on <${robloxClass ?? "unknown"}>`,
      attr
    );
    propsEntries.push({ key: str(propName), value: propValue });
  }

  return { propsEntries, keyExpr, spreadProps };
}

function getAttributeValue(
  attr: ts.JsxAttribute,
  ctx: TransformContext
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
  ctx: TransformContext
): LuauTableEntry | null {
  // Check unsupported events
  if (UNSUPPORTED_EVENTS.has(propName)) {
    ctx.warnAtNode(
      "unsupported-event",
      `'${propName}' has no Roblox equivalent - skipped`,
      attr
    );
    return null;
  }

  const mapping = EVENT_MAP[propName];
  if (!mapping) {
    // Unknown event — try to pass through
    ctx.warnAtNode("unsupported-event", `Unknown event '${propName}'`, attr);
    return null;
  }

  // Build the Roblox event key: [React.Event.X] or [React.Change.X]
  const eventKey = index(index(ident("React"), mapping.kind), mapping.name);

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
  ctx: TransformContext
): LuauExpression {
  // FocusLost handler that checks enterPressed
  // function(rbx, enterPressed, _input)
  //   if enterPressed then handler(rbx.Text) end
  // end
  const handlerCall = isSimpleCallback(attr)
    ? call(getCallbackBody(value), [index(ident("rbx"), "Text")])
    : call(value, [index(ident("rbx"), "Text")]);

  return funcExpr(
    [
      { name: "rbx" },
      { name: "enterPressed" },
      { name: "_inputThatCausedFocusLoss" },
    ],
    [
      {
        type: "if",
        condition: ident("enterPressed"),
        body: [{ type: "expression-statement", expr: handlerCall }],
      },
    ]
  );
}

function buildOnChangeHandler(
  value: LuauExpression,
  attr: ts.JsxAttribute,
  ctx: TransformContext
): LuauExpression {
  ctx.warnAtNode(
    "lossy-transform",
    "'onChange' with e.target.value transformed to rbx.Text",
    attr
  );

  // Detect (e) => setText(e.target.value) pattern
  if (
    attr.initializer &&
    ts.isJsxExpression(attr.initializer) &&
    attr.initializer.expression
  ) {
    const expr = attr.initializer.expression;
    if (ts.isArrowFunction(expr) || ts.isFunctionExpression(expr)) {
      // Rewrite: function(rbx) originalCallback(rbx.Text) end
      const body = rewriteEventTargetValue(expr, ctx);
      if (body) {
        return funcExpr([{ name: "rbx" }], body);
      }
    }
  }

  // Fallback: wrap
  return funcExpr(
    [{ name: "rbx" }],
    [
      {
        type: "expression-statement",
        expr: call(value, [index(ident("rbx"), "Text")]),
      },
    ]
  );
}

function rewriteEventTargetValue(
  fn: ts.ArrowFunction | ts.FunctionExpression,
  ctx: TransformContext
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
        if (text.includes(".target.checked")) {
          ctx.warnAtNode(
            "lossy-transform",
            "e.target.checked has no direct Roblox equivalent; using nil",
            arg
          );
          return nil();
        }
        if (text.includes(".target.name")) {
          return index(ident("rbx"), "Name");
        }
        return transformExpression(arg, ctx);
      });
      const callee = transformExpression(expr.expression, ctx);
      return [
        {
          type: "expression-statement",
          expr: call(callee, rewrittenArgs),
        },
      ];
    }
  }
  return null;
}

function wrapEventHandler(
  value: LuauExpression,
  _attr: ts.JsxAttribute,
  mapping: (typeof EVENT_MAP)[string],
  _ctx: TransformContext
): LuauExpression {
  if (!mapping.params) return value;

  // Direct function reference: onClick={increment} → pass through as-is
  // Wrapping is only needed for arrow functions with explicit event parameter remapping
  if (value.type === "identifier") {
    return value;
  }

  // For inline function expressions, they're already transformed
  return value;
}

function isSimpleCallback(attr: ts.JsxAttribute): boolean {
  if (
    attr.initializer &&
    ts.isJsxExpression(attr.initializer) &&
    attr.initializer.expression
  ) {
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
  ctx: TransformContext
): LuauTableEntry[] {
  const entries: LuauTableEntry[] = [];
  const isTextElement = robloxClass ? TEXT_ELEMENTS.has(robloxClass) : false;
  const isContainer = robloxClass ? CONTAINER_ELEMENTS.has(robloxClass) : false;

  // Filter out whitespace-only text
  const meaningful = children.filter((child) => {
    if (ts.isJsxText(child)) {
      return normalizeJSXText(child.text).length > 0;
    }
    return true;
  });

  // Separate text and element children
  const textParts: LuauExpression[] = [];
  const elementChildren: {
    key: LuauExpression | null;
    value: LuauExpression;
  }[] = [];
  let hasText = false;
  let hasElements = false;
  const usedChildNames = new Map<string, number>();

  for (const child of meaningful) {
    if (ts.isJsxText(child)) {
      const text = normalizeJSXText(child.text);
      if (text) {
        textParts.push(str(text));
        hasText = true;
      }
    } else if (ts.isJsxExpression(child)) {
      if (child.expression) {
        // Check structural JSX patterns first (map, conditional), then text
        if (isMapExpression(child.expression)) {
          // .map() in JSX context → for loop
          const mapResult = transformJSXMap(
            child.expression as ts.CallExpression,
            ctx
          );
          if (mapResult) {
            elementChildren.push({ key: null, value: mapResult });
            hasElements = true;
          }
        } else if (isConditionalJSX(child.expression)) {
          // In text elements, ternaries with text-only branches → treat as text
          if (isTextElement && isTextConditional(child.expression)) {
            textParts.push(transformExpression(child.expression, ctx));
            hasText = true;
          } else {
            // Conditional rendering (JSX children)
            // Use named keys to avoid react-lua bug with positional false/nil
            const jsxChild = extractJSXFromConditional(child.expression);
            let childName = jsxChild
              ? getChildName(jsxChild, elementChildren.length)
              : "_cond";
            const nameCount =
              (usedChildNames.get(childName) ?? 0) + 1;
            usedChildNames.set(childName, nameCount);
            if (nameCount > 1) {
              childName = `${childName}${nameCount}`;
            }
            elementChildren.push({
              key: str(childName),
              value: transformExpression(child.expression, ctx),
            });
            hasElements = true;
          }
        } else if (isTextExpression(child.expression)) {
          textParts.push(transformExpression(child.expression, ctx));
          hasText = true;
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
      let childName = getChildName(child, elementChildren.length);
      if (!key) {
        const nameCount = (usedChildNames.get(childName) ?? 0) + 1;
        usedChildNames.set(childName, nameCount);
        if (nameCount > 1) {
          childName = `${childName}${nameCount}`;
        }
      }
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
    ctx.warn(
      "text-in-container",
      `Text inside <${robloxClass}> will be wrapped in TextLabel`
    );
    const textExpr = textParts.length === 1 ? textParts[0]! : buildTextTemplateLiteral(textParts);
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
    ctx.warn(
      "mixed-children",
      `Mixed text and element children in <${robloxClass ?? "component"}>`
    );
    // Wrap text in TextLabel
    const textExpr = textParts.length === 1 ? textParts[0]! : buildTextTemplateLiteral(textParts);
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
  ctx: TransformContext
): LuauExpression | null {
  const meaningful = children.filter((child) => {
    if (ts.isJsxText(child)) return normalizeJSXText(child.text).length > 0;
    return true;
  });

  if (meaningful.length === 0) return null;

  // Check if all children are text or text expressions
  const parts: LuauExpression[] = [];
  for (const child of meaningful) {
    if (ts.isJsxText(child)) {
      const text = normalizeJSXText(child.text);
      if (text) parts.push(str(text));
    } else if (ts.isJsxExpression(child) && child.expression) {
      if (isTextExpression(child.expression)) {
        parts.push(transformExpression(child.expression, ctx));
      } else if (isTextConditional(child.expression)) {
        parts.push(transformExpression(child.expression, ctx));
      } else {
        return null; // Not pure text
      }
    } else {
      return null; // Has element children
    }
  }

  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0]!;
  return buildTextTemplateLiteral(parts);
}

// ── JSX .map() transform ──

function transformJSXMap(
  callExpr: ts.CallExpression,
  ctx: TransformContext
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
      return call(index(ident("React"), "createElement"), [
        index(ident("React"), "Fragment"),
        table([]),
      ]);
    }
  } else {
    bodyExpr = transformExpression(callback.body as ts.Expression, ctx);
  }

  // Extract key from the rendered element (if any)
  let keyExpr: LuauExpression = ident(indexName); // default: numeric index
  const callbackBody = (callback as ts.ArrowFunction | ts.FunctionExpression)
    .body;
  if (!ts.isBlock(callbackBody)) {
    const bodyNode = callbackBody as ts.Expression;
    const extractedKey = extractKeyFromJSXBody(bodyNode, ctx);
    if (extractedKey) {
      keyExpr = extractedKey;
    }
  } else if (ts.isBlock(callbackBody)) {
    // Check last return statement for key
    for (const stmt of callbackBody.statements) {
      if (ts.isReturnStatement(stmt) && stmt.expression) {
        const extractedKey = extractKeyFromJSXBody(stmt.expression, ctx);
        if (extractedKey) {
          keyExpr = extractedKey;
        }
      }
    }
  }

  // Build: (function() local _map_result = {} ; for idx, item in arr do _map_result[key] = expr end ; return createFragment(_map_result) end)()
  const tempVar = `_map_result`;

  return call(
    funcExpr(
      [],
      [
        { type: "local", name: tempVar, value: table([]) },
        {
          type: "for-in",
          vars: [indexName, itemName],
          iterators: [arr],
          body: [
            {
              type: "assignment",
              target: bracketIndex(ident(tempVar), keyExpr),
              value: bodyExpr,
            },
          ],
        },
        {
          type: "return",
          value: call(index(ident("React"), "createElement"), [
            index(ident("React"), "Fragment"),
            raw("nil"),
            ident(tempVar),
          ]),
        },
      ]
    ),
    []
  );
}

// ── Inline style expansion ──

const CSS_TO_ROBLOX_PROP: Record<string, string> = {
  backgroundColor: "BackgroundColor3",
  color: "TextColor3",
  opacity: "BackgroundTransparency",
  fontSize: "TextSize",
  visible: "Visible",
  zIndex: "ZIndex",
  overflow: "ClipsDescendants",
};

function expandInlineStyle(
  styleObj: ts.ObjectLiteralExpression,
  propsEntries: LuauTableEntry[],
  ctx: TransformContext
): void {
  for (const prop of styleObj.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const cssProp = prop.name.text;
      const robloxProp = CSS_TO_ROBLOX_PROP[cssProp];
      if (robloxProp) {
        propsEntries.push({
          key: str(robloxProp),
          value: transformExpression(prop.initializer, ctx),
        });
      } else {
        ctx.warnAtNode(
          "unsupported-prop",
          `CSS property '${cssProp}' has no Roblox mapping`,
          prop
        );
      }
    }
  }
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
  // Property access (e.g., item.name) — in text context, likely a string/number field
  if (ts.isPropertyAccessExpression(expr)) return true;
  // Binary + of strings
  if (
    ts.isBinaryExpression(expr) &&
    expr.operatorToken.kind === ts.SyntaxKind.PlusToken
  )
    return true;
  // Call expressions (e.g., formatNumber(x)) — treat as text in JSX children.
  // Note: .map() calls are handled separately before isTextExpression is checked.
  if (ts.isCallExpression(expr)) return true;
  // Parenthesized expressions — delegate to inner expression
  if (ts.isParenthesizedExpression(expr))
    return isTextExpression(expr.expression);
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
  if (
    ts.isBinaryExpression(expr) &&
    expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
  )
    return true;
  return false;
}

/** Check if a ternary expression has text-only branches (both sides are text expressions). */
function isTextConditional(expr: ts.Expression): boolean {
  if (!ts.isConditionalExpression(expr)) return false;
  const whenTrue = ts.isParenthesizedExpression(expr.whenTrue)
    ? expr.whenTrue.expression
    : expr.whenTrue;
  const whenFalse = ts.isParenthesizedExpression(expr.whenFalse)
    ? expr.whenFalse.expression
    : expr.whenFalse;
  return isTextExpression(whenTrue) && isTextExpression(whenFalse);
}

/**
 * Normalize JSX text: collapse indentation and newlines while preserving
 * meaningful internal/trailing spaces (e.g., "Count: " before an expression).
 */
function normalizeJSXText(text: string): string {
  const lines = text.split(/\r?\n/);
  const processed: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]!.replace(/\t/g, " ");
    if (i > 0) line = line.trimStart();
    if (i < lines.length - 1) line = line.trimEnd();
    if (line) processed.push(line);
  }
  return processed.join(" ");
}

/** Convert a mix of string literals and expressions into a Luau template literal. */
function buildTextTemplateLiteral(parts: LuauExpression[]): LuauExpression {
  let head = "";
  const spans: LuauTemplateLiteralSpan[] = [];
  let i = 0;

  // Collect leading text into head
  while (i < parts.length && parts[i]!.type === "string") {
    head += (parts[i] as LuauStringLiteral).value;
    i++;
  }

  // Collect remaining parts as spans
  while (i < parts.length) {
    const expr = parts[i]!;
    i++;
    let text = "";
    while (i < parts.length && parts[i]!.type === "string") {
      text += (parts[i] as LuauStringLiteral).value;
      i++;
    }
    spans.push({ expr, text });
  }

  return templateLiteral(head, spans);
}

function extractKeyFromJSXBody(
  expr: ts.Expression,
  ctx: TransformContext
): LuauExpression | null {
  if (ts.isJsxElement(expr) || ts.isJsxSelfClosingElement(expr)) {
    const key = extractKeyFromElement(expr);
    if (key) return transformExpression(key, ctx);
  }
  if (ts.isParenthesizedExpression(expr)) {
    return extractKeyFromJSXBody(expr.expression, ctx);
  }
  return null;
}

function extractKeyFromElement(
  child: ts.JsxElement | ts.JsxSelfClosingElement
): ts.Expression | null {
  const attrs = ts.isJsxElement(child)
    ? child.openingElement.attributes
    : child.attributes;

  for (const attr of attrs.properties) {
    if (ts.isJsxAttribute(attr) && attr.name.getText() === "key") {
      if (attr.initializer) {
        if (
          ts.isJsxExpression(attr.initializer) &&
          attr.initializer.expression
        ) {
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

function extractStaticClassName(attributes: ts.JsxAttributes): string | null {
  for (const attr of attributes.properties) {
    if (
      ts.isJsxAttribute(attr) &&
      attr.name.getText() === "className" &&
      attr.initializer &&
      ts.isStringLiteral(attr.initializer)
    ) {
      return attr.initializer.text;
    }
  }
  return null;
}

/**
 * Merge default props into the user props array.
 * User-provided props take precedence — defaults are only added for missing keys.
 */
function mergeDefaultProps(
  userProps: LuauTableEntry[],
  defaultProps: LuauTableEntry[]
): void {
  const userKeys = new Set<string>();
  for (const entry of userProps) {
    if (entry.key && entry.key.type === "string") {
      userKeys.add(entry.key.value);
    }
  }
  for (const defaultEntry of defaultProps) {
    if (defaultEntry.key && defaultEntry.key.type === "string") {
      if (!userKeys.has(defaultEntry.key.value)) {
        userProps.push(defaultEntry);
      }
    }
  }
}

/** Extract the JSX element from a conditional expression (&&, ternary) for key naming. */
function extractJSXFromConditional(
  expr: ts.Expression
): ts.JsxElement | ts.JsxSelfClosingElement | null {
  let target: ts.Expression | undefined;
  if (
    ts.isBinaryExpression(expr) &&
    expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
  ) {
    target = expr.right;
  } else if (ts.isConditionalExpression(expr)) {
    target = expr.whenTrue;
  }
  if (!target) return null;
  if (ts.isParenthesizedExpression(target)) target = target.expression;
  if (ts.isJsxElement(target) || ts.isJsxSelfClosingElement(target))
    return target;
  return null;
}

function getChildName(
  child: ts.JsxElement | ts.JsxSelfClosingElement,
  idx: number
): string {
  const tag = ts.isJsxElement(child)
    ? child.openingElement.tagName
    : child.tagName;
  const attrs = ts.isJsxElement(child)
    ? child.openingElement.attributes
    : child.attributes;

  if (ts.isIdentifier(tag)) {
    const name = tag.text;
    const capitalized = name.charAt(0).toUpperCase() + name.slice(1);

    // Try to derive a unique name from className (use first class token only)
    for (const attr of attrs.properties) {
      if (
        ts.isJsxAttribute(attr) &&
        attr.name.getText() === "className" &&
        attr.initializer &&
        ts.isStringLiteral(attr.initializer)
      ) {
        const className = attr.initializer.text;
        const firstClass = className.split(/\s+/)[0] ?? "";
        const pascalClassName = firstClass
          .split("-")
          .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
          .join("");
        return pascalClassName
          ? `${pascalClassName}${capitalized}`
          : capitalized;
      }
    }

    return capitalized;
  }
  return `Child${idx + 1}`;
}
