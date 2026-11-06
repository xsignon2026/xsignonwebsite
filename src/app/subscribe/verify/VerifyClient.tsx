"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type VerifyResponse = {
  success: boolean;
  alreadyVerified?: boolean;
  purpose?: "newsletter" | "whitepaper_download";
  targetSlug?: string;
  downloadUrl?: string;
  message?: string;
  error?: string;
};

export function VerifyClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const emailParam = searchParams.get("email") || "";

  const [loading, setLoading] = useState<boolean>(Boolean(token && emailParam));
  const [data, setData] = useState<VerifyResponse | null>(() => {
    if (!token || !emailParam) {
      return {
        success: false,
        error: "missing_parameters",
        message: "No verification token or email address was provided.",
      };
    }
    return null;
  });

  // Re-request link form state
  const [resendEmail, setResendEmail] = useState(emailParam);
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!token || !emailParam) return;

    let isMounted = true;
    const query = new URLSearchParams({ token, email: emailParam });

    fetch(`/api/subscribe/verify?${query.toString()}`)
      .then((res) => res.json())
      .then((json: VerifyResponse) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setData({
            success: false,
            error: "network_error",
            message: "Unable to verify at this moment. Please check your connection.",
          });
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token, emailParam]);

  const handleRequestNewLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail.trim()) return;

    setResending(true);
    setResendStatus(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resendEmail.trim(),
          consent: true,
          purpose: data?.purpose || "newsletter",
          targetSlug: data?.targetSlug,
        }),
      });

      if (res.ok) {
        setResendStatus("A new verification link has been sent to your email address.");
      } else {
        setResendStatus("Unable to request link at this time. Please try again shortly.");
      }
    } catch {
      setResendStatus("A new verification link has been sent to your email address.");
    } finally {
      setResending(false);
    }
  };

  if (loading) {
    return (
      <div
        className="rounded-2xl border border-line bg-card p-8 md:p-12 shadow-sm text-center max-w-xl mx-auto"
        role="status"
        aria-live="polite"
      >
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-line border-t-txt mb-4" />
        <h2 className="text-xl font-bold text-txt">Verifying your request...</h2>
        <p className="mt-2 text-gray text-sm">Please wait while we validate your secure token.</p>
      </div>
    );
  }

  // 1. Success State: newly verified
  if (data?.success && !data.alreadyVerified) {
    const isDownload = data.purpose === "whitepaper_download";

    return (
      <div className="rounded-2xl border border-line bg-card p-8 md:p-12 shadow-sm max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mb-6 border border-emerald-200">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-txt">
          {isDownload ? "Verification confirmed." : "Subscription confirmed."}
        </h2>

        <p className="mt-3 text-body text-gray leading-relaxed">
          {isDownload
            ? "Your work email address has been verified. Your requested technical white paper is ready for download."
            : "Your email address has been recorded. You will receive the next edition of XSignOn thinking in your inbox."}
        </p>

        {isDownload && data.downloadUrl && (
          <div className="mt-8 space-y-3">
            <a
              href={data.downloadUrl}
              className="inline-flex items-center justify-center rounded-full bg-d1 text-white px-8 py-3.5 text-base font-semibold transition-colors duration-150 hover:bg-d2 shadow-sm"
              download
            >
              Download PDF &rarr;
            </a>
            <p className="text-caption text-gray">
              A backup copy with this signed link has also been sent to your email inbox. Link valid for 15 minutes.
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-sm">
          <span className="text-gray">{emailParam}</span>
          <Link href="/" className="font-medium text-txt hover:text-acc-ink underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  // 2. State: already_used / already verified
  if (data?.success && data.alreadyVerified) {
    const isDownload = data.purpose === "whitepaper_download";

    return (
      <div className="rounded-2xl border border-line bg-card p-8 md:p-12 shadow-sm max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-6 border border-blue-200">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-txt">
          Already verified
        </h2>

        <p className="mt-3 text-body text-gray leading-relaxed">
          {isDownload
            ? "This verification link has already been verified. We have refreshed your secure download link below."
            : "Your email address is already verified and active on the XSignOn update list."}
        </p>

        {isDownload && data.downloadUrl && (
          <div className="mt-8 space-y-3">
            <a
              href={data.downloadUrl}
              className="inline-flex items-center justify-center rounded-full bg-d1 text-white px-8 py-3.5 text-base font-semibold transition-colors duration-150 hover:bg-d2 shadow-sm"
              download
            >
              Download PDF &rarr;
            </a>
            <p className="text-caption text-gray">
              Signed link refreshed for 15 minutes.
            </p>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-sm">
          <Link href="/thinking" className="font-medium text-txt hover:text-acc-ink underline">
            Explore latest articles
          </Link>
          <Link href="/" className="font-medium text-txt hover:text-acc-ink underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  // 3. State: expired
  const isExpired = data?.error === "expired_token";

  if (isExpired) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 md:p-12 shadow-sm max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-50 text-amber-600 mb-6 border border-amber-200">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-txt">
          Verification link expired
        </h2>

        <p className="mt-3 text-body text-gray leading-relaxed">
          Verification links expire 24 hours after request for your security. Please enter your work email to receive a new link.
        </p>

        <form onSubmit={handleRequestNewLink} className="mt-6 space-y-4">
          <div>
            <label htmlFor="resend-email" className="block text-sm font-medium text-txt mb-1">
              Work email
            </label>
            <input
              type="email"
              id="resend-email"
              required
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full rounded-full border border-line bg-surface px-5 py-3 text-sm text-txt focus:border-txt focus:outline-none focus:ring-1 focus:ring-txt"
            />
          </div>

          <button
            type="submit"
            disabled={resending}
            className="w-full inline-flex items-center justify-center rounded-full bg-d1 text-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-d2 disabled:opacity-50"
          >
            {resending ? "Sending link..." : "Send new verification link"}
          </button>

          {resendStatus && (
            <div
              className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800"
              role="status"
              aria-live="polite"
            >
              {resendStatus}
            </div>
          )}
        </form>

        <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-sm">
          <Link href="/" className="font-medium text-txt hover:text-acc-ink underline">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  // 4. State: invalid / tampered / missing_parameters
  return (
    <div className="rounded-2xl border border-line bg-card p-8 md:p-12 shadow-sm max-w-xl mx-auto">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-50 text-rose-600 mb-6 border border-rose-200">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-txt">
        Verification link invalid
      </h2>

      <p className="mt-3 text-body text-gray leading-relaxed">
        This link is malformed or unverified. Please submit your request again to receive a fresh verification link.
      </p>

      <form onSubmit={handleRequestNewLink} className="mt-6 space-y-4">
        <div>
          <label htmlFor="invalid-resend-email" className="block text-sm font-medium text-txt mb-1">
            Work email
          </label>
          <input
            type="email"
            id="invalid-resend-email"
            required
            value={resendEmail}
            onChange={(e) => setResendEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full rounded-full border border-line bg-surface px-5 py-3 text-sm text-txt focus:border-txt focus:outline-none focus:ring-1 focus:ring-txt"
          />
        </div>

        <button
          type="submit"
          disabled={resending}
          className="w-full inline-flex items-center justify-center rounded-full bg-d1 text-white px-6 py-3 text-sm font-semibold transition-colors hover:bg-d2 disabled:opacity-50"
        >
          {resending ? "Sending link..." : "Request verification link"}
        </button>

        {resendStatus && (
          <div
            className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800"
            role="status"
            aria-live="polite"
          >
            {resendStatus}
          </div>
        )}
      </form>

      <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-sm">
        <Link href="/" className="font-medium text-txt hover:text-acc-ink underline">
          Return to home
        </Link>
      </div>
    </div>
  );
}
