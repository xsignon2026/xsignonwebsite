import { readFile } from "node:fs/promises";
import path from "node:path";
import { connection, type NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { verifySignedDownload } from "@/lib/storage/signed-urls";
import { logDownload, mayDownload } from "@/lib/subscriptions/core";
import { getWhitePaperBySlug } from "@/lib/white-paper";

// T-064, T-065: the private PDF is only served for a link we signed, that has not expired, and whose
// confirmation is still valid (verified, not since blocked). Each download is logged.
const NO_STORE = { "Cache-Control": "private, no-store, max-age=0" };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const fail = (status: number, error: string) =>
  NextResponse.json({ error }, { status, headers: NO_STORE });

export async function GET(request: NextRequest) {
  await connection();
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const verificationId = searchParams.get("v") || "";
  const expires = searchParams.get("expires") || "";
  const sig = searchParams.get("sig") || "";

  if (!UUID.test(verificationId)) return fail(403, "Invalid or tampered download link.");

  const signed = verifySignedDownload(slug, verificationId, expires, sig);
  if (!signed.valid) {
    return fail(
      403,
      signed.reason === "expired"
        ? "This download link has expired. Please request a new link."
        : "Invalid or tampered download link.",
    );
  }

  const db = getDb();
  if (!db) return fail(503, "Unavailable.");
  if (!(await mayDownload(db, verificationId, slug))) {
    return fail(403, "Unauthorized. Please verify your email before downloading.");
  }

  const whitePaper = await getWhitePaperBySlug(slug);
  if (!whitePaper) return fail(404, "White paper not found.");

  // The file name comes from our own data, and only its last part is used, so it cannot leave the folder.
  const baseDir = path.join(process.cwd(), "private", "white-papers");
  const filePath = path.join(baseDir, path.basename(whitePaper.storageKey));
  if (!filePath.startsWith(baseDir + path.sep)) return fail(403, "Access denied.");

  try {
    const file = await readFile(/*turbopackIgnore: true*/ filePath);
    await logDownload(db, verificationId, slug);
    return new NextResponse(file, {
      status: 200,
      headers: {
        ...NO_STORE,
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return fail(404, "Requested white paper asset is currently unavailable.");
  }
}
