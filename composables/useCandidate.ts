export default function useCandidate() {
    return {
        loginCandidate,
        checkPID,
        getUserInfo,
        getStatus,
    }
}

async function loginCandidate() {
    const response = await useApi('/auth/login', {
        method: 'POST',
        body: {
            pid: 123456,
            password: 123456,
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
    return response
}

async function getUserInfo() {
    const response = await useApi('/auth/userinfo', {
        method: 'GET',
    })

    return response
}

async function getStatus() {}
