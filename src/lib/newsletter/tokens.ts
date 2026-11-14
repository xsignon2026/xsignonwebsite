// T-076: unsubscribe links. The token proves the link came from us for this address, so nobody can
// remove someone else's address by guessing. It only allows unsubscribing, nothing else.
import { createHmac } from "node:crypto";
import { requireSecret } from "@/lib/require-secret";
import { safeEqual } from "@/lib/safe-equal";

export function generateUnsubscribeToken(email: string): string {
  const normalized = email.toLowerCase().trim();
  return createHmac("sha256", requireSecret("UNSUBSCRIBE_SECRET"))
    .update(`${normalized}:unsubscribe`)
    .digest("hex");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  if (!email || !token || typeof token !== "string") return false;
  return safeEqual(token, generateUnsubscribeToken(email));
}
