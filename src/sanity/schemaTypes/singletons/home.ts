import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// The homepage: one fixed document (id "home"). Each group below is one section of the page, in page order.
// Plain, specific wording is the rule: see the XSignOn content skill for style, and never enter a number,
// certification or customer name that has not been confirmed.

const link = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({
        name: "label",
        title: "Label",
        type: "string",
        validation: (Rule) => Rule.required().max(40),
      }),
      defineField({
        name: "href",
        title: "Link (for example /products)",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
    ],
  });

export const home = defineType({
  name: "home",
  title: "Homepage",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "slides", title: "2. Hero card" },
    { name: "standards", title: "3. Standards strip" },
    { name: "ecosystem", title: "4. Security Ecosystem" },
    { name: "whatWeDo", title: "5. What XSignOn does" },
    { name: "cta", title: "6. Contact block" },
    { name: "seo", title: "Search and social" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero text",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "Small label above the headline", type: "string" }),
        defineField({
          name: "headlineLead",
          title: "Headline, first part",
          type: "string",
          validation: (Rule) => Rule.custom((val) => isNotBlank(val, "The headline is required.")),
        }),
        defineField({
          name: "headlineAccent",
          title: "Headline, highlighted part",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description (about 25 to 40 words)",
          type: "text",
          rows: 3,
          validation: (Rule) =>
            Rule.custom((val) => isNotBlank(val, "The description is required.")),
        }),
        link("primaryButton", "Primary button"),
        link("secondaryLink", "Secondary link"),
      ],
    }),

    defineField({
      name: "heroSlides",
      title: "Hero card slides (newest launches first)",
      type: "array",
      group: "slides",
      description:
        "The card beside the hero rotates through these. Keep it to three. The picture is chosen by 'Look'.",
      validation: (Rule) => Rule.required().min(1).max(5),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Short ID (lower case, no spaces)",
              type: "slug",
              options: { source: "tag" },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "variant",
              title: "Look of the picture",
              type: "number",
              options: {
                list: [
                  { title: "Violet and red", value: 0 },
                  { title: "Red", value: 1 },
                  { title: "Light", value: 2 },
                ],
              },
              initialValue: 0,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "tag",
              title: "Small label on the panel (for example New product)",
              type: "string",
              validation: (Rule) => Rule.required().max(24),
            }),
            defineField({
              name: "heading",
              title: "Heading on the panel (up to 3 short lines)",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1).max(3),
            }),
            defineField({
              name: "sub",
              title: "Small text under the heading",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.max(2),
            }),
            defineField({
              name: "line",
              title: "One-liner under the picture",
              type: "string",
              validation: (Rule) => Rule.max(110),
            }),
            defineField({
              name: "action",
              title: "What the slide does",
              type: "object",
              fields: [
                defineField({
                  name: "type",
                  title: "Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Free domain check (text box and button)", value: "scan" },
                      { title: "A button that opens a page", value: "link" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "link",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Button text",
                  type: "string",
                  hidden: ({ parent }) => parent?.type !== "link",
                }),
                defineField({
                  name: "href",
                  title: "Button link",
                  type: "string",
                  hidden: ({ parent }) => parent?.type !== "link",
                }),
              ],
            }),
          ],
          preview: { select: { title: "tag", subtitle: "line" } },
        }),
      ],
    }),

    defineField({
      name: "standards",
      title: "Names in the scrolling strip",
      type: "array",
      group: "standards",
      description:
        "Names only, for example FIDO2. List only standards the products are built to align with and that the team can back up. SOC 2, ISO 27001 and GDPR need proof before they are listed.",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.min(2).max(12),
    }),

    defineField({
      name: "ecosystem",
      title: "Security Ecosystem",
      type: "object",
      group: "ecosystem",
      fields: [
        defineField({ name: "title", title: "Section heading", type: "string" }),
        defineField({
          name: "items",
          title: "The four blocks",
          type: "array",
          validation: (Rule) => Rule.length(4).error("The picture shows exactly four blocks."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Benefit (for example Contain threats faster)",
                  type: "string",
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: "lines",
                  title: "Description (exactly two short lines)",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (Rule) => Rule.length(2),
                }),
                defineField({
                  name: "icon",
                  title: "Icon on the block",
                  type: "string",
                  options: {
                    list: [
                      { title: "Grid", value: "grid" },
                      { title: "Data", value: "database" },
                      { title: "Key", value: "key" },
                      { title: "Atom", value: "atom" },
                    ],
                  },
                  initialValue: "grid",
                }),
                defineField({
                  name: "via",
                  title: "Delivered through (product names)",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
                defineField({
                  name: "to",
                  title: "What you get (short lines)",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "whatWeDo",
      title: "What XSignOn does",
      type: "object",
      group: "whatWeDo",
      fields: [
        defineField({ name: "title", title: "Section heading", type: "string" }),
        link("allLink", "Link to all solutions"),
        defineField({
          name: "panels",
          title: "The four panels",
          type: "array",
          validation: (Rule) => Rule.length(4).error("The section shows exactly four panels."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({
                  name: "title",
                  title: "Name",
                  type: "string",
                  validation: (Rule) => Rule.required().max(40),
                }),
                defineField({
                  name: "text",
                  title: "Description (two sentences at most)",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(260),
                }),
                defineField({ name: "href", title: "Link", type: "string" }),
                defineField({
                  name: "cta",
                  title: "Link text",
                  type: "string",
                  initialValue: "View solution",
                }),
                defineField({
                  name: "art",
                  title: "Picture",
                  type: "string",
                  options: {
                    list: [
                      { title: "Identity", value: "identity" },
                      { title: "AI", value: "ai" },
                      { title: "Passwordless", value: "key" },
                      { title: "Quantum-safe", value: "atom" },
                    ],
                  },
                }),
              ],
              preview: { select: { title: "title", subtitle: "text" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "cta",
      title: "Contact block",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "title", title: "Heading", type: "string" }),
        link("button", "Button"),
      ],
    }),

    defineField({
      name: "seo",
      title: "Homepage search and social",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
