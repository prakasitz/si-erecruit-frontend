import { AxiosError } from 'axios'
import { H3Event, H3Error } from 'h3'
import { ExternalAPIService } from './ExternalAPIService'

class JobsExternal extends ExternalAPIService {
    private jobSlug: string = 'jobs'
    constructor() {
        super()
    }
    public async getJobs(event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.post(
                `/${this.jobSlug}/get`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )

            if (!resp.data) throw new Error(`getJobs: Data not found`)

            let result: any = resp.data
            return new Promise<any>((resolve) => {
                setTimeout(() => {
                    resolve(result)
                }, 1000)
            })
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async delJobById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.delete(`/${this.jobSlug}/delete`, {
                data: {
                    job_ID: jobId,
                },
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }
}

export const jobService = new JobsExternal()
