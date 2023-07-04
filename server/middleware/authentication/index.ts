/**
 * Checks if request url is a url that requires authentication
 * If user is authenticated, adds user to context
 */

import { H3Error } from 'h3'
import { getUserFromAccessToken, isAuthenticated } from '../../common/authentication'
// import { isAuthenticated } from '../../../common/authentication'

const forbiddenError = createError({
    statusCode: 403,
    statusMessage: 'Forbidden',
})

export default defineEventHandler(async (event) => {
    // Get all routes that need a user to be authenticated

    const authRoutes = getAuthenticatedRoutes()
    if (event.node.req.url) {
        for (let i = 0; i < authRoutes.length; i++) {
            if (event.node.req.url.includes(authRoutes[i])) {
                try {
                    console.log(`=============`, ' ', `middleware:authentication`, ' ', `==========================`)

                    const authenticated = await isAuthenticated(event)

                    if (authenticated instanceof H3Error) throw forbiddenError

                    if (authenticated === false) throw forbiddenError

                    const userOrNull = await getUserFromAccessToken(event)

                    if (userOrNull === null) {
                        console.log('Missing access token after authentication. This should not happen.')
                        throw createError({
                            statusCode: 401,
                            statusMessage: 'Unauthorized. Missing access token.',
                        })
                    }
                    console.log(userOrNull)
                    // Add user to context
                    event.context.user = userOrNull
                } catch (error) {
                    throw error
                } finally {
                    console.log(`=======================================================================`)
                }
                break
            }
        }
    }
})
