import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { readCapped } from "@/lib/read-capped";
import { isValidWebhookSignature, MAX_BODY_BYTES } from "@/lib/webhook-signature";
import {
  isUnpublishedId,
  SETTLE_MS,
  tagsForDocument,
  type ChangedDocument,
} from "@/sanity/lib/revalidation";

// S-16: Sanity calls this when content is published, changed or deleted.
// Order matters: size limit, then signature on the raw text, and only then JSON parsing. An anonymous
// caller can never reach the parser, so garbage input returns 401 instead of an error that spams Sentry.
// The order is pinned by src/tests/revalidate-route.test.ts.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    // Fail closed: with no secret configured, nobody can refresh the site.
    return NextResponse.json({ message: "Webhook is not configured." }, { status: 500 });
  }

  const raw = await readCapped(request, MAX_BODY_BYTES);
  if (raw === null) {
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
  if (isUnpublishedId(body._id)) {
    return NextResponse.json({ message: "Not published, ignored.", tags: [] });
  }

  await new Promise((resolve) => setTimeout(resolve, SETTLE_MS));
  const tags = tagsForDocument(body);
  // expire: 0 means the next visitor gets fresh content, not the old page while it refreshes.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ message: "Revalidated.", tags });
}
