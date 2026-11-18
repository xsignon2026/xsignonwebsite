# Connecting the site to Sanity (CMS)

The code is ready: every page below reads its content from Sanity when a project is connected, and shows the built-in default content when it is not. Follow the go-live checklist, then use the rest of this page as a map of what editors can change.

## Go-live checklist (project `1i9fmbpe`, dataset `production`)

Done already: the project and the `production` dataset exist, the content is loaded, the CORS origin
`http://localhost:3000` is added, and Vercel's Sanity connection created a Viewer token
(`SANITY_API_READ_TOKEN`) and an Editor token (`SANITY_API_WRITE_TOKEN`).

### A. In Sanity (sanity.io/manage, project XsignOn Website)

1. **API, CORS origins:** add the address of the new site (your Vercel production address, and the preview address if
   you use previews), each with "Allow credentials" on. Without this, Studio on the live site cannot sign in.
2. **API, Tokens:** delete `local-seed` (it was shared in chat) and, once Vercel no longer needs it, the Editor token
   Vercel created. The live site only reads, so it needs only the Viewer token.
3. **API, Webhooks, Create webhook:**
   - Name: `Refresh website`
   - URL: `https://<your site address>/api/revalidate`
   - Dataset: `production`
   - Trigger on: Create, Update, Delete
   - Filter: leave empty
   - Projection: `{_id, _type, "slug": slug.current}`
   - HTTP method: POST
   - Drafts: off (do not include drafts)
   - Secret: the `SANITY_REVALIDATE_SECRET` value from step B3

### B. On Vercel (project settings, Environment Variables, for Production and Preview)

1. `NEXT_PUBLIC_SANITY_PROJECT_ID` = `1i9fmbpe`
2. `NEXT_PUBLIC_SANITY_DATASET` = `production` (if it is missing the site reads a dataset called `staging` and shows the
   built-in text instead of Sanity's)
3. `SANITY_REVALIDATE_SECRET` = a new long random value. In PowerShell:
   `-join ((48..57)+(97..122) | Get-Random -Count 40 | ForEach-Object {[char]$_})`
   Use a different value from the one in `.env.local`.
4. `SANITY_API_READ_TOKEN` is already there (Viewer).
5. **Remove** `SANITY_API_WRITE_TOKEN` from Vercel.
6. Redeploy (Deployments, the latest one, Redeploy) so the new settings apply.

### C. Prove it works

1. Open `https://<your site address>/studio` and sign in.
2. Open **Homepage**, add the word TEST to the end of the first headline part, and click **Publish**.
3. Reload the home page. The change should appear within a few seconds. Then change it back and publish again.
4. If it does not change: in Sanity, API, Webhooks, open `Refresh website`, and look at its recent attempts. A 401 means the
   secret does not match, a 500 means `SANITY_REVALIDATE_SECRET` is missing on Vercel, and no attempt at all means the
   trigger or dataset is wrong.

### D. Local test of the webhook (done)

The route `/api/revalidate` was tested locally with signed and unsigned calls. Unsigned calls get 401, a signed publish
refreshes the right pages (for example `type:article`, `doc:article-identity-first-controls`,
`slug:article:identity-first-controls`), draft saves are ignored, and a call with no type gets 400.

Never send tokens in chat or commit them. If one is shared by accident, delete it in Sanity and make a new one.

## What the Homepage document controls

| Group in the Studio | What changes on the page |
|---|---|
| 1. Hero | Label, headline, description, the two buttons |
| 2. Hero card | The rotating slides: label, heading, one-liner, button, look of the picture |
| 3. Standards strip | The names that scroll under the hero |
| 4. Security Ecosystem | Heading and the four blocks |
| 5. What XSignOn does | Heading, link and the four panels |
| 6. Contact block | Heading and button |

Also in the CMS: the "About page" document (same steps; seed it with `node scripts/seed-sanity.mjs --write --only=about`).

Also in the CMS: the "Products page" document (title, three new launches, five cards, contact block; seed with `--only=productsPage`), and the six product pages (PostureOne, Passwordless Keys, EvalOne, XSense, AMS, XSignOn Mesh), each a "Product" document. Anything left empty keeps the built-in text. Seed with `node scripts/seed-sanity.mjs --write --only=product`.

Also in the CMS: the "Our thinking page" document (hub title, featured article, article cards, contact block; seed with `--only=insightsPage`). The five article pages are "Article" documents too (heading, sections with pull quotes, related strip, closing heading); edits there change the article page but not the hub cards above.

Also in the CMS: the "Careers page" document and the open roles ("Career / Job Posting" documents; switch "Currently active" off to close a role, and the About page follows), then the "Solutions page" document (title, Enterprise band, standards named, contact block; seed with `--only=solutionsPage`), and the five solution pages ("Solution" documents: challenge, checklist, related rows, closing heading; the Solutions hub cards are built from them).

Also in the CMS: the four case study pages ("Case Study" documents). They only show the edited version once Approval status is Approved; the Proof hub list is still in the code.

Also in the CMS: the Proof page, the Contact page, the Privacy Policy and Terms (legal pages: switch off the placeholder tag once legal review is done), and the white paper text (the private file and the gating stay in the code on purpose).

Also in the CMS: the Industry Thinking page, the Compare page (the whole table: columns, rows and values) and the Enterprise page (the dashboard picture stays in the code, and its sample figures are not editable).

Not yet in the CMS: new articles (only the five existing ones can be edited for now), the ROI calculator pages, the Passwordless Keys model pages, the style guide, and the newsletter and contact form wording.

## If something is empty or wrong

Any part left empty falls back to the built-in default for that part, so the page cannot break. The default content lives in `src/data/home-content.ts`.

## Writing rules for editors

Follow the XSignOn content skill (`.claude/skills/xsignon-content`): plain words, one idea per sentence, no number, certification, customer or partner name that has not been confirmed.
