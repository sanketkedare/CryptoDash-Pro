import { describe, it, expect } from "vitest";
import { daySwitch, DAY_OPTIONS } from "@/utils/chartHelpers";

describe("daySwitch", () => {
  it("returns 24 hours labels for day=1", () => {
    const labels = daySwitch(1);
    expect(labels).toHaveLength(24);
    expect(labels[0]).toBe("1h");
    expect(labels[23]).toBe("24h");
  });

  it("returns 7 day labels for day=7", () => {
    const labels = daySwitch(7);
    expect(labels).toHaveLength(7);
    expect(labels[0]).toBe("Mon");
    expect(labels[6]).toBe("Sun");
  });

  it("returns 12 month labels for day=30", () => {
    const labels = daySwitch(30);
    expect(labels).toHaveLength(12);
  });

  it("returns 365 numeric labels for day=365", () => {
    const labels = daySwitch(365);
    expect(labels).toHaveLength(365);
    expect(labels[0]).toBe(1);
    expect(labels[364]).toBe(365);
  });
});

describe("DAY_OPTIONS", () => {
  it("has 6 options", () => expect(DAY_OPTIONS).toHaveLength(6));

  it("has correct time values", () => {
    const times = DAY_OPTIONS.map((d) => d.time);
    expect(times).toEqual([1, 7, 30, 365]);
  });
});
