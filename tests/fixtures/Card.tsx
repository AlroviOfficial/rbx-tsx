import React, { useState, useCallback } from "react";
import "./Card.css";

interface CardProps {
  title: string;
  initialCount?: number;
}

export default function Card({ title, initialCount = 0 }: CardProps) {
  const [count, setCount] = useState(initialCount);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);

  return (
    <div className="card">
      <h1>{title}</h1>
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
