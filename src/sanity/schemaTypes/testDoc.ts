import { defineField, defineType } from "sanity";

// Temporary document type so the studio has something to save (S-11 check).
// Delete it when the real schemas are built in S-12.
export const testDoc = defineType({
  name: "testDoc",
  title: "Test document",
  type: "document",
  fields: [defineField({ name: "title", title: "Title", type: "string" })],
});
