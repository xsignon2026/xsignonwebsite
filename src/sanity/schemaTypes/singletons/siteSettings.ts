import { defineArrayMember, defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";
import {
  BANNER_MAX,
  FOOTER_GROUPS_MAX,
  FOOTER_LINKS_MAX,
  FOOTER_TITLE_MAX,
  bannerTextIsValid,
} from "../../lib/site-validation";
import { labelField } from "./label-field";

type Parent = { enabled?: boolean } | undefined;

// S-13: site-wide settings. One document only (see src/sanity/structure.ts).
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "seo", title: "Defaults" },
    { name: "banner", title: "Announcement banner" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "defaultSeo",
      title: "Default search and social",
      type: "seo",
      group: "seo",
      description:
        "Used by any page that leaves its own search fields empty. The social image here is the site default.",
    }),
    defineField({
      name: "headerCta",
      title: "Header button",
      type: "cta",
      group: "seo",
      description: "The main button in the page header, for example Request a demo.",
    }),
    defineField({
      name: "banner",
      title: "Announcement banner",
      type: "object",
      group: "banner",
      fields: [
        defineField({
          name: "enabled",
          title: "Show the banner",
          type: "boolean",
          initialValue: false,
        }),
        defineField({
          name: "message",
          title: "Banner text",
          type: "string",
          hidden: ({ parent }) => !(parent as Parent)?.enabled,
          validation: (Rule) =>
            Rule.custom((value, context) =>
              bannerTextIsValid((context.parent as Parent)?.enabled, value),
            ).max(BANNER_MAX),
        }),
        defineField({
          name: "link",
          title: "Banner link (optional)",
          type: "link",
          hidden: ({ parent }) => !(parent as Parent)?.enabled,
        }),
      ],
    }),
    defineField({
      name: "footerGroups",
      title: "Footer link groups",
      type: "array",
      group: "footer",
      validation: (Rule) => Rule.max(FOOTER_GROUPS_MAX),
      of: [
        defineArrayMember({
          type: "object",
          name: "footerGroup",
          title: "Link group",
          fields: [
            defineField({
              name: "title",
              title: "Group title",
              type: "string",
              validation: (Rule) =>
                Rule.custom((value) => isNotBlank(value, "A group title is required.")).max(
                  FOOTER_TITLE_MAX,
                ),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              validation: (Rule) => Rule.required().min(1).max(FOOTER_LINKS_MAX),
              of: [
                defineArrayMember({
                  type: "object",
                  name: "footerLink",
                  title: "Link",
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
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", links: "links" },
            prepare: ({ title, links }) => ({
              title,
              subtitle: `${Array.isArray(links) ? links.length : 0} links`,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: "legalLine",
      title: "Footer legal line",
      type: "string",
      group: "footer",
      description: "For example: © XSignOn. All rights reserved.",
      validation: (Rule) =>
        Rule.custom((value) => isNotBlank(value, "The legal line is required.")),
    }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
