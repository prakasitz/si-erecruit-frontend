import { deepCopy } from '../../../utils/object'
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
import { actionClassMapping, quickActionsTable } from './constant'
import {
    CancelBtn,
    DeleteBtn,
    PublishableBtn,
    QuickAction,
    SuspendedBtn,
    VerifedBtn,
    VerifyBtn,
    ViewBtn,
    WaiveBtn,
} from './quick_action'

class QuickActionHandler {
    //use map for key - value
    jobStatusCodeMap: Map<number, JobStatusCode> = new Map()
    profileStatusCodeMap: Map<number, ProfileStatusCode> = new Map()

    constructor() {
        this.initStatusCodeList()
    }

    private async initStatusCodeList() {
        console.log('🟢 initStatusCodeList : QuickActionHandler')
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
            console.log('🔴 initStatusCodeList:error: QuickActionHandler', error)
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
        // ! BUSSINESS FOR MERGE BTN
        // ! - C/W in actions
        let mergeBtn1: QuickAction | undefined
        if (actions.includes('P') && actions.includes('S')) {
            mergeBtn1 = QuickAction.mergeTwoBtnToOneBtn(
                new PublishableBtn({ profile_id, job_id }),
                new SuspendedBtn({ profile_id, job_id })
            )
            //remove P, S from actions
            actions = actions.filter((action) => action !== 'P' && action !== 'S')
        }

        // ! - P/S in actions
        let mergeBtn2: QuickAction | undefined
        if (actions.includes('C') && actions.includes('W')) {
            mergeBtn2 = QuickAction.mergeTwoBtnToOneBtn(
                new CancelBtn({ profile_id, job_id }),
                new WaiveBtn({ profile_id, job_id })
            )
            //remove C, W from actions
            actions = actions.filter((action) => action !== 'C' && action !== 'W')
        }

        // * enable all for test all
        // actions = ['Vi', 'C', 'W', 'P', 'S', 'V', 'Ve', 'D']

        const quickActions = actions.map((action) => {
            if (action === 'P/S') return mergeBtn1 as QuickAction
            if (action === 'C/W') return mergeBtn2 as QuickAction
            const ActionClass = actionClassMapping[action]
            return new ActionClass({ profile_id, job_id })
        })

        return quickActions
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
            const actions = deepCopy(quickActionsTable[jobStatus][profile_status_text])
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
