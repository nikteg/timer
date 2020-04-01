import React, { useState, ChangeEvent } from "react";
import { Box, Heading, MaskedInput, RangeInput, Text, Button } from "grommet";
import { Link } from "react-router-dom";
import { LinkButton } from "./LinkButton";

export function Setup() {
  const [duration, setDuration] = useState(5);

  return (
    <Box align="center" justify="center" fill>
      <Heading>Setup</Heading>
      <RangeInput
        max={24}
        min={0.5}
        step={0.5}
        value={duration}
        onChange={(event: any) => setDuration(Number(event.target.value))}
      />
      <Text size="large">{duration}</Text>
      <LinkButton to={`/timer/${duration * 3600}?running=true`} label={"Go"} />
    </Box>
  );
}
