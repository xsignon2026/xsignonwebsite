// T-075: Resend tells us when an email bounced or was marked as spam. The address is then blocked for
// good: nothing is sent to it again, and a bounced confirmation can never create a subscription.
import { connection, type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { readCapped } from "@/lib/read-capped";
import { suppress } from "@/lib/subscriptions/core";
import { isValidSvixSignature } from "@/lib/svix-signature";

const MAX_BODY_BYTES = 64 * 1024;

const eventSchema = z.object({
  type: z.string(),
  data: z.object({ to: z.array(z.string()).max(50).default([]) }),
});

const REASONS: Record<string, string> = {
  "email.bounced": "bounced",
  "email.complained": "complained",
};

export async function POST(request: NextRequest) {
  await connection();

  // Closed by default: with no secret configured, nobody can call this route.
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const raw = await readCapped(request, MAX_BODY_BYTES);
  if (raw === null) return NextResponse.json({ error: "Too large" }, { status: 413 });

  const valid = isValidSvixSignature(
    raw,
    {
      id: request.headers.get("svix-id"),
      timestamp: request.headers.get("svix-timestamp"),
      signature: request.headers.get("svix-signature"),
    },
    secret,
  );
  if (!valid) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const event = eventSchema.safeParse(payload);
  if (!event.success) return NextResponse.json({ received: true }, { status: 200 });

  const reason = REASONS[event.data.type];
  if (!reason) return NextResponse.json({ received: true }, { status: 200 });

  const db = getDb();
  if (!db) return NextResponse.json({ error: "Unavailable" }, { status: 503 });

  for (const address of event.data.data.to) {
    // Resend may give "Name <a@b.c>"; keep only the address.
    const email = (address.match(/<([^>]+)>/)?.[1] ?? address).trim().toLowerCase();
    if (email.length <= 254) await suppress(db, email, reason);
  }
  return NextResponse.json({ received: true }, { status: 200 });
}
