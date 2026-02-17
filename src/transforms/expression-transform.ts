import ts from "typescript";
import type { LuauExpression, LuauStatement, LuauParam, LuauTableEntry } from "../ast/luau-ast.ts";
import {
  ident, str, num, bool, nil, call, methodCall, index, bracketIndex,
  table, binary, unary, ifExpr, funcExpr, concat, raw,
} from "../ast/luau-ast.ts";
import { ROBLOX_METHODS } from "../mappings/roblox-methods.ts";
import { ROBLOX_SERVICES } from "../mappings/roblox-services.ts";
import { ROBLOX_CONSTRUCTORS } from "../mappings/roblox-constructors.ts";
import type { TransformContext } from "./transform-context.ts";
import { transformType } from "./type-transform.ts";
import { transformJSX } from "./jsx-transform.ts";
import { transformStatements } from "./statement-transform.ts";

export function transformExpression(
  node: ts.Expression,
  ctx: TransformContext,
): LuauExpression {
  // String literal
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return str(node.text);
  }

  // Numeric literal
  if (ts.isNumericLiteral(node)) {
    return num(Number(node.text));
  }

  // Boolean: true/false
  if (node.kind === ts.SyntaxKind.TrueKeyword) return bool(true);
  if (node.kind === ts.SyntaxKind.FalseKeyword) return bool(false);

  // null / undefined → nil
  if (node.kind === ts.SyntaxKind.NullKeyword || node.kind === ts.SyntaxKind.UndefinedKeyword) {
    return nil();
  }

  // Identifier
  if (ts.isIdentifier(node)) {
    return transformIdentifier(node, ctx);
  }

  // Template literal
  if (ts.isTemplateExpression(node)) {
    return transformTemplateLiteral(node, ctx);
  }

  // Binary expression
  if (ts.isBinaryExpression(node)) {
    return transformBinaryExpression(node, ctx);
  }

  // Prefix unary (!, -, +, typeof, void)
  if (ts.isPrefixUnaryExpression(node)) {
    return transformPrefixUnary(node, ctx);
  }

  // Postfix unary (++, --)
  if (ts.isPostfixUnaryExpression(node)) {
    return transformPostfixUnary(node, ctx);
  }

  // Conditional (ternary)
  if (ts.isConditionalExpression(node)) {
    return transformConditional(node, ctx);
  }

  // Arrow function / function expression
  if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
    return transformFunctionExpression(node, ctx);
  }

  // Call expression
  if (ts.isCallExpression(node)) {
    return transformCallExpression(node, ctx);
  }

  // Property access (a.b)
  if (ts.isPropertyAccessExpression(node)) {
    return transformPropertyAccess(node, ctx);
  }

  // Element access (a[b])
  if (ts.isElementAccessExpression(node)) {
    return transformElementAccess(node, ctx);
  }

  // Object literal
  if (ts.isObjectLiteralExpression(node)) {
    return transformObjectLiteral(node, ctx);
  }

  // Array literal
  if (ts.isArrayLiteralExpression(node)) {
    return transformArrayLiteral(node, ctx);
  }

  // Parenthesized expression
  if (ts.isParenthesizedExpression(node)) {
    return transformExpression(node.expression, ctx);
  }

  // New expression (new Instance(), new Color3(), etc.)
  if (ts.isNewExpression(node)) {
    return transformNewExpression(node, ctx);
  }

  // typeof
  if (ts.isTypeOfExpression(node)) {
    return call(ident("typeof"), [transformExpression(node.expression, ctx)]);
  }

  // As expression / type assertion (x as T) — strip the type
  if (ts.isAsExpression(node)) {
    // "as const" → table.freeze
    if (node.type.kind === ts.SyntaxKind.TypeReference) {
      const typeRef = node.type as ts.TypeReferenceNode;
      if (ts.isIdentifier(typeRef.typeName) && typeRef.typeName.text === "const") {
        // Actually TS uses a different node for `as const`
      }
    }
    if (node.type.kind === ts.SyntaxKind.TypeQuery) {
      return transformExpression(node.expression, ctx);
    }
    return transformExpression(node.expression, ctx);
  }

  // Non-null assertion (x!)
  if (ts.isNonNullExpression(node)) {
    return transformExpression(node.expression, ctx);
  }

  // Spread element
  if (ts.isSpreadElement(node)) {
    return transformExpression(node.expression, ctx);
  }

  // void expression → nil
  if (ts.isVoidExpression(node)) {
    return nil();
  }

  // this → self
  if (node.kind === ts.SyntaxKind.ThisKeyword) {
    return ident("self");
  }

  // JSX
  if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node)) {
    return transformJSX(node, ctx);
  }

  // JSX expression (inside curly braces in JSX)
  if (ts.isJsxExpression(node)) {
    if (node.expression) {
      return transformExpression(node.expression, ctx);
    }
    return nil();
  }

  // Regular expression literal — unsupported
  if (ts.isRegularExpressionLiteral(node)) {
    ctx.warnAtNode("unsupported-syntax", "Regular expressions are not supported in Luau; use string.match patterns instead", node);
    return raw(`nil --[[ regex not supported ]]`);
  }

  // Tagged template literal — unsupported
  if (ts.isTaggedTemplateExpression(node)) {
    ctx.warnAtNode("unsupported-syntax", "Tagged template literals are not supported", node);
    return raw(`--[[ unsupported: tagged template ]] nil`);
  }

  // Await expression
  if (ts.isAwaitExpression(node)) {
    ctx.warnAtNode("complex-async", "Async transform may need manual review", node);
    ctx.needsPromise = true;
    // Simple transform: await expr → expr:expect()
    const inner = transformExpression(node.expression, ctx);
    return methodCall(inner, "expect", []);
  }

  // Yield — not supported
  if (ts.isYieldExpression(node)) {
    ctx.warnAtNode("unsupported-syntax", "Yield expressions are not supported", node);
    return raw("--[[ unsupported: yield ]] nil");
  }

  // Delete — not directly supported
  if (ts.isDeleteExpression(node)) {
    // delete obj.prop → obj.prop = nil (handled at statement level)
    return nil();
  }

  // Comma expression
  if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.CommaToken) {
    // Take the last value
    return transformExpression(node.right, ctx);
  }

  // Satisfies expression — strip
  if (ts.isSatisfiesExpression(node)) {
    return transformExpression(node.expression, ctx);
  }

  // Fallback
  ctx.warnAtNode("unsupported-syntax", `Unsupported expression kind: ${ts.SyntaxKind[node.kind]}`, node);
  return raw(`--[[ unsupported: ${ts.SyntaxKind[node.kind]} ]] nil`);
}

