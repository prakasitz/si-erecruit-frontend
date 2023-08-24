import { NuxtError } from 'nuxt/app'

export default function useErrorHandler() {
    return {
        middlewareError,
        showTokenExpired,
    }
}

function middlewareError(error: NuxtError | any, { to, from }: any) {
    console.log('error-middlewareError', error)
    if (error.statusCode === 401) {
        showTokenExpired(to)
    } else {
        throw createError({
            statusCode: error.statusCode,
            message: error.data.message,
            stack: undefined,
            fatal: true,
        })
    }
}

function showTokenExpired(to: any) {
    let role = useCookie('role').value
    let loginPath = role === 'HR' ? '/login' : '/login_candidate'
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
