import { groq } from "next-sanity";

// One white paper by its address. Only the words are read: the private file key and the gating stay in the code.
export const WHITE_PAPER_BY_SLUG_QUERY = groq`
  *[_type == "whitePaper" && slug.current == $slug][0] {
    title,
    summary,
    version,
    publishedAt,
    seo { title, description }
  }
`;
