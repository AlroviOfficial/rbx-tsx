import React from "react";

interface HeaderProps {
  gems: number;
  power: number;
}

export default function Header({ gems, power }: HeaderProps) {
  return (
    <div className="w-full h-auto flex flex-col items-center p-2 gap-1">
      <h1 className="text-gold text-4xl font-title">Gem Clicker</h1>
      <span className="text-text text-[28px] font-heading">{gems} Gems</span>
      <span className="text-text-dim text-sm font-body">{power} per click</span>
    </div>
  );
}
