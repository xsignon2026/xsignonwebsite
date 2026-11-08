import { defineField, defineType } from "sanity";
import { linkableTypes } from "../../lib/linkable-types";
import { isAllowedExternalUrl, linkIsComplete, type LinkValue } from "../../lib/validation";

type Parent = { linkType?: string } | undefined;

// S-12: one link type used everywhere (buttons, navigation, footer, rich text).
// An internal link is a reference, so a deleted or unpublished page cannot leave a broken link behind.
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  validation: (Rule) => Rule.custom((value) => linkIsComplete(value as LinkValue | undefined)),
  fields: [
    defineField({
      name: "linkType",
      title: "Link to",
      type: "string",
      initialValue: "internal",
      options: {
        layout: "radio",
        list: [
          { title: "A page on this site", value: "internal" },
          { title: "Another website", value: "external" },
          { title: "A file", value: "file" },
        ],
      },
    }),
    defineField({
      name: "internal",
      title: "Page",
      type: "reference",
      to: linkableTypes.map((type) => ({ type })),
      hidden: ({ parent }) => (parent as Parent)?.linkType !== "internal",
    }),
    defineField({
      name: "external",
      title: "Web address",
      type: "url",
      description: "Starts with https://, mailto: or tel:",
      hidden: ({ parent }) => (parent as Parent)?.linkType !== "external",
      validation: (Rule) => Rule.custom((value) => isAllowedExternalUrl(value)),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: { accept: ".pdf" },
      hidden: ({ parent }) => (parent as Parent)?.linkType !== "file",
    }),
  ],
  preview: {
    select: { type: "linkType", external: "external", page: "internal.title" },
    prepare: ({ type, external, page }) => ({
      title: type === "external" ? external : type === "file" ? "File" : (page ?? "Page"),
      subtitle: type,
    }),
  },
});
