import React from "react";
import { formatNumber } from "../shared/GameConfig";
import type { ShopItem } from "../shared/GameConfig";

interface ShopProps {
  gems: number;
  items: ShopItem[];
}

export default function Shop({ gems, items }: ShopProps) {
  return (
    <div className="w-full h-auto flex flex-col gap-2 p-2">
      <h1 className="text-gold text-[22px] font-title">Upgrades</h1>
      <div className="w-full h-auto flex flex-col gap-2 overflow-scroll p-1">
        {items.map((item) => (
          <div key={item.id} className="w-full h-auto bg-surface rounded-lg p-3 flex flex-row gap-3 items-center hover:bg-surface-hover">
            <div className="w-auto h-auto flex flex-col grow gap-0.5">
              <span className="text-text text-base font-heading">{item.name}</span>
              <span className="text-text-dim text-xs font-body">{item.desc}</span>
              <span className="text-gold text-sm font-heading">{formatNumber(item.cost)} gems</span>
            </div>
            {gems >= item.cost ? (
              <button className="w-auto h-auto bg-primary rounded-md px-5 py-2 text-white text-sm font-heading hover:bg-primary-hover" onClick={item.buy}>Buy</button>
            ) : (
              <button className="w-auto h-auto bg-locked-bg rounded-md px-5 py-2 text-locked-text text-sm font-heading">Locked</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
