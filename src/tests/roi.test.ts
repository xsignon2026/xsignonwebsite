import { describe, expect, it } from "vitest";
import { calculateRoi, sanitizeRoiInput } from "../lib/roi";

describe("ROI Calculator Engine (T-130)", () => {
  it("calculates accurate baseline metrics using default parameters", () => {
    const result = calculateRoi();
    expect(result.resetsPerYear).toBe(2000); // 500 staff * 4 resets
    expect(result.hoursPerYear).toBe(667); // (2000 * 20) / 60 = 666.67 => 667
    expect(result.costSaved).toBe(30000); // 666.67 * 45 = 30000
    expect(result.formattedResets).toBe("2,000");
    expect(result.formattedHours).toBe("667");
    expect(result.formattedCost).toBe("$30,000");
  });

  it("handles explicit full input overrides", () => {
    const result = calculateRoi({
      staff: 1000,
      resetsPerYear: 3,
      minutesPerReset: 15,
      hourlyRate: 60,
    });
    // n = 3000, h = 3000 * 15 / 60 = 750, cost = 750 * 60 = 45000
    expect(result.resetsPerYear).toBe(3000);
    expect(result.hoursPerYear).toBe(750);
    expect(result.costSaved).toBe(45000);
    expect(result.formattedResets).toBe("3,000");
    expect(result.formattedHours).toBe("750");
    expect(result.formattedCost).toBe("$45,000");
  });

  it("safely parses valid string representations", () => {
    const result = calculateRoi({
      staff: "600",
      resetsPerYear: "5",
      minutesPerReset: "30",
      hourlyRate: "50",
    });
    // n = 3000, h = 3000 * 30 / 60 = 1500, cost = 1500 * 50 = 75000
    expect(result.resetsPerYear).toBe(3000);
    expect(result.hoursPerYear).toBe(1500);
    expect(result.costSaved).toBe(75000);
    expect(result.formattedCost).toBe("$75,000");
  });

  it("clamps negative values to zero preventing invalid negative savings", () => {
    const result = calculateRoi({
      staff: -500,
      resetsPerYear: -4,
      minutesPerReset: -20,
      hourlyRate: -45,
    });
    expect(result.resetsPerYear).toBe(0);
    expect(result.hoursPerYear).toBe(0);
    expect(result.costSaved).toBe(0);
    expect(result.formattedResets).toBe("0");
    expect(result.formattedHours).toBe("0");
    expect(result.formattedCost).toBe("$0");
  });

  it("handles zero values properly without crashing", () => {
    const result = calculateRoi({
      staff: 0,
      resetsPerYear: 4,
      minutesPerReset: 20,
      hourlyRate: 45,
    });
    expect(result.resetsPerYear).toBe(0);
    expect(result.hoursPerYear).toBe(0);
    expect(result.costSaved).toBe(0);
    expect(result.formattedCost).toBe("$0");
  });

  it("handles decimal reset rates accurately", () => {
    const result = calculateRoi({
      staff: 200,
      resetsPerYear: 2.5,
      minutesPerReset: 12,
      hourlyRate: 40,
    });
    // n = 200 * 2.5 = 500, h = 500 * 12 / 60 = 100, cost = 100 * 40 = 4000
    expect(result.resetsPerYear).toBe(500);
    expect(result.hoursPerYear).toBe(100);
    expect(result.costSaved).toBe(4000);
    expect(result.formattedCost).toBe("$4,000");
  });

  it("computes large enterprise scales accurately", () => {
    const result = calculateRoi({
      staff: 100000,
      resetsPerYear: 4,
      minutesPerReset: 20,
      hourlyRate: 45,
    });
    // n = 400,000, h = 400,000 * 20 / 60 = 133,333.33 => 133,333, cost = 6,000,000
    expect(result.resetsPerYear).toBe(400000);
    expect(result.hoursPerYear).toBe(133333);
    expect(result.costSaved).toBe(6000000);
    expect(result.formattedResets).toBe("400,000");
    expect(result.formattedHours).toBe("133,333");
    expect(result.formattedCost).toBe("$6,000,000");
  });

  describe("sanitizeRoiInput", () => {
    it("returns clamped positive numbers", () => {
      expect(sanitizeRoiInput(100)).toBe(100);
      expect(sanitizeRoiInput(-10)).toBe(0);
      expect(sanitizeRoiInput("250.5")).toBe(250.5);
    });

    it("falls back safely on non-numeric or malformed inputs", () => {
      expect(sanitizeRoiInput(NaN, 10)).toBe(10);
      expect(sanitizeRoiInput(Infinity, 10)).toBe(10);
      expect(sanitizeRoiInput("invalid", 5)).toBe(5);
      expect(sanitizeRoiInput("", 0)).toBe(0);
      expect(sanitizeRoiInput(null, 0)).toBe(0);
      expect(sanitizeRoiInput(undefined, 0)).toBe(0);
      expect(sanitizeRoiInput({}, 0)).toBe(0);
    });
  });
});
