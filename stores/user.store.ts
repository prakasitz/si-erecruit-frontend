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

            commonid: null,
            commonname: null,
            secret: null,
            exp: null,
        }
    },
    getters: {
        isAdmin: ({ user }) => user.role?.includes('ADMIN'),
        isHR: ({ user }) => user.role?.includes('HR'),
        isCandidate: ({ user }) => user.role?.includes('CANDIDATE'),
    },
    actions: {
        async setUserInfo(data: any) {
            this.user = {
                displayname: data.display_name || data.displayname,
                role: data.role,
            }

            // HR
            this.sub = data.sub
            this.employee_id = data.employee_id
            this.department = data.department
            this.commonid = data.sub

            //Candidate
            this.commonid = data.commonid
            this.commonname = data.commonname
            this.secret = data.secret
            this.exp = data.exp
        },
    },
})
