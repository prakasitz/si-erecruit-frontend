import dayjs from 'dayjs'
import 'dayjs/locale/th' // load on demand
import buddhistEra from 'dayjs/plugin/buddhistEra'

dayjs.extend(buddhistEra)
dayjs.locale('th')

export default function useJobManagement() {
    return {
        fetchJob,
    }
}

const fetchJob = () => {
    return useFetch('/api/jobs/get', {
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
                    let buddFormat = 'DD MMM BBBB, HH:mm'
                    let formatedCreateDate = dayjs(create_date).format(buddFormat)

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
