import { groq } from "next-sanity";

// The About page document (id "about").
export const ABOUT_QUERY = groq`
  *[_type == "about" && _id == "about"][0] {
    hero,
    who,
    whatWeDo,
    how,
    why,
    careers,
    team {
      title,
      emptyNote,
      members[] { name, role, bio, "photo": photo.asset->url }
    }
  }
`;
