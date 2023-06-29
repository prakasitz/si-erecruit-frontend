import { CandidateAuth } from '~/auth/candidate.auth'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        if (process.server) {
            const access_token = useCookie('access_token')
            if (access_token.value) {
                return navigateTo('/candidate')
            }
        }
    } catch (err) {
        console.log('error on middleware: candidate-isauthenticated', err)
    } finally {
    }
})
