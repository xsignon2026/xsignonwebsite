import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

// S-15: only a link signed by the studio can switch draft mode on. Anyone else gets an error.
const enable = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});

// Without the read token this route is switched off, with a clear answer instead of a server error.
export const GET: typeof enable.GET = (request) =>
  process.env.SANITY_API_READ_TOKEN
    ? enable.GET(request)
    : Promise.resolve(new Response("Draft mode is not configured.", { status: 503 }));
