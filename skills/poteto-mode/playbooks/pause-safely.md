### Pause safely

Read the parent skill's Amp execution rules. Pause only on an explicit stop or when continuation is impossible, not because the user said to keep going overnight.

1. Finish or safely back out of the current owned atomic step. Start nothing new. Tell persistent owners to hold writes and record outstanding work. Do not kill an expected long-running process merely because a tool wait ended.
2. Do not publish, merge, deploy, or discard unrelated work to pause. Commit a checkpoint only when authorized; otherwise leave the local changes intact.
3. Write a durable workspace resume note containing goal, scope, branch, worktree, verified and pending units, decision trail, key artifacts, running process or thread IDs, limitations, and the next action. Use the repository's approved scratch location, not an ephemeral /tmp-only record.
4. Confirm the note and proof artifacts exist and distinguish disk state from assumptions. A cold-start agent must be able to locate the work without relying on memory.

Reply with the checkpoint location, delivery state, active owners or processes, and first resume action. This is a pause, not a claim of completion.
