import { defineStore } from 'pinia'
import { UserStore } from '~/utils/types'

export const useUserStore = defineStore('userinfo', {
    state: (): UserStore => {
        return {
            user: {
                displayname: null,
                role: null,
            },

            sub: null,
            employee_id: null,
            department: null,
            last_login: null,
            commonid: null,
            commonname: null,
            secret: null,
            exp: null,
        }
    },
    getters: {
        isSuperAdmin: ({ user }) => user.role?.includes('SUPER_ADMIN'),
        isAdmin: ({ user }) => user.role?.includes('ADMIN') || user.role?.includes('SUPER_ADMIN'),
        isHR: ({ user }) => user.role?.includes('HR'),
        isCandidate: ({ user }) => user.role?.includes('CANDIDATE'),
        pageLayout: ({ user }) => {
            if (user.role?.includes('CANDIDATE')) return 'defaultcandidate'
            if (user.role?.includes('HR')) return 'default'
            return 'default'
        },
    },
    actions: {
        async updateUserInfoHR(data: any) {
            this.user = {
                displayname: data.display_name || data.displayname,
                role: data.role,
            }
            // HR && ADMIN
            this.sub = data.sub
            this.employee_id = data.employee_id
            this.department = data.department
        },
        async updateUserInfoCandidate(data: any) {
            this.user = {
                displayname: data.displayname,
                role: data.role,
            }

            //Candidate
            this.commonid = data.commonid
            this.commonname = data.commonname
            this.last_login = data.last_login
            this.exp = data.exp
        },
        async setUserInfo(data: any, isServer: boolean) {
            this.user = {
                displayname: data.display_name || data.displayname,
                role: data.role,
            }

            if (!this.isCandidate) {
                // HR && ADMIN
                this.sub = data.sub
                this.employee_id = data.employee_id
                this.department = data.department
                this.commonid = data.sub
            } else {
                //Candidate
                this.commonid = data.commonid
                this.commonname = data.commonname
                this.last_login = data.last_login
                this.exp = data.exp

                if (isServer) {
                    this.secret = data.secret
                }
                // else this.secret = this.secret
            }
        },
    },
})
