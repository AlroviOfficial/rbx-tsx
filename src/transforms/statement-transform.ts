import ts from "typescript";
import type {
  LuauStatement,
  LuauExpression,
  LuauParam,
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
  concat,
  raw,
} from "../ast/luau-ast.ts";
import type { TransformContext } from "./transform-context.ts";
import {
  transformExpression,
  transformFunctionExpression,
  transformParameters,
  emitDestructuringStatements,
} from "./expression-transform.ts";
import {
  transformType,
  transformInterfaceToLuauType,
  transformTypeAliasToLuauType,
} from "./type-transform.ts";

/**
 * Transform a list of TS statements to Luau statements.
 */
export function transformStatements(
  statements: ts.NodeArray<ts.Statement> | ReadonlyArray<ts.Statement>,
  ctx: TransformContext
): LuauStatement[] {
  const result: LuauStatement[] = [];

  for (const stmt of statements) {
    const stmts = transformStatement(stmt, ctx);
    const pre = ctx.flushPreStatements();
    result.push(...pre, ...stmts);
  }

  return result;
}

export function transformStatement(
  node: ts.Statement | ts.Declaration,
  ctx: TransformContext
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
    return [
      {
        type: "while",
        condition: transformExpression(node.expression, ctx),
        body: transformBlockOrStatement(node.statement, ctx),
      },
    ];
  }

  // Do..while
  if (ts.isDoStatement(node)) {
    return [
      {
        type: "repeat-until",
        condition: unary("not", transformExpression(node.expression, ctx)),
        body: transformBlockOrStatement(node.statement, ctx),
      },
    ];
  }

  // Expression statement
  if (ts.isExpressionStatement(node)) {
    return transformExpressionStatement(node, ctx);
  }

  // Block
  if (ts.isBlock(node)) {
    return [
      {
        type: "do-block",
        body: transformStatements(node.statements, ctx),
      },
    ];
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
    return [
      { type: "expression-statement", expr: call(ident("error"), [expr]) },
    ];
  }

  // Empty statement
  if (ts.isEmptyStatement(node)) {
    return [];
  }

  // Class declaration
  if (ts.isClassDeclaration(node)) {
    return transformClassDeclaration(node, ctx);
  }

  // Namespace / module declaration (namespace Foo { } or module Foo { })
  if (ts.isModuleDeclaration(node)) {
    return transformNamespaceDeclaration(node, ctx);
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

  ctx.warn(
    "unsupported-syntax",
    `Unsupported statement kind: ${ts.SyntaxKind[node.kind]}`
  );
  return [
    { type: "comment", text: `unsupported: ${ts.SyntaxKind[node.kind]}` },
  ];
}

// ── Namespace / Module Declaration ──

function transformNamespaceDeclaration(
  node: ts.ModuleDeclaration,
  ctx: TransformContext
): LuauStatement[] {
  // Skip ambient modules: declare module "path" { }
  if (ts.isStringLiteral(node.name)) {
    ctx.warnAtNode(
      "unsupported-syntax",
      "Ambient module declarations are not supported",
      node
    );
    return [{ type: "comment", text: "unsupported: ambient module" }];
  }
  if (!node.body || !ts.isModuleBlock(node.body)) {
    return [];
  }

  const name = node.name.text;
  const parentPrefix = ctx.namespacePrefix;
  const nsExpr = parentPrefix
    ? index(parentPrefix, name)
    : ident(name);

  const results: LuauStatement[] = [];

  // Merge support: Foo = Foo or {} (or Foo.Bar = Foo.Bar or {} for nested)
  if (parentPrefix) {
    results.push({
      type: "assignment",
      target: nsExpr,
      value: binary(nsExpr, "or", table([])),
    });
  } else {
    results.push({
      type: "local",
      name,
      value: binary(ident(name), "or", table([])),
    });
  }

  const prevPrefix = ctx.namespacePrefix;
  ctx.namespacePrefix = nsExpr;

  for (const stmt of node.body.statements) {
    const stmts = transformStatement(stmt, ctx);
    const pre = ctx.flushPreStatements();
    results.push(...pre, ...stmts);
  }

  ctx.namespacePrefix = prevPrefix;
  return results;
}

// ── Variable Statement ──

