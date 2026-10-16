### Multi-phase or multi-PR plan

Read the parent skill's Amp execution rules. The deliverable is a plan, not implementation.

1. Ground the change, scope, preserved behavior, and risk. For a trivial local change say a formal plan is unnecessary and stop at the recommendation.
2. Settle observable unknowns with scoped prototypes or experiments; ask only for consequential product choices. Record evidence and unresolved gaps.
3. Split into verifiable logical units with exact paths, dependencies, ownership, user-visible result, and checkable exit conditions. One coherent unit stays with one owner. Do not invent a mandatory ten-agent fan-out.
4. Write a plan at the user's path or the repository's established plans directory. Use the skeleton below. Keep unit, live, and performance evidence distinct. Mark performance not applicable with a concrete reason rather than inventing a benchmark. Name the execution playbook and all commit, publication, and merge gates.
5. Use `pstack:technical-writing` and `pstack:unslop`. Each unit names commands or a real driving recipe, artifact location, and failure predicate. Do not substitute placeholders for a discovered verification path.
6. Validate the filled plan against goal, dependencies, actual environment, and authorization. Ensure the first unknown is addressed early and evidence survives cleanup. A script pass alone is not a feasibility check.
7. Return the plan and evidence, then stop. Execute only when the user gives a go.

```markdown
# <Goal> plan

## Goal and constraints
<Consumer outcome, preserved behavior, scope, and done predicate.>

## Execution and approvals
<Playbook, environment, ownership, who commits/pushes/merges, and stop gates.>

## Units

### <Unit name>
- Depends on: <unit or none>.
- Owns: <paths, branch, exact input state>.
- Change: <symbols and behavior>.
- Observable result: <actual consumer outcome>.
- Unit proof: <command and expected output>.
- Live proof: <launch, drive, observe, artifact, cleanup>.
- Performance proof: <baseline, method, threshold, or n/a with reason>.
- Delivery gate: <approval and proof needed before advancing>.

## Risks and alternatives
<Unknowns, rejected shapes, and evidence.>

## Resume and finish
<Durable state, trail, final composed proof, and delivery state.>
```

Reply with the plan path, dependencies, proven and unresolved assumptions, and human gates.
