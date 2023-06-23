import { CandidateAuth } from '~/auth/candidate.auth'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { getUserInfo } = useCandidate()
    const userStore = useUserStore()
    try {
        const resp = await getUserInfo()
        return navigateTo('/candidate')
    } catch (err) {
        console.log('error on middleware: candidate-isauthenticated', err)
    } finally {
    }
})
