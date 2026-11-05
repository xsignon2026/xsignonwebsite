// S-13: validation rules for navigation and site settings. Plain functions so they can be unit tested.
import { isNotBlank, type LinkValue } from "./validation";

export const NAV_LABEL_MAX = 30;
export const NAV_ITEMS_MAX = 8;
export const NAV_CHILDREN_MAX = 8;
export const FOOTER_GROUPS_MAX = 6;
export const FOOTER_LINKS_MAX = 10;
export const FOOTER_TITLE_MAX = 30;
export const BANNER_MAX = 140;

// A navigation entry must lead somewhere: its own link, or a dropdown of links.
export function navItemHasDestination(value: {
  link?: LinkValue;
  children?: unknown[];
}): true | string {
  const hasLink = Boolean(value.link?.linkType);
  const hasChildren = Array.isArray(value.children) && value.children.length > 0;
  return hasLink || hasChildren ? true : "Add a link, or add items to the dropdown.";
}

// The announcement banner needs text only when it is switched on.
export function bannerTextIsValid(enabled: unknown, message: unknown): true | string {
  if (!enabled) return true;
  return isNotBlank(message, "Write the banner text, or switch the banner off.");
}
