import type { NextRequest } from "next/server";
import { readCapped } from "@/lib/read-capped";

// Checks shared by the public API routes that change something.

// An Origin header that is missing is fine (not a browser cross-site request). One that is present
// must name this site. Anything that is not a valid address ("null", "x") counts as another site.
export function isSameSite(origin: string | null, host: string | null): boolean {
  if (!origin) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

// shortcut: the sender address is trusted from the platform's headers, which is only safe behind
// Vercel (it sets x-real-ip and overwrites x-forwarded-for). Behind any other proxy a visitor could
// choose their own. Revisit if hosting changes (docs/runbook.md).
export function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

export type JsonResult = { ok: true; body: unknown } | { ok: false; status: 400 | 403 | 413 | 415 };

// Same-site, JSON only (a cross-site HTML form cannot send JSON), size-capped, and parsed.
export async function readJson(request: NextRequest, maxBytes: number): Promise<JsonResult> {
  if (!isSameSite(request.headers.get("origin"), request.headers.get("host"))) {
    return { ok: false, status: 403 };
  }
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return { ok: false, status: 415 };
  }
  const raw = await readCapped(request, maxBytes);
  if (raw === null) return { ok: false, status: 413 };
  try {
    return { ok: true, body: JSON.parse(raw) };
  } catch {
    return { ok: false, status: 400 };
  }
}
