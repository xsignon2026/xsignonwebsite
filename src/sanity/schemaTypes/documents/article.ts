import { defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// T-063 / T-113: Article document schema with optional related white paper link.
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "related", title: "Related & Downloads" },
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
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
      group: "content",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      group: "content",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "relatedWhitePaper",
      title: "Related White Paper",
      type: "reference",
      group: "related",
      description: "Optional white paper download card displayed within this article.",
      to: [{ type: "whitePaper" }],
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
      subtitle: "author",
      media: "coverImage.asset",
    },
    prepare: ({ title, subtitle, media }) => ({
      title: title || "Untitled Article",
      subtitle: subtitle || "Editorial",
      media,
    }),
  },
});
