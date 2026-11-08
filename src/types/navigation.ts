export type NavLink = {
  linkType: "internal" | "external" | "file";
  href: string | null; // null when internal reference has no resolvable slug yet
};

export type NavChild = {
  label: string;
  link: NavLink;
};

export type NavItem = {
  label: string;
  link?: NavLink | null; // optional — item may be dropdown-only
  children?: NavChild[]; // empty array if no dropdown
};

export type NavigationData = {
  items: NavItem[];
};