function transformVariableStatement(
  node: ts.VariableStatement,
  ctx: TransformContext
): LuauStatement[] {
  const results: LuauStatement[] = [];
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword
  );

  // Check for var usage
  if (node.declarationList.flags === ts.NodeFlags.None) {
    ctx.warnAtNode(
      "var-declaration",
      "Use 'const' or 'let' instead of 'var'",
      node
    );
  }

  for (const decl of node.declarationList.declarations) {
    // Destructuring pattern
    if (
      ts.isObjectBindingPattern(decl.name) ||
      ts.isArrayBindingPattern(decl.name)
    ) {
      if (decl.initializer) {
        const initExpr = transformExpression(decl.initializer, ctx);

        // For array destructuring of hook returns like [count, setCount] = useState(0)
        if (
          ts.isArrayBindingPattern(decl.name) &&
          isHookCall(decl.initializer)
        ) {
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
          results.push(
            ...emitDestructuringStatements(decl.name, ident(tempName), ctx)
          );
        } else {
          // Object destructuring — use field access from source
          // If the source is a simple identifier, we can skip the temp var
          if (ts.isIdentifier(decl.initializer)) {
            results.push(
              ...emitDestructuringStatements(decl.name, initExpr, ctx)
            );
          } else {
            const tempName = `_temp_${decl.name.pos}`;
            results.push({ type: "local", name: tempName, value: initExpr });
            results.push(
              ...emitDestructuringStatements(decl.name, ident(tempName), ctx)
            );
          }
        }
      }
    } else {
      // Simple variable
      const name = decl.name.getText();
      const rawInit = decl.initializer;
      const isGenericArrow =
        rawInit &&
        ts.isIdentifier(decl.name) &&
        (ts.isArrowFunction(rawInit) || ts.isFunctionExpression(rawInit)) &&
        rawInit.typeParameters &&
        rawInit.typeParameters.length > 0;

      if (isGenericArrow) {
        const fn = rawInit as ts.ArrowFunction | ts.FunctionExpression;
        const typeParams = fn.typeParameters!.map((p) => p.name.getText());
        const params = transformParameters(fn.parameters, ctx);
        const returnType = fn.type
          ? transformType(fn.type, ctx)
          : undefined;
        const additionalBodyStmts = getDestructuringPreamble(fn.parameters, ctx);
        let body: LuauStatement[];
        if (ts.isBlock(fn.body)) {
          body = [
            ...additionalBodyStmts,
            ...transformStatements(fn.body.statements, ctx),
          ];
        } else {
          const expr = transformExpression(fn.body as ts.Expression, ctx);
          const pre = ctx.flushPreStatements();
          body = [...additionalBodyStmts, ...pre, { type: "return", value: expr }];
        }
        results.push({
          type: "function-decl",
          local: !ctx.namespacePrefix,
          name,
          params,
          body,
          returnType,
          typeParams,
          ...(ctx.namespacePrefix && { tablePrefix: ctx.namespacePrefix }),
        });
      } else {
        const value = rawInit
          ? transformExpression(rawInit, ctx)
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
        if (ctx.namespacePrefix) {
          results.push({
            type: "assignment",
            target: index(ctx.namespacePrefix, name),
            value: ident(name),
          });
        }
      }

      // Track Map/Set variables for method → table operation transforms
      if (decl.type && ts.isTypeReferenceNode(decl.type)) {
        const typeName = decl.type.typeName.getText();
        if (typeName === "Map") ctx.mapVariables.add(name);
        if (typeName === "Set") ctx.setVariables.add(name);
      }
      let initForTracking = rawInit;
      if (initForTracking && ts.isAsExpression(initForTracking))
        initForTracking = (initForTracking as ts.AsExpression).expression;
      if (
        initForTracking &&
        ts.isNewExpression(initForTracking) &&
        ts.isIdentifier(initForTracking.expression)
      ) {
        const ctorName = initForTracking.expression.text;
        if (ctorName === "Map") ctx.mapVariables.add(name);
        if (ctorName === "Set") ctx.setVariables.add(name);
      }

      // Track const arrays with string literal elements for type resolution
      if (initForTracking && ts.isArrayLiteralExpression(initForTracking)) {
        const strings: string[] = [];
        let allStrings = true;
        for (const elem of initForTracking.elements) {
          if (ts.isStringLiteral(elem)) {
            strings.push(elem.text);
          } else {
            allStrings = false;
            break;
          }
        }
        if (allStrings && strings.length > 0) {
          ctx.constArrayValues.set(name, strings);
        }
      }

      // Track object literal declarations for keyof typeof resolution
      if (initForTracking && ts.isObjectLiteralExpression(initForTracking)) {
        const keys: string[] = [];
        for (const prop of initForTracking.properties) {
          if (ts.isPropertyAssignment(prop)) {
            if (ts.isIdentifier(prop.name)) {
              keys.push(prop.name.text);
            } else if (ts.isStringLiteral(prop.name)) {
              keys.push(prop.name.text);
            }
          }
        }
        if (keys.length > 0) {
          ctx.constObjectKeys.set(name, keys);
        }
      }

      // Auto-attach pending CSS stylesheets when createRoot(container) is found
      if (
        decl.initializer &&
        isCreateRootCall(decl.initializer) &&
        ctx.pendingStylesheets.length > 0
      ) {
        const containerArg = (decl.initializer as ts.CallExpression)
          .arguments[0];
        if (containerArg) {
          const containerExpr = transformExpression(containerArg, ctx);
          for (let i = 0; i < ctx.pendingStylesheets.length; i++) {
            const stylePath = ctx.pendingStylesheets[i];
            const sheetVar = `_styleSheet${i > 0 ? i : ""}`;
            const linkVar = `_styleLink${i > 0 ? i : ""}`;
            // local _styleSheet = require(path)()
            results.push({
              type: "local",
              name: sheetVar,
              value: call(call(ident("require"), [raw(stylePath ?? "")]), []),
            });
            // _styleSheet.Parent = container.Parent (avoid React-managed container)
            results.push({
              type: "assignment",
              target: index(ident(sheetVar), "Parent"),
              value: index(containerExpr, "Parent"),
            });
            // local _styleLink = Instance.new("StyleLink")
            results.push({
              type: "local",
              name: linkVar,
              value: call(index(ident("Instance"), "new"), [str("StyleLink")]),
            });
            // _styleLink.StyleSheet = _styleSheet
            results.push({
              type: "assignment",
              target: index(ident(linkVar), "StyleSheet"),
              value: ident(sheetVar),
            });
            // _styleLink.Parent = container.Parent (avoid React-managed container)
            results.push({
              type: "assignment",
              target: index(ident(linkVar), "Parent"),
              value: index(containerExpr, "Parent"),
            });
          }
          ctx.pendingStylesheets.length = 0;
        }
      }

      if (isExported) {
        ctx.namedExports.set(name, name);
        ctx.hasNamedExports = true;
      }
    }
  }

  return results;
}

