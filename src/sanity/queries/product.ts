import { groq } from "next-sanity";

// T-051 / T-052: GROQ queries for Product documents.
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    tagline,
    hero {
      subline,
      tags,
      dashboard {
        score,
        maxScore,
        statusChip,
        firewallCoverage,
        trafficProtection,
        fileIntegrityChecks
      }
    },
    capabilityCards[] { title, description },
    docTabs[] { label, content, title, badge },
    extraNarrative,
    keyViz { badge, description },
    checklist { meta, items[] { label, done } },
    snapshot { meta, rows[] { label, value, percentage, color } },
    caseCards[] { title, tag, description, statusNotice, linkText, linkHref },
    specTable { title, subtitle, columns, rows[] { header, values }, footnote },
    worksWith { title, paragraphs, linkText, linkHref },
    framework { title, steps[] { stepNumber, title, description } },
    mappedFrameworks { chips, note },
    relatedItems[] { title, typeLabel, href },
    cta { title, buttonText, buttonHref },
    seo {
      title,
      description,
      canonical,
      noIndex
    }
  }
`;

export const ALL_PRODUCT_SLUGS_QUERY = groq`
  *[_type == "product" && defined(slug.current)][].slug.current
`;
