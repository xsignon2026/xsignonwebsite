import { defineArrayMember, defineField, defineType } from "sanity";

// The Careers page: one fixed document (id "careersPage"). The open roles are separate "Job" documents:
// switch a role's "Currently active" off to close it. If every role is closed, the "no open roles" note shows.

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

export const careersPage = defineType({
  name: "careersPage",
  title: "Careers page",
  type: "document",
  groups: [
    { name: "hero", title: "1. Hero", default: true },
    { name: "working", title: "2. Working here" },
    { name: "roles", title: "3. Open roles" },
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
      name: "working",
      title: "Working here",
      type: "object",
      group: "working",
      fields: [
        str("title", "Section heading", 40),
        defineField({
          name: "values",
          title: "The three statements",
          type: "array",
          validation: (Rule) => Rule.length(3).error("The section shows exactly three."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                str("title", "Statement", 60),
                defineField({
                  name: "text",
                  title: "Explanation (one or two sentences)",
                  type: "text",
                  rows: 3,
                  validation: (Rule) => Rule.required().max(240),
                }),
              ],
              preview: { select: { title: "title", subtitle: "text" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "roles",
      title: "Open roles",
      type: "object",
      group: "roles",
      fields: [
        str("title", "Section heading", 40),
        defineField({
          name: "emptyNote",
          title: "Note shown when no role is open",
          type: "string",
          validation: (Rule) => Rule.required().max(140),
        }),
        defineField({
          name: "general",
          title: "General applications box",
          type: "object",
          fields: [
            str("title", "Heading", 40),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(240),
            }),
            linkObject("button", "Button"),
          ],
        }),
      ],
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
      return { title: "Careers page" };
    },
  },
});
