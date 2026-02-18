// Roblox global declarations — hand-written

// Core globals (types come from generated instances.d.ts)
declare const game: DataModel;
declare const workspace: Workspace;
declare const script: LuaSourceContainer;

// Output
declare function print(...args: any[]): void;
declare function warn(...args: any[]): void;
declare function error(message: string, level?: number): never;

// Type utilities
// Note: Roblox's typeof() cannot be declared in TS (reserved keyword). Use type() instead.
declare function tostring(value: any): string;
declare function tonumber(value: any, base?: number): number | undefined;
declare function type(value: any): string;

// Timing (deprecated but common)
declare function wait(seconds?: number): LuaTuple<[number, number]>;
declare function tick(): number;
declare function time(): number;
declare function elapsedTime(): number;

// Module
declare function require(module: ModuleScript): any;

// Math extras
declare function unpack<T>(list: T[], i?: number, j?: number): LuaTuple<T[]>;
declare function select<T>(index: number, ...args: T[]): T;
declare function select(index: "#", ...args: any[]): number;
declare function pcall<T extends any[]>(func: (...args: any[]) => any, ...args: any[]): LuaTuple<[boolean, ...T]>;
declare function xpcall<T extends any[]>(func: (...args: any[]) => any, handler: (err: any) => any, ...args: any[]): LuaTuple<[boolean, ...T]>;
declare function rawget(table: any, index: any): any;
declare function rawset(table: any, index: any, value: any): void;
declare function rawequal(v1: any, v2: any): boolean;
declare function rawlen(v: any): number;
declare function setmetatable<T>(table: T, metatable: object | undefined): T;
declare function getmetatable(table: any): any;
declare function ipairs<T>(t: T[]): IterableFunction<LuaTuple<[number, T]>>;
declare function pairs<T>(t: Record<string, T>): IterableFunction<LuaTuple<[string, T]>>;
declare function next<K, V>(table: Record<K & string, V>, index?: K): LuaTuple<[K, V] | []>;

// Iterables
interface IterableFunction<T> {
	(): T;
}

// task library
declare namespace task {
	function cancel(thread: thread): void;
	function defer(func: (...args: any[]) => void, ...args: any[]): thread;
	function delay(duration: number, func: (...args: any[]) => void, ...args: any[]): thread;
	function desynchronize(): void;
	function spawn(func: (...args: any[]) => void, ...args: any[]): thread;
	function synchronize(): void;
	function wait(duration?: number): number;
}

// coroutine
declare namespace coroutine {
	function create(func: (...args: any[]) => any): thread;
	function resume(co: thread, ...args: any[]): LuaTuple<[boolean, ...any[]]>;
	function yield(...args: any[]): any;
	function wrap(func: (...args: any[]) => any): (...args: any[]) => any;
	function status(co: thread): "running" | "suspended" | "normal" | "dead";
	function close(co: thread): LuaTuple<[boolean, any]>;
	function isyieldable(): boolean;
	function running(): LuaTuple<[thread, boolean]>;
}

// string library
declare namespace string {
	function byte(s: string, i?: number, j?: number): LuaTuple<number[]>;
	function char(...bytes: number[]): string;
	function find(s: string, pattern: string, init?: number, plain?: boolean): LuaTuple<[number, number, ...string[]] | []>;
	function format(formatstring: string, ...args: any[]): string;
	function gmatch(s: string, pattern: string): IterableFunction<LuaTuple<string[]>>;
	function gsub(s: string, pattern: string, replacement: string | Record<string, string> | ((...captures: string[]) => string), n?: number): LuaTuple<[string, number]>;
	function len(s: string): number;
	function lower(s: string): string;
	function match(s: string, pattern: string, init?: number): LuaTuple<string[] | [undefined]>;
	function rep(s: string, n: number, sep?: string): string;
	function reverse(s: string): string;
	function sub(s: string, i: number, j?: number): string;
	function upper(s: string): string;
	function split(s: string, separator?: string): string[];
}

