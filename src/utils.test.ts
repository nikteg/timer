import { formatTime } from "./utils";

describe("formatTime", () => {
  it("formats time correctly", () => {
    expect(formatTime(3600)).toBe("T01:00:00");
    expect(formatTime(60)).toBe("T00:01:00");
    expect(formatTime(61)).toBe("T00:01:01");
    expect(formatTime(59)).toBe("T00:00:59");
  });
});
