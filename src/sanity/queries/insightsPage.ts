import { groq } from "next-sanity";

// The Our thinking hub document (id "insightsPage").
export const INSIGHTS_PAGE_QUERY = groq`
  *[_type == "insightsPage" && _id == "insightsPage"][0] {
    hero,
    featured,
    cards,
    cta
  }
`;
