import { defineArrayMember, defineField, defineType } from "sanity";
import type { LinkValue } from "../../lib/validation";
import { NAV_CHILDREN_MAX, NAV_ITEMS_MAX, navItemHasDestination } from "../../lib/site-validation";
import { labelField } from "./label-field";

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
      validation: (Rule) => Rule.required().min(1).max(NAV_ITEMS_MAX),
      of: [
        defineArrayMember({
          type: "object",
          name: "navItem",
          title: "Menu item",
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
              // The "goes somewhere" rule sits on this field because rules on the menu item itself
              // are not enforced as errors (see the note in link.ts).
              validation: (Rule) => [
                Rule.custom((children, context) =>
                  navItemHasDestination({
                    link: (context.parent as { link?: LinkValue } | undefined)?.link,
                    children: children as unknown[] | undefined,
                  }),
                ),
                Rule.max(NAV_CHILDREN_MAX),
              ],
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
