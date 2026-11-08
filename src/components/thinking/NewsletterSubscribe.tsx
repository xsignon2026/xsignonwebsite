"use client";

import { useState, useEffect, useRef } from "react";

interface NewsletterSubscribeProps {
  sourcePage?: string;
}

export function NewsletterSubscribe({ sourcePage = "/thinking" }: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [hpCompany, setHpCompany] = useState("");
  const mountTimeRef = useRef<number>(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          purpose: "newsletter",
          sourcePage,
          hp_company: hpCompany,
          timestamp: mountTimeRef.current || Date.now() - 1000,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Unable to process subscription. Please check your email.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  }

  return (
    <div className="news-band rv">
      <h3 className="h3">Stay informed</h3>
      <p>New thinking on identity, AI governance and verified sign-in, in your inbox as it publishes.</p>

      {status === "success" ? (
        <div className="news-done" role="status">
          Thank you. Your subscription is recorded, and the next edition will arrive in your inbox.
        </div>
      ) : (
        <form className="news-form" onSubmit={handleSubmit} noValidate>
          {/* Honeypot field for bot detection */}
          <input
            type="text"
            name="company_hp"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
            value={hpCompany}
            onChange={(e) => setHpCompany(e.target.value)}
            aria-hidden="true"
          />

          <input
            type="email"
            required
            placeholder="Work email"
            aria-label="Work email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
          />
          <button
            className="btn btn-white"
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p style={{ color: "#f87171", marginTop: "12px", fontSize: "14px" }} role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
