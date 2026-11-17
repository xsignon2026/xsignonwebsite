import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { isDraftId, tagsForDocument, type ChangedDocument } from "@/sanity/lib/revalidation";

// S-16: Sanity calls this when content is published, changed or deleted.
// Calls without a valid signature are rejected before anything is read or refreshed.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    // Fail closed: with no secret configured, nobody can refresh the site.
    return NextResponse.json({ message: "Webhook is not configured." }, { status: 500 });
  }

  const { isValidSignature, body } = await parseBody<ChangedDocument>(request, secret, true);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
  }
  if (!body?._type) {
    return NextResponse.json({ message: "Missing document type." }, { status: 400 });
  }
  if (isDraftId(body._id)) {
    return NextResponse.json({ message: "Draft ignored.", tags: [] });
  }

  const tags = tagsForDocument(body);
  for (const tag of tags) revalidateTag(tag, "max");
  return NextResponse.json({ message: "Revalidated.", tags });
}
