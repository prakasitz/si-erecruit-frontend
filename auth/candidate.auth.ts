import { IAuth, UserLogin } from "./auth.interface";
import axios from 'axios';
import useCookie from '~/composable/useCookie'

const cookie = useCookie()

export class CandidateAuth implements IAuth {
    constructor() {

    }
    async signIn(userLogin: UserLogin): Promise<string> {
        try {
            let { data } = await axios({
                method: 'POST',
                url: 'http://172.27.150.169:3010/cadidate/auth',
                data: {
                    pid: userLogin.pid,
                    password: userLogin.password
                }
            });
            cookie.setCookie('access_token', data);
            this.getUser();

            return data
        } catch (err: any) {
            throw err.response;
        }
    }

    signOut(): boolean {
        return false
    }

    async getUser(): Promise<UserInfo> {
        const access_token: string = cookie.getCookie('access_token')

        let { data } = await axios({
            method: 'POST',
            url: 'http://172.27.150.169:3010/cadidate/auth/userInfo',
            data: {
                access_token: access_token
            }
        });

        const { commonid, commonname, displayname, role, secret } = data;

        const userInfo: UserInfo = {
            name: displayname,
            pid: commonname,
            profile_id: commonid,
            role: role,
            secret: secret,
        };

        return userInfo;

    }

}

export interface UserInfo {
    profile_id: string
    pid: string
    secret: string
    role: string
    name: string
}
