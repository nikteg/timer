import { Box, Button, Heading, Layer, RangeInput, TextInput } from "grommet";
import React, { useState } from "react";
import { LinkButton } from "./LinkButton";

export function Setup() {
  const [duration, setDuration] = useState(1800);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <>
      {showAdvanced && (
        <Layer animation="fadeIn" full>
          <Box
            alignSelf="center"
            pad="medium"
            justify="center"
            align="center"
            fill
            width={{ max: "large" }}
          >
            <Heading textAlign="center">Advanced setup</Heading>
            <Box width="xsmall">
              <TextInput
                type="number"
                onChange={(event: any) => setDuration(event.target.value)}
                value={duration}
              />
            </Box>
            <LinkButton
              primary
              label={`Start ${duration} seconds timer`}
              to={`/timer?remaining=${duration}`}
              margin="small"
            />
            <Button onClick={() => setShowAdvanced(false)} label="Close" />
          </Box>
        </Layer>
      )}
      <Heading>Timer setup</Heading>
      <Box pad="medium" width={{ min: "medium" }}>
        <RangeInput
          max={86400}
          min={1800}
          step={1800}
          value={duration}
          onChange={(event: any) => setDuration(Number(event.target.value))}
        />
      </Box>
      <LinkButton
        primary
        to={`/timer?remaining=${duration}`}
        label={`Start ${Number(duration / 3600).toFixed(1)} hours timer`}
      />
      <Button
        onClick={() => setShowAdvanced(true)}
        label="Advanced..."
        margin="small"
      />
    </>
  );
}
