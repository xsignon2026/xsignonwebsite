import { defineArrayMember, defineField, defineType } from "sanity";

// The Contact page (id "contactPage") and the Proof hub (id "proofPage"): one fixed document each.
// Never state a result, customer or number that has not been confirmed (see the XSignOn content skill).

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
    fields: [str("label", "Text", 60), str("href", "Link (for example /contact)")],
  });

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [str("title", "Page title", 40)],
    }),
    defineField({
      name: "details",
      title: "Notes beside the form (what happens next, office, phone, email)",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            str("label", "Bold label (include the full stop)", 40),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(300),
            }),
            defineField({
              name: "href",
              title:
                "Link, if the text is a link (for example tel:+14155550123 or mailto:hello@example.com)",
              type: "string",
            }),
          ],
          preview: { select: { title: "label", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "closing",
      title: "Closing line under the notes",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "cta",
      title: "Contact block at the end",
      type: "object",
      fields: [str("title", "Heading", 80), linkObject("button", "Button")],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact page" };
    },
  },
});

export const proofPage = defineType({
  name: "proofPage",
  title: "Proof page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [str("title", "Page title", 40)],
    }),
    defineField({
      name: "intro",
      title: "Opening paragraph",
      type: "object",
      fields: [
        str("bold", "Bold first sentence", 120),
        defineField({
          name: "text",
          title: "The rest",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(300),
        }),
      ],
    }),
    defineField({
      name: "cards",
      title: "Case study cards",
      description:
        "Each card links to a case study page. A card with unconfirmed details keeps its 'pending' note.",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            str("title", "Title", 120),
            defineField({
              name: "tags",
              title: "Small tags (industry and place, products)",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.min(1).max(4),
            }),
            defineField({
              name: "summary",
              title: "Summary (one or two sentences)",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required().max(260),
            }),
            str("noteLabel", "Note: bold label (without the colon)", 40),
            defineField({
              name: "noteText",
              title: "Note: text",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required().max(260),
            }),
            str("href", "Link (for example /proof/securing-bank-access-fido2)"),
            defineField({
              name: "picture",
              title: "Picture",
              type: "string",
              options: {
                list: [
                  { title: "Bank building", value: "bank" },
                  { title: "Doctor with phone", value: "health" },
                  { title: "Industrial welder", value: "industrial" },
                  { title: "IT team at laptops", value: "it" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "noteLabel" } },
        }),
      ],
    }),
    defineField({
      name: "roi",
      title: "Estimate your own numbers",
      type: "object",
      fields: [
        str("title", "Heading", 60),
        defineField({
          name: "text",
          title: "Text",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.required().max(300),
        }),
        linkObject("link", "Link"),
      ],
    }),
    defineField({
      name: "cta",
      title: "Contact block at the end",
      type: "object",
      fields: [str("title", "Heading", 80), linkObject("button", "Button")],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Proof page" };
    },
  },
});
