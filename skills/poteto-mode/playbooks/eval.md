### Eval

Read the parent skill's Amp execution rules. Own the experiment and blinded evidence, not a self-reported score.

1. State the variant, hypothesis, sample count, comparison, and three to six observable criteria. Keep the judging rubric hidden from candidates.
2. Build isolated, sanitized environments with identical relevant inputs. Do not leak variant identity, model identity, or evaluation intent through names or prompts. Ensure candidates receive exact source state.
3. Author one organic task prompt. Avoid cues asking candidates to recite the instructions being measured.
4. Run independent candidates through the supported delegation or thread mechanisms. Record actual modes and limitations. Same-model trials are useful but not cross-model evidence. Keep writes isolated and prevent shared review artifacts from revealing other attempts.
5. After candidates finish, give the outputs under neutral labels and the hidden rubric to an independent judge when available. Never manufacture reviewer independence or use Oracle as a routine substitute.
6. Inspect actual output and executed tool evidence. Use scoped Amp thread access for completed runs. If tool-level history is unavailable, mark chain-following unverified instead of grading a claimed file read as fact.
7. Read every candidate output and compare the judge's reasoning. Vet measured numbers with `pstack:benchmark-checklist`; promote no variant solely from a lucky trial or a flawed observation method.

Reply with hypothesis, method, actual trials and modes, rubric, evidence, judging limitations, and recommendation. A draft prompt change is not automatically a global policy update.
