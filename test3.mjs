import { EdgeRuntime, runServer } from 'edge-runtime'
import { onExit } from 'signal-exit'
import fetch from 'node-fetch'

const initialCode = `
addEventListener('fetch', event => {
  const { searchParams } = new URL(event.request.url)
  const url = searchParams.get('url')
  return event.respondWith(fetch(url))
})`

const edgeRuntime = new EdgeRuntime({ initialCode })

const server = await runServer({ runtime: edgeRuntime, port: 3000 })
console.log(`> Edge server running at ${server.url}`)
onExit(() => server.close())