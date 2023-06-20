export const useApi = async (url: any, params: any) => {
    const cookie = useCookie('token')

    const config = useRuntimeConfig()

    const opts = {
        key: url,
        baseURL: config.public.baseApi,

        async onRequest({ options }: any) {
            options.headers = options.headers || {}
            if (cookie.value) {
                options.headers['x-access-token'] = cookie.value
            }
        },

        async onRequestError({ error }: any) {
            console.log(error.message)
        },

        async onResponse({ request, response, options }: any) {
            // Process the response data
            if (response.ok) {
                if (options.callback) {
                    await options.callback(response.ok)
                }
            }
        },

        async onResponseError({ response }: any) {
            console.log(response._data.message)
        },

        ...params,
    }

    const { data, pending, error, refresh, execute } = await useFetch(url, opts)

    return {
        data: data,
        pending: pending,
        error: error,
        execute: execute,
        refresh: refresh,
    }
}