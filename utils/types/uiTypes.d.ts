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

export namespace DialogContext {
    export type FnActionCallback = (event: any, ...args: any) => Promise<BtnActionCallBack>

    export type ItemID =
        | { profile_IDs: number[]; job_ID: number; [key: string]: any }
        | {
              [key: string]: any
          }

    export type ActionButton = {
        text: string
        variant?: 'elevated' | 'outlined' | 'text'
        color?: string
        href?: string
        cb?: FnActionCallback
        goBack?: VoidFunction
    }

    export interface BtnActionCallBack {
        status: boolean
        message: unknown
        callbackActionBtn?: ActionButton[]
    }

    export type Context = {
        title: string
        message: string
        actionButtons: ActionButton[]
        persistent: boolean
        item?: {
            id?: ItemID | number
            name?: string
        }
        [key: string]: any
    }
}
