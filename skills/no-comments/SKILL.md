---
name: no-comments
description: "Audits scoped comments and suppressions for redundant narration or hidden design problems. Use for /pstack:no-comments or a comment cleanup request. Preserves legal notices, public contracts, and unencoded safety constraints."
license: MIT
---

# No comments

Read [Amp execution rules](../poteto-mode/references/amp-runtime.md).

1. Pin the caller's files or diff, otherwise the current change against its actual base. Read nearby code before judging a comment.
2. Audit directly or, for an explicitly requested independent audit, brief a read-only Task with the scope. Return findings only. Preserve legal notices, public API contracts, proven external constraints, issue links, and valid formatter directives.
3. Remove redundant narration, dead commented-out code, and banners only within the authorized scope. For a suppression, inspect the rule and the real failure before deleting it. A comment claiming a safety invariant is not disposable merely because it sounds defensive.
4. When a comment reveals a design issue, separate the proposed structural fix from deletion. Use `pstack:how` or `pstack:why` for uncertain claims. Use `pstack:architect` for a substantive approved reshape, not an unrelated cleanup.
5. Offer an in-scope type, test, runtime check, or lint for constraints the code does not enforce. Keep the constraint comment until the replacement is approved and proven. Do not erase a warning while leaving its risk unenforced.
6. Verify the scoped change and report deletion count, preserved exceptions, accepted fixes, and open structural findings. Do not apply application-code edits from an unreviewed worker diff.
