import { describe, it, expect, beforeEach, afterAll, vi } from "vitest";
import {
  getConsentStatus,
  setConsentStatus,
  hasAcceptedAnalytics,
  trackEvent,
  CONSENT_STORAGE_KEY,
  CONSENT_CHANGE_EVENT,
} from "@/lib/analytics";

describe("Analytics and Consent Manager (T-135)", () => {
  const storage = new Map<string, string>();
  const listeners = new Map<string, Set<(e: unknown) => void>>();

  const mockLocalStorage = {
    getItem: (key: string) => storage.get(key) ?? null,
    setItem: (key: string, val: string) => storage.set(key, String(val)),
    removeItem: (key: string) => storage.delete(key),
    clear: () => storage.clear(),
  };

  const originalWindow = (globalThis as unknown as { window?: unknown }).window;
  const originalCustomEvent = (globalThis as unknown as { CustomEvent?: unknown }).CustomEvent;

  beforeEach(() => {
    storage.clear();
    listeners.clear();
    vi.restoreAllMocks();

    class MockCustomEvent {
      type: string;
      detail: unknown;
      constructor(type: string, params?: { detail?: unknown }) {
        this.type = type;
        this.detail = params?.detail;
      }
    }

    (globalThis as unknown as { CustomEvent: unknown }).CustomEvent = MockCustomEvent;

    (globalThis as unknown as { window: unknown }).window = {
      localStorage: mockLocalStorage,
      addEventListener: (type: string, cb: (e: unknown) => void) => {
        if (!listeners.has(type)) listeners.set(type, new Set());
        listeners.get(type)!.add(cb);
      },
      removeEventListener: (type: string, cb: (e: unknown) => void) => {
        listeners.get(type)?.delete(cb);
      },
      dispatchEvent: (e: { type: string; detail?: unknown }) => {
        const cbs = listeners.get(e.type);
        if (cbs) {
          cbs.forEach((cb) => cb(e));
        }
        return true;
      },
    };
  });

  afterAll(() => {
    if (originalWindow !== undefined) {
      (globalThis as unknown as { window: unknown }).window = originalWindow;
    } else {
      delete (globalThis as unknown as { window?: unknown }).window;
    }
    if (originalCustomEvent !== undefined) {
      (globalThis as unknown as { CustomEvent: unknown }).CustomEvent = originalCustomEvent;
    } else {
      delete (globalThis as unknown as { CustomEvent?: unknown }).CustomEvent;
    }
  });

  it("defaults to 'pending' when no consent has been given", () => {
    expect(getConsentStatus()).toBe("pending");
    expect(hasAcceptedAnalytics()).toBe(false);
  });

  it("persists 'accepted' in localStorage and dispatches event", () => {
    const listener = vi.fn();
    (
      globalThis as unknown as {
        window: { addEventListener: (t: string, cb: (e: unknown) => void) => void };
      }
    ).window.addEventListener(CONSENT_CHANGE_EVENT, listener);

    setConsentStatus("accepted");

    expect(storage.get(CONSENT_STORAGE_KEY)).toBe("accepted");
    expect(getConsentStatus()).toBe("accepted");
    expect(hasAcceptedAnalytics()).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("persists 'rejected' in localStorage and dispatches event", () => {
    const listener = vi.fn();
    (
      globalThis as unknown as {
        window: { addEventListener: (t: string, cb: (e: unknown) => void) => void };
      }
    ).window.addEventListener(CONSENT_CHANGE_EVENT, listener);

    setConsentStatus("rejected");

    expect(storage.get(CONSENT_STORAGE_KEY)).toBe("rejected");
    expect(getConsentStatus()).toBe("rejected");
    expect(hasAcceptedAnalytics()).toBe(false);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("strictly enforces zero-tracking invariant before consent", () => {
    const debugSpy = vi.spyOn(console, "debug").mockImplementation(() => {});

    // 1. Pending -> Blocked
    const pendingResult = trackEvent("page_view", { url: "/test" });
    expect(pendingResult).toBe(false);
    expect(debugSpy).not.toHaveBeenCalled();

    // 2. Rejected -> Blocked
    setConsentStatus("rejected");
    const rejectedResult = trackEvent("page_view", { url: "/test" });
    expect(rejectedResult).toBe(false);
    expect(debugSpy).not.toHaveBeenCalled();

    // 3. Accepted -> Allowed
    setConsentStatus("accepted");
    const acceptedResult = trackEvent("page_view", { url: "/test" });
    expect(acceptedResult).toBe(true);
    expect(debugSpy).toHaveBeenCalledWith("[Analytics Tracked] page_view:", { url: "/test" });
  });
});
