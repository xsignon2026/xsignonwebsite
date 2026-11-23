import type { Metadata } from "next";
import Link from "next/link";
import { HeroDomainScan } from "@/components/home/HeroDomainScan";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free Domain Check",
  description:
    "Check your domain's email security and website basics, free: SPF, DMARC, DKIM, mail servers, blocklists, DNSSEC and CAA.",
  path: "/domain-check",
});

export default function DomainCheckPage() {
  return (
    <div id="view-domain-check">
      <section className="page-hero" data-nav="dark">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span className="sep">/</span>
            <Link href="/products">Products</Link>
            <span className="sep">/</span>
            <span className="cur">Free Domain Check</span>
          </nav>
          <h1 className="h-display">Free domain check</h1>
          <p className="lede" style={{ maxWidth: "620px", marginTop: "18px", color: "#c9c5e3" }}>
            Enter your domain or a work email. The check reads your SPF, DMARC and DKIM records,
            tests your mail servers and blocklists, looks at DNSSEC and CAA, checks your website,
            and gives you a score. It can take up to a minute.
          </p>
          <HeroDomainScan />
        </div>
      </section>
    </div>
  );
}