// ── Identifier ──

function transformIdentifier(node: ts.Identifier, ctx: TransformContext): LuauExpression {
  const name = node.text;

  // Check for Roblox service references
  if (ROBLOX_SERVICES.has(name) && !ctx.importedModules.has(name)) {
    ctx.requireService(name);
  }

  // undefined → nil
  if (name === "undefined") return nil();

  // NaN → 0/0
  if (name === "NaN") return binary(num(0), "/", num(0));

  // Infinity → math.huge
  if (name === "Infinity") return index(ident("math"), "huge");

  return ident(name);
}

// ── Template Literal ──

function transformTemplateLiteral(
  node: ts.TemplateExpression,
  ctx: TransformContext,
): LuauExpression {
  const parts: LuauExpression[] = [];

  if (node.head.text) {
    parts.push(str(node.head.text));
  }

  for (const span of node.templateSpans) {
    const expr = transformExpression(span.expression, ctx);
    // Wrap in tostring() for safety
    parts.push(call(ident("tostring"), [expr]));

    if (span.literal.text) {
      parts.push(str(span.literal.text));
    }
  }

  if (parts.length === 0) return str("");
  return concat(parts);
}

// ── Binary Expression ──

function transformBinaryExpression(
  node: ts.BinaryExpression,
  ctx: TransformContext,
): LuauExpression {
  const op = node.operatorToken.kind;

  // Nullish coalescing (??)
  if (op === ts.SyntaxKind.QuestionQuestionToken) {
    const left = transformExpression(node.left, ctx);
    const right = transformExpression(node.right, ctx);
    // x ?? null/undefined → just x (nil ?? nil = nil, no-op)
    if (right.type === "nil") return left;
    return ifExpr(binary(left, "~=", nil()), left, right);
  }

  // Logical AND (&&)
  if (op === ts.SyntaxKind.AmpersandAmpersandToken) {
    return binary(
      transformExpression(node.left, ctx),
      "and",
      transformExpression(node.right, ctx),
    );
  }

  // Logical OR (||)
  if (op === ts.SyntaxKind.BarBarToken) {
    return binary(
      transformExpression(node.left, ctx),
      "or",
      transformExpression(node.right, ctx),
    );
  }

  // Strict equality (===) → ==
  if (op === ts.SyntaxKind.EqualsEqualsEqualsToken) {
    return binary(
      transformExpression(node.left, ctx),
      "==",
      transformExpression(node.right, ctx),
    );
  }

  // Strict inequality (!==) → ~=
  if (op === ts.SyntaxKind.ExclamationEqualsEqualsToken) {
    return binary(
      transformExpression(node.left, ctx),
      "~=",
      transformExpression(node.right, ctx),
    );
  }

  // Loose equality (==) → ==
  if (op === ts.SyntaxKind.EqualsEqualsToken) {
    return binary(
      transformExpression(node.left, ctx),
      "==",
      transformExpression(node.right, ctx),
    );
  }

  // Loose inequality (!=) → ~=
  if (op === ts.SyntaxKind.ExclamationEqualsToken) {
    return binary(
      transformExpression(node.left, ctx),
      "~=",
      transformExpression(node.right, ctx),
    );
  }

  // instanceof → unsupported
  if (op === ts.SyntaxKind.InstanceOfKeyword) {
    ctx.warn("unsupported-syntax", "'instanceof' has no Luau equivalent");
    return raw("--[[ instanceof not supported ]] false");
  }

  // in → unsupported as expression (table.find or [] ~= nil)
  if (op === ts.SyntaxKind.InKeyword) {
    const key = transformExpression(node.left, ctx);
    const obj = transformExpression(node.right, ctx);
    return binary(bracketIndex(obj, key), "~=", nil());
  }

  // Standard operators
  const opMap: Partial<Record<ts.SyntaxKind, string>> = {
    [ts.SyntaxKind.PlusToken]: "+",
    [ts.SyntaxKind.MinusToken]: "-",
    [ts.SyntaxKind.AsteriskToken]: "*",
    [ts.SyntaxKind.SlashToken]: "/",
    [ts.SyntaxKind.PercentToken]: "%",
    [ts.SyntaxKind.AsteriskAsteriskToken]: "^",
    [ts.SyntaxKind.LessThanToken]: "<",
    [ts.SyntaxKind.GreaterThanToken]: ">",
    [ts.SyntaxKind.LessThanEqualsToken]: "<=",
    [ts.SyntaxKind.GreaterThanEqualsToken]: ">=",
  };

  const luauOp = opMap[op];
  if (luauOp) {
    // Special case: string + for concatenation is handled via context
    return binary(
      transformExpression(node.left, ctx),
      luauOp,
      transformExpression(node.right, ctx),
    );
  }

  // Assignment operators are handled at the statement level
  // But they can appear in expression context
  if (op === ts.SyntaxKind.EqualsToken) {
    // This is assignment as expression — Luau doesn't support this.
    // Return the right side value
    return transformExpression(node.right, ctx);
  }

  ctx.warn("unsupported-syntax", `Unsupported binary operator: ${ts.SyntaxKind[op]}`);
  return raw(`--[[ unsupported op: ${ts.SyntaxKind[op]} ]] nil`);
}

