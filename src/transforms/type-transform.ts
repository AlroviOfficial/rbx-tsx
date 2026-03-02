import ts from "typescript";
import type { TransformContext } from "./transform-context.ts";

/**
 * Transform a TypeScript type node to a Luau type annotation string.
 */
export function transformType(
  node: ts.TypeNode,
  ctx: TransformContext
): string {
  // Type predicate: x is Type → boolean
  if (node.kind === ts.SyntaxKind.TypePredicate) return "boolean";

  // string
  if (node.kind === ts.SyntaxKind.StringKeyword) return "string";

  // number
  if (node.kind === ts.SyntaxKind.NumberKeyword) return "number";

  // boolean
  if (node.kind === ts.SyntaxKind.BooleanKeyword) return "boolean";

  // void → ()
  if (node.kind === ts.SyntaxKind.VoidKeyword) return "()";

  // any
  if (node.kind === ts.SyntaxKind.AnyKeyword) return "any";

  // unknown → any (Luau doesn't have unknown)
  if (node.kind === ts.SyntaxKind.UnknownKeyword) return "any";

  // never → any
  if (node.kind === ts.SyntaxKind.NeverKeyword) return "any";

  // null / undefined → nil
  if (
    node.kind === ts.SyntaxKind.NullKeyword ||
    node.kind === ts.SyntaxKind.UndefinedKeyword
  ) {
    return "nil";
  }

  // Type reference (e.g., React.ReactNode, Color3, CustomType)
  if (ts.isTypeReferenceNode(node)) {
    return transformTypeReference(node, ctx);
  }

  // Union type (A | B)
  if (ts.isUnionTypeNode(node)) {
    return transformUnionType(node, ctx);
  }

  // Intersection type (A & B) → flatten to table
  if (ts.isIntersectionTypeNode(node)) {
    // Luau doesn't have intersection types — use any or first type
    const types = node.types.map((t) => transformType(t, ctx));
    return types[0] ?? "any";
  }

  // Array type (T[])
  if (ts.isArrayTypeNode(node)) {
    const elementType = transformType(node.elementType, ctx);
    return `{ ${elementType} }`;
  }

  // Tuple type ([A, B, C])
  if (ts.isTupleTypeNode(node)) {
    // For Luau, treat tuples as arrays of the union
    const types = node.elements.map((e) => {
      if (ts.isNamedTupleMember(e)) {
        return transformType(e.type, ctx);
      }
      return transformType(e as ts.TypeNode, ctx);
    });
    if (types.length === 0) return "{}";
    return `{ ${types.join(" | ")} }`;
  }

  // Function type ((a: string) => void)
  if (ts.isFunctionTypeNode(node)) {
    return transformFunctionType(node, ctx);
  }

  // Object / type literal ({ a: string, b: number })
  if (ts.isTypeLiteralNode(node)) {
    return transformTypeLiteral(node, ctx);
  }

  // Parenthesized type
  if (ts.isParenthesizedTypeNode(node)) {
    return `(${transformType(node.type, ctx)})`;
  }

  // Literal type ("hello", 42, true, false)
  if (ts.isLiteralTypeNode(node)) {
    return transformLiteralType(node);
  }

  // Indexed access type (T[K])
  if (ts.isIndexedAccessTypeNode(node)) {
    // (typeof X)[number] → resolve to string literal union if X is a known const array
    if (node.indexType.kind === ts.SyntaxKind.NumberKeyword) {
      let inner = node.objectType;
      if (ts.isParenthesizedTypeNode(inner)) inner = inner.type;
      if (ts.isTypeQueryNode(inner)) {
        const name = inner.exprName.getText();
        const values = ctx.constArrayValues.get(name);
        if (values) {
          return values.map((s) => `"${s}"`).join(" | ");
        }
      }
    }
    return "any";
  }

  // Conditional type: T extends U ? X : Y → union of X | Y
  if (ts.isConditionalTypeNode(node)) {
    const trueType = transformType(node.trueType, ctx);
    const falseType = transformType(node.falseType, ctx);
    if (trueType === falseType) return trueType;
    return `${trueType} | ${falseType}`;
  }

  // Mapped type: { [K in T]: V } → { [T]: V }
  if (ts.isMappedTypeNode(node)) {
    const constraint = node.typeParameter.constraint;
    const keyType = constraint ? transformType(constraint, ctx) : "string";
    const valueType = node.type ? transformType(node.type, ctx) : "any";
    return `{ [${keyType}]: ${valueType} }`;
  }

  // Template literal type → string
  if (ts.isTemplateLiteralTypeNode(node)) {
    return "string";
  }

  // typeof → any (we can't easily resolve typeof in Luau)
  if (ts.isTypeQueryNode(node)) {
    return "any";
  }

  // keyof → string (or string literal union if we can resolve it)
  if (ts.isTypeOperatorNode(node)) {
    if (node.operator === ts.SyntaxKind.KeyOfKeyword) {
      // keyof typeof X → resolve to key union if X is a known const object
      if (ts.isTypeQueryNode(node.type)) {
        const name = node.type.exprName.getText();
        const keys = ctx.constObjectKeys.get(name);
        if (keys) {
          return keys.map((k) => `"${k}"`).join(" | ");
        }
      }
      return "string";
    }
    if (node.operator === ts.SyntaxKind.ReadonlyKeyword)
      return transformType(node.type, ctx);
    return "any";
  }

  // Rest type → any
  if (ts.isRestTypeNode(node)) {
    return transformType(node.type, ctx);
  }

  // Optional type (used in tuple: [a?: string])
  if (ts.isOptionalTypeNode(node)) {
    return `${transformType(node.type, ctx)}?`;
  }

  // this type → any
  if (node.kind === ts.SyntaxKind.ThisType) return "any";

  return "any";
}

