import { groq } from "next-sanity";

// S-13 / T-090: GROQ query to retrieve the homepage singleton data.
export const HOME_QUERY = groq`
  *[_type == "home" && _id == "home"][0] {
    announcement,
    hero,
    "featuredProductSlugs": featuredProducts[]->slug.current,
    featuredProof,
    "selectedInsightSlugs": selectedInsights[]->slug.current,
    cta,
    seo
  }
`;
