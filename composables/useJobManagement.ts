import dayjs from 'dayjs'
import 'dayjs/locale/th' // load on demand
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { create } from 'domain'
import { Job, JobWithProfile, Profile } from '~/utils/types'

dayjs.extend(buddhistEra)
dayjs.locale('th')

export default function useJobManagement() {
    return {
        fetchJobs,
        getProfilesByJobId,
        deleteJob,
    }
}

/* 
    ? string description should be: 
    ?    mu_job_ID - mu_job_name | DD MMM YYYY HH:mm
*/
const createDescription = (mu_job_ID: string, mu_job_name: string, create_date: string) => {
    let formatedCreateDate = dateToString(create_date, DateFormatEnum.DATE_TIME_BUDDHIST_1)
    return `${mu_job_ID ?? '??'} - ${mu_job_name ?? '???'} | ${
        formatedCreateDate == 'Invalid Date' ? '???' : formatedCreateDate
    }`
}

// canDelete if jobStatus is 'importing', 'imported', 'created'
const canDelete = (jobStatus: string) => {
    jobStatus = jobStatus.toLowerCase()
    return jobStatus == 'importing' || jobStatus == 'imported' || jobStatus == 'created'
}

const fetchJobs = (jobId?: any, isTransform: boolean = false) => {
    console.log(jobId, isTransform)
    let body: any = {}
    if (jobId) {
        body = {
            job_ID: jobId,
        }
    }
    return useFetch('/api/external/jobs/get', {
        body,
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        transform(data: any) {
            let tempData: any = data
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
        transform(data) {
            const _data = data as JobWithProfile
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
            const profiles = _data['profile'].map((item: Profile) => {
                return {
                    job_ID: item.job_ID,
                    fullname: item.nameTH + ' ' + item.lastnameTH,
                    status: item.profile_status,
                    pid: item.id_card_number,
                    phone: item.cur_mobile ?? item.cur_telephone ?? 'ไม่มีข้อมูล',
                    action: 'action',
                }
            })
            return { job, profiles }
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
