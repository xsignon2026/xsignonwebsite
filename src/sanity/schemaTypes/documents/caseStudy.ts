import { defineArrayMember, defineField, defineType } from "sanity";
import { isAllowedExternalUrl, isNotBlank } from "../../lib/validation";

// A case study page, with mandatory approval governance. Rules that apply to every word here:
// - Name a customer, a number or a result only when it is confirmed in writing and can be sourced.
// - A section whose details are not confirmed stays as a "pending" note rather than a guess.
// The page only shows the edited version once Approval status is "Approved", with an owner and evidence link.

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "sections", title: "Sections" },
    { name: "related", title: "Related and ending" },
    { name: "governance", title: "Governance and sign-off" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Title is required.")).max(120),
    }),
    defineField({
      name: "slug",
      title: "Address (slug)",
      type: "slug",
      group: "content",
      description: "Do not change it after the case study is published.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "crumb",
      title: "Short name for the breadcrumb (for example Banking)",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "tags",
      title: "Small tags under the title (industry, date, products)",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "sections",
      title: "Sections (usually: Where they started, What was deployed, Rollout, Outcome)",
      type: "array",
      group: "sections",
      validation: (Rule) => Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "heading",
              title: "Heading",
              type: "string",
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [defineArrayMember({ type: "text", rows: 5 })],
            }),
            defineField({
              name: "features",
              title: "Checklist",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "lead",
                      title: "Bold words at the start",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "joiner",
                      title: "What follows the bold words",
                      type: "string",
                      options: {
                        list: [
                          { title: "Just a space", value: "" },
                          { title: "A comma", value: "," },
                          { title: "A colon", value: ":" },
                        ],
                      },
                      initialValue: "",
                    }),
                    defineField({
                      name: "body",
                      title: "Rest of the sentence",
                      type: "text",
                      rows: 2,
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: { select: { title: "lead", subtitle: "body" } },
                }),
              ],
            }),
            defineField({
              name: "steps",
              title: "Rollout steps",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "number",
                      title: "Number (for example 01)",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "title",
                      title: "Step name",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "text",
                      title: "Description",
                      type: "text",
                      rows: 3,
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: { select: { title: "title", subtitle: "number" } },
                }),
              ],
            }),
            defineField({
              name: "notes",
              title: "Highlighted notes (for example 'Case details pending')",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Bold label (without the colon)",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "text",
                      title: "Text",
                      type: "text",
                      rows: 2,
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: { select: { title: "label", subtitle: "text" } },
                }),
              ],
            }),
          ],
          preview: { select: { title: "heading" } },
        }),
      ],
    }),

    defineField({
      name: "related",
      title: "Related strip",
      type: "array",
      group: "related",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "type",
              title: "Label on the right (Product, Solution, Case study, Proof)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Link (for example /products/ams)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "type" } },
        }),
      ],
    }),
    defineField({
      name: "ctaHeadline",
      title: "Heading of the contact block at the end",
      type: "string",
      group: "related",
      validation: (Rule) => Rule.required().max(80),
    }),

    defineField({
      name: "approvalOwner",
      title: "Approval owner",
      type: "string",
      group: "governance",
      description: "Full name and role of the person who signed off.",
      validation: (Rule) =>
        Rule.custom((val) => isNotBlank(val, "Approval owner must be recorded.")),
    }),
    defineField({
      name: "approvalStatus",
      title: "Approval status",
      type: "string",
      group: "governance",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Pending approval", value: "pending_approval" },
          { title: "Approved (ready to publish)", value: "approved" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) =>
        Rule.custom((val) =>
          val === "approved"
            ? true
            : "A case study cannot be published without an approved status. Switch to 'Approved' once sign-off is confirmed.",
        ),
    }),
    defineField({
      name: "evidenceLink",
      title: "Evidence link",
      type: "url",
      group: "governance",
      description: "Auditable proof (a sign-off sheet or compliance document). It must open.",
      validation: (Rule) =>
        Rule.custom((val) =>
          val ? isAllowedExternalUrl(val) : "A verifiable https:// evidence link is required.",
        ),
    }),
  ],
  preview: { select: { title: "title", subtitle: "approvalStatus" } },
});
