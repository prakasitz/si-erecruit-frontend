import dayjs from 'dayjs'
import 'dayjs/locale/th' // load on demand
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)
dayjs.locale('th')

export default function useJobManagement() {
    return {
        fetchJob,
        deleteJob,
    }
}

const fetchJob = () => {
    return useFetch('/api/jobs/get', {
        headers: {
            Accept: 'application/json',
        },
        method: 'POST',
        transform(data: any) {
            return data.map(
                ({
                    job_name,
                    data_source,
                    job_status,
                    create_date,
                    mu_job_ID,
                    mu_job_name,
                    job_status_code,
                }: any): any => {
                    let formatedCreateDate = dateToString(create_date, DateFormatEnum.DATE_TIME_BUDDHIST_1)
                    return {
                        job_name,
                        data_source,
                        job_status: job_status_code.job_status_text,
                        job_status_color: job_status_code.zjob_status_color,
                        desc: `${mu_job_ID ?? '??'} - ${mu_job_name ?? '???'} | ${
                            formatedCreateDate == 'Invalid Date' ? '???' : formatedCreateDate
                        }`,
                    }
                }
            )
        },
        server: false,
    })
}

const deleteJob = async (jobId: string) => {
    return await $fetch('/api/jobs/delete/:jobId', {
        headers: {
            Accept: 'application/json',
        },
        method: 'DELETE',
    })
}
