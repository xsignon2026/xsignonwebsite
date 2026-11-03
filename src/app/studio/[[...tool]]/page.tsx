import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

// S-11: embedded Sanity Studio at /studio. The metadata export sets noindex.
export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ padding: 32, fontFamily: "system-ui" }}>
        <h1>Sanity is not configured</h1>
        <p>Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET, then restart.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