function transformTypeReference(
  node: ts.TypeReferenceNode,
  ctx: TransformContext
): string {
  const typeName = node.typeName.getText();

  // Common mapped types
  switch (typeName) {
    case "Array": {
      const arg = node.typeArguments?.[0];
      const elementType = arg ? transformType(arg, ctx) : "any";
      return `{ ${elementType} }`;
    }

    case "ReadonlyArray": {
      const arg = node.typeArguments?.[0];
      const elementType = arg ? transformType(arg, ctx) : "any";
      return `{ ${elementType} }`;
    }

    case "Record": {
      const keyType = node.typeArguments?.[0]
        ? transformType(node.typeArguments[0], ctx)
        : "string";
      const valType = node.typeArguments?.[1]
        ? transformType(node.typeArguments[1], ctx)
        : "any";
      return `{ [${keyType}]: ${valType} }`;
    }

    case "Map": {
      const keyType = node.typeArguments?.[0]
        ? transformType(node.typeArguments[0], ctx)
        : "any";
      const valType = node.typeArguments?.[1]
        ? transformType(node.typeArguments[1], ctx)
        : "any";
      return `{ [${keyType}]: ${valType} }`;
    }

    case "Set": {
      const valType = node.typeArguments?.[0]
        ? transformType(node.typeArguments[0], ctx)
        : "any";
      return `{ [${valType}]: boolean }`;
    }

    case "Promise":
      return "any"; // Promises don't have a direct Luau type equivalent

    case "Partial": {
      // Partial<T> → T with all fields optional
      // Can't easily express in Luau, just use the inner type
      const arg = node.typeArguments?.[0];
      return arg ? transformType(arg, ctx) : "any";
    }

    case "Required":
    case "Readonly": {
      const arg = node.typeArguments?.[0];
      return arg ? transformType(arg, ctx) : "any";
    }

    case "Pick":
    case "Omit":
    case "Exclude":
    case "Extract":
    case "NonNullable":
    case "ReturnType":
    case "Parameters":
    case "InstanceType":
      return "any";

    case "JSX.Element":
    case "React.ReactNode":
    case "React.ReactElement":
    case "ReactNode":
    case "ReactElement":
      return "React.ReactNode";

    case "React.RefObject":
      return "any"; // Ref types are complex in Luau

    default:
      // Could be a user-defined type or Roblox type — pass through
      return typeName;
  }
}

