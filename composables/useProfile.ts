import { Profile } from '~/utils/types'

export default function useProfile() {
    return {
        loginCandidate,
        getUserInfo,
        getStatus,
        importProfile,
        getProfileById,
    }
}

async function loginCandidate() {}

async function getUserInfo() {}

async function getStatus() {}

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
