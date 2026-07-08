import { describe, test, expect } from "bun:test";
import { compile } from "../../src/compiler.ts";
import { instancePathToStringRequire } from "../../src/transforms/path-resolution.ts";

describe("instancePathToStringRequire", () => {
	test("converts game:GetService chains to @game paths", () => {
		expect(instancePathToStringRequire('game:GetService("ReplicatedStorage")')).toBe(
			"@game/ReplicatedStorage"
		);
		expect(
			instancePathToStringRequire(
				'game:GetService("ServerScriptService").server.balloon.spawner'
			)
		).toBe("@game/ServerScriptService/server/balloon/spawner");
	});

	test("converts script-relative chains", () => {
		expect(instancePathToStringRequire("script.Parent.Card")).toBe("./Card");
		expect(instancePathToStringRequire("script.Parent.util.helper")).toBe(
			"./util/helper"
		);
		expect(instancePathToStringRequire("script.Parent.Parent.shared.config")).toBe(
			"../shared/config"
		);
		expect(
			instancePathToStringRequire("script.Parent.Parent.Parent.types")
		).toBe("../../types");
	});

	test("converts own-child access to @self", () => {
		expect(instancePathToStringRequire("script.Button")).toBe("@self/Button");
	});

	test("returns null for paths it cannot express", () => {
		expect(instancePathToStringRequire('script.Parent["Card.style"]')).toBeNull();
		expect(instancePathToStringRequire("MyCustom.Alias.Path")).toBeNull();
	});
});

describe("compile with stringRequires", () => {
	const opts = { stringRequires: true, warnLevel: "none" as const };

	test("emits relative imports as string requires", () => {
		const result = compile(
			'import { helper } from "./util/helper";\nexport const x = helper();\n',
			"main.ts",
			opts
		);
		expect(result.luau).toContain('require("./util/helper")');
	});

	test("emits parent-directory imports as string requires", () => {
		const result = compile(
			'import config from "../shared/config";\nexport const x = config;\n',
			"balloon/server/spawner.ts",
			opts
		);
		expect(result.luau).toContain('require("../shared/config")');
	});

	test("emits child imports from index files via @self", () => {
		const result = compile(
			'import { child } from "./child";\nexport const x = child;\n',
			"index.ts",
			opts
		);
		expect(result.luau).toContain('require("@self/child")');
	});

	test("emits the React require as an @game path", () => {
		const result = compile(
			'import React from "react";\nexport function App() {\n\treturn <div />;\n}\n',
			"App.tsx",
			opts
		);
		expect(result.luau).toContain(
			'require("@game/ReplicatedStorage/Packages/React")'
		);
	});

	test("emits Rojo path aliases as @game paths", () => {
		const aliases = new Map([
			["shared/config", 'game:GetService("ReplicatedStorage").shared.config'],
		]);
		const result = compile(
			'import config from "../shared/config";\nexport const x = config;\n',
			"server/main.ts",
			{ ...opts, pathAliases: aliases }
		);
		expect(result.luau).toContain(
			'require("@game/ReplicatedStorage/shared/config")'
		);
	});

	test("keeps instance paths when the option is off", () => {
		const result = compile(
			'import { helper } from "./util/helper";\nexport const x = helper();\n',
			"main.ts",
			{ warnLevel: "none" }
		);
		expect(result.luau).toContain("require(script.Parent.util.helper)");
	});
});
