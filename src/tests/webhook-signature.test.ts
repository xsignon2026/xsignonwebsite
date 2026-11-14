import { describe, expect, it } from "vitest";
import { safeEqual } from "../lib/safe-equal";
import { isValidWebhookSignature } from "../lib/webhook-signature";

// Vector produced by the official @sanity/webhook library, so our check matches Sanity's signing.
const BODY = '{"_id":"a","_type":"product"}';
const SECRET = "secret-for-test";
const T = 1700000000000;
const HEADER = "t=1700000000000,v1=wvBvn_YbxwYO9-LbIfPmk98_McHX6yaY7QALhsJKsRo";

describe("isValidWebhookSignature", () => {
  it("accepts a genuine, fresh signature", () => {
    expect(isValidWebhookSignature(BODY, HEADER, SECRET, T + 1000)).toBe(true);
  });

  it("rejects a replay of an old delivery", () => {
    expect(isValidWebhookSignature(BODY, HEADER, SECRET, T + 6 * 60 * 1000)).toBe(false);
  });

  it("rejects a changed body, wrong secret, or malformed header", () => {
    expect(isValidWebhookSignature(BODY + " ", HEADER, SECRET, T)).toBe(false);
    expect(isValidWebhookSignature(BODY, HEADER, "other", T)).toBe(false);
    expect(isValidWebhookSignature(BODY, "t=1,v1=x", SECRET, T)).toBe(false);
    expect(isValidWebhookSignature(BODY, null, SECRET, T)).toBe(false);
    expect(isValidWebhookSignature("", HEADER, SECRET, T)).toBe(false);
  });
});

describe("safeEqual", () => {
  it("compares equal and different secrets, including different lengths", () => {
    expect(safeEqual("abc", "abc")).toBe(true);
    expect(safeEqual("abc", "abd")).toBe(false);
    expect(safeEqual("abc", "abcd")).toBe(false);
  });
});
