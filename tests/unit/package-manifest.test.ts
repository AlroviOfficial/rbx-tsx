import { describe, test, expect } from "bun:test";
import {
  normalizePackageName,
  resolvePackageName,
  findPackageManifest,
  type PackageManifest,
} from "../../src/package-manifest.ts";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";

describe("normalizePackageName", () => {
  test("lowercases and strips non-alphanumeric", () => {
    expect(normalizePackageName("React")).toBe("react");
    expect(normalizePackageName("my-cool-lib")).toBe("mycoollib");
    expect(normalizePackageName("@scope/foo")).toBe("scopefoo");
    expect(normalizePackageName("ReactRoblox")).toBe("reactroblox");
    expect(normalizePackageName("some_pkg-v2")).toBe("somepkgv2");
  });
});

describe("resolvePackageName", () => {
  const manifest: PackageManifest = {
    pm: "wally",
    dependencyKeys: new Map([
      ["react", "React"],
      ["reactroblox", "ReactRoblox"],
      ["mycoollib", "MyCoolLib"],
    ]),
  };

  test("resolves from manifest with correct casing", () => {
    expect(resolvePackageName("react", manifest)).toBe("React");
    expect(resolvePackageName("React", manifest)).toBe("React");
    expect(resolvePackageName("my-cool-lib", manifest)).toBe("MyCoolLib");
  });

  test("falls back to capitalize+strip when not in manifest", () => {
    expect(resolvePackageName("unknown-pkg", manifest)).toBe("Unknownpkg");
  });

  test("falls back when manifest is null", () => {
    expect(resolvePackageName("react", null)).toBe("React");
    expect(resolvePackageName("my-cool-lib", null)).toBe("Mycoollib");
    expect(resolvePackageName("@scope/foo", null)).toBe("Scopefoo");
  });
});

describe("findPackageManifest", () => {
  const tmpDir = join(import.meta.dir, "__tmp_manifest_test__");

  function setup(files: Record<string, string>) {
    rmSync(tmpDir, { recursive: true, force: true });
    mkdirSync(tmpDir, { recursive: true });
    for (const [name, content] of Object.entries(files)) {
      writeFileSync(join(tmpDir, name), content);
    }
  }

  function cleanup() {
    rmSync(tmpDir, { recursive: true, force: true });
  }

  test("parses wally.toml dependencies", () => {
    setup({
      "wally.toml": `[package]
name = "developer/demo"
version = "0.1.0"
registry = "https://github.com/UpliftGames/wally-index"
realm = "shared"

[dependencies]
React = "jsdotlua/react@17.1.0"
ReactRoblox = "jsdotlua/react-roblox@17.1.0"
MyCoolLib = "author/my-cool-lib@2.0.0"

[server-dependencies]
ServerUtil = "author/server-util@1.0.0"
`,
    });

    const manifest = findPackageManifest(tmpDir);
    expect(manifest).not.toBeNull();
    expect(manifest!.pm).toBe("wally");
    expect(manifest!.dependencyKeys.get("react")).toBe("React");
    expect(manifest!.dependencyKeys.get("reactroblox")).toBe("ReactRoblox");
    expect(manifest!.dependencyKeys.get("mycoollib")).toBe("MyCoolLib");
    expect(manifest!.dependencyKeys.get("serverutil")).toBe("ServerUtil");
    cleanup();
  });

  test("parses pesde.toml dependencies", () => {
    setup({
      "pesde.toml": `[package]
name = "developer/demo"
version = "0.1.0"

[target]
environment = "roblox"

[indices]
default = "https://registry.pesde.dev"

[dependencies]
React = { name = "jsdotlua/react", version = "^17.1.0" }
ReactRoblox = { name = "jsdotlua/react-roblox", version = "^17.1.0" }
`,
    });

    const manifest = findPackageManifest(tmpDir);
    expect(manifest).not.toBeNull();
    expect(manifest!.pm).toBe("pesde");
    expect(manifest!.dependencyKeys.get("react")).toBe("React");
    expect(manifest!.dependencyKeys.get("reactroblox")).toBe("ReactRoblox");
    cleanup();
  });

  test("handles pesde multiline dependency values", () => {
    setup({
      "pesde.toml": `[dependencies]
React = {
  name = "jsdotlua/react",
  version = "^17.1.0",
}
Foo = { name = "acme/foo", version = "^1.0.0" }
`,
    });

    const manifest = findPackageManifest(tmpDir);
    expect(manifest).not.toBeNull();
    expect(manifest!.dependencyKeys.get("react")).toBe("React");
    expect(manifest!.dependencyKeys.get("foo")).toBe("Foo");
    cleanup();
  });

  test("returns null when no manifest found", () => {
    setup({});
    const manifest = findPackageManifest(tmpDir);
    expect(manifest).toBeNull();
    cleanup();
  });

  test("prefers wally.toml when both exist", () => {
    setup({
      "wally.toml": `[dependencies]\nReact = "jsdotlua/react@17.1.0"\n`,
      "pesde.toml": `[dependencies]\nReact = { name = "jsdotlua/react", version = "^17.1.0" }\n`,
    });

    const manifest = findPackageManifest(tmpDir);
    expect(manifest).not.toBeNull();
    expect(manifest!.pm).toBe("wally");
    cleanup();
  });
});
