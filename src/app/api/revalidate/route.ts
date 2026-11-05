import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { isDraftId, tagsForDocument, type ChangedDocument } from "@/sanity/lib/revalidation";
import { isValidWebhookSignature, MAX_BODY_BYTES } from "@/lib/webhook-signature";

// S-16: Sanity calls this when content is published, changed or deleted.
// Order matters: size check, then signature on the raw text, and only then JSON parsing. An anonymous
// caller can never reach the parser, so garbage input returns 401 instead of an error that spams Sentry.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    // Fail closed: with no secret configured, nobody can refresh the site.
    return NextResponse.json({ message: "Webhook is not configured." }, { status: 500 });
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Too large." }, { status: 413 });
  }
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Too large." }, { status: 413 });
  }

  if (!isValidWebhookSignature(raw, request.headers.get("sanity-webhook-signature"), secret)) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
  }

  let body: ChangedDocument;
  try {
    body = JSON.parse(raw) as ChangedDocument;
  } catch {
    return NextResponse.json({ message: "Invalid body." }, { status: 400 });
  }
  if (!body?._type) {
    return NextResponse.json({ message: "Missing document type." }, { status: 400 });
  }
  if (isDraftId(body._id)) {
    return NextResponse.json({ message: "Draft ignored.", tags: [] });
  }

  // Sanity's own advice: wait for the content lake to settle so the next read is not stale.
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const tags = tagsForDocument(body);
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ message: "Revalidated.", tags });
}
