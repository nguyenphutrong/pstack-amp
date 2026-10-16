### Opening a PR

Read the parent skill's Amp execution rules. Deliver the reviewable result within the user's actual authorization.

1. Inspect branch, base, worktree, staging area, and diff. Keep user-owned work intact. If isolation is required, use a fresh worktree containing the correct input state. Never hard-reset or stash unrelated work to fit this workflow.
2. Run the repository's relevant checks and real-behavior proof. Review the diff for dead artifacts, generated clutter, unsafe suppressions, and unnecessary comments. Use scoped `pstack:no-comments` when requested; no external deslop plugin is required.
3. Prepare a clear title and description using `pstack:technical-writing` and `pstack:unslop`. Include Why, What changed, Scope, Tradeoffs, Blast radius, and Verification only where they add useful review information. Link actual evidence without exposing secrets or unsolicited Amp thread links.
4. If commit is authorized, stage only owned files, inspect the staged diff, and create coherent Conventional Commits. Otherwise report the verified local edits and stop before commit.
5. If push and PR creation are authorized, resolve the forge, default to authenticated `gh`, and publish the intended branch. Do not infer deployment permission from push permission. Honor the requested draft state; do not force ready status for unverified work.
6. Confirm the actual PR URL and delivery state. Opening a PR does not start babysitting or grant merge authority. For a requested PR-status task route to Babysit; for explicitly authorized landing route to Shipping.

Reply with the consumer result, proof, limitations, and local, committed, pushed, or PR state. Do not invent a PR link when nothing was published.
