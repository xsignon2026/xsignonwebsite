import React from "react";
import { serializeJsonLd } from "@/lib/schema-org";

interface JsonLdProps {
  schema: unknown;
}

/**
 * T-151 & T-163: Safe JSON-LD script renderer with strict script tag sanitization
 * to prevent XSS breakout vulnerabilities.
 */
export function JsonLd({ schema }: JsonLdProps) {
  const jsonString = serializeJsonLd(schema);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonString }} />;
}
