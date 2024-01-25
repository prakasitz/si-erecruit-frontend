/**
 * Checks if request url is a url that requires authentication
 * If user is authenticated, adds user to context
 */

import { H3Error } from 'h3'
import { getUserFromAccessToken, isAuthenticated } from '../../common/authentication'
import { checkURL } from '../../../utils/string'
import { UnauthorizedError } from '../../../utils/default'
import { getUserInfo } from '../../api/auth/auth.service'
// import { isAuthenticated } from '../../../common/authentication'

export default defineEventHandler(async (event) => {
    // Get all routes that need a user to be authenticated

    const authRoutes = getAuthenticatedRoutes()
    if (event.node.req.url) {
        if (checkURL(event.node.req.url, authRoutes)) {
            try {
                console.log(
                    `\n\n=============`,
                    ' ',
                    `middleware:authentication: ${event.node.req.url}`,
                    ' ',
                    `==========================`
                )

                const authenticatedOrError = await isAuthenticated(event)

                if (authenticatedOrError instanceof H3Error) throw authenticatedOrError
                if (authenticatedOrError === false) throw UnauthorizedError('Token is invalid or expired.')

                const userOrNull = await getUserFromAccessToken(event)
                if (userOrNull === null) {
                    console.log('🔴 Unauthorized. Missing access token')
                    throw UnauthorizedError('Unauthorized. Missing access token')
                }

                // Add user to context
                event.context.user = userOrNull

                const userInfoOrError = await getUserInfo(event)
                if (userInfoOrError instanceof H3Error) throw userInfoOrError
                event.context.user.role = userInfoOrError.role
            } catch (error: H3Error | any) {
                console.log(`🔴 Error: authentication middleware: ${error}`)
                throw error
            } finally {
                console.log(`======= end middleware:authentication======\n\n`)
            }
        } else {
            console.log(`==`, ' ', `middleware:authentication:out of range: ${event.node.req.url}`, ' ', `==`)
            console.log('👍 checkURL', checkURL(event.node.req.url, authRoutes))
            console.log(`====middleware:authentication:out of range====`)
        }
    }
})
