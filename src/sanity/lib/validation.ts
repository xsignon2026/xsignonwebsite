// S-12: validation rules shared by every schema. Kept as plain functions so they can be unit tested.
// Each returns true when the value is fine, or a message the editor sees.

export const SEO_TITLE_MAX = 60;
export const SEO_DESCRIPTION_MAX = 160;
export const CTA_LABEL_MAX = 40;
export const ALT_TEXT_MAX = 140;

// Only these schemes may be linked from the CMS. This blocks javascript:, data: and plain http.
const ALLOWED_SCHEMES = ["https:", "mailto:", "tel:"];

export function isAllowedExternalUrl(value: unknown): true | string {
  if (value === undefined || value === null || value === "") return true;
  if (typeof value !== "string") return "Enter a web address.";
  const text = value.trim();
  if (text !== value) return "Remove spaces before or after the address.";
  let url: URL;
  try {
    url = new URL(text);
  } catch {
    return "Enter a full address that starts with https://, mailto: or tel:.";
  }
  if (!ALLOWED_SCHEMES.includes(url.protocol)) {
    return "Only https://, mailto: and tel: links are allowed.";
  }
  if (url.protocol === "https:" && !url.hostname.includes(".")) {
    return "That web address looks incomplete.";
  }
  return true;
}

// Text that is only spaces counts as empty, so a required field cannot be satisfied with a blank.
export function isNotBlank(value: unknown, message = "This field is required."): true | string {
  return typeof value === "string" && value.trim().length > 0 ? true : message;
}

export type LinkValue = {
  linkType?: "internal" | "external" | "file";
  internal?: { _ref?: string };
  external?: string;
  file?: { asset?: { _ref?: string } };
};

// The problem with one field of a link, or true. Only the field that matches the chosen type is checked,
// so a stale value left over from another type is ignored. An absent link passes: whether a link is
// required is decided by the field that holds it.
export function linkFieldError(
  field: "internal" | "external" | "file",
  parent: LinkValue | undefined,
): true | string {
  if (!parent || parent.linkType !== field) return true;
  return linkIsComplete(parent);
}

// A link must fill in the field that matches its chosen type. No link at all is fine.
export function linkIsComplete(value: LinkValue | undefined): true | string {
  if (!value) return true;
  if (!value.linkType) return "Choose a link type.";
  if (value.linkType === "internal") {
    return value.internal?._ref ? true : "Choose the page to link to.";
  }
  if (value.linkType === "external") {
    return value.external ? true : "Enter the web address.";
  }
  return value.file?.asset?._ref ? true : "Upload the file to link to.";
}
