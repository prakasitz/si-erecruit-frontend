import { NuxtError } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { setUserInfo } = useUserStore()
    const { middlewareError } = useErrorHandler()
    const { isHR, isAdmin, isCandidate, pageLayout } = storeToRefs(useUserStore())
    const { me, decryptSecret } = useAuth()
    try {
        const userInfo = await me()
        await decryptSecret(userInfo)
        await setUserInfo(userInfo, process.server)

        if (!isAdmin.value) {
            throw createError({
                statusCode: 403,
                message: 'You are not authorized to access this page. #T-00',
                stack: undefined,
            })
        }
    } catch (error: NuxtError | any) {
        console.error(error, 'authentication error on admin-only middleware')
        middlewareError(error, { to, from })
    }
})
