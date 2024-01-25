import axios from 'axios'
import * as qs from 'qs'
import { getItemStorage, setItemStorage } from './storage'
import { verifyAccessToken, verifyOauth2Token } from './token'
import { H3Event, H3Error } from 'h3'

import { JwtPayload } from 'jsonwebtoken'
import { TokenNotFoundError } from '../../utils/default'
import { ContextUser, jwtAdfs, jwtCandidate } from '../../utils/types'

export async function getClientCredentials() {
    const { urlOauth2, clientId, clientSecret } = useRuntimeConfig()
    if (!urlOauth2 && !clientId && !clientSecret) return new Error('Can not found config variable.')

    let isValid = false
    const token = await getItemStorage('client_credential_token')
    if (token) isValid = await verifyOauth2Token(token.toString())

    if (isValid) {
        console.log('🟢⌚ using Cache token')
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
        console.log('🟢✨ using fresh token')
        return token
    } catch (error: any) {
        throw new Error('error:' + error)
    } finally {
    }
}

export async function isAuthenticated(event: H3Event): Promise<boolean | H3Error> {
    let accessToken = getCookie(event, 'access_token') as string

    if (!accessToken) {
        console.log('🔴❌ isAuthenticated: No access token provided')
        return TokenNotFoundError()
    }

    // Parse Bearer token (Bearer xxxx)
    const accessTokenArr = accessToken.split(' ')
    const errorOrUser = await verifyAccessToken(accessTokenArr[1])
    // // If other error, return error
    // If other error, return error
    if (errorOrUser instanceof H3Error) {
        console.log('🔴 isAuthenticated:error', errorOrUser)
        return false
    } else {
        // Otherwise, we have the user so return true
        return true
    }
}

export async function getUserFromAccessToken(event: H3Event): Promise<any> {
    let accessToken: string = ''
    let tokenPayload: any = ''

    accessToken = getCookie(event, 'access_token') as string

    console.log('🎄 getUserFromAccessToken: Attempt to get user from access token')

    // If no token, display error and return false
    if (!accessToken) {
        console.log('🔴 getUserFromAccessToken: No access token provided. Cannot get user from access token')
        return null
    }

    // Verify access token
    const accessTokenArr = accessToken.split(' ')
    const errorOrUser = await verifyAccessToken(accessTokenArr[1])

    // If error, print to console and return false
    if (errorOrUser instanceof H3Error) {
        console.log(errorOrUser)
        console.log('🔴 getUserFromAccessToken: Error verifying access token')
        return null
    }

    // Otherwise, get token payload
    tokenPayload = errorOrUser as JwtPayload

    // If no user, show error, return false
    if (tokenPayload === null) {
        console.log('🔴🔐 Failed to get user to check for isSuperAdmin')
        return null
    }

    // // Otherwise get  and return
    const user = tokenPayload as ContextUser<jwtAdfs & jwtCandidate>
    return user
}
