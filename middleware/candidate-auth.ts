import { CandidateAuth } from '~/auth/candidate.auth'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { fetchUserInfo } = useCandidate()
    try {
        const resp = await fetchUserInfo()
        console.group('middleware:candidate-auth')
        console.info('candidate-auth', { to, from })
        console.log('user from middleware', resp.data.value)
        console.groupEnd()
    } catch (err) {
        return navigateTo('/login_candidate', { redirectCode: 301 })
    }
})
