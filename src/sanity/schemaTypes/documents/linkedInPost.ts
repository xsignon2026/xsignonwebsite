import { defineField, defineType } from "sanity";
import { isNotBlank } from "../../lib/validation";

export const linkedInPost = defineType({
  name: "linkedInPost",
  title: "LinkedIn Post",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Post Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.custom((val) => isNotBlank(val, "Post text is required.")),
    }),
    defineField({
      name: "urn",
      title: "LinkedIn URN / Post ID",
      type: "string",
      validation: (Rule) => Rule.required().error("LinkedIn URN is required."),
    }),
    defineField({
      name: "url",
      title: "Post URL",
      type: "url",
      validation: (Rule) => Rule.required().error("Post URL is required."),
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required().error("Published date is required."),
    }),
    defineField({
      name: "badge",
      title: "Topic Badge",
      type: "string",
    }),
    defineField({
      name: "likesCount",
      title: "Likes Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "commentsCount",
      title: "Comments Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "repostsCount",
      title: "Reposts Count",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "image",
      title: "Post Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "text",
      subtitle: "publishedAt",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ? (title.length > 60 ? `${title.substring(0, 60)}...` : title) : "LinkedIn Post",
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : "Unscheduled",
      };
    },
  },
});
