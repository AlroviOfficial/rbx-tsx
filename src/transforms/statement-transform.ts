import ts from "typescript";
import type { LuauStatement, LuauExpression, LuauParam } from "../ast/luau-ast.ts";
import {
  ident, str, num, bool, nil, call, methodCall, index, bracketIndex,
  table, binary, unary, ifExpr, funcExpr, concat, raw,
} from "../ast/luau-ast.ts";
import type { TransformContext } from "./transform-context.ts";
import {
  transformExpression,
  transformFunctionExpression,
  transformParameters,
  emitDestructuringStatements,
} from "./expression-transform.ts";
import { transformType, transformInterfaceToLuauType, transformTypeAliasToLuauType } from "./type-transform.ts";

/**
 * Transform a list of TS statements to Luau statements.
 */
export function transformStatements(
  statements: ts.NodeArray<ts.Statement> | ReadonlyArray<ts.Statement>,
  ctx: TransformContext,
): LuauStatement[] {
  const result: LuauStatement[] = [];

  for (const stmt of statements) {
    result.push(...transformStatement(stmt, ctx));
  }

  return result;
}

export function transformStatement(
  node: ts.Statement | ts.Declaration,
  ctx: TransformContext,
): LuauStatement[] {
  // Variable declaration (const/let/var)
  if (ts.isVariableStatement(node)) {
    return transformVariableStatement(node, ctx);
  }

  // Function declaration
  if (ts.isFunctionDeclaration(node)) {
    return transformFunctionDeclaration(node, ctx);
  }

  // Return statement
  if (ts.isReturnStatement(node)) {
    const value = node.expression
      ? transformExpression(node.expression, ctx)
      : undefined;
    return [{ type: "return", value }];
  }

  // If statement
  if (ts.isIfStatement(node)) {
    return [transformIfStatement(node, ctx)];
  }

  // Switch statement
  if (ts.isSwitchStatement(node)) {
    return [transformSwitchStatement(node, ctx)];
  }

  // For statement (C-style)
  if (ts.isForStatement(node)) {
    return [transformForStatement(node, ctx)];
  }

  // For..of
  if (ts.isForOfStatement(node)) {
    return [transformForOfStatement(node, ctx)];
  }

  // For..in
  if (ts.isForInStatement(node)) {
    return [transformForInStatement(node, ctx)];
  }

  // While
  if (ts.isWhileStatement(node)) {
    return [{
      type: "while",
      condition: transformExpression(node.expression, ctx),
      body: transformBlockOrStatement(node.statement, ctx),
    }];
  }

  // Do..while
  if (ts.isDoStatement(node)) {
    return [{
      type: "repeat-until",
      condition: unary("not", transformExpression(node.expression, ctx)),
      body: transformBlockOrStatement(node.statement, ctx),
    }];
  }

  // Expression statement
  if (ts.isExpressionStatement(node)) {
    return transformExpressionStatement(node, ctx);
  }

  // Block
  if (ts.isBlock(node)) {
    return [{
      type: "do-block",
      body: transformStatements(node.statements, ctx),
    }];
  }

  // Break
  if (ts.isBreakStatement(node)) {
    return [{ type: "break" }];
  }

  // Continue
  if (ts.isContinueStatement(node)) {
    return [{ type: "continue" }];
  }

  // Interface declaration
  if (ts.isInterfaceDeclaration(node)) {
    return transformInterfaceDeclaration(node, ctx);
  }

  // Type alias declaration
  if (ts.isTypeAliasDeclaration(node)) {
    return transformTypeAliasDeclaration(node, ctx);
  }

  // Enum declaration
  if (ts.isEnumDeclaration(node)) {
    return transformEnumDeclaration(node, ctx);
  }

  // Import declaration (handled at module level, skip here)
  if (ts.isImportDeclaration(node)) {
    return [];
  }

  // Export declaration (handled at module level, skip here)
  if (ts.isExportDeclaration(node)) {
    return [];
  }

  // Export assignment (export default X)
  if (ts.isExportAssignment(node)) {
    return [];
  }

  // Try/catch
  if (ts.isTryStatement(node)) {
    return transformTryStatement(node, ctx);
  }

  // Throw
  if (ts.isThrowStatement(node)) {
    const expr = node.expression
      ? transformExpression(node.expression, ctx)
      : str("error");
    return [{ type: "expression-statement", expr: call(ident("error"), [expr]) }];
  }

  // Empty statement
  if (ts.isEmptyStatement(node)) {
    return [];
  }

  // Class declaration — not supported for React functional components
  if (ts.isClassDeclaration(node)) {
    ctx.warn("unsupported-syntax", "Class declarations are not supported (functional components only)");
    return [{ type: "comment", text: "unsupported: class declaration" }];
  }

  // Debugger
  if (ts.isDebuggerStatement(node)) {
    return [{ type: "comment", text: "debugger" }];
  }

  // Labeled statement
  if (ts.isLabeledStatement(node)) {
    return transformStatement(node.statement, ctx);
  }

  // With statement — unsupported
  if (node.kind === ts.SyntaxKind.WithStatement) {
    ctx.warn("unsupported-syntax", "'with' statement is not supported");
    return [{ type: "comment", text: "unsupported: with statement" }];
  }

  ctx.warn("unsupported-syntax", `Unsupported statement kind: ${ts.SyntaxKind[node.kind]}`);
  return [{ type: "comment", text: `unsupported: ${ts.SyntaxKind[node.kind]}` }];
}

