# Publish-to-live webhook (S-16)

When an editor publishes, changes or deletes content, Sanity calls `POST /api/revalidate` and the site refreshes the affected pages.

## Set up in Sanity (once per environment)

1. Generate a secret: `openssl rand -hex 32`. Set it as `SANITY_REVALIDATE_SECRET` in Vercel (Preview and Production separately).
2. sanity.io/manage > API > Webhooks > Create webhook:
   - **URL:** `https://<site>/api/revalidate`
   - **Dataset:** the one that matches the environment (staging or production)
   - **Trigger on:** Create, Update, Delete
   - **Filter:** leave empty, or `!(_id in path("drafts.**")) && !(_id in path("versions.**"))` to skip drafts and release versions (the route ignores them either way)
   - **Projection:** `{_id, _type, "slug": slug.current, "previousSlug": before().slug.current}` (`previousSlug` lets a renamed page's old address refresh; it needs a webhook that includes the before state)
   - **HTTP method:** POST. **Secret:** the value from step 1.
3. Publish a test document and check the webhook's delivery log for a 200.

## Behavior

| Event                                                                              | Result                                                                                                                                                |
| ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Valid signature, published document                                                | Refreshes `type:<type>`, `doc:<id>`, `slug:<type>:<slug>` and dependents                                                                              |
| Draft saved                                                                        | Ignored (200, no tags)                                                                                                                                |
| Missing, wrong or malformed signature, or a delivery older than 5 minutes (replay) | 401, nothing refreshed. The signature is checked on the raw text before any JSON parsing                                                              |
| Body over 64 KB                                                                    | 413, nothing refreshed                                                                                                                                |
| No `SANITY_REVALIDATE_SECRET` set                                                  | 500, nothing refreshed                                                                                                                                |
| New page                                                                           | Its type tag refreshes, so listings pick it up                                                                                                        |
| Unpublished or deleted page                                                        | Same tags refresh; the page then returns 404 and listings drop it                                                                                     |
| Renamed page (slug change)                                                         | The new address is fetched fresh; listings refresh through the type tag. Old address should get a redirect (T-146 redirect map, T-147 implementation) |

## Adding a new content type

1. Tag its reads: `sanityFetch({ query, tags: ["type:product"] })`.
2. If it appears on other pages, add it to `DEPENDENTS` in `src/sanity/lib/revalidation.ts` and add a test.
