import { IAuth, UserLogin } from './auth.interface'
import axios from 'axios'
import cookieHelper from '~/helper/cookie.helper'

const cookie = cookieHelper()

export class UserAuth implements IAuth {
    constructor() {}

    async signIn(userLogin: UserLogin): Promise<string> {
        const runtimeConfig = useRuntimeConfig()

        try {
            let { data } = await axios({
                method: 'POST',
                url: `${runtimeConfig.public.baseApi}/hr-user/auth`,
                data: {
                    username: userLogin.username,
                    password: userLogin.password,
                },
            })
            cookie.setCookie('access_token', data)
            return data
        } catch (err: any) {
            console.log('signIn', err)
            throw err.response
        }
    }

    signOut(): boolean {
        return false
    }

    async getUser(): Promise<UserInfo> {
        const runtimeConfig = useRuntimeConfig()

        const access_token: string = cookie.getCookie('access_token')

        let { data } = await axios({
            method: 'POST',
            url: `${runtimeConfig.public.baseApi}/hr-user/auth/userinfo`,
            data: {
                access_token: access_token,
            },
        })

        return data
    }
}

export interface UserInfo {
    profile_id: string
    pid: string
    secret: string
    role: string
    name: string
}
