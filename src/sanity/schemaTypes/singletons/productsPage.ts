import { defineArrayMember, defineField, defineType } from "sanity";

// The Products listing page: one fixed document (id "productsPage"). The product pages themselves are the
// separate "Product" documents. Never enter a claim, number or customer name that has not been confirmed.

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
      { title: "Analytics dashboard", value: "analytics" },
      { title: "Fingerprint sign-in", value: "fingerprint" },
      { title: "Team workshop", value: "workshop" },
      { title: "Data centre servers", value: "servers" },
      { title: "Warehouse shelves", value: "warehouse" },
    ],
  },
  validation: (Rule) => Rule.required(),
});

const linkObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [str("label", "Text", 40), str("href", "Link (for example /contact)")],
  });

export const productsPage = defineType({
  name: "productsPage",
  title: "Products page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "launches", title: "2. New launches" },
    { name: "cards", title: "3. Product cards" },
    { name: "thinking", title: "4. Our thinking" },
    { name: "cta", title: "5. Contact block" },
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
      name: "newLaunches",
      title: "New launches",
      type: "object",
      group: "launches",
      fields: [
        str("title", "Section heading", 40),
        defineField({
          name: "items",
          title: "The three newest products",
          type: "array",
          validation: (Rule) => Rule.length(3).error("The section shows exactly three."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                str("name", "Product name", 40),
                str("tag", "Small label (for example AI evaluation)", 30),
                defineField({
                  name: "text",
                  title: "Description (one or two sentences)",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(200),
                }),
                str("cta", "Link text (for example Explore EvalOne)", 40),
                str("href", "Link (for example /products/evalone)"),
                pictureField,
              ],
              preview: { select: { title: "name", subtitle: "tag" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "cards",
      title: "Product cards (the tabs)",
      type: "object",
      group: "cards",
      fields: [
        defineField({
          name: "items",
          title: "The five cards",
          type: "array",
          validation: (Rule) => Rule.length(5).error("The tabs show exactly five."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                str("name", "Product name (also the tab name)", 30),
                defineField({
                  name: "tags",
                  title: "Short tags (three or four)",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                  validation: (Rule) => Rule.min(1).max(4),
                }),
                defineField({
                  name: "text",
                  title: "Description (two sentences at most)",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(240),
                }),
                str("href", "'View more' link (for example /products/ams)"),
                pictureField,
              ],
              preview: { select: { title: "name" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "thinking",
      title: "Our thinking",
      type: "object",
      group: "thinking",
      description: "The articles in the carousel come from the Insights pass, not from here.",
      fields: [str("title", "Section heading", 40), linkObject("allLink", "Link to all articles")],
    }),
    defineField({
      name: "cta",
      title: "Contact block",
      type: "object",
      group: "cta",
      fields: [str("title", "Heading"), linkObject("button", "Button")],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Products page" };
    },
  },
});
