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

/** Map a resolved `ts.Type` to a coarse JsType. */
function checkerTypeToJsType(type: ts.Type, checker: ts.TypeChecker): JsType {
  // A nullable/optional union (`number | undefined`) cannot be treated as its
  // base type: nil must stay falsy, so leave it un-coerced. This also handles
  // `boolean`, which TypeScript models as the union `true | false`.
  if (type.isUnion()) {
    let result: JsType | null = null;
    for (const member of type.types) {
      if (
        member.flags &
        (ts.TypeFlags.Undefined | ts.TypeFlags.Null | ts.TypeFlags.Void)
      ) {
        return "unknown";
      }
      const t = checkerTypeToJsType(member, checker);
      if (t === "unknown") return "unknown";
      if (result === null) result = t;
      else if (result !== t) return "unknown";
    }
    return result ?? "unknown";
  }

  const flags = type.flags;
  if (flags & (ts.TypeFlags.Number | ts.TypeFlags.NumberLiteral)) return "number";
  if (flags & (ts.TypeFlags.String | ts.TypeFlags.StringLiteral)) return "string";
  if (flags & (ts.TypeFlags.Boolean | ts.TypeFlags.BooleanLiteral)) {
    return "boolean";
  }

  if (isArrayOrTupleType(type)) return "array";

  // Any other object type (Record, Map, Set, interfaces, object literals,
  // functions) is keyed/non-array — suppresses array index shifting.
  if (flags & ts.TypeFlags.Object) return "object";

  return "unknown";
}

/** Detect `T[]`, `Array<T>`, `ReadonlyArray<T>`, and tuple types via the symbol/object flags. */
function isArrayOrTupleType(type: ts.Type): boolean {
  if (!(type.flags & ts.TypeFlags.Object)) return false;
  const objectFlags = (type as ts.ObjectType).objectFlags;
  if (objectFlags & ts.ObjectFlags.Reference) {
    const target = (type as ts.TypeReference).target;
    if (target.objectFlags & ts.ObjectFlags.Tuple) return true;
    const name = target.symbol?.name;
    if (name === "Array" || name === "ReadonlyArray") return true;
  }
  const name = type.symbol?.name;
  return name === "Array" || name === "ReadonlyArray";
}

/**
 * True for expressions that can be safely re-emitted (duplicated) in the
 * output. The checker may resolve impure expressions (e.g. a call) to a
 * number/string, but the NaN-guard truthiness coercion duplicates its operand,
 * so we only promote pure expressions to number/string. Object/array/boolean
 * results are never duplicated, so they need no such gate.
 */
function isDuplicationSafe(node: ts.Expression): boolean {
  switch (node.kind) {
    case ts.SyntaxKind.Identifier:
    case ts.SyntaxKind.ThisKeyword:
    case ts.SyntaxKind.NumericLiteral:
    case ts.SyntaxKind.StringLiteral:
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.NullKeyword:
      return true;
  }
  if (
    ts.isParenthesizedExpression(node) ||
    ts.isNonNullExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isSatisfiesExpression(node)
  ) {
    return isDuplicationSafe(node.expression);
  }
  if (ts.isPropertyAccessExpression(node) && !node.questionDotToken) {
    return isDuplicationSafe(node.expression);
  }
  if (ts.isPrefixUnaryExpression(node)) {
    switch (node.operator) {
      case ts.SyntaxKind.MinusToken:
      case ts.SyntaxKind.PlusToken:
      case ts.SyntaxKind.TildeToken:
      case ts.SyntaxKind.ExclamationToken:
        return isDuplicationSafe(node.operand);
    }
  }
  return false;
}

/** Resolve an expression's coarse type via the checker, or "unknown" if unavailable. */
function inferViaChecker(
  node: ts.Expression,
  checker: ts.TypeChecker
): JsType {
  let type: ts.Type | undefined;
  try {
    type = checker.getTypeAtLocation(node);
  } catch {
    return "unknown";
  }
  if (!type) return "unknown";
  const t = checkerTypeToJsType(type, checker);
  if ((t === "number" || t === "string") && !isDuplicationSafe(node)) {
    return "unknown";
  }
  return t;
}

const MAP_SYMBOLS = new Set(["Map", "ReadonlyMap", "WeakMap"]);
const SET_SYMBOLS = new Set(["Set", "ReadonlySet", "WeakSet"]);

/**
 * Resolve whether an expression is a JS `Map` or `Set` so its methods
 * (`.get`/`.set`/`.has`/`.add`/`.delete`) compile to table operations. Prefers
 * the checker (works for any receiver — params, fields, call results), and
 * falls back to the name-tracked declarations in parse-only mode.
 */
export function inferCollectionKind(
  node: ts.Expression,
  ctx: TransformContext
): "map" | "set" | null {
  while (
    ts.isParenthesizedExpression(node) ||
    ts.isNonNullExpression(node)
  ) {
    node = node.expression;
  }

  if (ctx.checker) {
    let type: ts.Type | undefined;
    try {
      type = ctx.checker.getTypeAtLocation(node);
    } catch {
      type = undefined;
    }
    if (type) {
      const kind = collectionKindFromType(type);
      if (kind) return kind;
    }
  }

  if (ts.isIdentifier(node)) {
    if (ctx.mapVariables.has(node.text)) return "map";
    if (ctx.setVariables.has(node.text)) return "set";
  }
  return null;
}

function collectionKindFromType(type: ts.Type): "map" | "set" | null {
  // Unwrap a nullable union (`Map<...> | undefined`) to its collection member.
  // A union mixing distinct collection kinds (`Map | Set`) is ambiguous → null,
  // so it falls through to a plain method call rather than a wrong translation.
  if (type.isUnion()) {
    let found: "map" | "set" | null = null;
    for (const member of type.types) {
      const kind = collectionKindFromType(member);
      if (!kind) continue;
      if (found && found !== kind) return null;
      found = kind;
    }
    return found;
  }
  const name = type.symbol?.name;
  if (name) {
    if (MAP_SYMBOLS.has(name)) return "map";
    if (SET_SYMBOLS.has(name)) return "set";
  }
  return null;
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

  // Prefer real type resolution when a checker is available; fall back to the
  // syntactic heuristics below when it cannot determine the type or no program
  // was built (parse-only mode).
  if (ctx.checker) {
    const resolved = inferViaChecker(node, ctx.checker);
    if (resolved !== "unknown") return resolved;
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
