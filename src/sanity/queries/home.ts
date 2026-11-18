import { groq } from "next-sanity";

// The homepage document (id "home"). Slide ids are slugs in the CMS, so they are flattened to plain strings.
export const HOME_QUERY = groq`
  *[_type == "home" && _id == "home"][0] {
    hero,
    "heroSlides": heroSlides[] {
      "id": id.current,
      variant,
      tag,
      heading,
      sub,
      line,
      action
    },
    standards,
    ecosystem,
    whatWeDo,
    cta,
    seo
  }
`;
