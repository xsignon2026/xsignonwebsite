import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { isProduction, siteUrl } from "@/lib/site";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner } from "@/components/common/ConsentBanner";
import { WebVitals } from "@/components/common/WebVitals";
import { JsonLd } from "@/components/common/JsonLd";
import { createOrganizationSchema } from "@/lib/schema-org";
import "./globals.css";

// S-09: self-hosted Inter. next/font downloads it at build time, so browsers never call Google.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "XSignOn", template: "%s | XSignOn" },
  description: "XSignOn",
  // S-07: noindex everywhere except production.
  robots: isProduction ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen">
        <JsonLd schema={createOrganizationSchema()} />
        <SkipLink />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <ConsentBanner />
        <WebVitals />
      </body>
    </html>
  );
}
