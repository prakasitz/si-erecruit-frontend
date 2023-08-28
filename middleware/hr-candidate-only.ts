import { NuxtError } from 'nuxt/app'
import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
import { useComponentStore } from '~/stores/component.store'
// import { useHR } from '~/composables/auth/useHR'
import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { middlewareError } = useErrorHandler()
    const route = useRoute()
    try {
        await useAuth().me()
        const { isHR, isCandidate } = storeToRefs(useUserStore())
        console.log('middleware:hr-candidate-only', isHR.value, isCandidate.value)
        if (!isHR.value && !isCandidate.value) {
            // return navigateTo({ name: 'login-candidate' })
            throw createError({
                statusCode: 403,
                message: 'You are not authorized to access this page.',
            })
        } else {
            setPageLayout(isHR.value ? 'default' : 'defaultcandidate')
        }

        if (process.client && route.hash) {
            //route hash is #description or #position etc. follow by candidateForms.hash
            const componentStore = useComponentStore()
            const { candidateForms, onBoarding } = storeToRefs(componentStore)
            let hash = route.hash.replace('#', '')
            const formSelected = candidateForms.value.find((form: any) => form.hash === hash)
            if (formSelected) {
                onBoarding.value = formSelected.id
            }
        }
    } catch (error: NuxtError | any) {
        console.log('error: middleware:hr-candidate-only', error)
        middlewareError(error, { to, from })
    }
})
