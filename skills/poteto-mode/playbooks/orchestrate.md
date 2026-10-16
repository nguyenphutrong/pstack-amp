### Orchestrate

Read the parent skill's Amp execution rules. Use only for a standing multi-session program with independent ownership. One session-sized task belongs to Autonomous run or Feature.

1. Ground and frame the program. Record goal, acceptance criteria, scope, unit dependencies, actual base branch, authority, and verification contracts. Write durable standing orders and unit briefs before launch.
2. Establish a coordinator and persistent owners using supported Amp thread tools. Keep each implementation, fixes, and verification with its exact checkout. State how owners receive unpushed code and required environment. No nested delegation without explicit authorization.
3. Assign each writer an isolated worktree or execution environment and owned targets. Read-only verifiers must exercise the relevant revision, not a default-branch orb. The coordinator integrates owned outputs and inspects evidence.
4. Track units, revision-pinned verdicts, blockers, inbox pointers, and resume state. The bundled `scripts/orch/orch.ts` records durable facts; it is not a supervisor. Resolve its installed path and use Bun. `frontier set --repo <checkout>` walks the forge's PR base chain using authenticated `gh` by default, or `--forge origin` for the Origin CLI. It reads local branch heads, so run it in the topology owner's checkout. It does not require Graphite `gt`; a branch without a PR is an error, not a guessed frontier.
5. Drain finished reports, inspect real diffs, verify composed behavior, and advance only ready dependencies. Keep shared topology single-writer. No stale verdicts, approval bypasses, or automatic publishing beyond the grant.
6. Monitor through supported statuses and progress artifacts. For an explicitly requested scheduled audit load `building-schedules`; do not guess liveness from transcript mtime. Inspect a suspected stall and fence the old writer before replacement.
7. On restart use standing orders, Git, PRs, unit records, and scoped Amp threads to reconcile actual state. Do not assume all remote work stopped or all local processes survived. Continue the existing appropriate owner when its local state is essential.
8. Finish when all unit predicates and the program predicate are proven. Otherwise pause with durable state and exact blockers. Stop and hold all writers on a cancellation.

Reply with completed and pending units, current revisions, verified frontier, explicit blockers, trails, and actual publication state.
