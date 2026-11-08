export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV ?? "development";
export const isProduction = siteEnv === "production";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
