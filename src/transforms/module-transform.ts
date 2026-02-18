import ts from "typescript";
import type { LuauStatement, LuauExpression, LuauTableEntry } from "../ast/luau-ast.ts";
import {
  ident, str, num, bool, nil, call, methodCall, index, bracketIndex,
  table, binary, unary, ifExpr, funcExpr, concat, raw,
} from "../ast/luau-ast.ts";
import { ROBLOX_SERVICES } from "../mappings/roblox-services.ts";
import type { TransformContext } from "./transform-context.ts";
import { transformExpression } from "./expression-transform.ts";
import { transformType } from "./type-transform.ts";

/**
 * Process import declarations and produce Luau require statements.
 */
export function transformImport(
  node: ts.ImportDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  const results: LuauStatement[] = [];
  const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;

  // Type-only imports → skip (only used for type-checking)
  if (node.importClause?.isTypeOnly) {
    // Handle type imports — emit as type alias references if needed
    return transformTypeImport(node, ctx);
  }

  // CSS import: import "./Card.css" or import styles from "./Card.module.css"
  if (moduleSpecifier.endsWith(".css")) {
    return transformCSSImport(node, moduleSpecifier, ctx);
  }

  // React import
  if (moduleSpecifier === "react") {
    return transformReactImport(node, ctx);
  }

  // React-DOM / React-Roblox
  if (moduleSpecifier === "react-dom" || moduleSpecifier === "react-roblox" || moduleSpecifier === "react-dom/client") {
    return transformReactRobloxImport(node, ctx);
  }

  // @rbx-services
  if (moduleSpecifier === "@rbx-services") {
    return transformServicesImport(node, ctx);
  }

  // Relative imports
  if (moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../")) {
    return transformRelativeImport(node, moduleSpecifier, ctx);
  }

  // Package imports (e.g., from node_modules)
  return transformPackageImport(node, moduleSpecifier, ctx);
}

// ── React Import ──

function transformReactImport(
  node: ts.ImportDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  ctx.needsReact = true;
  const results: LuauStatement[] = [];

  // Named imports: import { useState, useEffect } from "react"
  if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
    for (const spec of node.importClause.namedBindings.elements) {
      const name = spec.name.text;
      const originalName = spec.propertyName?.text ?? name;
      ctx.reactImports.add(originalName);
    }
  }

  // Default import is always React, already handled
  return results;
}

// ── React Roblox Import ──

function transformReactRobloxImport(
  node: ts.ImportDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  ctx.needsReactRoblox = true;
  const results: LuauStatement[] = [];

  // Named imports: import { createRoot } from "react-roblox"
  if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
    for (const spec of node.importClause.namedBindings.elements) {
      const name = spec.name.text;
      const originalName = spec.propertyName?.text ?? name;
      // These become: local createRoot = ReactRoblox.createRoot
      results.push({
        type: "local",
        name,
        value: index(ident("ReactRoblox"), originalName),
      });
    }
  }

  return results;
}

// ── Services Import ──

function transformServicesImport(
  node: ts.ImportDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  const results: LuauStatement[] = [];

  if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
    for (const spec of node.importClause.namedBindings.elements) {
      const serviceName = spec.name.text;
      if (ROBLOX_SERVICES.has(serviceName)) {
        ctx.requireService(serviceName);
      }
    }
  }

  return results;
}

// ── CSS Import ──

function transformCSSImport(
  node: ts.ImportDeclaration,
  moduleSpecifier: string,
  ctx: TransformContext,
): LuauStatement[] {
  // import "./Card.css" → side-effect only import, no Luau output
  // import styles from "./Card.module.css" → require style module

  if (node.importClause?.name) {
    // Default import: import styles from "./Card.module.css"
    const localName = node.importClause.name.text;
    const stylePath = cssPathToRequirePath(moduleSpecifier);
    ctx.cssModuleImports.set(localName, stylePath);

    return [{
      type: "local",
      name: localName,
      value: call(ident("require"), [raw(stylePath)]),
    }];
  }

  // Side-effect CSS import — defer attachment to createRoot container
  const stylePath = cssPathToRequirePath(moduleSpecifier);
  ctx.pendingStylesheets.push(stylePath);
  return [];
}

