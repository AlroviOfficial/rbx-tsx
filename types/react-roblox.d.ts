// ReactRoblox type declarations for rbx-tsx (targeting jsdotlua/react-roblox@17)

declare module "react-roblox" {
	import type { ReactNode } from "react";

	export interface RobloxRoot {
		render(children: ReactNode): void;
		unmount(): void;
	}

	export function createRoot(container: Instance): RobloxRoot;
	export function createBlockingRoot(container: Instance): RobloxRoot;
	export function createLegacyRoot(container: Instance): RobloxRoot;

	const ReactRoblox: {
		createRoot: typeof createRoot;
		createBlockingRoot: typeof createBlockingRoot;
		createLegacyRoot: typeof createLegacyRoot;
	};
	export default ReactRoblox;
}
