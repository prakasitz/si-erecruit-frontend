import { createRouter, defineEventHandler, useBase, H3Error, isError } from 'h3'
import { getClientCredentials, isAuthenticated } from '../../common/authentication'
import { externalAPIService } from '../../common/externalAPI/ExternalAPIService'
import { handleErrorRoute } from '../../common/error'
import { JSONResponse, RequestDecryptSecret, Roles } from '../../../utils/types'
import { verifyAccessToken, setCookieLogin, decryptSecret } from '../../common/token'
import { isMatchRegex } from '../../../utils/string'
import { checkIsAuthenticated, checkPID, getUserInfo } from './auth.service'
import { userNotFoundError } from '../../../utils/default'

const router = createRouter()

router.post(
    '/verifyAccessToken',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return await verifyAccessToken(body.token)
    })
)

router.get(
    '/test',
    defineEventHandler(async (event) => {
        const a = await getClientCredentials()
        return a
    })
)

/**
 * @desc Checks if user is authenticated
 * @param event H3 Event passed from api
 * @returns {Promise<JSONResponse>}
 */
router.get(
    '/isauthenticated',
    defineEventHandler(async (event) => {
        return checkIsAuthenticated(event)
    })
)

router.post(
    '/decrypt-secret',
    defineEventHandler(async (event) => {
        const { secret, key } = await readBody<RequestDecryptSecret>(event)
        const a = await readBody(event)
        console.log('bodddyyyyyyyyyy', a)
        const decryptedOrError = decryptSecret(secret, key)
        if (decryptedOrError instanceof H3Error) throw decryptedOrError
        return {
            decrypted: decryptedOrError,
        }
    })
)

router.get(
    '/userinfo',
    defineEventHandler(async (event) => {
        // ! CHECK USER FROM PAYLOAD
        if (!event.context.user) throw userNotFoundError()
        return getUserInfo(event)
    })
)

router.post(
    '/check-pid',
    defineEventHandler(async (event) => {
        return checkPID(event)
    })
)

router.post(
    '/logout',
    defineEventHandler(async (event) => {
        const { role } = event.context.user
        console.log('/logout')
        console.log('user', event.context.user)
        console.log('role', event.context.user.role)
        console.log('role', role)
        let redirectUrl = role.includes('HR') ? '/login' : '/login_candidate'
        deleteCookie(event, 'access_token')
        return {
            status: 'success',
            message: 'Logout success',
            redirect: redirectUrl,
        }
    })
)

/**
    @param role must match HR or CANDIDATE
    @param referer from frontend header referer
*/
router.post(
    '/login',
    defineEventHandler(async (event) => {
        let role = getRequestHeader(event, 'x-role') as Roles | undefined
        let referer = getRequestHeader(event, 'referer') as string | undefined

        //remove query string
        referer = referer?.split('?')[0]

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
            let dataOrError: any = undefined
            let isMatchReferer = null

            switch (role) {
                case 'HR':
                    isMatchReferer = isMatchRegex(referer, /\/login$/)
                    if (!isMatchReferer) throw new Error(`Route /login: Referer not match., referer=${referer}`)
                    if (!username || !password) throw new Error(`Route /login: username and password is required`)
                    dataOrError = await externalAPIService.HRLogin(username, password)
                    break
                case 'CANDIDATE':
                    isMatchReferer = isMatchRegex(referer, /\/login_candidate$/)
                    if (!isMatchReferer) throw new Error(`Route /login: Referer not match., referer=${referer}`)

                    if (!pid || !password) throw new Error(`Route /login: pid and password is required`)
                    if (!pid && isAuto) {
                        pid = '1100201370643'
                        password = '908183'
                    }

                    dataOrError = await externalAPIService.CandidateLogin(pid, password)
                    break
                default:
                    throw new Error(`Route /login: x-role not match., x-role=${role.toString()}`)
            }

            if (dataOrError instanceof H3Error) throw dataOrError
            if (!dataOrError.access_token) throw new Error(`Route /login: Response token invalid.`)

            const devResult = {
                dataOrError,
                _h: {
                    role: role,
                    referer: referer,
                },
            }

            setCookieLogin(event, { token: dataOrError.access_token })
            setCookie(event, 'role', role, {
                httpOnly: false,
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 1 day
            })

            return {
                access_token: dataOrError.access_token,
                _: process.env.NODE_ENV !== 'production' ? devResult : undefined,
            }
        } catch (error: H3Error | any) {
            console.log(error)
            return handleErrorRoute(error)
        }
    })
)

export default useBase('/api/auth', router.handler)
