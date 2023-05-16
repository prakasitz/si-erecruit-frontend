export default defineNuxtRouteMiddleware((to, from) => {
    const isAuthenticated = () => false
    // isAuthenticated() is an example method verifying if a user is authenticated
    if (isAuthenticated() === false) {
        return navigateTo('/login')
    }
})
