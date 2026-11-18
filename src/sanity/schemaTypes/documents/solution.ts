import { defineArrayMember, defineField, defineType } from "sanity";

// A solution page. The headings of the four sections ("What teams come to XSignOn to achieve" and so on) are part
// of the design; everything below them is edited here. Never state a result, customer or certification that has
// not been confirmed (see the XSignOn content skill). The address (slug) should not change after publishing.

const relatedItem = defineArrayMember({
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
      title: "Label on the right (Product, Case study, Insight, Proof, Solutions)",
      type: "string",
      options: { list: ["Product", "Case study", "Insight", "Proof", "Solutions"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "href",
      title: "Link (for example /products/ams)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "type" } },
});

export const solutionDocument = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "related", title: "Related and ending" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Address (slug)",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary (one or two sentences, used in search results and cards)",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "challenge",
      title: "What teams come to XSignOn to achieve (one paragraph)",
      type: "text",
      rows: 4,
      group: "content",
      validation: (Rule) => Rule.required().max(420),
    }),
    defineField({
      name: "features",
      title: "How XSignOn supports it (the checklist, four items)",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.min(1).max(6),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "lead",
              title: "Bold words at the start",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "joiner",
              title: "What follows the bold words",
              type: "string",
              options: {
                list: [
                  { title: "Just a space", value: "" },
                  { title: "A comma", value: "," },
                  { title: "A colon", value: ":" },
                ],
              },
              initialValue: "",
            }),
            defineField({
              name: "body",
              title: "Rest of the sentence (starts in lower case)",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required().max(200),
            }),
          ],
          preview: { select: { title: "lead", subtitle: "body" } },
        }),
      ],
    }),
    defineField({
      name: "diagramKey",
      title: "Picture",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Identity Governance", value: "identity" },
          { title: "AI and Digital Governance", value: "ai" },
          { title: "Quantum-Safe Security", value: "quantum" },
          { title: "Business Process", value: "process" },
          { title: "Enterprise Technology", value: "enterprise" },
        ],
      },
    }),
    defineField({
      name: "deliveredBy",
      title: "Delivered by (product names)",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "products",
      title: "Products that deliver it",
      type: "array",
      group: "related",
      of: [relatedItem],
    }),
    defineField({
      name: "proofAndReading",
      title: "Proof and reading (end with the link back to Solutions)",
      type: "array",
      group: "related",
      of: [relatedItem],
    }),
    defineField({
      name: "ctaHeadline",
      title: "Heading of the contact block at the end",
      type: "string",
      group: "related",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 10 }),
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});
