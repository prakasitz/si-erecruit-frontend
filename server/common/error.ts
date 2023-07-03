import { H3Error } from 'h3'

export function handleErrorRoute(error: any) {
    if (error instanceof H3Error) return error
    let errMsg = error?.message || error.toString() || ' Unknown error.'

    return createError({
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Ops! Server error occurred. Please try again 😢.| ' + errMsg,
        stack: '',
    })
}
