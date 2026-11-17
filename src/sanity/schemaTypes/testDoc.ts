import { defineField, defineType } from "sanity";
import { isNotBlank } from "../lib/validation";

// Temporary document type that exercises every shared field type (S-12 check: publishing with a
// missing required field is blocked). Delete it when the Product schema (T-051) exists, and
// remove "testDoc" from src/sanity/lib/linkable-types.ts at the same time.
export const testDoc = defineType({
  name: "testDoc",
  title: "Test document",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.custom((value) => isNotBlank(value, "A title is required.")),
    }),
    defineField({ name: "heroImage", title: "Hero image", type: "imageWithAlt" }),
    defineField({ name: "cta", title: "Call to action", type: "cta" }),
    defineField({ name: "body", title: "Body", type: "richText" }),
    defineField({ name: "seo", title: "Search and social", type: "seo" }),
  ],
});
