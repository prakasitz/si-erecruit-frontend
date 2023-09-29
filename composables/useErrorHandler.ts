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
            message: error.message ?? error.data.message,
            stack: undefined,
            fatal: true,
        })
    }
}

function showErrorOnDialog({ title, detail, error }: { title?: string; detail?: string; error: FetchError<any> }) {
    const { dialogError, showDialog } = useDialog()
    const dialog = dialogError()
    const { statusCode, data, message } = error
    const { showTokenExpired } = useErrorHandler()
    const route = useRoute()
    let titleStr = title || `เกิดข้อผิดพลาด: (${statusCode})`
    let messageStr = detail || '<br> กรุณาติดต่อผู้ดูแลระบบ หรือลองใหม่อีกครั้ง ⚠'
    switch (statusCode) {
        case 401:
            showTokenExpired(route.fullPath)
            break
        default:
            showDialog(
                {
                    title: titleStr,
                    message: (data.message || message) + messageStr,
                    actionButtons: [],
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
