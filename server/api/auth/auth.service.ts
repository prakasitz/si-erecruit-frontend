import { H3Event, H3Error } from 'h3'
import { handleErrorRoute } from '../../common/error'
import { JSONResponse, Roles } from '../../../utils/types'
import { externalAPIService } from '../../common/externalAPI/ExternalAPIService'
import { isAuthenticated } from '../../common/authentication'
import { BadRequestError } from '../../../utils/default'

export async function getUserInfo(event: H3Event) {
    try {
        let userContext = event.context.user
        if (!userContext.role) throw BadRequestError('userContext.role is undefined')

        console.log('-=--=--=--=--=--=- start userInfo -=--=--=--=--=--=--=--=-')

        const token = getCookie(event, 'access_token') as string
        let role = userContext.role as string[]
        console.log('role', role)
        if (role.includes('HR')) {
            return externalAPIService.HRUserInfo(token)
        } else if (role.includes('CANDIDATE')) {
            return externalAPIService.CandidateUserInfo(token)
        }

        throw BadRequestError('userContext.role is invalid')
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
