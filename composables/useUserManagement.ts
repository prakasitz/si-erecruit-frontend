import { SRC_User } from '~/utils/types'

export default function useUserManagement() {
    return {
        fetchSRCUsers,
        fetchSRCUserById,
        createSRCUser,
        updateSRCUserById,
        deleteSRCUserById,
        updatePsswordSRCUserById,
    }
}
const fetchSRCUsers = () => {
    /*
     */
    return useApi('/external/users/get', {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
        transform(data: SRC_User[]) {
            return data.map((item: any) => {
                return {
                    SAP_ID: item.SAP_ID,
                    SAP_name: item.SAP_name,
                    name: item.name,
                    lastname: item.lastname,
                    note: item.note,
                    role_ID: item.role_ID,
                    local_user: item.local_user,
                    locked_user: item.locked_user,
                    last_login_str: item.last_login
                        ? dateToString(item.last_login, DateFormatEnum.DATE_TIME_BUDDHIST_1)
                        : '-',
                }
            })
        },
        key: 'fetchSRCUsers',
        server: false,
    })
}

const fetchSRCUserById = (sap_id: any, type?: string) => {
    /*
     */
    return useApi(`/external/users/get/${sap_id}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
        query: {
            type: type,
        },
        transform(data: SRC_User) {
            return data
        },
        key: `fetchSRCUserById-${sap_id}`,
        server: false,
    })
}

const createSRCUser = (srcUser: SRC_User) => {
    /*
     */
    type ResponseCreateSRCUser = {
        rowAffects: SRC_User
    }

    return useFetch<ResponseCreateSRCUser>(`/api/external/users/create`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        body: srcUser,
        key: 'createSRCUser',
        server: false,
    })
}

const updateSRCUserById = (srcUser: SRC_User) => {
    /*
     */
    return useFetch(`/api/external/users/update`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PUT',
        key: `updateSRCUserById-${srcUser.SAP_ID}`,
        body: srcUser,
        server: false,
    })
}

const updatePsswordSRCUserById = (srcUser: SRC_User) => {
    /*
     */
    return useFetch(`/api/external/users/updatePassword`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
        key: `updatePsswordSRCUserById-${srcUser.SAP_ID}`,
        cache: 'no-store',
        body: srcUser,
        server: false,
    })
}

const deleteSRCUserById = (srcUser: SRC_User) => {
    return useFetch(`/api/external/users/delete/${srcUser.SAP_ID}`, {
        headers: {
            Accept: 'application/json',
        },
        key: `deleteSRCUserById-${srcUser.SAP_ID}`,
        method: 'DELETE',
        server: false,
    })
}
