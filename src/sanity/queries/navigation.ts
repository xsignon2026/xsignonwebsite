export const NAVIGATION_QUERY = `
  *[_type == "navigation"][0] {
    items[] {
      label,
      link {
        linkType,
        "href": select(
          linkType == "external" => external,
          linkType == "file"     => file.asset->url,
          linkType == "internal" => coalesce(
            internal->slug.current,
            null
          )
        )
      },
      children[] {
        label,
        link {
          linkType,
          "href": select(
            linkType == "external" => external,
            linkType == "file"     => file.asset->url,
            linkType == "internal" => coalesce(
              internal->slug.current,
              null
            )
          )
        }
      }
    }
  }
`;
