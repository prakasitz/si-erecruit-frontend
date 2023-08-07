// import { storeToRefs } from 'pinia'
// import { useUserStore } from '~/stores/user.store'

export default function useCandidate() {
    return {
        checkPID,
    }
}

async function checkPID() {
    const response = await useApi('/auth/check-pid', {
        method: 'POST',
        body: {
            pid: 1100201370643,
        },
    })
    if (response.error.value?.data)
        throw createError({
            statusCode: response.error.value?.statusCode,
            statusMessage: response.error.value?.message,
        })

    return response
}
