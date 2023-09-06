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