// ── Variable Statement ──

function transformVariableStatement(
  node: ts.VariableStatement,
  ctx: TransformContext,
): LuauStatement[] {
  const results: LuauStatement[] = [];
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword,
  );

  // Check for var usage
  if (node.declarationList.flags === ts.NodeFlags.None) {
    ctx.warnAtNode("var-declaration", "Use 'const' or 'let' instead of 'var'", node);
  }

  for (const decl of node.declarationList.declarations) {
    // Destructuring pattern
    if (ts.isObjectBindingPattern(decl.name) || ts.isArrayBindingPattern(decl.name)) {
      if (decl.initializer) {
        const initExpr = transformExpression(decl.initializer, ctx);

        // For array destructuring of hook returns like [count, setCount] = useState(0)
        if (ts.isArrayBindingPattern(decl.name) && isHookCall(decl.initializer)) {
          const names = decl.name.elements
            .filter((e) => !ts.isOmittedExpression(e))
            .map((e) => (e as ts.BindingElement).name.getText());
          results.push({
            type: "multi-local",
            names,
            values: [initExpr],
          });
        } else if (ts.isArrayBindingPattern(decl.name)) {
          // General array destructuring
          const tempName = `_temp_${decl.name.pos}`;
          results.push({ type: "local", name: tempName, value: initExpr });
          results.push(...emitDestructuringStatements(decl.name, ident(tempName), ctx));
        } else {
          // Object destructuring — use field access from source
          // If the source is a simple identifier, we can skip the temp var
          if (ts.isIdentifier(decl.initializer)) {
            results.push(...emitDestructuringStatements(decl.name, initExpr, ctx));
          } else {
            const tempName = `_temp_${decl.name.pos}`;
            results.push({ type: "local", name: tempName, value: initExpr });
            results.push(...emitDestructuringStatements(decl.name, ident(tempName), ctx));
          }
        }
      }
    } else {
      // Simple variable
      const name = decl.name.getText();
      const value = decl.initializer
        ? transformExpression(decl.initializer, ctx)
        : undefined;
      const typeAnnotation = decl.type
        ? transformType(decl.type, ctx)
        : undefined;

      results.push({
        type: "local",
        name,
        value,
        typeAnnotation,
      });

      if (isExported) {
        ctx.namedExports.set(name, name);
        ctx.hasNamedExports = true;
      }
    }
  }

  return results;
}

