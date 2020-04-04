import { useCallback, useState } from "react";

export const useNotification = () => {
  const [hasPermission, setHasPermission] = useState(
    Notification.permission === "granted"
  );

  const requestPermission = useCallback(() => {
    Notification.requestPermission().then(function (result) {
      setHasPermission(result === "granted");
    });
  }, [setHasPermission]);

  const showNotification = useCallback(
    (title: string, options: NotificationOptions) => {
      if (hasPermission) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
        });
      }
    },
    [hasPermission]
  );

  return { showNotification, requestPermission, hasPermission };
};
