# Runbook (S-21)

For whoever is on call. Written so either developer can run the site from this page.

## Who to contact

Fill in the names before the S-22 gate. A blank row is a gap to fix.

| System                                | What it does                            | Owner | Backup | Where to log in       |
| ------------------------------------- | --------------------------------------- | ----- | ------ | --------------------- |
| GitHub (`xsignon2026/xsignonwebsite`) | Code, CI, reviews                       |       |        | github.com            |
| Vercel                                | Hosting, deploys, environment variables |       |        | vercel.com            |
| Sanity                                | Content, studio, webhook, tokens        |       |        | sanity.io/manage      |
| Sentry                                | Error reports and alerts                |       |        | sentry.io             |
| Uptime monitor                        | Outage alerts                           |       |        | (tool chosen in S-18) |
| Domain and DNS                        | Address of the site                     |       |        | (registrar)           |
| Client contact                        | Content and approvals                   |       |        |                       |

## Set up on a fresh machine

1. Install Node 22 (see `.nvmrc`), for example with nvm.
2. `git clone https://github.com/xsignon2026/xsignonwebsite.git` then `cd xsignonwebsite`.
3. `npm ci` (installs exactly what `package-lock.json` says).
4. Copy `.env.example` to `.env.local` and fill in the Sanity project ID. The values are listed in the README.
5. `npm run dev` and open http://localhost:3000. Open `/studio` and sign in to edit content.
6. Check it works: `npm run lint && npm run typecheck && npm run test`.

## Deploy

- Every pull request gets a Preview deployment from Vercel with a link on the pull request.
- Merge to `staging` deploys Staging. Merge to `main` deploys Production.
- Before merging to `main`: CI is green, another developer approved, and the Preview was checked.
- After a Production deploy: open the home page, `/studio`, and one content page. Check Sentry for new errors in the first 15 minutes.

## Roll back a bad deploy

Fastest, no code change:

1. Vercel > the project > Deployments.
2. Find the last good Production deployment, open its menu and choose **Promote to Production** (or **Instant Rollback**).
3. Tell the team, then fix the problem in a pull request. Do not leave the rollback unexplained: Vercel stops auto-assigning new deploys to Production until you promote again.

If the cause is a code change, also revert it on `main`: `git revert <commit>` in a pull request.

If the cause is an environment variable, correct it in Vercel and redeploy. A rolled-back deployment keeps the variables it was built with.

## Content problems

### An editor published something wrong

Open the document in the studio > the clock icon (history) > pick the earlier version > restore it and publish. History is kept by Sanity per document; check how long on the current plan.

### Content must be restored from a backup

Export regularly. This writes every document and image to one file:

```bash
npx sanity dataset export production backups/production-YYYY-MM-DD.tar.gz
```

Restore into the **staging** dataset first and check it:

```bash
npx sanity dataset import backups/production-YYYY-MM-DD.tar.gz staging --replace
```

Only restore into `production` after the staging check, and tell the client first. `--replace` overwrites documents with the same ID.

Open items for the owner (S-22):

- Decide how often to export and where to keep the files (private storage, not the repository).
- Confirm whether the current Sanity plan includes automatic backups. If it does not, scheduled exports are the only backup, and this must change before launch.
- Run one restore into staging to prove the steps work, and record the date here: `__________`.

### The site shows old content after publishing

1. In Sanity > API > Webhooks open the webhook and its delivery log. A 401 means the secret differs from `SANITY_REVALIDATE_SECRET` in Vercel. A 500 means that variable is missing.
2. Details: [cms-webhook.md](cms-webhook.md).

### Preview of drafts does not open

Check that `SANITY_API_READ_TOKEN` is set in Vercel and that the site address is listed under Sanity > API > CORS origins. Details: S-15 in the commit history and `src/app/api/draft-mode`.

## Incidents

| Symptom                               | First look                                                                                            |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Site down                             | Uptime alert. Vercel > Deployments for a failed deploy. Roll back if the last deploy is the cause     |
| Error spike                           | Sentry issue, then the release or change that matches the first time seen                             |
| Slow pages                            | Last deploy; Lighthouse report from CI; large images added in the studio                              |
| Wrong or missing environment variable | Vercel > Settings > Environment Variables, per environment                                            |
| A secret may have leaked              | Rotate it at the source first (Sanity token, webhook secret, Sentry), then update Vercel and redeploy |

## Routine checks

- Weekly: Sentry open issues; npm security alerts on GitHub (Dependabot).
- Before each launch gate: run `npm run e2e` and `npm run lhci` locally or read the CI result.
