import * as Sentry from "@sentry/nextjs";
import { randomUUID } from "node:crypto";
import { after, connection, type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { clientIp, readJson } from "@/lib/api-guard";
import { emailLimitKey, limitKey, senderGroup } from "@/lib/contact/keys";
import { getDb } from "@/lib/db";
import { getMailConfig } from "@/lib/mail/config";
import { generateUnsubscribeToken, verifyUnsubscribeToken } from "@/lib/newsletter/tokens";
import { overLimit } from "@/lib/rate-limit-db";
import { unsubscribe } from "@/lib/subscriptions/core";
import { composeUnsubscribeLink } from "@/lib/subscriptions/mail";

// T-076: two ways in.
//   With the token from a link in one of our emails: the address is removed right away.
//   With only an address typed into the form: nothing is removed (anyone could type anyone's address).
//   We email that address a link instead, and the owner of the inbox confirms. The reply is the same
//   whether or not the address was ever subscribed.
const NO_STORE = { "Cache-Control": "no-store" };
const bodySchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  token: z.string().max(200).optional(),
});

const reply = (status: number, body: object) =>
  NextResponse.json(body, { status, headers: NO_STORE });

export async function POST(request: NextRequest) {
  await connection();

  const read = await readJson(request, 2 * 1024);
  if (!read.ok) return reply(read.status, { success: false, message: "Request not accepted." });
  const parsed = bodySchema.safeParse(read.body);
  if (!parsed.success) {
    return reply(400, { success: false, message: "Please provide a valid email address." });
  }
  const { email, token } = parsed.data;

  const db = getDb();
  const hashSecret = process.env.ENQUIRY_HASH_SECRET;
  if (!db || !hashSecret || hashSecret.length < 32) {
    return reply(503, {
      success: false,
      message: "This is unavailable right now. Please try later.",
    });
  }

  if (token) {
    if (!verifyUnsubscribeToken(email, token)) {
      return reply(400, { success: false, message: "This unsubscribe link is not valid." });
    }
    await unsubscribe(db, email);
    return reply(200, {
      success: true,
      message: "You have been removed from XSignOn marketing emails.",
    });
  }

  const now = Date.now();
  const limited = await db.transaction(async (tx) => {
    const ip = limitKey(hashSecret, "unsub-ip", senderGroup(clientIp(request)));
    const person = limitKey(hashSecret, "unsub-email", emailLimitKey(email));
    return (
      (await overLimit(tx, ip, { max: 10, windowMs: 60 * 60 * 1000 }, now)) ||
      (await overLimit(tx, person, { max: 2, windowMs: 60 * 60 * 1000 }, now))
    );
  });
  if (limited)
    return reply(429, { success: false, message: "Too many requests. Try again later." });

  const config = getMailConfig();
  if (config) {
    after(async () => {
      try {
        const known = await db.query(
          `select 1 from subscribers where email = $1 and unsubscribed_at is null`,
          [email],
        );
        if (known.rows.length === 0) return;
        await config.mailer.send(
          composeUnsubscribeLink(email, generateUnsubscribeToken(email), config, randomUUID()),
        );
      } catch {
        Sentry.captureMessage("An unsubscribe email could not be sent", { level: "error" });
      }
    });
  }
  return reply(200, {
    success: true,
    message: "If that address is subscribed, we have emailed it a link to confirm removal.",
  });
}
