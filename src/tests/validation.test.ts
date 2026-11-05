import { describe, expect, it } from "vitest";
import { isAllowedExternalUrl, isNotBlank, linkIsComplete } from "../sanity/lib/validation";

describe("isAllowedExternalUrl", () => {
  it("accepts https, mailto and tel", () => {
    expect(isAllowedExternalUrl("https://xsignon.com/contact")).toBe(true);
    expect(isAllowedExternalUrl("mailto:hello@xsignon.com")).toBe(true);
    expect(isAllowedExternalUrl("tel:+15555550100")).toBe(true);
  });

  it("allows an empty value, because required-ness is checked elsewhere", () => {
    expect(isAllowedExternalUrl(undefined)).toBe(true);
    expect(isAllowedExternalUrl("")).toBe(true);
  });

  it("rejects dangerous or unwanted schemes", () => {
    expect(isAllowedExternalUrl("javascript:alert(1)")).not.toBe(true);
    expect(isAllowedExternalUrl("data:text/html;base64,AAAA")).not.toBe(true);
    expect(isAllowedExternalUrl("http://example.com")).not.toBe(true);
  });

  it("rejects addresses that are not complete", () => {
    expect(isAllowedExternalUrl("example.com")).not.toBe(true);
    expect(isAllowedExternalUrl("https://localhost")).not.toBe(true);
  });

  it("rejects surrounding spaces", () => {
    expect(isAllowedExternalUrl(" https://xsignon.com")).not.toBe(true);
  });
});

describe("isNotBlank", () => {
  it("rejects empty and whitespace-only text", () => {
    expect(isNotBlank(undefined)).not.toBe(true);
    expect(isNotBlank("")).not.toBe(true);
    expect(isNotBlank("   ")).not.toBe(true);
  });

  it("accepts real text and uses a custom message", () => {
    expect(isNotBlank("Hello")).toBe(true);
    expect(isNotBlank("", "Alt text is required.")).toBe("Alt text is required.");
  });
});

describe("linkIsComplete", () => {
  it("lets a link be absent, but needs a type once it exists", () => {
    expect(linkIsComplete(undefined)).toBe(true);
    expect(linkIsComplete({})).not.toBe(true);
  });

  it("needs the field that matches the type", () => {
    expect(linkIsComplete({ linkType: "internal" })).not.toBe(true);
    expect(linkIsComplete({ linkType: "internal", internal: { _ref: "abc" } })).toBe(true);
    expect(linkIsComplete({ linkType: "external" })).not.toBe(true);
    expect(linkIsComplete({ linkType: "external", external: "https://xsignon.com" })).toBe(true);
    expect(linkIsComplete({ linkType: "file" })).not.toBe(true);
    expect(linkIsComplete({ linkType: "file", file: { asset: { _ref: "file-1" } } })).toBe(true);
  });

  it("ignores a stale value left over from another link type", () => {
    expect(linkIsComplete({ linkType: "internal", external: "https://xsignon.com" })).not.toBe(
      true,
    );
  });
});
