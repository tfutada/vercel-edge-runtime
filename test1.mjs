import { EdgeRuntime } from 'edge-runtime'
 
const runtime = new EdgeRuntime()
const result = await runtime.evaluate("fetch('https://example.vercel.sh')")
 
console.log(result)
