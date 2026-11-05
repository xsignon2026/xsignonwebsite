// S-18: keep personal data and form contents out of error reports. Plain functions so they can be tested.
import type { Breadcrumb, ErrorEvent } from "@sentry/nextjs";

// Replaces anything a visitor could have typed. Applied to every event before it leaves the site.
export function scrubEvent<T extends ErrorEvent>(event: T): T {
  if (event.request) {
    delete event.request.data; // form and JSON request bodies
    delete event.request.cookies;
    delete event.request.query_string; // can hold tokens, for example email verification links
    if (event.request.headers) {
      const { "user-agent": userAgent } = event.request.headers;
      event.request.headers = userAgent ? { "user-agent": userAgent } : {};
    }
    if (event.request.url) event.request.url = event.request.url.split("?")[0];
  }
  delete event.user;
  return event;
}

// Typing and form-field changes never become breadcrumbs.
export function scrubBreadcrumb(breadcrumb: Breadcrumb): Breadcrumb | null {
  if (breadcrumb.category === "ui.input") return null;
  // Request breadcrumbs use "url"; navigation breadcrumbs use "from" and "to". All can carry tokens.
  for (const key of ["url", "from", "to"]) {
    const value = breadcrumb.data?.[key];
    if (breadcrumb.data && typeof value === "string") breadcrumb.data[key] = value.split(/[?#]/)[0];
  }
  return breadcrumb;
}

// Shared by the browser, server and edge setups.
export const sentryOptions = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  environment: process.env.NEXT_PUBLIC_SITE_ENV ?? "development",
  sendDefaultPii: false,
  tracesSampleRate: 0, // errors only; performance tracing is not part of S-18
  beforeSend: scrubEvent,
  beforeBreadcrumb: scrubBreadcrumb,
};
