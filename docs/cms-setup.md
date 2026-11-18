# Connecting the site to Sanity (CMS)

Do these steps once. The code is ready: the home page reads its content from Sanity when a project is connected, and shows the built-in default content when it is not.

## What you do (about 15 minutes)

1. **Create the project.** Go to https://sanity.io/manage, sign in, choose "Create new project", name it "XSignOn". Choose the free plan. Copy the **Project ID**.
2. **Datasets.** Your project uses `production` (set in `.env.local` as `NEXT_PUBLIC_SANITY_DATASET=production`). Add a `staging` dataset later if you want a safe place to test.
3. **Allow the site to talk to it (CORS).** Project, API, CORS origins: add `http://localhost:3000`, your Vercel preview address, and `https://xsignon.com` (turn on "Allow credentials" for each).
4. **Make two tokens.** Project, API, Tokens:
   - `xsignon-site-read` with the **Viewer** role. This is `SANITY_API_READ_TOKEN`. It lets editors preview drafts.
   - `xsignon-seed-write` with the **Editor** role. This is `SANITY_API_WRITE_TOKEN`. Used once to load content. Delete it afterwards.
5. **Add the settings.**
   - Locally, in a file called `.env.local` in the project folder: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET=production`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`.
   - On Vercel (project settings, Environment Variables): the same names, except **do not** add the write token there.
   - Make up a long random string for `SANITY_REVALIDATE_SECRET` and add it in both places.
6. **Load the starting content.** In the project folder run `node scripts/seed-sanity.mjs` to preview, then `node scripts/seed-sanity.mjs --write` to save. This creates the "Homepage" document.
7. **Set up the webhook** so edits go live. Project, API, Webhooks, create: URL `https://<your site>/api/revalidate`, trigger on create, update and delete, include drafts **off**, and the secret from step 5.
8. **Open the Studio** at `/studio` on the site, sign in, and open "Homepage". Edit a headline, publish, and reload the home page.

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

Also in the CMS: the five solution pages ("Solution" documents: challenge, checklist, related rows, closing heading; the Solutions hub cards are still in the code).

Also in the CMS: the four case study pages ("Case Study" documents). They only show the edited version once Approval status is Approved; the Proof hub list is still in the code.

Not yet in the CMS (next passes): new articles (only the five existing ones can be edited for now), the Products page and product pages, solutions, articles, careers, legal pages.

## If something is empty or wrong

Any part left empty falls back to the built-in default for that part, so the page cannot break. The default content lives in `src/data/home-content.ts`.

## Writing rules for editors

Follow the XSignOn content skill (`.claude/skills/xsignon-content`): plain words, one idea per sentence, no number, certification, customer or partner name that has not been confirmed.
