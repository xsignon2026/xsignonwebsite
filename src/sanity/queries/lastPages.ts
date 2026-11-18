import { groq } from "next-sanity";

// The Industry Thinking, Compare and Enterprise pages (one fixed document each).
export const INDUSTRY_PAGE_QUERY = groq`
  *[_type == "industryPage" && _id == "industryPage"][0] { hero, featured, cards, cta }
`;

export const COMPARE_PAGE_QUERY = groq`
  *[_type == "comparePage" && _id == "comparePage"][0] {
    hero, intro, columns, rows[] { capability, values }, lede, related, cta
  }
`;

export const ENTERPRISE_PAGE_QUERY = groq`
  *[_type == "enterprisePage" && _id == "enterprisePage"][0] {
    hero, intro, deployment, standards, related, cta
  }
`;
