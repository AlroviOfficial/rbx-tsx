import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";

function compileTSX(source: string): string {
  return compile(source, "test.tsx", { warnLevel: "none" }).luau;
}

function compileTS(source: string): string {
  return compile(source, "test.ts", { warnLevel: "none" }).luau;
}

describe("React imports", () => {
  test("import React from 'react'", () => {
    const result = compileTSX(`
      import React from "react";
      export default function App() { return <div />; }
    `);
    expect(result).toContain('local React = require(game:GetService("ReplicatedStorage").Packages.React)');
  });

  test("named React imports", () => {
    const result = compileTSX(`
      import React, { useState, useEffect } from "react";
      export default function App() {
        const [x, setX] = useState(0);
        useEffect(() => {}, []);
        return <div />;
      }
    `);
    expect(result).toContain("local useState = React.useState");
    expect(result).toContain("local useEffect = React.useEffect");
  });
});

describe("Roblox service imports", () => {
  test("@rbx-services import", () => {
    const result = compileTS(`
      import { Players, RunService } from "@rbx-services";
      const p = Players.LocalPlayer;
    `);
    expect(result).toContain('game:GetService("Players")');
    expect(result).toContain('game:GetService("RunService")');
  });

  test("auto-detect service usage", () => {
    const result = compileTS(`
      const player = Players.LocalPlayer;
    `);
    expect(result).toContain('game:GetService("Players")');
  });
});

describe("relative imports", () => {
  test("default import from sibling", () => {
    const result = compileTS(`
      import Card from "./Card";
      const x = Card;
    `);
    expect(result).toContain("require(script.Parent.Card)");
  });

  test("default import from parent", () => {
    const result = compileTS(`
      import App from "../App";
      const x = App;
    `);
    expect(result).toContain("require(script.Parent.Parent.App)");
  });
});

describe("exports", () => {
  test("default-only export", () => {
    const result = compileTS(`
      function helper() { return 42; }
      export default function main() { return helper(); }
    `);
    expect(result).toContain("return main");
    // Should NOT be wrapped in { default = ... }
    expect(result).not.toContain("default = main");
  });

  test("named exports", () => {
    const result = compileTS(`
      export function helper() { return 42; }
      export const CONSTANT = 99;
    `);
    expect(result).toContain("helper = helper");
    expect(result).toContain("CONSTANT = CONSTANT");
  });

  test("mixed default + named exports", () => {
    const result = compileTS(`
      export function helper() { return 42; }
      export default function main() { return helper(); }
    `);
    expect(result).toContain("default = main");
    expect(result).toContain("helper = helper");
  });

  test("type exports", () => {
    const result = compileTS(`
      export interface Props { x: number; }
    `);
    expect(result).toContain("export type Props");
  });
});

describe("CSS imports", () => {
  test("side-effect CSS import produces no output", () => {
    const result = compileTSX(`
      import React from "react";
      import "./Card.css";
      export default function App() { return <div />; }
    `);
    // Should not error, CSS import just ignored
    expect(result).toContain("React");
  });

  test("CSS module import", () => {
    const result = compileTSX(`
      import React from "react";
      import styles from "./Card.module.css";
      export default function App() { return <div className={styles.card} />; }
    `);
    expect(result).toContain("local styles = require(");
    expect(result).toContain("Card.style");
  });
});

describe("ReactRoblox imports", () => {
  test("createRoot from react-roblox", () => {
    const result = compileTSX(`
      import React from "react";
      import { createRoot } from "react-roblox";
      const root = createRoot(gui);
    `);
    expect(result).toContain("local ReactRoblox = require(");
    expect(result).toContain("local createRoot = ReactRoblox.createRoot");
  });
});

describe("file naming", () => {
  test("index.tsx → init.luau", () => {
    const { getOutputPath } = require("../../src/compiler.ts");
    expect(getOutputPath("components/index.tsx")).toBe("components/init.luau");
  });

  test("Component.tsx → Component.luau", () => {
    const { getOutputPath } = require("../../src/compiler.ts");
    expect(getOutputPath("components/Card.tsx")).toBe("components/Card.luau");
  });

  test("types.ts → types.luau", () => {
    const { getOutputPath } = require("../../src/compiler.ts");
    expect(getOutputPath("types/index.ts")).toBe("types/init.luau");
  });
});
