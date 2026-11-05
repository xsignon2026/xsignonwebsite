import { defineField } from "sanity";
import { NAV_LABEL_MAX } from "../../lib/site-validation";
import { isNotBlank } from "../../lib/validation";

// The "label" shared by menu items, dropdown items and footer links.
export const labelField = defineField({
  name: "label",
  title: "Label",
  type: "string",
  validation: (Rule) =>
    Rule.custom((value) => isNotBlank(value, "A label is required.")).max(NAV_LABEL_MAX),
});