function transformUnionType(
  node: ts.UnionTypeNode,
  ctx: TransformContext
): string {
  const types = node.types.map((t) => transformType(t, ctx));

  // T | null | undefined → T?
  const nonNil = types.filter((t) => t !== "nil");
  if (nonNil.length < types.length) {
    if (nonNil.length === 1) {
      return `${nonNil[0]}?`;
    }
    return `(${nonNil.join(" | ")})?`;
  }

  return types.join(" | ");
}

function transformFunctionType(
  node: ts.FunctionTypeNode,
  ctx: TransformContext
): string {
  const params = node.parameters.map((p) => {
    const paramType = p.type ? transformType(p.type, ctx) : "any";
    return paramType;
  });
  const returnType = transformType(node.type, ctx);

  if (params.length === 0) {
    return `(() -> ${returnType})`;
  }
  return `((${params.join(", ")}) -> ${returnType})`;
}

function transformTypeLiteral(
  node: ts.TypeLiteralNode,
  ctx: TransformContext
): string {
  const members: string[] = [];

  for (const member of node.members) {
    if (ts.isPropertySignature(member) && member.name) {
      const name = member.name.getText();
      const memberType = member.type ? transformType(member.type, ctx) : "any";
      const optional = member.questionToken ? "?" : "";
      members.push(`${name}: ${memberType}${optional}`);
    } else if (ts.isIndexSignatureDeclaration(member)) {
      const keyType = member.parameters[0]?.type
        ? transformType(member.parameters[0].type, ctx)
        : "string";
      const valueType = member.type ? transformType(member.type, ctx) : "any";
      members.push(`[${keyType}]: ${valueType}`);
    } else if (ts.isMethodSignature(member) && member.name) {
      const name = member.name.getText();
      const params = member.parameters.map((p) => {
        return p.type ? transformType(p.type, ctx) : "any";
      });
      const returnType = member.type ? transformType(member.type, ctx) : "()";
      const optional = member.questionToken ? "?" : "";
      members.push(
        `${name}: ((${params.join(", ")}) -> ${returnType})${optional}`
      );
    }
  }

  if (members.length === 0) return "{}";
  return `{ ${members.join(", ")} }`;
}

function transformLiteralType(node: ts.LiteralTypeNode): string {
  if (node.literal.kind === ts.SyntaxKind.TrueKeyword) return "boolean";
  if (node.literal.kind === ts.SyntaxKind.FalseKeyword) return "boolean";
  if (node.literal.kind === ts.SyntaxKind.NullKeyword) return "nil";
  if (ts.isStringLiteral(node.literal)) return `"${node.literal.text}"`;
  if (ts.isNumericLiteral(node.literal)) return node.literal.text;
  if (ts.isPrefixUnaryExpression(node.literal)) return "number";
  return "any";
}

/**
 * Transform a TypeScript interface declaration to a Luau type definition string.
 */
export function transformInterfaceToLuauType(
  node: ts.InterfaceDeclaration,
  ctx: TransformContext
): string {
  const members: string[] = [];

  for (const member of node.members) {
    if (ts.isPropertySignature(member) && member.name) {
      const name = member.name.getText();
      const memberType = member.type ? transformType(member.type, ctx) : "any";
      const optional = member.questionToken ? "?" : "";
      members.push(`${name}: ${memberType}${optional}`);
    } else if (ts.isIndexSignatureDeclaration(member)) {
      const keyType = member.parameters[0]?.type
        ? transformType(member.parameters[0].type, ctx)
        : "string";
      const valueType = member.type ? transformType(member.type, ctx) : "any";
      members.push(`[${keyType}]: ${valueType}`);
    } else if (ts.isMethodSignature(member) && member.name) {
      const name = member.name.getText();
      const params = member.parameters.map((p) => {
        return p.type ? transformType(p.type, ctx) : "any";
      });
      const returnType = member.type ? transformType(member.type, ctx) : "()";
      const optional = member.questionToken ? "?" : "";
      members.push(
        `${name}: ((${params.join(", ")}) -> ${returnType})${optional}`
      );
    }
  }

  return `{\n    ${members.join(",\n    ")},\n}`;
}

/**
 * Transform a TypeScript type alias to a Luau type definition string.
 */
export function transformTypeAliasToLuauType(
  node: ts.TypeAliasDeclaration,
  ctx: TransformContext
): string {
  return transformType(node.type, ctx);
}
