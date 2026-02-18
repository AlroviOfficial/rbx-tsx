// React type declarations for rbx-tsx (targeting jsdotlua/react@17)

declare module "react" {
	// --- Core types ---

	export type Key = string | number;

	export type ReactNode =
		| ReactElement
		| string
		| number
		| boolean
		| null
		| undefined
		| ReactNode[];

	export interface ReactElement<P = any, T = string | ComponentType<any>> {
		type: T;
		props: P;
		key: Key | null;
	}

	export type ComponentType<P = {}> = FunctionComponent<P>;
	export type FC<P = {}> = FunctionComponent<P>;

	export interface FunctionComponent<P = {}> {
		(props: P): ReactElement | null;
		displayName?: string;
	}

	export type Ref<T> = RefObject<T> | ((instance: T | null) => void) | null;

	export interface RefObject<T> {
		readonly current: T | null;
	}

	export interface MutableRefObject<T> {
		current: T;
	}

	export type PropsWithChildren<P = {}> = P & { children?: ReactNode };

	export interface Context<T> {
		Provider: ComponentType<{ value: T; children?: ReactNode }>;
		Consumer: ComponentType<{ children: (value: T) => ReactNode }>;
		displayName?: string;
	}

	export type Dispatch<A> = (value: A) => void;
	export type SetStateAction<S> = S | ((prevState: S) => S);
	export type Reducer<S, A> = (prevState: S, action: A) => S;
	export type DependencyList = readonly any[];
	export type EffectCallback = () => void | (() => void);

	// --- Hooks ---

	export function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
	export function useEffect(effect: EffectCallback, deps?: DependencyList): void;
	export function useLayoutEffect(effect: EffectCallback, deps?: DependencyList): void;
	export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
	export function useMemo<T>(factory: () => T, deps: DependencyList): T;
	export function useRef<T>(initialValue: T): MutableRefObject<T>;
	export function useRef<T>(initialValue: T | null): RefObject<T>;
	export function useContext<T>(context: Context<T>): T;
	export function useReducer<S, A>(reducer: Reducer<S, A>, initialState: S): [S, Dispatch<A>];
	export function useImperativeHandle<T>(ref: Ref<T>, init: () => T, deps?: DependencyList): void;
	export function useDebugValue<T>(value: T, format?: (value: T) => any): void;

	// --- Core API ---

	export function createElement(
		type: string | ComponentType<any>,
		props?: Record<string, any> | null,
		...children: ReactNode[]
	): ReactElement;

	export function createFragment(elements: Record<string, ReactElement>): ReactElement;
	export function createContext<T>(defaultValue: T): Context<T>;
	export function cloneElement(element: ReactElement, props?: Record<string, any>, ...children: ReactNode[]): ReactElement;
	export function memo<P>(component: FunctionComponent<P>, areEqual?: (prev: P, next: P) => boolean): FunctionComponent<P>;
	export function forwardRef<T, P = {}>(render: (props: P, ref: Ref<T>) => ReactElement | null): FunctionComponent<P & { ref?: Ref<T> }>;
	export function lazy<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>): T;

	// Children utilities
	export namespace Children {
		function map<T, C>(children: C | C[], fn: (child: C, index: number) => T): T[];
		function forEach<C>(children: C | C[], fn: (child: C, index: number) => void): void;
		function count(children: any): number;
		function toArray(children: any): ReactElement[];
		function only(children: any): ReactElement;
	}

	// --- Roblox extensions ---

	/** Bind to Roblox instance events: [React.Event.Activated] = handler */
	export const Event: Record<string, symbol>;
	/** Bind to Roblox property changes: [React.Change.Text] = handler */
	export const Change: Record<string, symbol>;
	/** CollectionService tag / CSS class key: [React.Tag] = "className" */
	export const Tag: symbol;

	// --- Default export ---

	const React: {
		createElement: typeof createElement;
		createFragment: typeof createFragment;
		createContext: typeof createContext;
		cloneElement: typeof cloneElement;
		memo: typeof memo;
		forwardRef: typeof forwardRef;
		lazy: typeof lazy;
		Children: typeof Children;
		useState: typeof useState;
		useEffect: typeof useEffect;
		useLayoutEffect: typeof useLayoutEffect;
		useCallback: typeof useCallback;
		useMemo: typeof useMemo;
		useRef: typeof useRef;
		useContext: typeof useContext;
		useReducer: typeof useReducer;
		useImperativeHandle: typeof useImperativeHandle;
		useDebugValue: typeof useDebugValue;
		Event: typeof Event;
		Change: typeof Change;
		Tag: typeof Tag;
	};
	export default React;
	export as namespace React;
}

// --- JSX namespace (global, used by TypeScript for JSX type checking) ---

interface RbxBaseProps {
	key?: string | number;
	className?: string;
	id?: string;
	children?: React.ReactNode;
	ref?: React.Ref<Instance>;
	/** Allow any Roblox instance property as passthrough */
	[prop: string]: any;
}

interface RbxTextProps extends RbxBaseProps {
	value?: string;
}

interface RbxInputProps extends RbxBaseProps {
	value?: string;
	placeholder?: string;
	onChange?: (e: { target: { value: string } }) => void;
	onSubmit?: (text: string, enterPressed: boolean) => void;
	onFocus?: () => void;
	onBlur?: () => void;
}

interface RbxButtonProps extends RbxBaseProps {
	onClick?: () => void;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
}

interface RbxImageProps extends RbxBaseProps {
	src?: string;
}

declare namespace JSX {
	type Element = React.ReactElement;
	interface ElementAttributesProperty { props: {}; }
	interface ElementChildrenAttribute { children: {}; }

	interface IntrinsicElements {
		div: RbxBaseProps;
		span: RbxTextProps;
		p: RbxTextProps;
		h1: RbxTextProps;
		h2: RbxTextProps;
		h3: RbxTextProps;
		h4: RbxTextProps;
		h5: RbxTextProps;
		h6: RbxTextProps;
		label: RbxTextProps;
		button: RbxButtonProps;
		a: RbxButtonProps;
		input: RbxInputProps;
		textarea: RbxInputProps;
		img: RbxImageProps;
		canvas: RbxBaseProps;
		scroll: RbxBaseProps;
	}
}
