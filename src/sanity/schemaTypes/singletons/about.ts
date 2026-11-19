import { defineArrayMember, defineField, defineType } from "sanity";

// The About page: one fixed document (id "about"). Each group is one section, in page order.
// Plain, specific wording is the rule (see the XSignOn content skill). Never enter a number, certification,
// customer or partner name that has not been confirmed.

const text = (name: string, title: string, max?: number, required = true) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (Rule) => {
      const rule = required ? Rule.required() : Rule;
      return max ? rule.max(max) : rule;
    },
  });

const artOptions = [
  { title: "Identity", value: "identity" },
  { title: "AI", value: "ai" },
  { title: "Passwordless", value: "key" },
  { title: "Quantum-safe", value: "atom" },
];

export const about = defineType({
  name: "about",
  title: "About page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "who", title: "2. Who we are" },
    { name: "what", title: "3. What we do" },
    { name: "how", title: "4. How we work" },
    { name: "why", title: "5. Why XSignOn" },
    { name: "products", title: "6. Products line" },
    { name: "careers", title: "7. Careers" },
    { name: "team", title: "8. Meet our team" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        text("eyebrow", "Small label above the title", 40),
        text("title", "Title", 110),
        defineField({
          name: "description",
          title: "Description (about 25 to 40 words)",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(300),
        }),
      ],
    }),

    defineField({
      name: "who",
      title: "Who we are",
      type: "object",
      group: "who",
      fields: [
        text("title", "Section heading", 40),
        defineField({
          name: "statement",
          title: "Opening statement (one sentence)",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(260),
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 4 })],
          validation: (Rule) => Rule.min(1).max(3),
        }),
      ],
    }),

    defineField({
      name: "whatWeDo",
      title: "What we do",
      type: "object",
      group: "what",
      fields: [
        text("title", "Section heading", 40),
        defineField({
          name: "items",
          title: "The four capabilities",
          type: "array",
          validation: (Rule) => Rule.length(4).error("The section shows exactly four."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                text("title", "Name", 40),
                defineField({
                  name: "text",
                  title: "Description (one sentence)",
                  type: "text",
                  rows: 2,
                  validation: (Rule) => Rule.required().max(160),
                }),
                defineField({
                  name: "art",
                  title: "Picture",
                  type: "string",
                  options: { list: artOptions },
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: { select: { title: "title", subtitle: "text" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "how",
      title: "How we work",
      type: "object",
      group: "how",
      fields: [
        text("title", "Section heading", 40),
        defineField({
          name: "steps",
          title: "The four steps",
          type: "array",
          validation: (Rule) => Rule.length(4).error("The section shows exactly four steps."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                text("title", "Step name", 40),
                text("kind", "What the customer gets (for example Baseline report)", 30),
                defineField({
                  name: "text",
                  title: "Description (one sentence)",
                  type: "text",
                  rows: 2,
                  validation: (Rule) => Rule.required().max(160),
                }),
              ],
              preview: { select: { title: "title", subtitle: "kind" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "why",
      title: "Why XSignOn",
      type: "object",
      group: "why",
      fields: [
        text("title", "Section heading", 40),
        defineField({
          name: "principles",
          title: "The four principles",
          type: "array",
          validation: (Rule) => Rule.length(4).error("The picture shows exactly four."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                text("title", "Principle", 40),
                defineField({
                  name: "lines",
                  title: "Description (exactly two short lines)",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (Rule) => Rule.length(2),
                }),
                text("via", "Focus (a few words)", 30),
              ],
              preview: { select: { title: "title" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "productsLine",
      title: "Products line",
      type: "object",
      group: "products",
      fields: [
        defineField({
          name: "text",
          title: "Sentence",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(220),
        }),
        defineField({
          name: "links",
          title: "Links",
          type: "array",
          validation: (Rule) => Rule.min(1).max(4),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                text("label", "Label", 40),
                text("href", "Link (for example /products/evalone)"),
              ],
              preview: { select: { title: "label", subtitle: "href" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "careers",
      title: "Careers",
      type: "object",
      group: "careers",
      fields: [
        text("title", "Heading", 60),
        defineField({
          name: "text",
          title: "Text",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(300),
        }),
        defineField({
          name: "emptyNote",
          title: "Note shown when there are no open roles",
          type: "string",
          validation: (Rule) => Rule.max(140),
        }),
      ],
    }),

    defineField({
      name: "team",
      title: "Meet our team",
      description:
        "Only people who have agreed to be shown. Add real names, roles and photos only.",
      type: "object",
      group: "team",
      fields: [
        text("title", "Section heading", 40),
        text("emptyNote", "Line shown while no people are added", 100, false),
        defineField({
          name: "members",
          title: "People (shown as cards, in this order)",
          type: "array",
          validation: (Rule) => Rule.max(12),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                text("name", "Name", 60),
                text("role", "Role", 60),
                defineField({
                  name: "bio",
                  title: "Short bio (one or two sentences, optional)",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.max(200),
                }),
                defineField({
                  name: "photo",
                  title: "Photo (square works best)",
                  type: "image",
                  options: { hotspot: true },
                }),
              ],
              preview: { select: { title: "name", subtitle: "role", media: "photo" } },
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
