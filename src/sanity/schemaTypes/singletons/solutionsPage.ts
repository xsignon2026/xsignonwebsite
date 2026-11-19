import { defineArrayMember, defineField, defineType } from "sanity";

// The Solutions hub: one fixed document (id "solutionsPage"). The five solution cards are built from the
// Solution documents, so edit a card's title, summary or address on the solution itself.
// List a standard only when XSignOn can show proof for it (see the XSignOn content skill).

const str = (name: string, title: string, max?: number) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (Rule) => (max ? Rule.required().max(max) : Rule.required()),
  });

const linkObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [str("label", "Text", 40), str("href", "Link (for example /contact)")],
  });

export const solutionsPage = defineType({
  name: "solutionsPage",
  title: "Solutions page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "enterprise", title: "2. Enterprise band" },
    { name: "thinking", title: "3. Our thinking" },
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
      name: "enterprise",
      title: "Enterprise band",
      type: "object",
      group: "enterprise",
      fields: [
        str("title", "Heading", 40),
        defineField({
          name: "text",
          title: "Description (one or two sentences)",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(220),
        }),
        linkObject("button", "Button"),
        defineField({
          name: "models",
          title: "The three deployment models",
          type: "array",
          validation: (Rule) => Rule.length(3).error("The band shows exactly three."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                str("title", "Name", 30),
                defineField({
                  name: "text",
                  title: "Description (one sentence)",
                  type: "string",
                  validation: (Rule) => Rule.required().max(100),
                }),
              ],
              preview: { select: { title: "title", subtitle: "text" } },
            }),
          ],
        }),
        str("standardsLabel", "Label before the standards", 40),
        defineField({
          name: "standards",
          title: "Standards named",
          description:
            "SOC 2, ISO 27001, HIPAA, GDPR and PCI DSS need proof before they are listed.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (Rule) => Rule.min(1).max(12),
        }),
      ],
    }),
    defineField({
      name: "thinking",
      title: "Our thinking",
      type: "object",
      group: "thinking",
      description: "The article cards below it come from the article documents.",
      fields: [str("title", "Heading", 40), linkObject("allLink", "Link to all articles")],
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
      return { title: "Solutions page" };
    },
  },
});
