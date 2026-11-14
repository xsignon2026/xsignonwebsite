"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { REASONS, validateContact } from "@/lib/contact/schema";

// The contact form, laid out as in the approved prototype (view-contact) and sending to /api/contact.
// What the prototype does not have is added for safety only: a hidden trap field for bots, a key per send
// (so a retry is saved once), the time taken to fill it in, checks in the browser, and a button that stays
// off until the page is running (so answers can never end up in the address bar). The prototype's text
// message tick box is not included: this site sends no text messages.

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  reason: string;
  message: string;
};

const EMPTY: Fields = { name: "", email: "", company: "", phone: "", reason: "", message: "" };
const ORDER: Array<keyof Fields> = ["name", "email", "company", "phone", "reason", "message"];
const IDS: Record<keyof Fields, string> = {
  name: "cfName",
  email: "cfEmail",
  company: "cfCompany",
  phone: "cfPhone",
  reason: "cfReason",
  message: "cfMsg",
};

// How long the form has been open (the server drops forms sent faster than a person could).
function millisecondsSince(start: number) {
  return Date.now() - start;
}

export function ContactForm() {
  const router = useRouter();
  const [typed, setValues] = useState<Fields>(EMPTY);
  // A link such as /contact?reason=careers chooses the reason in advance (until the visitor picks one).
  const search = useSyncExternalStore(
    () => () => {},
    () => window.location.search,
    () => "",
  );
  const wanted = new URLSearchParams(search).get("reason") ?? "";
  const preset = REASONS.some((reason) => reason.value === wanted) ? wanted : "";
  const values: Fields = { ...typed, reason: typed.reason || preset };
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [failure, setFailure] = useState("");
  const [sending, setSending] = useState(false);
  const keyRef = useRef("");
  const startedAt = useRef(0);
  const trap = useRef<HTMLInputElement>(null);
  // false on the server and until the page runs in the browser.
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    keyRef.current = crypto.randomUUID();
    startedAt.current = Date.now();
  }, []);

  const change = (name: keyof Fields) => (e: { target: { value: string } }) => {
    setValues((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const focusFirst = (found: Partial<Record<keyof Fields, string>>) => {
    const first = ORDER.find((name) => found[name]);
    if (first) document.getElementById(IDS[first])?.focus();
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFailure("");

    const found: Partial<Record<keyof Fields, string>> = {};
    const check = validateContact(values);
    if (!check.ok) Object.assign(found, check.errors);
    // The prototype marks the company as required.
    if (!values.company.trim() && !found.company) found.company = "Enter your company.";
    if (Object.keys(found).length > 0) {
      setErrors(found);
      focusFirst(found);
      return;
    }
    setErrors({});
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          submissionKey: keyRef.current,
          elapsedMs: millisecondsSince(startedAt.current),
          hp_check: trap.current?.value ?? "",
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) {
        router.push("/contact/thank-you");
        return;
      }
      if (data.errors && Object.keys(data.errors).length > 0) {
        setErrors(data.errors);
        focusFirst(data.errors);
      }
      setFailure(
        response.status === 429
          ? "Too many messages from your network. Please try again in a few minutes."
          : response.status === 503
            ? "We could not send your message right now. Please try again shortly."
            : "Please check the highlighted fields and try again.",
      );
    } catch {
      setFailure("A network error occurred. Please check your connection and try again.");
    }
    setSending(false);
  };

  const field = (name: keyof Fields) => ({
    id: IDS[name],
    name,
    value: values[name],
    onChange: change(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const error = (name: keyof Fields) =>
    errors[name] ? (
      <p
        id={`${name}-error`}
        style={{ margin: "6px 0 0", fontSize: "14px", color: "var(--acc-ink)" }}
      >
        {errors[name]}
      </p>
    ) : null;

  return (
    <form className="form-card rv" id="contactForm" method="post" onSubmit={submit} noValidate>
      <div className="f-grid">
        <div className="f-field">
          <label htmlFor="cfName">Name</label>
          <input {...field("name")} type="text" autoComplete="name" required />
          {error("name")}
        </div>
        <div className="f-field">
          <label htmlFor="cfEmail">Work email</label>
          <input {...field("email")} type="email" autoComplete="email" required />
          {error("email")}
        </div>
        <div className="f-field">
          <label htmlFor="cfCompany">Company</label>
          <input {...field("company")} type="text" autoComplete="organization" required />
          {error("company")}
        </div>
        <div className="f-field">
          <label htmlFor="cfPhone">Phone (optional)</label>
          <input {...field("phone")} type="tel" autoComplete="tel" />
          {error("phone")}
        </div>
        <div className="f-field full">
          <label htmlFor="cfReason">Reason for contacting</label>
          <select {...field("reason")} required>
            <option value="">Select a reason</option>
            {REASONS.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>
          {error("reason")}
        </div>
        <div className="f-field full">
          <label htmlFor="cfMsg">Message</label>
          <textarea {...field("message")} required />
          {error("message")}
        </div>

        {/* Hidden trap for bots. Its name is not one that browsers fill in on their own. */}
        <div
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}
        >
          <input
            ref={trap}
            type="text"
            name="hp_check"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {failure && (
          <div
            className="f-field full"
            role="alert"
            style={{ color: "var(--acc-ink)", fontWeight: 500 }}
          >
            {failure}
          </div>
        )}
        <noscript>
          <div className="f-field full">
            This form needs JavaScript. Please turn it on, or try another browser.
          </div>
        </noscript>
        <div className="f-field full">
          <button
            className="btn btn-navy"
            type="submit"
            disabled={sending || !ready}
            aria-busy={sending}
          >
            {sending ? "Sending message..." : "Send message"}
          </button>
        </div>
      </div>
    </form>
  );
}
