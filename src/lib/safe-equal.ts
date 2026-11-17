import { timingSafeEqual } from "node:crypto";

// Compares two secrets without leaking, through timing, how many leading characters matched.
export function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