function isHookCall(node: ts.Expression): boolean {
  if (ts.isCallExpression(node)) {
    const callee = node.expression;
    if (ts.isIdentifier(callee)) {
      return callee.text.startsWith("use");
    }
    if (ts.isPropertyAccessExpression(callee)) {
      return callee.name.text.startsWith("use");
    }
  }
  return false;
}

// ── Function Declaration ──

function transformFunctionDeclaration(
  node: ts.FunctionDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  if (!node.name) return [];

  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword,
  );
  const isDefault = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.DefaultKeyword,
  );
  const isAsync = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.AsyncKeyword,
  );

  if (isAsync) {
    ctx.warnAtNode("complex-async", `Async function '${name}' may need manual review`, node);
  }

  // Check for destructured parameters — if the first param is destructured,
  // we need to add destructuring in the body
  const params = transformFunctionParams(node.parameters, ctx);
  const additionalBodyStmts = getDestructuringPreamble(node.parameters, ctx);

  let returnType: string | undefined;
  if (node.type) {
    returnType = transformType(node.type, ctx);
  }

  const innerBody = node.body
    ? [...additionalBodyStmts, ...transformStatements(node.body.statements, ctx)]
    : additionalBodyStmts;

  // Async function: wrap body in Promise.new(function(resolve, reject) ... end)
  let body: LuauStatement[];
  if (isAsync) {
    ctx.needsPromise = true;
    // Replace return statements with resolve() calls
    const promiseBody = innerBody.map((stmt): LuauStatement => {
      if (stmt.type === "return" && stmt.value) {
        return { type: "expression-statement", expr: call(ident("resolve"), [stmt.value]) };
      }
      return stmt;
    });

    body = [{
      type: "return",
      value: call(index(ident("Promise"), "new"), [
        funcExpr(
          [{ name: "resolve" }, { name: "reject" }],
          promiseBody,
        ),
      ]),
    }];
  } else {
    body = innerBody;
  }

  // Add source map info
  let sourceLine: number | undefined;
  let sourceFileStr: string | undefined;
  if (ctx.options.sourcemap && ctx.sourceFile) {
    const pos = node.getStart(ctx.sourceFile);
    const lineAndChar = ts.getLineAndCharacterOfPosition(ctx.sourceFile, pos);
    sourceLine = lineAndChar.line + 1;
    sourceFileStr = ctx.filename;
  }

  const result: LuauStatement[] = [{
    type: "function-decl",
    local: true,
    name,
    params: params,
    body,
    returnType,
    sourceLine,
    sourceFile: sourceFileStr,
  }];

  if (isDefault) {
    ctx.defaultExport = name;
  }
  if (isExported && !isDefault) {
    ctx.namedExports.set(name, name);
    ctx.hasNamedExports = true;
  }

  return result;
}

function transformFunctionParams(
  params: ts.NodeArray<ts.ParameterDeclaration>,
  ctx: TransformContext,
): LuauParam[] {
  return transformParameters(params, ctx);
}

function getDestructuringPreamble(
  params: ts.NodeArray<ts.ParameterDeclaration>,
  ctx: TransformContext,
): LuauStatement[] {
  const stmts: LuauStatement[] = [];

  for (const param of params) {
    if (ts.isObjectBindingPattern(param.name)) {
      stmts.push(...emitDestructuringStatements(param.name, ident("props"), ctx));
    } else if (ts.isArrayBindingPattern(param.name)) {
      stmts.push(...emitDestructuringStatements(param.name, ident("_arr"), ctx));
    } else if (param.initializer) {
      // Default parameter value
      const name = param.name.getText();
      const defaultVal = transformExpression(param.initializer, ctx);
      stmts.push({
        type: "assignment",
        target: ident(name),
        value: ifExpr(binary(ident(name), "~=", nil()), ident(name), defaultVal),
      });
    }
  }

  return stmts;
}

// ── If Statement ──

