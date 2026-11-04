import { defineField, defineType } from "sanity";
import {
  SEO_DESCRIPTION_MAX,
  SEO_TITLE_MAX,
  isAllowedExternalUrl,
  isNotBlank,
} from "../../lib/validation";

// S-12: search and social fields for every page. Title and description block publishing when empty.
// Length limits only warn, because a slightly long title is still publishable.
export const seo = defineType({
  name: "seo",
  title: "Search and social",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Search title",
      type: "string",
      description: `Shown in search results. Aim for ${SEO_TITLE_MAX} characters or fewer.`,
      validation: (Rule) => [
        Rule.custom((value) => isNotBlank(value, "A search title is required.")),
        Rule.max(SEO_TITLE_MAX).warning(),
      ],
    }),
    defineField({
      name: "description",
      title: "Search description",
      type: "text",
      rows: 3,
      description: `One or two sentences shown under the title. Aim for ${SEO_DESCRIPTION_MAX} characters or fewer.`,
      validation: (Rule) => [
        Rule.custom((value) => isNotBlank(value, "A search description is required.")),
        Rule.max(SEO_DESCRIPTION_MAX).warning(),
      ],
    }),
    defineField({
      name: "socialImage",
      title: "Social image",
      type: "imageWithAlt",
      description: "Shown when the page is shared. Leave empty to use the site default.",
    }),
    defineField({
      name: "canonical",
      title: "Canonical address",
      type: "url",
      description: "Only set this if the page is a copy of another address. Starts with https://",
      validation: (Rule) => Rule.custom((value) => isAllowedExternalUrl(value)),
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
