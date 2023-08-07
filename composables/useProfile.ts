import { profile } from 'console'
import { Profile } from '~/utils/types'
import { H3Event, H3Error } from 'h3'

export default function useProfile() {
    return {
        loginCandidate,
        getUserInfo,
        getStatus,
        importProfile,
        suspendedProfile,
        getProfileById
    }
}

async function loginCandidate() { }

async function getUserInfo() { }

async function getStatus() { }

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

async function suspendedProfile(event: H3Event, data: { profile_IDs: number[], job_ID: number }) {
    const resp = await useApi(`/api/external/profile/suspended`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
        server: false,
        body: data.profile_IDs
    })
    if (resp?.data?.value.data) {
        return {
            status: true,
            message: `asdadasd`,
            callbackActionBtn: [
                {
                    text: 'close',
                    to: `/job_management/${data.job_ID}`,
                },
            ],
        }
    } else {
        return {
            status: false,
            message: `Sorry, something went wrong.`,
        }
    }



}

function getProfileById(id: string) {
    return useApi(`/api/external/profile/get/${parseInt(id)}`, {
        method: 'POST',
        key: 'getProfileById',
        transform: ({ profile }: { profile: Profile }) => {
            return profile
        },
    })
}