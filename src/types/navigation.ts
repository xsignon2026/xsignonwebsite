export type NavLink = {
  linkType: "internal" | "external" | "file";
  href: string | null; // null when internal reference has no resolvable slug yet
};

export type NavChild = {
  label: string;
  link: NavLink;
  /** One short line shown under the name in the menu. */
  description?: string;
  /** A small tag after the name, for example NEW or FREE. */
  badge?: string;
};

/** A labelled group of links inside a menu panel. */
export type NavSection = {
  heading?: string;
  items: NavChild[];
  /** Spans the whole width of the panel, with its links in a row. */
  wide?: boolean;
  /** Links per row inside the group (default 1). */
  columns?: number;
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
  children?: NavChild[]; // a plain list of links; "sections" is used instead when it is set
  /** The menu as labelled groups. Every menu panel is laid out the same way. */
  sections?: NavSection[];
  /** The picture card on the right of the menu panel. */
  featured?: NavFeatured;
  /** The link along the bottom of the menu panel, for example "All products". */
  footerLink?: { label: string; href: string };
};

export type NavigationData = {
  items: NavItem[];
};
