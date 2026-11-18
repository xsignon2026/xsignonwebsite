import { defineArrayMember, defineField, defineType } from "sanity";

// The Our thinking hub: one fixed document (id "insightsPage"). It controls the hub only. The article pages
// themselves are not edited here yet. Credit sources, and never state a figure that has not been confirmed.

const str = (name: string, title: string, max?: number) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (Rule) => (max ? Rule.required().max(max) : Rule.required()),
  });

const pictureField = defineField({
  name: "picture",
  title: "Picture",
  type: "string",
  options: {
    list: [
      { title: "Server racks (identity-first)", value: "identity-first" },
      { title: "Laptop and phone (data and AI)", value: "data-ai" },
      { title: "Whiteboard planning (micro-segmentation)", value: "micro-segmentation" },
      { title: "Automated warehouse (non-human identities)", value: "non-human" },
      { title: "Analytics dashboard (agentic AI)", value: "agentic-ai" },
    ],
  },
  validation: (Rule) => Rule.required(),
});

const cardFields = [
  str("title", "Article title", 120),
  defineField({
    name: "excerpt",
    title: "Summary (one or two sentences)",
    type: "text",
    rows: 3,
    validation: (Rule) => Rule.required().max(220),
  }),
  str("author", "Author", 60),
  str("date", "Date (for example June 29, 2026)", 30),
  str("href", "Link (for example /thinking/identity-first-controls)"),
  str("cta", "Link text (for example Read the article)", 30),
  pictureField,
];

export const insightsPage = defineType({
  name: "insightsPage",
  title: "Our thinking page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "featured", title: "2. Featured article" },
    { name: "cards", title: "3. Article cards" },
    { name: "cta", title: "4. Contact block" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [str("title", "Page title", 40)],
    }),
    defineField({
      name: "featured",
      title: "Featured article",
      type: "object",
      group: "featured",
      fields: [str("label", "Label (for example Featured)", 20), ...cardFields],
    }),
    defineField({
      name: "cards",
      title: "Article cards",
      type: "array",
      group: "cards",
      validation: (Rule) => Rule.required().min(1).max(12),
      of: [
        defineArrayMember({
          type: "object",
          fields: cardFields,
          preview: { select: { title: "title", subtitle: "author" } },
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "Contact block",
      type: "object",
      group: "cta",
      fields: [
        str("title", "Heading"),
        defineField({
          name: "button",
          title: "Button",
          type: "object",
          fields: [str("label", "Text", 40), str("href", "Link (for example /contact)")],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Our thinking page" };
    },
  },
});
