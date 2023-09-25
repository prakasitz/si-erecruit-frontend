import { ExternalAPIService } from './ExternalAPIService'
import { AxiosError } from 'axios'
import { H3Event, H3Error } from 'h3'

class LogExternal extends ExternalAPIService {
    private slug: string = 'logs'
    constructor() {
        super()
    }

    public async getPaging(event: H3Event) {
        try {
            await this.initializeToken()
            const body = await readBody(event)
            const resp = await this.baseAPI.post(`/${this.slug}/paging`, body, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getPaging: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }
}

export const logService = new LogExternal()
