import { CandidateAuth } from '~/auth/candidate.auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getUserInfo } = useCandidate()
    if (process.client) {
        try {
            const resp = await getUserInfo()
            console.group('middleware:candidate-auth')
            console.info('candidate-auth', { to, from })
            console.log('user from middleware', resp.data.value)
            console.groupEnd()
        } catch (err) {
            return navigateTo('/login_candidate')
        }
    }
})
