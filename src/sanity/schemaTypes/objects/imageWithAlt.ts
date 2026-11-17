import { defineField, defineType } from "sanity";
import { ALT_TEXT_MAX, isNotBlank } from "../../lib/validation";

// S-12: every image carries alt text and a credit. Both block publishing when empty.
export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  validation: (Rule) => Rule.custom((value) => (value?.asset ? true : "Upload an image.")),
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe what the image shows, for people who cannot see it. Keep it short.",
      validation: (Rule) =>
        Rule.custom((value) => isNotBlank(value, "Alt text is required.")).max(ALT_TEXT_MAX),
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
