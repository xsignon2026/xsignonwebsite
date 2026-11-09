import Link from "next/link";
import React from "react";
import { getSiteSettingsData } from "@/lib/site-settings";
import { SubscribeBlock } from "@/components/forms/SubscribeBlock";

// Handoff 5.6 / CSV T-043: Global Footer Server Component.
export async function Footer() {
  const siteSettings = await getSiteSettingsData();

  return (
    <footer
      id="site-footer"
      className="border-t border-d-line bg-footer pt-[60px] pb-[30px] text-on-dark-mut"
    >
      <div className="mx-auto max-w-[1180px] px-8 max-md:px-5">
        {/* Newsletter Subscription Band (T-072) */}
        <div className="mb-14">
          <SubscribeBlock sourcePage="global-footer" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 xl:grid-cols-[1.5fr_repeat(4,1fr)]">
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 text-[22px] font-extrabold tracking-tight text-white"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-acc text-[16px] font-black text-white shadow-sm"
              >
                X
              </span>
              <span className="font-sans font-extrabold tracking-[-0.03em]">XSignOn</span>
              <span className="sr-only"> home</span>
            </Link>
            <p className="max-w-[270px] text-[15px] leading-relaxed text-on-dark-sub">
              Identity, AI governance and quantum-safe security for regulated teams. McKinney,
              Texas.
            </p>
          </div>

          {/* Dynamic Link Groups */}
          {siteSettings.footerGroups.map((group, gIdx) => (
            <div key={gIdx} className="flex flex-col gap-3">
              <h4 className="text-[14px] font-semibold tracking-wide text-white">{group.title}</h4>
              <ul className="flex flex-col gap-[11px]">
                {group.links.map((item, lIdx) => (
                  <li key={lIdx}>
                    {item.link.href ? (
                      <Link
                        href={item.link.href}
                        className="text-[15px] text-on-dark-mut transition-colors duration-150 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-[15px] text-on-dark-mut opacity-60">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright & Bottom Row */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-d-line pt-8 text-[13px] text-on-dark-sub">
          <p>{siteSettings.legalLine || "© 2026 XSignOn. All rights reserved."}</p>
          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-white transition-colors">
              Log in
            </Link>
            <span>McKinney, Texas.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
