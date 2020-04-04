import { Clock as GrommetClock, Meter, Stack } from "grommet";
import React from "react";
import styled, { css, keyframes } from "styled-components";
import { formatTime } from "../utils";

export interface ClockProps {
  running: boolean;
  duration: number;
  remaining: number;
}

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

const StyledClock = styled(GrommetClock)<{ paused: boolean }>`
  animation: ${({ paused }) => paused && css`1s ${blink} ease-in-out infinite`};
`;

export const Clock: React.FC<ClockProps> = ({
  running,
  duration,
  remaining,
}) => {
  return (
    <Stack anchor="center" margin="medium">
      <Meter
        max={duration ?? 0}
        type="circle"
        round
        values={[{ value: remaining ?? 0 }]}
        aria-label="meter"
      />
      <StyledClock
        paused={!running}
        type="digital"
        time={formatTime(remaining!)}
        run="backward"
        size="xxlarge"
      />
    </Stack>
  );
};
