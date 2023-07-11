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

export const defaultVueDatePickerStyle: VueDatePickerProps = {
    flow: ['year', 'month', 'calendar'],
    enableTimePicker: false,
    hideNavigation: ['time'],
    modelType: 'yyyy/MM/dd',
}

// User not found error
export const userNotFoundError = createError({
    statusCode: 401,
    statusMessage: 'Unauthorized',
    message: 'User not found',
})

// Forbidden error
export const forbiddenError = createError({
    statusCode: 403,
    statusMessage: 'Forbidden',
})

export const BadRequestError = createError({
    statusCode: 400,
    statusMessage: 'Bad Request',
    message: 'Invalida query parameter',
})
