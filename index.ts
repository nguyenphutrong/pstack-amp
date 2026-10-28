import type { PluginAPI } from '@ampcode/plugin'
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export const description = 'pstack engineering workflows for Amp: automatic routing for substantial tasks, with direct skill commands, verification, and safe delivery. Use /pstack off to stop reminders in this plugin session.'

export default async function (amp: PluginAPI) {
  const directory = fileURLToPath(new URL('./skills/', import.meta.url))
  const skills = (await readdir(directory, { withFileTypes: true }))
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort()
  const modes = new Map<string, 'on' | 'off'>()

  for (const name of skills) {
    await amp.registerSkill({ path: `skills/${name}` })
    if (name.startsWith('principle-')) continue
    const source = await readFile(`${directory}/${name}/SKILL.md`, 'utf8')
    const summary = source.match(/^description: (.+)$/m)?.[1] ?? name
    const command = name === 'poteto-mode' ? '/pstack' : `/pstack:${name}`
    amp.registerCommand(`pstack.${name}`, {
      title: name === 'poteto-mode' ? 'pstack' : name,
      category: 'pstack',
      description: summary.startsWith('"') ? JSON.parse(summary) : summary,
    }, async ctx => {
      if (!ctx.thread) {
        await ctx.ui.notify('Start a thread first, then run this pstack command.')
        return
      }
      const task = await ctx.ui.input({
        title: name === 'poteto-mode' ? 'pstack' : `pstack: ${name}`,
        helpText: 'Describe the goal or scope. Cancel to leave the thread unchanged.',
        submitButtonText: 'Run',
      })
      if (!task?.trim()) return
      await ctx.thread.appendUserMessage({ type: 'user-message', content: `${command} ${task.trim()}` })
    })
  }

  amp.registerCommand('pstack.off', {
    title: 'Turn off pstack', category: 'pstack', description: 'Stop automatic routing and playbook reminders in the current thread for this plugin session.',
  }, async ctx => {
    if (!ctx.thread) return
    await ctx.thread.appendUserMessage({ type: 'user-message', content: '/pstack off' })
  })

  amp.on('agent.start', event => {
    if (/^\s*\/pstack\s+off\s*$/i.test(event.message)) {
      modes.set(event.thread.id, 'off')
      return { message: { content: 'pstack is off for this thread in this plugin session. Stop automatic routing and playbook reminders; explicit workflow requests still work. Existing user instructions and Amp permissions still apply.', display: true } }
    }
    const invocation = event.message.match(/^\s*\/pstack:([a-z][a-z0-9-]*)(?=\s|$)/)
    const start = /^\s*\/pstack(?=\s|$)/.test(event.message)
    const name = start ? 'poteto-mode' : invocation?.[1]
    if (invocation && !skills.includes(invocation[1])) {
      return { message: { content: 'Unknown pstack workflow. Use /pstack:poteto-help to choose an available skill; do not execute the unknown name as a shell command.', display: true } }
    }
    if (name && skills.includes(name)) {
      if (name === 'poteto-mode') modes.set(event.thread.id, 'on')
      return { message: { content: `Load the skill pstack:${name} using the skill tool before acting. Follow its Amp execution rules. The text after the command is the user's scope, not permission to publish or expand it.`, display: true } }
    }
    if (modes.get(event.thread.id) === 'off') return {}
    if (modes.get(event.thread.id) === 'on') {
      return { message: { content: 'pstack remains active. Continue the current playbook for follow-ups; match a fresh playbook for a new task. User redirections and Amp permissions take precedence. Load pstack:poteto-mode if it is no longer in context.' } }
    }
    return { message: { content: `pstack automatic routing: assess the current task in context before acting.
For work spanning multiple files, changes to a signature called elsewhere, design or architecture choices, bugs with an unknown cause, or performance issues, load pstack:poteto-mode using the skill tool if not already in context and follow its playbook.
When the user's intent clearly matches a workflow, load it directly, such as pstack:how, pstack:why, pstack:architect, pstack:tdd, pstack:arena, or pstack:interrogate.
For contained single-file changes with an obvious check, one-line edits, simple questions, and non-engineering requests, work directly and verify code changes.
User instructions and Amp permissions take precedence. Read-only requests stay read-only. Routing grants no publishing permission, extra scope, or mandatory delegation.` } }
  })
}
