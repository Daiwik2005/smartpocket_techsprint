export async function requestNotificationPermission() {
  if (!("Notification" in window)) return;

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
}

export function sendLocalNotification(title: string, body: string) {
  if (Notification.permission !== "granted") return;

  new Notification(title, {
    body,
    icon: "/icon-192.png",
    badge: "/icon-192.png"
  });
}
