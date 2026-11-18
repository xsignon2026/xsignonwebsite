import { defineArrayMember, defineField, defineType } from "sanity";

// The Industry Thinking page ("industryPage"), the Compare page ("comparePage") and the Enterprise page
// ("enterprisePage"): one fixed document each. Never state a result, standard, customer or number that has not
// been confirmed and cannot be proved (see the XSignOn content skill).

const str = (name: string, title: string, max?: number) =>
  defineField({
    name,
    title,
    type: "string",
    validation: (Rule) => (max ? Rule.required().max(max) : Rule.required()),
  });

const body = (name: string, title: string, max: number, rows = 3) =>
  defineField({
    name,
    title,
    type: "text",
    rows,
    validation: (Rule) => Rule.required().max(max),
  });

const linkObject = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [str("label", "Text", 60), str("href", "Link (for example /contact)")],
  });

const cta = defineField({
  name: "cta",
  title: "Contact block at the end",
  type: "object",
  fields: [str("title", "Heading", 80), linkObject("button", "Button")],
});

const relatedRows = defineField({
  name: "related",
  title: "Related strip",
  type: "array",
  validation: (Rule) => Rule.required().min(1).max(8),
  of: [
    defineArrayMember({
      type: "object",
      fields: [
        str("title", "Title"),
        str("type", "Label on the right (Product, Solution, Case study, Proof, Products)", 30),
        str("href", "Link (for example /products/ams)"),
      ],
      preview: { select: { title: "title", subtitle: "type" } },
    }),
  ],
});

const intro = defineField({
  name: "intro",
  title: "Opening paragraph",
  type: "object",
  fields: [str("bold", "Bold first sentence", 200), body("text", "The rest", 320)],
});

const noteFields = [
  str("noteLabel", "Note: bold label (without the colon)", 40),
  body("noteText", "Note: text", 220, 2),
];

export const industryPage = defineType({
  name: "industryPage",
  title: "Industry Thinking page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [str("title", "Page title", 60), str("tag", "Small tag under the title", 80)],
    }),
    defineField({
      name: "featured",
      title: "Featured piece",
      type: "object",
      fields: [
        str("label", "Label (for example Featured insight)", 30),
        str("title", "Title", 120),
        body("text", "Summary (one or two sentences)", 260),
        ...noteFields,
      ],
    }),
    defineField({
      name: "cards",
      title: "Other pieces",
      description: "A piece that is not ready keeps its 'pending' note.",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(12),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            str("title", "Title", 120),
            body("text", "Summary (one or two sentences)", 260),
            ...noteFields,
          ],
          preview: { select: { title: "title", subtitle: "noteLabel" } },
        }),
      ],
    }),
    cta,
  ],
  preview: {
    prepare() {
      return { title: "Industry Thinking page" };
    },
  },
});

export const comparePage = defineType({
  name: "comparePage",
  title: "Compare page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [str("title", "Page title", 60)],
    }),
    intro,
    defineField({
      name: "columns",
      title: "Column headings (first is the capability column, then XSignOn, then the others)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(2).max(6),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      description:
        "Each row needs one value for every column after the first. Every statement about XSignOn must be true and provable.",
      type: "array",
      validation: (Rule) => Rule.required().min(1).max(12),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            str("capability", "Capability", 100),
            defineField({
              name: "values",
              title: "Values (one per column, in order)",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: { select: { title: "capability" } },
        }),
      ],
    }),
    body("lede", "Line under the table", 260),
    relatedRows,
    cta,
  ],
  preview: {
    prepare() {
      return { title: "Compare page" };
    },
  },
});

export const enterprisePage = defineType({
  name: "enterprisePage",
  title: "Enterprise page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        str("title", "Page title", 80),
        defineField({
          name: "tags",
          title: "Small tags under the title",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (Rule) => Rule.min(1).max(4),
        }),
      ],
    }),
    intro,
    defineField({
      name: "deployment",
      title: "Deployment models",
      type: "object",
      fields: [
        str("title", "Section heading", 40),
        defineField({
          name: "models",
          title: "The three models",
          type: "array",
          validation: (Rule) => Rule.length(3).error("The section shows exactly three."),
          of: [
            defineArrayMember({
              type: "object",
              fields: [str("title", "Name", 30), body("text", "Description", 240)],
              preview: { select: { title: "title", subtitle: "text" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "standards",
      title: "Standards posture",
      type: "object",
      fields: [
        str("title", "Section heading", 40),
        defineField({
          name: "chips",
          title: "Standards named",
          description: "SOC 2, ISO 27001 and HIPAA need proof before they are listed.",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          validation: (Rule) => Rule.required().min(1).max(12),
        }),
        body("text", "Line under the standards", 320),
      ],
    }),
    relatedRows,
    cta,
  ],
  preview: {
    prepare() {
      return { title: "Enterprise page" };
    },
  },
});
