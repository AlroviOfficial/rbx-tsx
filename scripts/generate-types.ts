#!/usr/bin/env bun
/**
 * Fetches the Roblox API Dump + creator-docs YAML files and generates:
 *   - types/datatypes.d.ts    (DataType interfaces from YAML docs)
 *   - types/instances.d.ts    (all Instance-derived class interfaces)
 *   - types/enums.d.ts        (Enum namespace)
 *   - types/services.d.ts     (declare module "@rbx-services")
 *   - types/index.d.ts        (triple-slash refs)
 *   - src/mappings/roblox-services.ts  (Set of service class names)
 *   - src/mappings/roblox-methods.ts   (Set of method names)
 */

import { writeFileSync } from "fs";
import { join } from "path";
import { parse as parseYaml } from "yaml";

const API_DUMP_URL =
  "https://raw.githubusercontent.com/MaximumADHD/Roblox-Client-Tracker/roblox/API-Dump.json";

const CREATOR_DOCS_API =
  "https://api.github.com/repos/Roblox/creator-docs/contents/content/en-us/reference/engine";

const CREATOR_DOCS_RAW =
  "https://raw.githubusercontent.com/Roblox/creator-docs/main/content/en-us/reference/engine";

const ROOT = join(import.meta.dir, "..");
const TYPES_DIR = join(ROOT, "types");
const MAPPINGS_DIR = join(ROOT, "src", "mappings");

// ─── Types for the API dump ───────────────────────────────────────────

interface ValueType {
  Category: string;
  Name: string;
}

interface Parameter {
  Name: string;
  Type: ValueType;
  Default?: string;
}

interface Member {
  MemberType: "Property" | "Function" | "Event" | "Callback";
  Name: string;
  Security: string | { Read: string; Write: string };
  Tags?: string[];
  ValueType?: ValueType;
  Parameters?: Parameter[];
  ReturnType?: ValueType;
}

interface ApiClass {
  Name: string;
  Superclass: string;
  Members: Member[];
  Tags?: string[];
}

interface ApiEnum {
  Name: string;
  Items: { Name: string; Value: number }[];
}

interface ApiDump {
  Classes: ApiClass[];
  Enums: ApiEnum[];
  Version: number;
}

// ─── Types for YAML docs ─────────────────────────────────────────────

interface YamlParam {
  name: string;
  type: string;
  default?: string | null;
  summary?: string;
}

interface YamlConstructor {
  name: string;
  summary?: string;
  parameters?: YamlParam[];
  deprecation_message?: string;
}

interface YamlProperty {
  name: string;
  type: string;
  summary?: string;
  deprecation_message?: string;
}

interface YamlMethod {
  name: string;
  summary?: string;
  parameters?: YamlParam[];
  returns?: { type: string }[] | string;
  deprecation_message?: string;
}

interface YamlConstant {
  name: string;
  type: string;
  summary?: string;
  deprecation_message?: string;
}

interface YamlDatatype {
  name: string;
  type: string;
  summary?: string;
  constructors?: YamlConstructor[];
  properties?: YamlProperty[];
  methods?: YamlMethod[];
  constants?: YamlConstant[];
  functions?: YamlMethod[];
  deprecation_message?: string;
}

// YAML class doc — same shape for class YAMLs from creator-docs
interface YamlClassMember {
  name: string;
  summary?: string;
  deprecation_message?: string;
  parameters?: YamlParam[];
}

interface YamlClassDoc {
  name: string;
  summary?: string;
  properties?: YamlClassMember[];
  methods?: YamlClassMember[];
  events?: YamlClassMember[];
  callbacks?: YamlClassMember[];
}

// ─── Helpers ──────────────────────────────────────────────────────────

function hasTag(tags: string[] | undefined, tag: string): boolean {
  return tags?.includes(tag) ?? false;
}

/**
 * Clean a YAML summary string into plain text suitable for JSDoc.
 * Strips Roblox doc cross-references like `Class.Player` and `Datatype.Vector3`.
 */
