import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'
import { H3Event, H3Error } from 'h3'
import { ProfileStatusCode, JobStatusCode } from '../../../utils/types'

class MasterExternal extends ExternalAPIService {
    private masterSlug: string = 'master-data'
    constructor() {
        super()
    }

    public async getJobStatus(event?: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/job-status`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getJobStatus: Data not found`)

            let result: JobStatusCode[] = resp.data
            return result

            // const jobStatusConfig: JobStatusCode[] = [
            //     {
            //         job_status_code: 0,
            //         job_status_text: 'Created',
            //         zjob_status_color: 'label-light-info',
            //     },
            //     {
            //         job_status_code: 1,
            //         job_status_text: 'Importing',
            //         zjob_status_color: 'label-light-megna',
            //     },
            //     {
            //         job_status_code: 2,
            //         job_status_text: 'Fail Imported',
            //         zjob_status_color: 'label-megna',
            //     },
            //     {
            //         job_status_code: 3,
            //         job_status_text: 'Imported',
            //         zjob_status_color: 'label-primary',
            //     },
            //     {
            //         job_status_code: 4,
            //         job_status_text: 'Published',
            //         zjob_status_color: 'label-danger',
            //     },
            //     {
            //         job_status_code: 5,
            //         job_status_text: 'Suspended',
            //         zjob_status_color: 'label-inverse',
            //     },
            //     {
            //         job_status_code: 6,
            //         job_status_text: 'Verifying',
            //         zjob_status_color: 'label-success',
            //     },
            //     {
            //         job_status_code: 7,
            //         job_status_text: 'Approved',
            //         zjob_status_color: 'label-light-warning',
            //     },
            //     {
            //         job_status_code: 9,
            //         job_status_text: 'Cancelled',
            //         zjob_status_color: 'label-danger',
            //     },
            //     {
            //         job_status_code: 98,
            //         job_status_text: 'Terminated',
            //         zjob_status_color: 'label-danger',
            //     },
            //     {
            //         job_status_code: 99,
            //         job_status_text: 'Closed',
            //         zjob_status_color: 'label-warning',
            //     },
            // ]
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getProfileStatus(event?: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/profile-status`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getProfileStatus: Data not found`)

            let result: ProfileStatusCode[] = resp.data
            return result

            // const profileStatusConfig: ProfileStatusCode[] = [
            //     {
            //         profile_status_code: 0,
            //         profile_status_text: 'Created',
            //         zprofile_status_color: 'label-info',
            //     },
            //     {
            //         profile_status_code: 1,
            //         profile_status_text: 'Imported',
            //         zprofile_status_color: 'label-megna',
            //     },
            //     {
            //         profile_status_code: 2,
            //         profile_status_text: 'Publishable',
            //         zprofile_status_color: 'label-success',
            //     },
            //     {
            //         profile_status_code: 3,
            //         profile_status_text: 'Suspended',
            //         zprofile_status_color: 'label-danger',
            //     },
            //     {
            //         profile_status_code: 4,
            //         profile_status_text: 'Submitted',
            //         zprofile_status_color: 'label-light-success',
            //     },
            //     {
            //         profile_status_code: 5,
            //         profile_status_text: 'Verified',
            //         zprofile_status_color: 'label-light-megna',
            //     },
            //     {
            //         profile_status_code: 6,
            //         profile_status_text: 'Waived',
            //         zprofile_status_color: 'label-warning',
            //     },
            //     {
            //         profile_status_code: 9,
            //         profile_status_text: 'Cancelled',
            //         zprofile_status_color: 'label-red',
            //     },
            //     {
            //         profile_status_code: 99,
            //         profile_status_text: 'Closed',
            //         zprofile_status_color: 'label-light-inverse',
            //     },
            // ]

            // return profileStatusConfig
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getProvince(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/province`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getProvince: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getMaritalStatus(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/marital-status`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getMaritalStatus: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getBlood(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/blood`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getBlood: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getTitle(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/title`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitle: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getTitleTH(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/titleTH`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitleTH: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getTitleEN(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/titleEN`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitleEN: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getTitleSpecial(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/title-special`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitleSpecial: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getTitleAcademic(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/title-academic`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitleAcademic: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getTitleConferred(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/title-conferred`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitleConferred: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getTitleMilitary(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/title-military`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitleMilitary: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getMilitary(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/military`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getMilitary: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getReligion(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/religion`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getReligion: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getLevel(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/level`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getLevel: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getCertificate(lv: string, event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/certificate?lv=${lv}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getCertificate: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getMajor(lv: string, event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/major?lv=${lv}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getMajor: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getInstitute(lv: string, event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/institute?lv=${lv}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getInstitute: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getRace(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/race`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getRace: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getPosition(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/position`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getPosition: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getSettings(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/settings`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getSettings: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getRoles(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/role`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getRoles: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getBySetting(setting_keys: { setting_keys: string[] }, event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.post(
                `/${this.masterSlug}/settings`,
                {
                    code_list: setting_keys.setting_keys,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                }
            )
            if (!resp.data) throw new Error(`getSettings: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getWelcome(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/welcome`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getWelcome: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async updateSetting(setting: { setting_key: string; value: string }, event: H3Event) {
        try {
            const token = await this.getAccessToken(event)
            const resp = await this.baseAPI.put(
                `/${this.masterSlug}/setting`,
                { ...setting },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            )
            if (!resp.data || resp.data.rowAffects < 1) throw new Error(`Update Setting: fail`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }
}

export const masterService = new MasterExternal()
