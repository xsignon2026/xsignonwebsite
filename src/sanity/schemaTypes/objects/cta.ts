import { defineField, defineType } from "sanity";
import { CTA_LABEL_MAX, isNotBlank } from "../../lib/validation";

// S-12: a call to action is a label plus a link. Used by CTA panels and hero buttons.
export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button text",
      type: "string",
      validation: (Rule) =>
        Rule.custom((value) => isNotBlank(value, "Button text is required.")).max(CTA_LABEL_MAX),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "link.linkType" } },
});
