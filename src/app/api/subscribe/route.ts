import * as Sentry from "@sentry/nextjs";
import { after, connection, type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, readJson } from "@/lib/api-guard";
import { CONSENT_VERSION } from "@/lib/consent/wording";
import { emailLimitKey, limitKey, senderGroup } from "@/lib/contact/keys";
import { getDb } from "@/lib/db";
import { getMailConfig } from "@/lib/mail/config";
import { MailError } from "@/lib/mail/types";
import { overLimit, type Limit } from "@/lib/rate-limit-db";
import { requestVerification } from "@/lib/subscriptions/core";
import { composeVerification } from "@/lib/subscriptions/mail";
import { randomUUID } from "node:crypto";

// T-067 to T-070: a visitor asks to subscribe, or to unlock a white paper. We send a confirmation email
// (double opt-in) and record nothing as consent until the link is used.

// The same answer for every outcome that is not an error, so the reply never reveals whether an
// address is already subscribed, blocked, or new.
const UNIFORM_SUCCESS_RESPONSE = {
  success: true,
  message: "If this is a valid email, you will receive a verification link shortly.",
};

const LIMITS = {
  ip: { max: 10, windowMs: 60 * 60 * 1000 },
  email: { max: 3, windowMs: 60 * 60 * 1000 },
  global: { max: 300, windowMs: 60 * 60 * 1000 },
} satisfies Record<string, Limit>;

const MIN_FILL_MS = 600;
const NO_STORE = { "Cache-Control": "no-store" };

const bodySchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254)
    .pipe(z.email())
    .refine(
      (v) =>
        ![...v].some(
          (c) => c.charCodeAt(0) < 32 || (c.charCodeAt(0) >= 127 && c.charCodeAt(0) <= 159),
        ),
    ),
  // The visitor must tick the box. Checked here, not only in the browser.
  consent: z.literal(true),
  purpose: z.enum(["newsletter", "whitepaper_download"]).default("newsletter"),
  targetSlug: z
    .string()
    .max(100)
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  sourcePage: z.string().max(200).optional(),
  hp_company: z.string().optional(),
  timestamp: z.number().finite().optional(),
});

function reply(status: number, body: object, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { ...NO_STORE, ...headers } });
}

export async function POST(request: NextRequest) {
  await connection();

  const read = await readJson(request, 4 * 1024);
  if (!read.ok) return reply(read.status, { success: false, message: "Request not accepted." });

  const parsed = bodySchema.safeParse(read.body);
  if (!parsed.success) {
    const consentMissing = parsed.error.issues.some((i) => i.path[0] === "consent");
    return reply(400, {
      success: false,
      message: consentMissing
        ? "Please tick the box to agree before subscribing."
        : "Please provide a valid work email address.",
    });
  }
  const body = parsed.data;

  // Bots get the normal answer and nothing happens.
  if (body.hp_company) return reply(200, UNIFORM_SUCCESS_RESPONSE);
  if (body.timestamp && Date.now() - body.timestamp < MIN_FILL_MS) {
    return reply(200, UNIFORM_SUCCESS_RESPONSE);
  }
  if (body.purpose === "whitepaper_download" && !body.targetSlug) {
    return reply(400, { success: false, message: "Please choose a white paper." });
  }

  const db = getDb();
  const hashSecret = process.env.ENQUIRY_HASH_SECRET;
  if (!db || !hashSecret || hashSecret.length < 32) {
    console.error("Sign-up is not configured (DATABASE_URL, ENQUIRY_HASH_SECRET).");
    return reply(503, {
      success: false,
      message: "This is unavailable right now. Please try later.",
    });
  }

  try {
    const now = Date.now();
    const checks: [string, Limit][] = [
      [limitKey(hashSecret, "sub-ip", senderGroup(clientIp(request))), LIMITS.ip],
      [limitKey(hashSecret, "sub-email", emailLimitKey(body.email)), LIMITS.email],
      ["sub-global", LIMITS.global],
    ];
    const limited = await db.transaction(async (tx) => {
      for (const [key, limit] of checks) {
        if (await overLimit(tx, key, limit, now)) return true;
      }
      return false;
    });
    if (limited) {
      return reply(
        429,
        { success: false, message: "Too many requests. Please try again later." },
        { "Retry-After": "3600" },
      );
    }

    const rawToken = await requestVerification(db, {
      email: body.email,
      purpose: body.purpose,
      targetSlug: body.targetSlug,
      sourcePage: body.sourcePage,
      wordingVersion: CONSENT_VERSION,
    });

    const config = getMailConfig();
    if (rawToken && config) {
      const { email, purpose } = body;
      after(async () => {
        try {
          await config.mailer.send(
            composeVerification(email, rawToken, purpose, config, randomUUID()),
          );
        } catch (error) {
          // The visitor can ask again. Only a short code is reported, never the address.
          Sentry.captureMessage("A confirmation email could not be sent", {
            level: "error",
            extra: { code: error instanceof MailError ? error.code : "unknown" },
          });
        }
      });
    } else if (rawToken) {
      console.error("Email is not configured (RESEND_API_KEY, EMAIL_FROM, ENQUIRY_INBOX).");
    }
  } catch {
    Sentry.captureMessage("Sign-up could not be saved", { level: "error" });
    return reply(503, {
      success: false,
      message: "This is unavailable right now. Please try later.",
    });
  }

  return reply(200, UNIFORM_SUCCESS_RESPONSE);
}
