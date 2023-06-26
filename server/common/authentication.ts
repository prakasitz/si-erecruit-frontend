import axios, { AxiosError } from 'axios'
import * as qs from 'qs'
import { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { getItemStorage, setItemStorage } from './storage'
import { verifyToken } from './jwt'

export async function getClientCredentials() {
    const { urlOauth2, urlADFS, urlUserInfo, clientID, clientSecret } = useRuntimeConfig()
    if (!urlOauth2 && !clientID && !clientSecret) return new Error('Can not found config variable.')

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
                client_id: clientID,
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
