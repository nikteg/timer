export function formatTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time / 60) % 60);
  const seconds = Math.floor(time % 60);

  return `T${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}`;
}

export function calculateTime(duration: number, now: number, start: number) {
  return duration - (now - start);
}
