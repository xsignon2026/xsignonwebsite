import * as Sentry from "@sentry/nextjs";
import { sentryOptions } from "@/lib/sentry-scrub";

// S-18: server and edge error reporting.
export function register() {
  Sentry.init(sentryOptions);
}

export const onRequestError = Sentry.captureRequestError;
