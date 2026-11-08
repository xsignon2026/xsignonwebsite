/**
 * T-160: Web Vitals & Real-User Monitoring (RUM) Telemetry
 * Captures INP, LCP, CLS, FCP, TTFB in the field with privacy preservation.
 */

export interface WebVitalMetric {
  id: string;
  name: "CLS" | "FCP" | "FID" | "INP" | "LCP" | "TTFB";
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
  navigationType?: string;
}

export function classifyMetric(name: string, value: number): "good" | "needs-improvement" | "poor" {
  switch (name) {
    case "INP":
      return value <= 200 ? "good" : value <= 500 ? "needs-improvement" : "poor";
    case "LCP":
      return value <= 2500 ? "good" : value <= 4000 ? "needs-improvement" : "poor";
    case "CLS":
      return value <= 0.1 ? "good" : value <= 0.25 ? "needs-improvement" : "poor";
    case "FCP":
      return value <= 1800 ? "good" : value <= 3000 ? "needs-improvement" : "poor";
    case "TTFB":
      return value <= 800 ? "good" : value <= 1800 ? "needs-improvement" : "poor";
    default:
      return "good";
  }
}

/**
 * Dispatches a metric to the local /api/telemetry/vitals endpoint.
 * Uses navigator.sendBeacon when available to avoid delaying page teardown.
 */
export function sendWebVitalBeacon(metric: WebVitalMetric): boolean {
  if (typeof window === "undefined") return false;

  const payload = JSON.stringify({
    ...metric,
    rating: metric.rating || classifyMetric(metric.name, metric.value),
  });

  const url = "/api/telemetry/vitals";

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([payload], { type: "application/json" });
    return navigator.sendBeacon(url, blob);
  }

  // Fallback for environments where sendBeacon is unavailable
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Fail silently in telemetry
  });

  return true;
}
