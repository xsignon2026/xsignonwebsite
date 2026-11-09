"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const urlStatus = searchParams.get("status");
  const urlEmail = searchParams.get("email") || "";

  const [email, setEmail] = useState(urlEmail);
  const [submitted, setSubmitted] = useState(urlStatus === "confirmed");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    urlStatus === "invalid"
      ? "The unsubscribe link provided is invalid or has expired. Please enter your email below."
      : "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Failed to unsubscribe. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 md:p-10 shadow-sm" id="unsubDone">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-txt">Request confirmed.</h3>
          <p className="text-body text-gray leading-relaxed">
            The address you entered has been recorded for removal from XSignOn marketing emails.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-line bg-card p-8 md:p-10 shadow-sm"
      id="unsubForm"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="space-y-2">
        <label htmlFor="unEmail" className="block text-sm font-medium text-txt">
          Email address
        </label>
        <input
          id="unEmail"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="name@company.com"
          className="w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-txt placeholder:text-gray/50 focus:border-txt focus:outline-none focus:ring-1 focus:ring-txt"
        />
        {error && <p className="text-sm text-acc mt-1">{error}</p>}
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-d1 text-white px-8 py-3 text-base font-semibold transition-colors duration-150 hover:bg-d2 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Unsubscribe"}
        </button>
      </div>
    </form>
  );
}
