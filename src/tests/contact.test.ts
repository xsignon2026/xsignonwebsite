import { describe, expect, it } from "vitest";
import { validateContactForm, type ContactFormData } from "../lib/contact/validation";
import { checkRateLimit, checkIdempotency, saveIdempotency } from "../lib/contact/rate-limit";
import {
  saveEnquiry,
  updateEnquiryStatus,
  getEnquiryById,
  type EnquiryRecord,
} from "../lib/enquiry/store";
import { sendEnquiryEmails } from "../lib/mailer";

describe("T-054 / T-055 / T-059: Contact Form Validation & Bot Protection", () => {
  const validData: ContactFormData = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    company: "Acme Corp",
    phone: "+1 469-897-9399",
    reason: "Book a strategy call",
    message: "We would like to evaluate PostureOne for our cloud estate.",
    sms: true,
    website_url_hp: "",
  };

  it("accepts valid contact form data", () => {
    const result = validateContactForm(validData, Date.now() + 3000);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it("catches automated bots filling the honeypot", () => {
    const botData = { ...validData, website_url_hp: "https://spam.example.com" };
    const result = validateContactForm(botData);
    expect(result.valid).toBe(false);
    expect(result.errors.bot).toBeTruthy();
  });

  it("catches instant form submissions (fast bot submit)", () => {
    const fastData = { ...validData, timestamp: Date.now() };
    const result = validateContactForm(fastData, Date.now() + 500); // Only 500ms elapsed
    expect(result.valid).toBe(false);
    expect(result.errors.bot).toContain("too quickly");
  });

  it("validates required fields: name, email, company, reason, message", () => {
    const invalidData: Partial<ContactFormData> = {
      name: "",
      email: "invalid-email",
      company: "",
      reason: "Not a valid reason",
      message: "hi", // too short
    };
    const result = validateContactForm(invalidData);
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeTruthy();
    expect(result.errors.email).toBeTruthy();
    expect(result.errors.company).toBeTruthy();
    expect(result.errors.reason).toBeTruthy();
    expect(result.errors.message).toBeTruthy();
  });
});

describe("T-055: Rate Limiting & Idempotency", () => {
  it("enforces rate limits per IP", () => {
    const testIp = `192.168.1.${Math.floor(Math.random() * 1000)}`;
    const now = Date.now();

    // 5 allowed requests
    for (let i = 0; i < 5; i++) {
      const res = checkRateLimit(testIp, now);
      expect(res.allowed).toBe(true);
    }

    // 6th request blocked
    const blocked = checkRateLimit(testIp, now);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("preserves idempotency responses on duplicate submit", () => {
    const testKey = `idem-test-${Date.now()}`;
    expect(checkIdempotency(testKey)).toBeNull();

    saveIdempotency(testKey, { success: true, cached: true });
    const cached = checkIdempotency(testKey) as { success: boolean; cached: boolean };
    expect(cached).not.toBeNull();
    expect(cached.success).toBe(true);
    expect(cached.cached).toBe(true);
  });
});

describe("T-056 / T-057 / T-060: Durable Store & Email Delivery Strategy", () => {
  it("records enquiries in durable store and handles status updates", async () => {
    const record: EnquiryRecord = {
      id: "enq_test_123",
      createdAt: new Date().toISOString(),
      data: {
        name: "Test User",
        email: "test@example.com",
        company: "Test Co",
        reason: "Support",
        message: "Need assistance with passwordless setup.",
        smsConsent: false,
        smsConsentText: "",
        ipAddress: "127.0.0.1",
      },
      status: "pending",
      retries: 0,
      environment: "staging",
    };

    await saveEnquiry(record);
    const fetched = await getEnquiryById("enq_test_123");
    expect(fetched).not.toBeNull();
    expect(fetched?.status).toBe("pending");

    // Update on delivery failure
    await updateEnquiryStatus("enq_test_123", "failed_pending_retry", "Connection timeout");
    const updated = await getEnquiryById("enq_test_123");
    expect(updated?.status).toBe("failed_pending_retry");
    expect(updated?.retries).toBe(1);
    expect(updated?.lastError).toBe("Connection timeout");
  });

  it("safely dispatches emails in staging environment", async () => {
    const record: EnquiryRecord = {
      id: "enq_test_staging",
      createdAt: new Date().toISOString(),
      data: {
        name: "Staging Tester",
        email: "staging@example.com",
        company: "Staging Labs",
        reason: "Partnership",
        message: "Testing staging delivery workflow.",
        smsConsent: true,
        smsConsentText: "TCPA consent",
        ipAddress: "10.0.0.1",
      },
      status: "pending",
      retries: 0,
      environment: "staging",
    };

    const res = await sendEnquiryEmails(record);
    expect(res.notification.success).toBe(true);
    expect(res.confirmation.success).toBe(true);
  });
});
