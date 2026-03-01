import React, { useMemo } from "react";
import { formatNumber, formatTime } from "../shared/GameConfig";

interface StatsProps {
  totalGems: number;
  totalClicks: number;
  power: number;
  autoRate: number;
  playTime: number;
  unlockedCount: number;
  totalCount: number;
}

interface StatRow {
  label: string;
  value: string;
}

export default function Stats({
  totalGems,
  totalClicks,
  power,
  autoRate,
  playTime,
  unlockedCount,
  totalCount,
}: StatsProps) {
  const stats = useMemo((): StatRow[] => {
    const gemsPerMin = playTime > 0 ? Math.floor(totalGems / (playTime / 60)) : 0;

    return [
      { label: "Total Gems Earned", value: formatNumber(totalGems) },
      { label: "Total Clicks", value: formatNumber(totalClicks) },
      { label: "Click Power", value: `${power}` },
      { label: "Auto Miners", value: `${autoRate}/sec` },
      { label: "Gems/Minute", value: formatNumber(gemsPerMin) },
      { label: "Play Time", value: formatTime(playTime) },
      { label: "Collection", value: `${unlockedCount}/${totalCount}` },
    ];
  }, [totalGems, totalClicks, power, autoRate, playTime, unlockedCount, totalCount]);

  // Calculate a simple "rank" based on total gems
  const rank = useMemo((): string => {
    if (totalGems >= 500000) {
      return "Legendary Miner";
    } else if (totalGems >= 50000) {
      return "Epic Miner";
    } else if (totalGems >= 10000) {
      return "Expert Miner";
    } else if (totalGems >= 2000) {
      return "Skilled Miner";
    } else if (totalGems >= 200) {
      return "Apprentice Miner";
    }
    return "Novice Miner";
  }, [totalGems]);

  return (
    <div className="w-full h-auto flex flex-col gap-3">
      <div className="w-full h-auto flex flex-col items-center gap-1 p-2">
        <h1 className="text-gold text-[22px] font-title">Statistics</h1>
        <span className="text-primary text-base font-heading">{rank}</span>
      </div>
      <div className="w-full h-auto flex flex-col gap-2 overflow-scroll p-1">
        {stats.map((stat) => (
          <div key={stat.label} className="w-full h-auto bg-surface rounded-lg p-3 flex flex-row items-center">
            <span className="text-text-dim text-sm font-body grow">{stat.label}</span>
            <span className="text-text text-base font-heading">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
