import { UseFetchOptions } from 'nuxt/app'
import { FetchResponse, FetchContext } from 'ofetch'

export const useApi = async (url: any, params: any | UseFetchOptions<HeadersInit>) => {
    const cookie = useCookie('token')

    const config = useRuntimeConfig()
    const opts: UseFetchOptions<any> = {
        ...params,
        key: params?.key || url,
        baseURL: config.public.baseApi,
        headers: {
            ...params?.headers,
            Accept: 'application/json',
        },

        async onRequest({ options }: any) {
            options.headers = options.headers || {}
            if (cookie.value) {
                options.headers['x-access-token'] = cookie.value
            }
        },

        async onRequestError({ error }: any) {
            console.log('❌ onRequestError', error.message)
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
            console.error('❌ [nuxt] ==> useApi:onResponseError:', response?.status)
            // const { showErrorOnDialog } = useErrorHandler()

            if (response?.status !== undefined) {
                //console.log('onResponseError', { response })
                // showErrorOnDialog({
                //     error: response._data,
                // })
            }
            //if response.status == 403 throw showError
            // only api response
            // if (response?.headers.get('Accept') !== 'application/json') {
            //     throw showError({
            //         statusCode: response?.status,
            //         message: response?._data.message + ', useApi onResponseError',
            //         stack: undefined,
            //     })
            // }
            // if (response && response.status) {
            //     console.log('createError')
            //     throw showError({
            //         statusCode: response?.status,
            //         message: response?._data.message,
            //         stack: undefined,
            //     })
            // }

            // showError({
            //     statusCode: response?.status,
            // })
            // if (response?.status === 401) {
            //     console.log('401')
            //     // redirect('/login')
            // } else {
            //     console.log('onResponseError Any status')
            //     showError({
            //         statusCode: response?.status,
            //         message: response?._data.message,
            //         stack: undefined,
            //     })
            // }
        },
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
