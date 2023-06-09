import { CandidateAuth } from '~/auth/candidate.auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        console.log('candidate-auth', to, from)
        try {
            throw 'hello'
            const auth = new CandidateAuth()
            await auth.getUser()
        } catch (err) {
            return navigateTo('/login_candidate')
        }
    }
})
