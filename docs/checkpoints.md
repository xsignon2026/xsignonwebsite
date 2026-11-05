# Checkpoints

After every 5 completed tasks, stop and run all three checks before starting the next task:

1. **Security audit** (`security-guard` agent): secrets, input handling, auth, headers, dependencies, CI, abuse.
2. **Senior review** (`senior-reviewer` agent): every automated check run, connected code read, project rules checked.
3. **Ponytail review** (`/ponytail-review`): is every line needed, is anything over-built.

Fix every blocker and high finding before the next task. Log medium and low findings as tasks with an owner. Record the checkpoint below.

Why: this is a security company's public website. A steady rhythm finds problems while they are small.

## Log

| #   | Tasks covered                | Security audit                                       | Senior review | Ponytail review | Findings fixed                    | Date       |
| --- | ---------------------------- | ---------------------------------------------------- | ------------- | --------------- | --------------------------------- | ---------- |
| 1   | S-12, S-13, S-15, S-16, S-17 | Done 2026-11-05: 0 blockers, 5 findings              | Pending       | Pending         | All 5 fixed on `security-fixes-1` | 2026-11-05 |
| 2   | S-18, S-19, S-20, S-21, S-22 | Done 2026-11-05 (one audit covered the whole branch) | Pending       | Pending         | See row 1                         | 2026-11-05 |

Audit findings fixed: error spam through the webhook and draft-mode routes (now 401 before any parsing or Sanity call), site CSP skipping paths that start with "studio", missing nosniff, referrer and permissions headers, `X-Powered-By`, webhook replay and non-constant-time compare, Sentry navigation breadcrumbs, monitoring-test compare, CI token permissions.
Still open from the audit (before launch): HSTS and final headers (T-161), tighten Sanity hosts in the CSP to the exact project host (T-161), pin Actions to commit SHAs, human checks listed in the G1 document. When the link renderer is built (T-052), it must re-check link schemes, because Studio validation does not apply to API-written content.

Next checkpoint is due after the fifth task that follows S-22 (counting T-051 onward).
