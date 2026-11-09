import { describe, expect, it } from "vitest";
import { emailLimitKey, limitKey, senderGroup } from "../lib/contact/keys";

describe("senderGroup", () => {
  it("uses an IPv4 address as is", () => {
    expect(senderGroup("203.0.113.9")).toBe("203.0.113.9");
  });

  it("groups IPv6 by its first 64 bits, however it is written", () => {
    const group = senderGroup("2001:db8:1:2:aaaa:bbbb:cccc:dddd");
    expect(group).toBe("2001:db8:1:2::/64");
    expect(senderGroup("2001:0db8:0001:0002::1")).toBe(group);
    expect(senderGroup("2001:DB8:1:2:ffff::")).toBe(group);
    expect(senderGroup("2001:db8:1:3::1")).not.toBe(group);
  });

  it("treats an IPv4-mapped IPv6 address as that IPv4 address", () => {
    expect(senderGroup("::ffff:198.51.100.7")).toBe("198.51.100.7");
  });

  it("puts anything unrecognised in one shared group", () => {
    expect(senderGroup("unknown")).toBe("unknown");
    expect(senderGroup("not an ip")).toBe("unknown");
    expect(senderGroup("")).toBe("unknown");
  });
});

describe("emailLimitKey", () => {
  it("ignores case, plus-tags and (for Gmail) dots", () => {
    expect(emailLimitKey("A.B+x@Gmail.com")).toBe("ab@gmail.com");
    expect(emailLimitKey("ab@googlemail.com")).toBe("ab@gmail.com");
    expect(emailLimitKey("first.last+news@example.com")).toBe("first.last@example.com");
  });
});

describe("limitKey", () => {
  it("is a keyed hash: stable for the same input, different per secret, never the raw value", () => {
    const key = limitKey("secret-one", "ip", "203.0.113.9");
    expect(key).toBe(limitKey("secret-one", "ip", "203.0.113.9"));
    expect(key).not.toBe(limitKey("secret-two", "ip", "203.0.113.9"));
    expect(key).toMatch(/^ip:[0-9a-f]{64}$/);
    expect(key).not.toContain("203.0.113.9");
  });
});