function cleanSummary(text: string | undefined): string {
  if (!text) return "";
  return text
    // References with display text (pipe separator) — use the display text
    .replace(/`(?:Class|Datatype|Enum)\.[^`|]+\|([^`]+)`/g, "`$1`")
    // Enum references — keep the Enum. prefix
    .replace(/`Enum\.(\w+)`/g, "`Enum.$1`")
    // Class/Datatype.Name:Method() or .Member — strip the prefix
    .replace(/`(?:Class|Datatype)\.(\w+[.:]\w+(?:\(\))?)`/g, "`$1`")
    // Class/Datatype.Name — strip the prefix
    .replace(/`(?:Class|Datatype)\.(\w+)`/g, "`$1`")
    .replace(/\n/g, " ")
    .trim();
}

/** Emit a JSDoc comment block. Combines summary + optional @deprecated tag. */
function jsdoc(
  summary: string | undefined,
  deprecated: string | undefined,
  indent: string,
): string {
  const clean = cleanSummary(summary);
  const dep = deprecated ? `@deprecated ${cleanSummary(deprecated)}` : "";

  if (!clean && !dep) return "";
  const parts: string[] = [];
  if (clean) parts.push(clean);
  if (dep) parts.push(dep);

  if (parts.length === 1 && parts[0].length < 80) {
    return `${indent}/** ${parts[0]} */\n`;
  }
  const lines = parts.map((p) => `${indent} * ${p}`).join("\n");
  return `${indent}/**\n${lines}\n${indent} */\n`;
}

function isScriptable(member: Member): boolean {
  if (hasTag(member.Tags, "NotScriptable")) return false;
  if (hasTag(member.Tags, "Hidden")) return false;
  const sec = member.Security;
  if (typeof sec === "string") {
    return sec === "None" || sec === "PluginSecurity";
  }
  return sec.Read === "None" || sec.Read === "PluginSecurity";
}

function isWritable(member: Member): boolean {
  if (hasTag(member.Tags, "ReadOnly")) return true; // means NOT writable
  const sec = member.Security;
  if (typeof sec === "object") {
    return sec.Write === "None" || sec.Write === "PluginSecurity";
  }
  return true;
}

const TS_RESERVED = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger",
  "default", "delete", "do", "else", "enum", "export", "extends",
  "false", "finally", "for", "function", "if", "import", "in",
  "instanceof", "new", "null", "return", "super", "switch", "this",
  "throw", "true", "try", "typeof", "var", "void", "while", "with",
]);

function safeName(name: string): string {
  if (TS_RESERVED.has(name)) return `["${name}"]`;
  if (/^[0-9]/.test(name) || /[^a-zA-Z0-9_$]/.test(name)) return `["${name}"]`;
  return name;
}

function safeParamName(name: string): string {
  if (TS_RESERVED.has(name) || name === "function") return `_${name}`;
  if (/^[0-9]/.test(name) || /[^a-zA-Z0-9_$]/.test(name)) return `_param`;
  return name;
}

// Types handled in primitives.d.ts (need TS generics the YAML can't express)
// or generated from the API dump (Instance is a full class there with all members)
// Types that need hand-written TS generics the YAML can't express.
// Instance is skipped here — its generic constructor is generated in instances.d.ts
// alongside the CreatableInstances map.
const YAML_SKIP = new Set([
  "RBXScriptSignal", "RBXScriptConnection", "EnumItem", "Enum", "Enums",
  "Instance",
]);

// All generated datatype names — populated during YAML processing.
// Used by mapValueType so the API-dump generator knows which DataType names are valid.
const generatedDatatypes = new Set<string>();

