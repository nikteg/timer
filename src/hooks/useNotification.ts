import { useCallback, useState } from "react";

export const useNotification = () => {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission
  );

  const requestPermission = useCallback(() => {
    Notification.requestPermission().then(function (result) {
      setPermission(result);
    });
  }, [setPermission]);

  const showNotification = useCallback(
    (title: string, options: NotificationOptions) => {
      if (permission === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, options);
        });
      }
    },
    [permission]
  );

  return { showNotification, requestPermission, permission };
};
