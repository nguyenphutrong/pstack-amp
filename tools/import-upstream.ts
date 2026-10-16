import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// Update the pin only after reviewing the upstream diff and the Amp-owned files.
const revision = 'f713f14203cd6420cec13cd7c55c32d598dbab68'
const root = fileURLToPath(new URL('../', import.meta.url))
const checkout = process.argv[2]
if (!checkout) throw new Error('Usage: bun tools/import-upstream.ts <cursor/plugins checkout>')
const head = Bun.spawnSync(['git', '-C', resolve(checkout), 'rev-parse', 'HEAD'])
if (head.exitCode !== 0 || head.stdout.toString().trim() !== revision) {
  throw new Error(`Check out upstream revision ${revision} before importing`)
}
const dirty = Bun.spawnSync(['git', '-C', resolve(checkout), 'status', '--porcelain', '--', 'pstack'])
if (dirty.exitCode !== 0 || dirty.stdout.toString().trim()) {
  throw new Error('Upstream pstack must have a clean worktree')
}

// These files own Amp behavior. An upstream import must never overwrite them.
const owned = new Set([
  ...['architect', 'arena', 'automate-me', 'how', 'interrogate', 'no-comments',
    'poteto-mode', 'recall', 'reflect', 'setup-pstack', 'show-me-your-work',
    'swarm', 'teach', 'why', 'poteto-help', 'ketchup'].map(name => `${name}/SKILL.md`),
  ...['authoring-a-skill', 'autonomous-run', 'autopilot-full', 'autopilot-stack',
    'babysit', 'bug-fix', 'eval', 'feature', 'multi-phase-plan', 'opening-a-pr',
    'orchestrate', 'pause-safely', 'session-pickup', 'shipping', 'worktree-cleanup']
    .map(name => `poteto-mode/playbooks/${name}.md`),
  'how/references/explainer-prompt.md',
  ...['divergent-reviewer', 'judgment-reviewer', 'tooling-reviewer', 'synthesizer']
    .map(name => `reflect/references/${name}.md`),
])
const excluded = new Set([
  'poteto-mode/scripts/check-plan.mjs', 'poteto-mode/scripts/check-plan.test.ts',
  'poteto-mode/scripts/worktree-audit.sh',
])
const source = join(resolve(checkout), 'pstack')
const names = (await readdir(join(source, 'skills'), { withFileTypes: true }))
  .filter(entry => entry.isDirectory() && entry.name !== 'make-bot-ui')
  .map(entry => entry.name)
const command = new RegExp(`(?<![\\w/:])/(${names.join('|')})(?![\\w/-])`, 'g')

async function importDirectory(relative = '') {
  for (const entry of await readdir(join(source, 'skills', relative), { withFileTypes: true })) {
    const path = relative ? `${relative}/${entry.name}` : entry.name
    if (path === 'make-bot-ui' || excluded.has(path) || owned.has(path)) continue
    if (entry.isDirectory()) {
      await importDirectory(path)
      continue
    }
    const target = join(root, 'skills', path)
    await mkdir(dirname(target), { recursive: true })
    if (!path.endsWith('.md') && path !== 'poteto-mode/scripts/package.json') {
      await cp(join(source, 'skills', path), target)
      continue
    }
    let text = await readFile(join(source, 'skills', path), 'utf8')
    text = text.replace(command, (_, name) => name === 'poteto-mode' ? '/pstack' : `/pstack:${name}`)
      .replaceAll('.cursor/skills/', '.agents/skills/')
      .replaceAll('create-skill', 'building-skills')
      .replaceAll('Pick each subagent\'s reasoning level and fast or standard speed for the job, per the Subagents section of the **poteto-mode** skill.', 'Follow the Amp execution rules for delegation and model selection.')
      .replaceAll('Pick each subagent\'s reasoning level and fast or standard speed for the job, per the Subagents section.', 'Follow the Amp execution rules for delegation and model selection.')
      .replaceAll('each on a different model', 'with independently assigned outputs (not necessarily different models)')
      .replaceAll('in plain English', "in the user's language")
      .replaceAll('in plain english', "in the user's language")
      .replaceAll('and give `/loop` that predicate', 'and use it as the exit condition for the active run')
      .replaceAll('/loop until done.', 'Continue until done within the available execution session.')
      .replaceAll('`/loop` per component until the diff is zero.', 'Repeat per component until the diff is zero, within the active run.')
      .replaceAll('via the control skill', 'via the project verification harness')
      .replaceAll('[PR #123](url)', '[PR #123](<source-url>)')
    if (path.endsWith('/SKILL.md')) {
      text = text.replace(/^disable-model-invocation: true\n/m, 'license: MIT\n')
        .replace(/^(?:icon|color|paths):.*\n/gm, '')
      const rule = 'Read [Amp execution rules](../poteto-mode/references/amp-runtime.md) before applying this workflow.'
      if (/^# .+$/m.test(text)) text = text.replace(/^(# .+)$/m, `$1\n\n${rule}`)
      else text += `\n${rule}\n`
    }
    if (path === 'poteto-mode/scripts/package.json') {
      text = text.replace('bun test orch watch-pr check-plan.test.ts', 'bun test orch watch-pr')
    }
    await writeFile(target, text)
  }
}

await importDirectory()
await cp(join(source, 'LICENSE'), join(root, 'LICENSE'))
console.log(`Imported pstack v0.15.25 at ${revision}; ${names.length} skills, Amp-owned files preserved`)
