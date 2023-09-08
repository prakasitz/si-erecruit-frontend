import { ActionParams, IQuickAction } from '../../../utils/types'

// Define the QuickAction class
export class QuickAction implements IQuickAction {
    name: string
    url?: string
    text: string = ''
    color: string = ''
    icon?: string = ''
    actions?: QuickAction[]

    constructor(name: string, url?: string) {
        this.name = name
        this.url = url || undefined
    }

    static mergeTwoBtnToOneBtn(btn1: QuickAction, btn2: QuickAction): QuickAction {
        const btn = new QuickAction(btn1.name + ' Or ' + btn2.name)
        btn.text = btn1.name + '/' + btn2.name

        btn.color = btn1.color
        btn.icon = btn1.icon

        btn1.icon = undefined
        btn2.icon = undefined

        btn1.color = btn.color
        btn2.color = btn.color

        btn.actions = [btn1, btn2]

        return btn
    }
}

export class ViewBtn extends QuickAction {
    static url = '/candidate/form'
    profile_id: number
    job_id: number
    to: string

    constructor(params: ActionParams) {
        super('View', `${ViewBtn.url}/${params.profile_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'primary'
        this.icon = 'mdi-eye'
        this.to = this.url!
    }
}

export class WaiveBtn extends QuickAction {
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Waive')
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'blue-grey'
        this.icon = 'mdi-account-off'
    }
}

export class CancelBtn extends QuickAction {
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Cancel')
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'blue-grey'
        this.icon = 'mdi-account-off'
    }
}

export class PublishableBtn extends QuickAction {
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Publishable')
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'blue'
        this.icon = 'mdi-account-network-outline'
    }
}

export class SuspendedBtn extends QuickAction {
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Suspend')
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'error'
        this.icon = 'mdi-account-lock'
    }
}

export class VerifyBtn extends QuickAction {
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Verify')
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'orange-darken-1'
        this.icon = 'mdi-account-details'
    }
}

export class VerifedBtn extends QuickAction {
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Verifed')
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'success'
        this.icon = 'mdi-account-check'
    }
}

export class DeleteBtn extends QuickAction {
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Delete')
        this.profile_id = params.profile_id
        this.job_id = params.job_id!

        this.text = this.name
        this.color = 'error'
        this.icon = 'mdi-delete'
    }
}
