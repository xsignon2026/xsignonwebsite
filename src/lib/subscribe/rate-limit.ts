// T-067: Dual rate-limiter for subscribe endpoint (keyed by IP and email address)
type WindowRecord = {
  count: number;
  resetAt: number;
};

const IP_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_PER_IP = 5;

const EMAIL_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_EMAIL = 3;

const ipStore = new Map<string, WindowRecord>();
const emailStore = new Map<string, WindowRecord>();

export function checkSubscribeRateLimit(
  ip: string,
  email: string,
  now: number = Date.now(),
): { allowed: boolean; reason?: "ip_limit" | "email_limit" } {
  const cleanIp = ip || "unknown";
  const cleanEmail = email.toLowerCase().trim() || "unknown";

  // 1. Check IP limit
  const ipRec = ipStore.get(cleanIp);
  if (!ipRec || now > ipRec.resetAt) {
    ipStore.set(cleanIp, { count: 1, resetAt: now + IP_WINDOW_MS });
  } else if (ipRec.count >= MAX_PER_IP) {
    return { allowed: false, reason: "ip_limit" };
  } else {
    ipRec.count += 1;
  }

  // 2. Check Email limit
  const emailRec = emailStore.get(cleanEmail);
  if (!emailRec || now > emailRec.resetAt) {
    emailStore.set(cleanEmail, { count: 1, resetAt: now + EMAIL_WINDOW_MS });
  } else if (emailRec.count >= MAX_PER_EMAIL) {
    return { allowed: false, reason: "email_limit" };
  } else {
    emailRec.count += 1;
  }

  return { allowed: true };
}
