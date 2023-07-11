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
            const resp = await this.baseAPI.post(`/${this.jobSlug}/get`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getJobs: Data not found`)

            let result: any = resp.data

            return result
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }
}

export const jobService = new JobsExternal()