// ── Prefix Unary ──

function transformPrefixUnary(
  node: ts.PrefixUnaryExpression,
  ctx: TransformContext,
): LuauExpression {
  const operand = transformExpression(node.operand, ctx);

  switch (node.operator) {
    case ts.SyntaxKind.ExclamationToken:
      return unary("not", operand);
    case ts.SyntaxKind.MinusToken:
      return unary("-", operand);
    case ts.SyntaxKind.PlusToken:
      // Unary + is a no-op for numbers, or tonumber
      return call(ident("tonumber"), [operand]);
    case ts.SyntaxKind.TildeToken:
      // Bitwise NOT → bit32.bnot
      return call(index(ident("bit32"), "bnot"), [operand]);
    case ts.SyntaxKind.PlusPlusToken:
      // ++x → x + 1 (as expression)
      return binary(operand, "+", num(1));
    case ts.SyntaxKind.MinusMinusToken:
      // --x → x - 1 (as expression)
      return binary(operand, "-", num(1));
    default:
      return operand;
  }
}

// ── Postfix Unary ──

function transformPostfixUnary(
  node: ts.PostfixUnaryExpression,
  ctx: TransformContext,
): LuauExpression {
  // x++, x-- → returns old value, but in Luau we just return x
  // The side effect (increment) is handled at statement level
  return transformExpression(node.operand, ctx);
}

// ── Conditional (ternary) ──

function transformConditional(
  node: ts.ConditionalExpression,
  ctx: TransformContext,
): LuauExpression {
  return ifExpr(
    transformExpression(node.condition, ctx),
    transformExpression(node.whenTrue, ctx),
    transformExpression(node.whenFalse, ctx),
  );
}

// ── Function Expression / Arrow Function ──

export function transformFunctionExpression(
  node: ts.ArrowFunction | ts.FunctionExpression,
  ctx: TransformContext,
): LuauExpression {
  const params = transformParameters(node.parameters, ctx);
  let returnType: string | undefined;

  if (node.type) {
    returnType = transformType(node.type, ctx);
  }

  let body: LuauStatement[];
  if (ts.isBlock(node.body)) {
    body = transformStatements(node.body.statements, ctx);
  } else {
    // Arrow with expression body: () => expr
    const expr = transformExpression(node.body as ts.Expression, ctx);
    body = [{ type: "return", value: expr }];
  }

  return funcExpr(params, body, returnType);
}

export function transformParameters(
  params: ts.NodeArray<ts.ParameterDeclaration>,
  ctx: TransformContext,
): LuauParam[] {
  const result: LuauParam[] = [];

  for (const param of params) {
    if (ts.isObjectBindingPattern(param.name)) {
      // Destructured parameter: ({ a, b }) → props
      // We'll use "props" as the param name, then destructure in body
      const paramType = param.type ? transformType(param.type, ctx) : undefined;
      result.push({ name: "props", type: paramType });
    } else if (ts.isArrayBindingPattern(param.name)) {
      const paramType = param.type ? transformType(param.type, ctx) : undefined;
      result.push({ name: "_arr", type: paramType });
    } else if (param.dotDotDotToken) {
      result.push({ name: "...", type: param.type ? transformType(param.type, ctx) : undefined });
    } else {
      const name = param.name.getText();
      const paramType = param.type ? transformType(param.type, ctx) : undefined;
      result.push({ name, type: paramType });
    }
  }

  return result;
}

// ── Call Expression ──

function transformCallExpression(
  node: ts.CallExpression,
  ctx: TransformContext,
): LuauExpression {
  const args = node.arguments.map((a) => transformExpression(a, ctx));

  // Optional call: a?.()
  if (node.questionDotToken) {
    const callee = transformExpression(node.expression, ctx);
    return ifExpr(
      binary(callee, "~=", nil()),
      call(callee, args),
      nil(),
    );
  }

  // Special built-in transforms
  if (ts.isPropertyAccessExpression(node.expression)) {
    const special = transformSpecialCallExpression(node, node.expression, args, ctx);
    if (special) return special;
  }

  // Simple identifier calls
  if (ts.isIdentifier(node.expression)) {
    const name = node.expression.text;

    // clsx/classnames → joinClasses() transform
    if (name === "clsx" || name === "classnames") {
      return transformClsxCall(node, ctx);
    }

    return transformSimpleCallExpression(name, args, ctx);
  }

  // Method/property calls
  if (ts.isPropertyAccessExpression(node.expression)) {
    const obj = transformExpression(node.expression.expression, ctx);
    const method = node.expression.name.text;

    // Check if this is a Roblox method call (use : syntax)
    if (ROBLOX_METHODS.has(method)) {
      return methodCall(obj, method, args);
    }

    return call(index(obj, method), args);
  }

  const callee = transformExpression(node.expression, ctx);
  return call(callee, args);
}

function transformSimpleCallExpression(
  name: string,
  args: LuauExpression[],
  ctx: TransformContext,
): LuauExpression {
  switch (name) {
    case "parseInt":
    case "parseFloat":
      return call(ident("tonumber"), args);

    case "String":
      return call(ident("tostring"), args);

    case "Number":
      return call(ident("tonumber"), args);

    case "Boolean":
      // Boolean(x) → not not x
      return unary("not", unary("not", args[0] ?? nil()));

    case "isNaN":
      // isNaN(x) → x ~= x
      return binary(args[0] ?? nil(), "~=", args[0] ?? nil());

    case "isFinite":
      return binary(
        binary(args[0] ?? nil(), "==", args[0] ?? nil()),
        "and",
        binary(args[0] ?? nil(), "~=", index(ident("math"), "huge")),
      );

    case "setTimeout":
      return call(index(ident("task"), "delay"), [
        args[1] ? binary(args[1], "/", num(1000)) : num(0),
        args[0] ?? nil(),
      ]);

    case "clearTimeout":
    case "clearInterval":
      return call(index(ident("task"), "cancel"), args);

    case "require":
      // Keep require as-is (it's Luau require)
      return call(ident("require"), args);

    case "forwardRef":
      ctx.needsReact = true;
      return call(index(ident("React"), "forwardRef"), args);

    case "memo":
      ctx.needsReact = true;
      return call(index(ident("React"), "memo"), args);

    default:
      return call(ident(name), args);
  }
}

