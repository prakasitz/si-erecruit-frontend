export type VuetifyForm = {
    errors: Ref<{ id: string | number; errorMessages: string[] }[]>
    isDisabled: ComputedRef<boolean>
    isReadonly: ComputedRef<boolean>
    isValidating: ShallowRef<boolean>
    isValid: Ref<boolean> & { externalValue: boolean }
    items: Ref<
        {
            id: string | number
            validate: () => Promise<string[]>
            reset: () => void
            resetValidation: () => void
            isValid: boolean
            errorMessages: string[]
        }[]
    >
    validate: () => Promise<{
        valid: boolean
        errors: { id: string | number; errorMessages: string[] }[]
    }>
    reset: () => void
    resetValidation: () => void
}

export type CandidateNav = {
    title: string
    value: string
    to: string
    isHash: boolean
    hash?: string
    nav: any[]
    subgroups?: any[]
}

export type CandidateForm = {
    id: number
    title: string
    hash: string
    cardTitle: string
    isLoading: boolean
}

export type DialogContext = {
    title: string
    message: string
    actionButtons: any[]
    persistent: boolean
    item?: {
        id: number | any
        name?: string
    }
    [key: string]: any
}

export interface btnShowOnJob {
    BtnHeaderJob: boolean
    BtnDeleteJob: boolean
    BtnPublishedJob: boolean
    BtnRepublished: boolean
    BtnCancelledJob: boolean
    BtnSuspendJob: boolean
    BtnVerifyJob: boolean
    BtnApproveJob: boolean
    BtnTerminated: boolean
    BtnDMS: boolean

    BtnExport: boolean
    BtnSuspend: boolean
    BtnPublishable: boolean
    BtnSendSAP: boolean
}

export interface btnShowWstatus {
    status: number
    btn_show: btnShowOnJob
}