import { createRouter, defineEventHandler, useBase, H3Error, isError } from 'h3'
import { getClientCredentials } from '../../common/authentication'
import { backendService } from '../../common/externalApi'
import { handleErrorRoute } from '../../common/error'
import { RoleEnum, Roles } from '../../../utils/types'
import { getTokenPayload, setCookieLogin } from '../../common/token'
import { isMatchRegex } from '../../../utils/string'

const router = createRouter()

router.post(
    '/getTokenPayload',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return await getTokenPayload(body.token)
    })
)

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

/*
    @param role from frontend header x-role
        role must match HR or CANDIDATE
    @param referer from frontend header referer
        referer must match /login or /login_candidate
*/
router.post(
    '/login',
    defineEventHandler(async (event) => {
        let role = getRequestHeader(event, 'x-role') as Roles | undefined
        let referer = getRequestHeader(event, 'referer') as string | undefined
        console.log('Route /login:referer', referer)
        try {
            if (!role || !referer)
                throw createError({
                    statusCode: 400,
                    message: `Route /login: Header referer, x-role is required`,
                    stack: undefined,
                })

            const body = await readBody(event)

            let { username, pid, password, isAuto } = body
            let data: any = undefined
            let isMatchReferer = null

            switch (role) {
                case 'HR':
                    isMatchReferer = isMatchRegex(referer, /\/login$/)
                    if (!isMatchReferer) throw new Error(`Route /login: Referer not match., referer=${referer}`)
                    if (!username || !password) throw new Error(`Route /login: username and password is required`)
                    data = await backendService.HRLogin(username, password)
                    break
                case 'CANDIDATE':
                    isMatchReferer = isMatchRegex(referer, /\/login_candidate$/)
                    if (!isMatchReferer) throw new Error(`Route /login: Referer not match., referer=${referer}`)

                    if (!pid || !password) throw new Error(`Route /login: pid and password is required`)
                    if (!pid && isAuto) {
                        pid = '1100201370643'
                        password = '908183'
                    }

                    data = await backendService.CandidateLogin(pid, password)
                    break
                default:
                    throw new Error(`Route /login: x-role not match., x-role=${role.toString()}`)
            }

            if (!data.access_token) throw new Error(`Route /login: Response token invalid.`)

            const devResult = {
                data,
                _h: {
                    role: role,
                    referer: referer,
                },
            }

            setCookieLogin(event, { token: data.access_token })

            return { access_token: data.access_token, _: process.env.NODE_ENV !== 'production' ? devResult : undefined }
        } catch (error: H3Error | any) {
            return handleErrorRoute(error)
        }
    })
)

export default useBase('/api/auth', router.handler)
