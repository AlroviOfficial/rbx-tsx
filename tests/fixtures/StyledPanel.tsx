import React from "react";
import "./StyledPanel.css";

interface StyledPanelProps {
  title: string;
  items: string[];
}

export default function StyledPanel({ title, items }: StyledPanelProps) {
  return (
    <div className="panel">
      <h1 className="title">{title}</h1>
      <div className="scroll-area">
        {items.map((item, i) => (
          <div key={item} className="card">
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
