console.log("Hello from service worker");

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  clients.openWindow(event.notification.data.url);
});
