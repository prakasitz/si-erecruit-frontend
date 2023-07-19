import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'
import { H3Event } from 'h3'
import { Readable } from 'stream'
import * as fs from 'fs'
import FormData from 'form-data'
import { Blob } from 'buffer'

class ProfileExternal extends ExternalAPIService {
    private slug: string = 'profile'
    constructor() {
        super()
    }

    public async import(
        event: H3Event,
        {
            filename,
            blob,
            bufferData,
            formDataString,
            h,
            formMultipart,
        }: { filename: string; blob: Blob; bufferData: Buffer; formDataString: string; h: any; formMultipart: any }
    ) {
        try {
            console.log('profiles: method => import')
            // const formData = new FormData()
            // console.log('blob:', blob)
            // // formData.append('file', bufferData)
            // formData.append('file', blob, filename)
            // console.log('formData Header', formData.getHeaders())

            return this.SendFormDataAndHeader(formDataString, h, event)

            // if (!resp.data) throw new Error(`importProfile: Error Unexpected`)

            // let result: any = resp.data
            // return new Promise<any>((resolve) => {
            //     setTimeout(() => {
            //         resolve(result)
            //     }, 1000)
            // })

            // return { resp: resp.data }
        } catch (error: AxiosError | any) {
            if (error instanceof AxiosError) {
                console.log(error.response)
            }
            return this.handleError(error)
        }
    }

    public async SendBufferAsFormData(bufferData: any, event: H3Event) {
        const formData = new FormData()
        formData.append('file', bufferData)
        const accessToken = this.getAccessToken(event)
        const resp = await this.baseAPI.post(`/${this.slug}/import`, formData, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })

        if (!resp.data) throw new Error(`importProfile: Error Unexpected`)
        return { resp: resp.data }
    }

    //error
    public async SendFormDataAndHeader(formDataString: string, headers: any, event: H3Event) {
        const accessToken = this.getAccessToken(event)
        const resp = await this.baseAPI.post(`/${this.slug}/import`, formDataString, {
            headers: {
                ...headers,
                Authorization: 'Bearer ' + accessToken,
            },
        })

        if (!resp.data) throw new Error(`importProfile: Error Unexpected`)
        return { resp: resp.data }
    }
}

export const profileService = new ProfileExternal()
