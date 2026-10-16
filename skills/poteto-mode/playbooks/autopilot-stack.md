### Autopilot-stack

Read the parent skill's Amp execution rules. Build a reviewed stack for human landing. Never merge or arm auto-merge here.

1. State the queue, dependencies, base branch, operator review gates, and authorized publication actions. Plan-only requests stop before execution.
2. Use the Autopilot-full owner and proof contracts, replacing merge-ready with STACK-READY. Persistent owners need isolated execution and exact code transfer. One coherent implementation stays with one owner.
3. Verify each patch at its exact head and base. Require real behavior and independent proof where available. Record blocked or unavailable lanes rather than accepting a green summary.
4. Keep one topology writer. Owners modify only their own branches and report intended parent, base, and head. The coordinator may append or retarget only with authorization. Never rewrite an occupied worktree or published history without the required approval.
5. After any rebase, retarget, or drift, recheck patch identity and dependencies, then CI and mergeability. Re-run affected proofs. A matching patch-id does not prove compatibility with a changed parent.
6. Audit actual owner state and honor stop immediately. Configure recurring monitoring only when requested and report executor limits.
7. Deliver the verified linear chain bottom-up, each PR carrying current evidence where publication is authorized. Hold all merges for the operator. If publication is not authorized, deliver the local branches and review artifacts instead.

Reply with root and tip, each link's revision and verdict, operator gates, omitted work, and what remains to land.
