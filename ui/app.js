// window.anycut is injected by AnyCut before this script runs (WebviewApi in @anycut/extension-api).
// This is the tab's main page: anycut.context.surface is 'editor'.
const anycut = window.anycut
const $ = (id) => document.getElementById(id)
let width = 960

async function showTimeline() {
  try {
    const t = await anycut.call('timeline.state')
    $('timeline').textContent = t ? `${t.sequenceName} · ${t.playhead.toFixed(2)} / ${t.duration.toFixed(2)}s` : 'No project open'
  } catch (e) {
    $('timeline').textContent = e.message
  }
}

async function grab() {
  const img = await anycut.call('timeline.captureFrame', { width })
  $('img').src = `data:${img.mime};base64,${img.base64}`
  $('img').hidden = false
}

$('frame').onclick = grab
$('ping').onclick = () => anycut.postMessage({ type: 'ping' })
anycut.onMessage((m) => m.type === 'pong' && ($('pong').textContent = `pong at ${m.at}`))
anycut.on('playhead', showTimeline)
anycut.on('sequence', showTimeline)

// The properties page (ui/properties.html) talks to this page directly, with no Node code in between.
anycut.tab.onMessage((m) => {
  if (m?.type === 'width') width = m.width
  if (m?.type === 'grab') grab()
})

anycut.ready().then(() => {
  showTimeline()
  // whichever page loads second gets the other's settings
  anycut.tab.postMessage({ type: 'hello' })
})
