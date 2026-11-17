import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";
import { NAV_CHILDREN_MAX, NAV_LABEL_MAX, navItemHasDestination } from "../../lib/site-validation";

const labelField = defineField({
  name: "label",
  title: "Label",
  type: "string",
  validation: (Rule) =>
    Rule.custom((value) => isNotBlank(value, "A label is required.")).max(NAV_LABEL_MAX),
});

const childItem = defineArrayMember({
  type: "object",
  name: "navChild",
  title: "Dropdown item",
  fields: [
    labelField,
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "label", subtitle: "link.linkType" } },
});

// S-13: one navigation for desktop and mobile (Q-10 asks the client to confirm the structure).
// Internal links are references, so an editor cannot publish a link to a deleted page.
export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Main menu",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(8),
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          title: "Menu item",
          validation: (Rule) =>
            Rule.custom((value) => (value ? navItemHasDestination(value) : true)),
          fields: [
            labelField,
            defineField({
              name: "link",
              title: "Link",
              type: "link",
              description: "Leave empty if this item only opens a dropdown.",
            }),
            defineField({
              name: "children",
              title: "Dropdown items",
              type: "array",
              of: [childItem],
              validation: (Rule) => Rule.max(NAV_CHILDREN_MAX),
            }),
          ],
          preview: {
            select: { title: "label", children: "children" },
            prepare: ({ title, children }) => ({
              title,
              subtitle:
                Array.isArray(children) && children.length
                  ? `${children.length} in dropdown`
                  : "Link",
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});
