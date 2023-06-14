import {EdgeRuntime} from 'edge-runtime'

async function main() {

    const runtime = new EdgeRuntime({
        extend: (context) => {
            const rawFetch = context.fetch.bind(context.fetch)
            context.fetch = async (input: RequestInfo | URL, init?: RequestInit) =>
                rawFetch(
                    typeof input === 'string' && !input.startsWith('https://')
                        ? `https://${input}`
                        : String(input),
                    init
                )

            return context
        },
    })

    const result = await runtime.evaluate("fetch('example.com')")

    console.log(result)
}

if (require.main === module) {
    main()
}
