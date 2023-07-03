import { UseFetchOptions } from 'nuxt/app'
import { FetchResponse, FetchContext } from 'ofetch'

export const useApi = async (url: any, params: UseFetchOptions<any>) => {
    const cookie = useCookie('token')

    const config = useRuntimeConfig()

    const opts: UseFetchOptions<any> = {
        key: url,
        baseURL: config.public.baseApi,
        headers: {
            Accept: 'application/json',
        },

        async onRequest({ options }: any) {
            options.headers = options.headers || {}
            if (cookie.value) {
                options.headers['x-access-token'] = cookie.value
            }
        },

        async onRequestError({ error }: any) {
            console.log('onRequestError', error.message)
        },

        async onResponse({ request, response, options }: any) {
            // Process the response data
            if (response.ok) {
                if (options.callback) {
                    await options.callback(response.ok)
                }
            }
        },

        async onResponseError({ response }: FetchContext<any>) {
            console.log('useApi:onResponseError:', response?.status)
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
