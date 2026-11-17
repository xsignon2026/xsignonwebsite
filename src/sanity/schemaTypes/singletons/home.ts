import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// S-13 / T-090: Homepage singleton schema.
// Kept strictly separate from generic Page and Global site settings.
export const home = defineType({
  name: "home",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "Hero & Announcement", default: true },
    { name: "content", title: "Featured Content" },
    { name: "cta", title: "Call to Action" },
    { name: "seo", title: "Search & Social" },
  ],
  fields: [
    defineField({
      name: "announcement",
      title: "Top announcement bar (optional)",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "enabled",
          title: "Show announcement",
          type: "boolean",
          initialValue: false,
        }),
        defineField({ name: "badge", title: "Chip label (e.g. New)", type: "string" }),
        defineField({ name: "text", title: "Announcement copy", type: "string" }),
        defineField({ name: "href", title: "Target link", type: "string" }),
      ],
    }),
    defineField({
      name: "hero",
      title: "Hero section",
      type: "object",
      group: "hero",
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          type: "string",
          initialValue: "Verified access you can trust.",
          validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Hero headline is required.")),
        }),
        defineField({
          name: "subline",
          title: "Hero subline",
          type: "text",
          rows: 3,
          initialValue:
            "XSignOn brings biometric FIDO2 hardware and continuous posture scoring into one calm, governed platform.",
          validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Hero subline is required.")),
        }),
        defineField({
          name: "primaryButton",
          title: "Primary button",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Button text",
              type: "string",
              initialValue: "Book a strategy call",
            }),
            defineField({
              name: "href",
              title: "Button link",
              type: "string",
              initialValue: "/contact",
            }),
          ],
        }),
        defineField({
          name: "secondaryButton",
          title: "Secondary button",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Button text",
              type: "string",
              initialValue: "Explore products",
            }),
            defineField({
              name: "href",
              title: "Button link",
              type: "string",
              initialValue: "/products",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featuredProducts",
      title: "Featured products (ordered list)",
      type: "array",
      group: "content",
      description: "References to products shown in the homepage carousel. References must exist.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "product" }],
          validation: (Rule) => Rule.required().error("Referenced product must exist."),
        }),
      ],
      validation: (Rule) => Rule.required().min(1).error("Select at least one featured product."),
    }),
    defineField({
      name: "featuredProof",
      title: "Featured proof & case studies",
      type: "array",
      group: "content",
      description: "Selected customer proofs and case stories.",
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
              name: "tag",
              title: "Industry tag",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "metric",
              title: "Headline metric (e.g. 100% passwordless)",
              type: "string",
            }),
            defineField({
              name: "href",
              title: "Link to case study",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "tag" },
          },
        }),
      ],
    }),
    defineField({
      name: "selectedInsights",
      title: "Selected insights & articles",
      type: "array",
      group: "content",
      description: "Curated research articles shown in the Our Thinking section.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }],
          validation: (Rule) => Rule.required().error("Referenced article must exist."),
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Bottom CTA panel",
      type: "object",
      group: "cta",
      fields: [
        defineField({
          name: "title",
          title: "CTA Title",
          type: "string",
          initialValue: "Talk to us about sign-in your team will love.",
        }),
        defineField({
          name: "subtitle",
          title: "CTA Subtitle",
          type: "text",
          rows: 2,
          initialValue:
            "Speak with our security architects to evaluate your infrastructure and design a roadmap.",
        }),
        defineField({
          name: "buttonText",
          title: "Button text",
          type: "string",
          initialValue: "Book a strategy call",
        }),
        defineField({
          name: "buttonHref",
          title: "Button link",
          type: "string",
          initialValue: "/contact",
        }),
      ],
    }),
    defineField({
      name: "seo",
      title: "Homepage SEO & Open Graph",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "hero.headline",
    },
    prepare({ title }) {
      return {
        title: "Homepage Settings",
        subtitle: title || "Verified access you can trust.",
      };
    },
  },
});
