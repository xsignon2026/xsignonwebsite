import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

// S-15: lets an editor leave preview. Safe to call by anyone: it only clears their own cookie.
export async function GET(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/", request.url));
}
