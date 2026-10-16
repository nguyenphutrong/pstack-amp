### Bug fix

Read the parent skill's Amp execution rules. Own the reproduction and verified mechanism, not a plausible source-level explanation.

1. Reproduce the reported symptom on the actual interface before changing code. Record input, state, observed failure, and expected result. If reproduction requires unavailable access, report the exact missing evidence without naming a cause.
2. Ground with `pstack:how` and regression history with `pstack:why`. Form competing hypotheses, then use runtime experiments or instrumentation to eliminate them. Confirm the surviving mechanism on the failing path.
3. Choose the smallest root-cause fix. Use `pstack:architect` if the ownership or interface must change. Keep uncertain broad alternatives out of the production diff. Delegate only where the Amp policy justifies it.
4. Implement and inspect the diff. Add a cheap red-first regression check with `pstack:tdd` when practical. The red must fail for the intended bug, not a harness error. Check sibling callers within scope.
5. Repeat the original reproduction on the same interface and verify nearby preserved behavior. A unit pass alone is not proof that the reported symptom is gone.
6. Prepare delivery through Opening a PR within the user's authorization. Undo only rejected changes owned by this run; leave unrelated work intact.

Reply with the reproduced failure, confirmed cause, smallest fix, failing-before and passing-after evidence, and actual delivery state.