function isCreateRootCall(node: ts.Expression): boolean {
  if (!ts.isCallExpression(node)) return false;
  const callee = node.expression;
  if (ts.isIdentifier(callee)) return callee.text === "createRoot";
  if (ts.isPropertyAccessExpression(callee))
    return callee.name.text === "createRoot";
  return false;
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
  ctx: TransformContext
): LuauStatement[] {
  if (!node.name) return [];

  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword
  );
  const isDefault = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.DefaultKeyword
  );
  const isAsync = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.AsyncKeyword
  );

  if (isAsync) {
    ctx.warnAtNode(
      "complex-async",
      `Async function '${name}' may need manual review`,
      node
    );
  }

  // Check for destructured parameters — if the first param is destructured,
  // we need to add destructuring in the body
  const params = transformFunctionParams(node.parameters, ctx);
  const additionalBodyStmts = getDestructuringPreamble(node.parameters, ctx);
  const typeParams =
    node.typeParameters?.map((p) => p.name.getText()) ?? undefined;

  let returnType: string | undefined;
  if (node.type) {
    returnType = transformType(node.type, ctx);
  }

  const isGenerator = !!node.asteriskToken;

  const prevGenerator = ctx.isGenerator;
  if (isGenerator) ctx.isGenerator = true;

  const innerBody = node.body
    ? [
        ...additionalBodyStmts,
        ...transformStatements(node.body.statements, ctx),
      ]
    : additionalBodyStmts;

  if (isGenerator) ctx.isGenerator = prevGenerator;

  // Generator: wrap body in coroutine.wrap and return the iterator
  let body: LuauStatement[];
  if (isGenerator) {
    body = [
      {
        type: "return",
        value: call(index(ident("coroutine"), "wrap"), [
          funcExpr([], innerBody),
        ]),
      },
    ];
  } else if (isAsync) {
    ctx.needsPromise = true;
    // Replace return statements with resolve() calls (recursively through all blocks)
    const promiseBody = rewriteReturnsToResolve(innerBody);

    body = [
      {
        type: "return",
        value: call(index(ident("Promise"), "new"), [
          funcExpr([{ name: "resolve" }, { name: "reject" }], promiseBody),
        ]),
      },
    ];
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

  const result: LuauStatement[] = [
    {
      type: "function-decl",
      local: !ctx.namespacePrefix,
      name,
      params,
      body,
      returnType,
      ...(typeParams && typeParams.length > 0 && { typeParams }),
      sourceLine,
      sourceFile: sourceFileStr,
      ...(ctx.namespacePrefix && { tablePrefix: ctx.namespacePrefix }),
    },
  ];

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
  ctx: TransformContext
): LuauParam[] {
  return transformParameters(params, ctx);
}

function getDestructuringPreamble(
  params: ts.NodeArray<ts.ParameterDeclaration>,
  ctx: TransformContext
): LuauStatement[] {
  const stmts: LuauStatement[] = [];

  for (const param of params) {
    if (ts.isObjectBindingPattern(param.name)) {
      stmts.push(
        ...emitDestructuringStatements(param.name, ident("props"), ctx)
      );
    } else if (ts.isArrayBindingPattern(param.name)) {
      stmts.push(
        ...emitDestructuringStatements(param.name, ident("_arr"), ctx)
      );
    } else if (param.initializer) {
      // Default parameter value
      const name = param.name.getText();
      const defaultVal = transformExpression(param.initializer, ctx);
      stmts.push({
        type: "assignment",
        target: ident(name),
        value: ifExpr(
          binary(ident(name), "~=", nil()),
          ident(name),
          defaultVal
        ),
      });
    }
  }

  return stmts;
}

// ── If Statement ──

