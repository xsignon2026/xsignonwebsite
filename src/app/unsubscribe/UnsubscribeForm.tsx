"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export function UnsubscribeForm() {
  const searchParams = useSearchParams();
  const urlStatus = searchParams.get("status");
  const urlEmail = searchParams.get("email") || "";
  const urlToken = searchParams.get("token") || "";
  // With the link from our email, one press removes the address. Without it, the server emails a link.
  const confirmMode = Boolean(urlEmail && urlToken && urlStatus !== "invalid");

  const [email, setEmail] = useState(urlEmail);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    urlStatus === "invalid"
      ? "This unsubscribe link is not valid. Enter your email below and we will send a new one."
      : "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !confirmMode) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confirmMode ? { email: urlEmail, token: urlToken } : { email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(data.message || "");
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
      <div className="form-card rv" id="unsubDone">
        <div className="form-done">
          <h3 className="h3">Request confirmed.</h3>
          <p>{message || "Your request has been recorded."}</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card rv" id="unsubForm" onSubmit={handleSubmit} noValidate>
      <div className="f-field">
        <label htmlFor="unEmail">Email address</label>
        <input
          id="unEmail"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          readOnly={confirmMode}
        />
        {error && (
          <p role="alert" style={{ margin: "6px 0 0", fontSize: "14px", color: "var(--acc-ink)" }}>
            {error}
          </p>
        )}
      </div>
      <div className="f-field" style={{ marginTop: "18px" }}>
        <button className="btn btn-navy" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Unsubscribe"}
        </button>
      </div>
    </form>
  );
}
