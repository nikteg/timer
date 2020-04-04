import useInterval from "@use-it/interval";
import { Box, Button, Clock, Layer, Meter, Stack } from "grommet";
import React, { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { NumberParam, useQueryParam } from "use-query-params";
import { LinkButton } from "./LinkButton";
import { useNotification } from "./useNotification";
import { formatTime } from "./utils";

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

const StyledClock = styled(Clock)<{ paused: boolean }>`
  animation: ${({ paused }) => paused && css`1s ${blink} ease-in-out infinite`};
`;

export function Timer() {
  const [remaining, setRemaining] = useQueryParam("remaining", NumberParam);
  const [duration, setDuration] = useQueryParam("duration", NumberParam);
  const [isRunning, setIsRunning] = useState(remaining !== 0);

  const {
    showNotification,
    requestPermission,
    hasPermission,
  } = useNotification();

  const [showLayer, setShowLayer] = useState(!hasPermission);

  useEffect(() => {
    if (hasPermission) {
      setShowLayer(false);
    }
  }, [hasPermission]);

  useEffect(() => {
    if (!duration) {
      setDuration(remaining);
    }
  }, [duration, remaining, setDuration]);

  const tick = useCallback(() => {
    if (remaining! > 0) {
      setRemaining(remaining! - 1);
      showNotification("Timer", {
        tag: "timer",
        body: formatTime(remaining!, "Time remaining: "),
        silent: true,
      });
    } else if (remaining === 0) {
      setIsRunning(false);
      setRemaining(duration!);
      showNotification("Timer", {
        tag: "timer",
        body: "Time out!",
        silent: false,
        renotify: true,
      });
    }
  }, [duration, remaining, setRemaining, showNotification]);

  useInterval(tick, isRunning ? 1000 : null);

  const onButtonClick = () => {
    setIsRunning((isRunning) => !isRunning);
  };

  return (
    <>
      {showLayer && (
        <Layer margin="medium" full animate={false}>
          <Box justify="center" align="center" fill>
            <Button
              primary
              onClick={requestPermission}
              label="Enable notifications"
            />
            <Button
              id="skip"
              onClick={() => setShowLayer(false)}
              label="Skip"
              margin="small"
            />
          </Box>
        </Layer>
      )}
      <Stack anchor="center" margin="medium">
        <Meter
          max={duration ?? 0}
          type="circle"
          round
          values={[
            {
              value: remaining ?? 0,
            },
          ]}
          aria-label="meter"
        />
        <StyledClock
          paused={!isRunning}
          type="digital"
          time={formatTime(remaining!)}
          run="backward"
          size="xxlarge"
        />
      </Stack>
      <Button
        onClick={onButtonClick}
        label={isRunning ? "Pause" : "Start"}
        primary
        margin="small"
      />
      <LinkButton label={"Setup"} to="/" />
    </>
  );
}