function transformIfStatement(
  node: ts.IfStatement,
  ctx: TransformContext
): LuauStatement {
  const condition = transformExpression(node.expression, ctx);
  const body = transformBlockOrStatement(node.thenStatement, ctx);

  let elseIfs:
    | Array<{ condition: LuauExpression; body: LuauStatement[] }>
    | undefined;
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
  ctx: TransformContext
): LuauStatement {
  const expr = transformExpression(node.expression, ctx);
  const clauses = node.caseBlock.clauses;

  if (clauses.length === 0) {
    return { type: "comment", text: "empty switch" };
  }

  // Collect case groups: consecutive cases without statements fall through
  // to the next case that has statements (merging conditions with `or`)
  const caseGroups: Array<{
    conditions: LuauExpression[]; // empty for default
    body: LuauStatement[];
    isDefault: boolean;
  }> = [];
  let pendingConditions: LuauExpression[] = [];

  for (const clause of clauses) {
    if (ts.isCaseClause(clause)) {
      const caseExpr = transformExpression(clause.expression, ctx);
      const condition = binary(expr, "==", caseExpr);
      const body = transformStatements(clause.statements, ctx).filter(
        (s) => s.type !== "break"
      );

      if (body.length === 0) {
        // Fall-through: accumulate this condition
        pendingConditions.push(condition);
      } else {
        // This case has a body — merge any pending fall-through conditions
        caseGroups.push({
          conditions: [...pendingConditions, condition],
          body,
          isDefault: false,
        });
        pendingConditions = [];
      }
    } else {
      // Default clause
      const body = transformStatements(clause.statements, ctx).filter(
        (s) => s.type !== "break"
      );
      if (body.length === 0 && pendingConditions.length > 0) {
        // default with no body in a fall-through chain — becomes the default
        pendingConditions = [];
        caseGroups.push({ conditions: [], body: [], isDefault: true });
      } else {
        // Merge pending fall-through conditions into default
        // (they all fall through to default)
        caseGroups.push({
          conditions: pendingConditions,
          body,
          isDefault: true,
        });
        pendingConditions = [];
      }
    }
  }

  // If there are trailing pending conditions with no body, they are dead code (no-op)

  // Build if/elseif/else chain
  let result: LuauStatement | null = null;
  const elseIfs: Array<{ condition: LuauExpression; body: LuauStatement[] }> =
    [];
  let defaultBody: LuauStatement[] | undefined;

  for (const group of caseGroups) {
    if (group.isDefault) {
      // If default also has fall-through case conditions, emit those as an elseif
      // and the default as else
      if (group.conditions.length > 0) {
        const merged = group.conditions.reduce((a, b) => binary(a, "or", b));
        if (!result) {
          result = {
            type: "if",
            condition: merged,
            body: group.body,
            elseIfs,
            elseBody: undefined,
          };
        } else {
          elseIfs.push({ condition: merged, body: group.body });
        }
      }
      defaultBody = group.body;
    } else {
      const condition =
        group.conditions.length === 1
          ? group.conditions[0]!
          : group.conditions.reduce((a, b) => binary(a, "or", b));

      if (!result) {
        result = {
          type: "if",
          condition,
          body: group.body,
          elseIfs,
          elseBody: undefined,
        };
      } else {
        elseIfs.push({ condition, body: group.body });
      }
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
  ctx: TransformContext
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
        ts.isIdentifier(cond.left) &&
        cond.left.text === varName
      ) {
        end = binary(transformExpression(cond.right, ctx), "-", num(1));
      } else if (
        cond.operatorToken.kind === ts.SyntaxKind.LessThanEqualsToken &&
        ts.isIdentifier(cond.left) &&
        cond.left.text === varName
      ) {
        end = transformExpression(cond.right, ctx);
      } else if (
        cond.operatorToken.kind === ts.SyntaxKind.GreaterThanToken &&
        ts.isIdentifier(cond.left) &&
        cond.left.text === varName
      ) {
        // for (i = start; i > N; i--) → for i = start, N + 1, -1
        end = binary(transformExpression(cond.right, ctx), "+", num(1));
      } else if (
        cond.operatorToken.kind === ts.SyntaxKind.GreaterThanEqualsToken &&
        ts.isIdentifier(cond.left) &&
        cond.left.text === varName
      ) {
        // for (i = start; i >= N; i--) → for i = start, N, -1
        end = transformExpression(cond.right, ctx);
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

        // If condition is > or >= but no negative step was detected, default to -1
        if (
          !step &&
          (cond.operatorToken.kind === ts.SyntaxKind.GreaterThanToken ||
            cond.operatorToken.kind === ts.SyntaxKind.GreaterThanEqualsToken)
        ) {
          step = num(-1);
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
  ctx: TransformContext
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
    if (
      ts.isArrayBindingPattern(decl.name) ||
      ts.isObjectBindingPattern(decl.name)
    ) {
      const tempName = "_item";
      const destructStmts = emitDestructuringStatements(
        decl.name,
        ident(tempName),
        ctx
      );
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
  ctx: TransformContext
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
  ctx: TransformContext
): LuauStatement[] {
  const expr = node.expression;

  // Handle assignment expressions at statement level
  if (
    ts.isBinaryExpression(expr) &&
    expr.operatorToken.kind === ts.SyntaxKind.EqualsToken
  ) {
    return [
      {
        type: "assignment",
        target: transformExpression(expr.left, ctx),
        value: transformExpression(expr.right, ctx),
      },
    ];
  }

  // Logical assignment operators: &&=, ||=, ??=
  if (ts.isBinaryExpression(expr)) {
    if (
      expr.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandEqualsToken
    ) {
      const target = transformExpression(expr.left, ctx);
      const value = transformExpression(expr.right, ctx);
      return [
        {
          type: "if",
          condition: target,
          body: [{ type: "assignment", target, value }],
        },
      ];
    }
    if (expr.operatorToken.kind === ts.SyntaxKind.BarBarEqualsToken) {
      const target = transformExpression(expr.left, ctx);
      const value = transformExpression(expr.right, ctx);
      return [
        {
          type: "if",
          condition: unary("not", target),
          body: [{ type: "assignment", target, value }],
        },
      ];
    }
    if (expr.operatorToken.kind === ts.SyntaxKind.QuestionQuestionEqualsToken) {
      const target = transformExpression(expr.left, ctx);
      const value = transformExpression(expr.right, ctx);
      return [
        {
          type: "if",
          condition: binary(target, "==", nil()),
          body: [{ type: "assignment", target, value }],
        },
      ];
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
      return [
        {
          type: "compound-assignment",
          target: transformExpression(expr.left, ctx),
          op: compoundOp,
          value: transformExpression(expr.right, ctx),
        },
      ];
    }

    // String concat assignment: +=  when used with strings → ..=
    if (expr.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken) {
      return [
        {
          type: "compound-assignment",
          target: transformExpression(expr.left, ctx),
          op: "+=",
          value: transformExpression(expr.right, ctx),
        },
      ];
    }
  }

  // Increment/decrement at statement level
  if (ts.isPostfixUnaryExpression(expr) || ts.isPrefixUnaryExpression(expr)) {
    const operand = transformExpression(expr.operand, ctx);
    const isIncrement = expr.operator === ts.SyntaxKind.PlusPlusToken;
    return [
      {
        type: "compound-assignment",
        target: operand,
        op: isIncrement ? "+=" : "-=",
        value: num(1),
      },
    ];
  }

  // Map/Set methods at statement level: map.set(k, v) → map[k] = v, etc.
  if (
    ts.isCallExpression(expr) &&
    ts.isPropertyAccessExpression(expr.expression) &&
    ts.isIdentifier(expr.expression.expression)
  ) {
    const objName = expr.expression.expression.text;
    const method = expr.expression.name.text;

    if (ctx.mapVariables.has(objName)) {
      const obj = transformExpression(expr.expression.expression, ctx);
      if (method === "set" && expr.arguments.length >= 2) {
        return [
          {
            type: "assignment",
            target: bracketIndex(
              obj,
              transformExpression(expr.arguments[0]!, ctx)
            ),
            value: transformExpression(expr.arguments[1]!, ctx),
          },
        ];
      }
      if (method === "delete" && expr.arguments.length >= 1) {
        return [
          {
            type: "assignment",
            target: bracketIndex(
              obj,
              transformExpression(expr.arguments[0]!, ctx)
            ),
            value: nil(),
          },
        ];
      }
      if (method === "clear") {
        return [{ type: "assignment", target: obj, value: table([]) }];
      }
    }

    if (ctx.setVariables.has(objName)) {
      const obj = transformExpression(expr.expression.expression, ctx);
      if (method === "add" && expr.arguments.length >= 1) {
        return [
          {
            type: "assignment",
            target: bracketIndex(
              obj,
              transformExpression(expr.arguments[0]!, ctx)
            ),
            value: bool(true),
          },
        ];
      }
      if (method === "delete" && expr.arguments.length >= 1) {
        return [
          {
            type: "assignment",
            target: bracketIndex(
              obj,
              transformExpression(expr.arguments[0]!, ctx)
            ),
            value: nil(),
          },
        ];
      }
      if (method === "clear") {
        return [{ type: "assignment", target: obj, value: table([]) }];
      }
    }
  }

  // forEach: arr.forEach((item, i) => { ... }) → for i, item in arr do ... end
  if (
    ts.isCallExpression(expr) &&
    ts.isPropertyAccessExpression(expr.expression)
  ) {
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
          body = [
            {
              type: "expression-statement",
              expr: transformExpression(callback.body as ts.Expression, ctx),
            },
          ];
        }

        return [
          {
            type: "for-in",
            vars: [indexName, itemName],
            iterators: [arr],
            body,
          },
        ];
      }
    }
  }

  // Delete expression at statement level
  if (ts.isDeleteExpression(expr)) {
    const target = transformExpression(expr.expression, ctx);
    return [
      {
        type: "assignment",
        target,
        value: nil(),
      },
    ];
  }

  return [
    {
      type: "expression-statement",
      expr: transformExpression(expr, ctx),
    },
  ];
}

// ── Interface Declaration ──

function transformInterfaceDeclaration(
  node: ts.InterfaceDeclaration,
  ctx: TransformContext
): LuauStatement[] {
  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword
  );

  const typeParams =
    node.typeParameters?.map((p) => p.name.getText()) ?? undefined;
  const definition = transformInterfaceToLuauType(node, ctx);

  if (isExported) {
    ctx.typeExports.add(name);
    return [
      {
        type: "export-type-alias",
        name,
        definition,
        ...(typeParams?.length && { typeParams }),
      },
    ];
  }

  return [
    {
      type: "type-alias",
      name,
      definition,
      ...(typeParams?.length && { typeParams }),
    },
  ];
}

