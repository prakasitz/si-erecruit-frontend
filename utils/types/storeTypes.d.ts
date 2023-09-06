export type UserData = {
    displayname: null | string
    role: null | string
}

export type UserStore = {
    user: UserData
    sub: null | string
    employee_id: null | string
    department: null | string
    commonid: null | string
    commonname: null | string
    secret: null | string
    exp: null | string
}

export type MasterStore = {
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
    title_conferreds: MasterTitleConferred[]
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
        title_conferreds: boolean
        religions: boolean
        levels: boolean
        certificates: boolean
        majors: boolean
        institutes: boolean
        races: boolean
        positions: boolean
    }
}
