import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_READ_TOKEN;
const library = defineEnableDraftMode({ client: client.withConfig({ token }) });

// S-15: only a link signed by the studio can switch draft mode on. Anyone else gets a plain 401.
// The cheap checks run first, so an anonymous caller cannot trigger a Sanity API query or an error report.
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("sanity-preview-secret");
  if (!token || !secret || secret.length > 200) {
    return new Response("Unauthorized", { status: 401 });
  }
  return library.GET(request);
}
