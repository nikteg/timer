import { useCallback, useEffect, useState } from "react";
import { NumberParam, useQueryParam } from "use-query-params";
import { useInterval } from "./useInterval";

export const useTimer = (
  onTick: (remaining: number) => void,
  onDone: () => void
) => {
  const [remaining, setRemaining] = useQueryParam("remaining", NumberParam);
  const [duration, setDuration] = useQueryParam("duration", NumberParam);
  const [running, setRunning] = useState(remaining !== 0);

  useEffect(() => {
    if (!duration) {
      setDuration(remaining);
    }
  }, [duration, remaining, setDuration]);

  const tick = useCallback(() => {
    if (duration) {
      if (remaining && remaining > 0) {
        onTick(remaining);
        setRemaining(remaining - 1);
      } else if (remaining === 0) {
        onDone();
        setRunning(false);
        setRemaining(duration);
      }
    }
  }, [duration, onDone, onTick, remaining, setRemaining]);

  useInterval(tick, running ? 1000 : null);

  const toggle = useCallback(() => setRunning((running) => !running), [
    setRunning,
  ]);

  return {
    running,
    toggle,
    duration: duration ?? 0,
    remaining: remaining ?? 0,
  };
};