// ── Type Alias Declaration ──

function transformTypeAliasDeclaration(
  node: ts.TypeAliasDeclaration,
  ctx: TransformContext
): LuauStatement[] {
  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword
  );

  const typeParams =
    node.typeParameters?.map((p) => p.name.getText()) ?? undefined;
  const definition = transformTypeAliasToLuauType(node, ctx);

  if (isExported) {
    ctx.typeExports.add(name);
    return [
      {
        type: "export-type-alias",
        name,
        definition,
        ...(typeParams?.length && { typeParams }),
      },
    ];
  }

  return [
    {
      type: "type-alias",
      name,
      definition,
      ...(typeParams?.length && { typeParams }),
    },
  ];
}

// ── Enum Declaration ──

function transformEnumDeclaration(
  node: ts.EnumDeclaration,
  ctx: TransformContext
): LuauStatement[] {
  const name = node.name.text;
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword
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

  if (ctx.namespacePrefix) {
    result.push({
      type: "assignment",
      target: index(ctx.namespacePrefix, name),
      value: ident(name),
    });
  }

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

// ── Class Declarations ──

function transformClassDeclaration(
  node: ts.ClassDeclaration,
  ctx: TransformContext
): LuauStatement[] {
  const result: LuauStatement[] = [];

  // Anonymous classes unsupported
  if (!node.name) {
    ctx.warn(
      "unsupported-syntax",
      "Anonymous class declarations are not supported"
    );
    return [{ type: "comment", text: "unsupported: anonymous class" }];
  }
  const className = node.name.text;

  // Check modifiers
  const isExported = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.ExportKeyword
  );
  const isDefault = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.DefaultKeyword
  );
  const isAbstract = node.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.AbstractKeyword
  );

  if (isAbstract) {
    ctx.warnAtNode(
      "lossy-transform",
      `Abstract modifier on class '${className}' stripped (no Luau equivalent)`,
      node
    );
  }

  // Extract parent class from heritage clause
  let parentClassName: string | null = null;
  if (node.heritageClauses) {
    for (const clause of node.heritageClauses) {
      if (
        clause.token === ts.SyntaxKind.ExtendsKeyword &&
        clause.types.length > 0
      ) {
        const extendsExpr = clause.types[0]!.expression;
        if (ts.isIdentifier(extendsExpr)) {
          parentClassName = extendsExpr.text;
        } else {
          ctx.warnAtNode(
            "unsupported-syntax",
            "Complex extends expressions are not supported",
            extendsExpr
          );
        }
      }
      // implements has no runtime effect — ignored silently
    }
  }

  // Set context for super resolution inside class body
  ctx.currentClassName = className;
  ctx.currentParentClassName = parentClassName;

  // Categorize members (needed before type alias)
  const properties: ts.PropertyDeclaration[] = [];
  let constructorDecl: ts.ConstructorDeclaration | null = null;
  const methods: ts.MethodDeclaration[] = [];

  for (const member of node.members) {
    if (ts.isConstructorDeclaration(member)) {
      constructorDecl = member;
    } else if (ts.isMethodDeclaration(member)) {
      methods.push(member);
    } else if (ts.isPropertyDeclaration(member)) {
      properties.push(member);
    } else if (
      ts.isGetAccessorDeclaration(member) ||
      ts.isSetAccessorDeclaration(member)
    ) {
      ctx.warnAtNode(
        "unsupported-syntax",
        `Get/set accessors are not supported in class '${className}'`,
        member
      );
    }
  }

  // Emit table and __index first (Roblox OOP pattern)
  if (parentClassName) {
    result.push({
      type: "local",
      name: className,
      value: call(ident("setmetatable"), [
        table([]),
        table([{ key: str("__index"), value: ident(parentClassName) }]),
      ]),
    });
  } else {
    result.push({
      type: "local",
      name: className,
      value: table([]),
    });
  }

  result.push({
    type: "assignment",
    target: index(ident(className), "__index"),
    value: ident(className),
  });

  // Emit type ClassNameData and type ClassName = typeof(setmetatable(...))
  result.push(
    ...emitClassTypeAlias(
      className,
      parentClassName,
      properties,
      isExported,
      ctx
    )
  );

  // Emit constructor as ClassName.new()
  result.push(
    ...emitClassConstructor(
      className,
      parentClassName,
      constructorDecl,
      properties,
      ctx
    )
  );

  // Emit instance and static methods
  for (const method of methods) {
    result.push(...emitClassMethod(className, method, ctx));
  }

  // Emit static property initializers
  for (const prop of properties) {
    if (prop.initializer && ts.isIdentifier(prop.name)) {
      const isStatic = prop.modifiers?.some(
        (m) => m.kind === ts.SyntaxKind.StaticKeyword
      );
      if (isStatic) {
        result.push({
          type: "assignment",
          target: index(ident(className), prop.name.text),
          value: transformExpression(prop.initializer, ctx),
        });
      }
    }
  }

  // Export tracking
  if (isDefault) {
    ctx.defaultExport = className;
  }
  if (isExported && !isDefault) {
    ctx.namedExports.set(className, className);
    ctx.hasNamedExports = true;
  }

  // Clear class context
  ctx.currentClassName = null;
  ctx.currentParentClassName = null;

  return result;
}

