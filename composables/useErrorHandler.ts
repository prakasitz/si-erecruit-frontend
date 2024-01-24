import { NuxtError } from 'nuxt/app'
import { FetchError } from 'ofetch'
import { H3Error } from 'h3'

export default function useErrorHandler() {
    return {
        middlewareError,
        showTokenExpired,
        showErrorOnDialog,
    }
}

function middlewareError(error: H3Error, { to, from }: any) {
    if (isNuxtError(error) && error.statusCode === 401) {
        showTokenExpired(to)
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

function showErrorOnDialog({ error }: { error: FetchError<any> }) {
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
            showTokenExpired(route.fullPath)
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
                            goBack: router.back,
                        },
                    ],
                    persistent: true,
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

function showTokenExpired(to: any) {
    const userType = useCookie('type').value

    let loginPath = userType === 'BACKEND' ? '/login' : '/login_candidate'
    let query = '?redirect=' + to.fullPath
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
