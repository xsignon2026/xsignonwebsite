import * as Sentry from "@sentry/nextjs";
import { after, connection, type NextRequest, NextResponse } from "next/server";
import { processDeliveries } from "@/lib/contact/deliver";
import { handleContact } from "@/lib/contact/handler";
import { getDb } from "@/lib/db";
import { getMailConfig } from "@/lib/mail/config";
import { readCapped } from "@/lib/read-capped";

// T-055: POST /api/contact. The steps and their order are in src/lib/contact/handler.ts.
// This file only checks the request itself: where it came from, its type, its size, and that the
// server is configured, then hands the body over.
const MAX_BODY_BYTES = 16 * 1024;
const NO_STORE = { "Cache-Control": "no-store" };

function reply(status: number, body: object, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

// An Origin header that is missing is fine (not a browser cross-site request). One that is present
// must name this site. Anything that is not a valid address ("null", "x") counts as another site.
function isSameSite(origin: string | null, host: string | null): boolean {
  if (!origin) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  await connection(); // read the environment at request time, not at build time

  if (!isSameSite(request.headers.get("origin"), request.headers.get("host"))) {
    return reply(403, { ok: false, error: "forbidden" });
  }
  // A cross-site HTML form cannot send JSON, so requiring it closes simple form-post forgery.
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply(415, { ok: false, error: "unsupported" });
  }

  const raw = await readCapped(request, MAX_BODY_BYTES);
  if (raw === null) return reply(413, { ok: false, error: "too_large" });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, { ok: false, errors: {} });
  }

  const db = getDb();
  const hashSecret = process.env.ENQUIRY_HASH_SECRET;
  if (!db || !hashSecret || hashSecret.length < 32) {
    console.error("The contact form is not configured (DATABASE_URL, ENQUIRY_HASH_SECRET).");
    return reply(503, { ok: false, error: "unavailable" });
  }

  // shortcut: the sender address is trusted from the platform's headers, which is only safe behind
  // Vercel (it sets x-real-ip and overwrites x-forwarded-for). Behind any other proxy a visitor could
  // choose their own. Revisit if hosting changes (docs/runbook.md). If neither header is present,
  // senders share one "unknown" group, which the other limits still cap.
  const clientIp =
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";

  const result = await handleContact(body, {
    db,
    now: Date.now,
    hashSecret,
    clientIp,
    onSaveError: (code) =>
      Sentry.captureMessage("Contact enquiry could not be saved", {
        level: "error",
        extra: { code },
      }),
  });

  const headers: Record<string, string> =
    result.status === 429 ? { "Retry-After": String(result.retryAfterSeconds) } : {};
  const response = reply(result.status, result.body, headers);

  if (result.status === 200) {
    // T-058: lets the thank-you page know this visitor just sent a message. Short-lived, same-site,
    // not readable by scripts, and it holds nothing about the enquiry.
    response.cookies.set("contact_sent", "1", {
      path: "/contact",
      maxAge: 600,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // T-056: a first attempt to send the emails right away, after the visitor has their answer.
    // If it fails or never runs, the scheduled retry (and the stale-delivery alarm) cover it.
    const config = getMailConfig();
    if (config) {
      after(async () => {
        try {
          await processDeliveries({
            db,
            config,
            now: Date.now,
            onPermanentFailure: (code) =>
              Sentry.captureMessage("An enquiry email failed permanently", {
                level: "error",
                extra: { code },
              }),
          });
        } catch {
          // The deliveries stay pending; the retry picks them up.
          Sentry.captureMessage("Enquiry delivery run failed", { level: "error" });
        }
      });
    }
  }
  return response;
}
