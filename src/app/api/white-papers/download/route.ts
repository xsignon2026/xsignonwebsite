import fs from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { verifySignedDownloadParams } from "@/lib/storage/signed-urls";
import { hasDownloadGrant, recordDownloadAccess } from "@/lib/verification/store";
import { getWhitePaperBySlug } from "@/lib/white-paper";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";
  const email = searchParams.get("email") || "";
  const expires = searchParams.get("expires") || "";
  const sig = searchParams.get("sig") || "";

  // 1. Verify signed HMAC and expiration
  const verification = verifySignedDownloadParams(slug, email, expires, sig);
  if (!verification.valid) {
    const message =
      verification.reason === "expired"
        ? "This download link has expired. Please request a new link."
        : "Invalid or tampered download link.";
    return NextResponse.json({ error: message }, { status: 403 });
  }

  // 2. Verify email grant in the verification data store
  const isGranted = await hasDownloadGrant(email, slug);
  if (!isGranted) {
    return NextResponse.json(
      { error: "Unauthorized. Please verify your email before downloading." },
      { status: 403 }
    );
  }

  // 3. Look up White Paper metadata
  const whitePaper = await getWhitePaperBySlug(slug);
  if (!whitePaper) {
    return NextResponse.json({ error: "White paper not found." }, { status: 404 });
  }

  // 4. Safe file path resolution (anti-path-traversal)
  const safeFilename = path.basename(whitePaper.storageKey);
  const filePath = path.join(process.cwd(), "private", "white-papers", safeFilename);
  const baseDir = path.join(process.cwd(), "private", "white-papers");

  // Security check: ensure resolved path is strictly within the private storage directory
  if (!filePath.startsWith(baseDir)) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  try {
    const fileBuffer = await fs.readFile(/*turbopackIgnore: true*/ filePath);
    await recordDownloadAccess(email, slug);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${slug}.pdf"`,
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Requested white paper asset is currently unavailable." },
      { status: 404 }
    );
  }
}
