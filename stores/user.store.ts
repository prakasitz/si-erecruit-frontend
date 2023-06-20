export const useUserStore = defineStore('userinfo', {
    state: (): any => {
        return {
            displayname: null,
            role: null,
            commonid: null,
            commonname: null,
            secret: null,
        }
    },
    actions: {
        async setUserInfo(data: any) {
            this.displayname = data.displayname
            this.role = data.role
            this.commonid = data.commonid
            this.commonname = data.commonname
            this.secret = data.secret
        },
    },
})
