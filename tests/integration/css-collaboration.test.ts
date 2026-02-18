import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";
import { compile as compileCss } from "../../../rbx-css/src/compiler.ts";
import { generateManifest } from "../../../rbx-css/src/manifest.ts";
import { generateLuau as generateCssLuau } from "../../../rbx-css/src/codegen/luau.ts";
import { readFileSync } from "fs";
import { join } from "path";
import type { CSSManifest } from "../../src/css-manifest.ts";

const fixturesDir = join(import.meta.dir, "..", "fixtures");

function loadFixture(name: string): string {
  return readFileSync(join(fixturesDir, name), "utf-8");
}

function compileCssFixture(name: string) {
  const source = loadFixture(name);
  const result = compileCss(
    [{ filename: name, content: source }],
    { name: "StyleSheet", warnLevel: "none", strict: false },
  );
  const manifest = generateManifest(result.overflowScrollClasses);
  const luau = generateCssLuau(result.ir, { minify: false, sourceFile: name });
  return { result, manifest, luau };
}

function compileTsxWithManifest(source: string, manifest: CSSManifest, filename = "test.tsx") {
  return compile(source, filename, { warnLevel: "none", cssManifest: manifest });
}

describe("rbx-css manifest generation", () => {
  test("compiles CSS fixture without errors", () => {
    const { luau } = compileCssFixture("StyledPanel.css");
    expect(luau).toBeDefined();
    expect(luau.length).toBeGreaterThan(0);
  });

  test("CSS output contains style rules", () => {
    const { luau } = compileCssFixture("StyledPanel.css");
    expect(luau).toContain('rule.Selector = ".panel"');
    // scroll-area has overflow:scroll which produces no direct props,
    // but its padding generates a pseudo-instance rule
    expect(luau).toContain('rule.Selector = ".scroll-area::UIPadding"');
    expect(luau).toContain('rule.Selector = ".title"');
    expect(luau).toContain('rule.Selector = ".card"');
  });

  test("manifest marks scroll-area as overflowScroll", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    expect(manifest.classes["scroll-area"]).toEqual({ overflowScroll: true });
  });

  test("manifest marks non-scroll classes correctly", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    expect(manifest.classes["panel"]).toEqual({ overflowScroll: false });
    expect(manifest.classes["card"]).toEqual({ overflowScroll: false });
    expect(manifest.classes["title"]).toEqual({ overflowScroll: false });
  });

  test("manifest contains element map", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    expect(manifest.elementMap).toBeDefined();
    expect(manifest.elementMap["div"]).toBe("Frame");
    expect(manifest.elementMap["span"]).toBe("TextLabel");
  });
});

describe("TSX compilation with CSS manifest", () => {
  test("compiles StyledPanel.tsx without errors", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const source = loadFixture("StyledPanel.tsx");
    const result = compileTsxWithManifest(source, manifest, "StyledPanel.tsx");
    expect(result.luau).toBeDefined();
    expect(result.luau.length).toBeGreaterThan(0);
  });

  test("upgrades div with scroll-area className to ScrollingFrame", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const source = loadFixture("StyledPanel.tsx");
    const result = compileTsxWithManifest(source, manifest, "StyledPanel.tsx");
    expect(result.luau).toContain('React.createElement("ScrollingFrame", { [React.Tag] = "scroll-area"');
  });

  test("keeps div with panel className as Frame", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const source = loadFixture("StyledPanel.tsx");
    const result = compileTsxWithManifest(source, manifest, "StyledPanel.tsx");
    expect(result.luau).toContain('React.createElement("Frame", { [React.Tag] = "panel"');
  });

  test("keeps div with card className as Frame", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const source = loadFixture("StyledPanel.tsx");
    const result = compileTsxWithManifest(source, manifest, "StyledPanel.tsx");
    expect(result.luau).toContain('React.createElement("Frame", { [React.Tag] = "card"');
  });

  test("maps h1 to TextLabel", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const source = loadFixture("StyledPanel.tsx");
    const result = compileTsxWithManifest(source, manifest, "StyledPanel.tsx");
    expect(result.luau).toContain('React.createElement("TextLabel", { [React.Tag] = "title"');
  });
});

describe("ScrollingFrame upgrade edge cases", () => {
  test("multi-class with one scroll class upgrades to ScrollingFrame", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const result = compileTsxWithManifest(`
      import React from "react";
      export default function App() {
        return <div className="panel scroll-area">content</div>;
      }
    `, manifest);
    expect(result.luau).toContain('"ScrollingFrame"');
  });

  test("no manifest means no upgrade", () => {
    const result = compile(`
      import React from "react";
      export default function App() {
        return <div className="scroll-area">content</div>;
      }
    `, "test.tsx", { warnLevel: "none" });
    expect(result.luau).toContain('"Frame"');
    expect(result.luau).not.toContain('"ScrollingFrame"');
  });

  test("dynamic className does not upgrade (graceful fallthrough)", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const result = compileTsxWithManifest(`
      import React from "react";
      const cls = "scroll-area";
      export default function App() {
        return <div className={cls}>content</div>;
      }
    `, manifest);
    // Dynamic className can't be statically analyzed — stays Frame
    expect(result.luau).toContain('"Frame"');
  });

  test("explicit <scroll> element still works regardless of manifest", () => {
    const { manifest } = compileCssFixture("StyledPanel.css");
    const result = compileTsxWithManifest(`
      import React from "react";
      export default function App() {
        return <scroll className="panel">content</scroll>;
      }
    `, manifest);
    expect(result.luau).toContain('"ScrollingFrame"');
  });
});
