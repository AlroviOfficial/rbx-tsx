import { useEffect, useRef } from "react";
import { RunService } from "@rbx-services";

// Generates passive gems at a given rate (gems per second)
export function useAutoClicker(rate: number, onTick: () => void) {
  const elapsed = useRef(0);

  useEffect(() => {
    if (rate <= 0) {
      return;
    }

    const interval = 1 / rate;

    const connection = RunService.Heartbeat.Connect((dt?: number) => {
      if (!dt) return;
      elapsed.current += dt;
      while (elapsed.current >= interval) {
        elapsed.current -= interval;
        onTick();
      }
    });

    return () => {
      connection.Disconnect();
    };
  }, [rate, onTick]);
}
