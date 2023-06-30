import { useUserStore } from '~/stores/user.store'

export default function useHR() {
    return {
        loginHR,
        fetchUserInfo,
        getStatus,
    }
}

async function loginHR(username?: string | undefined, password?: string | undefined) {
    const response = await useApi('/auth/login', {
        method: 'POST',
        headers: {
            'x-role': RoleEnum.HR,
        },
        body: {
            username,
            password,
        },
    })

    if (response.error.value?.data)
        throw createError({
            statusCode: response.error.value?.statusCode,
            statusMessage: response.error.value?.message,
            message: '[m:login-hr]',
        })

    return response
}

async function fetchUserInfo() {
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
