import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'
import { H3Event, H3Error } from 'h3'

class MasterExternal extends ExternalAPIService {
    private masterSlug: string = 'master-data'
    constructor() {
        super()
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

    public async getTitle(adult: undefined | string, event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.masterSlug}/title`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getTitle: Data not found`)

            let result: any = resp.data
            if (adult == '1') {
                result = resp.data.filter((obj: any) => ['1', '2', '3'].includes(obj.form_of_address_key))
            } else {
                result = resp.data.filter((obj: any) => ['4', '5'].includes(obj.form_of_address_key))
            }

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
