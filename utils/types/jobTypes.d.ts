
export type jobStatusCode = {
    job_status_code: number
    job_status_text: `${JobStatus}`
    zjob_status_color: `${JobStatusColor}`
}

export type JobStatusType = JobStatus

export interface Job {
    job_ID: number
    create_date: any
    job_name: any
    mu_job_ID: any
    mu_job_name: any
    data_source: any
    job_status: number
    job_status_code?: jobStatusCode
}

