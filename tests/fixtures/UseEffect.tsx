import React, { useState, useEffect, useRef } from "react";
import { RunService } from "@rbx-services";

export default function Timer() {
  const [elapsed, setElapsed] = useState(0);
  const frameRef = useRef<Frame>(null);

  useEffect(() => {
    const connection = RunService.Heartbeat.Connect((dt: number) => {
      setElapsed(prev => prev + dt);
    });
    return () => connection.Disconnect();
  }, []);

  return (
    <div className="timer" ref={frameRef}>
      <span>Elapsed: {elapsed}</span>
    </div>
  );
}
