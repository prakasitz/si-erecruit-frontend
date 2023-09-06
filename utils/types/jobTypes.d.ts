import { JobStatusColorEnum, JobStatusEnum } from '../enum'
import { Profilez, Profile } from './profileTypes'
import { ProfileWithQuickAction } from './quickActionTypes'

export type JobStatus = `${JobStatusEnum}`
export type JobStatusColor = `${JobStatusColorEnum}`

export type JobStatusCode = {
    job_status_code: number
    job_status_text: `${JobStatus}`
    zjob_status_color: `${JobStatusColor}`
}

export type JobStatusType = JobStatus

export interface JobWithProfile extends Job {
    profile: Profile[]
}

export type JobWithProfilez = Job & { profile: Profilez[] }
export type JobWithProfileAndQuickAction = Job & { profile: ProfileWithQuickAction[] }

export interface Job {
    job_ID: number
    create_date: any
    job_name: any
    mu_job_ID: any
    mu_job_name: any
    data_source: any
    job_status: number
    job_status_code?: JobStatusCode
}
