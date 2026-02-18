import React from "react";

interface HeaderProps {
  gems: number;
  power: number;
}

export default function Header({ gems, power }: HeaderProps) {
  return (
    <div className="header">
      <h1 className="title">Gem Clicker</h1>
      <span className="score">{gems} Gems</span>
      <span className="info">{power} per click</span>
    </div>
  );
}
