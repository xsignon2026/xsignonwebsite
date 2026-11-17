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
    capabilityCards[] {
      title,
      description
    },
    framework {
      title,
      steps[] {
        stepNumber,
        title,
        description
      }
    },
    mappedFrameworks {
      chips,
      note
    },
    relatedItems[] {
      title,
      typeLabel,
      "href": select(
        link.linkType == "internal" => "/" + coalesce(link.internal->slug.current, ""),
        link.linkType == "external" => coalesce(link.external, "#"),
        "#"
      )
    },
    cta {
      title,
      "buttonText": coalesce(button.label, "Book a strategy call"),
      "buttonHref": select(
        button.link.linkType == "internal" => "/" + coalesce(button.link.internal->slug.current, ""),
        button.link.linkType == "external" => coalesce(button.link.external, "#"),
        "/contact"
      )
    },
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
