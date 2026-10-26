import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import plugin from '../index.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const names = (await readdir(join(root, 'skills'))).sort()
assert.equal(names.length, 57)
assert.equal(names.filter(name => name.startsWith('principle-')).length, 24)
assert.equal((await readdir(join(root, 'skills/poteto-mode/playbooks'))).length, 23)

// A minimal host drives the exported plugin through its public event/command contract.
async function host() {
  const skills = []
  const commands = new Map()
  const events = new Map()
  await plugin({
    async registerSkill({ path }) {
      const text = await readFile(join(root, path, 'SKILL.md'), 'utf8')
      const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/)
      assert.ok(frontmatter, `${path}: missing frontmatter`)
      const meta = Bun.YAML.parse(frontmatter[1])
      assert.equal(meta.name, path.split('/').at(-1))
      assert.ok(typeof meta.description === 'string' && meta.description.length <= 1024)
      assert.equal(meta.license, 'MIT')
      assert.ok(text.includes('Amp execution rules'), `${path}: missing runtime link`)
      skills.push(meta.name)
    },
    registerCommand(id, options, run) {
      assert.ok(!commands.has(id), `duplicate command ${id}`)
      commands.set(id, { options, run })
    },
    on(event, run) {
      assert.equal(event, 'agent.start', 'no startup side effects or continuations')
      events.set(event, run)
    },
  })
  assert.deepEqual(skills.sort(), names)
  assert.equal(commands.size, 34)
  return {
    commands,
    turn(message, thread = 'T-one') {
      return events.get('agent.start')({ message, thread: { id: thread }, id: 'check' })?.message?.content ?? ''
    },
  }
}

const app = await host()
for (const name of names) {
  const isolated = await host()
  assert.ok(isolated.turn(`/pstack:${name} scoped goal`).includes(`pstack:${name}`), name)
  if (name !== 'poteto-mode') assert.equal(isolated.turn('next turn'), '', `${name}: must be one-shot`)
}
for (const input of ['/how x', '/architect x', '/pstackish x', '/pstack:how-to x',
  'quote /pstack do work', '> /pstack do work', '```\n/pstack do work\n```']) {
  assert.ok(!app.turn(input).includes('Load the skill pstack:'), `must not activate: ${input}`)
  assert.equal(app.turn('follow-up'), '', `must not become sticky: ${input}`)
}
assert.match(app.turn('/pstack:unknown'), /Unknown pstack workflow/)
assert.match(app.turn('  /pstack investigate only'), /pstack:poteto-mode/)
assert.match(app.turn('follow-up'), /remains active/)
assert.equal(app.turn('follow-up', 'T-two'), '', 'state must be per-thread')
assert.match(app.turn('/pstack:how explain only'), /pstack:how/)
assert.match(app.turn('follow-up'), /remains active/, 'one-shot must not disable an existing mode')
assert.match(app.turn('/pstack off'), /is off/)
assert.equal(app.turn('follow-up'), '')
app.turn('/pstack another task')
assert.equal((await host()).turn('follow-up'), '', 'reload intentionally clears state')

const appended = []
const notifications = []
let answer
const ctx = {
  thread: { async appendUserMessage(message) { appended.push(message) } },
  ui: { async input() { return answer }, async notify(message) { notifications.push(message) } },
}
for (const input of [undefined, '', '   ']) {
  answer = input
  await app.commands.get('pstack.how').run(ctx)
}
assert.deepEqual(appended, [], 'cancel and blank scope leave the thread unchanged')
answer = '  explain routing  '
await app.commands.get('pstack.how').run(ctx)
await app.commands.get('pstack.poteto-mode').run(ctx)
await app.commands.get('pstack.off').run(ctx)
assert.deepEqual(appended.map(message => message.content), [
  '/pstack:how explain routing', '/pstack explain routing', '/pstack off',
])
await app.commands.get('pstack.how').run({ ui: ctx.ui })
assert.equal(notifications.length, 1)
assert.equal(appended.length, 3, 'no thread must not append')

let documents = 0
async function checkLinks(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue
    const path = join(directory, entry.name)
    if (entry.isDirectory()) { await checkLinks(path); continue }
    if (!path.endsWith('.md')) continue
    documents++
    const text = await readFile(path, 'utf8')
    for (const match of text.matchAll(/\[[^\]\n]*\]\(([^)\s]+)\)/g)) {
      const target = match[1]
      if (/^(?:[a-z]+:|#|<)/i.test(target)) continue
      await access(join(dirname(path), decodeURIComponent(target.split('#')[0])))
        .catch(() => assert.fail(`${path}: missing linked resource ${target}`))
    }
  }
}
await checkLinks(root)
console.log(`PASS: 57 skills, 24 principles, 23 playbooks, 34 palette commands; routing, isolation, off, reload, palette output; ${documents} Markdown files linked`)
