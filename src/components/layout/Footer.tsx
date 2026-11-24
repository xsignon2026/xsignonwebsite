import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getSiteSettingsData } from "@/lib/site-settings";

const socials = [
  {
    label: "XSignOn on LinkedIn",
    href: "https://www.linkedin.com/company/xsignon",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.11v5.89h-4v-5.22c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.31h-4V9.75Z",
  },
  {
    label: "XSignOn on X",
    href: "https://twitter.com/xsignon",
    path: "M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.78L17.75 3Zm-1.08 16.17h1.7L7.4 4.74H5.58l11.09 14.43Z",
  },
  {
    label: "XSignOn on GitHub",
    href: "https://github.com/xsignon",
    path: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.9.83.09-.64.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  },
];

// The site footer: brand, blurb and social icons on the left, link columns to the right, and a bottom
// bar with the copyright and the legal links (src/styles/shell.css).
export async function Footer() {
  const siteSettings = await getSiteSettingsData();
  const isLegal = (title: string) => /^legal$/i.test(title);
  const groups = siteSettings.footerGroups.filter((group) => !isLegal(group.title));
  const legal = siteSettings.footerGroups.find((group) => isLegal(group.title));

  return (
    <footer id="footer" data-nav="dark">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Link className="logo" href="/" aria-label="XSignOn home">
              <Image
                className="logo-img on-dark"
                src="/images/logo-dark.png"
                alt="XSignOn - Simplifying cybersecurity"
                width={760}
                height={198}
              />
            </Link>
            <p className="blurb">
              Identity, AI governance and quantum-safe security for regulated teams. McKinney,
              Texas.
            </p>
            <ul className="foot-social" aria-label="Social media">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {groups.map((group) => (
            <div key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((item) => (
                  <li key={item.label}>
                    {item.link.href ? <Link href={item.link.href}>{item.label}</Link> : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foot-base">
          <span>{siteSettings.legalLine || "© 2026 XSignOn. All rights reserved."}</span>
          {legal && (
            <ul className="foot-legal" aria-label="Legal">
              {legal.links.map((item) => (
                <li key={item.label}>
                  {item.link.href ? <Link href={item.link.href}>{item.label}</Link> : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
