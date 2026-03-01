import ts from "typescript";
import type {
  LuauStatement,
  LuauExpression,
  LuauTableEntry,
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
  transformImport,
  processExportDeclaration,
  generateModuleReturn,
} from "./module-transform.ts";
import {
  transformStatement,
  transformStatements,
} from "./statement-transform.ts";
import { transformExpression } from "./expression-transform.ts";

/**
 * Transform a parsed TypeScript source file into Luau statements.
 * This is the main entry point for the transform pipeline.
 */
export function transformSourceFile(
  sourceFile: ts.SourceFile,
  ctx: TransformContext
): LuauStatement[] {
  const allStatements: LuauStatement[] = [];

  // Wire up sourceFile for line/column tracking in warnings
  ctx.sourceFile = sourceFile;

  // Phase 1: Process imports (determines what React/services/modules we need)
  const importStatements: LuauStatement[] = [];
  const bodyStatements: ts.Statement[] = [];
  const exportDeclarations: ts.ExportDeclaration[] = [];
  const exportAssignments: ts.ExportAssignment[] = [];

  for (const stmt of sourceFile.statements) {
    if (ts.isImportDeclaration(stmt)) {
      importStatements.push(...transformImport(stmt, ctx));
    } else if (ts.isExportDeclaration(stmt)) {
      exportDeclarations.push(stmt);
      processExportDeclaration(stmt, ctx);
    } else if (ts.isExportAssignment(stmt)) {
      exportAssignments.push(stmt);
    } else {
      bodyStatements.push(stmt);

      // Track exports on functions/variables
      if (ts.isFunctionDeclaration(stmt) && stmt.name) {
        const isDefault = stmt.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.DefaultKeyword
        );
        if (isDefault) {
          ctx.defaultExport = stmt.name.text;
        }
      }
      if (ts.isVariableStatement(stmt)) {
        const isExported = stmt.modifiers?.some(
          (m) => m.kind === ts.SyntaxKind.ExportKeyword
        );
        if (isExported) {
          for (const decl of stmt.declarationList.declarations) {
            if (ts.isIdentifier(decl.name)) {
              ctx.namedExports.set(decl.name.text, decl.name.text);
              ctx.hasNamedExports = true;
            }
          }
        }
      }
    }
  }

  // Process export default assignment: export default X
  for (const ea of exportAssignments) {
    if (ea.isExportEquals) continue;
    if (ts.isIdentifier(ea.expression)) {
      ctx.defaultExport = ea.expression.text;
    } else {
      // export default <expression> — store for later
      const tempName = "_default";
      bodyStatements.push(
        ts.factory.createVariableStatement(
          undefined,
          ts.factory.createVariableDeclarationList(
            [
              ts.factory.createVariableDeclaration(
                tempName,
                undefined,
                undefined,
                ea.expression
              ),
            ],
            ts.NodeFlags.Const
          )
        )
      );
      ctx.defaultExport = tempName;
    }
  }

  // Phase 2: Emit preamble (requires, services)
  // React require (always first if needed)
  if (ctx.needsReact || hasJSX(sourceFile)) {
    ctx.needsReact = true;
    allStatements.push({
      type: "local",
      name: "React",
      value: call(ident("require"), [
        raw(buildRequirePath(ctx.options.reactPath)),
      ]),
    });

    // Emit named React imports
    for (const name of ctx.reactImports) {
      allStatements.push({
        type: "local",
        name,
        value: index(ident("React"), name),
      });
    }
  }

  // ReactRoblox require
  if (ctx.needsReactRoblox) {
    allStatements.push({
      type: "local",
      name: "ReactRoblox",
      value: call(ident("require"), [
        raw(buildRequirePath(ctx.options.reactRobloxPath)),
      ]),
    });
  }

  // Phase 3: Transform body statements (this populates ctx.requiredServices, ctx.requiredHelpers, ctx.needsPromise)
  const transformedBody: LuauStatement[] = [];
  for (const stmt of bodyStatements) {
    transformedBody.push(...transformStatement(stmt, ctx));
  }

  // Now emit services (after body transform so we know which ones are needed)
  if (ctx.requiredServices.size > 0) {
    allStatements.push({ type: "comment", text: "" });
    for (const service of ctx.requiredServices) {
      allStatements.push({
        type: "local",
        name: service,
        value: methodCall(ident("game"), "GetService", [str(service)]),
      });
      ctx.importedModules.set(service, "@rbx-services");
    }
  }

  // Promise require (for async/await)
  if (ctx.needsPromise) {
    allStatements.push({
      type: "local",
      name: "Promise",
      value: call(ident("require"), [
        raw(buildRequirePath("ReplicatedStorage.Packages.Promise")),
      ]),
    });
  }

  // Emit module import statements (after services so React/services come first)
  if (importStatements.length > 0) {
    allStatements.push(...importStatements);
  }

  // Emit helper functions
  if (ctx.requiredHelpers.size > 0) {
    allStatements.push({ type: "comment", text: "" });
    for (const helper of ctx.requiredHelpers) {
      const helperStmts = getHelperFunction(helper);
      if (helperStmts) {
        allStatements.push(...helperStmts);
      }
    }
  }

  // Add blank line before body
  if (allStatements.length > 0) {
    allStatements.push({ type: "comment", text: "" });
  }

  // Phase 4: Emit transformed body
  allStatements.push(...transformedBody);

  // Phase 5: Generate return statement
  const returnStmts = generateModuleReturn(ctx);
  if (returnStmts.length > 0) {
    allStatements.push({ type: "comment", text: "" });
    allStatements.push(...returnStmts);
  }

  return allStatements;
}

