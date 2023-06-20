import { useUserStore } from '~/stores/user.store'

export default function useCandidate() {
    return {
        loginCandidate,
        checkPID,
        getUserInfo,
        getStatus,
    }
}

async function loginCandidate(pid?: string | undefined, password?: string | undefined) {
    const response = await useApi('/auth/login', {
        method: 'POST',
        body: {
            pid: pid?.toString(),
            password: password?.toString(),
        },
    })

    if (response.error.value?.data)
        throw createError({
            statusCode: response.error.value?.statusCode,
            statusMessage: response.error.value?.message,
        })

    return response
}

async function checkPID() {
    const response = await useApi('/auth/check-pid', {
        method: 'POST',
        body: {
            pid: 123456,
        },
    })
    if (response.error.value?.data)
        throw createError({
            statusCode: response.error.value?.statusCode,
            statusMessage: response.error.value?.message,
        })

    return response
}

async function getUserInfo() {
    const response = await useApi('/auth/userinfo', {
        method: 'GET',
    })

    if (response.error.value?.data)
        throw createError({
            statusCode: response.error.value?.statusCode,
            statusMessage: response.error.value?.message,
        })

    const userStore = (await useUserStore()) as any
    userStore.setUserInfo(response.data.value)

    return response
}

async function getStatus() {}
