// Optional Node code: delete this file (and "main", "tools", "commands" in package.json)
// for a webview-only extension, which runs no code outside its pages.

/** @param {import('@anycut/extension-api').AnycutApi} anycut  @param {import('@anycut/extension-api').ExtensionContext} context */
export async function activate(anycut, context) {
  // Send a line to the Activity tab (ui/activity.html) of every open tab. `viewId` is the page's id.
  const activity = (text) => anycut.webviews.postMessage({ type: 'activity', text, at: new Date().toLocaleTimeString() }, { viewId: 'activity' })

  // A tool Claude can call. Declare it in package.json → contributes.tools.
  anycut.tools.registerTool('timeline_summary', async () => {
    const t = await anycut.timeline.state()
    activity('Claude asked for a timeline summary')
    if (!t) return 'No project is open.'
    return { text: `"${t.sequenceName}": ${t.duration.toFixed(2)}s long, ${t.width}×${t.height} @ ${t.fps}fps, playhead at ${t.playhead.toFixed(2)}s.`, summary: t.sequenceName }
  })

  // A Command Palette entry. Declare it in package.json → contributes.commands.
  anycut.commands.registerCommand('hello', () => {
    anycut.window.showMessage('Hello from My Extension!', 'success')
    activity('Said hello')
  })

  // Messages from your pages (anycut.postMessage). `from` says which page sent it: its viewId, panelId,
  // tabId and surface ('editor', 'properties', 'panel', …). Reply to just that page with { panelId }.
  anycut.webviews.onDidReceiveMessage(async (msg, from) => {
    if (msg?.type !== 'ping') return
    anycut.webviews.postMessage({ type: 'pong', at: new Date().toLocaleTimeString() }, { panelId: from.panelId })
    activity(`Ping from the ${from.surface} page`)
  })

  context.log.info('activated')
}

export function deactivate() {}
