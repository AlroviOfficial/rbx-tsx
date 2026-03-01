import React from "react";
import { formatNumber } from "../shared/GameConfig";
import type { GemInfo } from "../shared/GameConfig";

interface GemCardProps {
  gem: GemInfo;
  isUnlocked: boolean;
}

function GemCard({ gem, isUnlocked }: GemCardProps) {
  return (
    <div className={isUnlocked ? "gem-card" : "gem-card-locked"}>
      <div className="w-auto h-auto flex flex-col grow gap-0.5">
        <span
          className={
            isUnlocked
              ? "text-text text-base font-heading"
              : "text-locked-text text-base font-heading"
          }
        >
          {isUnlocked ? gem.name : "???"}
        </span>
        <span
          className={
            isUnlocked
              ? "text-text-dim text-xs font-body"
              : "text-locked-text text-xs font-body"
          }
        >
          {isUnlocked
            ? `${gem.tier} — worth ${gem.value} gems`
            : `Earn ${formatNumber(gem.milestone)} total gems`}
        </span>
      </div>
      {isUnlocked && (
        <span className="text-gold text-sm font-heading">Discovered</span>
      )}
    </div>
  );
}

interface InventoryProps {
  totalGems: number;
  collection: GemInfo[];
  unlocked: GemInfo[];
}

export default function Inventory({
  totalGems,
  collection,
  unlocked,
}: InventoryProps) {
  // Find the next gem to unlock
  const nextGem = collection.find((gem: GemInfo) => totalGems < gem.milestone);

  return (
    <div className="w-full h-auto flex flex-col gap-3">
      <div className="w-full h-auto flex flex-col gap-1 p-2">
        <div className="w-full h-auto flex flex-row items-center">
          <h1 className="text-gold text-[22px] font-title grow">
            Gem Collection
          </h1>
          <span className="text-text-dim text-sm font-body">
            {unlocked.length}/{collection.length}
          </span>
        </div>
        {nextGem && (
          <span className="text-text-dim text-xs font-body">
            Next discovery at {formatNumber(nextGem.milestone)} total gems
          </span>
        )}
      </div>
      <div className="w-full h-auto flex flex-col gap-2 overflow-scroll p-1">
        {collection.map((gem) => (
          <GemCard gem={gem} isUnlocked={totalGems >= gem.milestone} />
        ))}
      </div>
    </div>
  );
}
