export function formatTime(time: number, prefix = "T") {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);

  return `${prefix}${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}
