// Hand-written base types that require TypeScript generics the YAML docs can't express.
// Everything else (datatypes, Instance) is auto-generated.

interface RBXScriptConnection {
	readonly Connected: boolean;
	Disconnect(): void;
}

interface RBXScriptSignal<T extends (...args: any[]) => void = () => void> {
	Connect(callback: T): RBXScriptConnection;
	ConnectParallel(callback: T): RBXScriptConnection;
	Once(callback: T): RBXScriptConnection;
	Wait(): LuaTuple<Parameters<T>>;
}

interface EnumItem {
	readonly Name: string;
	readonly Value: number;
	readonly EnumType: Enum;
}

type LuaTuple<T extends any[]> = T;
