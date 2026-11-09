// T-075: Webhook handler for transactional email bounces and complaints.
// CRITICAL INVARIANT: A bounced verification NEVER creates an active subscription.
import { NextRequest, NextResponse } from "next/server";
import { markVerificationBounced } from "@/lib/verification/store";
import { addSuppression } from "@/lib/newsletter/provider";

export async function POST(request: NextRequest) {
  try {
    const authHeader =
      request.headers.get("x-webhook-secret") ||
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    const expectedSecret = process.env.WEBHOOK_SIGNING_SECRET;

    // Validate webhook secret if configured in environment
    if (expectedSecret && authHeader !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized webhook caller" }, { status: 401 });
    }

    const payload = await request.json().catch(() => null);

    if (!payload) {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    // Support standard webhook formats (Postmark, SendGrid, SES, Mailgun)
    const eventType = (
      payload.event ||
      payload.RecordType ||
      payload.type ||
      payload.eventType ||
      ""
    ).toLowerCase();

    const targetEmail = (
      payload.email ||
      payload.recipient ||
      payload.Email ||
      payload.data?.email ||
      payload.data?.recipient ||
      ""
    )
      .toLowerCase()
      .trim();

    if (!targetEmail) {
      return NextResponse.json(
        { error: "Target email address missing in webhook payload" },
        { status: 400 },
      );
    }

    const isBounce =
      eventType.includes("bounce") ||
      eventType.includes("failed") ||
      eventType.includes("undelivered") ||
      eventType.includes("permanent");

    const isComplaint = eventType.includes("complaint") || eventType.includes("spam");

    if (isBounce || isComplaint) {
      // 1. Mark pending verifications as bounced
      const marked = await markVerificationBounced(targetEmail);

      // 2. Add to permanent suppression ledger
      await addSuppression(
        targetEmail,
        isComplaint
          ? "Spam complaint received via webhook"
          : "Hard bounce recorded via email webhook",
      );

      return NextResponse.json({
        success: true,
        action: "suppressed_and_bounced",
        email: targetEmail,
        bouncedVerificationsCount: marked,
      });
    }

    // Other non-destructive events (e.g. delivered, opened, clicked)
    return NextResponse.json({
      success: true,
      action: "ignored_event",
      event: eventType,
    });
  } catch (error) {
    console.error("[Email Webhook Error]:", error);
    return NextResponse.json({ error: "Internal webhook processing error" }, { status: 500 });
  }
}
