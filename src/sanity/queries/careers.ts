import { groq } from "next-sanity";

// The Careers page document (id "careersPage").
export const CAREERS_PAGE_QUERY = groq`
  *[_type == "careersPage" && _id == "careersPage"][0] {
    hero,
    working,
    roles,
    cta
  }
`;

// Every job the editors have saved, newest first. Closed roles come back too (active == false) so that a list
// with every role closed shows the "no open roles" note instead of the built-in roles.
export const JOBS_QUERY = groq`
  *[_type == "job" && defined(slug.current)] | order(postedAt desc) {
    "slug": slug.current,
    title,
    department,
    location,
    locationType,
    employmentType,
    description,
    active,
    postedAt
  }
`;
