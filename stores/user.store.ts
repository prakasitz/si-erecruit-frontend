export const useMasterDataStore = defineStore('userinfo', {
    state: (): any => {
        return {
            
        }
    },
    getters: {
        isItemsLoaded: (state) => isTrue(state.isLoaded),
    },
    actions: {
        async setProvince(data: any) {
            this.provinces = data
        },

        async setMaritalStatus(data: any) {
            this.marital_status = data
        },

        async setMilitary(data: any) {
            this.military = data
        },

        async setBlood(data: any) {
            this.blood = data
        },

        async setTitle(data: any) {
            this.title = data
        },

        async setTitleTH(data: any) {
            this.titleTH = data
        },

        async setTitleEN(data: any) {
            this.titleEN = data
        },

        async setTitleSpecial(data: any) {
            this.title_specials = data
        },

        async setTitleAcademic(data: any) {
            this.title_academics = data
        },

        async setTitleMilitary(data: any) {
            this.title_military = data
        },

        async setTitleConferrend(data: any) {
            this.title_conferrends = data
        },

        async setReligion(data: any) {
            this.title_conferrends = data
        },

        async setLevel(data: any) {
            this.levels = data
        },

        async setCertificate(data: any) {
            this.certificates = data
        },

        async setMajor(data: any) {
            this.majors = data
        },

        async setInstitute(data: any) {
            this.institutes = data
        },

        async setRace(data: any) {
            this.races = data
        },

        async setPosition(data: any) {
            this.positions = data
        },
    },
})
