import { groq } from "next-sanity";

// The Products listing page document (id "productsPage").
export const PRODUCTS_PAGE_QUERY = groq`
  *[_type == "productsPage" && _id == "productsPage"][0] {
    hero,
    newLaunches,
    cards,
    thinking,
    cta
  }
`;
