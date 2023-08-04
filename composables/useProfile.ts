import { Profile } from '~/utils/types'

export default function useProfile() {
    return {
        loginCandidate,
        getUserInfo,
        getStatus,
        importProfile,
        suspendedProfile
        getProfileById,
    }
}

async function loginCandidate() { }

async function getUserInfo() { }

async function getStatus() {}

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

async function suspendedProfile(data: { profile_IDs: number[] }) {
    if (!data.profile_IDs) {
        console.log(123)
    }
    return useFetch(`/api/external/profile/suspended`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'PATCH',
        server: false,
    })
}