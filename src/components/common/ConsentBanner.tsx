"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  getConsentStatus,
  setConsentStatus,
  ConsentStatus,
  CONSENT_CHANGE_EVENT,
} from "@/lib/analytics";

function subscribeConsent(callback: () => void): () => void {
  if (typeof window === "undefined") {
    return () => {};
  }
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getConsentSnapshot(): ConsentStatus {
  return getConsentStatus();
}

function getServerSnapshot(): ConsentStatus {
  return "accepted"; // Default to hidden on server to prevent layout shift
}

export function ConsentBanner() {
  const status = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getServerSnapshot);

  const handleChoice = (choice: "accepted" | "rejected") => {
    setConsentStatus(choice);
  };

  if (status !== "pending") {
    return null;
  }

  return (
    <section className="consent-banner-wrapper" role="region" aria-label="Cookie consent">
      <div className="consent-banner-inner">
        <div className="consent-banner-text">
          We use essential cookies to maintain security posture and optional analytics to understand
          site usage. Read our <Link href="/privacy">Privacy Policy</Link> for details.
        </div>
        <div className="consent-banner-actions">
          <button type="button" className="btn btn-white" onClick={() => handleChoice("accepted")}>
            Accept All
          </button>
          <button
            type="button"
            className="btn btn-ghost-d"
            onClick={() => handleChoice("rejected")}
          >
            Decline Non-Essential
          </button>
        </div>
      </div>
    </section>
  );
}