function cssPathToRequirePath(specifier: string): string {
  // "./Card.css" → script.Parent["Card.style"]
  // "./Card.module.css" → script.Parent["Card.style"]
  const parts = specifier.replace(/^\.\//, "").replace(/\.(module\.)?css$/, "");
  const segments = parts.split("/");
  const fileName = segments.pop()!;

  let base = "script.Parent";
  for (const segment of segments) {
    if (segment === "..") {
      base += ".Parent";
    } else {
      base += `.${segment}`;
    }
  }

  return `${base}["${fileName}.style"]`;
}

// ── Relative Import ──

function transformRelativeImport(
  node: ts.ImportDeclaration,
  moduleSpecifier: string,
  ctx: TransformContext,
): LuauStatement[] {
  const results: LuauStatement[] = [];
  const requirePath = relativePathToRequirePath(moduleSpecifier);

  const defaultImport = node.importClause?.name;
  const namedBindings = node.importClause?.namedBindings;

  const hasNamedImports = namedBindings && ts.isNamedImports(namedBindings) && namedBindings.elements.length > 0;
  const hasDefaultImport = !!defaultImport;

  if (hasDefaultImport && hasNamedImports) {
    // import Card, { helper } from "./Card"
    // → local _Card_module = require(...)
    //   local Card = _Card_module.default
    //   local helper = _Card_module.helper
    const moduleName = `_${defaultImport.text}_module`;
    results.push({
      type: "local",
      name: moduleName,
      value: call(ident("require"), [raw(requirePath)]),
    });
    results.push({
      type: "local",
      name: defaultImport.text,
      value: index(ident(moduleName), "default"),
    });
    ctx.importedModules.set(defaultImport.text, moduleSpecifier);

    for (const spec of (namedBindings as ts.NamedImports).elements) {
      if (spec.isTypeOnly) continue;
      const name = spec.name.text;
      const originalName = spec.propertyName?.text ?? name;
      results.push({
        type: "local",
        name,
        value: index(ident(moduleName), originalName),
      });
      ctx.importedModules.set(name, moduleSpecifier);
    }
  } else if (hasDefaultImport) {
    // import Card from "./Card"
    results.push({
      type: "local",
      name: defaultImport.text,
      value: call(ident("require"), [raw(requirePath)]),
    });
    ctx.importedModules.set(defaultImport.text, moduleSpecifier);
  } else if (hasNamedImports) {
    // import { helper, utils } from "./utils"
    const namedImports = namedBindings as ts.NamedImports;
    const nonTypeImports = namedImports.elements.filter((e) => !e.isTypeOnly);
    const typeOnlyImports = namedImports.elements.filter((e) => e.isTypeOnly);

    if (nonTypeImports.length > 0) {
      const moduleName = `_module_${sanitizeName(moduleSpecifier)}`;
      results.push({
        type: "local",
        name: moduleName,
        value: call(ident("require"), [raw(requirePath)]),
      });

      for (const spec of nonTypeImports) {
        const name = spec.name.text;
        const originalName = spec.propertyName?.text ?? name;
        results.push({
          type: "local",
          name,
          value: index(ident(moduleName), originalName),
        });
        ctx.importedModules.set(name, moduleSpecifier);
      }
    }

    // Type-only imports → emit type aliases
    for (const spec of typeOnlyImports) {
      const name = spec.name.text;
      const originalName = spec.propertyName?.text ?? name;
      const moduleName = `_types_${sanitizeName(moduleSpecifier)}`;
      // We need the require for type resolution
      if (typeOnlyImports.indexOf(spec) === 0 && nonTypeImports.length === 0) {
        results.push({
          type: "local",
          name: moduleName,
          value: call(ident("require"), [raw(requirePath)]),
        });
      }
      results.push({
        type: "type-alias",
        name,
        definition: `${nonTypeImports.length > 0 ? `_module_${sanitizeName(moduleSpecifier)}` : moduleName}.${originalName}`,
      });
    }
  } else if (namedBindings && ts.isNamespaceImport(namedBindings)) {
    // import * as Utils from "./utils"
    const name = namedBindings.name.text;
    results.push({
      type: "local",
      name,
      value: call(ident("require"), [raw(requirePath)]),
    });
    ctx.importedModules.set(name, moduleSpecifier);
  } else {
    // Side-effect import: import "./setup"
    results.push({
      type: "expression-statement",
      expr: call(ident("require"), [raw(requirePath)]),
    });
  }

  return results;
}

function relativePathToRequirePath(specifier: string): string {
  // "./Card" → script.Parent.Card
  // "../types" → script.Parent.Parent.types
  // "./Button/index" → script.Parent.Button
  // "./components/Card" → script.Parent.components.Card

  const parts = specifier
    .replace(/\.(tsx?|jsx?)$/, "") // Strip file extensions
    .split("/");

  let base = "script";
  for (const part of parts) {
    if (part === ".") {
      base += ".Parent";
    } else if (part === "..") {
      base += ".Parent.Parent";
    } else if (part === "index") {
      // index → folder module (skip, already pointed at folder)
    } else {
      base += `.${part}`;
    }
  }

  return base;
}

// ── Package Import ──

function transformPackageImport(
  node: ts.ImportDeclaration,
  moduleSpecifier: string,
  ctx: TransformContext,
): LuauStatement[] {
  // Generic package import → require from Packages folder
  const results: LuauStatement[] = [];
  const packageName = capitalize(moduleSpecifier.replace(/[^a-zA-Z0-9]/g, ""));

  const requirePath = `ReplicatedStorage.Packages.${packageName}`;

  if (node.importClause?.name) {
    results.push({
      type: "local",
      name: node.importClause.name.text,
      value: call(ident("require"), [raw(requirePath)]),
    });
    ctx.importedModules.set(node.importClause.name.text, moduleSpecifier);
  }

  if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
    const moduleName = `_${packageName}`;
    results.push({
      type: "local",
      name: moduleName,
      value: call(ident("require"), [raw(requirePath)]),
    });

    for (const spec of node.importClause.namedBindings.elements) {
      if (spec.isTypeOnly) continue;
      const name = spec.name.text;
      const originalName = spec.propertyName?.text ?? name;
      results.push({
        type: "local",
        name,
        value: index(ident(moduleName), originalName),
      });
      ctx.importedModules.set(name, moduleSpecifier);
    }
  }

  return results;
}

