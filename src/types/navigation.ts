export type NavLink = {
  linkType: "internal" | "external" | "file";
  href: string | null; // null when internal reference has no resolvable slug yet
};

export type NavChild = {
  label: string;
  link: NavLink;
  /** One short line shown under the name in the menu. */
  description?: string;
};

/** The picture card on the right of a menu panel. */
export type NavFeatured = {
  eyebrow: string;
  title: string;
  href: string;
  image: { src: string; alt: string };
};

export type NavItem = {
  label: string;
  link?: NavLink | null; // optional — item may be dropdown-only
  children?: NavChild[]; // empty array if no dropdown
  /** The picture card on the right of the menu panel. */
  featured?: NavFeatured;
  /** The link along the bottom of the menu panel, for example "All products". */
  footerLink?: { label: string; href: string };
};

export type NavigationData = {
  items: NavItem[];
};
