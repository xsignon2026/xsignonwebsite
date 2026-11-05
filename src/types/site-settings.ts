import type { NavLink } from "./navigation";

export type FooterLink = {
  label: string;
  link: NavLink;
};

export type FooterGroup = {
  title: string;
  links: FooterLink[];
};

export type SiteSettingsData = {
  headerCta: {
    label: string;
    link: NavLink;
  } | null;
  footerGroups: FooterGroup[];
  legalLine: string;
};
