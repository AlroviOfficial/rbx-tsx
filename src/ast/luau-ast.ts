// Luau AST — output-only intermediate representation

// ── Statements ──

export type LuauStatement =
  | LuauLocalDecl
  | LuauAssignment
  | LuauCompoundAssignment
  | LuauReturn
  | LuauFunctionDecl
  | LuauIf
  | LuauForNumeric
  | LuauForIn
  | LuauWhile
  | LuauRepeatUntil
  | LuauExpressionStatement
  | LuauDoBlock
  | LuauComment
  | LuauTypeAlias
  | LuauExportTypeAlias
  | LuauBreak
  | LuauContinue
  | LuauMultiLocalDecl;

export interface LuauLocalDecl {
  type: "local";
  name: string;
  value?: LuauExpression;
  typeAnnotation?: string;
}

export interface LuauMultiLocalDecl {
  type: "multi-local";
  names: string[];
  values: LuauExpression[];
}

export interface LuauAssignment {
  type: "assignment";
  target: LuauExpression;
  value: LuauExpression;
}

export interface LuauCompoundAssignment {
  type: "compound-assignment";
  target: LuauExpression;
  op: string; // +=, -=, *=, /=, ..=
  value: LuauExpression;
}

export interface LuauReturn {
  type: "return";
  value?: LuauExpression;
}

export interface LuauFunctionDecl {
  type: "function-decl";
  local: boolean;
  name: string;
  params: LuauParam[];
  body: LuauStatement[];
  returnType?: string;
  typeParams?: string[];
  sourceLine?: number;
  sourceFile?: string;
  /** When set, emit as function prefix.name() instead of local function name() */
  tablePrefix?: LuauExpression;
}

export interface LuauIf {
  type: "if";
  condition: LuauExpression;
  body: LuauStatement[];
  elseIfs?: Array<{ condition: LuauExpression; body: LuauStatement[] }>;
  elseBody?: LuauStatement[];
}

export interface LuauForNumeric {
  type: "for-numeric";
  var: string;
  start: LuauExpression;
  end: LuauExpression;
  step?: LuauExpression;
  body: LuauStatement[];
}

export interface LuauForIn {
  type: "for-in";
  vars: string[];
  iterators: LuauExpression[];
  body: LuauStatement[];
}

export interface LuauWhile {
  type: "while";
  condition: LuauExpression;
  body: LuauStatement[];
}

export interface LuauRepeatUntil {
  type: "repeat-until";
  condition: LuauExpression;
  body: LuauStatement[];
}

export interface LuauExpressionStatement {
  type: "expression-statement";
  expr: LuauExpression;
}

export interface LuauDoBlock {
  type: "do-block";
  body: LuauStatement[];
}

export interface LuauComment {
  type: "comment";
  text: string;
}

export interface LuauTypeAlias {
  type: "type-alias";
  name: string;
  definition: string;
  typeParams?: string[];
}

export interface LuauExportTypeAlias {
  type: "export-type-alias";
  name: string;
  definition: string;
  typeParams?: string[];
}

export interface LuauBreak {
  type: "break";
}

export interface LuauContinue {
  type: "continue";
}

// ── Expressions ──

export type LuauExpression =
  | LuauIdentifier
  | LuauStringLiteral
  | LuauNumberLiteral
  | LuauBooleanLiteral
  | LuauNil
  | LuauTable
  | LuauCall
  | LuauMethodCall
  | LuauIndex
  | LuauBracketIndex
  | LuauBinary
  | LuauUnary
  | LuauIfExpr
  | LuauFunctionExpr
  | LuauConcat
  | LuauTemplateLiteral
  | LuauVarargs
  | LuauRaw
  | LuauTypeAssertion;

export interface LuauIdentifier {
  type: "identifier";
  name: string;
}

export interface LuauStringLiteral {
  type: "string";
  value: string;
}

export interface LuauNumberLiteral {
  type: "number";
  value: number;
}

export interface LuauBooleanLiteral {
  type: "boolean";
  value: boolean;
}

export interface LuauNil {
  type: "nil";
}

export interface LuauTableEntry {
  key?: LuauExpression;
  value: LuauExpression;
}

