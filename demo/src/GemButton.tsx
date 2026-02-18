import React from "react";

interface GemButtonProps {
  onClick: () => void;
  power: number;
}

export default function GemButton({ onClick, power }: GemButtonProps) {
  return (
    <div className="w-full grow flex items-center justify-center">
      <button className="gem-button" onClick={onClick}>
        Click! +{power}
      </button>
    </div>
  );
}
