"use client";

import { useReportWebVitals } from "next/web-vitals";
import { sendWebVitalBeacon, type WebVitalMetric } from "@/lib/web-vitals";

/**
 * T-160: Real User Monitoring (RUM) component.
 * Captures Core Web Vitals including Interaction to Next Paint (INP).
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    sendWebVitalBeacon({
      id: metric.id,
      name: metric.name as WebVitalMetric["name"],
      value: metric.value,
      navigationType: metric.navigationType,
    });
  });

  return null;
}