function transformClsxCall(
  node: ts.CallExpression,
  ctx: TransformContext,
): LuauExpression {
  ctx.requireHelper("joinClasses");
  const joinArgs: LuauExpression[] = [];

  for (const arg of node.arguments) {
    if (ts.isObjectLiteralExpression(arg)) {
      // {active: isActive} → (isActive and "active" or nil)
      for (const prop of arg.properties) {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const className = prop.name.text;
          const condition = transformExpression(prop.initializer, ctx);
          joinArgs.push(ifExpr(condition, str(className), nil()));
        } else if (ts.isShorthandPropertyAssignment(prop)) {
          const name = prop.name.text;
          joinArgs.push(ifExpr(ident(name), str(name), nil()));
        }
      }
    } else {
      joinArgs.push(transformExpression(arg, ctx));
    }
  }

  return call(ident("joinClasses"), joinArgs);
}

function transformSpecialCallExpression(
  node: ts.CallExpression,
  propAccess: ts.PropertyAccessExpression,
  args: LuauExpression[],
  ctx: TransformContext,
): LuauExpression | null {
  const methodName = propAccess.name.text;
  const objText = propAccess.expression.getText();

  // console.log/warn/error
  if (objText === "console") {
    switch (methodName) {
      case "log":
        return call(ident("print"), args);
      case "warn":
        return call(ident("warn"), args);
      case "error":
        return call(ident("warn"), [str("[ERROR]"), ...args]);
      default:
        return call(ident("print"), args);
    }
  }

  // Math.*
  if (objText === "Math") {
    const mathMap: Record<string, string> = {
      floor: "floor", ceil: "ceil", round: "round", random: "random",
      min: "min", max: "max", abs: "abs", sqrt: "sqrt", pow: "pow",
      sin: "sin", cos: "cos", tan: "tan", asin: "asin", acos: "acos",
      atan: "atan", atan2: "atan2", exp: "exp", log: "log", log10: "log",
      sign: "sign", clamp: "clamp",
    };
    const luauName = mathMap[methodName];
    if (luauName) {
      return call(index(ident("math"), luauName), args);
    }
  }

  // JSON.stringify / JSON.parse
  if (objText === "JSON") {
    if (methodName === "stringify") {
      ctx.requireService("HttpService");
      return methodCall(ident("HttpService"), "JSONEncode", args);
    }
    if (methodName === "parse") {
      ctx.requireService("HttpService");
      return methodCall(ident("HttpService"), "JSONDecode", args);
    }
  }

  // Number.isInteger / Number.isNaN
  if (objText === "Number") {
    if (methodName === "isInteger") {
      ctx.requireHelper("numberIsInteger");
      return call(ident("_numberIsInteger"), args);
    }
    if (methodName === "isNaN") {
      ctx.requireHelper("numberIsNaN");
      return call(ident("_numberIsNaN"), args);
    }
  }

  // Object.keys/values/entries/assign/freeze
  if (objText === "Object") {
    return transformObjectMethod(methodName, args, node, ctx);
  }

  // Array method chaining: arr.map(), arr.filter(), etc.
  const obj = transformExpression(propAccess.expression, ctx);
  const arrayResult = transformArrayMethod(obj, methodName, args, node, ctx);
  if (arrayResult) return arrayResult;

  // String methods
  const stringResult = transformStringMethod(obj, methodName, args, ctx);
  if (stringResult) return stringResult;

  return null;
}

// ── Object methods ──

function transformObjectMethod(
  method: string,
  args: LuauExpression[],
  node: ts.CallExpression,
  ctx: TransformContext,
): LuauExpression {
  switch (method) {
    case "keys": {
      ctx.requireHelper("objectKeys");
      return call(ident("_objectKeys"), args);
    }
    case "values": {
      ctx.requireHelper("objectValues");
      return call(ident("_objectValues"), args);
    }
    case "entries": {
      ctx.requireHelper("objectEntries");
      return call(ident("_objectEntries"), args);
    }
    case "assign": {
      ctx.requireHelper("merge");
      return call(ident("_merge"), args);
    }
    case "freeze": {
      return call(index(ident("table"), "freeze"), args);
    }
    default:
      return call(index(ident("Object"), method), args);
  }
}

// ── Array methods ──

