import { H3Error } from 'h3'
import useHR_BACK from '~/composables/useHR_BACK'
import { handleMiddlewareError } from '~/helper/error.helper'

export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('************ is-auth-middleware ********************************************************')
    try {
        let redirectUrl = ''
        console.log({ to: to.fullPath, from: from.fullPath })
        switch (to.name) {
            case 'login':
                const res1 = await useHR_BACK().fetchUserInfo()
                console.log('login:res1', res1)
                redirectUrl = ''
                break
            case 'login_candidate':
                const res2 = await useCandidateBACK().fetchUserInfo()
                redirectUrl = 'candidate'
                break
            default:
                throw new Error('Unknown route:from')
        }
        //return navigateTo(`/${redirectUrl}`, { redirectCode: 301 })
    } catch (err: H3Error | any) {
        console.error('defineNuxtRouteMiddleware', err)
        // if (err instanceof H3Error) {
        //     console.log(err.statusCode, 'middle')
        //     handleMiddlewareError(err.statusCode, to.fullPath)
        // } else {
        //     console.log('hmm')
        //     // showError({
        //     //     statusCode: 500,
        //     //     statusMessage: 'Internal Server Error',
        //     //     message: 'Unexcepted error on middleware:is-auth: ' * err.message,
        //     // })
        // }
    } finally {
        console.log('\n**************************************************************************************')
    }
})
