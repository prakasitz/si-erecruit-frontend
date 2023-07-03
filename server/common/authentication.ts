import axios, { AxiosError } from 'axios'
import * as qs from 'qs'
import { getItemStorage, setItemStorage } from './storage'
import { verifyToken } from './token'
import { H3Event, H3Error } from 'h3'
import { User } from '../../utils/types'

export async function getClientCredentials() {
    const { urlOauth2, clientId, clientSecret } = useRuntimeConfig()
    if (!urlOauth2 && !clientId && !clientSecret) return new Error('Can not found config variable.')

    let isValid = false
    const token = await getItemStorage('client_credential_token')
    if (token) isValid = await verifyToken(token.toString())

    if (isValid) {
        console.log('using Cache token')
        return token
    }

    try {
        const results = await axios.post(
            urlOauth2,
            qs.stringify({
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )
        const access_token = results.data.access_token
        if (!access_token) throw new Error(`Cannot find Access token`)

        await setItemStorage({ key: 'client_credential_token', values: access_token.toString() })
        const token = await getItemStorage('client_credential_token')
        console.log('using fresh token')
        return token
    } catch (error: any) {
        throw new Error('error:' + error)
    } finally {
    }
}

// export async function isAuthenticated(event: H3Event): Promise<boolean | H3Error> {
//     let accessToken: string = ''

//     // If no token, user is not authenticated
//     if (!accessToken) {
//         console.log('Error: No access token provided')
//         return createError({
//             statusCode: 400,
//             statusMessage: 'No access token provided',
//         })
//     }

//     // Parse Bearer token (Bearer xxxx)
//     const accessTokenArr = accessToken.split(' ')

//     // Verify access token
//     const errorOrUser = verifyAccessToken(accessTokenArr[1])

//     // If error is an expired access token, attempt to reauthenticate
//     if (errorOrUser instanceof jwt.TokenExpiredError) {
//         console.log('Yes, attempt to reauthenticate')
//         const errorOrTokens = await getNewTokens(event)

//         // If get an error, reauthentication failed
//         if (errorOrTokens instanceof H3Error) {
//             console.log('Reauthentication failed')
//             return createError({
//                 statusCode: 500,
//                 statusMessage: 'Reauthentication failed. Login required.',
//             })
//         }

//         // Otherwise, get tokens
//         const tokens = errorOrTokens as TokensSession

//         const errorOrPlatform = getClientPlatform(event)
//         if (errorOrPlatform instanceof H3Error) return errorOrPlatform

//         // Get access token from header or cookie
//         const platform = errorOrPlatform as string

//         // If platform is app dev/production, set tokens in header
//         if (platform === 'app') {
//             setHeader(event, 'iam-access-token', 'Bearer ' + tokens.accessToken)
//             setHeader(event, 'iam-refresh-token', 'Bearer ' + tokens.refreshToken)
//             if (tokens.sid) setHeader(event, 'iam-sid', tokens.sid)
//         }

//         // If platform is browser production, set tokens in secure, httpOnly cookies
//         if (platform === 'browser') {
//             setCookie(event, 'iam-access-token', 'Bearer ' + tokens.accessToken, {
//                 httpOnly: true,
//                 secure: true,
//             })

//             // Cookies containing refresh tokens expire in 14 days, unless refreshed and new tokens obtained
//             // Refresh tokens themselves expire in 14 days, unless new tokens are obtained
//             setCookie(event, 'iam-refresh-token', 'Bearer ' + tokens.refreshToken, {
//                 httpOnly: true,
//                 secure: true,
//                 expires: dayjs().add(14, 'day').toDate(),
//             })

//             // Set session id
//             if (tokens.sid) setCookie(event, 'iam-sid', tokens.sid)
//         }

//         // Development cookies are not secure. Use only in development
//         if (platform === 'browser-dev') {
//             setCookie(event, 'iam-access-token', 'Bearer ' + tokens.accessToken, {
//                 // Access tokens themselves expire in 15 mins
//                 expires: dayjs().add(1, 'day').toDate(),
//             })
//             setCookie(event, 'iam-refresh-token', 'Bearer ' + tokens.refreshToken, {
//                 expires: dayjs().add(1, 'day').toDate(),
//             })
//             // Set session id
//             if (tokens.sid) setCookie(event, 'iam-sid', tokens.sid)
//         }

//         // Return authenticated
//         console.log('Reauthentication successful')
//         return true
//     }

//     // If other error, return error
//     if (errorOrUser instanceof H3Error) {
//         console.log('Error: ', errorOrUser)
//         return false
//     } else {
//         // Otherwise, we have the user so return true
//         return true
//     }
// }

// export async function getUserFromAccessToken(event: H3Event): Promise<User | null> {
//     let accessToken: string = ''
//     let tokenPayload: string = ''

//     console.log('Attempt to get user from access token')

//     // If no token, display error and return false
//     if (!accessToken) {
//         console.log('No access token provided. Cannot get user from access token')
//         return null
//     }

//     // Verify access token
//     const accessTokenArr = accessToken.split(' ')
//     const errorOrToken = verifyAccessToken(accessTokenArr[1])

//     // If error, print to console and return false
//     if (errorOrToken instanceof H3Error) {
//         console.log(errorOrToken)
//         console.log('Error verifying access token')
//         return null
//     }

//     // Otherwise, get token payload
//     tokenPayload = errorOrToken as JwtPayload

//     // Get user by uuid
//     const userOrNull = await getUserByUuid(tokenPayload.uuid)

//     // If no user, show error, return false
//     if (userOrNull === null) {
//         console.log('Failed to get user to check for isSuperAdmin')
//         return null
//     }

//     // Otherwise get  and return
//     const user = userOrNull as User
//     return user
// }
