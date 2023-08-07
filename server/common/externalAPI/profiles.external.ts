import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'
import { H3Event } from 'h3'
import * as fs from 'fs'
import FormData from 'form-data'
import { FileUpload } from '../../../utils/types'
import { UnauthorizedError } from '../../../utils/default'

class ProfileExternal extends ExternalAPIService {
    private slug: string = 'profile'
    constructor() {
        super()
    }

    public async get(event: H3Event, { profile_ID }: { profile_ID: string }) {
        if (!profile_ID) throw new Error('profile_ID is required')
        try {
            const user = event.context?.user
            console.log(user)
            if (!user) throw UnauthorizedError("User doesn't exist")

            if (user.role.includes('CANDIDATE')) throw UnauthorizedError("You don't have permission")

            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.post(
                `/${this.slug}/get/${profile_ID}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    //working only non-proxy
    public async import(event: H3Event, { file }: { file: FileUpload[] }) {
        try {
            console.log('============= profiles: method => import =======================')

            if (!file) throw new Error('file is required')

            const { originalFilename, filepath } = file[0]
            const fileStream: fs.ReadStream = fs.createReadStream(filepath)

            //create formData
            const formData = new FormData()
            formData.append('file', fileStream, originalFilename)

            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.post(`/${this.slug}/import`, formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: 'Bearer ' + accessToken,
                },
            })

            if (!resp.data) throw new Error(`importProfile: Error Unexpected`)
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        } finally {
            console.log('=================================================')
        }
    }

    public deleteFile = (filePath: any) => {
        fs.unlink(filePath, (error: any) => {
            if (error) {
                console.error('Error deleting file:', error)
                throw error
            } else {
                console.log('File deleted successfully:', filePath)
            }
        })
    }
}

export const profileService = new ProfileExternal()
