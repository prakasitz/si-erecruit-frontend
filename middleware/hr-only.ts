import { NuxtError } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
// import { useHR } from '~/composables/auth/useHR'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { middlewareError } = useErrorHandler()
    const userStore = useUserStore()
    const { setUserInfo } = userStore
    const { isHR } = storeToRefs(userStore)
    const { me } = useAuth()
    try {
        const userInfo = await me()
        await setUserInfo(userInfo, process.server)

        console.log('middleware:hr-only', isHR.value)
        if (!isHR.value) {
            throw createError({
                statusCode: 403,
                message: 'You are not authorized to access this page.',
                data: {
                    message: 'You are not authorized to access this page.',
                },
                stack: undefined,
                fatal: true,
            })
        }
    } catch (error: NuxtError | any) {
        console.log('error: middleware:hr-only', error)
        middlewareError(error, { to, from })
    }
})
