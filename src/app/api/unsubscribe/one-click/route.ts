// T-076: RFC 8058 One-Click Unsubscribe Endpoint.
import { NextRequest, NextResponse } from "next/server";
import { verifyUnsubscribeToken } from "@/lib/newsletter/tokens";
import { unsubscribeEmail } from "@/lib/newsletter/provider";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  if (!email || !token) {
    return NextResponse.json(
      { success: false, error: "missing_parameters", message: "Email and token are required." },
      { status: 400 }
    );
  }

  const isValid = verifyUnsubscribeToken(email, token);
  if (!isValid) {
    return NextResponse.json(
      { success: false, error: "invalid_token", message: "Invalid or tampered unsubscribe token." },
      { status: 400 }
    );
  }

  await unsubscribeEmail(email);

  return NextResponse.json(
    {
      success: true,
      email,
      message: "You have been successfully unsubscribed from XSignOn communications.",
    },
    { status: 200 }
  );
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const redirectBase = origin || "https://xsignon.com";

  if (!email || !token) {
    return NextResponse.redirect(`${redirectBase}/unsubscribe?status=error`);
  }

  const isValid = verifyUnsubscribeToken(email, token);
  if (!isValid) {
    return NextResponse.redirect(`${redirectBase}/unsubscribe?status=invalid`);
  }

  await unsubscribeEmail(email);

  return NextResponse.redirect(
    `${redirectBase}/unsubscribe?status=confirmed&email=${encodeURIComponent(email)}`
  );
}
