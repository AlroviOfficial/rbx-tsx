import React from "react";
import { formatNumber } from "./GameConfig";

interface HeaderProps {
  gems: number;
  power: number;
  autoRate: number;
}

export default function Header({ gems, power, autoRate }: HeaderProps) {
  return (
    <div className="w-full h-auto flex flex-col items-center p-2 gap-1">
      <h1 className="text-gold text-4xl font-title">Gem Miner</h1>
      <span className="text-text text-[28px] font-heading">{`${formatNumber(gems)} Gems`}</span>
      <div className="w-auto h-auto flex flex-row gap-3">
        <span className="text-text-dim text-sm font-body">{`${power}/click`}</span>
        {autoRate > 0 && (
          <span className="text-text-dim text-sm font-body">{`${autoRate}/sec`}</span>
        )}
      </div>
    </div>
  );
}