function mapValueType(vt: ValueType): string {
  if (!vt) return "unknown";

  switch (vt.Category) {
    case "Primitive": {
      const map: Record<string, string> = {
        string: "string",
        bool: "boolean",
        void: "void",
        int: "number",
        float: "number",
        double: "number",
        int64: "number",
        null: "undefined",
      };
      return map[vt.Name] ?? "unknown";
    }
    case "Enum":
      return `Enum.${vt.Name}`;
    case "Class":
      return vt.Name;
    case "DataType":
      if (vt.Name === "Instances" || vt.Name === "Objects") return "Instance[]";
      if (generatedDatatypes.has(vt.Name)) return vt.Name;
      if (vt.Name === "Content") return "string";
      if (vt.Name === "BinaryString") return "string";
      if (vt.Name === "ProtectedString") return "string";
      if (vt.Name === "SharedTable") return "object";
      if (vt.Name === "UniqueId") return "string";
      return vt.Name;
    case "Group":
      return "unknown";
    default:
      return "unknown";
  }
}

function formatParams(params: Parameter[], yamlOptional?: Set<string>): string {
  return params
    .map((p) => {
      const optional = p.Default !== undefined || yamlOptional?.has(p.Name) ? "?" : "";
      return `${safeParamName(p.Name)}${optional}: ${mapValueType(p.Type)}`;
    })
    .join(", ");
}

// ─── YAML type mapping ───────────────────────────────────────────────

// Roblox enum names (bare, without Enum. prefix) that appear in YAML type fields.
// We prefix them with Enum. for TypeScript output.
const ROBLOX_ENUM_NAMES = new Set<string>();

/** Map a YAML type string to a TypeScript type */
function mapYamlType(type: string): string {
  if (!type) return "unknown";

  // Strip trailing ? (Luau optional syntax) — we handle optionality via | undefined
  const stripped = type.replace(/\?$/, "");

  // Primitive mappings
  switch (stripped) {
    case "number":
    case "float":
    case "double":
    case "int":
    case "int64":
      return "number";
    case "string":
      return "string";
    case "bool":
    case "boolean":
      return "boolean";
    case "void":
    case "nil":
      return "void";
    case "function":
      return "(...args: any[]) => any";
    case "Variant":
      return "unknown";
    case "Array":
      return "any[]";
    case "Dictionary":
    case "Map":
    case "table":
      return "Record<string, any>";
    case "Tuple":
      return "unknown";
    case "Objects":
      return "Instance[]";
    case "Object":
      return "Instance";
    case "Content":
      return "string";
    case "BinaryString":
    case "ProtectedString":
      return "string";
    case "CoordinateFrame":
      return "CFrame";
    case "Opaque":
      return "unknown";
    case "()":
    case "":
      return "void";
  }

  // Explicit Enum.X reference
  if (stripped.startsWith("Enum.")) return stripped;

  // Check if it's a known Roblox enum name (bare name without Enum. prefix)
  if (ROBLOX_ENUM_NAMES.has(stripped)) return `Enum.${stripped}`;

  // Generic Array<T> — just map to any[]
  if (stripped.startsWith("Array<") || stripped.startsWith("Tuple<")) return "any[]";

  // Known types (datatype or class name)
  return stripped;
}

// ─── YAML → DataType generation ──────────────────────────────────────

/** Build unique parameter names — avoids duplicate _param when YAML has same-named params */
function formatYamlParams(params: YamlParam[]): string {
  const seen = new Map<string, number>();
  return params
    .map((p) => {
      // Optional if: type ends with "?" OR "default" key is present (even as null)
      const opt = p.type?.endsWith("?") || "default" in p ? "?" : "";
      let name = safeParamName(p.name);
      // Deduplicate parameter names
      const count = seen.get(name) ?? 0;
      seen.set(name, count + 1);
      if (count > 0) name = `${name}${count + 1}`;
      return `${name}${opt}: ${mapYamlType(p.type)}`;
    })
    .join(", ");
}

