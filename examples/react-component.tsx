/**
 * Simple React component — useState, useCallback, props, JSX
 */

import React, { useState, useCallback } from "react";

interface CounterProps {
  label: string;
  initialCount?: number;
}

export default function Counter({ label, initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((c) => c - 1);
  }, []);

  return (
    <div className="counter">
      <h1>{label}</h1>
      <span>Count: {count}</span>
      <div className="button-row">
        <button className="primary" onClick={increment}>
          +
        </button>
        <button className="secondary" onClick={decrement}>
          -
        </button>
      </div>
    </div>
  );
}
