import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// T-063: White paper schema in private storage.
// The PDF is referenced by storageKey in private storage, NEVER by a public CDN asset URL.
export const whitePaper = defineType({
  name: "whitePaper",
  title: "White Paper",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "storage", title: "Private Storage & Access" },
    { name: "related", title: "Related" },
    { name: "seo", title: "Search & Social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Title is required.")),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "Brief abstract (up to 300 characters) displayed on cards and verification gates.",
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val || val.trim().length === 0) return "Summary is required.";
          if (val.length > 300) return "Summary must not exceed 300 characters.";
          return true;
        }),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "imageWithAlt",
      group: "content",
      validation: (Rule) => Rule.required().error("Cover image is required."),
    }),
    defineField({
      name: "storageKey",
      title: "Private Storage Asset Key",
      type: "string",
      group: "storage",
      description:
        "Unique key or path in private PDF storage (e.g. 'zero-trust-posture-guide-v1.pdf'). Never publicly served.",
      validation: (Rule) =>
        Rule.custom((val) => isNotBlank(val, "Private storage asset key is required.")),
    }),
    defineField({
      name: "gated",
      title: "Gated download",
      type: "boolean",
      group: "storage",
      initialValue: true,
      description: "When true, requires double opt-in email verification to generate a signed download link.",
    }),
    defineField({
      name: "version",
      title: "Document Version",
      type: "string",
      group: "storage",
      initialValue: "1.0",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Version is required.")),
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required().error("Published date is required."),
    }),
    defineField({
      name: "relatedArticles",
      title: "Related Articles",
      type: "array",
      group: "related",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Search & Social (SEO)",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "version",
      media: "coverImage.asset",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Untitled White Paper",
      subtitle: subtitle ? `v${subtitle}` : undefined,
      media,
    }),
  },
});
