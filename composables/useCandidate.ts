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

async function getUserInfo() {}

async function getStatus() {}
