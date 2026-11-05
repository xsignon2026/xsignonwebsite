import { defineField, defineType } from "sanity";
import { linkableTypes } from "../../lib/linkable-types";
import { isAllowedExternalUrl, linkFieldError, type LinkValue } from "../../lib/validation";

type Parent = LinkValue | undefined;

// S-12: one link type used everywhere (buttons, navigation, footer, rich text).
// An internal link is a reference, so a deleted or unpublished page cannot leave a broken link behind.
//
// Every blocking rule sits on a field INSIDE the link, not on the link type itself. Rules on the type
// are not enforced as errors when the type is used as a field (checked with Sanity's own validation in
// src/tests/schema-validation.test.ts), so they would let an incomplete link publish. Rules on inner
// fields only run when the link exists, so an optional link can safely stay empty.
export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
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
      validation: (Rule) => Rule.custom((value) => (value ? true : "Choose a link type.")),
    }),
    defineField({
      name: "internal",
      title: "Page",
      type: "reference",
      to: linkableTypes.map((type) => ({ type })),
      hidden: ({ parent }) => (parent as Parent)?.linkType !== "internal",
      validation: (Rule) =>
        Rule.custom((_, context) => linkFieldError("internal", context.parent as Parent)),
    }),
    defineField({
      name: "external",
      title: "Web address",
      type: "url",
      description: "Starts with https://, mailto: or tel:",
      hidden: ({ parent }) => (parent as Parent)?.linkType !== "external",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const missing = linkFieldError("external", context.parent as Parent);
          return missing === true ? isAllowedExternalUrl(value) : missing;
        }),
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: { accept: ".pdf" },
      hidden: ({ parent }) => (parent as Parent)?.linkType !== "file",
      validation: (Rule) =>
        Rule.custom((_, context) => linkFieldError("file", context.parent as Parent)),
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
