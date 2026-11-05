# Checkpoints

After every 5 completed tasks, stop and run all three checks before starting the next task:

1. **Security audit** (`security-guard` agent): secrets, input handling, auth, headers, dependencies, CI, abuse.
2. **Senior review** (`senior-reviewer` agent): every automated check run, connected code read, project rules checked.
3. **Ponytail review** (`/ponytail-review`): is every line needed, is anything over-built.

Fix every blocker and high finding before the next task. Log medium and low findings as tasks with an owner. Record the checkpoint below.

Why: this is a security company's public website. A steady rhythm finds problems while they are small.

## Log

| #   | Tasks covered                | Security audit                                        | Senior review | Ponytail review | Findings fixed | Date |
| --- | ---------------------------- | ----------------------------------------------------- | ------------- | --------------- | -------------- | ---- |
| 1   | S-12, S-13, S-15, S-16, S-17 | In progress                                           | Pending       | Pending         |                |      |
| 2   | S-18, S-19, S-20, S-21, S-22 | In progress (the first audit covers the whole branch) | Pending       | Pending         |                |      |

Next checkpoint is due after the fifth task that follows S-22 (counting T-051 onward).