// ── Helpers ──

function hasJSX(sourceFile: ts.SourceFile): boolean {
  let found = false;
  function visit(node: ts.Node) {
    if (found) return;
    if (
      ts.isJsxElement(node) ||
      ts.isJsxSelfClosingElement(node) ||
      ts.isJsxFragment(node)
    ) {
      found = true;
      return;
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return found;
}

function buildRequirePath(configPath: string): string {
  // "ReplicatedStorage.Packages.React" → game:GetService("ReplicatedStorage").Packages.React
  const parts = configPath.split(".");
  if (parts.length > 0 && parts[0]) {
    const service = parts[0];
    const rest = parts.slice(1).join(".");
    return `game:GetService("${service}")${rest ? "." + rest : ""}`;
  }
  return configPath;
}

// ── Helper Functions ──

function getHelperFunction(name: string): LuauStatement[] | null {
  switch (name) {
    case "merge":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_merge",
          params: [{ name: "...", type: "any" }],
          body: [
            { type: "local", name: "result", value: table([]) },
            {
              type: "for-numeric",
              var: "i",
              start: num(1),
              end: call(ident("select"), [str("#"), { type: "varargs" }]),
              body: [
                {
                  type: "local",
                  name: "t",
                  value: call(ident("select"), [
                    ident("i"),
                    { type: "varargs" },
                  ]),
                },
                {
                  type: "if",
                  condition: ident("t"),
                  body: [
                    {
                      type: "for-in",
                      vars: ["k", "v"],
                      iterators: [ident("t")],
                      body: [
                        {
                          type: "assignment",
                          target: bracketIndex(ident("result"), ident("k")),
                          value: ident("v"),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: "return", value: ident("result") },
          ],
        },
      ];

    case "objectKeys":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_objectKeys",
          params: [{ name: "t" }],
          body: [
            { type: "local", name: "keys", value: table([]) },
            {
              type: "for-in",
              vars: ["k", "_"],
              iterators: [ident("t")],
              body: [
                {
                  type: "expression-statement",
                  expr: call(index(ident("table"), "insert"), [
                    ident("keys"),
                    ident("k"),
                  ]),
                },
              ],
            },
            { type: "return", value: ident("keys") },
          ],
        },
      ];

    case "objectValues":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_objectValues",
          params: [{ name: "t" }],
          body: [
            { type: "local", name: "values", value: table([]) },
            {
              type: "for-in",
              vars: ["_", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "expression-statement",
                  expr: call(index(ident("table"), "insert"), [
                    ident("values"),
                    ident("v"),
                  ]),
                },
              ],
            },
            { type: "return", value: ident("values") },
          ],
        },
      ];

    case "objectEntries":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_objectEntries",
          params: [{ name: "t" }],
          body: [
            { type: "local", name: "entries", value: table([]) },
            {
              type: "for-in",
              vars: ["k", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "expression-statement",
                  expr: call(index(ident("table"), "insert"), [
                    ident("entries"),
                    table([{ value: ident("k") }, { value: ident("v") }]),
                  ]),
                },
              ],
            },
            { type: "return", value: ident("entries") },
          ],
        },
      ];

    case "arrayConcat":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayConcat",
          params: [{ name: "...", type: "any" }],
          body: [
            { type: "local", name: "result", value: table([]) },
            {
              type: "for-numeric",
              var: "i",
              start: num(1),
              end: call(ident("select"), [str("#"), { type: "varargs" }]),
              body: [
                {
                  type: "local",
                  name: "t",
                  value: call(ident("select"), [
                    ident("i"),
                    { type: "varargs" },
                  ]),
                },
                {
                  type: "if",
                  condition: binary(
                    call(ident("typeof"), [ident("t")]),
                    "==",
                    str("table")
                  ),
                  body: [
                    {
                      type: "for-in",
                      vars: ["_", "v"],
                      iterators: [ident("t")],
                      body: [
                        {
                          type: "expression-statement",
                          expr: call(index(ident("table"), "insert"), [
                            ident("result"),
                            ident("v"),
                          ]),
                        },
                      ],
                    },
                  ],
                  elseBody: [
                    {
                      type: "expression-statement",
                      expr: call(index(ident("table"), "insert"), [
                        ident("result"),
                        ident("t"),
                      ]),
                    },
                  ],
                },
              ],
            },
            { type: "return", value: ident("result") },
          ],
        },
      ];

    case "arrayReverse":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayReverse",
          params: [{ name: "t" }],
          body: [
            { type: "local", name: "result", value: table([]) },
            {
              type: "for-numeric",
              var: "i",
              start: unary("#", ident("t")),
              end: num(1),
              step: num(-1),
              body: [
                {
                  type: "expression-statement",
                  expr: call(index(ident("table"), "insert"), [
                    ident("result"),
                    bracketIndex(ident("t"), ident("i")),
                  ]),
                },
              ],
            },
            { type: "return", value: ident("result") },
          ],
        },
      ];

    case "array_map":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayMap",
          params: [{ name: "t" }, { name: "fn" }],
          body: [
            { type: "local", name: "result", value: table([]) },
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "expression-statement",
                  expr: call(index(ident("table"), "insert"), [
                    ident("result"),
                    call(ident("fn"), [ident("v"), ident("i")]),
                  ]),
                },
              ],
            },
            { type: "return", value: ident("result") },
          ],
        },
      ];

    case "array_filter":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayFilter",
          params: [{ name: "t" }, { name: "fn" }],
          body: [
            { type: "local", name: "result", value: table([]) },
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "if",
                  condition: call(ident("fn"), [ident("v"), ident("i")]),
                  body: [
                    {
                      type: "expression-statement",
                      expr: call(index(ident("table"), "insert"), [
                        ident("result"),
                        ident("v"),
                      ]),
                    },
                  ],
                },
              ],
            },
            { type: "return", value: ident("result") },
          ],
        },
      ];

    case "array_find":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayFind",
          params: [{ name: "t" }, { name: "fn" }],
          body: [
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "if",
                  condition: call(ident("fn"), [ident("v"), ident("i")]),
                  body: [{ type: "return", value: ident("v") }],
                },
              ],
            },
            { type: "return", value: nil() },
          ],
        },
      ];

    case "array_some":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arraySome",
          params: [{ name: "t" }, { name: "fn" }],
          body: [
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "if",
                  condition: call(ident("fn"), [ident("v"), ident("i")]),
                  body: [{ type: "return", value: bool(true) }],
                },
              ],
            },
            { type: "return", value: bool(false) },
          ],
        },
      ];

    case "array_every":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayEvery",
          params: [{ name: "t" }, { name: "fn" }],
          body: [
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "if",
                  condition: unary(
                    "not",
                    call(ident("fn"), [ident("v"), ident("i")])
                  ),
                  body: [{ type: "return", value: bool(false) }],
                },
              ],
            },
            { type: "return", value: bool(true) },
          ],
        },
      ];

    case "array_reduce":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayReduce",
          params: [{ name: "t" }, { name: "fn" }, { name: "init" }],
          body: [
            { type: "local", name: "acc", value: ident("init") },
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "assignment",
                  target: ident("acc"),
                  value: call(ident("fn"), [
                    ident("acc"),
                    ident("v"),
                    ident("i"),
                  ]),
                },
              ],
            },
            { type: "return", value: ident("acc") },
          ],
        },
      ];

    case "array_findIndex":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayFindIndex",
          params: [{ name: "t" }, { name: "fn" }],
          body: [
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "if",
                  condition: call(ident("fn"), [ident("v"), ident("i")]),
                  body: [
                    { type: "return", value: binary(ident("i"), "-", num(1)) },
                  ],
                },
              ],
            },
            { type: "return", value: num(-1) },
          ],
        },
      ];

    case "joinClasses":
      return [
        {
          type: "function-decl",
          local: true,
          name: "joinClasses",
          params: [{ name: "...", type: "string?" }],
          body: [
            { type: "local", name: "parts", value: table([]) },
            {
              type: "for-numeric",
              var: "i",
              start: num(1),
              end: call(ident("select"), [str("#"), { type: "varargs" }]),
              body: [
                {
                  type: "local",
                  name: "v",
                  value: call(ident("select"), [
                    ident("i"),
                    { type: "varargs" },
                  ]),
                },
                {
                  type: "if",
                  condition: binary(
                    ident("v"),
                    "and",
                    binary(ident("v"), "~=", str(""))
                  ),
                  body: [
                    {
                      type: "expression-statement",
                      expr: call(index(ident("table"), "insert"), [
                        ident("parts"),
                        ident("v"),
                      ]),
                    },
                  ],
                },
              ],
            },
            {
              type: "return",
              value: call(index(ident("table"), "concat"), [
                ident("parts"),
                str(" "),
              ]),
            },
          ],
        },
      ];

    case "arrayFlat":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayFlat",
          params: [{ name: "t" }, { name: "depth" }],
          body: [
            { type: "local", name: "result", value: table([]) },
            {
              type: "for-in",
              vars: ["_", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "if",
                  condition: binary(
                    binary(
                      call(ident("typeof"), [ident("v")]),
                      "==",
                      str("table")
                    ),
                    "and",
                    binary(ident("depth"), ">", num(0))
                  ),
                  body: [
                    {
                      type: "for-in",
                      vars: ["_", "fv"],
                      iterators: [
                        call(ident("_arrayFlat"), [
                          ident("v"),
                          binary(ident("depth"), "-", num(1)),
                        ]),
                      ],
                      body: [
                        {
                          type: "expression-statement",
                          expr: call(index(ident("table"), "insert"), [
                            ident("result"),
                            ident("fv"),
                          ]),
                        },
                      ],
                    },
                  ],
                  elseBody: [
                    {
                      type: "expression-statement",
                      expr: call(index(ident("table"), "insert"), [
                        ident("result"),
                        ident("v"),
                      ]),
                    },
                  ],
                },
              ],
            },
            { type: "return", value: ident("result") },
          ],
        },
      ];

    case "arrayFlatMap":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayFlatMap",
          params: [{ name: "t" }, { name: "fn" }],
          body: [
            { type: "local", name: "result", value: table([]) },
            {
              type: "for-in",
              vars: ["i", "v"],
              iterators: [ident("t")],
              body: [
                {
                  type: "local",
                  name: "mapped",
                  value: call(ident("fn"), [ident("v"), ident("i")]),
                },
                {
                  type: "if",
                  condition: binary(
                    call(ident("typeof"), [ident("mapped")]),
                    "==",
                    str("table")
                  ),
                  body: [
                    {
                      type: "for-in",
                      vars: ["_", "mv"],
                      iterators: [ident("mapped")],
                      body: [
                        {
                          type: "expression-statement",
                          expr: call(index(ident("table"), "insert"), [
                            ident("result"),
                            ident("mv"),
                          ]),
                        },
                      ],
                    },
                  ],
                  elseBody: [
                    {
                      type: "expression-statement",
                      expr: call(index(ident("table"), "insert"), [
                        ident("result"),
                        ident("mapped"),
                      ]),
                    },
                  ],
                },
              ],
            },
            { type: "return", value: ident("result") },
          ],
        },
      ];

    case "arrayFill":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_arrayFill",
          params: [
            { name: "t" },
            { name: "val" },
            { name: "startIdx" },
            { name: "endIdx" },
          ],
          body: [
            {
              type: "local",
              name: "s",
              value: ifExpr(
                binary(ident("startIdx"), "~=", nil()),
                binary(ident("startIdx"), "+", num(1)),
                num(1)
              ),
            },
            {
              type: "local",
              name: "e",
              value: ifExpr(
                binary(ident("endIdx"), "~=", nil()),
                ident("endIdx"),
                unary("#", ident("t"))
              ),
            },
            {
              type: "for-numeric",
              var: "i",
              start: ident("s"),
              end: ident("e"),
              body: [
                {
                  type: "assignment",
                  target: bracketIndex(ident("t"), ident("i")),
                  value: ident("val"),
                },
              ],
            },
            { type: "return", value: ident("t") },
          ],
        },
      ];

    case "numberIsInteger":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_numberIsInteger",
          params: [{ name: "v" }],
          body: [
            {
              type: "return",
              value: binary(
                binary(
                  call(ident("typeof"), [ident("v")]),
                  "==",
                  str("number")
                ),
                "and",
                binary(
                  call(index(ident("math"), "floor"), [ident("v")]),
                  "==",
                  ident("v")
                )
              ),
            },
          ],
        },
      ];

    case "numberIsNaN":
      return [
        {
          type: "function-decl",
          local: true,
          name: "_numberIsNaN",
          params: [{ name: "v" }],
          body: [
            {
              type: "return",
              value: binary(ident("v"), "~=", ident("v")),
            },
          ],
        },
      ];

    default:
      return null;
  }
}
