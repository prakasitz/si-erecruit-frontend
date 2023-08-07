import { MasterProvince, MasterTitleConferred } from '~/utils/types'
import { defineStore } from 'pinia'

export type MasterState = {
    provinces: MasterProvince[]
    marital_status: any[]
    military: any[]
    blood: any[]
    title: any[]
    titleTH: any[]
    titleEN: any[]
    title_specials: any[]
    title_academics: any[]
    title_military: any[]
    title_conferrends: MasterTitleConferred[]
    religions: any[]
    levels: any[]
    certificates: any[]
    majors: any[]
    institutes: any[]
    races: any[]
    positions: any[]

    isLoaded: {
        provinces: boolean
        marital_status: boolean
        military: boolean
        blood: boolean
        title: boolean
        titleTH: boolean
        titleEN: boolean
        title_specials: boolean
        title_academics: boolean
        title_military: boolean
        title_conferrends: boolean
        religions: boolean
        levels: boolean
        certificates: boolean
        majors: boolean
        institutes: boolean
        races: boolean
        positions: boolean
    }
}

export const useMasterDataStore = defineStore('master_data', {
    state: (): MasterState => {
        return {
            provinces: [] as MasterProvince[],
            marital_status: [] as any[],
            military: [] as any[],
            blood: [] as any[],
            title: [] as any[],
            titleTH: [] as any[],
            titleEN: [] as any[],
            title_specials: [] as any[],
            title_academics: [] as any[],
            title_military: [] as any[],
            title_conferrends: [] as MasterTitleConferred[],
            religions: [] as any[],
            levels: [] as any[],
            certificates: [] as any[],
            majors: [] as any[],
            institutes: [] as any[],
            races: [] as any[],
            positions: [] as any[],

            isLoaded: {
                provinces: false as boolean,
                marital_status: false as boolean,
                military: false as boolean,
                blood: false as boolean,
                title: false as boolean,
                titleTH: false as boolean,
                titleEN: false as boolean,
                title_specials: false as boolean,
                title_academics: false as boolean,
                title_military: false as boolean,
                title_conferrends: false as boolean,
                religions: false as boolean,
                levels: false as boolean,
                certificates: false as boolean,
                majors: false as boolean,
                institutes: false as boolean,
                races: false as boolean,
                positions: false as boolean,
            },
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
