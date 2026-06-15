import ts from "typescript";
import type { TransformContext } from "./transform-context.ts";

/**
 * Coarse runtime category for an expression, inferred syntactically (this
 * compiler parses a single file with no type-checker, so inference relies on
 * explicit annotations, literals, and tracked declarations).
 *
 * - "object" covers any keyed/dictionary value that is NOT a JS array:
 *   Record, Map, Set, object literals, and `{ ... }` type literals. It is the
 *   one category that suppresses array index `+1` shifting.
 * - "unknown" means we could not determine the type; callers must treat it
 *   conservatively (leave conditions un-coerced, keep the existing index shift).
 */
export type JsType =
  | "number"
  | "string"
  | "boolean"
  | "array"
  | "object"
  | "unknown";

/** Map a TS type node to a coarse JsType. */
export function typeNodeToJsType(
  node: ts.TypeNode | undefined
): JsType {
  if (!node) return "unknown";

  switch (node.kind) {
    case ts.SyntaxKind.NumberKeyword:
      return "number";
    case ts.SyntaxKind.StringKeyword:
      return "string";
    case ts.SyntaxKind.BooleanKeyword:
      return "boolean";
  }

  if (ts.isArrayTypeNode(node) || ts.isTupleTypeNode(node)) return "array";

  if (ts.isTypeReferenceNode(node)) {
    const name = node.typeName.getText();
    if (name === "Array" || name === "ReadonlyArray") return "array";
    if (
      name === "Record" ||
      name === "Map" ||
      name === "ReadonlyMap" ||
      name === "Set" ||
      name === "ReadonlySet" ||
      name === "WeakMap" ||
      name === "WeakSet"
    ) {
      return "object";
    }
    return "unknown";
  }

  if (ts.isTypeLiteralNode(node)) return "object";

  if (ts.isLiteralTypeNode(node)) {
    const lit = node.literal;
    if (ts.isNumericLiteral(lit)) return "number";
    if (ts.isStringLiteral(lit)) return "string";
    if (
      lit.kind === ts.SyntaxKind.TrueKeyword ||
      lit.kind === ts.SyntaxKind.FalseKeyword
    ) {
      return "boolean";
    }
    return "unknown";
  }

  if (ts.isUnionTypeNode(node)) {
    // A nullable union (`number | undefined`) cannot be treated as its base
    // type: nil must remain falsy, so callers leave it un-coerced.
    let result: JsType | null = null;
    for (const member of node.types) {
      if (
        member.kind === ts.SyntaxKind.NullKeyword ||
        member.kind === ts.SyntaxKind.UndefinedKeyword ||
        member.kind === ts.SyntaxKind.VoidKeyword
      ) {
        return "unknown";
      }
      const t = typeNodeToJsType(member);
      if (t === "unknown") return "unknown";
      if (result === null) result = t;
      else if (result !== t) return "unknown";
    }
    return result ?? "unknown";
  }

  return "unknown";
}

const ARITHMETIC_OPS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.MinusToken,
  ts.SyntaxKind.AsteriskToken,
  ts.SyntaxKind.SlashToken,
  ts.SyntaxKind.PercentToken,
  ts.SyntaxKind.AsteriskAsteriskToken,
  ts.SyntaxKind.AmpersandToken,
  ts.SyntaxKind.BarToken,
  ts.SyntaxKind.CaretToken,
  ts.SyntaxKind.LessThanLessThanToken,
  ts.SyntaxKind.GreaterThanGreaterThanToken,
  ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
]);

const BOOLEAN_OPS = new Set<ts.SyntaxKind>([
  ts.SyntaxKind.EqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken,
  ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.LessThanToken,
  ts.SyntaxKind.GreaterThanToken,
  ts.SyntaxKind.LessThanEqualsToken,
  ts.SyntaxKind.GreaterThanEqualsToken,
  ts.SyntaxKind.InstanceOfKeyword,
  ts.SyntaxKind.InKeyword,
]);

/**
 * Infer the coarse runtime category of an expression. Returns "unknown" unless
 * the type can be determined with confidence; importantly, every expression
 * classified as "number" or "string" is side-effect free, so callers may
 * safely duplicate it (needed for the NaN check in truthiness coercion).
 */
export function inferJsType(
  node: ts.Expression,
  ctx: TransformContext
): JsType {
  while (
    ts.isParenthesizedExpression(node) ||
    ts.isNonNullExpression(node)
  ) {
    node = node.expression;
  }

  if (ts.isAsExpression(node)) {
    const t = typeNodeToJsType(node.type);
    if (t !== "unknown") return t;
    return inferJsType(node.expression, ctx);
  }
  if (ts.isSatisfiesExpression(node)) {
    return inferJsType(node.expression, ctx);
  }

  if (ts.isNumericLiteral(node)) return "number";
  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node) ||
    ts.isTemplateExpression(node)
  ) {
    return "string";
  }
  if (
    node.kind === ts.SyntaxKind.TrueKeyword ||
    node.kind === ts.SyntaxKind.FalseKeyword
  ) {
    return "boolean";
  }
  if (ts.isArrayLiteralExpression(node)) return "array";
  if (ts.isObjectLiteralExpression(node)) return "object";

  if (ts.isIdentifier(node)) {
    if (ctx.mapVariables.has(node.text) || ctx.setVariables.has(node.text)) {
      return "object";
    }
    return ctx.localTypes.get(node.text) ?? "unknown";
  }

  if (ts.isPrefixUnaryExpression(node)) {
    switch (node.operator) {
      case ts.SyntaxKind.ExclamationToken:
        return "boolean";
      case ts.SyntaxKind.MinusToken:
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.TildeToken:
      case ts.SyntaxKind.PlusPlusToken:
      case ts.SyntaxKind.MinusMinusToken:
        return "number";
    }
    return "unknown";
  }

  if (ts.isPostfixUnaryExpression(node)) return "number";

  if (ts.isTypeOfExpression(node)) return "string";

  if (ts.isBinaryExpression(node)) {
    const op = node.operatorToken.kind;
    if (op === ts.SyntaxKind.PlusToken) {
      const l = inferJsType(node.left, ctx);
      const r = inferJsType(node.right, ctx);
      if (l === "string" || r === "string") return "string";
      if (l === "number" && r === "number") return "number";
      return "unknown";
    }
    if (ARITHMETIC_OPS.has(op)) return "number";
    if (BOOLEAN_OPS.has(op)) return "boolean";
    return "unknown";
  }

  // `arr.length`, `str.length` → number
  if (
    ts.isPropertyAccessExpression(node) &&
    node.name.text === "length" &&
    !node.questionDotToken
  ) {
    return "number";
  }

  return "unknown";
}
