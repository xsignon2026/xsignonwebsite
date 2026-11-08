/**
 * Analytics and Consent Manager (T-135)
 *
 * Implements strict GDPR / ePrivacy compliance:
 * - Telemetry is strictly zeroed unless consent is affirmatively "accepted".
 * - Default status is "pending".
 * - Dispatches a custom event "xsignon:consent-changed" when user changes preferences.
 */

export type ConsentStatus = "pending" | "accepted" | "rejected";

export const CONSENT_STORAGE_KEY = "xsignon_consent_status";
export const CONSENT_CHANGE_EVENT = "xsignon:consent-changed";

/**
 * Retrieves the current consent status from localStorage safely.
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") {
    return "pending";
  }

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      return stored;
    }
    return "pending";
  } catch {
    return "pending";
  }
}

/**
 * Sets the consent status in localStorage and dispatches a notification event.
 */
export function setConsentStatus(status: "accepted" | "rejected"): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
    window.dispatchEvent(
      new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { status } })
    );
  } catch {
    // LocalStorage write error (e.g. storage disabled or quota exceeded)
  }
}

/**
 * Checks whether analytics tracking has been explicitly approved.
 */
export function hasAcceptedAnalytics(): boolean {
  return getConsentStatus() === "accepted";
}

/**
 * Emits an analytics event if and only if consent is affirmatively accepted.
 * Returns true if event was dispatched, false if blocked by consent gate.
 */
export function trackEvent(
  eventName: string,
  payload?: Record<string, unknown>
): boolean {
  if (!hasAcceptedAnalytics()) {
    return false;
  }

  // Safe first-party dispatch (mock or real telemetry gateway)
  if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
    console.debug(`[Analytics Tracked] ${eventName}:`, payload);
  }

  return true;
}
