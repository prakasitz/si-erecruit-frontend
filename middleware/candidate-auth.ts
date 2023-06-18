import { CandidateAuth } from '~/auth/candidate.auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getUserInfo } = useCandidate()
    if (process.client) {
        console.log('candidate-auth', to, from)
        try {
            const resp = await getUserInfo()
            console.log('user', resp.data.value)
        } catch (err) {
            return navigateTo('/login_candidate')
        }
    }
})
