export default defineNuxtRouteMiddleware(async (to, from) => {
    try {
        let redirectUrl = ''
        switch (to.name) {
            case 'login':
                const res1 = await useHR().fetchUserInfo()
                console.log(res1.data.value)
                redirectUrl = ''
                break
            case 'login_candidate':
                const res2 = await useCandidate().fetchUserInfo()
                redirectUrl = 'candidate'
                break
            default:
                throw new Error('Unknown route:from')
                break
        }
        return navigateTo(`/${redirectUrl}`, { redirectCode: 301 })
    } catch (err: any) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'Unexcepted error on middleware:is-auth: ' + err.message,
        })
    }
})
