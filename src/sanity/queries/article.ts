import { groq } from "next-sanity";

// One article by its address. Field names match the Article type the pages use.
export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    excerpt,
    author,
    date,
    topic,
    readingTime,
    featured,
    crumb,
    pullQuote,
    sections[] { heading, paragraphs, pullQuote },
    relatedLinks[] { title, type, href },
    ctaHeadline
  }
`;
