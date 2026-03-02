import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";
import type { PackageManifest } from "../../src/package-manifest.ts";

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

describe("dynamic import", () => {
  test("import('./module') compiles to Promise:resolve(require(path))", () => {
    const result = compileTS(`
      const mod = import("./Card");
    `);
    expect(result).toContain("Promise:resolve");
    expect(result).toContain("require(script.Parent.Card)");
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

  test("re-exports emit require and locals", () => {
    const result = compileTS(`
      export { foo, bar } from "./utils";
    `);
    expect(result).toContain("require(script.Parent.utils)");
    expect(result).toContain("local foo = ");
    expect(result).toContain("local bar = ");
    expect(result).toContain("foo = foo");
    expect(result).toContain("bar = bar");
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

// ── Task 8: CSS module property access ──

describe("CSS module property access", () => {
  test("styles.card resolves to property access on required module", () => {
    const result = compileTSX(`
      import React from "react";
      import styles from "./Card.module.css";
      export default function App() {
        return <div className={styles.card} />;
      }
    `);
    expect(result).toContain("styles.card");
    expect(result).toContain('require(script.Parent["Card.style"])');
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

describe("package imports with manifest", () => {
  const wallyManifest: PackageManifest = {
    pm: "wally",
    dependencyKeys: new Map([
      ["mycoollib", "MyCoolLib"],
      ["react", "React"],
    ]),
  };

  test("resolves correct casing from wally manifest", () => {
    const result = compile(
      `import MyCoolLib from "my-cool-lib";\nconst x = MyCoolLib;`,
      "test.ts",
      { warnLevel: "none", packageManifest: wallyManifest }
    ).luau;
    expect(result).toContain("Packages.MyCoolLib");
    expect(result).not.toContain("Mycoollib");
  });

  test("named imports with manifest", () => {
    const result = compile(
      `import { helper } from "my-cool-lib";\nconst x = helper;`,
      "test.ts",
      { warnLevel: "none", packageManifest: wallyManifest }
    ).luau;
    expect(result).toContain("Packages.MyCoolLib");
  });

  test("re-exports with manifest", () => {
    const result = compile(
      `export { foo } from "my-cool-lib";`,
      "test.ts",
      { warnLevel: "none", packageManifest: wallyManifest }
    ).luau;
    expect(result).toContain("Packages.MyCoolLib");
  });

  test("type imports with manifest", () => {
    const result = compile(
      `import type { Foo } from "my-cool-lib";\nconst x: Foo = {} as any;`,
      "test.ts",
      { warnLevel: "none", packageManifest: wallyManifest }
    ).luau;
    expect(result).toContain("Packages.MyCoolLib");
  });

  test("falls back without manifest (backwards compat)", () => {
    const result = compile(
      `import something from "some-lib";\nconst x = something;`,
      "test.ts",
      { warnLevel: "none" }
    ).luau;
    expect(result).toContain("Packages.Somelib");
  });
});
