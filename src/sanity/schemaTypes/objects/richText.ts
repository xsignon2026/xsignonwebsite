import { defineArrayMember, defineType } from "sanity";

// S-12: body text. Deliberately small: no H1 (the page title is the H1), no colours, no raw HTML.
// Headings keep a clean order, and every image needs alt text and a credit.
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [{ type: "link" }],
      },
    }),
    defineArrayMember({ type: "imageWithAlt" }),
  ],
});
