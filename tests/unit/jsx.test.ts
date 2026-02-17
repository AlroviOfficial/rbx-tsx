import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileTSX(source: string): string {
  return compile(source, "test.tsx", { warnLevel: "none" }).luau;
}

// ── Task 2: forwardRef ──

describe("forwardRef", () => {
  test("forwardRef() → React.forwardRef()", () => {
    const result = compileTSX(`
      import React, { forwardRef } from "react";
      const Input = forwardRef((props: any, ref: any) => <input ref={ref} />);
      export default Input;
    `);
    expect(result).toContain("React.forwardRef");
  });
});

// ── Task 3: memo ──

describe("memo", () => {
  test("memo() → React.memo()", () => {
    const result = compileTSX(`
      import React, { memo } from "react";
      const Display = memo(function Display(props: { text: string }) {
        return <span>{props.text}</span>;
      });
      export default Display;
    `);
    expect(result).toContain("React.memo");
  });
});

// ── Task 1: clsx/classnames ──

describe("clsx/classnames", () => {
  test("clsx with strings → joinClasses", () => {
    const result = compileTSX(`
      import React from "react";
      import clsx from "clsx";
      export default function App() {
        return <div className={clsx("base", "extra")} />;
      }
    `);
    expect(result).toContain("joinClasses");
    expect(result).toContain('"base"');
    expect(result).toContain('"extra"');
  });

  test("clsx with object argument expands conditionals", () => {
    const result = compileTSX(`
      import React from "react";
      import clsx from "clsx";
      const isActive = true;
      export default function App() {
        return <div className={clsx("btn", {active: isActive})} />;
      }
    `);
    expect(result).toContain("joinClasses");
    expect(result).toContain('"btn"');
    expect(result).toContain('"active"');
  });

  test("classnames is treated same as clsx", () => {
    const result = compileTSX(`
      import React from "react";
      import classnames from "classnames";
      export default function App() {
        return <div className={classnames("a", "b")} />;
      }
    `);
    expect(result).toContain("joinClasses");
  });
});

// ── Task 5: Inline style expansion ──

describe("inline style expansion", () => {
  test("backgroundColor → BackgroundColor3 prop", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <div style={{backgroundColor: "red"}} />;
      }
    `);
    expect(result).toContain("BackgroundColor3");
  });

  test("style on component passes through as-is", () => {
    const result = compileTSX(`
      import React from "react";
      function MyComp(props: any) { return <div />; }
      export default function App() {
        return <MyComp style={{backgroundColor: "red"}} />;
      }
    `);
    expect(result).toContain("style");
  });
});

// ── Task 11: .map() key handling ──

describe("JSX map key handling", () => {
  test("key prop used as table key in map", () => {
    const result = compileTSX(`
      import React from "react";
      export default function List({ items }: { items: {id: string, text: string}[] }) {
        return <div>{items.map(item => <span key={item.id}>{item.text}</span>)}</div>;
      }
    `);
    expect(result).toContain("item.id");
  });
});

// ── Task 12: e.target.* patterns ──

describe("e.target patterns", () => {
  test("e.target.value → rbx.Text", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <input onChange={(e) => setText(e.target.value)} />;
      }
    `);
    expect(result).toContain("rbx");
  });

  test("e.target.checked generates warning", () => {
    const result = compile(`
      import React from "react";
      export default function App() {
        return <input onChange={(e) => setChecked(e.target.checked)} />;
      }
    `, "test.tsx", { warnLevel: "all" });
    expect(result.warnings.getWarnings().length).toBeGreaterThan(0);
  });
});