function transformArrayMethod(
  obj: LuauExpression,
  method: string,
  args: LuauExpression[],
  node: ts.CallExpression,
  ctx: TransformContext,
): LuauExpression | null {
  switch (method) {
    case "push":
      return call(index(ident("table"), "insert"), [obj, ...args]);

    case "pop":
      return call(index(ident("table"), "remove"), [obj]);

    case "includes": {
      // If receiver looks like a string, defer to string handler
      if (isLikelyStringResult(obj)) return null;
      return binary(
        call(index(ident("table"), "find"), [obj, args[0] ?? nil()]),
        "~=",
        nil(),
      );
    }

    case "indexOf": {
      // (table.find(arr, x) or 0) - 1
      const find = call(index(ident("table"), "find"), [obj, args[0] ?? nil()]);
      return binary(binary(find, "or", num(0)), "-", num(1));
    }

    case "join":
      return call(index(ident("table"), "concat"), [obj, args[0] ?? str(",")]);

    case "reverse": {
      ctx.requireHelper("arrayReverse");
      return call(ident("_arrayReverse"), [obj]);
    }

    case "sort": {
      // Build: (function() local _s = table.clone(obj); table.sort(_s, cmp?); return _s end)()
      const sortArgs: LuauExpression[] = [ident("_s")];
      if (args.length > 0) {
        // JS comparators return numbers (-1/0/1), Luau expects booleans.
        // Try to convert the comparator to a boolean form.
        const boolComp = node.arguments[0]
          ? transformSortComparator(node.arguments[0], ctx)
          : null;
        sortArgs.push(boolComp ?? args[0]!);
      }
      return call(funcExpr([], [
        { type: "local", name: "_s", value: call(index(ident("table"), "clone"), [obj]) },
        { type: "expression-statement", expr: call(index(ident("table"), "sort"), sortArgs) },
        { type: "return", value: ident("_s") },
      ]), []);
    }

    case "slice": {
      // table.move(arr, start+1, end, 1, {})
      const start = args[0] ?? num(0);
      const end_ = args[1];
      if (end_) {
        return call(index(ident("table"), "move"), [
          obj,
          binary(start, "+", num(1)),
          end_,
          num(1),
          table([]),
        ]);
      }
      return call(index(ident("table"), "move"), [
        obj,
        binary(start, "+", num(1)),
        unary("#", obj),
        num(1),
        table([]),
      ]);
    }

    case "concat": {
      ctx.requireHelper("arrayConcat");
      return call(ident("_arrayConcat"), [obj, ...args]);
    }

    case "forEach": {
      // This is usually used as a statement, but as expression returns nil
      // We'll handle it; the caller should check
      return nil();
    }

    case "map":
    case "filter":
    case "find":
    case "some":
    case "every":
    case "reduce":
    case "findIndex":
      // These are complex and best handled in JSX context or statement context
      // Return a helper call
      ctx.requireHelper(`array_${method}`);
      return call(ident(`_array${capitalize(method)}`), [obj, ...args]);

    case "flat":
      ctx.requireHelper("arrayFlat");
      return call(ident("_arrayFlat"), [obj, args[0] ?? num(1)]);

    case "flatMap":
      ctx.requireHelper("arrayFlatMap");
      return call(ident("_arrayFlatMap"), [obj, args[0] ?? nil()]);

    case "fill":
      ctx.requireHelper("arrayFill");
      return call(ident("_arrayFill"), [obj, ...args]);

    case "splice":
      return call(index(ident("table"), "remove"), [obj, args[0] ?? num(1)]);

    default:
      return null;
  }
}

/** Heuristic: does this expression look like it produces a string? */
function isLikelyStringResult(expr: LuauExpression): boolean {
  if (expr.type === "string") return true;
  if (expr.type === "concat") return true;
  // Result of a string.* call (e.g., string.lower, string.upper)
  if (
    expr.type === "call" &&
    expr.callee.type === "index" &&
    expr.callee.object.type === "identifier" &&
    expr.callee.object.name === "string"
  ) {
    return true;
  }
  // tostring() call
  if (
    expr.type === "call" &&
    expr.callee.type === "identifier" &&
    expr.callee.name === "tostring"
  ) {
    return true;
  }
  return false;
}

// ── Sort comparator transform ──

/**
 * Converts a JS numeric sort comparator to a Luau boolean comparator.
 * JS: (a, b) => a.x - b.x  OR  (a, b) => a.x > b.x ? 1 : -1
 * Luau: function(a, b) return a.x < b.x end
 */
function transformSortComparator(
  node: ts.Expression,
  ctx: TransformContext,
): LuauExpression | null {
  if (!ts.isArrowFunction(node) && !ts.isFunctionExpression(node)) return null;
  if (node.parameters.length !== 2) return null;

  const paramA = node.parameters[0]!.name;
  const paramB = node.parameters[1]!.name;
  if (!ts.isIdentifier(paramA) || !ts.isIdentifier(paramB)) return null;

  const params: LuauParam[] = [{ name: paramA.text }, { name: paramB.text }];

  // Get the body expression
  let bodyExpr: ts.Expression | undefined;
  if (!ts.isBlock(node.body)) {
    bodyExpr = node.body as ts.Expression;
  } else {
    const stmts = node.body.statements;
    if (
      stmts.length === 1 &&
      ts.isReturnStatement(stmts[0]!) &&
      stmts[0]!.expression
    ) {
      bodyExpr = stmts[0]!.expression;
    }
  }
  if (!bodyExpr) return null;

  // Unwrap parens
  while (ts.isParenthesizedExpression(bodyExpr)) {
    bodyExpr = bodyExpr.expression;
  }

  // Pattern 1: condition ? number : number
  if (ts.isConditionalExpression(bodyExpr)) {
    const thenVal = getNumericValue(bodyExpr.whenTrue);
    const elseVal = getNumericValue(bodyExpr.whenFalse);

    if (thenVal !== null && elseVal !== null && ts.isBinaryExpression(bodyExpr.condition)) {
      if (thenVal > 0 && elseVal < 0) {
        // condition ? positive : negative → flip the comparison
        // e.g., a > b ? 1 : -1  →  a < b
        const flipped = flipComparison(bodyExpr.condition, ctx);
        if (flipped) return funcExpr(params, [{ type: "return", value: flipped }]);
      } else if (thenVal < 0 && elseVal > 0) {
        // condition ? negative : positive → keep the comparison
        // e.g., a < b ? -1 : 1  →  a < b
        return funcExpr(params, [{ type: "return", value: transformExpression(bodyExpr.condition, ctx) }]);
      }
    }
  }

  // Pattern 2: left - right  →  left < right
  if (
    ts.isBinaryExpression(bodyExpr) &&
    bodyExpr.operatorToken.kind === ts.SyntaxKind.MinusToken
  ) {
    const left = transformExpression(bodyExpr.left, ctx);
    const right = transformExpression(bodyExpr.right, ctx);
    return funcExpr(params, [{ type: "return", value: binary(left, "<", right) }]);
  }

  return null;
}

