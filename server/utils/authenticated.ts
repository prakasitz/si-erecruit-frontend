export function getAuthenticatedRoutes(): Array<string> {
    /*
     ? all routes using 
    */
    return [
        //common routes
        // '/api/auth/login', ==> noone token
        '/api/auth/logout',
        // '/api/auth/check-pid',

        //use header is access_token
        '/api/auth/userinfo',
        '/api/profile/**',
        '/api/external/master/**',

        //hr routes
        '/api/external/jobs/**',

        //candidate routes
    ]
}