function emitClassConstructor(
  className: string,
  parentClassName: string | null,
  constructorDecl: ts.ConstructorDeclaration | null,
  properties: ts.PropertyDeclaration[],
  ctx: TransformContext
): LuauStatement[] {
  const body: LuauStatement[] = [];
  let params: LuauParam[] = [];

  if (constructorDecl) {
    params = transformFunctionParams(constructorDecl.parameters, ctx);
    const preamble = getDestructuringPreamble(constructorDecl.parameters, ctx);

    if (parentClassName && constructorDecl.body) {
      body.push(...preamble);

      for (const stmt of constructorDecl.body.statements) {
        if (
          ts.isExpressionStatement(stmt) &&
          ts.isCallExpression(stmt.expression) &&
          stmt.expression.expression.kind === ts.SyntaxKind.SuperKeyword
        ) {
          const superArgs = stmt.expression.arguments.map((a) =>
            transformExpression(a, ctx)
          );
          const parentNew = call(index(ident(parentClassName), "new"), superArgs);
          body.push({
            type: "local",
            name: "self",
            value: {
              type: "type-assertion",
              expr: { type: "type-assertion", expr: parentNew, annotation: "any" },
              annotation: `${className}Data`,
            },
          });
        } else {
          const stmts = transformStatement(stmt, ctx);
          const pre = ctx.flushPreStatements();
          body.push(...pre, ...stmts);
        }
      }
    } else {
      body.push({
        type: "local",
        name: "self",
        value: table([]),
      });

      for (const prop of properties) {
        if (prop.initializer && ts.isIdentifier(prop.name)) {
          const isStatic = prop.modifiers?.some(
            (m) => m.kind === ts.SyntaxKind.StaticKeyword
          );
          if (!isStatic) {
            body.push({
              type: "assignment",
              target: index(ident("self"), prop.name.text),
              value: transformExpression(prop.initializer, ctx),
            });
          }
        }
      }

      if (constructorDecl.body) {
        body.push(...preamble);
        body.push(...transformStatements(constructorDecl.body.statements, ctx));
      }
    }
  } else {
    if (parentClassName) {
      const parentNew = call(index(ident(parentClassName), "new"), []);
      body.push({
        type: "local",
        name: "self",
        value: {
          type: "type-assertion",
          expr: { type: "type-assertion", expr: parentNew, annotation: "any" },
          annotation: `${className}Data`,
        },
      });
    } else {
      body.push({
        type: "local",
        name: "self",
        value: table([]),
      });
    }

    for (const prop of properties) {
      if (prop.initializer && ts.isIdentifier(prop.name)) {
        const isStatic = prop.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.StaticKeyword
        );
        if (!isStatic) {
          body.push({
            type: "assignment",
            target: index(ident("self"), prop.name.text),
            value: transformExpression(prop.initializer, ctx),
          });
        }
      }
    }
  }

  const setmetatableCall = call(ident("setmetatable"), [
    ident("self"),
    ident(className),
  ]);
  body.push({
    type: "return",
    value: parentClassName
      ? {
          type: "type-assertion",
          expr: { type: "type-assertion", expr: setmetatableCall, annotation: "any" },
          annotation: className,
        }
      : setmetatableCall,
  });

  return [
    {
      type: "function-decl",
      local: false,
      name: `${className}.new`,
      params,
      body,
      returnType: className,
    },
  ];
}

