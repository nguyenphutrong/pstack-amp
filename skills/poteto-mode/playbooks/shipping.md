### Shipping

Read the parent skill's Amp execution rules. Green CI is not an independent safety verdict or merge permission.

1. Confirm exact landing authority and freeze the bottom-to-top chain. Resolve the actual forge, default authenticated `gh`. Independent PRs stay outside this chain.
2. Obtain an independent per-PR real-behavior verdict against parent and head, with the exact head SHA, base SHA, stable patch-id, tested scenarios, and artifact paths. A writer's self-report or unavailable live lane does not satisfy independent proof. Report an execution gap rather than a false pass.
3. Compute only the contiguous verified prefix from the root. Stop at the first failed or unverified PR; never arm descendants beyond it.
4. Prepare only the bottom PR. Check current base, dependencies, patch identity, CI, and mergeability. An unchanged patch-id does not prove compatibility after an overlapping parent change. Rerun affected lanes; never reuse a dev-server result for an unbuilt new revision.
5. Immediately before an authorized merge, re-read the current head and pin the operation with the forge's supported match-head condition, such as `gh pr merge --match-head-commit <verified-head>`. If head changed, reverify. Arm auto-merge only when explicitly requested and only for this bottom PR. Never bypass host review protections.
6. Wait for the actual merged state, not READY or an auto-merge request. Use a supported forge watch followed by state inspection; follow the existing shell process instead of restarting it. If blocked, diagnose before changing queue topology.
7. After each merge, fetch the base, confirm the merged result, inspect the new bottom PR, and recompute proofs and the prefix. Only then prepare the next PR.
8. Stop at the verified ceiling or user cancellation. Report what landed, what remains, and which proof or approval the next item needs.

Reply with current verdict revisions, contiguous prefix, pinned merges or auto-merge actions, observed merged results, and next gap. Never claim a queued PR is merged.
