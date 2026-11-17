import * as Sentry from "@sentry/nextjs";
import { after, connection, NextResponse } from "next/server";
import { processDeliveries, replayDelivery } from "@/lib/contact/deliver";
import { getMailConfig } from "@/lib/mail/config";
import { ADMIN_HEADERS, authorizeAdmin, isSameSiteRequest } from "@/lib/admin-request";

// T-056: "Send again" on the owner's page. Signed-in owner only, from this site only. It puts a
// failed delivery back in the queue and tries to send it straight away.
export async function POST(request: Request) {
  await connection();
  const auth = await authorizeAdmin(request);
  if ("response" in auth) return auth.response;
  if (!isSameSiteRequest(request)) {
    return new NextResponse("Forbidden.", { status: 403, headers: ADMIN_HEADERS });
  }

  const id = String((await request.formData()).get("id") ?? "");
  if (!/^\d{1,18}$/.test(id)) {
    return new NextResponse("Bad request.", { status: 400, headers: ADMIN_HEADERS });
  }
  await replayDelivery(auth.db, id);

  const config = getMailConfig();
  if (config) {
    after(async () => {
      try {
        await processDeliveries({ db: auth.db, config, now: Date.now });
      } catch {
        Sentry.captureMessage("Replay delivery run failed", { level: "error" });
      }
    });
  }
  return NextResponse.redirect(new URL("/admin/enquiries?done=1", request.url), {
    status: 303,
    headers: ADMIN_HEADERS,
  });
}
