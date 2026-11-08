import "server-only";
import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { client } from "./client";

// S-15: the one way pages read from Sanity.
// Visitors get published content from the CDN. A signed-in editor with draft mode switched on gets
// drafts, read with a server-only token and never cached, so a draft cannot reach a public cache.
const readToken = process.env.SANITY_API_READ_TOKEN;

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  const isDraft = (await draftMode()).isEnabled;

  if (isDraft) {
    if (!readToken) throw new Error("SANITY_API_READ_TOKEN is not set, so drafts cannot be read.");
    return client
      .withConfig({ token: readToken, useCdn: false, perspective: "drafts" })
      .fetch<T>(query, params, { cache: "no-store" });
  }

  return client.withConfig({ perspective: "published" }).fetch<T>(query, params, {
    next: { tags },
  });
}
