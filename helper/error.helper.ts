export const handleMiddlewareError = (errStatusCode: number, toPath: string) => {
    console.log('🚩 handleMiddlewareError', ' ', errStatusCode, toPath)
    let r = useCookie('r')
    switch (errStatusCode) {
        case 400:
            if(r.value) {
                
            }
            break
        case 401:
        // let r = useCookie('r')
        // if (!r.value) {
        //     return navigateTo('/login')
        // } else {
        //     throw createError({ statusCode: 404, statusMessage: `Ops, We can\'t found ${toPath}` })
        // }
        // let roles = JSON.parse(r)
        default:
            break
    }
}
