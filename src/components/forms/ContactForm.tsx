"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CONTACT_REASONS, type ContactFormData } from "@/lib/contact/validation";
import { TCPA_CONSENT_TEXT } from "@/app/api/contact/route";

export function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    reason: "",
    message: "",
    sms: false,
    website_url_hp: "",
  });

  const mountTimeRef = useRef<number>(0);
  const idempotencyKeyRef = useRef<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Field element refs for autofocus on first error
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    mountTimeRef.current = Date.now();
    idempotencyKeyRef.current = `idem_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const focusFirstError = (fieldErrors: Record<string, string>) => {
    if (fieldErrors.name) nameRef.current?.focus();
    else if (fieldErrors.email) emailRef.current?.focus();
    else if (fieldErrors.company) companyRef.current?.focus();
    else if (fieldErrors.phone) phoneRef.current?.focus();
    else if (fieldErrors.reason) reasonRef.current?.focus();
    else if (fieldErrors.message) messageRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError("");
    setErrors({});
    setIsSubmitting(true);

    try {
      const payload: ContactFormData = {
        ...formData,
        timestamp: mountTimeRef.current,
        idempotencyKey: idempotencyKeyRef.current,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        setGeneralError(data.message || "Failed to submit. Please check your inputs.");
        setIsSubmitting(false);
        return;
      }

      // Success: redirect to thank you page
      router.push(data.redirectUrl || "/contact/thank-you");
    } catch {
      setGeneralError("A network error occurred. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-card border border-line bg-card p-8 md:p-10 shadow-sm">
      {generalError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-acc-ink"
        >
          {generalError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-bot honeypot */}
        <div aria-hidden="true" className="hidden">
          <label htmlFor="website_url_hp">Website</label>
          <input
            id="website_url_hp"
            name="website_url_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_url_hp || ""}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="cfName" className="block text-sm font-semibold text-txt mb-2">
              Name{" "}
              <span className="text-acc" aria-hidden="true">
                *
              </span>
            </label>
            <input
              ref={nameRef}
              id="cfName"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "cfName-error" : undefined}
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-body text-txt transition-colors outline-none focus:border-acc focus:ring-1 focus:ring-acc ${
                errors.name ? "border-red-500 bg-red-50/20" : "border-line bg-paper"
              }`}
            />
            {errors.name && (
              <p id="cfName-error" className="mt-1.5 text-xs font-medium text-acc-ink">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="cfEmail" className="block text-sm font-semibold text-txt mb-2">
              Work email{" "}
              <span className="text-acc" aria-hidden="true">
                *
              </span>
            </label>
            <input
              ref={emailRef}
              id="cfEmail"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "cfEmail-error" : undefined}
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-body text-txt transition-colors outline-none focus:border-acc focus:ring-1 focus:ring-acc ${
                errors.email ? "border-red-500 bg-red-50/20" : "border-line bg-paper"
              }`}
            />
            {errors.email && (
              <p id="cfEmail-error" className="mt-1.5 text-xs font-medium text-acc-ink">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <label htmlFor="cfCompany" className="block text-sm font-semibold text-txt mb-2">
              Company{" "}
              <span className="text-acc" aria-hidden="true">
                *
              </span>
            </label>
            <input
              ref={companyRef}
              id="cfCompany"
              name="company"
              type="text"
              autoComplete="organization"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "cfCompany-error" : undefined}
              value={formData.company}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-body text-txt transition-colors outline-none focus:border-acc focus:ring-1 focus:ring-acc ${
                errors.company ? "border-red-500 bg-red-50/20" : "border-line bg-paper"
              }`}
            />
            {errors.company && (
              <p id="cfCompany-error" className="mt-1.5 text-xs font-medium text-acc-ink">
                {errors.company}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="cfPhone" className="block text-sm font-semibold text-txt mb-2">
              Phone <span className="text-gray text-xs font-normal">(optional)</span>
            </label>
            <input
              ref={phoneRef}
              id="cfPhone"
              name="phone"
              type="tel"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "cfPhone-error" : undefined}
              value={formData.phone || ""}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-3 text-body text-txt transition-colors outline-none focus:border-acc focus:ring-1 focus:ring-acc ${
                errors.phone ? "border-red-500 bg-red-50/20" : "border-line bg-paper"
              }`}
            />
            {errors.phone && (
              <p id="cfPhone-error" className="mt-1.5 text-xs font-medium text-acc-ink">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Reason */}
        <div>
          <label htmlFor="cfReason" className="block text-sm font-semibold text-txt mb-2">
            Reason for contacting{" "}
            <span className="text-acc" aria-hidden="true">
              *
            </span>
          </label>
          <select
            ref={reasonRef}
            id="cfReason"
            name="reason"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.reason)}
            aria-describedby={errors.reason ? "cfReason-error" : undefined}
            value={formData.reason}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-body text-txt transition-colors outline-none focus:border-acc focus:ring-1 focus:ring-acc ${
              errors.reason ? "border-red-500 bg-red-50/20" : "border-line bg-paper"
            }`}
          >
            <option value="">Select a reason</option>
            {CONTACT_REASONS.map((r, i) => (
              <option key={i} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.reason && (
            <p id="cfReason-error" className="mt-1.5 text-xs font-medium text-acc-ink">
              {errors.reason}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="cfMsg" className="block text-sm font-semibold text-txt mb-2">
            Message{" "}
            <span className="text-acc" aria-hidden="true">
              *
            </span>
          </label>
          <textarea
            ref={messageRef}
            id="cfMsg"
            name="message"
            rows={5}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "cfMsg-error" : undefined}
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded-lg border px-4 py-3 text-body text-txt transition-colors outline-none focus:border-acc focus:ring-1 focus:ring-acc ${
              errors.message ? "border-red-500 bg-red-50/20" : "border-line bg-paper"
            }`}
          />
          {errors.message && (
            <p id="cfMsg-error" className="mt-1.5 text-xs font-medium text-acc-ink">
              {errors.message}
            </p>
          )}
        </div>

        {/* T-059: TCPA-Compliant SMS Consent Checkbox */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              id="cfSms"
              name="sms"
              type="checkbox"
              checked={formData.sms || false}
              onChange={handleChange}
              className="mt-1 h-4 w-4 rounded border-line text-acc focus:ring-acc"
            />
            <span className="text-xs text-gray leading-relaxed">{TCPA_CONSENT_TEXT}</span>
          </label>
        </div>

        {/* Submit button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="inline-flex min-h-12 w-full md:w-auto items-center justify-center gap-2 rounded-full bg-txt px-8 py-3 text-button font-semibold text-white shadow-md transition-[background-color,transform] duration-200 hover:bg-black active:scale-[.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending message..." : "Send message"}
          </button>
        </div>
      </form>
    </div>
  );
}
