export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    headerCta {
      label,
      link {
        linkType,
        "href": select(
          linkType == "external" => external,
          linkType == "file"     => file.asset->url,
          linkType == "internal" => coalesce(internal->slug.current, null)
        )
      }
    },
    footerGroups[] {
      title,
      links[] {
        label,
        link {
          linkType,
          "href": select(
            linkType == "external" => external,
            linkType == "file"     => file.asset->url,
            linkType == "internal" => coalesce(internal->slug.current, null)
          )
        }
      }
    },
    legalLine
  }
`;
