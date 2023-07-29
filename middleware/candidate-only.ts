import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
// import { useHR } from '~/composables/auth/useHR'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    await useAuth().me()
    const { isCandidate } = storeToRefs(useUserStore())
    console.log('middleware:candidate-only', isCandidate.value)
    if (!isCandidate.value) {
        // return navigateTo({ name: 'login-candidate' })
        throw createError({
            statusCode: 403,
            message: 'You are not authorized to access this page.',
        })
    }
})
