import { JwksClient } from 'jwks-rsa'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { H3Event, H3Error } from 'h3'

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

export async function verifyToken(token: string) {
    try {
        const isValid = await new Promise<boolean>((resolve, reject) => {
            verifySignature(token, (err: VerifyErrors | null, userInfo: JwtPayload | undefined) => {
                if (err) console.log('jwt:verifyToken', ' ', err)
                if (err) resolve(false)
                resolve(true)
            })
        })
        return isValid
    } catch (error: any) {
        throw new Error('error:' + error)
    }
}

export function setCookieLogin(event: H3Event, { token }: { token: string }) {
    setCookie(event, 'access_token', 'Bearer ' + token, {
        httpOnly: true,
        sameSite: 'strict',
        // secure: true,
    })
}

export async function getTokenPayload(token: string): Promise<H3Error | JwtPayload> {
    let tempPayload = null
    let payload = null
    let error = null
    const { audience } = useRuntimeConfig()

    try {
        const decoded: jwt.JwtPayload | null | string = jwt.decode(token)

        if (decoded && typeof decoded === 'object') {
            // this token from adfs
            let isValid: boolean = false
            if (decoded.aud === audience) {
                isValid = await verifyToken(token)
                console.log('getTokenPayload: Jwt payload obtained successfully')
                if (isValid) return decoded
                throw new Error('getTokenPayload: Cannot Verify token')
            } else {
                //should be using api for verify candidate token valid or not ?
                let secret =
                    'U2lyaXJhamVSZWNydWl0MjAyMQ==ZureF6AsmJed!3jZ@W-2Yn5CD#YYg%T7fmX_Bmk&gPvPR$^@2pY9WhB@a=UnGmZZGerJD5!tWk#Kj!wMCv=Em3E5df=Ed7&%F!=k7nHr-e%hdNE+w=Nzgpjq29'

                jwt.verify(token, secret, (err, jwtPayload) => {
                    if (err) {
                        console.log('getTokenPayload: Cannot Verify token')
                        // If not, just return the error
                        error = 'getTokenPayload: Cannot Verify token'
                    } else {
                        tempPayload = jwtPayload
                    }
                })

                if (tempPayload) {
                    console.log('getTokenPayload: Jwt payload obtained successfully')
                    payload = tempPayload as JwtPayload
                    return payload
                }
                // // Return error (to satisfy Typescript demannds)
                throw new Error('getTokenPayload:  We should never reach here')
            }
        } else {
            console.log('getTokenPayload: Invalid audience in token')
            throw new Error('getTokenPayload: Invalid audience in token')
        }
    } catch (error: jwt.JsonWebTokenError | any) {
        let msg: string = error.message
        if (error instanceof jwt.JsonWebTokenError) {
            msg = error.message
        }
        console.log('getTotkenPayload:Error decoding token:', error.message)
        return createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: 'getTokenPayload: Server error, Error decoding token: ' + msg,
            stack: undefined,
        })
    }
}