function generateDatatypesFromYaml(datatypes: YamlDatatype[]): string {
  const lines: string[] = [
    "// Auto-generated from Roblox creator-docs YAML — do not edit manually",
    "// Run `bun run generate` to regenerate",
    "",
  ];

  // Build a set of constant names per datatype so we can exclude them from the interface
  function getConstantNames(dt: YamlDatatype): Set<string> {
    const names = new Set<string>();
    if (dt.constants) {
      for (const c of dt.constants) {
        const n = c.name.includes(".") ? c.name.split(".").pop()! : c.name;
        names.add(n);
      }
    }
    return names;
  }

  for (const dt of datatypes) {
    if (YAML_SKIP.has(dt.name)) continue;

    const constantNames = getConstantNames(dt);

    // --- Instance interface (properties + methods) ---
    const ifaceDoc = jsdoc(dt.summary, dt.deprecation_message, "");
    lines.push(`${ifaceDoc}interface ${dt.name} {`);

    // Properties (skip constants — those go on the constructor object)
    if (dt.properties) {
      for (const prop of dt.properties) {
        const propName = prop.name.includes(".")
          ? prop.name.split(".").pop()!
          : prop.name;
        if (constantNames.has(propName)) continue;
        const doc = jsdoc(prop.summary, prop.deprecation_message, "\t");
        lines.push(`${doc}\treadonly ${safeName(propName)}: ${mapYamlType(prop.type)};`);
      }
    }

    // Methods
    if (dt.methods) {
      for (const method of dt.methods) {
        const methodName = method.name.includes(":")
          ? method.name.split(":").pop()!
          : method.name;
        const doc = jsdoc(method.summary, method.deprecation_message, "\t");
        const params = formatYamlParams(method.parameters ?? []);
        const ret = resolveReturnType(method);
        lines.push(`${doc}\t${safeName(methodName)}(${params}): ${ret};`);
      }
    }

    lines.push("}\n");

    // --- Constructor const (constructors + constants + static functions) ---
    const hasConstructors = dt.constructors && dt.constructors.length > 0;
    const hasConstants = dt.constants && dt.constants.length > 0;
    const hasFunctions = dt.functions && dt.functions.length > 0;

    if (hasConstructors || hasConstants || hasFunctions) {
      lines.push(`declare const ${dt.name}: {`);

      // Constructors
      if (dt.constructors) {
        for (const ctor of dt.constructors) {
          const doc = jsdoc(ctor.summary, ctor.deprecation_message, "\t");
          const params = formatYamlParams(ctor.parameters ?? []);

          const ctorName = ctor.name.includes(".")
            ? ctor.name.split(".").pop()!
            : ctor.name;

          if (ctorName === "new") {
            lines.push(`${doc}\tnew (${params}): ${dt.name};`);
          } else {
            lines.push(`${doc}\t${safeName(ctorName)}(${params}): ${dt.name};`);
          }
        }
      }

      // Constants
      if (dt.constants) {
        for (const c of dt.constants) {
          const constName = c.name.includes(".")
            ? c.name.split(".").pop()!
            : c.name;
          const doc = jsdoc(c.summary, c.deprecation_message, "\t");
          lines.push(`${doc}\treadonly ${safeName(constName)}: ${mapYamlType(c.type)};`);
        }
      }

      // Static functions
      if (dt.functions) {
        for (const fn of dt.functions) {
          const fnName = fn.name.includes(".")
            ? fn.name.split(".").pop()!
            : fn.name;
          const doc = jsdoc(fn.summary, fn.deprecation_message, "\t");
          const params = formatYamlParams(fn.parameters ?? []);
          const ret = resolveReturnType(fn);
          lines.push(`${doc}\t${safeName(fnName)}(${params}): ${ret};`);
        }
      }

      lines.push("};\n");
    }
  }

  return lines.join("\n");
}

