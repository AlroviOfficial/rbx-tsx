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

// ── HTML element support ──

describe("semantic HTML elements", () => {
  test("nav/header/footer/main/section/article/aside/form map to Frame", () => {
    for (const tag of ["nav", "header", "footer", "main", "section", "article", "aside", "form"]) {
      const result = compileTSX(`
        import React from "react";
        export default function App() {
          return <${tag}><div /></${tag}>;
        }
      `);
      expect(result).toContain('React.createElement("Frame"');
    }
  });

  test("semantic containers get transparent background default", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <nav><div /></nav>;
      }
    `);
    expect(result).toContain("BackgroundTransparency = 1");
    expect(result).toContain("Enum.AutomaticSize.Y");
  });

  test("no unsupported-element warning for semantic elements", () => {
    const result = compile(`
      import React from "react";
      export default function App() {
        return <nav><div /></nav>;
      }
    `, "test.tsx", { warnLevel: "all" });
    const unsupported = result.warnings.getWarnings().filter(w => w.code === "unsupported-element");
    expect(unsupported.length).toBe(0);
  });
});

describe("list elements", () => {
  test("ul auto-injects vertical UIListLayout child", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <ul><li>Item</li></ul>;
      }
    `);
    expect(result).toContain('"UIListLayout"');
    expect(result).toContain("Enum.FillDirection.Vertical");
  });

  test("ol auto-injects vertical UIListLayout child", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <ol><li>Item</li></ol>;
      }
    `);
    expect(result).toContain('"UIListLayout"');
  });

  test("li gets AutomaticSize default prop", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <li><span>Item</span></li>;
      }
    `);
    expect(result).toContain("Enum.AutomaticSize.Y");
    expect(result).toContain("BackgroundTransparency = 1");
  });
});

describe("table elements", () => {
  test("table gets vertical UIListLayout", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <table><tr><td>Cell</td></tr></table>;
      }
    `);
    expect(result).toContain('"UIListLayout"');
    expect(result).toContain("Enum.FillDirection.Vertical");
  });

  test("tr gets horizontal UIListLayout", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <tr><td>A</td><td>B</td></tr>;
      }
    `);
    expect(result).toContain("Enum.FillDirection.Horizontal");
  });

  test("td maps to TextLabel with text as Text prop", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <td>Cell content</td>;
      }
    `);
    expect(result).toContain('React.createElement("TextLabel"');
    expect(result).toContain('Text = "Cell content"');
  });

  test("th gets bold FontFace", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <th>Header</th>;
      }
    `);
    expect(result).toContain("FontFace");
    expect(result).toContain("Enum.FontWeight.Bold");
  });
});

describe("interactive elements", () => {
  test("dialog gets centered positioning", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <dialog><div /></dialog>;
      }
    `);
    expect(result).toContain("Vector2.new(0.5, 0.5)");
    expect(result).toContain("UDim2.fromScale(0.5, 0.5)");
  });

  test("summary maps to TextButton with text", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <summary>Click me</summary>;
      }
    `);
    expect(result).toContain('React.createElement("TextButton"');
    expect(result).toContain('Text = "Click me"');
  });

  test("option maps to TextButton with text", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <option>Choice A</option>;
      }
    `);
    expect(result).toContain('React.createElement("TextButton"');
    expect(result).toContain('Text = "Choice A"');
  });
});

describe("default props override", () => {
  test("user-provided Size on li overrides default", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <li Size={UDim2.new(0.5, 0, 0, 50)}><span>Item</span></li>;
      }
    `);
    // User's Size should be present
    expect(result).toContain("Size");
    // Default UDim2.new(1, 0, 0, 0) should NOT appear (user overrides it)
    expect(result).not.toContain("UDim2.new(1, 0, 0, 0)");
  });

  test("user-provided BackgroundTransparency overrides default", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return <nav BackgroundTransparency={0}><div /></nav>;
      }
    `);
    expect(result).toContain("BackgroundTransparency = 0");
    // Should not have two BackgroundTransparency entries
    const matches = result.match(/BackgroundTransparency/g);
    expect(matches?.length).toBe(1);
  });
});
