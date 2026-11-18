import { groq } from "next-sanity";

// Legal pages (Privacy, Terms), the Contact page and the Proof hub.
export const LEGAL_PAGE_QUERY = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    title,
    crumb,
    notice,
    showNotice,
    sections[] { heading, paragraphs },
    ctaHeadline,
    ctaButton
  }
`;

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    hero,
    details[] { label, text, href },
    closing,
    cta
  }
`;

export const PROOF_PAGE_QUERY = groq`
  *[_type == "proofPage" && _id == "proofPage"][0] {
    hero,
    intro,
    cards[] { picture, tags, title, summary, noteLabel, noteText, href },
    roi,
    cta
  }
`;
