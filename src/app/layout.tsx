import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { isProduction, siteUrl } from "@/lib/site";
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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
