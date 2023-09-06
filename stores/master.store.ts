import { MasterProvince, MasterStore, MasterTitleConferred } from '~/utils/types'
import { defineStore } from 'pinia'

export const useMasterDataStore = defineStore('master_data', {
    state: (): MasterStore => {
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
            title_conferreds: [] as MasterTitleConferred[],
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
                title_conferreds: false as boolean,
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
        setProvince(data: any) {
            this.provinces = data
        },

        setMaritalStatus(data: any) {
            this.marital_status = data
        },

        setMilitary(data: any) {
            this.military = data
        },

        setBlood(data: any) {
            this.blood = data
        },

        setTitle(data: any) {
            this.title = data
        },

        setTitleTH(data: any) {
            this.titleTH = data
        },

        setTitleEN(data: any) {
            this.titleEN = data
        },

        setTitleSpecial(data: any) {
            this.title_specials = data
        },

        setTitleAcademic(data: any) {
            this.title_academics = data
        },

        setTitleMilitary(data: any) {
            this.title_military = data
        },

        setTitleConferrend(data: any) {
            this.title_conferreds = data
        },

        setReligion(data: any) {
            this.title_conferreds = data
        },

        setLevel(data: any) {
            this.levels = data
        },

        setCertificate(data: any) {
            this.certificates = data
        },

        setMajor(data: any) {
            this.majors = data
        },

        setInstitute(data: any) {
            this.institutes = data
        },

        setRace(data: any) {
            this.races = data
        },

        setPosition(data: any) {
            this.positions = data
        },
    },
})
