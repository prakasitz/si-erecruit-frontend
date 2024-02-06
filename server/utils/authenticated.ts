export function getAuthenticatedRoutes(): Array<string> {
    /*
     ? all routes using 
    */

    return [
        //common routes
        // '/api/auth/login', ==> noone token
        `/api/auth/logout`,
        // '/api/auth/check-pid',

        `/api/auth/decrypt-secret`,

        //use header is access_token
        `/api/auth/userinfo`,

        `/api/external/master/**`,

        //hr routes
        `/api/external/jobs/**`,

        `/api/external/users/**`,

        //candidate routes
        `/api/external/profile/**`,
        `/api/external/candidate/**`,

        //admin route
        `/api/external/logs/**`,
    ]
}
