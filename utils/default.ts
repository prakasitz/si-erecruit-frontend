import { job } from '~/stores/interface/personal_information.interface'
import { VueDatePickerProps } from '@vuepic/vue-datepicker'
import { btnShowWstatus } from './types'

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
    modelType: 'yyyy-MM-dd',
}

export const UnauthorizedError = (msg: string = 'Unauthorized') =>
    createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
        message: `Error: ${msg}`,
    })

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

export const buttonShow: btnShowWstatus[] = [
    {
        status: 3, //Imported
        btn_show: {
            BtnHeaderJob: true,
            BtnDeleteJob: true,
            BtnPublishedJob: true,
            BtnRepublished: false,
            BtnCancelledJob: false,
            BtnSuspendJob: false,
            BtnVerifyJob: false,
            BtnApproveJob: false,
            BtnTerminated: false,
            BtnDMS: false,
            BtnExport: true,
            BtnSuspend: true,
            BtnPublishable: true,
            BtnSendSAP: false,
        },
    },
    {
        status: 4, // Published
        btn_show: {
            BtnHeaderJob: false,
            BtnDeleteJob: false,
            BtnPublishedJob: false,
            BtnRepublished: false,
            BtnCancelledJob: true,
            BtnSuspendJob: true,
            BtnVerifyJob: true,
            BtnApproveJob: false,
            BtnTerminated: false,
            BtnDMS: false,
            BtnExport: true,
            BtnSuspend: true,
            BtnPublishable: true,
            BtnSendSAP: false,
        },
    },
    {
        status: 5, //Suspended
        btn_show: {
            BtnHeaderJob: true,
            BtnDeleteJob: false,
            BtnPublishedJob: true,
            BtnRepublished: false,
            BtnCancelledJob: false,
            BtnSuspendJob: false,
            BtnVerifyJob: false,
            BtnApproveJob: false,
            BtnTerminated: false,
            BtnDMS: false,
            BtnExport: true,
            BtnSuspend: false,
            BtnPublishable: false,
            BtnSendSAP: false,
        },
    },
    {
        status: 6, //Verifying
        btn_show: {
            BtnHeaderJob: true,
            BtnDeleteJob: false,
            BtnPublishedJob: false,
            BtnRepublished: true,
            BtnCancelledJob: true,
            BtnSuspendJob: false,
            BtnVerifyJob: false,
            BtnApproveJob: true,
            BtnTerminated: false,
            BtnDMS: false,
            BtnExport: true,
            BtnSuspend: false,
            BtnPublishable: false,
            BtnSendSAP: false,
        },
    },
    {
        status: 7, //Approved
        btn_show: {
            BtnHeaderJob: true,
            BtnDeleteJob: false,
            BtnPublishedJob: false,
            BtnRepublished: false,
            BtnCancelledJob: false,
            BtnSuspendJob: false,
            BtnVerifyJob: false,
            BtnApproveJob: false,
            BtnTerminated: true,
            BtnDMS: true,
            BtnExport: true,
            BtnSuspend: false,
            BtnPublishable: false,
            BtnSendSAP: true,
        },
    },
    {
        status: 8, //Cancelled
        btn_show: {
            BtnHeaderJob: false,
            BtnDeleteJob: false,
            BtnPublishedJob: false,
            BtnRepublished: true,
            BtnCancelledJob: false,
            BtnSuspendJob: false,
            BtnVerifyJob: false,
            BtnApproveJob: false,
            BtnTerminated: false,
            BtnDMS: false,
            BtnExport: true,
            BtnSuspend: false,
            BtnPublishable: false,
            BtnSendSAP: false,
        },
    },
    {
        status: 99, //Closed
        btn_show: {
            BtnHeaderJob: false,
            BtnDeleteJob: false,
            BtnPublishedJob: false,
            BtnRepublished: false,
            BtnCancelledJob: false,
            BtnSuspendJob: false,
            BtnVerifyJob: false,
            BtnApproveJob: false,
            BtnTerminated: false,
            BtnDMS: false,
            BtnExport: true,
            BtnSuspend: false,
            BtnPublishable: false,
            BtnSendSAP: true,
        },
    },
]
