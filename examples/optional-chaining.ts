/**
 * Optional chaining (?.) and nullish coalescing (??)
 */

interface User {
  name: string;
  profile?: {
    avatar?: string;
    settings?: {
      theme?: string;
    };
  };
}

const user: User | null = {
  name: "Player",
  profile: {
    avatar: "rbxassetid://123",
    settings: { theme: "dark" },
  },
};

// Optional chaining — short-circuits to undefined if any part is null/undefined
const theme = user?.profile?.settings?.theme;
const missing = user?.profile?.missing?.nested;

// Nullish coalescing — use default only for null/undefined (not 0 or "")
const displayTheme = theme ?? "light";
const displayName = user?.name ?? "Anonymous";

// Optional call
type Callback = (() => void) | undefined;
const cb: Callback = undefined;
cb?.();

console.log(displayTheme, displayName);
