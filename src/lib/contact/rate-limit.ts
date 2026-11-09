// T-055: In-memory sliding rate limiter and idempotency store.
// Prevents spam floods and duplicate submissions from double clicks.

type RateRecord = {
  count: number;
  resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory cache stores (persist across requests in warm serverless instances / server process)
const ipStore = new Map<string, RateRecord>();
const idempotencyStore = new Map<string, { timestamp: number; response: unknown }>();

export function checkRateLimit(
  ip: string,
  now: number = Date.now(),
): { allowed: boolean; remaining: number } {
  const cleanIp = ip || "unknown";
  const existing = ipStore.get(cleanIp);

  if (!existing || now > existing.resetAt) {
    ipStore.set(cleanIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (existing.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - existing.count };
}

export function checkIdempotency(key?: string): unknown | null {
  if (!key) return null;
  const item = idempotencyStore.get(key);
  if (!item) return null;

  // Expire after 10 minutes
  if (Date.now() - item.timestamp > RATE_LIMIT_WINDOW_MS) {
    idempotencyStore.delete(key);
    return null;
  }

  return item.response;
}

export function saveIdempotency(key: string, response: unknown): void {
  if (!key) return;
  idempotencyStore.set(key, { timestamp: Date.now(), response });
}
