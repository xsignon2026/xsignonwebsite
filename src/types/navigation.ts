export type NavLink = {
  linkType: "internal" | "external" | "file";
  href: string | null; // null when internal reference has no resolvable slug yet
};

export type NavChild = {
  label: string;
  link: NavLink;
  /** Shown in the phone menu only (the prototype's desktop dropdowns are shorter). */
  mobileOnly?: boolean;
};

export type NavItem = {
  label: string;
  link?: NavLink | null; // optional — item may be dropdown-only
  children?: NavChild[]; // empty array if no dropdown
  /** A small "cross-link" line at the bottom of the desktop dropdown. */
  crossLink?: { label: string; href: string };
};

export type NavigationData = {
  items: NavItem[];
};