export interface LuauTable {
  type: "table";
  entries: LuauTableEntry[];
}

export interface LuauCall {
  type: "call";
  callee: LuauExpression;
  args: LuauExpression[];
}

export interface LuauMethodCall {
  type: "method-call";
  object: LuauExpression;
  method: string;
  args: LuauExpression[];
}

export interface LuauIndex {
  type: "index";
  object: LuauExpression;
  property: string;
}

export interface LuauBracketIndex {
  type: "bracket-index";
  object: LuauExpression;
  index: LuauExpression;
}

export interface LuauBinary {
  type: "binary";
  left: LuauExpression;
  op: string; // +, -, *, /, %, ^, ==, ~=, <, >, <=, >=, and, or
  right: LuauExpression;
}

export interface LuauUnary {
  type: "unary";
  op: string; // not, -, #
  operand: LuauExpression;
}

export interface LuauIfExpr {
  type: "if-expr";
  condition: LuauExpression;
  thenExpr: LuauExpression;
  elseExpr: LuauExpression;
}

export interface LuauFunctionExpr {
  type: "function-expr";
  params: LuauParam[];
  body: LuauStatement[];
  returnType?: string;
  typeParams?: string[];
}

export interface LuauConcat {
  type: "concat";
  parts: LuauExpression[];
}

export interface LuauTemplateLiteralSpan {
  expr: LuauExpression;
  text: string; // literal text after this expression
}

export interface LuauTemplateLiteral {
  type: "template-literal";
  head: string; // literal text before the first expression
  spans: LuauTemplateLiteralSpan[];
}

export interface LuauVarargs {
  type: "varargs";
}

export interface LuauRaw {
  type: "raw";
  code: string;
}

export interface LuauTypeAssertion {
  type: "type-assertion";
  expr: LuauExpression;
  annotation: string;
}

// ── Shared ──

export interface LuauParam {
  name: string;
  type?: string;
}

// ── Helper constructors ──

export function ident(name: string): LuauIdentifier {
  return { type: "identifier", name };
}

export function str(value: string): LuauStringLiteral {
  return { type: "string", value };
}

export function num(value: number): LuauNumberLiteral {
  return { type: "number", value };
}

export function bool(value: boolean): LuauBooleanLiteral {
  return { type: "boolean", value };
}

export function nil(): LuauNil {
  return { type: "nil" };
}

export function call(callee: LuauExpression, args: LuauExpression[]): LuauCall {
  return { type: "call", callee, args };
}

export function methodCall(
  object: LuauExpression,
  method: string,
  args: LuauExpression[]
): LuauMethodCall {
  return { type: "method-call", object, method, args };
}

export function index(object: LuauExpression, property: string): LuauIndex {
  return { type: "index", object, property };
}

export function bracketIndex(
  object: LuauExpression,
  idx: LuauExpression
): LuauBracketIndex {
  return { type: "bracket-index", object: object, index: idx };
}

export function table(entries: LuauTableEntry[]): LuauTable {
  return { type: "table", entries };
}

export function binary(
  left: LuauExpression,
  op: string,
  right: LuauExpression
): LuauBinary {
  return { type: "binary", left, op, right };
}

export function unary(op: string, operand: LuauExpression): LuauUnary {
  return { type: "unary", op, operand };
}

export function ifExpr(
  condition: LuauExpression,
  thenExpr: LuauExpression,
  elseExpr: LuauExpression
): LuauIfExpr {
  return { type: "if-expr", condition, thenExpr, elseExpr };
}

export function funcExpr(
  params: LuauParam[],
  body: LuauStatement[],
  returnType?: string,
  typeParams?: string[]
): LuauFunctionExpr {
  return { type: "function-expr", params, body, returnType, typeParams };
}

export function concat(parts: LuauExpression[]): LuauExpression {
  if (parts.length === 0) return str("");
  if (parts.length === 1) return parts[0]!;
  return { type: "concat", parts };
}

export function templateLiteral(
  head: string,
  spans: LuauTemplateLiteralSpan[]
): LuauTemplateLiteral {
  return { type: "template-literal", head, spans };
}

export function raw(code: string): LuauRaw {
  return { type: "raw", code };
}
