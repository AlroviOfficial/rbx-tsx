import React, { useState, useCallback } from "react";
import Header from "./Header";
import GemButton from "./GemButton";
import Shop from "./Shop";

export default function App() {
  const [gems, setGems] = useState(0);
  const [power, setPower] = useState(1);
  const [pickCost, setPickCost] = useState(10);
  const [charmCost, setCharmCost] = useState(50);
  const [drillCost, setDrillCost] = useState(250);

  const handleClick = useCallback(() => {
    setGems((g: number) => g + power);
  }, [power]);

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

  const shopItems = [
    { id: "pickaxe", name: "Better Pickaxe", desc: "+1 per click", cost: pickCost, buy: buyPickaxe },
    { id: "charm", name: "Lucky Charm", desc: "+5 per click", cost: charmCost, buy: buyCharm },
    { id: "drill", name: "Diamond Drill", desc: "+25 per click", cost: drillCost, buy: buyDrill },
  ];

  return (
    <div className="w-full h-full bg-bg flex flex-col p-4 gap-3">
      <Header gems={gems} power={power} />
      <GemButton onClick={handleClick} power={power} />
      <Shop gems={gems} items={shopItems} />
    </div>
  );
}