function resolveReturnType(method: YamlMethod): string {
  if (!method.returns) return "void";
  if (typeof method.returns === "string") {
    const mapped = mapYamlType(method.returns);
    // Luau "()" means void
    if (mapped === "()" || mapped === "") return "void";
    return mapped;
  }
  if (Array.isArray(method.returns)) {
    if (method.returns.length === 0) return "void";
    if (method.returns.length === 1) {
      const t = mapYamlType(method.returns[0].type);
      if (t === "()" || t === "") return "void";
      return t;
    }
    // Multiple returns → LuaTuple
    const types = method.returns.map((r) => mapYamlType(r.type)).join(", ");
    return `LuaTuple<[${types}]>`;
  }
  return "unknown";
}

// ─── Instance generation (from API dump) ─────────────────────────────

// Docs lookup: className → { classSummary, members: memberName → { summary, optionalParams } }
interface MemberDoc {
  summary?: string;
  optionalParams: Set<string>;
}
type ClassDocsMap = Map<string, {
  summary?: string;
  members: Map<string, MemberDoc>;
}>;

function generateInstances(classes: ApiClass[], docs: ClassDocsMap): string {
  const lines: string[] = [
    "// Auto-generated from Roblox API Dump + creator-docs — do not edit manually",
    "// Run `bun run generate` to regenerate",
    "",
  ];

  const classNames = new Set(classes.map((c) => c.Name));

  for (const cls of classes) {
    if (hasTag(cls.Tags, "NotScriptable")) continue;

    const extendsClause =
      cls.Superclass && cls.Superclass !== "<<<ROOT>>>" && classNames.has(cls.Superclass)
        ? ` extends ${cls.Superclass}`
        : "";

    const classDoc = docs.get(cls.Name);
    const classSummary = classDoc?.summary;
    const isDeprecated = hasTag(cls.Tags, "Deprecated");
    const doc = jsdoc(classSummary, isDeprecated ? "This class is deprecated." : undefined, "");
    lines.push(`${doc}interface ${cls.Name}${extendsClause} {`);

    for (const member of cls.Members) {
      if (!isScriptable(member)) continue;

      const memberDoc = classDoc?.members.get(member.Name);
      const memberDeprecated = hasTag(member.Tags, "Deprecated");
      const doc = jsdoc(memberDoc?.summary, memberDeprecated ? "Deprecated." : undefined, "\t");
      const name = safeName(member.Name);
      const yamlOptional = memberDoc?.optionalParams;

      switch (member.MemberType) {
        case "Property": {
          const type = mapValueType(member.ValueType!);
          const readonly = !isWritable(member) ? "readonly " : "";
          lines.push(`${doc}\t${readonly}${name}: ${type};`);
          break;
        }
        case "Function": {
          const params = formatParams(member.Parameters ?? [], yamlOptional);
          const ret = mapValueType(member.ReturnType!);
          lines.push(`${doc}\t${name}(${params}): ${ret};`);
          break;
        }
        case "Event": {
          // Event callback params are always provided by the engine — never optional
          const params = formatParams(member.Parameters ?? []);
          lines.push(
            `${doc}\treadonly ${name}: RBXScriptSignal<(${params}) => void>;`
          );
          break;
        }
        case "Callback": {
          const params = formatParams(member.Parameters ?? [], yamlOptional);
          const ret = mapValueType(member.ReturnType!);
          lines.push(`${doc}\t${name}?: (${params}) => ${ret};`);
          break;
        }
      }
    }

    lines.push("}\n");
  }

  // ── CreatableInstances map + generic Instance constructor ──
  // Classes that can be created with Instance.new() are those NOT tagged
  // NotCreatable and NOT tagged Service.
  const creatableClasses = classes.filter(
    (c) =>
      !hasTag(c.Tags, "NotScriptable") &&
      !hasTag(c.Tags, "NotCreatable") &&
      !hasTag(c.Tags, "Service") &&
      !hasTag(c.Tags, "Deprecated"),
  );

  lines.push("interface CreatableInstances {");
  for (const cls of creatableClasses) {
    lines.push(`\t${cls.Name}: ${cls.Name};`);
  }
  lines.push("}\n");

  lines.push("declare const Instance: {");
  lines.push("\t/** Creates a new Instance of the given class. */");
  lines.push("\tnew <T extends keyof CreatableInstances>(className: T, parent?: Instance): CreatableInstances[T];");
  lines.push("\t/** Returns a copy of an existing Instance (like Clone but ignores Archivable). */");
  lines.push("\tfromExisting(existingInstance: Instance): Instance;");
  lines.push("};\n");

  // ── Services map + generic GetService override ──
  const serviceClasses = classes.filter(
    (c) => hasTag(c.Tags, "Service") && !hasTag(c.Tags, "NotScriptable"),
  );

  lines.push("interface CheckableServices {");
  for (const cls of serviceClasses) {
    lines.push(`\t${cls.Name}: ${cls.Name};`);
  }
  lines.push("}\n");

  // Augment ServiceProvider with a generic GetService overload via declaration merging
  lines.push("interface ServiceProvider {");
  lines.push("\t/** Returns the service with the requested class name, creating it if it does not exist. */");
  lines.push("\tGetService<T extends keyof CheckableServices>(className: T): CheckableServices[T];");
  lines.push("}\n");

  // ── CheckableInstances map + typed IsA / FindFirstChild* overloads ──
  const checkableClasses = classes.filter(
    (c) => !hasTag(c.Tags, "NotScriptable"),
  );

  lines.push("interface CheckableInstances {");
  for (const cls of checkableClasses) {
    lines.push(`\t${cls.Name}: ${cls.Name};`);
  }
  lines.push("}\n");

  // Augment Object with a typed IsA overload (type predicate for narrowing)
  lines.push("interface Object {");
  lines.push("\t/** Returns true if this object's class matches or inherits from the given class. */");
  lines.push("\tIsA<T extends keyof CheckableInstances>(className: T): this is CheckableInstances[T];");
  lines.push("}\n");

  // Augment Instance with typed FindFirstChild*/FindFirstAncestor* overloads
  lines.push("interface Instance {");
  lines.push("\tFindFirstChildOfClass<T extends keyof CheckableInstances>(className: T): CheckableInstances[T] | undefined;");
  lines.push("\tFindFirstChildWhichIsA<T extends keyof CheckableInstances>(className: T, recursive?: boolean): CheckableInstances[T] | undefined;");
  lines.push("\tFindFirstAncestorOfClass<T extends keyof CheckableInstances>(className: T): CheckableInstances[T] | undefined;");
  lines.push("\tFindFirstAncestorWhichIsA<T extends keyof CheckableInstances>(className: T): CheckableInstances[T] | undefined;");
  lines.push("}\n");

  return lines.join("\n");
}

