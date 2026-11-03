# xsignon-web

![CI](https://github.com/xsignon2026/xsignonwebsite/actions/workflows/ci.yml/badge.svg)

The new XSignOn website: Next.js (App Router), TypeScript, Tailwind CSS v4 and Sanity, hosted on Vercel.

## Versions

| Tool        | Version                |
| ----------- | ---------------------- |
| Node        | 22.23.4 (minimum 20.9) |
| pnpm        | 10.28.0                |
| next        | 16.4.4                 |
| react       | 19.3.0                 |
| typescript  | 5.9.3                  |
| tailwindcss | 4.3.4                  |
| sanity      | 6.21.0                 |
| next-sanity | 13.4.0                 |

## Run it locally

1. Install Node LTS and pnpm (`npm install -g pnpm`).
2. Copy `.env.example` to `.env.local` and fill in the Sanity project ID.
3. Install and start:

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000. Useful pages while building:

- `/tokens`: every design token, to compare with the design file (S-08)
- `/styleguide`: base styles and primitives on light and dark bands (S-10)
- `/studio`: the embedded Sanity Studio (S-11)

## Scripts

| Command          | What it does         |
| ---------------- | -------------------- |
| `pnpm dev`       | Local dev server     |
| `pnpm build`     | Production build     |
| `pnpm lint`      | ESLint               |
| `pnpm typecheck` | TypeScript check     |
| `pnpm test`      | Unit tests (Vitest)  |
| `pnpm format`    | Format with Prettier |

## Environments

| Environment | Branch             | Sanity dataset | Indexed by search engines |
| ----------- | ------------------ | -------------- | ------------------------- |
| Preview     | every pull request | staging        | no                        |
| Staging     | `staging`          | staging        | no                        |
| Production  | `main`             | production     | yes                       |

`NEXT_PUBLIC_SITE_ENV` must be `production` only on Production. Anything else gets `noindex` and a robots `Disallow: /`.

Staging and Preview must only use test services: a test inbox, a test CRM and a test mailing list. Only Production gets the real integration keys.

Only variables starting with `NEXT_PUBLIC_` reach the browser. Never put a secret in one.

## Workflow

See [CONTRIBUTING.md](CONTRIBUTING.md). Never push to main: open a pull request and get the other developer's review.
