import { groq } from "next-sanity";

// One solution by its address. Field names match the Solution type the pages use.
export const SOLUTION_BY_SLUG_QUERY = groq`
  *[_type == "solution" && slug.current == $slug][0] {
    title,
    summary,
    ctaHeadline,
    challenge,
    features[] { lead, joiner, body },
    diagramKey,
    deliveredBy,
    products[] { title, type, href },
    proofAndReading[] { title, type, href },
    order
  }
`;
