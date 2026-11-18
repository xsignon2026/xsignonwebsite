import { groq } from "next-sanity";

// One case study page by its address. Field names match the CaseStudyPage type the page uses.
export const CASE_STUDY_PAGE_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    title,
    crumb,
    tags,
    sections[] {
      heading,
      paragraphs,
      features[] { lead, joiner, body },
      steps[] { number, title, text },
      notes[] { label, text }
    },
    related[] { title, type, href },
    ctaHeadline,
    approvalStatus
  }
`;
