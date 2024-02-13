import { FetchError } from 'ofetch'
import { H3Error } from 'h3'
import { RouteLocationNormalizedLoaded } from '~/.nuxt/vue-router'

export default function useErrorHandler() {
    return {
        middlewareError,
        showTokenExpired,
        showErrorOnDialog,
    }
}

function middlewareError(error: H3Error, { to, from }: any) {
    if (isNuxtError(error) && error.statusCode === 401) {
        const route = useRoute()
        showTokenExpired(route)
    } else {
        throw createError({
            statusCode: error.statusCode,
            statusMessage: error.statusMessage,
            message: error.message ?? error.data.message ?? error,
            data: error.data,
            stack: undefined,
            fatal: true,
        })
    }
}

function showErrorOnDialog({ error, customShowDialog }: { error: FetchError<any>, customShowDialog?: any}) {
    const { dialogError, showDialog } = useDialog()
    const dialog = dialogError()
    const { statusCode, data, message } = error
    const { showTokenExpired } = useErrorHandler()
    const router = useRouter()
    const route = useRoute()
    let titleStr = `เกิดข้อผิดพลาด: (${statusCode})`
    let messageStr = message || data?.message || 'กรุณาติดต่อผู้ดูแลระบบ หรือลองใหม่อีกครั้ง ⚠'
    switch (statusCode) {
        case 401:
            showTokenExpired(route)
            break
        case 403:
            titleStr = 'Permission Denied (403)'
            showDialog(
                {
                    title: titleStr,
                    message: messageStr,
                    actionButtons: [
                        {
                            text: 'close',
                            fnVoid: router.back,
                        },
                    ],
                    persistent: true,
                },
                dialog
            )
            break
        case 400:
            showDialog(
                customShowDialog || {
                    title: titleStr,
                    message: messageStr,
                    actionButtons: [
                        {
                            text: 'close',
                        },
                    ],
                    persistent: false,
                },
                dialog
            )
            break
        default:
            showDialog(
                {
                    title: titleStr,
                    message: 'กรุณาติดต่อผู้ดูแลระบบ หรือลองใหม่อีกครั้ง ⚠ <br>' + messageStr,
                    actionButtons: [
                        {
                            text: 'close',
                        },
                    ],
                    persistent: false,
                },
                dialog
            )
            break
    }
}

function showTokenExpired(route: RouteLocationNormalizedLoaded) {
    const userType = useCookie('type', {
        path: useRuntimeConfig().app.baseURL,
    }).value
    const appBaseUrl = useRuntimeConfig().app.baseURL

    let loginPath = appBaseUrl + (userType === 'BACKEND' ? `login` : `login_candidate`)
    console.log('🧨 route.fullPath', route.fullPath)
    let query = '?redirect=' + route.fullPath
    let fullPath = loginPath + query

    const { dialogError, showDialog } = useDialog()
    const dialog = dialogError()
    showDialog(
        {
            title: 'Token Expired',
            message: 'Look like your session has expired. <br> Please login again.',
            actionButtons: [
                {
                    text: 'Login',
                    variant: 'elevated',
                    color: 'grey-darken-4',
                    href: fullPath,
                },
            ],
            persistent: true,
        },
        dialog
    )
}
