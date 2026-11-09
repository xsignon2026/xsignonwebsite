import { connection, NextResponse } from "next/server";
import { renderAdminPage } from "@/lib/contact/admin-page";
import { listDeliveries } from "@/lib/contact/deliver";
import { ADMIN_HEADERS, authorizeAdmin } from "@/lib/admin-request";

// T-056: the owner's page. Shows which enquiry emails are waiting, failed or sent, with a button to
// send a failed one again. No personal details on the page. See src/lib/admin-auth.ts.
export async function GET(request: Request) {
  await connection();
  const auth = await authorizeAdmin(request);
  if ("response" in auth) return auth.response;

  const note = new URL(request.url).searchParams.get("done")
    ? "That email was put back in the queue. It is sent within a few minutes."
    : "";
  const html = renderAdminPage(await listDeliveries(auth.db), note);
  return new NextResponse(html, {
    headers: { ...ADMIN_HEADERS, "Content-Type": "text/html; charset=utf-8" },
  });
}
