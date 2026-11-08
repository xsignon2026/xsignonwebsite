import { describe, expect, it } from "vitest";
import { calculateRoi } from "../lib/roi";
import { validateContactForm } from "../lib/contact/validation";
import { isDraftId, tagsForDocument } from "../sanity/lib/revalidation";

describe("T-165: End-to-End Business Logic Verification Suite", () => {
  describe("ROI Calculation Engine", () => {
    it("calculates accurate staff and password reset hours and cost savings", () => {
      const result = calculateRoi({
        staff: "2000",
        resetsPerYear: "3.5",
        minutesPerReset: "20",
        hourlyRate: "50",
      });

      // 2000 staff * 3.5 resets = 7000 resets/yr
      expect(result.resetsPerYear).toBe(7000);
      // 7000 * 20 mins / 60 = 2333.33 hours lost
      expect(result.hoursPerYear).toBe(2333);
      // 2333.33 * $50 = $116,667 annual cost
      expect(result.costSaved).toBe(116667);
      expect(result.formattedCost).toBe("$116,667");
    });

    it("handles zero and invalid inputs safely with graceful fallback", () => {
      const result = calculateRoi({
        staff: "-10",
        resetsPerYear: "0",
        minutesPerReset: "0",
        hourlyRate: "0",
      });

      expect(result.resetsPerYear).toBe(0);
      expect(result.costSaved).toBe(0);
      expect(result.formattedCost).toBe("$0");
    });
  });

  describe("Form & Honeypot Validation", () => {
    it("rejects bot submissions when honeypot field is populated", () => {
      const result = validateContactForm({
        name: "Bot User",
        email: "bot@domain.com",
        company: "Spam LLC",
        phone: "+15551234567",
        reason: "Other",
        message: "Hello world spam message",
        website_url_hp: "http://spam-link.com", // honeypot populated
      });

      expect(result.valid).toBe(false);
      expect(result.errors.bot).toBe("Automated submission detected.");
    });

    it("accepts valid human submissions with empty honeypot", () => {
      const result = validateContactForm({
        name: "Security Lead",
        email: "ciso@enterprise.com",
        company: "Global Corp",
        phone: "+15551234567",
        reason: "Product question",
        message: "We need a passwordless evaluation with comprehensive details.",
        website_url_hp: "", // clean honeypot
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });
  });

  describe("CMS Webhook Revalidation Logic", () => {
    it("identifies draft documents and generates correct cache tags for published products", () => {
      expect(isDraftId("drafts.postureone")).toBe(true);
      expect(isDraftId("postureone")).toBe(false);

      const productTags = tagsForDocument({
        _id: "postureone",
        _type: "product",
        slug: "postureone",
      });

      expect(productTags).toContain("type:product");
      expect(productTags).toContain("doc:postureone");
      expect(productTags).toContain("slug:product:postureone");
      expect(productTags).toContain("type:home");
    });
  });
});
