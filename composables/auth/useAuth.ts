import { ContextUser, Roles, jwtAdfs, jwtCandidate } from '~/utils/types'
import { FetchError } from 'ofetch'
import { useUserStore } from '~/stores/user.store'

export const useAuth = () => {
    const userStore = useUserStore()

    // This function is currently commented out and not in use.
    // const setCookie = (cookie: any) => {
    //     cookie.value = cookie;
    // }

    // Handles user login. Makes an API call to authenticate the user.
    const login = async (username: any, password: any, role: Roles) => {
        try {
            const pidOrUserName = role === 'CANDIDATE' ? 'pid' : 'username'
            const { data, error } = await useApi('/auth/login', {
                method: 'POST',
                headers: {
                    'X-Role': role,
                },
                body: {
                    [pidOrUserName]: username,
                    password,
                },
            })

            if (error.value) throw error.value
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
            console.log('error on logout', error)
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

            return data.value
        } catch (error: FetchError | any) {
            console.log('error on me', error)
            throw createError({
                statusCode: error.statusCode,
                message: error.data.message,
            })
        }
    }

    const decryptSecret = async (secret: string | undefined) => {
        if (!secret) return
        if (process.client) return
        const { data } = await useApi('/auth/decrypt-secret', {
            method: 'POST',
            key: 'decrypt-secret',
            server: true,
            body: {
                key: process.server ? process.env.NUXT_ENCRYPT_KEY : '',
                secret,
            },
        })
        return data.value?.decrypted || secret
    }

    return {
        login,
        logout,
        me,
        decryptSecret,
    }
}
