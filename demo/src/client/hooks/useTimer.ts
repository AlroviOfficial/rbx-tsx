import { useState, useEffect, useRef } from "react";
import { RunService } from "@rbx-services";

// Tracks elapsed play time in whole seconds
export function useTimer(): number {
  const [elapsed, setElapsed] = useState(0);
  const total = useRef(0);

  useEffect(() => {
    const connection = RunService.Heartbeat.Connect((dt: number) => {
      total.current += dt;
      const floored = Math.floor(total.current);
      if (floored !== elapsed) {
        setElapsed(floored);
      }
    });

    return () => {
      connection.Disconnect();
    };
  }, [elapsed]);

  return elapsed;
}
