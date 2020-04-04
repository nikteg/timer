import { useEffect, useRef } from "react";
import * as workerTimers from "worker-timers";

export const useInterval = (
  callback: (...args: any[]) => void,
  delay: number | null
) => {
  const savedCallback = useRef<typeof callback>(function () {});

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handler = (...args: any[]) => savedCallback.current(...args);

    if (delay !== null) {
      const id = workerTimers.setInterval(handler, delay);
      return () => workerTimers.clearInterval(id);
    }
  }, [delay]);
};