// ─── Enum generation ─────────────────────────────────────────────────

function generateEnums(enums: ApiEnum[]): string {
  const lines: string[] = [
    "// Auto-generated from Roblox API Dump — do not edit manually",
    "// Run `bun run generate` to regenerate",
    "",
    "declare namespace Enum {",
  ];

  for (const e of enums) {
    lines.push(`\tinterface ${e.Name} extends EnumItem {}`);
    lines.push(`\tconst ${e.Name}: {`);
    for (const item of e.Items) {
      lines.push(`\t\treadonly ${safeName(item.Name)}: Enum.${e.Name};`);
    }
    lines.push(`\t};\n`);
  }

  lines.push("}");
  return lines.join("\n");
}

// ─── Services module ─────────────────────────────────────────────────

function generateServices(classes: ApiClass[]): string {
  const services = classes.filter((c) => hasTag(c.Tags, "Service"));
  const lines: string[] = [
    "// Auto-generated from Roblox API Dump — do not edit manually",
    "// Run `bun run generate` to regenerate",
    "",
    'declare module "@rbx-services" {',
  ];
  for (const svc of services) {
    lines.push(`\texport const ${svc.Name}: ${svc.Name};`);
  }
  lines.push("}");
  return lines.join("\n");
}

// ─── Index file ──────────────────────────────────────────────────────

