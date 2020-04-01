import React, { useState, useCallback, useEffect } from "react";
import { Box, Button, Clock } from "grommet";
import { PlayFill, PauseFill } from "grommet-icons";
import { useParams, useHistory } from "react-router-dom";
import { formatTime, calculateTime } from "./utils";
import { useQuery } from "./useQuery";
import useInterval from "@use-it/interval";

export function Timer() {
  const params = useParams<{ duration: string }>();

  const history = useHistory();

  const duration = Number(params.duration);

  const [isRunning, setIsRunning] = useQuery("running", "");
  const [startedAt, setStartedAt] = useQuery("startedAt", "");

  const [time, setTime] = useState(
    formatTime(
      calculateTime(
        duration,
        Math.round(Date.now() / 1000),
        Math.round(Date.now() / 1000)
      )
    )
  );

  useEffect(() => {
    if (isRunning === "true") {
      setStartedAt(String(Math.round(Date.now() / 1000)));
    }
  }, [isRunning, setStartedAt]);

  const tick = useCallback(() => {
    console.log("tick");
    setTime(
      formatTime(
        calculateTime(
          duration,
          Math.round(Date.now() / 1000),
          Number(startedAt)
        )
      )
    );
  }, [duration, startedAt]);

  useInterval(tick, isRunning === "true" ? 1000 : null);

  const onButtonClick = () => {
    if (isRunning === "true") {
      history.replace(
        `${duration - Math.round(Date.now() / 1000 - Number(startedAt))}`
      );

      return;
    }

    setIsRunning("true");
  };

  return (
    <Box align="center" justify="center" fill>
      <Button
        icon={isRunning ? <PauseFill /> : <PlayFill />}
        onClick={onButtonClick}
        primary
      />
      <Clock type="digital" time={time} run="backward" size="large" />
    </Box>
  );
}
