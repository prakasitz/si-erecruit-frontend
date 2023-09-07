import { DialogContext, Profile } from '~/utils/types'
import { H3Event, H3Error } from 'h3'
import { usePersonalStore } from '~/stores/personal.store'

//emit?: (event: 'refreshProfile', onRefresh?: () => Promise<void>) => void

export default function useProfile() {
    return {
        submit,
        draft,
        loginCandidate,
        getUserInfo,
        getStatus,
        importProfile,
        getProfileById,
        suspendedProfile,
        publishableProfile,
    }
}

async function loginCandidate() {}

async function getUserInfo() {}

async function getStatus() {}

async function submit(id: string) {
    const personalStore = usePersonalStore()
    const _data = personalStore.$state
    _data.marriage.children_list.push({
        birth_date: '2021-09-09',
        birth_province: '23',
        child_welfare: '1',
        first_name: 'สมชาย',
        id: 1,
        id_card: '1234567890123',
        last_name: 'สมหญิง',
        nationality: 'TH',
        race: 'TH',
        religion: '01',
        title: 'ด.ช.',
    })

    return useApi(`/api/external/profile/draft/${parseInt(id)}`, {
        body: {
            ..._data,
        },
        method: 'PUT',
        key: 'submit',
        watch: false,
    })
}

async function draft() {}

function getProfileById(id: string) {
    return useFetch(`/api/external/profile/get/${parseInt(id)}`, {
        method: 'POST',
        key: 'getProfileById',
        transform: ({ profile }: { profile: Profile }) => {
            return profile
        },
    })
}

async function importProfile(files: File[]) {
    if (files.length == 0) return
    const file = files[0]
    const formData = new FormData()
    formData.append('file', file)
    const { data, pending, error } = await useApi('/api/external/profile/import', {
        method: 'POST',
        body: formData,
    })

    if (error.value?.data)
        throw showError({
            statusCode: error.value?.statusCode,
            message: error.value?.message,
        })
    return { data: data.value, pending: pending.value, error: error.value }
}

const response = async (resp: any, data: DialogContext.ItemID): Promise<DialogContext.BtnActionCallBack> => {
    if (resp?.data?.value?.data) {
        await refreshNuxtData('getProfilesByJobId')
        return {
            status: true,
            message: `บันทึกสำเร็จ`,
            callbackActionBtn: [
                {
                    text: 'close',
                    //href: `/job_management/${data.job_ID}`,
                },
            ],
        }
    } else if (resp?.error?.value?.data) {
        console.log({ a: resp.error.value })
        const route = useRoute()
        const { showTokenExpired } = useErrorHandler()

        let statusCode = resp.error.value.statusCode
        if (statusCode === 401) showTokenExpired(route)
        await refreshNuxtData('getProfilesByJobId')

        return {
            status: false,
            message: resp?.error?.value?.data.message as string,
        }
    } else {
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

async function wavieProfile(event: H3Event, data: DialogContext.ItemID): Promise<DialogContext.BtnActionCallBack> {
    const resp = await useApi(`/api/external/profile/wavie`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
        server: false,
        body: data.profile_IDs,
    })

    if (resp?.data?.value?.data) {
        return {
            status: true,
            message: `บันทึกสำเร็จ`,
            callbackActionBtn: [
                {
                    text: 'close',
                    // href: `/job_management/${data.job_ID}`,
                },
            ],
        }
    } else if (resp?.error?.value?.data) {
        return {
            status: false,
            message: resp?.error?.value?.data.message as string,
        }
    } else {
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

async function suspendedProfile(event: H3Event, data: DialogContext.ItemID): Promise<DialogContext.BtnActionCallBack> {
    const resp = await useApi(`/api/external/profile/suspended`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
        server: false,
        body: data.profile_IDs,
    })

    return response(resp, data)
}

async function publishableProfile(
    event: H3Event,
    data: DialogContext.ItemID
): Promise<DialogContext.BtnActionCallBack> {
    const resp = await useApi(`/api/external/profile/publishable`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
        server: false,
        body: data.profile_IDs,
    })

    return response(resp, data)
}
