### Authoring or modifying a skill

Read the parent skill's Amp execution rules.

1. Load `building-skills` before researching skill locations or editing SKILL.md. Load `building-plugins` as well when registration code changes.
2. Pin purpose, trigger, scope, source of truth, and smallest package. Inspect existing conventions; do not add overlapping workflow skills without a demonstrated need.
3. Write valid frontmatter with a matching directory name and useful description. Keep the entry concise and move optional detail into referenced files. Inspect bundled executable or MCP definitions before loading them.
4. Verify package structure, real relative references, and the intended workflow on a representative input. For a bug-fix skill, exercise a case where a plausible wrong instruction would fail.
5. Register bundled skills with `amp.registerSkill`. Reload the changed local plugin or skills and check discovery under the qualified name. Global publication requires an authorized push to the source repository; never edit a synchronized cache.
6. Report what was authored, actual validation and runtime limits, and local or published state.
