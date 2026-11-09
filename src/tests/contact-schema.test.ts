import { describe, expect, it } from "vitest";
import { validateContact } from "../lib/contact/schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  phone: "",
  reason: "strategy-call",
  message: "A message that is long enough.",
};

describe("validateContact", () => {
  it("accepts a good submission and cleans it", () => {
    const result = validateContact({ ...valid, name: "  Ada  ", email: " ADA@EXAMPLE.COM " });
    expect(result).toMatchObject({ ok: true, data: { name: "Ada", email: "ada@example.com" } });
    if (result.ok) {
      expect(result.data.company).toBeUndefined();
      expect(result.data.phone).toBeUndefined();
    }
  });

  it("explains each problem in plain words, once per field", () => {
    const result = validateContact({ name: "", email: "x", reason: "", message: "no" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.errors.name).toBe("Enter your name.");
    expect(result.errors.email).toMatch(/valid email/);
    expect(result.errors.reason).toBe("Choose what your message is about.");
    expect(result.errors.message).toMatch(/at least 10/);
  });

  it("checks the phone number only when one is given", () => {
    expect(validateContact({ ...valid, phone: "+44 (0)20 7946 0958" }).ok).toBe(true);
    expect(validateContact({ ...valid, phone: "call me maybe" }).ok).toBe(false);
  });

  it("allows new lines in the message but no other control characters", () => {
    expect(validateContact({ ...valid, message: "Line one\nLine two is here" }).ok).toBe(true);
    expect(validateContact({ ...valid, message: "Hello\u0000 there friend" }).ok).toBe(false);
  });

  it("limits lengths", () => {
    expect(validateContact({ ...valid, name: "x".repeat(101) }).ok).toBe(false);
    expect(validateContact({ ...valid, email: `${"x".repeat(250)}@a.co` }).ok).toBe(false);
    expect(validateContact({ ...valid, company: "x".repeat(121) }).ok).toBe(false);
  });
});
