import { useUserStore } from '~/stores/user.store'

export default function useHR_BACK() {
    return {
        loginHR,
        fetchUserInfo,
        getStatus,
    }
}

async function loginHR(username?: string | undefined, password?: string | undefined) {
    try {
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

        // console.log('helloworld')
        // console.log(response.error.value.data)
        // console.log({
        //     statusCode: response.error.value?.data.statusCode,
        //     statusMessage: response.error.value?.data.message,
        //     message: '[m:login-hr]',
        // })

        console.error('response', response)

        // throw showError({
        //     statusCode: data.statusCode,
        //     statusMessage: data.statusMessage,
        //     message: `[m:login-hr] ${message}`,
        // })
        console.log(response)
        return response
    } catch (error) {
        console.log('catch!!!')
        // throw showError({
        //     statusCode: data.statusCode,
        //     statusMessage: data.statusMessage,
        //     message: `[m:login-hr] ${message}`,
        // })
    }
}

async function fetchUserInfo() {
    try {
        const response = await useApi('/auth/userinfo', {
            method: 'GET',
            headers: {
                'x-role': RoleEnum.HR,
            },
        })
    } catch (error) {
        console.error('error:fetchUserInfo', error)
    }

    // if (response.error.value?.data)
    //     throw createError({
    //         statusCode: response.error.value?.data.statusCode,
    //         statusMessage: response.error.value?.data.message,
    //     })

    // const userStore = (await useUserStore()) as any
    // userStore.setUserInfo(response.data.value)

    // return response
}

async function getStatus() {}