/** Extract a numeric constant from a TS expression (handles -1, 0, 1, etc.) */
function getNumericValue(node: ts.Expression): number | null {
  while (ts.isParenthesizedExpression(node)) {
    node = node.expression;
  }
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (
    ts.isPrefixUnaryExpression(node) &&
    node.operator === ts.SyntaxKind.MinusToken &&
    ts.isNumericLiteral(node.operand)
  ) {
    return -Number(node.operand.text);
  }
  return null;
}

/** Flip a comparison operator: > → <, < → >, >= → <=, <= → >= */
function flipComparison(
  node: ts.BinaryExpression,
  ctx: TransformContext,
): LuauExpression | null {
  const flipMap: Partial<Record<ts.SyntaxKind, string>> = {
    [ts.SyntaxKind.GreaterThanToken]: "<",
    [ts.SyntaxKind.LessThanToken]: ">",
    [ts.SyntaxKind.GreaterThanEqualsToken]: "<=",
    [ts.SyntaxKind.LessThanEqualsToken]: ">=",
  };
  const flipped = flipMap[node.operatorToken.kind];
  if (!flipped) return null;

  const left = transformExpression(node.left, ctx);
  const right = transformExpression(node.right, ctx);
  return binary(left, flipped, right);
}

// ── String methods ──

function transformStringMethod(
  obj: LuauExpression,
  method: string,
  args: LuauExpression[],
  ctx: TransformContext,
): LuauExpression | null {
  switch (method) {
    case "toLowerCase":
      return call(index(ident("string"), "lower"), [obj]);

    case "toUpperCase":
      return call(index(ident("string"), "upper"), [obj]);

    case "trim":
      return call(index(ident("string"), "match"), [obj, str("^%s*(.-)%s*$")]);

    case "trimStart":
      return call(index(ident("string"), "match"), [obj, str("^%s*(.*)")]);

    case "trimEnd":
      return call(index(ident("string"), "match"), [obj, str("(.-)%s*$")]);

    case "includes":
      return binary(
        call(index(ident("string"), "find"), [obj, args[0] ?? str(""), num(1), bool(true)]),
        "~=",
        nil(),
      );

    case "startsWith": {
      const pre = args[0] ?? str("");
      return binary(
        call(index(ident("string"), "sub"), [obj, num(1), unary("#", pre)]),
        "==",
        pre,
      );
    }

    case "endsWith": {
      const suf = args[0] ?? str("");
      return binary(
        call(index(ident("string"), "sub"), [obj, unary("-", unary("#", suf))]),
        "==",
        suf,
      );
    }

    case "indexOf": {
      // (string.find(s, sub, 1, true) or 0) - 1
      const find = call(index(ident("string"), "find"), [obj, args[0] ?? str(""), num(1), bool(true)]);
      return binary(binary(find, "or", num(0)), "-", num(1));
    }

    case "slice":
    case "substring": {
      const start = args[0] ?? num(0);
      if (args[1]) {
        return call(index(ident("string"), "sub"), [obj, binary(start, "+", num(1)), args[1]]);
      }
      return call(index(ident("string"), "sub"), [obj, binary(start, "+", num(1))]);
    }

    case "charAt": {
      const idx = args[0] ?? num(0);
      const pos = binary(idx, "+", num(1));
      return call(index(ident("string"), "sub"), [obj, pos, pos]);
    }

    case "charCodeAt": {
      const idx = args[0] ?? num(0);
      const pos = binary(idx, "+", num(1));
      return call(index(ident("string"), "byte"), [obj, pos]);
    }

    case "replace": {
      return call(index(ident("string"), "gsub"), [obj, args[0] ?? str(""), args[1] ?? str(""), num(1)]);
    }

    case "replaceAll": {
      return call(index(ident("string"), "gsub"), [obj, args[0] ?? str(""), args[1] ?? str("")]);
    }

    case "split":
      return call(index(ident("string"), "split"), [obj, args[0] ?? str("")]);

    case "repeat":
      return call(index(ident("string"), "rep"), [obj, args[0] ?? num(1)]);

    case "padStart": {
      const len = args[0] ?? num(0);
      const ch = args[1] ?? str(" ");
      return concat([
        call(index(ident("string"), "rep"), [ch, binary(len, "-", unary("#", obj))]),
        obj,
      ]);
    }

    case "padEnd": {
      const len = args[0] ?? num(0);
      const ch = args[1] ?? str(" ");
      return concat([
        obj,
        call(index(ident("string"), "rep"), [ch, binary(len, "-", unary("#", obj))]),
      ]);
    }

    case "match": {
      return call(index(ident("string"), "match"), [obj, args[0] ?? str("")]);
    }

    case "toString":
      return call(ident("tostring"), [obj]);

    default:
      return null;
  }
}

// ── Property Access ──

function transformPropertyAccess(
  node: ts.PropertyAccessExpression,
  ctx: TransformContext,
): LuauExpression {
  const propName = node.name.text;
  const objText = node.expression.getText();

  // React event pattern: e.target.value → e (value already extracted at call site)
  if (
    propName === "value" &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === "target"
  ) {
    return transformExpression(node.expression.expression, ctx);
  }

  // Math constants
  if (objText === "Math") {
    const mathConstants: Record<string, LuauExpression> = {
      PI: index(ident("math"), "pi"),
      E: raw("math.exp(1)"),
      SQRT2: call(index(ident("math"), "sqrt"), [num(2)]),
      LN2: call(index(ident("math"), "log"), [num(2)]),
      LN10: call(index(ident("math"), "log"), [num(10)]),
      MAX_SAFE_INTEGER: num(2 ** 53 - 1),
      MIN_SAFE_INTEGER: num(-(2 ** 53 - 1)),
    };
    const constant = mathConstants[propName];
    if (constant) return constant;
  }

  // Number constants
  if (objText === "Number") {
    if (propName === "MAX_SAFE_INTEGER") return num(2 ** 53 - 1);
    if (propName === "MIN_SAFE_INTEGER") return num(-(2 ** 53 - 1));
    if (propName === "POSITIVE_INFINITY") return index(ident("math"), "huge");
    if (propName === "NEGATIVE_INFINITY") return unary("-", index(ident("math"), "huge"));
    if (propName === "NaN") return binary(num(0), "/", num(0));
    if (propName === "isInteger") {
      ctx.requireHelper("numberIsInteger");
      return ident("_numberIsInteger");
    }
    if (propName === "isNaN") {
      ctx.requireHelper("numberIsNaN");
      return ident("_numberIsNaN");
    }
  }

  // Array/string .length → #obj
  if (propName === "length") {
    const obj = transformExpression(node.expression, ctx);
    return unary("#", obj);
  }

  // Handle optional chaining
  if (node.questionDotToken) {
    return transformOptionalChain(node, ctx);
  }

  const obj = transformExpression(node.expression, ctx);
  return index(obj, propName);
}

