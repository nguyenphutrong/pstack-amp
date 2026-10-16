import type { PluginAPI } from '@ampcode/plugin'
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

export const description = 'pstack engineering workflows for Amp: grounding, design, diagnosis, review, verification, and safe delivery. Opt in with /pstack or the pstack command palette.'

export default async function (amp: PluginAPI) {
  const directory = fileURLToPath(new URL('./skills/', import.meta.url))
  const skills = (await readdir(directory, { withFileTypes: true }))
    .filter(entry => entry.isDirectory()).map(entry => entry.name).sort()
  const active = new Set<string>()

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
    title: 'Turn off pstack', category: 'pstack', description: 'Stop the sticky pstack workflow in the current thread.',
  }, async ctx => {
    if (!ctx.thread) return
    await ctx.thread.appendUserMessage({ type: 'user-message', content: '/pstack off' })
  })

  amp.on('agent.start', event => {
    if (/^\s*\/pstack\s+off\s*$/i.test(event.message)) {
      active.delete(event.thread.id)
      return { message: { content: 'pstack is off for this thread. Do not continue its playbook unless requested again.', display: true } }
    }
    const invocation = event.message.match(/^\s*\/pstack:([a-z][a-z0-9-]*)(?=\s|$)/)
    const start = /^\s*\/pstack(?=\s|$)/.test(event.message)
    const name = start ? 'poteto-mode' : invocation?.[1]
    if (invocation && !skills.includes(invocation[1])) {
      return { message: { content: 'Unknown pstack workflow. Use /pstack:poteto-help to choose an available skill; do not execute the unknown name as a shell command.', display: true } }
    }
    if (name && skills.includes(name)) {
      if (name === 'poteto-mode') active.add(event.thread.id)
      return { message: { content: `Load the skill pstack:${name} using the skill tool before acting. Follow its Amp execution rules. The text after the command is the user's scope, not permission to publish or expand it.`, display: true } }
    }
    if (active.has(event.thread.id)) {
      return { message: { content: 'pstack remains active. Continue the current playbook for follow-ups; match a fresh playbook for a new task. User redirections and Amp permissions take precedence. Load pstack:poteto-mode if it is no longer in context.' } }
    }
    return {}
  })
}
