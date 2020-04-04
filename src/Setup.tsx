import { Box, Heading, RangeInput } from "grommet";
import React, { useState } from "react";
import { LinkButton } from "./LinkButton";

export function Setup() {
  const [duration, setDuration] = useState(5);

  return (
    <>
      <Heading>Timer setup</Heading>
      <Box pad="medium" width={{ min: "300px" }}>
        <RangeInput
          max={24}
          min={0.5}
          step={0.5}
          value={duration}
          onChange={(event: any) => setDuration(Number(event.target.value))}
        />
      </Box>
      <LinkButton
        to={`/timer?remaining=${duration * 3600}`}
        label={`Start ${duration} hour timer`}
      />
    </>
  );
}
