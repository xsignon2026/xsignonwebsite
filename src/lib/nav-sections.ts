import type { NavItem, NavSection } from "@/types/navigation";

/** The groups of links a menu shows: its sections, or its plain list of links as one group. */
export function navSections(item: NavItem): NavSection[] {
  const usable = (item.sections ?? [])
    .map((section) => ({
      ...section,
      items: section.items.filter((child) => Boolean(child.link.href)),
    }))
    .filter((section) => section.items.length > 0);
  if (usable.length > 0) return usable;
  const links = (item.children ?? []).filter((child) => Boolean(child.link.href));
  return links.length > 0 ? [{ items: links }] : [];
}
