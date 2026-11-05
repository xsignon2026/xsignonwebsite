import { connection, NextResponse } from "next/server";
import { safeEqual } from "@/lib/safe-equal";

// S-18: lets the owner prove that an error reaches Sentry and the alert reaches them.
// Needs the secret header, so the public cannot trigger errors. Does nothing if no secret is set.
export async function GET(request: Request) {
  await connection(); // read the secret at request time, not at build time
  const secret = process.env.MONITORING_TEST_SECRET;
  const given = request.headers.get("x-monitoring-secret") ?? "";
  if (!secret || !safeEqual(given, secret)) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }
  throw new Error("S-18 forced test error. Safe to ignore.");
}
