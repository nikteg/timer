import { Button } from "grommet";
import React, { memo, useCallback } from "react";
import { useNotification } from "../hooks/useNotification";
import { useTimer } from "../hooks/useTimer";
import { formatTime } from "../utils";
import { Clock } from "./Clock";
import { LinkButton } from "./LinkButton";
import { PermissionDialog } from "./PermissionDialog";

const ToggleButton = memo(Button);
const SetupButton = memo(LinkButton);

export function Timer() {
  const { showNotification, requestPermission, permission } = useNotification();

  const onTick = useCallback(
    (remaining: number) =>
      showNotification("Timer", {
        tag: "timer",
        body: formatTime(remaining, "Time remaining: "),
        silent: true,
      }),
    [showNotification]
  );

  const onDone = useCallback(
    () =>
      showNotification("Timer", {
        tag: "timer",
        body: "Time out!",
        silent: false,
        renotify: true,
      }),
    [showNotification]
  );

  const { running, toggle, duration, remaining } = useTimer(onTick, onDone);

  return (
    <>
      <PermissionDialog
        requestPermission={requestPermission}
        permission={permission}
      />
      <Clock duration={duration} remaining={remaining} running={running} />
      <ToggleButton
        primary
        onClick={toggle}
        label={running ? "Pause" : "Start"}
        margin="small"
      />
      <SetupButton label={"Setup"} to="/" />
    </>
  );
}
