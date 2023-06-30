import { createRouter, defineEventHandler, useBase, H3Error, isError } from 'h3'
import { getClientCredentials } from '../../common/authentication'
import { backendService } from '../../common/externalApi'
import { handleErrorRoute } from '../../common/error'
import { RoleEnum, Roles } from '../../../utils/types'

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
        const token = getCookie(event, 'access_token') as string
        let role = getHeader(event, 'x-role') as Roles | undefined

        console.log('/userinfo', {
            token,
            role,
        })
        // If no token, user is not authenticated

        if (!token) {
            console.log('Error: No access token provided')
            return createError({
                statusCode: 400,
                statusMessage: 'No access token provided',
            })
        }

        try {
            switch (role) {
                case 'HR':
                    const data1 = await backendService.HRUserInfo(token)
                    return data1
                    break
                case 'CANDIDATE':
                    const data2 = await backendService.CandidateUserInfo(token)
                    return data2
                    break
                default:
                    break
            }
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
        let role = getRequestHeader(event, 'x-role') as Roles | undefined
        try {
            const body = await readBody(event)
            let { username, pid, password, isAuto } = body
            let data: any = undefined

            switch (role) {
                case 'HR':
                    data = await backendService.HRLogin(username, password)
                    break
                case 'CANDIDATE':
                    if (!pid && isAuto) {
                        pid = '1100201370643'
                        password = '908183'
                    }

                    data = await backendService.CandidateLogin(pid, password)
                    break
                default:
                    throw new Error(`Unknown role: ${role}`)
            }
            const { access_token } = data
            setCookie(event, 'access_token', `Bearer ${access_token}`, {
                httpOnly: true,
                // secure: true,
                sameSite: 'strict',
            })

            return { statusCode: 200 }
        } catch (error: H3Error | any) {
            return handleErrorRoute(error)
        }
    })
)

export default useBase('/api/auth', router.handler)
