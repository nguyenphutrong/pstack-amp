### Feature

Read the parent skill's Amp execution rules. Own the design, consumer behavior, and verification.

1. Ground the affected subsystem with `pstack:how` and record preserved behavior.
2. Name the data shape and ownership. For a real design fork use `pstack:architect`, comparing caller-first alternatives before implementation.
3. Write the throughput checkpoint with four items: blocking gates, independent workstreams, shared mutable state, and smallest safe decomposition. Retain inapplicable items as `n/a: <reason>`. One coherent owner is the default.
4. Implement in small units against the accepted shape. Delegate only independent or appropriately isolated work; do not hand off one coherent feature just because it spans files. Review returned evidence and actual diffs.
5. Verify the consumer path and preserved cases on the actual interface. For changed visuals capture and inspect representative states. Inconclusive is not a pass.
6. Inspect the final diff, remove artifacts made unused by this change, and prepare ordered reviewable increments. Commit only when authorized.
7. For an explicitly requested adversarial review use `pstack:interrogate`. For an unresolved high-impact question follow the Amp Oracle rules, not a blanket review gate.
8. Run Opening a PR, stopping at a reviewable local result unless publication is authorized.

Reply with what changed for the consumer, important design choices, proof, limitations, and delivery state.
