import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// S-14 / T-051: Product document schema.
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "framework", title: "Framework & Mappings" },
    { name: "related", title: "Related & CTA" },
    { name: "seo", title: "Search & Social" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Product name",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Product name is required.")),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      description: "Short one-sentence summary for cards and lists.",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Tagline is required.")),
    }),
    defineField({
      name: "hero",
      title: "Hero section",
      type: "object",
      group: "content",
      fields: [
        defineField({
          name: "subline",
          title: "Hero subline / narrative",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Hero subline is required.")),
        }),
        defineField({
          name: "tags",
          title: "Category tags",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "dashboard",
          title: "Dashboard preview metrics (optional)",
          type: "object",
          fields: [
            defineField({ name: "score", title: "Score", type: "number", initialValue: 86 }),
            defineField({ name: "maxScore", title: "Max score", type: "number", initialValue: 100 }),
            defineField({ name: "statusChip", title: "Status chip label", type: "string", initialValue: "Evidence ready" }),
            defineField({ name: "firewallCoverage", title: "Firewall coverage %", type: "number", initialValue: 92 }),
            defineField({ name: "trafficProtection", title: "Traffic protection %", type: "number", initialValue: 78 }),
            defineField({ name: "fileIntegrityChecks", title: "File integrity %", type: "number", initialValue: 64 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "capabilityCards",
      title: "Capability cards (Bento grid)",
      type: "array",
      group: "content",
      description: "Key capabilities covered by this product.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Card title is required.")),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Card description is required.")),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "docTabs",
      title: "Documentation tabs",
      type: "array",
      group: "content",
      description: "Tabbed documentation panels (used by XSense, AMS).",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Tab label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "content", title: "Panel content", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
            defineField({ name: "title", title: "Panel title (optional)", type: "string" }),
            defineField({ name: "badge", title: "Status badge (optional)", type: "string" }),
          ],
          preview: {
            select: { title: "label", subtitle: "content" },
          },
        }),
      ],
    }),
    defineField({
      name: "framework",
      title: "Framework steps",
      type: "object",
      group: "framework",
      fields: [
        defineField({
          name: "title",
          title: "Section title",
          type: "string",
          initialValue: "The PostureOne framework",
          validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Framework section title is required.")),
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "stepNumber", title: "Step number (e.g. 01)", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
              ],
              preview: {
                select: { title: "title", subtitle: "stepNumber" },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "mappedFrameworks",
      title: "Mapped regulatory frameworks",
      type: "object",
      group: "framework",
      fields: [
        defineField({
          name: "chips",
          title: "Framework chips (e.g. SOC 2, ISO 27001)",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "note",
          title: "Explanatory note",
          type: "text",
          rows: 2,
        }),
      ],
    }),
    defineField({
      name: "relatedItems",
      title: "Related items",
      type: "array",
      group: "related",
      description: "References to related products, articles, or white papers (broken references cannot be saved).",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            { type: "product" },
            { type: "article" },
            { type: "whitePaper" },
          ],
          validation: (Rule) => Rule.required().error("Referenced document must exist."),
        }),
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "typeLabel", title: "Type label (e.g. Solution, Case study)", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "link", title: "Link", type: "link", validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: "title", subtitle: "typeLabel" },
          },
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Bottom CTA panel",
      type: "object",
      group: "related",
      fields: [
        defineField({
          name: "title",
          title: "CTA Title",
          type: "string",
          initialValue: "See your posture in one view.",
        }),
        defineField({
          name: "button",
          title: "CTA Button",
          type: "cta",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Search and social",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
    },
  },
});
