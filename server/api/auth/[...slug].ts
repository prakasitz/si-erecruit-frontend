import { createRouter, defineEventHandler, useBase } from 'h3'

const router = createRouter()

router.get(
    '/userinfo',
    defineEventHandler(async (event) => {
        const accessToken = getCookie(event, 'access_token') as string
        // If no token, user is not authenticated
        if (!accessToken) {
            console.log('Error: No access token provided')
            return createError({
                statusCode: 400,
                statusMessage: 'No access token provided',
            })
        }

        return { username: 'Lijinx', name: 'ประกาศิต', surname: 'ช่วยรักษา' }
    })
)

router.post(
    '/login',
    defineEventHandler(async (event) => {
        const stateOrError = getCookie(event, 'candidate_state') as string
        // if (stateOrError != 'check-pid')
        //     return createError({
        //         statusCode: 400,
        //         statusMessage: 'Bad Request',
        //     })

        setCookie(event, 'candidate_state', 'login', {
            httpOnly: true,
            secure: true,
        })

        setCookie(event, 'access_token', 'Bearer abc', {
            httpOnly: true,
            secure: true,
        })

        console.log(event.node.req.headers)
        const body = await readBody(event)
        console.log(event.node.req.url)

        return { body, candidate_state: stateOrError }
    })
)

router.post(
    '/check-pid',
    defineEventHandler(async (event) => {
        console.log(event.node.req.headers)
        const body = await readBody(event)
        setCookie(event, 'candidate_state', 'check-pid', {
            httpOnly: true,
            secure: true,
        })
        console.log(event.node.req.url)
        return { body, getRouteRules: getRouteRules(event) }
    })
)

export default useBase('/api/auth', router.handler)
