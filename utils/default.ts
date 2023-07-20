import { job } from '~/stores/interface/personal_information.interface'
import { VueDatePickerProps } from '@vuepic/vue-datepicker'

export const default_job: job = {
    company_name: '',
    end_date: '',
    position_name: '',
    reason: '',
    salary: '',
    still_doing: false,
    start_date: '',
}

export const defaultDialogContext = {
    title: '',
    message: '',
    actionButtons: [],
    persistent: false,
}

export const defaultVueDatePickerStyle: VueDatePickerProps = {
    flow: ['year', 'month', 'calendar'],
    enableTimePicker: false,
    hideNavigation: ['time'],
    modelType: 'yyyy/MM/dd',
}

export const TokenNotFoundError = (msg: string = 'Unauthorized') =>
    createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'Error: Token not found',
    })

// User not found error
export const userNotFoundError = (msg: string = 'Unauthorized') =>
    createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: 'Error: User not found',
    })

// Forbidden error
export const forbiddenError = (msg: string = 'Forbidden') =>
    createError({
        statusCode: 403,
        statusMessage: 'Error: Forbidden',
    })

export const BadRequestError = (msg: string = 'Bad Request') =>
    createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
        message: `Error: ${msg}`,
    })
