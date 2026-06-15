import { EditorView, keymap } from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import { basicSetup } from "codemirror";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { StreamLanguage } from "@codemirror/language";
import { lua } from "@codemirror/legacy-modes/mode/lua";
import { oneDark } from "@codemirror/theme-one-dark";
import { lintGutter, setDiagnostics, type Diagnostic as CmDiagnostic } from "@codemirror/lint";
import { compileToLuau, type Diagnostic } from "./compile.ts";
import { EXAMPLES } from "./generated/embedded.ts";

const $ = <T extends HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`missing element #${id}`);
  return el as T;
};

const examplesSelect = $<HTMLSelectElement>("examples");
const problemsTitle = $<HTMLElement>("problems-title");
const problemsList = $<HTMLElement>("problems-list");

let currentFilename = "input.tsx";

const input = new EditorView({
  parent: $("input"),
  doc: "",
  extensions: [
    basicSetup,
    keymap.of([indentWithTab]),
    javascript({ jsx: true, typescript: true }),
    oneDark,
    lintGutter(),
    EditorView.updateListener.of((u) => {
      if (u.docChanged) scheduleRun();
    }),
  ],
});

const output = new EditorView({
  parent: $("output"),
  doc: "",
  extensions: [
    basicSetup,
    StreamLanguage.define(lua),
    oneDark,
    EditorState.readOnly.of(true),
    EditorView.editable.of(false),
  ],
});

function setDoc(view: EditorView, text: string): void {
  view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
}

function offsetOf(line: number, column: number): number {
  const lineCount = input.state.doc.lines;
  const ln = Math.min(Math.max(line, 1), lineCount);
  const lineInfo = input.state.doc.line(ln);
  return Math.min(lineInfo.from + Math.max(column - 1, 0), lineInfo.to);
}

function gotoProblem(line: number, column: number): void {
  const pos = offsetOf(line, column);
  input.dispatch({ selection: { anchor: pos }, scrollIntoView: true });
  input.focus();
}

function renderProblems(problems: Diagnostic[]): void {
  problemsList.replaceChildren();
  const errors = problems.filter((p) => p.severity === "error").length;
  const warnings = problems.length - errors;

  if (problems.length === 0) {
    problemsTitle.textContent = "Problems — none";
    problemsTitle.className = "ok";
    const empty = document.createElement("div");
    empty.className = "problem empty";
    empty.textContent = "No problems detected.";
    problemsList.appendChild(empty);
    return;
  }

  const parts: string[] = [];
  if (errors) parts.push(`${errors} error${errors === 1 ? "" : "s"}`);
  if (warnings) parts.push(`${warnings} warning${warnings === 1 ? "" : "s"}`);
  problemsTitle.textContent = `Problems — ${parts.join(" · ")}`;
  problemsTitle.className = errors ? "error" : "warn";

  for (const p of problems) {
    const row = document.createElement("div");
    row.className = `problem ${p.severity}`;
    row.addEventListener("click", () => gotoProblem(p.line, p.column));

    const sev = document.createElement("span");
    sev.className = "sev";
    sev.textContent = p.severity === "error" ? "✗" : p.severity === "warning" ? "▲" : "ℹ";

    const loc = document.createElement("span");
    loc.className = "loc";
    loc.textContent = `${p.line}:${p.column}`;

    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = p.source;

    const msg = document.createElement("span");
    msg.className = "msg";
    msg.textContent = p.message;

    row.append(sev, loc, tag, msg);
    problemsList.appendChild(row);
  }
}

function run(): void {
  const source = input.state.doc.toString();
  const result = compileToLuau(source, currentFilename);

  if (result.error) {
    setDoc(output, `-- compile error:\n-- ${result.error}`);
    input.dispatch(setDiagnostics(input.state, []));
    renderProblems([
      { from: 0, to: 0, line: 1, column: 1, severity: "error", message: result.error, source: "rbx-tsx" },
    ]);
    return;
  }

  setDoc(output, result.luau || "-- (no output)");

  const docLen = input.state.doc.length;
  const cmDiags: CmDiagnostic[] = result.diagnostics.map((d) => ({
    from: Math.min(d.from, docLen),
    to: Math.min(Math.max(d.to, d.from + 1), docLen),
    severity: d.severity,
    message: d.message,
    source: d.source,
  }));
  input.dispatch(setDiagnostics(input.state, cmDiags));

  const warnEntries: Diagnostic[] = result.warnings.map((w) => ({
    from: 0,
    to: 0,
    line: w.line ?? 1,
    column: w.column ?? 1,
    severity: "warning",
    message: `[${w.code}] ${w.message}`,
    source: "rbx-tsx",
  }));

  renderProblems([...result.diagnostics, ...warnEntries]);
}

let debounce: ReturnType<typeof setTimeout> | undefined;
function scheduleRun(): void {
  if (debounce) clearTimeout(debounce);
  debounce = setTimeout(run, 150);
}

for (const [i, ex] of EXAMPLES.entries()) {
  const opt = document.createElement("option");
  opt.value = String(i);
  opt.textContent = ex.label;
  examplesSelect.appendChild(opt);
}

function loadExample(index: number): void {
  const ex = EXAMPLES[index];
  if (!ex) return;
  currentFilename = ex.filename;
  setDoc(input, ex.source);
  run();
}

examplesSelect.addEventListener("change", () => {
  loadExample(Number(examplesSelect.value));
});

if (EXAMPLES.length > 0) {
  loadExample(0);
} else {
  run();
}
