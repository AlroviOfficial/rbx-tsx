import React from "react";

interface GemButtonProps {
  onClick: () => void;
  power: number;
}

export default function GemButton({ onClick, power }: GemButtonProps) {
  return (
    <div className="click-area">
      <button className="gem-button" onClick={onClick}>
        Click! +{power}
      </button>
    </div>
  );
}
