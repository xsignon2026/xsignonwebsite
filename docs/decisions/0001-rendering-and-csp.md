# 0001: Rendering and Content Security Policy (S-17)

**Status:** Decided for the build phase. Revisit at T-161 (final security headers) with measurements.
**Date:** 2026-11-05
**Owner:** Developer A (security), with Developer B (rendering)

## The conflict

A strict CSP that blocks inline scripts needs a fresh random nonce on every response. A nonce means every page is rendered per request, which turns off prerendered static pages and the partial-prerender shell we use (`cacheComponents`). The cost is slower first byte and no CDN-cached HTML.

## Options

| Option                                                                          | Security                                                                                                                       | Performance                                                   | Cost to build                                                          |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| A. Nonce-based CSP in a proxy; all pages dynamic                                | Strongest: blocks injected inline script                                                                                       | Slowest. No static HTML. Hurts the Lighthouse budgets (T-097) | Medium                                                                 |
| **B. Static header CSP, `'unsafe-inline'` for scripts, everything else strict** | Good. Blocks all outside script sources, plugins, framing, base-tag and form hijacks. Does not block an injected inline script | Fastest. Pages stay static or partially prerendered           | Low                                                                    |
| C. Hash-based CSP (Next `sri` / script hashes)                                  | Strong, no per-request work                                                                                                    | Static pages kept                                             | Higher. Experimental, ties to the bundler, breaks on each build change |

## Decision

**Option B now.** Reasons:

- The site is a marketing site. There is no user-generated HTML. CMS rich text is stored as structured data and rendered by React, which escapes text. The route to injecting inline script is narrow.
- The performance budgets (T-097, Gate G5) are a stated requirement, and nonce rendering works against them.
- Tight rules on everything else still remove most of the risk: no outside script hosts, `object-src 'none'`, `frame-ancestors 'self'`, `form-action 'self'`, locked `connect-src`.

**Revisit trigger:** at T-161, measure Option C on a production build. If hashes work with the Next version in use, switch to C. Move to A only if a security review requires it and the performance cost is accepted in writing.

## Performance cost of the chosen option

None measured, because pages stay static. Option A would remove prerendered HTML for every route; its cost must be measured before anyone proposes it.

## Scripts and hosts that must be allowed

Public site (`src/lib/csp.ts`, `SITE_SOURCES`):

| Directive       | Allowed                                             | Why                                                                                                    |
| --------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| script-src      | `'self'`, `'unsafe-inline'`                         | Our bundles, and Next.js inline bootstrap scripts. `'unsafe-eval'` in development only (React refresh) |
| style-src       | `'self'`, `'unsafe-inline'`                         | Next.js and Tailwind output inline styles                                                              |
| img-src         | `'self'`, `data:`, `blob:`, `https://cdn.sanity.io` | Own images, Sanity-hosted images                                                                       |
| font-src        | `'self'`                                            | Inter is self-hosted by `next/font` (S-09)                                                             |
| connect-src     | `'self'`, `https://*.sanity.io`                     | Sanity content API                                                                                     |
| frame-ancestors | `'self'`                                            | The studio previews the site in a frame (S-15)                                                         |

Embedded studio (`/studio`, `STUDIO_SOURCES`): adds `wss://*.sanity.io`, the script `https://core.sanity-cdn.com` (studio bridge), `https://*.sanity-cdn.com` assets and fonts from `https://*.sanity.io` (Inter from `design-system-static.sanity.io`). Found by loading `/studio` in a browser and reading the blocked-resource errors.

## Not yet allowed (add with a line in this file)

These are planned but have no host in the policy yet. Each one must be added here when it is chosen:

- Error monitoring (S-18): the Sentry ingest host in `connect-src`.
- Analytics (T-135): loads only after consent; its script host and endpoint.
- Spam protection on forms (T-055, if a hosted widget is used): script host and frame host.
- Video or other embeds, if the client wants them.

## Things this decision does not cover

- HSTS, referrer, permissions and frame headers: T-161.
- A CSP violation report endpoint: add at T-161 so that a rollout in report-only mode is possible.
