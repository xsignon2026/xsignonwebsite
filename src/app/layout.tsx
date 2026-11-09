import type { Metadata } from "next";
import { isProduction, siteUrl } from "@/lib/site";
import { SkipLink } from "@/components/layout/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuestionsWidget } from "@/components/layout/QuestionsWidget";
import { WebVitals } from "@/components/common/WebVitals";
import { JsonLd } from "@/components/common/JsonLd";
import { createOrganizationSchema } from "@/lib/schema-org";
import { Inter } from "next/font/google";
import "./globals.css";

// S-09: Inter is downloaded at build time and served from our own address (no request to Google when a
// visitor opens a page), which our security policy requires.
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
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
        <QuestionsWidget />
        <WebVitals />
      </body>
    </html>
  );
}
