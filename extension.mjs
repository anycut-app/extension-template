// Optional Node code: delete this file (and "main", "tools", "commands" in package.json)
// for a webview-only extension, which runs no code outside its page.

/** @param {import('@anycut/extension-api').AnycutApi} anycut  @param {import('@anycut/extension-api').ExtensionContext} context */
export async function activate(anycut, context) {
  // A tool Claude can call. Declare it in package.json → contributes.tools.
  anycut.tools.registerTool('timeline_summary', async () => {
    const t = await anycut.timeline.state()
    if (!t) return 'No project is open.'
    return { text: `"${t.sequenceName}": ${t.duration.toFixed(2)}s long, ${t.width}×${t.height} @ ${t.fps}fps, playhead at ${t.playhead.toFixed(2)}s.`, summary: t.sequenceName }
  })

  // A Command Palette entry. Declare it in package.json → contributes.commands.
  anycut.commands.registerCommand('hello', () => anycut.window.showMessage('Hello from My Extension!', 'success'))

  // Messages from your page (ui/app.js → anycut.postMessage).
  anycut.webviews.onDidReceiveMessage(async (msg, from) => {
    if (msg?.type === 'ping') anycut.webviews.postMessage({ type: 'pong', at: new Date().toLocaleTimeString() }, { panelId: from.panelId })
  })

  context.log.info('activated')
}

export function deactivate() {}
