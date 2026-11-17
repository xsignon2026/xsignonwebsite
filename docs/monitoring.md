# Error and uptime monitoring (S-18)

## What is in the code

- Sentry reports errors from the browser, server and edge (`src/instrumentation.ts`, `src/instrumentation-client.ts`).
- Reporting is **off** until `NEXT_PUBLIC_SENTRY_DSN` is set. Set it per environment in Vercel; the `environment` tag follows `NEXT_PUBLIC_SITE_ENV`.
- `src/lib/sentry-scrub.ts` runs on every event before it is sent. It removes request bodies (form contents), cookies, query strings (they can carry email-verification tokens), all headers except the user agent, and the user object. Typing breadcrumbs are dropped. Session Replay is not installed, because it records what visitors type. Unit tests cover this.
- The Sentry host is added to the CSP automatically from the DSN (`src/lib/csp.ts`).

## One-time setup (needs the owner's accounts)

1. Create a Sentry project (Next.js). Copy the DSN into `NEXT_PUBLIC_SENTRY_DSN` for Preview and Production.
2. In Sentry > Project Settings > Security & Privacy, turn on **Prevent storing of IP addresses** and **Data scrubbing**.
3. In Sentry > Alerts, create a rule: "any new issue in production" to the **named owner** (write the name here: `_______`).
4. Uptime: create a monitor for the staging URL and the production URL (UptimeRobot, Better Stack or Vercel's own). Check every 1 to 5 minutes, alert the same owner by email and phone.
5. Set `MONITORING_TEST_SECRET` in Vercel (a long random value).

## Prove it works (S-18 done-when)

- **Forced error:** `curl -H "x-monitoring-secret: <value>" https://<site>/api/monitoring-test`. This returns a 500, and the owner receives a Sentry alert. Open the event and confirm there are no form fields, cookies or query strings in it.
- **Forced outage:** pause the Vercel deployment or point the monitor at a wrong path for one cycle, and confirm the owner is alerted.

## Not done yet

- Readable stack traces in Sentry need source maps uploaded at build time (`withSentryConfig` and a `SENTRY_AUTH_TOKEN` in Vercel). Add this before launch.
- Add Sentry to the privacy notice processor list (T-079).
- The `npm audit` count rose by four moderate findings from Sentry's build-time bundler plugin (it depends on an old `glob`). They are build tooling, not shipped to visitors. Recheck at launch.
