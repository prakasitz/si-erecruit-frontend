import { H3Event, H3Error } from 'h3'
import { handleErrorRoute } from '../../common/error'
import { JSONResponse, Roles } from '../../../utils/types'
import { backendService } from '../../common/externalApi'
import { isAuthenticated } from '../../common/authentication'

export async function getUserInfo(event: H3Event) {
    try {
        const runtimeConfig = useRuntimeConfig()
        let userContext = event.context.user
        const token = getHeader(event, 'Authorization') as string
        let role = getHeader(event, 'x-role') as Roles | undefined
        switch (role) {
            case 'HR':
                return await backendService.HRUserInfo(token)
            case 'CANDIDATE':
                return await backendService.CandidateUserInfo(token)
            default:
                break
        }
    } catch (error: H3Error | any) {
        return handleErrorRoute(error)
    } finally {
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
