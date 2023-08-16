import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'
import { H3Event } from 'h3'
import * as fs from 'fs'
import FormData from 'form-data'
import { FileUpload, Profile } from '../../../utils/types'
import { UnauthorizedError } from '../../../utils/default'

class ProfileExternal extends ExternalAPIService {
    private slug: string = 'profile'
    constructor() {
        super()
    }

    private generateProfileJSON(data: any): Profile {
        const profile: Profile = {
            title_name_th: data.title_name_th,
            title_name_en: data.title_name_en,
            title_special: data.title_special,
            title_academic: data.title_academic,
            title_military: data.title_military,
            title_conferred: data.title_conferred,
            nameTH: data.first_name_th,
            lastnameTH: data.last_name_th,
            // nickname_th: data.nickname_th,
            first_name_en: data.first_name_en,
            last_name_en: data.last_name_en,
            email_address: data.email_address,
            birth_date: data.birth_date,
            province_when: data.province_when,
            age_year: data.age_year,
            age_month: data.age_month,
            id_card_number: data.id_card_number,
            id_card_amphur: data.id_card_amphur,
            id_card_province: data.id_card_province,
            id_card_issue_date: data.id_card_issue_date,
            id_card_expire_date: data.id_card_expire_date,
            height: data.height,
            weight: data.weight,
            blood_type: data.blood_type,
            race: data.race,
            nationality: data.nationality,
            religion: data.religion,


        }

        return profile
    }

    public async submit(event: H3Event, { profile_ID }: { profile_ID: string }) {
        if (!profile_ID) throw new Error('profile_ID is required')
        try {
            const user = event.context?.user
            if (!user) throw UnauthorizedError("User doesn't exist")
            if (user.role.includes('CANDIDATE', 'HR')) throw UnauthorizedError("You don't have permission")
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

    public async draft(event: H3Event, { profile_ID }: { profile_ID: string }) {
        if (!profile_ID) throw new Error('profile_ID is required')
        try {
            const user = event.context?.user
            if (!user) throw UnauthorizedError("User doesn't exist")
            if (user.role.includes('CANDIDATE', 'HR')) throw UnauthorizedError("You don't have permission")

            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.put(
                `/${this.slug}/draft/${profile_ID}`,
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

    public async get(event: H3Event, { profile_ID }: { profile_ID: string }) {
        if (!profile_ID) throw new Error('profile_ID is required')
        try {
            const user = event.context?.user
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
