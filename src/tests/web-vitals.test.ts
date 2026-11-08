import { describe, it, expect } from "vitest";
import { classifyMetric, sendWebVitalBeacon } from "@/lib/web-vitals";

describe("T-160: Web Vitals & Real-User Monitoring (RUM)", () => {
  it("classifies INP (Interaction to Next Paint) correctly according to Web Vitals thresholds", () => {
    // Good: <= 200ms
    expect(classifyMetric("INP", 120)).toBe("good");
    expect(classifyMetric("INP", 200)).toBe("good");

    // Needs improvement: 201ms - 500ms
    expect(classifyMetric("INP", 250)).toBe("needs-improvement");
    expect(classifyMetric("INP", 500)).toBe("needs-improvement");

    // Poor: > 500ms
    expect(classifyMetric("INP", 550)).toBe("poor");
  });

  it("classifies LCP (Largest Contentful Paint) correctly", () => {
    expect(classifyMetric("LCP", 1800)).toBe("good");
    expect(classifyMetric("LCP", 2500)).toBe("good");
    expect(classifyMetric("LCP", 3200)).toBe("needs-improvement");
    expect(classifyMetric("LCP", 4500)).toBe("poor");
  });

  it("classifies CLS (Cumulative Layout Shift) correctly", () => {
    expect(classifyMetric("CLS", 0.02)).toBe("good");
    expect(classifyMetric("CLS", 0.1)).toBe("good");
    expect(classifyMetric("CLS", 0.18)).toBe("needs-improvement");
    expect(classifyMetric("CLS", 0.3)).toBe("poor");
  });

  it("safely handles server-side execution without throwing", () => {
    // When window is undefined (e.g. Node.js environment)
    const result = sendWebVitalBeacon({
      id: "metric-1",
      name: "INP",
      value: 140,
    });
    expect(result).toBe(false);
  });
});
