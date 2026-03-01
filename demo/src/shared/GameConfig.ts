// Game configuration — enums, types, constants, and helpers

export enum GemTier {
  Common = "Common",
  Uncommon = "Uncommon",
  Rare = "Rare",
  Epic = "Epic",
  Legendary = "Legendary",
}

export interface GemInfo {
  name: string;
  tier: GemTier;
  value: number;
  milestone: number;
}

export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  buy: () => void;
}

// Gems unlocked by reaching total-gems milestones
export const GEM_COLLECTION: GemInfo[] = [
  { name: "Quartz", tier: GemTier.Common, value: 1, milestone: 0 },
  { name: "Amethyst", tier: GemTier.Common, value: 5, milestone: 50 },
  { name: "Topaz", tier: GemTier.Uncommon, value: 15, milestone: 200 },
  { name: "Emerald", tier: GemTier.Uncommon, value: 25, milestone: 500 },
  { name: "Ruby", tier: GemTier.Rare, value: 100, milestone: 2000 },
  { name: "Sapphire", tier: GemTier.Rare, value: 250, milestone: 10000 },
  { name: "Diamond", tier: GemTier.Epic, value: 1000, milestone: 50000 },
  { name: "Star Opal", tier: GemTier.Legendary, value: 5000, milestone: 500000 },
];

export const TIER_ORDER: string[] = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

export function formatNumber(n: number): string {
  if (n >= 1000000) {
    return `${Math.floor(n / 100000) / 10}M`;
  }
  if (n >= 1000) {
    return `${Math.floor(n / 100) / 10}K`;
  }
  return `${n}`;
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins >= 60) {
    const hours = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return `${hours}h ${remainMins}m`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}
