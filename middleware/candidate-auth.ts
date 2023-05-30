import { CandidateAuth } from '~/auth/candidate.auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.client) {
        console.log('candidate-auth')
        try {
            const auth = new CandidateAuth();
            await auth.getUser();
        } catch (err) {
            return navigateTo('/login_candidate')
        }
    }
})