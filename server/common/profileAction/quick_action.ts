import { ActionParams } from "../../../utils/types"

// Define the QuickAction class
export class QuickAction {
    name: string
    url: string

    constructor(name: string, url: string) {
        this.name = name
        this.url = url
    }
}


export class ViewBtn extends QuickAction {
    static url = 'fetch/profileById'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('View', `${ViewBtn.url}/${params.profile_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}

export class WavieBtn extends QuickAction {
    static url = 'wavie/profile'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('View', `${ViewBtn.url}?id=${params.profile_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}

export class CancelBtn extends QuickAction {
    static url = 'cancel/profile'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Cancel', `${CancelBtn.url}?pId=${params.profile_id}&jId=${params.job_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}

export class PublishableBtn extends QuickAction {
    static url = 'publishable/profile'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Publishable', `${PublishableBtn.url}?pId=${params.profile_id}&jId=${params.job_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}

export class SuspendedBtn extends QuickAction {
    static url = 'suspended/profile'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Suspended', `${SuspendedBtn.url}?pId=${params.profile_id}&jId=${params.job_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}

export class VerifyBtn extends QuickAction {
    static url = 'verify/profile'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Verify', `${VerifyBtn.url}?pId=${params.profile_id}&jId=${params.job_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}

export class VerifedBtn extends QuickAction {
    static url = 'verifed/profile'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Verifed', `${VerifedBtn.url}?pId=${params.profile_id}&jId=${params.job_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}

export class DeleteBtn extends QuickAction {
    static url = 'cancel/profile'
    profile_id: number
    job_id: number

    constructor(params: ActionParams) {
        super('Delete', `${DeleteBtn.url}?pId=${params.profile_id}&jId=${params.job_id}`)
        this.profile_id = params.profile_id
        this.job_id = params.job_id!
    }
}
