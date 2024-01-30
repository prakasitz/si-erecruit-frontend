import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'
import { H3Event } from 'h3'
import * as fs from 'fs'
import FormData from 'form-data'
import { FileUpload, Profile, ProfileActionMethod, ProfileStatus, ProfileStatusAndID } from '../../../utils/types'
import { BadRequestError, TokenNotFoundError } from '../../../utils/default'
import { actionStatusIdMapping } from '../profileAction/constant'
import { canAccessHR } from '../permission'

class ProfileExternal extends ExternalAPIService {
    private slug: string = 'profile'
    private canBeChangeStatus = []

    constructor() {
        super()
    }

    public async submit(event: H3Event, { profile_ID }: { profile_ID: string }) {
        if (!profile_ID) throw new Error('profile_ID is required')
        try {
            this.checkPermission(event, 'can-access-candidate')
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.put(
                `/${this.slug}/update/${profile_ID}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async draft(event: H3Event, profileObj: any) {
        if (!profileObj.profile_ID) throw new Error('profile_ID is required')
        try {
            this.checkPermission(event, 'can-access-hr-candidate')

            const { user } = event.context
            let slug = canAccessHR(user) ? this.slug : 'candidate-info'
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.put(`/${slug}/draft`, profileObj, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async get(event: H3Event, { profile_ID }: { profile_ID: string }) {
        if (!profile_ID) throw new Error('profile_ID is required')
        try {
            this.checkPermission(event, 'can-access-admin-hr-candidate')
            // const accessToken = this.getAccessToken(event)
            await this.initializeToken()

            const resp = await this.baseAPI.post(
                `/${this.slug}/get/${profile_ID}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async exportProfilesByJob(event: H3Event, { job_ID, type }: { job_ID: string; type: string }) {
        if (!job_ID) throw new Error('job_ID is required')
        try {
            this.checkPermission(event, 'can-access-admin-hr')
            const token = this.getAccessToken(event)

            const resp = await this.baseAPI.get(`/${this.slug}/export/${job_ID}/${type}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                responseType: 'stream', // telling Axios to treat the response as a stream of data,
            })

            let attachmentExt = ''

            switch (type) {
                case 'excel':
                    attachmentExt = '.xlsx'
                    break
                case 'csv':
                    attachmentExt = '.csv'
                    break
                case 'json':
                    attachmentExt = '.json'
                    break
                default:
                    break
            }

            const headers = {
                'Content-Type': resp.headers['content-type'],
                'Content-Disposition': 'attachment; filename=export' + attachmentExt,
            }

            setResponseHeaders(event, headers)

            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async checkStatus(
        profile_IDs: number[],
        event: H3Event
    ): Promise<
        | {
              data: ProfileStatusAndID[]
          }
        | Error
    > {
        if (!profile_IDs) throw new Error('profile_ID is required')
        try {
            this.checkPermission(event, 'can-access-admin-hr')
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.post(
                `/${this.slug}/getStatus`,
                { profile_IDs: profile_IDs },
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
                console.error('🔴 Error deleting file:', error)
                throw error
            } else {
                console.log('🟢 File deleted successfully:', filePath)
            }
        })
    }

    // Method to validate profile statuses for a given action
    private validateProfileStatusesForAction(action: ProfileActionMethod, profileStatuses: ProfileStatusAndID[]): void {
        const validStatuses = actionStatusIdMapping[action]
        const invalidProfiles = profileStatuses.filter((profile) => !validStatuses.includes(profile.profile_status))

        // If there are any invalid profiles, return an error
        if (invalidProfiles.length > 0) {
            throw new Error(
                `Profiles with IDs ${invalidProfiles
                    .map((p) => p.profile_ID)
                    .join(', ')} have invalid statuses for ${action}.`
            )
        }
    }

    public async updateProfileStatus(action: ProfileActionMethod, profiles: number[], event: H3Event) {
        this.checkPermission(event, 'can-access-admin-hr')

        const profileStatusDataOrError = await this.checkStatus(profiles, event)
        if (profileStatusDataOrError instanceof Error) return profileStatusDataOrError
        const list_status = profileStatusDataOrError.data
        // Validate profiles for the given action
        this.validateProfileStatusesForAction(action, list_status)

        return this.performAction(action, profiles, event)
    }

    private async performAction(action: string, profiles: number[], event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.patch(
                `/${this.slug}/${action}`,
                { profile_IDs: profiles },
                { headers: { Authorization: 'Bearer ' + accessToken } }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async delete(profiles: number[], event: H3Event) {
        try {
            this.checkPermission(event, 'can-access-admin-hr')

            if (profiles.length == 0) throw BadRequestError('profile_IDs is required')
            if (profiles.length > 1) throw new Error('Only one profile can be deleted at a time')

            const profileStatusDataOrError = await this.checkStatus(profiles, event)
            if (profileStatusDataOrError instanceof Error) return profileStatusDataOrError
            const list_status = profileStatusDataOrError.data

            this.validateProfileStatusesForAction('delete', list_status)

            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.delete(`/${this.slug}/delete`, {
                data: {
                    profile_IDs: profiles,
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

export const profileService = new ProfileExternal()
