import { NuxtError } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { setUserInfo } = useUserStore()
    const { middlewareError } = useErrorHandler()
    const { pageLayout } = storeToRefs(useUserStore())
    const { me, decryptSecret } = useAuth()
    try {
        const userInfo = await me()
        await decryptSecret(userInfo)
        await setUserInfo(userInfo, process.server)
        usePageLayout(pageLayout.value)
    } catch (error: NuxtError | any) {
        console.error(error, 'authentication error on auth middleware')
        middlewareError(error, { to, from })
    }
})
