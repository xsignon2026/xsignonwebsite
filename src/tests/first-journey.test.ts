import { describe, expect, it, afterEach } from "vitest";
import { saveEnquiry, updateEnquiryStatus, getEnquiryById, type EnquiryRecord } from "../lib/enquiry/store";
import { sendEnquiryEmails } from "../lib/mailer";
import { getProductBySlug } from "../lib/product";

describe("T-061: Full First Journey Integration Test", () => {
  const originalEnv = process.env.MOCK_DELIVERY_FAIL;

  afterEach(() => {
    process.env.MOCK_DELIVERY_FAIL = originalEnv;
  });

  it("completes full first journey: product discovery -> inquiry -> delivery with CRM available", async () => {
    // 1. Discovery: Editor published PostureOne product is retrievable
    const product = await getProductBySlug("postureone");
    expect(product).not.toBeNull();
    expect(product?.name).toBe("PostureOne");
    expect(product?.cta?.buttonHref).toBe("/contact");

    // 2. Visitor submits inquiry from product page
    const enquiryId = `enq_first_journey_${Date.now()}`;
    const record: EnquiryRecord = {
      id: enquiryId,
      createdAt: new Date().toISOString(),
      data: {
        name: "Alex Rivera",
        email: "alex.rivera@enterprise.com",
        company: "Enterprise Corp",
        reason: "Book a strategy call",
        message: "We need continuous device health and compliance verification for 5000 Mac endpoints.",
        smsConsent: true,
        smsConsentText: "By checking this box, I agree to receive text messages from XSignOn...",
        ipAddress: "192.168.1.50",
      },
      status: "pending",
      retries: 0,
      environment: "staging",
    };

    // 3. Durably saved to store
    await saveEnquiry(record);
    const saved = await getEnquiryById(enquiryId);
    expect(saved).not.toBeNull();
    expect(saved?.status).toBe("pending");

    // 4. Delivery succeeds
    const emailResult = await sendEnquiryEmails(record);
    expect(emailResult.notification.success).toBe(true);
    await updateEnquiryStatus(enquiryId, "delivered");

    const finalized = await getEnquiryById(enquiryId);
    expect(finalized?.status).toBe("delivered");
  });

  it("handles journey resilience: inquiry is preserved when CRM/mailer is unavailable", async () => {
    process.env.MOCK_DELIVERY_FAIL = "true";

    const enquiryId = `enq_failover_${Date.now()}`;
    const record: EnquiryRecord = {
      id: enquiryId,
      createdAt: new Date().toISOString(),
      data: {
        name: "Morgan Chen",
        email: "morgan@fintech.io",
        company: "Fintech Systems",
        reason: "Product question",
        message: "Urgent evaluation for zero-trust posture verification.",
        smsConsent: false,
        smsConsentText: "",
        ipAddress: "10.0.4.12",
      },
      status: "pending",
      retries: 0,
      environment: "staging",
    };

    // 1. Durably saved locally first
    await saveEnquiry(record);

    // 2. Downstream CRM/mailer fails
    const emailResult = await sendEnquiryEmails(record);
    expect(emailResult.notification.success).toBe(false);
    expect(emailResult.notification.error).toBe("Simulated CRM outage");

    // 3. Status updated to failed_pending_retry for background reconciliation
    await updateEnquiryStatus(enquiryId, "failed_pending_retry", emailResult.notification.error);

    // 4. Invariant: Lead is NOT lost; store retains data and failure reason
    const stored = await getEnquiryById(enquiryId);
    expect(stored).not.toBeNull();
    expect(stored?.status).toBe("failed_pending_retry");
    expect(stored?.lastError).toBe("Simulated CRM outage");
    expect(stored?.data.email).toBe("morgan@fintech.io");
  });
});
