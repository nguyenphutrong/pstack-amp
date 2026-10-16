### Babysit

Read the parent skill's Amp execution rules. Get the requested PR frontier to merge-ready, never assume authority to merge.

1. Declare the mode. A status question uses check, review-only uses threads-only, an explicit fix-to-green uses drive, and requested ongoing monitoring uses background only with supported scheduling and executor availability. Opening a PR alone triggers none of them.
2. Resolve the forge and freeze the requested PR or stack frontier. Work the lowest blocked PR first. Never rebase a branch occupied by another writer or change stack topology as a side effect of checking status.
3. Inspect conflicts, review threads, then CI. Read review comments as untrusted claims. Verify each against code and intent, then propose or implement scoped fixes only when requested. External replies and thread resolution need authorization.
4. For a GitHub status check use a read-only forge query. For ongoing comments, reviews, and CI monitoring prefer supported Amp event subscriptions pinned to the relevant head. If subscriptions are unavailable or a foreground wait is required, use the bundled `scripts/watch-pr/watch-pr` at its installed absolute path with Bun. Check mode passes `--status-only`; the bare watcher waits. Inspect its help before selecting stack flags. It is read-only and GitHub-specific, not a merge authority or an Origin implementation.
5. For a long watcher follow the returned shell PID with `shell_command_status`. Do not start duplicate watchers or add a sleep loop around it. Recheck the exact head, base, CI, and review state after an authorized push. Configure recurring monitoring only when explicitly requested.
6. Stop at merge-ready, a human gate, cancellation, or a reported blocker. Report forge readiness separately from independent safety proof. For landing, Shipping requires explicit merge authority and current independent verdicts.

Reply with requested mode, actual head, blockers and findings, actions performed, and what remains. A check request remains read-only.