function transformIfStatement(
  node: ts.IfStatement,
  ctx: TransformContext,
): LuauStatement {
  const condition = transformExpression(node.expression, ctx);
  const body = transformBlockOrStatement(node.thenStatement, ctx);

  let elseIfs: Array<{ condition: LuauExpression; body: LuauStatement[] }> | undefined;
  let elseBody: LuauStatement[] | undefined;

  let current = node.elseStatement;
  while (current) {
    if (ts.isIfStatement(current)) {
      if (!elseIfs) elseIfs = [];
      elseIfs.push({
        condition: transformExpression(current.expression, ctx),
        body: transformBlockOrStatement(current.thenStatement, ctx),
      });
      current = current.elseStatement;
    } else {
      elseBody = transformBlockOrStatement(current, ctx);
      break;
    }
  }

  return {
    type: "if",
    condition,
    body,
    elseIfs,
    elseBody,
  };
}

// ── Switch Statement ──

function transformSwitchStatement(
  node: ts.SwitchStatement,
  ctx: TransformContext,
): LuauStatement {
  const expr = transformExpression(node.expression, ctx);
  const clauses = node.caseBlock.clauses;

  if (clauses.length === 0) {
    return { type: "comment", text: "empty switch" };
  }

  let result: LuauStatement | null = null;
  const elseIfs: Array<{ condition: LuauExpression; body: LuauStatement[] }> = [];
  let defaultBody: LuauStatement[] | undefined;

  for (const clause of clauses) {
    if (ts.isCaseClause(clause)) {
      const caseExpr = transformExpression(clause.expression, ctx);
      const condition = binary(expr, "==", caseExpr);
      const body = transformStatements(clause.statements, ctx)
        .filter((s) => s.type !== "break"); // Remove break statements

      if (!result) {
        result = {
          type: "if",
          condition,
          body,
          elseIfs,
          elseBody: undefined,
        };
      } else {
        elseIfs.push({ condition, body });
      }
    } else {
      // Default clause
      defaultBody = transformStatements(clause.statements, ctx)
        .filter((s) => s.type !== "break");
    }
  }

  if (result) {
    (result as any).elseIfs = elseIfs.length > 0 ? elseIfs : undefined;
    (result as any).elseBody = defaultBody;
  }

  return result ?? { type: "comment", text: "empty switch" };
}

// ── For Statement (C-style) ──