function emitClassMethod(
  className: string,
  method: ts.MethodDeclaration,
  ctx: TransformContext
): LuauStatement[] {
  if (!ts.isIdentifier(method.name)) {
    ctx.warn("unsupported-syntax", "Computed method names are not supported");
    return [{ type: "comment", text: "unsupported: computed method name" }];
  }

  const methodName = method.name.text;
  const isStatic = method.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.StaticKeyword
  );
  const isAsync = method.modifiers?.some(
    (m) => m.kind === ts.SyntaxKind.AsyncKeyword
  );

  // Roblox OOP: use dot syntax with explicit self for required self: ClassName annotation
  const params = transformFunctionParams(method.parameters, ctx);
  const additionalBodyStmts = getDestructuringPreamble(method.parameters, ctx);

  let returnType: string | undefined;
  if (method.type) {
    returnType = transformType(method.type, ctx);
  }

  let innerBody: LuauStatement[] = [];
  if (method.body) {
    innerBody = [
      ...additionalBodyStmts,
      ...transformStatements(method.body.statements, ctx),
    ];
  }

  let body: LuauStatement[];
  if (isAsync) {
    ctx.needsPromise = true;
    const promiseBody = rewriteReturnsToResolve(innerBody);
    body = [
      {
        type: "return",
        value: call(index(ident("Promise"), "new"), [
          funcExpr([{ name: "resolve" }, { name: "reject" }], promiseBody),
        ]),
      },
    ];
  } else {
    body = innerBody;
  }

  // Static → ClassName.method(), instance → ClassName.method(self: ClassName, ...)
  let qualifiedName: string;
  let finalParams: LuauParam[];
  if (isStatic) {
    qualifiedName = `${className}.${methodName}`;
    finalParams = params;
  } else {
    qualifiedName = `${className}.${methodName}`;
    finalParams = [{ name: "self", type: className }, ...params];
  }

  return [
    {
      type: "function-decl",
      local: false,
      name: qualifiedName,
      params: finalParams,
      body,
      returnType,
    },
  ];
}

