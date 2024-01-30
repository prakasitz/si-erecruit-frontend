import { NuxtError } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { setUserInfo } = useUserStore()
    const { middlewareError } = useErrorHandler()
    const { isHR, isAdmin, pageLayout } = storeToRefs(useUserStore())
    const { me, decryptSecret } = useAuth()
    try {
        console.log(`----- middleware admin-hr-only call me at ${process.server ? 'server' : 'client'} -----`)
        const userInfo = await me()
        await decryptSecret(userInfo)
        await setUserInfo(userInfo, process.server)

        usePageLayout(pageLayout.value)
        if (!isHR.value && !isAdmin.value) {
            throw createError({
                statusCode: 403,
                statusMessage: 'Forbidden',
                message: 'You are not authorized to access this page. #T-01',
            })
        }
    } catch (error: NuxtError | any) {
        console.error(error, 'authentication error on admin-hr-only middleware')
        middlewareError(error, { to, from })
    }
})
