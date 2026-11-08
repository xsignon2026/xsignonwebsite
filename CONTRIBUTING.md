# Contributing

## Folders

| Folder                  | What goes in it                           |
| ----------------------- | ----------------------------------------- |
| `src/app`               | Routes and pages                          |
| `src/components/ui`     | Small building blocks: Button, ButtonLink |
| `src/components/layout` | Container, Section, Header, Footer        |
| `src/components/blocks` | Page sections built from CMS content      |
| `src/lib`               | Helpers and data fetching                 |
| `src/sanity`            | CMS schemas, client and queries           |
| `src/styles`            | Design tokens and global CSS              |
| `src/tests`             | Unit and end-to-end tests                 |

## Naming

- Components: PascalCase file and export (`HeroBanner.tsx`, `export function HeroBanner`)
- Other files and folders: kebab-case (`format-date.ts`)
- One component per file
- CSS variables: `--color-*`, `--text-*`, `--spacing-*`, `--radius-*`, `--shadow-*`
- Branches: `<task-id>-<short-name>`, for example `s08-tokens`
- Commits: start with the task ID, for example `S-08 add colour tokens`

## Workflow

- Use npm for every install and script (`npm install <package>`, `npm run dev`). Commit `package-lock.json` whenever it changes.
- Never push to main. Open a pull request for every change.
- The other developer reviews and the PR checklist is filled in.
- Update the task status in SharePoint before the daily sync.
