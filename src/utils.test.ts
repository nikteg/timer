import { formatTime, calculateTime, now } from "./utils";

describe("formatTime", () => {
  it("formats time correctly", () => {
    expect(formatTime(3600)).toBe("T01:00:00");
    expect(formatTime(60)).toBe("T00:01:00");
    expect(formatTime(61)).toBe("T00:01:01");
    expect(formatTime(59)).toBe("T00:00:59");
  });
});

describe("calculateTime", () => {
  it("calculates time correctly at beginning", () => {
    const duration = 3600;
    const now = 1585753006;
    const start = now;
    expect(calculateTime(duration, now, start)).toBe(duration);
  });

  it("calculates time correctly at after 10 seconds", () => {
    const duration = 3600;
    const start = 1585753006;
    const now = start + 10;
    expect(calculateTime(duration, now, start)).toBe(duration - 10);
  });
});

describe("now", () => {
  it("gets the correct time", () => {
    expect(now(1585990060648)).toBe(1585990060);
  });
});
