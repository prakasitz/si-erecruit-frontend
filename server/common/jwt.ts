import { JwksClient } from 'jwks-rsa'
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'

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
