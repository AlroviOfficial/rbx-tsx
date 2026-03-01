import React from "react";

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS: Tab[] = [
  { id: "game", label: "Mine" },
  { id: "inventory", label: "Collection" },
  { id: "stats", label: "Stats" },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="w-full h-auto flex flex-row items-center gap-1 p-1 bg-surface">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? "tab-active" : "tab-inactive"}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
