import { ExternalAPIService } from './ExternalAPIService'
import { AxiosError } from 'axios'
import { H3Event, H3Error } from 'h3'

class HelloExternal extends ExternalAPIService {
    private slug: string = ''
    constructor() {
        super()
    }

    public async getHello(event: H3Event) {
        try {
            console.log(this.baseAPI.defaults.baseURL)

            const resp = await this.baseAPI.get(`/`)

            if (!resp.data) throw new Error(`getHello: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }
}

export const helloService = new HelloExternal()