// ── Optional Chaining ──

function transformOptionalChain(
  node: ts.PropertyAccessExpression,
  ctx: TransformContext,
): LuauExpression {
  const obj = transformExpression(node.expression, ctx);
  const propName = node.name.text;

  // a?.b → if a ~= nil then a.b else nil
  return ifExpr(
    binary(obj, "~=", nil()),
    index(obj, propName),
    nil(),
  );
}

// ── Element Access ──

function transformElementAccess(
  node: ts.ElementAccessExpression,
  ctx: TransformContext,
): LuauExpression {
  const obj = transformExpression(node.expression, ctx);
  const argExpr = node.argumentExpression;

  // Optional element access: a?.[b]
  if (node.questionDotToken) {
    const idx = transformExpression(argExpr, ctx);
    return ifExpr(
      binary(obj, "~=", nil()),
      bracketIndex(obj, idx),
      nil(),
    );
  }

  // Numeric literal index: arr[0] → arr[1] (0-to-1 based adjustment)
  if (ts.isNumericLiteral(argExpr)) {
    const n = Number(argExpr.text);
    return bracketIndex(obj, num(n + 1));
  }

  // Variable index (likely numeric): arr[i] → arr[i + 1]
  if (ts.isIdentifier(argExpr)) {
    const idx = transformExpression(argExpr, ctx);
    return bracketIndex(obj, binary(idx, "+", num(1)));
  }

  // String literal keys and other expressions: no adjustment
  const idx = transformExpression(argExpr, ctx);
  return bracketIndex(obj, idx);
}

// ── Object Literal ──

function transformObjectLiteral(
  node: ts.ObjectLiteralExpression,
  ctx: TransformContext,
): LuauExpression {
  const entries: LuauTableEntry[] = [];

  for (const prop of node.properties) {
    if (ts.isPropertyAssignment(prop)) {
      const key = getPropertyKey(prop.name, ctx);
      const value = transformExpression(prop.initializer, ctx);
      entries.push({ key, value });
    } else if (ts.isShorthandPropertyAssignment(prop)) {
      // { x } → { x = x }
      const name = prop.name.text;
      entries.push({ key: str(name), value: ident(name) });
    } else if (ts.isSpreadAssignment(prop)) {
      // { ...obj } → handled via merge helper at the expression level
      // For now, we'll need the merge helper
      // This is complex; we'll handle multi-spread objects specially
      ctx.requireHelper("merge");
      // Return a merge call instead
      return buildSpreadObject(node, ctx);
    } else if (ts.isMethodDeclaration(prop)) {
      const key = getPropertyKey(prop.name!, ctx);
      const params = transformParameters(prop.parameters, ctx);
      const body = prop.body
        ? transformStatements(prop.body.statements, ctx)
        : [];
      entries.push({ key, value: funcExpr(params, body) });
    }
  }

  return table(entries);
}

function buildSpreadObject(
  node: ts.ObjectLiteralExpression,
  ctx: TransformContext,
): LuauExpression {
  ctx.requireHelper("merge");
  const args: LuauExpression[] = [];
  let currentEntries: LuauTableEntry[] = [];

  for (const prop of node.properties) {
    if (ts.isSpreadAssignment(prop)) {
      // Flush current entries as a table
      if (currentEntries.length > 0) {
        args.push(table(currentEntries));
        currentEntries = [];
      }
      args.push(transformExpression(prop.expression, ctx));
    } else if (ts.isPropertyAssignment(prop)) {
      const key = getPropertyKey(prop.name, ctx);
      const value = transformExpression(prop.initializer, ctx);
      currentEntries.push({ key, value });
    } else if (ts.isShorthandPropertyAssignment(prop)) {
      const name = prop.name.text;
      currentEntries.push({ key: str(name), value: ident(name) });
    }
  }

  if (currentEntries.length > 0) {
    args.push(table(currentEntries));
  }

  if (args.length === 1) return args[0]!;
  return call(ident("_merge"), args);
}

function getPropertyKey(name: ts.PropertyName, ctx: TransformContext): LuauExpression {
  if (ts.isIdentifier(name)) return str(name.text);
  if (ts.isStringLiteral(name)) return str(name.text);
  if (ts.isNumericLiteral(name)) return num(Number(name.text));
  if (ts.isComputedPropertyName(name)) return transformExpression(name.expression, ctx);
  return str(name.getText());
}

// ── Array Literal ──

function transformArrayLiteral(
  node: ts.ArrayLiteralExpression,
  ctx: TransformContext,
): LuauExpression {
  const hasSpread = node.elements.some(ts.isSpreadElement);

  if (!hasSpread) {
    const entries: LuauTableEntry[] = node.elements.map((el) => ({
      value: transformExpression(el, ctx),
    }));
    return table(entries);
  }

  // Array with spread: [...a, ...b, c]
  // Use table.clone + table.move pattern
  return buildSpreadArray(node, ctx);
}