// ── Type-only Import ──

function transformTypeImport(
  node: ts.ImportDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  const results: LuauStatement[] = [];
  const moduleSpecifier = (node.moduleSpecifier as ts.StringLiteral).text;

  if (moduleSpecifier === "react") return results;

  const requirePath = moduleSpecifier.startsWith("./") || moduleSpecifier.startsWith("../")
    ? relativePathToRequirePath(moduleSpecifier)
    : `ReplicatedStorage.Packages.${capitalize(moduleSpecifier)}`;

  if (node.importClause?.namedBindings && ts.isNamedImports(node.importClause.namedBindings)) {
    const typesModuleName = `_types_${sanitizeName(moduleSpecifier)}`;
    let needsRequire = false;

    for (const spec of node.importClause.namedBindings.elements) {
      const name = spec.name.text;
      const originalName = spec.propertyName?.text ?? name;
      needsRequire = true;
      results.push({
        type: "type-alias",
        name,
        definition: `${typesModuleName}.${originalName}`,
      });
    }

    if (needsRequire) {
      results.unshift({
        type: "local",
        name: typesModuleName,
        value: call(ident("require"), [raw(requirePath)]),
      });
    }
  }

  return results;
}

// ── Export Processing ──

/**
 * Process export declarations and update context.
 */
export function processExportDeclaration(
  node: ts.ExportDeclaration,
  ctx: TransformContext,
): LuauStatement[] {
  // export { X, Y } from "./module" → re-exports
  // export type { CardProps } → type re-export

  if (node.isTypeOnly) {
    // Type-only exports
    if (node.exportClause && ts.isNamedExports(node.exportClause)) {
      for (const spec of node.exportClause.elements) {
        ctx.typeExports.add(spec.name.text);
      }
    }
    return [];
  }

  if (node.exportClause && ts.isNamedExports(node.exportClause)) {
    for (const spec of node.exportClause.elements) {
      const name = spec.name.text;
      const originalName = spec.propertyName?.text ?? name;
      ctx.namedExports.set(name, originalName);
      ctx.hasNamedExports = true;
    }
  }

  return [];
}

/**
 * Generate the return statement for the module.
 */
export function generateModuleReturn(ctx: TransformContext): LuauStatement[] {
  const results: LuauStatement[] = [];

  // Export type aliases
  // (already emitted inline as export type X = ...)

  // Default-only export → return defaultExport
  if (ctx.defaultExport && !ctx.hasNamedExports) {
    results.push({
      type: "return",
      value: ident(ctx.defaultExport),
    });
    return results;
  }

  // Named exports (with optional default)
  if (ctx.hasNamedExports || ctx.defaultExport) {
    const entries: LuauTableEntry[] = [];

    if (ctx.defaultExport) {
      entries.push({
        key: str("default"),
        value: ident(ctx.defaultExport),
      });
    }

    for (const [exportName, localName] of ctx.namedExports) {
      entries.push({
        key: str(exportName),
        value: ident(localName),
      });
    }

    if (entries.length > 0) {
      results.push({
        type: "return",
        value: table(entries),
      });
    }
  }

  return results;
}

// ── Helpers ──

function sanitizeName(specifier: string): string {
  return specifier.replace(/[^a-zA-Z0-9]/g, "_").replace(/^_+|_+$/g, "");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
