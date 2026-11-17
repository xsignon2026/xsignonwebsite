import { defineField, defineType } from "sanity";

// T-106: Sanity Document Schema for Solutions Architecture
export const solutionDocument = defineType({
  name: "solution",
  title: "Solution",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary (Hub Card)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ctaHeadline",
      title: "CTA Headline",
      type: "string",
    }),
    defineField({
      name: "challenge",
      title: "What Teams Come to XSignOn to Achieve",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "features",
      title: "How XSignOn Supports It (Checklist)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "lead", title: "Bold Lead", type: "string" },
            { name: "body", title: "Description", type: "text", rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: "diagramKey",
      title: "Architectural Diagram Key",
      type: "string",
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
      title: "Delivered By Products",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "summary",
    },
  },
});
