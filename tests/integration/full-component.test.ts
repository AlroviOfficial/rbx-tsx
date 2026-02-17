import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";
import { readFileSync } from "fs";
import { join } from "path";

function compileFixture(name: string) {
  const path = join(import.meta.dir, "..", "fixtures", name);
  const source = readFileSync(path, "utf-8");
  return compile(source, name, { warnLevel: "none" });
}

function compileTSX(source: string, filename = "test.tsx") {
  return compile(source, filename, { warnLevel: "none" });
}

describe("Card component (full example from spec)", () => {
  test("compiles without errors", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toBeDefined();
    expect(result.luau.length).toBeGreaterThan(0);
  });

  test("includes React require", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain('local React = require(game:GetService("ReplicatedStorage").Packages.React)');
  });

  test("includes useState and useCallback locals", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("local useState = React.useState");
    expect(result.luau).toContain("local useCallback = React.useCallback");
  });

  test("declares CardProps type", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("type CardProps");
  });

  test("generates function Card(props)", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("local function Card(props: CardProps)");
  });

  test("destructures props with defaults", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("local title = props.title");
    expect(result.luau).toContain("initialCount");
  });

  test("transforms useState hook", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("local count, setCount = useState(");
  });

  test("transforms useCallback hook", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("local increment = useCallback(function()");
  });

  test("maps div to Frame", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain('React.createElement("Frame"');
  });

  test("maps button to TextButton", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain('React.createElement("TextButton"');
  });

  test("maps className to React.Tag", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("[React.Tag] = \"card\"");
  });

  test("maps onClick to React.Event.Activated", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("React.Event.Activated");
  });

  test("returns Card at end", () => {
    const result = compileFixture("Card.tsx");
    expect(result.luau).toContain("return Card");
  });
});

describe("SimpleButton component", () => {
  test("compiles without errors", () => {
    const result = compileFixture("SimpleButton.tsx");
    expect(result.luau).toBeDefined();
  });

  test("handles default prop values", () => {
    const result = compileFixture("SimpleButton.tsx");
    expect(result.luau).toContain("variant");
    expect(result.luau).toContain('"primary"');
  });

  test("maps button to TextButton", () => {
    const result = compileFixture("SimpleButton.tsx");
    expect(result.luau).toContain('"TextButton"');
  });
});

describe("UseEffect component", () => {
  test("compiles without errors", () => {
    const result = compileFixture("UseEffect.tsx");
    expect(result.luau).toBeDefined();
  });

  test("imports RunService via GetService", () => {
    const result = compileFixture("UseEffect.tsx");
    expect(result.luau).toContain('game:GetService("RunService")');
  });

  test("transforms useEffect with cleanup", () => {
    const result = compileFixture("UseEffect.tsx");
    expect(result.luau).toContain("React.useEffect");
    // Should have a cleanup return function
    expect(result.luau).toContain("return function()");
  });

  test("transforms useRef", () => {
    const result = compileFixture("UseEffect.tsx");
    expect(result.luau).toContain("React.useRef");
  });

  test("uses : syntax for Roblox methods", () => {
    const result = compileFixture("UseEffect.tsx");
    expect(result.luau).toContain(":Connect(");
    expect(result.luau).toContain(":Disconnect()");
  });
});

describe("CustomHook module", () => {
  test("compiles .ts file", () => {
    const result = compileFixture("CustomHook.ts");
    expect(result.luau).toBeDefined();
  });

  test("exports useCounter as named export", () => {
    const result = compileFixture("CustomHook.ts");
    expect(result.luau).toContain("useCounter");
  });

  test("returns object with count, increment, decrement", () => {
    const result = compileFixture("CustomHook.ts");
    expect(result.luau).toContain("count = count");
    expect(result.luau).toContain("increment = increment");
    expect(result.luau).toContain("decrement = decrement");
  });
});

describe("basic JSX transforms", () => {
  test("fragment", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() {
        return (
          <>
            <span>Hello</span>
            <span>World</span>
          </>
        );
      }
    `);
    expect(result.luau).toContain("React.createFragment");
  });

  test("conditional rendering with &&", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App({ visible }: { visible: boolean }) {
        return <div>{visible && <span>Hello</span>}</div>;
      }
    `);
    expect(result.luau).toContain("and");
  });

  test("ternary rendering", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App({ error }: { error: boolean }) {
        return <div>{error ? <span>Error!</span> : <span>OK</span>}</div>;
      }
    `);
    expect(result.luau).toContain("if error then");
  });

  test("list rendering with map", () => {
    const result = compileTSX(`
      import React from "react";
      export default function List({ items }: { items: string[] }) {
        return <div>{items.map((item, i) => <span key={i}>{item}</span>)}</div>;
      }
    `);
    expect(result.luau).toContain("for");
    expect(result.luau).toContain("in items do");
  });
});
