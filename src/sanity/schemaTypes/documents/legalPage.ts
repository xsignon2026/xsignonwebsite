import { defineArrayMember, defineField, defineType } from "sanity";

// A legal page: the Privacy Policy or the Terms. There are exactly two (ids "legal-privacy" and "legal-terms"),
// each opened from its own entry in the Studio menu. The wording must come from legal review. Do not copy
// wording from another company's policy, and do not publish a promise the company cannot keep.
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "ending", title: "Ending" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Address (do not change)",
      type: "slug",
      group: "content",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: "crumb",
      title: "Short name for the breadcrumb",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "showNotice",
      title: "Show the 'placeholder copy' tag under the title",
      description: "Switch this off once the wording has been through legal review.",
      type: "boolean",
      group: "content",
      initialValue: true,
    }),
    defineField({
      name: "notice",
      title: "Text of that tag",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [defineArrayMember({ type: "text", rows: 5 })],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),
    defineField({
      name: "ctaHeadline",
      title: "Heading of the contact block at the end",
      type: "string",
      group: "ending",
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: "ctaButton",
      title: "Button",
      type: "object",
      group: "ending",
      fields: [
        defineField({
          name: "label",
          title: "Text",
          type: "string",
          validation: (Rule) => Rule.required().max(40),
        }),
        defineField({
          name: "href",
          title: "Link (for example /contact)",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "notice" } },
});
