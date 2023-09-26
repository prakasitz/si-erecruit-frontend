import { NuxtError } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { setUserInfo } = useUserStore()
    const { isHR, isAdmin, pageLayout } = storeToRefs(useUserStore())
    const { me, decryptSecret } = useAuth()
    try {
        const userInfo = await me()
        userInfo.secret = await decryptSecret(userInfo.secret)
        await setUserInfo(userInfo, process.server)

        usePageLayout(pageLayout.value)

        if (!isHR.value && !isAdmin.value) {
            throw createError({
                statusCode: 403,
                message: 'You are not authorized to access this page. #T-01',
                stack: undefined,
            })
        }
    } catch (error: NuxtError | any) {
        console.error(error, 'authentication error on admin-hr-only middleware')
        throw error
    }
})
