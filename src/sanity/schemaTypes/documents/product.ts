import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// S-14 / T-051: Product document schema.
export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "more", title: "More sections" },
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
            defineField({
              name: "maxScore",
              title: "Max score",
              type: "number",
              initialValue: 100,
            }),
            defineField({
              name: "statusChip",
              title: "Status chip label",
              type: "string",
              initialValue: "Evidence ready",
            }),
            defineField({
              name: "firewallCoverage",
              title: "Firewall coverage %",
              type: "number",
              initialValue: 92,
            }),
            defineField({
              name: "trafficProtection",
              title: "Traffic protection %",
              type: "number",
              initialValue: 78,
            }),
            defineField({
              name: "fileIntegrityChecks",
              title: "File integrity %",
              type: "number",
              initialValue: 64,
            }),
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
              validation: (Rule) =>
                Rule.custom((val) => isNotBlank(val, "Card title is required.")),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (Rule) =>
                Rule.custom((val) => isNotBlank(val, "Card description is required.")),
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
            defineField({
              name: "label",
              title: "Tab label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "content",
              title: "Panel content",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
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
          validation: (Rule) =>
            Rule.custom((val) => isNotBlank(val, "Framework section title is required.")),
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
      title: "Related items (the Related strip at the bottom)",
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
              name: "typeLabel",
              title: "Type label (for example Product, Solution)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (for example /products/evalone)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "typeLabel" } },
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Bottom call to action",
      type: "object",
      group: "related",
      fields: [
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({ name: "buttonText", title: "Button text", type: "string" }),
        defineField({
          name: "buttonHref",
          title: "Button link (for example /contact)",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "extraNarrative",
      title: "Extra paragraphs under the hero",
      type: "array",
      group: "more",
      of: [defineArrayMember({ type: "text", rows: 3 })],
    }),
    defineField({
      name: "keyViz",
      title: "Key picture caption",
      type: "object",
      group: "more",
      fields: [
        defineField({ name: "badge", title: "Badge (two letters)", type: "string" }),
        defineField({ name: "description", title: "Caption", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "checklist",
      title: "Checklist card",
      type: "object",
      group: "more",
      fields: [
        defineField({ name: "meta", title: "Card label", type: "string" }),
        defineField({
          name: "items",
          title: "Items",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Text", type: "string" }),
                defineField({ name: "done", title: "Shown as done", type: "boolean" }),
              ],
              preview: { select: { title: "label" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "snapshot",
      title: "Snapshot card (bars)",
      type: "object",
      group: "more",
      fields: [
        defineField({ name: "meta", title: "Card label", type: "string" }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value text", type: "string" }),
                defineField({ name: "percentage", title: "Bar length (0 to 100)", type: "number" }),
                defineField({
                  name: "color",
                  title: "Colour",
                  type: "string",
                  options: {
                    list: [
                      { title: "Default", value: "default" },
                      { title: "Green", value: "green" },
                    ],
                  },
                }),
              ],
              preview: { select: { title: "label", subtitle: "value" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "caseCards",
      title: "Use case cards",
      type: "array",
      group: "more",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "tag", title: "Tag", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "statusNotice", title: "Status note (optional)", type: "string" }),
            defineField({ name: "linkText", title: "Link text", type: "string" }),
            defineField({ name: "linkHref", title: "Link", type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "tag" } },
        }),
      ],
    }),
    defineField({
      name: "specTable",
      title: "Specification table",
      type: "object",
      group: "more",
      description: "Only enter specifications that the product team has confirmed.",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
        defineField({
          name: "columns",
          title: "Column headings",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({
          name: "rows",
          title: "Rows",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "header", title: "Row name", type: "string" }),
                defineField({
                  name: "values",
                  title: "Values (one per column)",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
              preview: { select: { title: "header" } },
            }),
          ],
        }),
        defineField({ name: "footnote", title: "Footnote", type: "string" }),
      ],
    }),
    defineField({
      name: "worksWith",
      title: "Works with section",
      type: "object",
      group: "more",
      fields: [
        defineField({ name: "title", title: "Heading", type: "string" }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 3 })],
        }),
        defineField({ name: "linkText", title: "Link text", type: "string" }),
        defineField({ name: "linkHref", title: "Link", type: "string" }),
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
