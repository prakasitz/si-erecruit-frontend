export type Roles = 'SUPER_ADMIN' | 'ADMIN' | 'HR' | 'CANDIDATE'

export interface jwtToken {
    aud: string
    iss?: string
    nbf?: number
    iat: number
    exp: number
    sub: string
}

export interface jwtAdfs extends jwtToken {
    role: Roles[]
    email?: string
    upn?: string
    Department?: string
    group?: string[]
    auth_time?: Date
}

export interface jwtCandidate extends jwtToken {
    role: Roles[]
    displayname: string
    commonid: string
    commonname: string
    secret: string
}

export type RequestDecryptSecret = {
    key?: string
    secret?: string
}

// create interface for fn(user Context<jwtAdfs>) => user.role
export type ContextUser<T = jwtAdfs | jwtCandidate> = T

export type Permission = 'can-access-admin' | 'can-access-hr' | 'can-access-candidate' | 'can-access-hr-candidate'

export type TokensSession = {
    accessToken: string
    refreshToken: string
    sid?: string
}

export type TokenSession = {
    access_token: string
}

export type Candidate = {
    id: string
    pid: string
    password: string
    first_name: string
    last_name: string
    is_active: boolean
    last_login: Date | null

    role: Roles.CANDIDATE
    created_at: Date
}
