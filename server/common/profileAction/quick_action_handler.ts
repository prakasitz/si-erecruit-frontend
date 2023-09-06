import {
    ActionConstructor,
    Job,
    JobStatus,
    Profile,
    ProfileStatus,
    ProfileStatusCode,
    Profilez,
    QuickActionsTableType,
    jobStatusCode,
} from '../../../utils/types'
import {
    CancelBtn,
    DeleteBtn,
    PublishableBtn,
    QuickAction,
    SuspendedBtn,
    VerifyBtn,
    ViewBtn,
    WavieBtn,
} from './quick_action'

// Mapping from action strings to their respective classes
const actionClassMapping: { [key: string]: ActionConstructor } = {
    Vi: ViewBtn,
    C: CancelBtn,
    W: WavieBtn,
    P: PublishableBtn,
    S: SuspendedBtn,
    Ve: VerifyBtn,
    D: DeleteBtn,
    // ... add other mappings as needed
}

const profileStatusConfig: ProfileStatusCode[] = [
    {
        profile_status_code: 0,
        profile_status_text: 'Created',
        zprofile_status_color: 'label-info',
    },
    {
        profile_status_code: 1,
        profile_status_text: 'Imported',
        zprofile_status_color: 'label-megna',
    },
    {
        profile_status_code: 2,
        profile_status_text: 'Publishable',
        zprofile_status_color: 'label-success',
    },
    {
        profile_status_code: 3,
        profile_status_text: 'Suspended',
        zprofile_status_color: 'label-danger',
    },
    {
        profile_status_code: 4,
        profile_status_text: 'Submitted',
        zprofile_status_color: 'label-light-success',
    },
    {
        profile_status_code: 5,
        profile_status_text: 'Verified',
        zprofile_status_color: 'label-light-megna',
    },
    {
        profile_status_code: 6,
        profile_status_text: 'Waived',
        zprofile_status_color: 'label-warning',
    },
    {
        profile_status_code: 9,
        profile_status_text: 'Cancelled',
        zprofile_status_color: 'label-red',
    },
    {
        profile_status_code: 99,
        profile_status_text: 'Closed',
        zprofile_status_color: 'label-light-inverse',
    },
]

const jobStatusConfig: jobStatusCode[] = [
    {
        job_status_code: 0,
        job_status_text: 'Created',
        zjob_status_color: 'label-light-info',
    },
    {
        job_status_code: 1,
        job_status_text: 'Importing',
        zjob_status_color: 'label-light-megna',
    },
    {
        job_status_code: 2,
        job_status_text: 'Fail Imported',
        zjob_status_color: 'label-megna',
    },
    {
        job_status_code: 3,
        job_status_text: 'Imported',
        zjob_status_color: 'label-primary',
    },
    {
        job_status_code: 4,
        job_status_text: 'Published',
        zjob_status_color: 'label-danger',
    },
    {
        job_status_code: 5,
        job_status_text: 'Suspended',
        zjob_status_color: 'label-inverse',
    },
    {
        job_status_code: 6,
        job_status_text: 'Verifying',
        zjob_status_color: 'label-success',
    },
    {
        job_status_code: 7,
        job_status_text: 'Approved',
        zjob_status_color: 'label-light-warning',
    },
    {
        job_status_code: 9,
        job_status_text: 'Cancelled',
        zjob_status_color: 'label-danger',
    },
    {
        job_status_code: 98,
        job_status_text: 'Terminated',
        zjob_status_color: 'label-danger',
    },
    {
        job_status_code: 99,
        job_status_text: 'Closed',
        zjob_status_color: 'label-warning',
    },
]

const quickActionsTable: QuickActionsTableType = {
    Imported: {
        Imported: ['Vi', 'C', 'W', 'P', 'S', 'D'],
        Publishable: ['Vi', 'S'],
        Submitted: [],
        Verified: [],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
    Published: {
        Imported: ['Vi', 'S', 'C', 'W'],
        Publishable: ['Vi', 'S', 'C', 'W'],
        Submitted: ['Vi'],
        Verified: [],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
    Verifying: {
        Imported: ['Vi', 'S', 'C'],
        Publishable: ['Vi', 'V'],
        Submitted: ['Vi', 'Ve'],
        Verified: ['Vi', 'P'],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
    Approved: {
        Imported: ['Vi'],
        Publishable: ['Vi'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi'],
        Cancelled: ['Vi'],
        Waived: ['Vi'],
    },
    Closed: {
        Imported: ['Vi'],
        Publishable: ['Vi'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi'],
        Cancelled: ['Vi'],
        Waived: ['Vi'],
    },
    Cancelled: {
        Imported: ['Vi'],
        Publishable: ['Vi'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi'],
        Cancelled: ['Vi'],
        Waived: ['Vi'],
    },
    Suspended: {
        Imported: ['Vi'],
        Publishable: ['Vi', 'S', 'C', 'W'],
        Submitted: ['Vi'],
        Verified: ['Vi'],
        Suspended: ['Vi', 'P'],
        Cancelled: ['Vi', 'P'],
        Waived: ['Vi', 'P'],
    },
}

class QuickActionHandler {
    profile: Profilez | undefined = undefined
    job: Job | undefined = undefined

    constructor() {}

    get jobStatusText(): `${JobStatus}` | '' {
        let jobStatusId = this.job!.job_status
        return jobStatusConfig.find((status) => status.job_status_code === jobStatusId)?.job_status_text || ''
    }
    get profileStatusText(): `${ProfileStatus | ''}` {
        let profileStatusId = this.profile!.profile_status
        return (
            profileStatusConfig.find((status) => status.profile_status_code === profileStatusId)?.profile_status_text ||
            ''
        )
    }

    transformActionsToInstances(profile_id: number, job_id: number, actions: string[]): QuickAction[] {
        return actions.map((action) => {
            const ActionClass = actionClassMapping[action]
            return new ActionClass({ profile_id, job_id })
        })
    }

    getAvailableActions(profile: Profilez, job: Job): QuickAction[] {
        this.profile = profile
        this.job = job

        if (!quickActionsTable[this.jobStatusText] || !quickActionsTable[this.jobStatusText][this.profileStatusText]) {
            return [] // Return an empty array if the combination is not found in the table
        }
        const actionsStrings = quickActionsTable[this.jobStatusText][this.profileStatusText]
        return this.transformActionsToInstances(this.profile.profile_ID, this.job.job_ID, actionsStrings)
    }
}

export const quickActionHandler = new QuickActionHandler()
