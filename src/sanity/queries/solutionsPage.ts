import { groq } from "next-sanity";

// The Solutions hub document (id "solutionsPage").
export const SOLUTIONS_PAGE_QUERY = groq`
  *[_type == "solutionsPage" && _id == "solutionsPage"][0] {
    hero,
    list,
    enterprise,
    thinking,
    cta
  }
`;
