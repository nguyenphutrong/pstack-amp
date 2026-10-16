### Worktree and simulator cleanup

Read the parent skill's Amp execution rules. An audit is not deletion permission.

1. Record disk usage and enumerate paths with `git worktree list --porcelain`. Inspect branch, merge state, tracked edits, staged edits, untracked and ignored files, remote state, and open PRs. Paths with spaces must remain intact.
2. Discover active Amp owners and processes through supported status tools and scoped history. Unknown usage means hold, not safe. A merged PR or clean tracked tree does not prove no valuable untracked data remains.
3. Classify each target as hold, needs review, or candidate. Show the exact path, evidence, data to be lost, and reason. Do not scan unrelated private logs or label untracked files disposable by default.
4. Obtain explicit approval for removing non-disposable state. Confirm each approved target is not active, has no unique commits, and has no unpreserved files. Preserve unrelated changes and branch refs.
5. Remove approved worktrees with Git, without force by default. If Git refuses, inspect the reason rather than falling back to broad `rm -rf`. Prune metadata only for confirmed stale paths and remeasure disk usage.
6. For simulator or cache cleanup, enumerate exact instances and ownership first. Remove only the approved inactive set. Never run blanket simulator deletion or wipe editor caches as a guessed fix.

Reply with before and after usage, approved targets removed, and held targets with specific reasons. No Cursor transcript-path heuristic or unsafe helper bucket is used.
