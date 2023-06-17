const config = useRuntimeConfig()

export function getAuthenticatedRoutes(): Array<string> {
    return ['/api/auth/login','/api/auth/check-pid']
}
