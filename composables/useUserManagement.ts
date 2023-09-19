import { SRC_User } from '~/utils/types'

export default function useUserManagement() {
    return {
        fetchSRCUsers,
        fetchSRCUserById,
        createSRCUserById,
        updateSRCUserById,
        deleteSRCUserById,
    }
}
const fetchSRCUsers = () => {
    /*
     */
    return useFetch('/api/external/users/get', {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
        transform(data: SRC_User[]) {
            return data.map((item: any): SRC_User => {
                return {
                    SAP_ID: item.SAP_ID,
                    SAP_name: item.SAP_name,
                    name: item.name,
                    lastname: item.lastname,
                    note: item.note,
                    role_ID: item.role_ID,
                    local_user: item.local_user,
                    locked_user: item.locked_user,
                    last_login: item.last_login,
                }
            })
        },
        server: false,
    })
}

const fetchSRCUserById = (sap_id: any) => {
    /*
     */
    return useFetch(`/api/external/users/get/${sap_id}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET',
        transform(data: SRC_User) {
            return data
        },
        server: false,
    })
}

const createSRCUserById = (srcUser: SRC_User) => {
    /*
     */
    return useFetch(`/api/external/users/create`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        body: srcUser,
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
        body: {
            ...srcUser,
        },
        transform(data: any) {
            return data
        },
        server: false,
    })
}

const deleteSRCUserById = (srcUser: SRC_User) => {
    /*
     */
    return useFetch(`/api/external/users/delete/${srcUser.SAP_ID}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
