import { NextRequest, NextResponse } from "next/server";
import { unsubscribeEmail } from "@/lib/newsletter/provider";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => ({}))) as { email?: string };
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await unsubscribeEmail(email, "Visitor requested unsubscribe via /unsubscribe");

    return NextResponse.json({
      success: true,
      message: "The address you entered has been recorded for removal from XSignOn marketing emails.",
    });
  } catch (err) {
    console.error("[Unsubscribe API] Error:", err);
    return NextResponse.json(
      { success: false, message: "Unable to process unsubscribe request at this time." },
      { status: 500 }
    );
  }
}
