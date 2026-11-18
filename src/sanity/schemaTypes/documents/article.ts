import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// An article on the Our thinking pages. The body is a list of sections, each with a heading, paragraphs and an
// optional pull quote, which is exactly how the article page lays them out.
// Rules for editors: credit every outside source, and never state a figure, customer or certification that has not
// been confirmed (see the XSignOn content skill). The address (slug) of a published article should not change.
export const article = defineType({
  name: "article",
  title: "Article",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "body", title: "Body" },
    { name: "related", title: "Related and ending" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Title is required.")).max(120),
    }),
    defineField({
      name: "slug",
      title: "Address (slug)",
      type: "slug",
      group: "content",
      description: "The end of the web address. Do not change it after the article is published.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    defineField({
      name: "crumb",
      title: "Short name for the breadcrumb (for example Micro-segmentation)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "excerpt",
      title: "Summary (one or two sentences, used in search results)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "content",
      initialValue: "XSignOn Team",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "date",
      title: "Date shown (for example June 29, 2026)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({ name: "topic", title: "Topic", type: "string", group: "content" }),
    defineField({
      name: "readingTime",
      title: "Reading time (for example 4 min read)",
      type: "string",
      group: "content",
    }),
    defineField({ name: "featured", title: "Featured article", type: "boolean", group: "content" }),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "body",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required().max(100),
            }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs (one idea each)",
              type: "array",
              of: [defineArrayMember({ type: "text", rows: 5 })],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "pullQuote",
              title: "Pull quote shown after the paragraphs (optional)",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.max(200),
            }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),

    defineField({
      name: "relatedLinks",
      title: "Related strip",
      type: "array",
      group: "related",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: {
                list: ["Product", "Solution", "Insight", "Case study", "Our thinking"],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (for example /products/evalone)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "type" } },
        }),
      ],
    }),
    defineField({
      name: "ctaHeadline",
      title: "Heading of the contact block at the end",
      type: "string",
      group: "related",
      validation: (Rule) => Rule.required().max(80),
    }),
  ],
  preview: { select: { title: "title", subtitle: "author" } },
});
