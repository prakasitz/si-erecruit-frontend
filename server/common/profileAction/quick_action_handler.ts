import {
    ActionConstructor,
    Job,
    JobStatus,
    JobStatusCode,
    JobWithProfile,
    JobWithProfileAndQuickAction,
    JobWithProfilez,
    Profile,
    ProfileStatusCode,
    ProfileWithQuickAction,
    Profilez,
    QuickActionName,
    QuickActionsTableType,
} from '../../../utils/types'
import { masterService } from '../externalAPI/master.external'
import {
    CancelBtn,
    DeleteBtn,
    PublishableBtn,
    QuickAction,
    SuspendedBtn,
    VerifedBtn,
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
    V: VerifyBtn,
    Ve: VerifedBtn,
    D: DeleteBtn,
    // ... add other mappings as needed
}

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
    //use map for key - value
    jobStatusCodeMap: Map<number, JobStatusCode> = new Map()
    profileStatusCodeMap: Map<number, ProfileStatusCode> = new Map()

    constructor() {
        this.initStatusCodeList()
    }

    private async initStatusCodeList() {
        console.log('initStatusCodeList : QuickActionHandler')
        try {
            let resJobStatusOrError = await masterService.getJobStatus()
            if (resJobStatusOrError instanceof Error) throw resJobStatusOrError

            let resProfileStatusOrError = await masterService.getProfileStatus()
            if (resProfileStatusOrError instanceof Error) throw resProfileStatusOrError

            //
            this.jobStatusCodeMap = new Map(
                resJobStatusOrError.map((statusObj) => [statusObj.job_status_code, statusObj])
            )

            this.profileStatusCodeMap = new Map(
                resProfileStatusOrError.map((statusObj) => [statusObj.profile_status_code, statusObj])
            )
        } catch (error) {
            console.log('catch on initStatusCodeList : QuickActionHandler', error)
            throw error
        }
    }

    private getJobStatus(statusId: number): JobStatusCode | undefined {
        return this.jobStatusCodeMap.get(statusId)
    }

    private getProfileStatus(statusId: number): ProfileStatusCode | undefined {
        return this.profileStatusCodeMap.get(statusId)
    }

    transformActionsToInstances(profile_id: number, job_id: number, actions: string[]): QuickAction[] {
        // * enable all for test all
        // actions = ['Vi', 'C', 'W', 'P', 'S', 'V', 'Ve', 'D']

        // !bussiness for merge btn
        // ! - C/W in actions

        let mergeBtn: QuickAction | undefined
        if (actions.includes('C') && actions.includes('W')) {
            mergeBtn = QuickAction.mergeTwoBtnToOneBtn(
                new CancelBtn({ profile_id, job_id }),
                new WavieBtn({ profile_id, job_id })
            )
            //remove C/W from actions
            actions = actions.filter((action) => action !== 'C' && action !== 'W')
        }

        const quickActions = actions.map((action) => {
            const ActionClass = actionClassMapping[action]
            return new ActionClass({ profile_id, job_id })
        })

        return [...quickActions, ...(mergeBtn ? [mergeBtn] : [])]
    }

    getAvailableActions(data: JobWithProfile): JobWithProfileAndQuickAction {
        const job: Job = {
            ...data,
            job_status_code: this.getJobStatus(data.job_status),
        }

        if (!job.job_status_code) throw new Error('job_status_code is undefined')

        const mappedProfile = this.mapProfileStatusToProfile(data.profile)

        const profileWithQuickActionList = this.mapProfilezQuickAction(
            job.job_status_code!.job_status_text,
            mappedProfile
        )

        return {
            ...job,
            profile: profileWithQuickActionList,
        }
    }

    mapProfilezQuickAction(jobStatus: JobStatus, profilezList: Profilez[]): ProfileWithQuickAction[] {
        return profilezList.map((profilez) => {
            if (profilez.profile_status_code == null) throw new Error('profile_status_code is undefined')
            const { profile_status_text } = profilez.profile_status_code
            const actions = quickActionsTable[jobStatus][profile_status_text]
            const quickActions = this.transformActionsToInstances(profilez.profile_ID, profilez.job_ID, actions)
            return {
                ...profilez,
                quickActions,
            }
        })
    }

    mapProfileStatusToProfile(profiles: Profile[]): Profilez[] {
        return profiles.map((profile) => {
            return {
                ...profile,
                profile_status_code: this.getProfileStatus(profile.profile_status),
            }
        })
    }
}

export const quickActionHandler = new QuickActionHandler()
