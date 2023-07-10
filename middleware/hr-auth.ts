import { CandidateAuth } from '~/auth/candidate.auth'
import { useUserStore } from '~/stores/user.store'
import { H3Error } from 'h3'
import { handleMiddlewareError } from '~/helper/error.helper'
export default defineNuxtRouteMiddleware(async (to, from) => {
    const { fetchUserInfo } = useHR()
    try {
        const resp = await fetchUserInfo()
        console.group('middleware:hr-auth:')
        console.log('middleware:hr-auth:', ' ', { to: to.fullPath, from: from.fullPath })
        console.groupEnd()
    } catch (err: H3Error | any) {
        if (err instanceof H3Error) {
            handleMiddlewareError(err.statusCode, to.fullPath)
        }
        return navigateTo('/login_candidate', { redirectCode: 301 })
    }
})
