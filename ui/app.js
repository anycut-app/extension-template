// window.anycut is injected by AnyCut before this script runs (WebviewApi in @anycut/extension-api).
const anycut = window.anycut
const $ = (id) => document.getElementById(id)

async function showTimeline() {
  try {
    const t = await anycut.call('timeline.state')
    $('timeline').textContent = t ? `${t.sequenceName} · ${t.playhead.toFixed(2)} / ${t.duration.toFixed(2)}s` : 'No project open'
  } catch (e) {
    $('timeline').textContent = e.message
  }
}

$('frame').onclick = async () => {
  const img = await anycut.call('timeline.captureFrame', { width: 960 })
  $('img').src = `data:${img.mime};base64,${img.base64}`
  $('img').hidden = false
}
$('ping').onclick = () => anycut.postMessage({ type: 'ping' })
anycut.onMessage((m) => m.type === 'pong' && ($('pong').textContent = `pong at ${m.at}`))
anycut.on('playhead', showTimeline)
anycut.on('sequence', showTimeline)

anycut.ready().then(showTimeline)
