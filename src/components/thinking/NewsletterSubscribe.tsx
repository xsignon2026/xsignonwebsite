"use client";

import { useState, useEffect, useRef } from "react";
import { NEWSLETTER_CONSENT_TEXT } from "@/lib/consent/wording";

const PROMPT_SEEN_KEY = "xs-news-prompt-seen";
const SUBSCRIBED_KEY = "xs-news-subscribed";
const AUTO_OPEN_MS = 1500;

interface NewsletterSubscribeProps {
  sourcePage?: string;
  /** Shows a "Stay informed" band with a Subscribe button; the email form opens in a small card on click. */
  popup?: boolean;
}

export function NewsletterSubscribe({
  sourcePage = "/thinking",
  popup = false,
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState("");
  const [hpCompany, setHpCompany] = useState("");
  const mountTimeRef = useRef<number>(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    mountTimeRef.current = Date.now();
  }, []);

  // On an Insights page the card opens by itself once per visit, a moment after the page appears. It stays
  // closed for anyone who has already closed it this visit or has subscribed.
  useEffect(() => {
    if (!popup) return;
    let skip = false;
    try {
      skip =
        sessionStorage.getItem(PROMPT_SEEN_KEY) === "1" ||
        localStorage.getItem(SUBSCRIBED_KEY) === "1";
    } catch {
      skip = false;
    }
    if (skip) return;
    const timer = window.setTimeout(() => {
      const dialog = dialogRef.current;
      if (!dialog || dialog.open) return;
      dialog.showModal();
      emailRef.current?.focus();
      try {
        sessionStorage.setItem(PROMPT_SEEN_KEY, "1");
      } catch {
        // Private mode: the card may open again on the next page, which is harmless.
      }
    }, AUTO_OPEN_MS);
    return () => window.clearTimeout(timer);
  }, [popup]);

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
          // Pressing Subscribe, next to the notice below, is the agreement; the confirmation email is the second step.
          consent: true,
          purpose: "newsletter",
          sourcePage,
          hp_company: hpCompany,
          timestamp: mountTimeRef.current || Date.now() - 1000,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        try {
          localStorage.setItem(SUBSCRIBED_KEY, "1");
        } catch {
          // Private mode: the card may open again later, which is harmless.
        }
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Unable to process subscription. Please check your email.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    }
  }

  const form = (
    <>
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
            ref={emailRef}
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
            className={popup ? "btn btn-acc" : "btn btn-white"}
            type="submit"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {status !== "success" && (
        <p className="news-consent">
          {NEWSLETTER_CONSENT_TEXT} We will email you a link to confirm.
        </p>
      )}

      {status === "error" && (
        <p className="news-error" role="alert">
          {errorMessage}
        </p>
      )}
    </>
  );

  if (!popup) {
    return (
      <div className="news-band rv">
        <h3 className="h3">Stay informed</h3>
        <p>
          New thinking on identity, AI governance and verified sign-in, in your inbox as it
          publishes.
        </p>
        {form}
      </div>
    );
  }

  return (
    <>
      <div className="news-band news-row rv">
        <div>
          <h3 className="h3">Stay informed</h3>
          <p>
            New thinking on identity, AI governance and verified sign-in, in your inbox as it
            publishes.
          </p>
        </div>
        <button
          className="btn btn-white"
          type="button"
          aria-haspopup="dialog"
          onClick={() => {
            dialogRef.current?.showModal();
            // Start typing straight away.
            emailRef.current?.focus();
          }}
        >
          Subscribe
        </button>
      </div>
      <dialog
        ref={dialogRef}
        className="news-dialog"
        aria-labelledby="news-dialog-title"
        // A click on the dimmed area outside the card closes it.
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="news-dialog-card">
          <button
            className="news-dialog-x"
            type="button"
            aria-label="Close"
            onClick={() => dialogRef.current?.close()}
          >
            &times;
          </button>
          <h3 className="h3" id="news-dialog-title">
            Stay informed
          </h3>
          {form}
        </div>
      </dialog>
    </>
  );
}