// table library
declare namespace table {
	function concat(list: any[], sep?: string, i?: number, j?: number): string;
	function insert<T>(list: T[], value: T): void;
	function insert<T>(list: T[], pos: number, value: T): void;
	function move<T>(a1: T[], f: number, e: number, t: number, a2?: T[]): T[];
	function remove<T>(list: T[], pos?: number): T | undefined;
	function sort<T>(list: T[], comp?: (a: T, b: T) => boolean): void;
	function find<T>(haystack: T[], needle: T, init?: number): number | undefined;
	function clear(t: any): void;
	function clone<T>(t: T): T;
	function freeze<T>(t: T): T;
	function isfrozen(t: any): boolean;
	function pack(...args: any[]): { n: number; [index: number]: any };
	function unpack<T>(list: T[], i?: number, j?: number): LuaTuple<T[]>;
	function create<T>(count: number, value?: T): T[];
}

// math library
declare namespace math {
	const huge: number;
	const pi: number;
	function abs(x: number): number;
	function acos(x: number): number;
	function asin(x: number): number;
	function atan(y: number): number;
	function atan2(y: number, x: number): number;
	function ceil(x: number): number;
	function clamp(x: number, min: number, max: number): number;
	function cos(x: number): number;
	function deg(x: number): number;
	function exp(x: number): number;
	function floor(x: number): number;
	function fmod(x: number, y: number): number;
	function log(x: number, base?: number): number;
	function max(...args: number[]): number;
	function min(...args: number[]): number;
	function modf(x: number): LuaTuple<[number, number]>;
	function noise(x: number, y?: number, z?: number): number;
	function pow(x: number, y: number): number;
	function rad(x: number): number;
	function random(m?: number, n?: number): number;
	function randomseed(x: number): void;
	function round(x: number): number;
	function sign(x: number): number;
	function sin(x: number): number;
	function sqrt(x: number): number;
	function tan(x: number): number;
}

// Thread type
interface thread {}

// Roblox debug library
declare namespace debug {
	function traceback(message?: string, level?: number): string;
	function info(level: number, options: string): LuaTuple<any[]>;
	function info(func: (...args: any[]) => any, options: string): LuaTuple<any[]>;
	function profilebegin(label: string): void;
	function profileend(): void;
	function setmemorycategory(tag: string): void;
	function resetmemorycategory(): void;
}

// os library (Roblox subset)
declare namespace os {
	function time(): number;
	function difftime(t2: number, t1: number): number;
	function clock(): number;
	function date(format?: string, time?: number): string | Record<string, number>;
}

// bit32 library
declare namespace bit32 {
	function band(...args: number[]): number;
	function bor(...args: number[]): number;
	function bxor(...args: number[]): number;
	function bnot(x: number): number;
	function btest(...args: number[]): boolean;
	function lshift(x: number, disp: number): number;
	function rshift(x: number, disp: number): number;
	function arshift(x: number, disp: number): number;
	function lrotate(x: number, disp: number): number;
	function rrotate(x: number, disp: number): number;
	function extract(n: number, field: number, width?: number): number;
	function replace(n: number, v: number, field: number, width?: number): number;
	function countlz(n: number): number;
	function countrz(n: number): number;
}

// buffer library
declare namespace buffer {
	function create(size: number): buffer;
	function fromstring(str: string): buffer;
	function tostring(b: buffer): string;
	function len(b: buffer): number;
	function readi8(b: buffer, offset: number): number;
	function readu8(b: buffer, offset: number): number;
	function readi16(b: buffer, offset: number): number;
	function readu16(b: buffer, offset: number): number;
	function readi32(b: buffer, offset: number): number;
	function readu32(b: buffer, offset: number): number;
	function readf32(b: buffer, offset: number): number;
	function readf64(b: buffer, offset: number): number;
	function readstring(b: buffer, offset: number, count: number): string;
	function writei8(b: buffer, offset: number, value: number): void;
	function writeu8(b: buffer, offset: number, value: number): void;
	function writei16(b: buffer, offset: number, value: number): void;
	function writeu16(b: buffer, offset: number, value: number): void;
	function writei32(b: buffer, offset: number, value: number): void;
	function writeu32(b: buffer, offset: number, value: number): void;
	function writef32(b: buffer, offset: number, value: number): void;
	function writef64(b: buffer, offset: number, value: number): void;
	function writestring(b: buffer, offset: number, value: string, count?: number): void;
	function copy(target: buffer, targetOffset: number, source: buffer, sourceOffset?: number, count?: number): void;
	function fill(b: buffer, offset: number, value: number, count?: number): void;
}

interface buffer {}
