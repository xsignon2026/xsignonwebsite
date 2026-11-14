import { defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// S-14 / T-123: Page schema with strictly approved modular blocks.
// No raw unconstrained HTML or arbitrary embeds allowed.
export const pageDocument = defineType({
  name: "page",
  title: "Page (Approved Modular Blocks)",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "Search & Social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Page title is required.")),
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
      name: "modules",
      title: "Page Modules (Approved Set Only)",
      type: "array",
      group: "content",
      of: [
        {
          type: "object",
          name: "heroModule",
          title: "Hero Block",
          fields: [
            { name: "headline", title: "Headline", type: "string" },
            { name: "subline", title: "Subline", type: "text", rows: 3 },
            { name: "eyebrow", title: "Eyebrow Tag", type: "string" },
            { name: "primaryCtaText", title: "Primary CTA Text", type: "string" },
            { name: "primaryCtaHref", title: "Primary CTA Href", type: "string" },
            { name: "hasBeams", title: "Enable Canvas Beams", type: "boolean", initialValue: true },
          ],
        },
        {
          type: "object",
          name: "richTextModule",
          title: "Rich Text Section",
          fields: [
            { name: "heading", title: "Section Heading", type: "string" },
            { name: "body", title: "Body Content", type: "richText" },
          ],
        },
        {
          type: "object",
          name: "cardsModule",
          title: "Structured Cards Grid",
          fields: [
            { name: "heading", title: "Section Heading", type: "string" },
            {
              name: "layout",
              title: "Card Layout",
              type: "string",
              options: { list: ["grid", "coverflow"] },
              initialValue: "grid",
            },
            {
              name: "cards",
              title: "Cards",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Card Title", type: "string" },
                    { name: "desc", title: "Description", type: "text", rows: 2 },
                    { name: "tag", title: "Tag / Category", type: "string" },
                    { name: "href", title: "Destination Link", type: "string" },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "accordionModule",
          title: "Expandable Accordion / FAQ",
          fields: [
            { name: "heading", title: "Section Heading", type: "string" },
            {
              name: "items",
              title: "Accordion Items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "title", title: "Item Title", type: "string" },
                    { name: "body", title: "Item Body", type: "text", rows: 3 },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "standardsModule",
          title: "Standards Posture Marquee",
          fields: [
            { name: "heading", title: "Section Heading", type: "string" },
            {
              name: "standards",
              title: "Standards (e.g. FIDO2, SOC 2)",
              type: "array",
              of: [{ type: "string" }],
            },
          ],
        },
        {
          type: "object",
          name: "ctaModule",
          title: "Closing CTA Band",
          fields: [
            { name: "headline", title: "CTA Headline", type: "string" },
            { name: "buttonText", title: "Button Text", type: "string" },
            { name: "buttonHref", title: "Button Destination", type: "string" },
            {
              name: "style",
              title: "Style Variant",
              type: "string",
              options: { list: ["plain", "gradient"] },
              initialValue: "plain",
            },
          ],
        },
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
      subtitle: "slug.current",
    },
  },
});
