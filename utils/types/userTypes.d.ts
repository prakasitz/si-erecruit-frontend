
export type SRC_User = {

    SAP_ID: string //pk

    SAP_name?: string

    role_ID: number

    local_user: boolean

    local_password?: string

    locked_user: boolean

    note?: string

    name?: string

    lastname?: string

    last_login?: Date

    created_by?: string

}


