// T-076: RFC 8058 one-click unsubscribe. A mail app sends a POST to the address in our
// List-Unsubscribe header, and the address is removed. A visitor who opens the same link in a browser
// (GET) is sent to the unsubscribe page, which asks them to confirm: a GET never changes anything.
import { connection, type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { verifyUnsubscribeToken } from "@/lib/newsletter/tokens";
import { unsubscribe } from "@/lib/subscriptions/core";
import { siteUrl } from "@/lib/site";

const paramsSchema = z.object({
  email: z.string().trim().toLowerCase().max(254).pipe(z.email()),
  token: z.string().min(1).max(200),
});

function params(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return paramsSchema.safeParse({
    email: searchParams.get("email") ?? "",
    token: searchParams.get("token") ?? "",
  });
}

export async function POST(request: NextRequest) {
  await connection();
  const parsed = params(request);
  if (!parsed.success || !verifyUnsubscribeToken(parsed.data.email, parsed.data.token)) {
    return NextResponse.json({ success: false, error: "invalid_token" }, { status: 400 });
  }
  const db = getDb();
  if (!db) return NextResponse.json({ success: false, error: "unavailable" }, { status: 503 });
  await unsubscribe(db, parsed.data.email);
  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET(request: NextRequest) {
  const parsed = params(request);
  const base = siteUrl.replace(/\/$/, "");
  if (!parsed.success) return NextResponse.redirect(`${base}/unsubscribe?status=invalid`);
  const query = new URLSearchParams({ email: parsed.data.email, token: parsed.data.token });
  return NextResponse.redirect(`${base}/unsubscribe?${query.toString()}`);
}
