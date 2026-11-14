import { defineField, defineType } from "sanity";
import { isAllowedExternalUrl, isNotBlank } from "../../lib/validation";

// S-14 / T-098: Case Study document schema with mandatory approval governance.
// Requirement: A case study cannot be published without an 'approved' status,
// a named approval owner, and a verifiable evidence link.
export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "narrative", title: "Narrative & Rollout" },
    { name: "governance", title: "Governance & Sign-off" },
    { name: "related", title: "Related Items" },
    { name: "seo", title: "Search & Social" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Title is required.")),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    defineField({
      name: "industry",
      title: "Industry",
      type: "string",
      group: "content",
      description: "e.g. Banking, Healthcare, Electrical, IT",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Industry is required.")),
    }),
    defineField({
      name: "location",
      title: "Location / Region",
      type: "string",
      group: "content",
      description: "e.g. Abu Dhabi, Asia, Global",
    }),
    defineField({
      name: "deploymentDate",
      title: "Deployment Date",
      type: "string",
      group: "content",
      description: "e.g. March 2020, December 2023, July 2020",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      group: "content",
      description: "Executive summary headline for card and hero views",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Headline is required.")),
    }),
    defineField({
      name: "summary",
      title: "Summary Description",
      type: "text",
      rows: 3,
      group: "content",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Summary is required.")),
    }),
    defineField({
      name: "logo",
      title: "Client Logo",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "heroImage",
      title: "Hero / Card Photo",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "challenge",
      title: "Challenge (Where they started)",
      type: "text",
      rows: 4,
      group: "narrative",
      validation: (Rule) =>
        Rule.custom((val) => isNotBlank(val, "Challenge narrative is required.")),
    }),
    defineField({
      name: "challengeParagraph2",
      title: "Challenge Detail (Second Paragraph)",
      type: "text",
      rows: 3,
      group: "narrative",
    }),
    defineField({
      name: "approach",
      title: "Approach (What was deployed)",
      type: "text",
      rows: 4,
      group: "narrative",
      validation: (Rule) =>
        Rule.custom((val) => isNotBlank(val, "Approach narrative is required.")),
    }),
    defineField({
      name: "deployedFeatures",
      title: "Deployed Features",
      type: "array",
      group: "narrative",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Feature Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Feature Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "rolloutSteps",
      title: "Rollout Phases (3-Step Grid)",
      type: "array",
      group: "narrative",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "stepNumber",
              title: "Step Number (e.g. 01, 02, 03)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Phase Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Phase Description",
              type: "text",
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "outcome",
      title: "Outcome (In Words)",
      type: "text",
      rows: 3,
      group: "narrative",
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Outcome narrative is required.")),
    }),
    defineField({
      name: "outcomeStatus",
      title: "Outcome Status Note / Notice Chip",
      type: "string",
      group: "narrative",
      description:
        "e.g. Sourced outcome needed: one verifiable result, with its source and date, is added here before this page ships.",
    }),
    defineField({
      name: "quote",
      title: "Client Quote",
      type: "object",
      group: "narrative",
      fields: [
        defineField({
          name: "quoteText",
          title: "Quote Text",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "quoteAuthor",
          title: "Quote Author",
          type: "string",
        }),
        defineField({
          name: "quoteRole",
          title: "Author Role & Company",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "approvalOwner",
      title: "Approval Owner",
      type: "string",
      group: "governance",
      description: "Full name and role of the stakeholder who signed off",
      validation: (Rule) =>
        Rule.custom((val) => isNotBlank(val, "Approval owner must be recorded.")),
    }),
    defineField({
      name: "approvalStatus",
      title: "Approval Status",
      type: "string",
      group: "governance",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Pending Approval", value: "pending_approval" },
          { title: "Approved (Ready for Publish)", value: "approved" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) =>
        Rule.custom((val) => {
          // If the document is not in approved state, block publishing
          if (val !== "approved") {
            return "A case study cannot be published without an approved status. Switch to 'Approved' once sign-off is confirmed.";
          }
          return true;
        }),
    }),
    defineField({
      name: "evidenceLink",
      title: "Evidence Link",
      type: "url",
      group: "governance",
      description:
        "Auditable proof link (internal artifact, sign-off sheet, or compliance document)",
      validation: (Rule) =>
        Rule.custom((val) => {
          if (!val) return "A verifiable https:// evidence link is required for publishing.";
          return isAllowedExternalUrl(val);
        }),
    }),
    defineField({
      name: "relatedProducts",
      title: "Related Products",
      type: "array",
      group: "related",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "relatedCaseStudies",
      title: "Related Case Studies",
      type: "array",
      group: "related",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({
      name: "seo",
      title: "Search & Social",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      industry: "industry",
      status: "approvalStatus",
      media: "heroImage",
    },
    prepare({ title, industry, status, media }) {
      return {
        title: title || "Untitled Case Study",
        subtitle: `${industry || "General"} · Status: ${status || "draft"}`,
        media,
      };
    },
  },
});
