"use client";

import React, { useId, useState } from "react";
import { CONSENT_VERSION, WHITEPAPER_CONSENT_TEXT } from "@/lib/consent/wording";

type WhitePaperDownloadFormProps = {
  slug: string;
  title: string;
  className?: string;
};

export function WhitePaperDownloadForm({
  slug,
  title,
  className = "",
}: WhitePaperDownloadFormProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailId = useId();
  const consentId = useId();
  const errorId = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage("Please enter your work email.");
      return;
    }

    if (!consent) {
      setErrorMessage("Please accept the terms to request this technical paper.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          consent: true,
          purpose: "whitepaper_download",
          targetSlug: slug,
          sourcePage: `/white-papers/${slug}`,
          wordingVersion: CONSENT_VERSION,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(
          data?.message || "Unable to request download. Please try again shortly."
        );
      }
    } catch {
      setErrorMessage("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={`rounded-2xl border border-[#6f7c97] bg-d1 p-6 md:p-8 text-white shadow-lg ${className}`}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 text-emerald-400 mb-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <h3 className="text-xl font-bold text-white">Check your email</h3>
        </div>
        <p className="text-sm leading-relaxed text-[#b4bfd3]">
          We have sent a verification link to <strong className="text-white">{email}</strong>. Once verified, your download of <em>{title}</em> will begin immediately.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-line bg-card p-6 md:p-8 shadow-sm ${className}`}>
      <h3 className="text-xl font-bold tracking-tight text-txt">
        Download this White Paper
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray">
        Enter your work email to receive access to the full technical document.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
        <div>
          <label htmlFor={emailId} className="block text-xs font-semibold uppercase tracking-wider text-txt mb-1.5">
            Work Email
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="architect@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            className="w-full rounded-full border border-line bg-surface px-4 py-2.5 text-sm text-txt placeholder:text-gray focus:border-txt focus:outline-none focus:ring-1 focus:ring-txt"
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? errorId : undefined}
          />
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            id={consentId}
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errorMessage) setErrorMessage("");
            }}
            className="mt-1 h-4 w-4 rounded border-line bg-card text-txt focus:ring-txt"
          />
          <label htmlFor={consentId} className="text-xs leading-relaxed text-gray select-none">
            {WHITEPAPER_CONSENT_TEXT}
          </label>
        </div>

        {errorMessage && (
          <div id={errorId} role="status" aria-live="polite" className="text-xs font-medium text-rose-600">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-full bg-d1 text-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-d2 disabled:opacity-50 shadow-sm"
          aria-busy={loading ? "true" : "false"}
        >
          {loading ? "Requesting access..." : "Request Download &rarr;"}
        </button>
      </form>
    </div>
  );
}