function generateIndex(): string {
  return [
    '/// <reference path="primitives.d.ts" />',
    '/// <reference path="datatypes.d.ts" />',
    '/// <reference path="enums.d.ts" />',
    '/// <reference path="instances.d.ts" />',
    '/// <reference path="globals.d.ts" />',
    '/// <reference path="services.d.ts" />',
    "",
  ].join("\n");
}

// ─── Mapping files ───────────────────────────────────────────────────

function generateServiceMapping(classes: ApiClass[]): string {
  const services = classes
    .filter((c) => hasTag(c.Tags, "Service"))
    .map((c) => c.Name)
    .sort();

  const lines: string[] = [
    "// Auto-generated from Roblox API Dump — do not edit manually",
    "// Run `bun run generate` to regenerate",
    "",
    "/** Known Roblox services that can be acquired via game:GetService() */",
    "export const ROBLOX_SERVICES = new Set([",
  ];
  for (const name of services) {
    lines.push(`  "${name}",`);
  }
  lines.push("]);");
  return lines.join("\n");
}

function generateMethodMapping(classes: ApiClass[]): string {
  const methodNames = new Set<string>();

  for (const cls of classes) {
    if (hasTag(cls.Tags, "NotScriptable")) continue;
    for (const member of cls.Members) {
      if (member.MemberType === "Function" && isScriptable(member)) {
        methodNames.add(member.Name);
      }
    }
  }

  // Manual extras not from Instance classes
  const manualExtras = [
    "Connect", "ConnectParallel", "Once", "Wait", "Disconnect",
    "render", "unmount",
    "Play", "Stop", "Pause", "Resume", "Cancel",
  ];
  for (const m of manualExtras) {
    methodNames.add(m);
  }

  const sorted = [...methodNames].sort();
  const lines: string[] = [
    "// Auto-generated from Roblox API Dump — do not edit manually",
    "// Run `bun run generate` to regenerate",
    "",
    "/**",
    " * Roblox methods that use : (method call) syntax instead of . (property access).",
    " * When we see `obj.MethodName(args)` in TS, we compile to `obj:MethodName(args)` in Luau.",
    " */",
    "export const ROBLOX_METHODS = new Set([",
  ];
  for (const name of sorted) {
    lines.push(`  "${name}",`);
  }
  lines.push("]);");
  return lines.join("\n");
}

// ─── Fetch helpers ───────────────────────────────────────────────────

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`);
  return res.json();
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${url}`);
  return res.text();
}

// ─── Main ─────────────────────────────────────────────────────────────

