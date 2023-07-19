export default function useProfile() {
    return {
        loginCandidate,
        getUserInfo,
        getStatus,
        importProfile,
    }
}

async function loginCandidate() {}

async function getUserInfo() {}

async function getStatus() {}

async function importProfile(file: File) {
    const formData = new FormData()
    formData.append('file', file)

    console.log('file', formData)

    return await useApi('/api/profile/import', {
        method: 'POST',
        body: formData,
    })
}
