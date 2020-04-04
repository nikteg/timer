import { Box, Button, Heading, Layer } from "grommet";
import React, { memo, useEffect, useState } from "react";

export interface PermissionDialogProps {
  permission: NotificationPermission;
  requestPermission: () => void;
}

export const PermissionDialog: React.FC<PermissionDialogProps> = memo(
  ({ permission, requestPermission }) => {
    const [show, setShow] = useState(permission === "default");

    useEffect(() => {
      if (permission !== "default") {
        setShow(false);
      }
    }, [permission]);

    if (!show) {
      return null;
    }

    return (
      <Layer animation="fadeIn" full>
        <Box pad="medium" justify="center" align="center" fill>
          <Heading textAlign="center">
            Do you want to enable notifications?
          </Heading>
          <Button
            primary
            onClick={requestPermission}
            label="Enable notifications..."
          />
          <Button
            id="skip"
            onClick={() => setShow(false)}
            label="Skip for now"
            margin="small"
          />
        </Box>
      </Layer>
    );
  }
);
