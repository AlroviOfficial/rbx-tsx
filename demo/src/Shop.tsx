import React from "react";

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  buy: () => void;
}

interface ShopProps {
  gems: number;
  items: ShopItem[];
}

export default function Shop({ gems, items }: ShopProps) {
  return (
    <div className="shop">
      <h1 className="shop-header">Upgrades</h1>
      <div className="shop-list">
        {items.map((item) => (
          <div key={item.id} className="shop-item">
            <div className="item-info">
              <span className="item-name">{item.name}</span>
              <span className="item-desc">{item.desc}</span>
              <span className="item-cost">{item.cost} gems</span>
            </div>
            {gems >= item.cost ? (
              <button className="buy-btn" onClick={item.buy}>Buy</button>
            ) : (
              <button className="buy-btn-locked">Locked</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