function buildSpreadArray(
  node: ts.ArrayLiteralExpression,
  ctx: TransformContext,
): LuauExpression {
  ctx.requireHelper("arrayConcat");
  const args: LuauExpression[] = [];
  let currentElements: LuauExpression[] = [];

  for (const el of node.elements) {
    if (ts.isSpreadElement(el)) {
      if (currentElements.length > 0) {
        args.push(table(currentElements.map((v) => ({ value: v }))));
        currentElements = [];
      }
      args.push(transformExpression(el.expression, ctx));
    } else {
      currentElements.push(transformExpression(el, ctx));
    }
  }

  if (currentElements.length > 0) {
    args.push(table(currentElements.map((v) => ({ value: v }))));
  }

  if (args.length === 1) return args[0]!;
  return call(ident("_arrayConcat"), args);
}

// ── New Expression ──

function transformNewExpression(
  node: ts.NewExpression,
  ctx: TransformContext,
): LuauExpression {
  const args = node.arguments?.map((a) => transformExpression(a, ctx)) ?? [];

  if (ts.isIdentifier(node.expression)) {
    const name = node.expression.text;

    // Instance.new is special
    if (name === "Instance") {
      return call(index(ident("Instance"), "new"), args);
    }

    // Roblox constructors: new Color3() → Color3.new()
    if (ROBLOX_CONSTRUCTORS.has(name)) {
      return call(index(ident(name), "new"), args);
    }

    // Map → table (basic support)
    if (name === "Map" || name === "Set") {
      return table([]);
    }

    // Default: X.new(args)
    return call(index(ident(name), "new"), args);
  }

  // new a.B() → a.B.new()
  const callee = transformExpression(node.expression, ctx);
  return call(index(callee, "new"), args);
}

// ── Destructuring helpers ──

export function emitDestructuringStatements(
  pattern: ts.BindingPattern,
  source: LuauExpression,
  ctx: TransformContext,
): LuauStatement[] {
  const stmts: LuauStatement[] = [];

  if (ts.isObjectBindingPattern(pattern)) {
    const restElement = pattern.elements.find((e) => e.dotDotDotToken);
    const namedElements = pattern.elements.filter((e) => !e.dotDotDotToken);

    for (const element of namedElements) {
      const propName = element.propertyName
        ? (ts.isIdentifier(element.propertyName) ? element.propertyName.text : element.propertyName.getText())
        : (ts.isIdentifier(element.name) ? element.name.getText() : "");

      let value: LuauExpression = index(source, propName);

      // Default value
      if (element.initializer) {
        const defaultVal = transformExpression(element.initializer, ctx);
        value = ifExpr(binary(value, "~=", nil()), value, defaultVal);
      }

      // Nested destructuring: { a: { b, c } } = obj
      if (ts.isObjectBindingPattern(element.name) || ts.isArrayBindingPattern(element.name)) {
        const tempName = `_dest_${propName}`;
        stmts.push({ type: "local", name: tempName, value });
        stmts.push(...emitDestructuringStatements(element.name, ident(tempName), ctx));
      } else {
        const localName = ts.isIdentifier(element.name) ? element.name.getText() : propName;
        stmts.push({ type: "local", name: localName, value });
      }
    }

    // Rest element: { ...rest } = obj
    if (restElement && ts.isIdentifier(restElement.name)) {
      const restName = restElement.name.text;
      stmts.push({
        type: "local",
        name: restName,
        value: call(index(ident("table"), "clone"), [source]),
      });
      for (const element of namedElements) {
        const propName = element.propertyName
          ? (ts.isIdentifier(element.propertyName) ? element.propertyName.text : element.propertyName.getText())
          : (ts.isIdentifier(element.name) ? element.name.getText() : "");
        stmts.push({
          type: "assignment",
          target: index(ident(restName), propName),
          value: nil(),
        });
      }
    }
  } else if (ts.isArrayBindingPattern(pattern)) {
    const restElement = pattern.elements.find(
      (e) => !ts.isOmittedExpression(e) && (e as ts.BindingElement).dotDotDotToken,
    );

    let idx = 1;
    for (const element of pattern.elements) {
      if (ts.isOmittedExpression(element)) {
        idx++;
        continue;
      }
      if (element.dotDotDotToken) break;

      let value: LuauExpression = bracketIndex(source, num(idx));

      if (element.initializer) {
        const defaultVal = transformExpression(element.initializer, ctx);
        value = ifExpr(binary(value, "~=", nil()), value, defaultVal);
      }

      // Nested destructuring: [[x, y], z] = matrix
      if (ts.isObjectBindingPattern(element.name) || ts.isArrayBindingPattern(element.name)) {
        const tempName = `_dest_${idx}`;
        stmts.push({ type: "local", name: tempName, value });
        stmts.push(...emitDestructuringStatements(element.name, ident(tempName), ctx));
      } else {
        const localName = ts.isIdentifier(element.name) ? element.name.getText() : `_${idx}`;
        stmts.push({ type: "local", name: localName, value });
      }
      idx++;
    }

    // Rest element
    if (restElement && !ts.isOmittedExpression(restElement) && ts.isIdentifier(restElement.name)) {
      stmts.push({
        type: "local",
        name: restElement.name.text,
        value: call(index(ident("table"), "move"), [
          source,
          num(idx),
          unary("#", source),
          num(1),
          table([]),
        ]),
      });
    }
  }

  return stmts;
}

// ── Utility ──

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Quick-and-dirty expression to string (for raw code generation in complex cases) */
function emitExprQuick(expr: LuauExpression): string {
  // This is a simplified version — for use in raw() code only
  switch (expr.type) {
    case "identifier": return expr.name;
    case "string": return `"${expr.value}"`;
    case "number": return String(expr.value);
    case "nil": return "nil";
    case "boolean": return String(expr.value);
    default: return "...";
  }
}
