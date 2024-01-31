import { ContextUser, UserType, jwtAdfs, jwtCandidate } from '~/utils/types'
import { FetchError } from 'ofetch'
import { useUserStore } from '~/stores/user.store'
import { error } from 'console'

export const useAuth = () => {
    const userStore = useUserStore()

    // This function is currently commented out and not in use.
    // const setCookie = (cookie: any) => {
    //     cookie.value = cookie;
    // }

    // Handles user login. Makes an API call to authenticate the user.
    const login = async (username: any, password: any, type: UserType) => {
        try {
            const appBaseUrl = useRuntimeConfig().app.baseURL
            console.log('🎈 appBaseURL:', appBaseUrl, type)

            const pidOrUserName = type === 'CANDIDATE' ? 'pid' : 'username'
            const { data, error } = await useApi('/auth/login', {
                method: 'POST',
                headers: {
                    'X-Type': type,
                },
                body: {
                    [pidOrUserName]: username,
                    password,
                },
            })

            if (error.value) throw error.value

            const route = useRoute()
            let redirectOrNull = route.query.redirect as string | null
            let urlIndex = type === 'CANDIDATE' ? 'candidate/' : ''

            if (redirectOrNull && redirectOrNull.startsWith('/')) {
                //remove '/' from redirect
                redirectOrNull = redirectOrNull.slice(1)
            }

            let URL_str = `${appBaseUrl}${redirectOrNull || urlIndex}`

            console.log('🎈 redirectURL:', URL_str, {
                redirectOrNull,
                urlIndex,
            })
            // comment for check url_str
            await navigateTo(
                { path: URL_str },
                {
                    external: true,
                }
            )
        } catch (error: FetchError | any) {
            throw createError({
                statusCode: error.statusCode,
                message: error.data.message,
                stack: undefined,
                fatal: true,
            })
        }
    }

    // Handles user logout. Logs a message to the console.
    const logout = async () => {
        //clear cookie and redirect to login
        try {
            const { data, error } = await useApi('/auth/logout', {
                method: 'POST',
            })
            if (error.value) throw error.value
            userStore.$reset()
            return navigateTo(data.value.redirect)
        } catch (error: FetchError | any) {
            console.log('🔴 logout:erorr', error)
            throw createError({
                statusCode: error.statusCode,
                message: error.data.message,
            })
        }
    }

    // Retrieves user information. Makes an API call to get user data.
    const me = async (): Promise<ContextUser<jwtAdfs & jwtCandidate>> => {
        try {
            const { data, error } = await useApi('/auth/userinfo', {
                method: 'GET',
                key: 'me',
            })

            if (error.value) throw error.value
            if (!data.value) throw createError({ statusCode: 401, message: 'Unauthorized' })

            return data.value
        } catch (error: FetchError | any) {
            throw createError({
                statusCode: error.statusCode,
                message: error.message || error.data.message || error,
            })
        }
    }

    const decryptSecret = async (userInfo: (jwtAdfs & jwtCandidate) | undefined) => {
        if (!userInfo || !userInfo.secret) return

        if (process.client) return

        const { data } = await useApi('/auth/decrypt-secret', {
            method: 'POST',
            key: 'decrypt-secret',
            server: true,
            body: {
                key: process.server ? process.env.NUXT_ENCRYPT_KEY : '',
                secret: userInfo.secret,
            },
        })
        userInfo.secret = data.value.decrypted || userInfo.secret

        console.log('🚩 userInfo', userInfo)
    }

    return {
        login,
        logout,
        me,
        decryptSecret,
    }
}
