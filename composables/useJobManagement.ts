import dayjs from 'dayjs'
import 'dayjs/locale/th' // load on demand
import buddhistEra from 'dayjs/plugin/buddhistEra'
import { create } from 'domain'

dayjs.extend(buddhistEra)
dayjs.locale('th')

export default function useJobManagement() {
    return {
        fetchJob,
        deleteJob,
    }
}

const fetchJob = () => {
    /*
     */
    return useFetch('/api/jobs/get', {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        transform(data: any) {
            return data.map(
                ({
                    job_ID,
                    job_name,
                    data_source,
                    job_status,
                    create_date,
                    mu_job_ID,
                    mu_job_name,
                    job_status_code,
                }: any): any => {
                    return {
                        job_ID,
                        job_name,
                        data_source,
                        job_status: job_status_code.job_status_text,
                        job_status_color: job_status_code.zjob_status_color,
                        desc: createDescription(mu_job_ID, mu_job_name, create_date),
                        canDelete: canDelete(job_status_code.job_status_text),
                    }
                }
            )
        },
        server: false,
    })
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

const deleteJob = async (jobId: string) => {
    return await $fetch(`/api/jobs/${jobId}`, {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
    })
}
