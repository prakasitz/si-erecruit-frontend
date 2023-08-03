import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
// import { useHR } from '~/composables/auth/useHR'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    await useAuth().me()
    const { isHR } = storeToRefs(useUserStore())
    console.log('middleware:hr-only', isHR.value)
    if (!isHR.value) {
        // return navigateTo({ name: 'login-hr' })
        throw createError({
            statusCode: 403,
            message: 'You are not authorized to access this page.',
        })
    }
})