function transformForStatement(
  node: ts.ForStatement,
  ctx: TransformContext,
): LuauStatement {
  // Try to detect simple numeric for: for (let i = 0; i < N; i++)
  if (
    node.initializer &&
    ts.isVariableDeclarationList(node.initializer) &&
    node.initializer.declarations.length === 1 &&
    node.condition &&
    ts.isBinaryExpression(node.condition) &&
    node.incrementor
  ) {
    const decl = node.initializer.declarations[0]!;
    if (ts.isIdentifier(decl.name) && decl.initializer) {
      const varName = decl.name.text;
      const start = transformExpression(decl.initializer, ctx);
      const cond = node.condition;

      // Check for i < N or i <= N
      let end: LuauExpression | undefined;
      if (
        cond.operatorToken.kind === ts.SyntaxKind.LessThanToken &&
        ts.isIdentifier(cond.left) && cond.left.text === varName
      ) {
        end = binary(transformExpression(cond.right, ctx), "-", num(1));
      } else if (
        cond.operatorToken.kind === ts.SyntaxKind.LessThanEqualsToken &&
        ts.isIdentifier(cond.left) && cond.left.text === varName
      ) {
        end = transformExpression(cond.right, ctx);
      } else if (
        cond.operatorToken.kind === ts.SyntaxKind.GreaterThanToken &&
        ts.isIdentifier(cond.left) && cond.left.text === varName
      ) {
        end = binary(transformExpression(cond.right, ctx), "+", num(1));
      }

      if (end) {
        // Detect step
        let step: LuauExpression | undefined;
        if (ts.isPostfixUnaryExpression(node.incrementor)) {
          if (node.incrementor.operator === ts.SyntaxKind.MinusMinusToken) {
            step = num(-1);
          }
          // ++ is default step = 1, no need to specify
        } else if (ts.isPrefixUnaryExpression(node.incrementor)) {
          if (node.incrementor.operator === ts.SyntaxKind.MinusMinusToken) {
            step = num(-1);
          }
        } else if (
          ts.isBinaryExpression(node.incrementor) &&
          node.incrementor.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken
        ) {
          step = transformExpression(node.incrementor.right, ctx);
        } else if (
          ts.isBinaryExpression(node.incrementor) &&
          node.incrementor.operatorToken.kind === ts.SyntaxKind.MinusEqualsToken
        ) {
          step = unary("-", transformExpression(node.incrementor.right, ctx));
        }

        return {
          type: "for-numeric",
          var: varName,
          start,
          end,
          step,
          body: transformBlockOrStatement(node.statement, ctx),
        };
      }
    }
  }

  // Complex for loop → while loop
  const body: LuauStatement[] = [];

  // Initializer
  if (node.initializer) {
    if (ts.isVariableDeclarationList(node.initializer)) {
      for (const decl of node.initializer.declarations) {
        const name = decl.name.getText();
        const value = decl.initializer
          ? transformExpression(decl.initializer, ctx)
          : nil();
        body.push({ type: "local", name, value });
      }
    } else {
      body.push({
        type: "expression-statement",
        expr: transformExpression(node.initializer, ctx),
      });
    }
  }

  const condition = node.condition
    ? transformExpression(node.condition, ctx)
    : bool(true);

  const loopBody = transformBlockOrStatement(node.statement, ctx);

  // Add incrementor at end of loop body
  if (node.incrementor) {
    loopBody.push({
      type: "expression-statement",
      expr: transformExpression(node.incrementor, ctx),
    });
  }

  body.push({
    type: "while",
    condition,
    body: loopBody,
  });

  return { type: "do-block", body };
}

// ── For..of ──

function transformForOfStatement(
  node: ts.ForOfStatement,
  ctx: TransformContext,
): LuauStatement {
  const iterable = transformExpression(node.expression, ctx);

  if (ts.isVariableDeclarationList(node.initializer)) {
    const decl = node.initializer.declarations[0]!;

    if (ts.isIdentifier(decl.name)) {
      return {
        type: "for-in",
        vars: ["_", decl.name.text],
        iterators: [iterable],
        body: transformBlockOrStatement(node.statement, ctx),
      };
    }

    // Destructuring in for..of
    if (ts.isArrayBindingPattern(decl.name) || ts.isObjectBindingPattern(decl.name)) {
      const tempName = "_item";
      const destructStmts = emitDestructuringStatements(decl.name, ident(tempName), ctx);
      const loopBody = [
        ...destructStmts,
        ...transformBlockOrStatement(node.statement, ctx),
      ];
      return {
        type: "for-in",
        vars: ["_", tempName],
        iterators: [iterable],
        body: loopBody,
      };
    }
  }

  return {
    type: "for-in",
    vars: ["_", "_v"],
    iterators: [iterable],
    body: transformBlockOrStatement(node.statement, ctx),
  };
}

// ── For..in ──

function transformForInStatement(
  node: ts.ForInStatement,
  ctx: TransformContext,
): LuauStatement {
  const obj = transformExpression(node.expression, ctx);

  if (ts.isVariableDeclarationList(node.initializer)) {
    const decl = node.initializer.declarations[0]!;
    const varName = decl.name.getText();

    return {
      type: "for-in",
      vars: [varName, "_"],
      iterators: [obj],
      body: transformBlockOrStatement(node.statement, ctx),
    };
  }

  return {
    type: "for-in",
    vars: ["_k", "_v"],
    iterators: [obj],
    body: transformBlockOrStatement(node.statement, ctx),
  };
}

// ── Expression Statement ──

