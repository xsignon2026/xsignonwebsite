import { defineField, defineType } from "sanity";
import { ALT_TEXT_MAX, isNotBlank } from "../../lib/validation";

type Parent = { asset?: unknown } | undefined;

// S-12: every image carries alt text and a credit. Both block publishing when empty.
// The rules sit on the fields inside the image (see the note in link.ts): a rule on the image type
// itself would not be enforced as an error. The "upload a file" check rides on the alt field for that
// reason. An optional image left entirely empty passes; a required one uses Rule.required() on its field.
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe what the image shows, for people who cannot see it. Keep it short.",
      validation: (Rule) =>
        Rule.custom((value, context) =>
          (context.parent as Parent)?.asset
            ? isNotBlank(value, "Alt text is required.")
            : "Upload an image.",
        ).max(ALT_TEXT_MAX),
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "string",
      description:
        "Photographer, agency or licence. Write the source, or 'XSignOn' for our own images.",
      validation: (Rule) => Rule.custom((value) => isNotBlank(value, "A credit is required.")),
    }),
  ],
});
