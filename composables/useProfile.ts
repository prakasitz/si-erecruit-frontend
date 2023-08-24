import { Profile } from '~/utils/types'
import { H3Event, H3Error } from 'h3'
import { usePersonalStore } from '~/stores/personal.store'

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
    return useApi(`/api/external/profile/get/${parseInt(id)}`, {
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

async function suspendedProfile(event: H3Event, data: { profile_IDs: number[]; job_ID: number }) {
    const resp = await useApi(`/api/external/profile/suspended`, {
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
                    href: `/job_management/${data.job_ID}`,
                },
            ],
        }
    } else if (resp?.error?.value?.data) {
        return {
            status: false,
            message: resp?.error?.value?.data.message,
        }
    } else {
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}

async function publishableProfile(event: H3Event, data: { profile_IDs: number[]; job_ID: number }) {
    const resp = await useApi(`/api/external/profile/publishable`, {
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
                    href: `/job_management/${data.job_ID}`,
                },
            ],
        }
    } else if (resp?.error?.value?.data) {
        return {
            status: false,
            message: resp?.error?.value?.data.message,
        }
    } else {
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }
}