function transformExpressionStatement(
  node: ts.ExpressionStatement,
  ctx: TransformContext,
): LuauStatement[] {
  const expr = node.expression;

  // Handle assignment expressions at statement level
  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
    return [{
      type: "assignment",
      target: transformExpression(expr.left, ctx),
      value: transformExpression(expr.right, ctx),
    }];
  }

  // Logical assignment operators: &&=, ||=, ??=
  if (ts.isBinaryExpression(expr)) {
    if (expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken) {
      const target = transformExpression(expr.left, ctx);
      const value = transformExpression(expr.right, ctx);
      return [{ type: "if", condition: target, body: [{ type: "assignment", target, value }] }];
    }
    if (expr.operatorToken.kind === ts.SyntaxKind.BarBarEqualsToken) {
      const target = transformExpression(expr.left, ctx);
      const value = transformExpression(expr.right, ctx);
      return [{ type: "if", condition: unary("not", target), body: [{ type: "assignment", target, value }] }];
    }
    if (expr.operatorToken.kind === ts.SyntaxKind.QuestionQuestionEqualsToken) {
      const target = transformExpression(expr.left, ctx);
      const value = transformExpression(expr.right, ctx);
      return [{ type: "if", condition: binary(target, "==", nil()), body: [{ type: "assignment", target, value }] }];
    }
  }

  // Compound assignment: +=, -=, *=, /=
  if (ts.isBinaryExpression(expr)) {
    const compoundOps: Partial<Record<ts.SyntaxKind, string>> = {
      [ts.SyntaxKind.PlusEqualsToken]: "+=",
      [ts.SyntaxKind.MinusEqualsToken]: "-=",
      [ts.SyntaxKind.AsteriskEqualsToken]: "*=",
      [ts.SyntaxKind.SlashEqualsToken]: "/=",
      [ts.SyntaxKind.PercentEqualsToken]: "%=",
      [ts.SyntaxKind.AsteriskAsteriskEqualsToken]: "^=",
    };
    const compoundOp = compoundOps[expr.operatorToken.kind];
    if (compoundOp) {
      return [{
        type: "compound-assignment",
        target: transformExpression(expr.left, ctx),
        op: compoundOp,
        value: transformExpression(expr.right, ctx),
      }];
    }

    // String concat assignment: +=  when used with strings → ..=
    if (expr.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken) {
      return [{
        type: "compound-assignment",
        target: transformExpression(expr.left, ctx),
        op: "+=",
        value: transformExpression(expr.right, ctx),
      }];
    }
  }

  // Increment/decrement at statement level
  if (ts.isPostfixUnaryExpression(expr) || ts.isPrefixUnaryExpression(expr)) {
    const operand = transformExpression(expr.operand, ctx);
    const isIncrement =
      expr.operator === ts.SyntaxKind.PlusPlusToken;
    return [{
      type: "compound-assignment",
      target: operand,
      op: isIncrement ? "+=" : "-=",
      value: num(1),
    }];
  }

  // forEach: arr.forEach((item, i) => { ... }) → for i, item in arr do ... end
  if (ts.isCallExpression(expr) && ts.isPropertyAccessExpression(expr.expression)) {
    const method = expr.expression.name.text;
    if (method === "forEach" && expr.arguments.length >= 1) {
      const callback = expr.arguments[0]!;
      const arr = transformExpression(expr.expression.expression, ctx);

      if (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) {
        const params = callback.parameters;
        const itemName = params[0] ? params[0].name.getText() : "_item";
        const indexName = params[1] ? params[1].name.getText() : "_";

        let body: LuauStatement[];
        if (ts.isBlock(callback.body)) {
          body = transformStatements(callback.body.statements, ctx);
        } else {
          body = [{
            type: "expression-statement",
            expr: transformExpression(callback.body as ts.Expression, ctx),
          }];
        }

        return [{
          type: "for-in",
          vars: [indexName, itemName],
          iterators: [arr],
          body,
        }];
      }
    }
  }

  // Delete expression at statement level
  if (ts.isDeleteExpression(expr)) {
    const target = transformExpression(expr.expression, ctx);
    return [{
      type: "assignment",
      target,
      value: nil(),
    }];
  }

  return [{
    type: "expression-statement",
    expr: transformExpression(expr, ctx),
  }];
}

