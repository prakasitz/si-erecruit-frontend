import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'

class JobsExternal extends ExternalAPIService {
    private jobSlug: string = 'jobs'
    constructor() {
        super()
    }
    public async getJobs() {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.post(
                `/${this.jobSlug}/get`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
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
            console.log('token', this.token)
            console.log(error)
            throw this.handleError(error)
        }
    }
}

export const jobService = new JobsExternal()
