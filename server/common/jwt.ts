import { JwksClient } from 'jwks-rsa'
import jwt from 'jsonwebtoken'

export async function verifySignature(token: any, done: any) {
    const jwksClient = new JwksClient({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.URI_ADFS_JWKS}`,
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