function emitClassTypeAlias(
  className: string,
  parentClassName: string | null,
  properties: ts.PropertyDeclaration[],
  isExported: boolean | undefined,
  ctx: TransformContext
): LuauStatement[] {
  const dataMembers: string[] = [];

  for (const prop of properties) {
    if (!ts.isIdentifier(prop.name)) continue;
    const isStatic = prop.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.StaticKeyword
    );
    if (isStatic) continue;

    const propName = prop.name.text;
    const propType = prop.type ? transformType(prop.type, ctx) : "any";
    const optional = prop.questionToken ? "?" : "";
    dataMembers.push(`${propName}: ${propType}${optional}`);
  }

  const dataTypeName = `${className}Data`;
  const dataDefinition =
    parentClassName !== null
      ? dataMembers.length > 0
        ? `${parentClassName}Data & {\n    ${dataMembers.join(",\n    ")},\n}`
        : `${parentClassName}Data`
      : dataMembers.length > 0
        ? `{\n    ${dataMembers.join(",\n    ")},\n}`
        : `{}`;

  const classDefinition = `typeof(setmetatable({} :: ${dataTypeName}, ${className}))`;

  const statements: LuauStatement[] = [
    { type: "type-alias", name: dataTypeName, definition: dataDefinition },
    isExported
      ? ({
          type: "export-type-alias",
          name: className,
          definition: classDefinition,
        } as LuauStatement)
      : { type: "type-alias", name: className, definition: classDefinition },
  ];

  if (isExported) {
    ctx.typeExports.add(className);
  }

  return statements;
}

// ── Try/Catch ──

function transformTryStatement(
  node: ts.TryStatement,
  ctx: TransformContext
): LuauStatement[] {
  // try { ... } catch (e) { ... } → local ok, err = pcall(function() ... end)
  const tryBody = transformStatements(node.tryBlock.statements, ctx);

  const results: LuauStatement[] = [];

  if (node.catchClause) {
    const errName = node.catchClause.variableDeclaration
      ? node.catchClause.variableDeclaration.name.getText()
      : "_err";
    const catchBody = transformStatements(
      node.catchClause.block.statements,
      ctx
    );

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

// ── Async Return Rewriting ──

/**
 * Recursively rewrite `return X` → `resolve(X); return` throughout a statement tree.
 * Walks into if/else, loops, do-blocks, try/catch — but NOT into nested function expressions
 * (those have their own return semantics).
 */
function rewriteReturnsToResolve(stmts: LuauStatement[]): LuauStatement[] {
  const result: LuauStatement[] = [];
  for (const stmt of stmts) {
    if (stmt.type === "return" && stmt.value) {
      result.push({
        type: "expression-statement",
        expr: call(ident("resolve"), [stmt.value]),
      });
      result.push({ type: "return" } as LuauStatement);
    } else if (stmt.type === "return" && !stmt.value) {
      result.push({
        type: "expression-statement",
        expr: call(ident("resolve"), [nil()]),
      });
      result.push({ type: "return" } as LuauStatement);
    } else if (stmt.type === "if") {
      const rewritten: LuauStatement = {
        ...stmt,
        body: rewriteReturnsToResolve(stmt.body),
        elseIfs: stmt.elseIfs?.map(
          (ei: { condition: LuauExpression; body: LuauStatement[] }) => ({
            ...ei,
            body: rewriteReturnsToResolve(ei.body),
          })
        ),
        elseBody: stmt.elseBody
          ? rewriteReturnsToResolve(stmt.elseBody)
          : undefined,
      };
      result.push(rewritten);
    } else if (stmt.type === "while" || stmt.type === "repeat-until") {
      result.push({ ...stmt, body: rewriteReturnsToResolve(stmt.body) });
    } else if (stmt.type === "for-numeric" || stmt.type === "for-in") {
      result.push({ ...stmt, body: rewriteReturnsToResolve(stmt.body) });
    } else if (stmt.type === "do-block") {
      result.push({ ...stmt, body: rewriteReturnsToResolve(stmt.body) });
    } else {
      result.push(stmt);
    }
  }
  return result;
}

// ── Helpers ──

function transformBlockOrStatement(
  node: ts.Statement,
  ctx: TransformContext
): LuauStatement[] {
  if (ts.isBlock(node)) {
    return transformStatements(node.statements, ctx);
  }
  return transformStatement(node, ctx);
}
