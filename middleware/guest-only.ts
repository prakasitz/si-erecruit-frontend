import { useUserStore } from '~/stores/user.store'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    console.log('middleware:guest-only', userStore.user)
    if (!checkObjectPropertiesNull(userStore.user)) {
        if (process.server) navigateTo({ name: 'about' })
        return abortNavigation()
    }
})
