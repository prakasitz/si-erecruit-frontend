import { IAuth, UserLogin } from './auth.interface'
import axios from 'axios'
import cookieHelper from '~/helper/cookie.helper'

const cookie = cookieHelper()

export class CandidateAuth implements IAuth {
    constructor() {}
    async signIn(userLogin: UserLogin): Promise<string> {
        const runtimeConfig = useRuntimeConfig()

        try {
            let { data } = await axios({
                method: 'POST',
                url: `${runtimeConfig.public.baseApi}/candidate/auth`,
                data: {
                    pid: userLogin.username,
                    password: userLogin.password,
                },
            })
            cookie.setCookie('access_token', data, {
                path: useRuntimeConfig().app.baseURL,
            })
            this.getUser()
            return data
        } catch (err: any) {
            throw err.response
        }
    }

    signOut(): boolean {
        cookie.setCookie('access_token', '')
        navigateTo('/login_candidate')
        return false
    }

    async getUser(): Promise<UserInfo> {
        const runtimeConfig = useRuntimeConfig()

        const access_token: string = cookie.getCookie('access_token')

        let { data } = await axios({
            method: 'POST',
            url: `${runtimeConfig.public.baseApi}/candidate/auth/userInfo`,
            data: {
                access_token: access_token,
            },
        })

        const { commonid, commonname, displayname, role, secret } = data

        const userInfo: UserInfo = {
            name: displayname,
            pid: commonname,
            profile_id: commonid,
            role: role,
            secret: secret,
        }

        return userInfo
    }
}

export interface UserInfo {
    profile_id: string
    pid: string
    secret: string
    role: string
    name: string
}
