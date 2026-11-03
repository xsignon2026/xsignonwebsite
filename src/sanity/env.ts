// S-11: Sanity settings come from environment variables (see .env.example).
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "staging";
export const apiVersion = "2026-11-01";
export const isSanityConfigured = projectId.length > 0;