// ── Interface Declaration ──

function transformInterfaceDeclaration(
  node: ts.InterfaceDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword,
  );

  const definition = transformInterfaceToLuauType(node, ctx);

  if (isExported) {
    ctx.typeExports.add(name);
    return [{ type: "export-type-alias", name, definition }];
  }

  return [{ type: "type-alias", name, definition }];
}

// ── Type Alias Declaration ──

function transformTypeAliasDeclaration(
  node: ts.TypeAliasDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword,
  );

  // Check for generics
  if (node.typeParameters && node.typeParameters.length > 0) {
    ctx.warn("generic-erasure", `Generic type parameter on '${name}' erased to 'any'`);
  }

  const definition = transformTypeAliasToLuauType(node, ctx);

  if (isExported) {
    ctx.typeExports.add(name);
    return [{ type: "export-type-alias", name, definition }];
  }

  return [{ type: "type-alias", name, definition }];
}

// ── Enum Declaration ──

function transformEnumDeclaration(
  node: ts.EnumDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword,
  );

  const entries: { key: LuauExpression; value: LuauExpression }[] = [];
  let isStringEnum = false;
  let autoValue = 0;

  for (const member of node.members) {
    const memberName = member.name.getText();

    if (member.initializer) {
      if (ts.isStringLiteral(member.initializer)) {
        isStringEnum = true;
        entries.push({
          key: str(memberName),
          value: str(member.initializer.text),
        });
      } else if (ts.isNumericLiteral(member.initializer)) {
        autoValue = Number(member.initializer.text);
        entries.push({
          key: str(memberName),
          value: num(autoValue),
        });
        autoValue++;
      } else {
        entries.push({
          key: str(memberName),
          value: transformExpression(member.initializer, ctx),
        });
      }
    } else {
      entries.push({
        key: str(memberName),
        value: num(autoValue),
      });
      autoValue++;
    }
  }

  const result: LuauStatement[] = [];

  result.push({
    type: "local",
    name,
    value: table(entries),
  });

  result.push({
    type: "type-alias",
    name,
    definition: isStringEnum ? "string" : "number",
  });

  if (isExported) {
    ctx.namedExports.set(name, name);
    ctx.hasNamedExports = true;
  }

  return result;
}

// ── Try/Catch ──

function transformTryStatement(
  node: ts.TryStatement,
  ctx: TransformContext,
): LuauStatement[] {
  // try { ... } catch (e) { ... } → local ok, err = pcall(function() ... end)
  const tryBody = transformStatements(node.tryBlock.statements, ctx);

  const results: LuauStatement[] = [];

  if (node.catchClause) {
    const errName = node.catchClause.variableDeclaration
      ? node.catchClause.variableDeclaration.name.getText()
      : "_err";
    const catchBody = transformStatements(node.catchClause.block.statements, ctx);

    results.push({
      type: "multi-local",
      names: ["_ok", errName],
      values: [call(ident("pcall"), [funcExpr([], tryBody)])],
    });

    results.push({
      type: "if",
      condition: unary("not", ident("_ok")),
      body: catchBody,
    });
  } else {
    results.push({
      type: "expression-statement",
      expr: call(ident("pcall"), [funcExpr([], tryBody)]),
    });
  }

  if (node.finallyBlock) {
    results.push(...transformStatements(node.finallyBlock.statements, ctx));
  }

  return results;
}

// ── Helpers ──

function transformBlockOrStatement(
  node: ts.Statement,
  ctx: TransformContext,
): LuauStatement[] {
  if (ts.isBlock(node)) {
    return transformStatements(node.statements, ctx);
  }
  return transformStatement(node, ctx);
}
