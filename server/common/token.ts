import { JwksClient } from 'jwks-rsa'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { H3Event, H3Error } from 'h3'
import { TokenNotFoundError, UnauthorizedError } from '../../utils/default'

export async function verifySignature(token: any, done: any) {
    const runtimeConfig = useRuntimeConfig()
    const jwksClient = new JwksClient({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${runtimeConfig.jwks}`,
    })

    const getKey = (header: any, callback: any) => {
        jwksClient.getSigningKey(header.kid, function (err: any, key: any) {
            var signingKey = key.publicKey || key.rsaPublicKey
            callback(null, signingKey)
        })
    }

    jwt.verify(
        token,
        getKey,
        {
            algorithms: ['RS256'],
        },
        (err, decoded) => done(err, decoded)
    )
}

export async function verifyOauth2Token(token: string) {
    try {
        const isValid = await new Promise<boolean>((resolve, reject) => {
            verifySignature(token, (err: VerifyErrors | null, userInfo: JwtPayload | undefined) => {
                if (err) console.log('jwt:verifyOauth2Token', ' ', err)
                if (err) resolve(false)
                resolve(true)
            })
        })
        return isValid
    } catch (error: any) {
        throw new Error('verifyOauth2Token:Unexpected Error:' + error)
    }
}

export function setCookieLogin(event: H3Event, { token }: { token: string }) {
    setCookie(event, 'access_token', 'Bearer ' + token, {
        httpOnly: true,
        sameSite: 'strict',
        // secure: true,
    })
}

export async function verifyAccessToken(token: string): Promise<H3Error | JwtPayload> {
    let tempPayload = null
    let payload = null
    let error = null
    const { audience } = useRuntimeConfig()
    try {
        console.log('------------------start verifyAccessToken ------------------')
        const decoded: jwt.JwtPayload | null | string = jwt.decode(token)

        if (decoded && typeof decoded === 'object') {
            // this token from adfs or JWT
            let isValid: boolean = false
            if (decoded.aud === audience) {
                isValid = await verifyOauth2Token(token)
                console.log('Jwt payload obtained successfully', `isValid is ${isValid}`)
                console.log(`----| start: modify HR Payload |----`)
                const modifiedPayload = {
                    ...decoded,
                    role: ['HR'],
                }
                console.log(`----| end: modify HR Payload |----`)
                if (isValid) return modifiedPayload
                return UnauthorizedError('Token is not valid or expired')
            } else {
                //should be using api for verify candidate token valid or not ?
                let secret =
                    'U2lyaXJhamVSZWNydWl0MjAyMQ==ZureF6AsmJed!3jZ@W-2Yn5CD#YYg%T7fmX_Bmk&gPvPR$^@2pY9WhB@a=UnGmZZGerJD5!tWk#Kj!wMCv=Em3E5df=Ed7&%F!=k7nHr-e%hdNE+w=Nzgpjq29'

                jwt.verify(token, secret, (err, jwtPayload) => {
                    if (err) {
                        console.log('Cannot Verify token: ', err)
                        // If not, just return the error
                        if (err instanceof jwt.TokenExpiredError) {
                            throw UnauthorizedError('Token is expired')
                        } else {
                            throw UnauthorizedError('Token is not valid')
                        }
                    } else {
                        tempPayload = jwtPayload
                    }
                })

                if (tempPayload) {
                    console.log('Jwt payload obtained successfully')
                    payload = tempPayload as JwtPayload
                    return payload
                }
                // // Return error (to satisfy Typescript demannds)
                throw new Error('  We should never reach here')
            }
        } else {
            console.log('Invalid audience in token')
            throw new Error('Invalid audience in token')
        }
    } catch (error: jwt.JsonWebTokenError | H3Error | any) {
        let msg: string = error.message
        if (error instanceof H3Error) return error
        if (error instanceof jwt.JsonWebTokenError) {
            msg = error.message + ` [jwt.JsonWebTokenError]`
        }
        console.log('Error decoding token:', error.message)
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: ':Error decoding token: ' + msg,
            stack: undefined,
        })
    } finally {
        console.log('---------------- end verifyAccessToken --------------------------------')
    }
}
