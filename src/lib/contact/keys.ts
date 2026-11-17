import { createHmac } from "node:crypto";
import { isIPv4, isIPv6 } from "node:net";

// T-055: what the rate limits are counted against. Kept separate so the rules can be tested.

// The part of an address that identifies one sender for rate limiting. IPv4 is used as is. An IPv6
// sender usually controls a whole /64 block (a household or a rented server has billions of
// addresses), so counting each address separately would give an attacker a fresh allowance per
// request. IPv6 is therefore counted by its first 64 bits.
export function senderGroup(ip: string): string {
  if (isIPv4(ip)) return ip;
  if (!isIPv6(ip)) return "unknown";
  const mapped = ip.toLowerCase().match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped && isIPv4(mapped[1])) return mapped[1];

  // Expand "::" into zero groups, then keep the first four of the eight groups.
  const [head, tail] = ip.toLowerCase().split("::");
  const first = head ? head.split(":") : [];
  const last = tail === undefined ? [] : tail ? tail.split(":") : [];
  const groups =
    tail === undefined
      ? first
      : [...first, ...Array(8 - first.length - last.length).fill("0"), ...last];
  return (
    groups
      .slice(0, 4)
      .map((g) => g.replace(/^0+(?=.)/, ""))
      .join(":") + "::/64"
  );
}

// One person, one counter: "a+1@gmail.com", "A.B@gmail.com" and "ab@gmail.com" all count together.
// Used for the rate limit only. The address stored with the enquiry is exactly what was typed.
export function emailLimitKey(email: string): string {
  const [local = "", domain = ""] = email.trim().toLowerCase().split("@");
  const withoutTag = local.split("+")[0];
  const gmail = domain === "gmail.com" || domain === "googlemail.com";
  return `${gmail ? withoutTag.replaceAll(".", "") : withoutTag}@${gmail ? "gmail.com" : domain}`;
}

// A keyed hash, so the rate-limit table never holds a raw address.
export function limitKey(secret: string, kind: string, value: string): string {
  return `${kind}:${createHmac("sha256", secret).update(value).digest("hex")}`;
}
