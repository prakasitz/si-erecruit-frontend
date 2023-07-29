import { Roles } from '~/utils/types'
import { FetchError } from 'ofetch'
import { useUserStore } from '~/stores/user.store'

export const useAuth = () => {
    const userStore = useUserStore()
    // Sets the user information in the userStore.
    const setUser = (user: any) => {
        const { setUserInfo } = userStore
        console.log('setUser', user)
        setUserInfo(user)
    }

    // This function is currently commented out and not in use.
    // const setCookie = (cookie: any) => {
    //     cookie.value = cookie;
    // }

    // Handles user login. Makes an API call to authenticate the user.
    const login = async (username: any, password: any, role: Roles) => {
        try {
            const { error, data } = await useApi('/auth/login', {
                method: 'POST',
                headers: {
                    'X-Role': role,
                },
                body: {
                    username,
                    password,
                },
            })

            if (error.value) throw error.value
        } catch (error: FetchError | any) {
            throw error
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
            console.log('error on me', error)
            throw error.data
        }
    }

    // Retrieves user information. Makes an API call to get user data.
    const me = async () => {
        if (!userStore.value) {
            try {
                const { data, error } = await useApi('/auth/userinfo', {
                    method: 'GET',
                })

                if (error.value) throw error.value

                setUser(data.value)
            } catch (error: FetchError | any) {
                console.log('error on me', error)
                throw error.data
            }
        }
    }

    return {
        login,
        logout,
        me,
    }
}
