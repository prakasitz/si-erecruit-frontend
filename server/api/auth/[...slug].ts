import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.post(
    '/login',
    defineEventHandler(async (event) => {
        console.log(event.node.req.headers)
        const body = await readBody(event)
        console.log(event.node.req.url)
        return { body }
    })
)

router.post(
    '/check-pid',
    defineEventHandler(async (event) => {
        console.log(event.node.req.headers)
        const body = await readBody(event)

        console.log(event.node.req.url)
        return { body, getRouteRules: getRouteRules(event) }
    })
)

export default useBase('/api/auth', router.handler)
