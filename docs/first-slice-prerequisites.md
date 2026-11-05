# First-slice prerequisites (T-041 to T-062)

The workbook says task IDs "match the earlier SharePoint task list" and that Depends on can point to Discovery and foundation tasks in that list. Ten of those earlier tasks are needed by the first slice. They may already be done. This page is where each one is linked to its SharePoint row, given an owner, and given evidence. Batch 1 does not start until every row below has evidence or a replacement task.

I do not know the titles of these tasks, only what depends on them. Fill the "SharePoint title" column from the list.

| Task  | Needed by                    | What the first slice needs from it (inferred) | SharePoint title | Owner | Evidence or replacement task | Status                                               |
| ----- | ---------------------------- | --------------------------------------------- | ---------------- | ----- | ---------------------------- | ---------------------------------------------------- |
| T-010 | T-055, T-057                 | Email provider or CRM chosen                  |                  |       |                              | Unknown                                              |
| T-016 | T-057                        | Sending domain and delivery ownership         |                  |       |                              | Unknown                                              |
| T-019 | T-053                        | Approved PostureOne copy and evidence         |                  |       |                              | Unknown                                              |
| T-024 | T-055                        | Private data store chosen                     |                  |       |                              | Unknown (plan default D1: Postgres on Neon)          |
| T-025 | T-060                        | Test CRM and test inbox for staging           |                  |       |                              | Unknown                                              |
| T-028 | T-041, T-043 to T-049, T-054 | Shared component and shell foundation         |                  |       |                              | Unknown (the S-08 to S-10 work may cover part of it) |
| T-030 | T-051                        | CMS content model                             |                  |       |                              | Unknown (S-12 and S-13 cover shared types only)      |
| T-031 | T-041, T-043                 | Navigation and footer content model           |                  |       |                              | Unknown (S-13 covers the schema)                     |
| T-034 | T-061                        | Test plan or test accounts for the journey    |                  |       |                              | Unknown                                              |
| T-036 | T-056                        | Failure alert path and owner                  |                  |       |                              | Unknown (plan default D6)                            |

Also record, before Batch 1:

- **G0 (scope sign-off, T-020):** who signs, and the date. Outside the ten above, but the first slice assumes it.
- **G1 (this repo's foundation review):** two named signers. The repo evidence is in `docs/gate-g1-foundation-review.md`. Controls that exist only in a web console (branch protection, staging access, CMS permissions, alert delivery) are marked HUMAN there and must be checked in the real accounts, not assumed from code.
- **Tracker:** `docs/setup-status.csv` proposes a status for every S task from the repository evidence. Setup tasks are all "Not started" in the workbook today.
