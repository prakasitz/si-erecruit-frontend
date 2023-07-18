import { H3Event, H3Error } from 'h3'
import { handleErrorRoute } from '../../common/error'
import { JSONResponse, Roles } from '../../../utils/types'
import { isAuthenticated } from '../../common/authentication'
import { externalAPIService } from '../../common/externalApi'
import { BadRequestError } from '../../../utils/default'

export async function getUserInfo(event: H3Event) {
    try {
        console.log('-=--=--=--=--=--=- start userInfo -=--=--=--=--=--=--=--=-')
        const runtimeConfig = useRuntimeConfig()
        let userContext = event.context.user
        const token = getCookie(event, 'access_token') as string
        let role = getHeader(event, 'x-role') as Roles | undefined
        switch (role) {
            case 'HR':
                return await externalAPIService.HRUserInfo(token)
            case 'CANDIDATE':
                return await externalAPIService.CandidateUserInfo(token)
            default:
                throw BadRequestError('Role is not valid')
        }
    } catch (error: H3Error | any) {
        return handleErrorRoute(error)
    } finally {
        console.log('-=--=--=--=--=--=- end userInfo -=--=--=--=--=--=--=--=-')
    }
}

export async function checkIsAuthenticated(event: H3Event) {
    try {
        const authenticated = await isAuthenticated(event)
        const response = {} as JSONResponse
        if (authenticated instanceof H3Error) {
            response.status = 'fail'
            response.error = authenticated
        }

        if (authenticated === false) {
            response.status = 'fail'
        }

        if (authenticated === true) {
            response.status = 'success'
        }

        return response
    } catch (error: H3Error | any) {
        return handleErrorRoute(error)
    } finally {
    }
}

export async function checkPID(event: H3Event) {
    try {
        const body = await readBody(event)
        if (body?.pid) {
            const { pid } = body
            const data = await externalAPIService.CandidateCheckActive(pid)
            return data
        }
    } catch (error: H3Error | any) {
        return handleErrorRoute(error)
    }
}
