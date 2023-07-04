export function getAuthenticatedRoutes(): Array<string> {
    /*
     ? all routes using 
    */
    return [
        //common routes
        // '/api/auth/login', ==> noone token
        // '/api/auth/check-pid',

        //use header is access_token
        '/api/auth/userinfo',
        '/api/master/**',
        '/api/profile/**',

        //hr routes
        '/api/job/**',

        //candidate routes
    ]
}
