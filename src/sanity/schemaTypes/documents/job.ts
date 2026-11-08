import { defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

// S-14 / T-128: Job document schema for career listings.
export const jobDocument = defineType({
  name: "job",
  title: "Career / Job Posting",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) =>
        Rule.custom((val) => isNotBlank(val, "Job title is required.")),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required().error("Slug is required."),
    }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: {
        list: ["Engineering", "Security", "AI Governance", "Product", "Operations"],
      },
      validation: (Rule) => Rule.required().error("Department is required."),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required().error("Location is required."),
    }),
    defineField({
      name: "employmentType",
      title: "Employment Type",
      type: "string",
      options: {
        list: ["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"],
      },
      initialValue: "FULL_TIME",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Summary Description",
      type: "text",
      rows: 3,
      validation: (Rule) =>
        Rule.custom((val) => isNotBlank(val, "Job description is required.")),
    }),
    defineField({
      name: "active",
      title: "Currently Active / Open",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "postedAt",
      title: "Date Posted",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
    },
  },
});
