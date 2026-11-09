"use client";

import React, { useId, useState } from "react";
import { CONSENT_VERSION, NEWSLETTER_CONSENT_TEXT } from "@/lib/consent/wording";

type SubscribeBlockProps = {
  className?: string;
  sourcePage?: string;
};

export function SubscribeBlock({ className = "", sourcePage = "footer" }: SubscribeBlockProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitted" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const emailInputId = useId();
  const consentId = useId();
  const errorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Please enter your work email.");
      setStatus("error");
      return;
    }

    if (!consent) {
      setErrorMessage("Please agree to the updates policy to subscribe.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          consent: true,
          purpose: "newsletter",
          sourcePage,
          wordingVersion: CONSENT_VERSION,
        }),
      });

      if (response.ok) {
        setStatus("submitted");
        startCooldown(60);
      } else {
        const data = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(data?.message || "Unable to subscribe. Please try again shortly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  };

  const startCooldown = (seconds: number) => {
    setCooldown(seconds);
    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (cooldown > 0 || !email.trim()) return;
    setLoading(true);
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          consent: true,
          purpose: "newsletter",
          sourcePage,
          wordingVersion: CONSENT_VERSION,
        }),
      });
      startCooldown(60);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`news-band rounded-2xl bg-d1 p-7 md:p-11 text-white shadow-xl ${className}`}
      data-nav="dark"
    >
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Stay informed</h3>
      <p className="mt-3 text-base md:text-[17px] leading-relaxed text-[#b4bfd3] max-w-[620px]">
        New thinking on identity, AI governance and verified sign-in, in your inbox as it publishes.
      </p>

      {status === "submitted" ? (
        <div
          className="news-done mt-6 rounded-xl border border-[#6f7c97] bg-d3 p-4 md:p-5 text-base text-[#f8fafc] max-w-[560px]"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <p className="font-semibold text-white">Check your email</p>
              <p className="mt-1 text-sm text-[#b4bfd3]">
                We sent a verification link to <strong className="text-white">{email}</strong>.
                Please click the link to confirm your subscription.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || loading}
                  className="text-xs font-semibold uppercase tracking-wider text-white underline hover:text-[#b4bfd3] disabled:no-underline disabled:opacity-50"
                >
                  {cooldown > 0 ? `Resend link in ${cooldown}s` : "Resend verification link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          action="/api/subscribe"
          method="POST"
          onSubmit={handleSubmit}
          className="mt-6"
          noValidate
        >
          <input type="hidden" name="purpose" value="newsletter" />
          <input type="hidden" name="sourcePage" value={sourcePage} />
          <input type="hidden" name="wordingVersion" value={CONSENT_VERSION} />

          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor={emailInputId} className="sr-only">
              Work email
            </label>
            <input
              id={emailInputId}
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Work email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              className="flex-1 min-w-[260px] rounded-full border border-[#6f7c97] bg-d3 px-5 py-3 text-base text-white placeholder-[#b4bfd3] focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40 min-h-[48px]"
              aria-invalid={status === "error" ? "true" : undefined}
              aria-describedby={status === "error" ? errorId : undefined}
            />

            <button
              type="submit"
              disabled={loading}
              className="btn btn-white inline-flex items-center justify-center rounded-full bg-white text-d1 px-7 py-3 text-base font-semibold transition-colors duration-150 hover:bg-white/90 active:scale-[0.98] disabled:opacity-60 min-h-[48px] shrink-0"
              aria-busy={loading ? "true" : "false"}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </div>

          <div className="mt-3.5 flex items-start gap-2.5">
            <input
              id={consentId}
              type="checkbox"
              name="consent"
              required
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked);
                if (status === "error") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              className="mt-1 h-4 w-4 rounded border-[#6f7c97] bg-d3 text-white focus:ring-white/50"
            />
            <label
              htmlFor={consentId}
              className="text-xs leading-relaxed text-[#b4bfd3] select-none"
            >
              {NEWSLETTER_CONSENT_TEXT}
            </label>
          </div>

          {status === "error" && (
            <div
              id={errorId}
              role="status"
              aria-live="polite"
              className="mt-3 text-sm font-medium text-rose-300"
            >
              {errorMessage}
            </div>
          )}
        </form>
      )}
    </div>
  );
}
