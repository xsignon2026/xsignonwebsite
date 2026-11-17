import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getSiteSettingsData } from "@/lib/site-settings";

// The site footer, built from the prototype's markup and classes (src/styles/shell.css).
export async function Footer() {
  const siteSettings = await getSiteSettingsData();

  return (
    <footer id="footer" data-nav="dark">
      <div className="wrap">
        <div className="foot-grid">
          <div>
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
          </div>

          {siteSettings.footerGroups.map((group) => (
            <div key={group.title}>
              <h4>{group.title}</h4>
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
          <span>McKinney, Texas</span>
        </div>
      </div>
    </footer>
  );
}
