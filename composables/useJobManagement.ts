import dayjs from 'dayjs'
import 'dayjs/locale/th' // load on demand
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { Job, JobWithProfile, Profile } from '~/utils/types'
import { useJobComponentStore } from '~/stores/job-component.store'

dayjs.extend(buddhistEra)
dayjs.locale('th')

export default function useJobManagement() {
    return {
        fetchJobs,
        getProfilesByJobId,
        deleteJob,
        approveJob,
        rePublishJob,
        publishJob
    }
}

/* 
    ? string description should be: 
    ?    mu_job_ID - mu_job_name | DD MMM YYYY HH:mm
*/
const createDescription = (mu_job_ID: string, mu_job_name: string, create_date: string) => {
    let formatedCreateDate = dateToString(create_date, DateFormatEnum.DATE_TIME_BUDDHIST_1)
    return `${mu_job_ID ?? '??'} - ${mu_job_name ?? '???'} | ${formatedCreateDate == 'Invalid Date' ? '???' : formatedCreateDate
        }`
}

// canDelete if jobStatus is 'importing', 'imported', 'created'
const canDelete = (jobStatus: string) => {
    jobStatus = jobStatus.toLowerCase()
    return jobStatus == 'importing' || jobStatus == 'imported' || jobStatus == 'created'
}

const fetchJobs = (jobId?: any, isTransform: boolean = false) => {
    let body: any = {}
    if (jobId) {
        body = {
            job_ID: parseInt(jobId),
        }
    }
    return useFetch('/api/external/jobs/get', {
        body,
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        key: 'fetchJobs' + (jobId ? jobId : ''),
        transform(data: any) {
            let tempData: any = data
            if (data.length == 0) throw new Error('Fetch Jobs: Data not found or cannot transform data.')
            if (jobId) tempData = data[0]
            if (!isTransform)
                return {
                    ...tempData,
                    create_date: dateToString(tempData['create_date'], DateFormatEnum.DATE_TIME_BUDDHIST_1),
                }
            const transFormData = tempData.map(
                ({
                    job_ID,
                    job_name,
                    data_source,
                    job_status,
                    create_date,
                    mu_job_ID,
                    mu_job_name,
                    job_status_code,
                }: Job) => {
                    return {
                        job_ID,
                        job_name,
                        data_source,
                        job_status: job_status_code!.job_status_text,
                        job_status_color: job_status_code!.zjob_status_color,
                        desc: createDescription(mu_job_ID, mu_job_name, create_date),
                        canDelete: canDelete(job_status_code!.job_status_text),
                    }
                }
            )
            return transFormData
        },
        server: false,
    })
}

const getProfilesByJobId = (jobId: string) => {
    return useFetch(`/api/external/jobs/getProfileOnJob/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        key: 'getProfilesByJobId',
        transform(data: JobWithProfile) {
            const _data = data
            const job: Job = {
                job_ID: _data['job_ID'],
                job_name: _data['job_name'],
                data_source: _data['data_source'],
                job_status: _data['job_status'],
                create_date: dateToString(_data['create_date'], DateFormatEnum.DATE_TIME_BUDDHIST_1),
                mu_job_ID: _data['mu_job_ID'],
                mu_job_name: _data['mu_job_name'],
                job_status_code: _data['job_status_code'],
            }
            const profile = _data['profile'].map((item: Profile) => {
                return {
                    job_ID: item.job_ID,
                    fullname: item.nameTH + ' ' + item.lastnameTH,
                    profile_status: item.profile_status,
                    pid: item.id_card_number,
                    phone: item.cur_mobile ?? item.cur_telephone ?? 'ไม่มีข้อมูล',
                    profile_ID: item.profile_ID,
                }
            })
            //* set component 
            const { setButtonShow } = useJobComponentStore()
            setButtonShow(job.job_status);
            return { job, profile }
        },
        server: false,
    })
}

const deleteJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}

const approveJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
const cancelJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
const publishJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/publish`, {
        headers: {
            Accept: 'application/json',
        },
        body: {
            "job_ID": jobId
        },
        method: 'PUT',
        server: false,
    })
}
const rePublishJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
const sendJobtoDMS = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
const suspendJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
const terminateJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
const verifyJob = (jobId: string) => {
    return useFetch(`/api/external/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
        server: false,
    })
}
