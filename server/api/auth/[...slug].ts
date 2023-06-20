import { createRouter, defineEventHandler, useBase, H3Error, isError } from 'h3'
import { getClientCredentials, verifyToken } from '../../common/authentication'
import { backendService } from '../../common/externalApi'
import { handleErrorRoute } from '../../common/error'

const router = createRouter()

router.get(
    '/test',
    defineEventHandler(async (event) => {
        const a = await getClientCredentials()
        return a
    })
)

router.get(
    '/userinfo',
    defineEventHandler(async (event) => {
        const CandidateAccessToken = getCookie(event, 'access_token') as string
        // If no token, user is not authenticated
        if (!CandidateAccessToken) {
            console.log('Error: No access token provided')
            return createError({
                statusCode: 400,
                statusMessage: 'No access token provided',
            })
        }
        try {
            const data = await backendService.CandidateUserInfo(CandidateAccessToken)
            return data
        } catch (error: H3Error | any) {
            return handleErrorRoute(error)
        }
    })
)

router.post(
    '/check-pid',
    defineEventHandler(async (event) => {
        try {
            const body = await readBody(event)
            if (body?.pid) {
                const { pid } = body
                const data = await backendService.CandidateCheckActive(pid)
                return { body, data }
            }
        } catch (error: H3Error | any) {
            return handleErrorRoute(error)
        }
    })
)

router.post(
    '/login',
    defineEventHandler(async (event) => {
        try {
            const body = await readBody(event)
            let { pid, password, isAuto } = body
            if (!pid && isAuto) {
                pid = '1100201370643'
                password = '908183'
            }
            const data = await backendService.CandidateLogin(pid, password)
            const { access_token } = data
            setCookie(event, 'access_token', `Bearer ${access_token}`, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            })

            return { body, data }
        } catch (error: H3Error | any) {
            return handleErrorRoute(error)
        }
    })
)

export default useBase('/api/auth', router.handler)