async function main() {
  // 1. Fetch API dump
  console.log("Fetching Roblox API Dump...");
  const dump: ApiDump = await fetchJson(API_DUMP_URL);
  console.log(`  API Dump version ${dump.Version} — ${dump.Classes.length} classes, ${dump.Enums.length} enums`);

  // 2. Fetch YAML directory listings (datatypes + classes) in parallel
  console.log("Fetching YAML directory listings...");
  const [dtDirEntries, clsDirEntries] = await Promise.all([
    fetchJson<{ name: string }[]>(`${CREATOR_DOCS_API}/datatypes`),
    fetchJson<{ name: string }[]>(`${CREATOR_DOCS_API}/classes`),
  ]);
  const dtYamlFiles = dtDirEntries.map((e) => e.name).filter((n) => n.endsWith(".yaml"));
  const clsYamlFiles = clsDirEntries.map((e) => e.name).filter((n) => n.endsWith(".yaml"));
  console.log(`  Found ${dtYamlFiles.length} datatype YAMLs, ${clsYamlFiles.length} class YAMLs`);

  // 3. Fetch all YAML files in parallel
  console.log("Fetching YAML files...");
  const [dtYamlContents, clsYamlContents] = await Promise.all([
    Promise.all(
      dtYamlFiles.map(async (filename) => {
        const text = await fetchText(`${CREATOR_DOCS_RAW}/datatypes/${filename}`);
        return { filename, text };
      })
    ),
    Promise.all(
      clsYamlFiles.map(async (filename) => {
        const text = await fetchText(`${CREATOR_DOCS_RAW}/classes/${filename}`);
        return { filename, text };
      })
    ),
  ]);

  // 4. Parse datatype YAMLs
  const datatypes: YamlDatatype[] = [];
  for (const { filename, text } of dtYamlContents) {
    try {
      const parsed = parseYaml(text) as YamlDatatype;
      if (parsed && parsed.name) datatypes.push(parsed);
    } catch (e) {
      console.warn(`  Warning: failed to parse datatype ${filename}: ${e}`);
    }
  }
  datatypes.sort((a, b) => a.name.localeCompare(b.name));
  console.log(`  Parsed ${datatypes.length} datatypes`);

  // 5. Parse class YAMLs into a docs lookup map
  const classDocs: ClassDocsMap = new Map();
  for (const { filename, text } of clsYamlContents) {
    try {
      const parsed = parseYaml(text) as YamlClassDoc;
      if (!parsed?.name) continue;
      const members = new Map<string, MemberDoc>();
      for (const list of [parsed.properties, parsed.methods, parsed.events, parsed.callbacks]) {
        if (!list) continue;
        for (const m of list) {
          // Member names in YAML are prefixed: "ClassName.MemberName" or "ClassName:MethodName"
          const memberName = m.name.includes(".")
            ? m.name.split(".").pop()!
            : m.name.includes(":")
              ? m.name.split(":").pop()!
              : m.name;
          // Collect optional params: type ending with "?" or "default" key present
          const optionalParams = new Set<string>();
          if (m.parameters) {
            for (const p of m.parameters) {
              if (p.type?.endsWith("?") || "default" in p) {
                optionalParams.add(p.name);
              }
            }
          }
          members.set(memberName, { summary: m.summary, optionalParams });
        }
      }
      classDocs.set(parsed.name, { summary: parsed.summary, members });
    } catch (e) {
      // Silently skip unparseable files
    }
  }
  console.log(`  Parsed docs for ${classDocs.size} classes`);

  // Populate enum names from the API dump so YAML types like "EasingStyle" → "Enum.EasingStyle"
  for (const e of dump.Enums) {
    ROBLOX_ENUM_NAMES.add(e.Name);
  }

  // Populate the set of generated datatype names for cross-referencing
  for (const dt of datatypes) {
    if (!YAML_SKIP.has(dt.name)) {
      generatedDatatypes.add(dt.name);
    }
  }
  generatedDatatypes.add("RBXScriptSignal");
  generatedDatatypes.add("RBXScriptConnection");

  // 6. Generate all files
  console.log("Generating types/datatypes.d.ts...");
  writeFileSync(join(TYPES_DIR, "datatypes.d.ts"), generateDatatypesFromYaml(datatypes));

  console.log("Generating types/instances.d.ts...");
  writeFileSync(join(TYPES_DIR, "instances.d.ts"), generateInstances(dump.Classes, classDocs));

  console.log("Generating types/enums.d.ts...");
  writeFileSync(join(TYPES_DIR, "enums.d.ts"), generateEnums(dump.Enums));

  console.log("Generating types/services.d.ts...");
  writeFileSync(join(TYPES_DIR, "services.d.ts"), generateServices(dump.Classes));

  console.log("Generating types/index.d.ts...");
  writeFileSync(join(TYPES_DIR, "index.d.ts"), generateIndex());

  console.log("Generating src/mappings/roblox-services.ts...");
  writeFileSync(join(MAPPINGS_DIR, "roblox-services.ts"), generateServiceMapping(dump.Classes));

  console.log("Generating src/mappings/roblox-methods.ts...");
  writeFileSync(join(MAPPINGS_DIR, "roblox-methods.ts"), generateMethodMapping(dump.Classes));

  console.log("Done!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
