/**
 * Checks if request url is a url that requires authentication
 * If user is authenticated, adds user to context
 */

import { H3Error } from 'h3'
import { getUserFromAccessToken, isAuthenticated } from '../../common/authentication'
import { checkURL } from '../../../utils/string'
import { UnauthorizedError, forbiddenError } from '../../../utils/default'
// import { isAuthenticated } from '../../../common/authentication'

export default defineEventHandler(async (event) => {
    // Get all routes that need a user to be authenticated

    const authRoutes = getAuthenticatedRoutes()
    if (event.node.req.url) {
        console.log('middleware:authentication', event.node.req.url, checkURL(event.node.req.url, authRoutes))
        if (checkURL(event.node.req.url, authRoutes)) {
            try {
                console.log(`=============`, ' ', `middleware:authentication`, ' ', `==========================`)

                const authenticatedOrError = await isAuthenticated(event)
                
                if (authenticatedOrError instanceof H3Error) throw authenticatedOrError
                if (authenticatedOrError === false) throw UnauthorizedError('Token is invalid or expired.')

                const userOrNull = await getUserFromAccessToken(event)
                if (userOrNull === null) {
                    console.log('Unauthorized. Missing access token')
                    throw UnauthorizedError('Unauthorized. Missing access token')
                }
                console.log(`++++++++++userOrNul+++++++++++`)
                console.log(userOrNull)
                console.log(`++++++++++++++++++++++++++++++`)
                // Add user to context
                event.context.user = userOrNull
            } catch (error: H3Error | any) {
                console.log(`Error: authentication middleware: ${error}`)
                throw error
            } finally {
                console.log(`=======================================================================`)
            }
        }
    }
})
