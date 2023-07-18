import { Roles } from '~/utils/types'
import { FetchError } from 'ofetch'
import { useUserStore } from '~/stores/user.store'

export const useAuth = () => {
    const userStore = useUserStore()

    const setUser = (user: any) => {
        const { setUserInfo } = userStore
        console.log('setUser', user)
        setUserInfo(user)
    }

    // const setCookie = (cookie: any) => {
    //     cookie.value = cookie
    // }

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

    const logout = async () => {
        console.log('logout!!')
    }

    const me = async (role: Roles) => {
        if (!userStore.value) {
            try {
                const { data, error } = await useApi('/auth/userinfo', {
                    method: 'GET',
                    headers: {
                        'x-role': role,
                    },
                })

                if (error.value) throw error.value
                setUser(data.value)
            } catch (error: FetchError | any) {
                throw error
            }
        }

        return userStore
    }

    return {
        login,
        logout,
        me,
    }
}
