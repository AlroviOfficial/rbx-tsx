import React, { useState, useCallback, useMemo } from "react";
import Header from "./Header";
import TabBar from "./TabBar";
import GemButton from "./GemButton";
import Shop from "./Shop";
import Inventory from "./Inventory";
import Stats from "./Stats";
import { useAutoClicker } from "./hooks/useAutoClicker";
import { useTimer } from "./hooks/useTimer";
import { GEM_COLLECTION } from "../shared/GameConfig";
import type { GemInfo, ShopItem } from "../shared/GameConfig";

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState("game");

  // Core game state
  const [gems, setGems] = useState(0);
  const [totalGems, setTotalGems] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [power, setPower] = useState(1);
  const [autoRate, setAutoRate] = useState(0);

  // Upgrade costs
  const [pickCost, setPickCost] = useState(10);
  const [charmCost, setCharmCost] = useState(50);
  const [drillCost, setDrillCost] = useState(250);
  const [minerCost, setMinerCost] = useState(100);

  // Play time
  const playTime = useTimer();

  // Auto-clicker: generates gems passively
  const autoTick = useCallback(() => {
    setGems((g: number) => g + 1);
    setTotalGems((t: number) => t + 1);
  }, []);

  useAutoClicker(autoRate, autoTick);

  // Manual click
  const handleClick = useCallback(() => {
    setGems((g: number) => g + power);
    setTotalGems((t: number) => t + power);
    setTotalClicks((c: number) => c + 1);
  }, [power]);

  // Upgrades
  const buyPickaxe = useCallback(() => {
    if (gems >= pickCost) {
      setGems((g: number) => g - pickCost);
      setPower((p: number) => p + 1);
      setPickCost((c: number) => c * 2);
    }
  }, [gems, pickCost]);

  const buyCharm = useCallback(() => {
    if (gems >= charmCost) {
      setGems((g: number) => g - charmCost);
      setPower((p: number) => p + 5);
      setCharmCost((c: number) => c * 2);
    }
  }, [gems, charmCost]);

  const buyDrill = useCallback(() => {
    if (gems >= drillCost) {
      setGems((g: number) => g - drillCost);
      setPower((p: number) => p + 25);
      setDrillCost((c: number) => c * 2);
    }
  }, [gems, drillCost]);

  const buyMiner = useCallback(() => {
    if (gems >= minerCost) {
      setGems((g: number) => g - minerCost);
      setAutoRate((r: number) => r + 1);
      setMinerCost((c: number) => Math.floor(c * 1.8));
    }
  }, [gems, minerCost]);

  const shopItems: ShopItem[] = [
    { id: "pickaxe", name: "Better Pickaxe", desc: "+1 per click", cost: pickCost, buy: buyPickaxe },
    { id: "charm", name: "Lucky Charm", desc: "+5 per click", cost: charmCost, buy: buyCharm },
    { id: "drill", name: "Diamond Drill", desc: "+25 per click", cost: drillCost, buy: buyDrill },
    { id: "miner", name: "Auto Miner", desc: "+1 gem/sec", cost: minerCost, buy: buyMiner },
  ];

  // Derived data
  const unlockedGems = useMemo(() => {
    return GEM_COLLECTION.filter((gem: GemInfo) => totalGems >= gem.milestone);
  }, [totalGems]);

  return (
    <div className="w-full h-full bg-bg flex flex-col">
      <Header gems={gems} power={power} autoRate={autoRate} />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="w-full grow flex flex-col p-4 gap-3">
        {activeTab === "game" && (
          <>
            <GemButton onClick={handleClick} power={power} />
            <Shop gems={gems} items={shopItems} />
          </>
        )}
        {activeTab === "inventory" && (
          <Inventory
            totalGems={totalGems}
            collection={GEM_COLLECTION}
            unlocked={unlockedGems}
          />
        )}
        {activeTab === "stats" && (
          <Stats
            totalGems={totalGems}
            totalClicks={totalClicks}
            power={power}
            autoRate={autoRate}
            playTime={playTime}
            unlockedCount={unlockedGems.length}
            totalCount={GEM_COLLECTION.length}
          />
        )}
      </div>
    </div>
  );
}
