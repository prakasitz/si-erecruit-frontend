import { AxiosError } from 'axios'
import { ExternalAPIService } from './ExternalAPIService'

class MasterExternal extends ExternalAPIService {
    private masterSlug: string = 'master-data'
    constructor() {
        super()
    }
    public async getProvince() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getMaritalStatus() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getBlood() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getTitle(adult: undefined | string) {
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
            } else if (adult == '0') {
                result = resp.data.filter((obj: any) => ['4', '5'].includes(obj.form_of_address_key))
            }

            return result
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getTitleSpecial() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getTitleAcademic() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getTitleConferred() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getTitleMilitary() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getMilitary() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getTitleTH() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getTitleEN() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getReligion() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getLevel() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getCertificate() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getMajor() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getInstitute() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getRace() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async getPosition() {
        try {
            await this.initializeToken()

            return this.token
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    // public async getMaritalStatus() {
    //     try {
    //         await this.initializeToken()

    //         return this.token
    //     } catch (error: AxiosError | any) {
    //         throw this.handleError(error)
    //     }
    // }
}

export const masterService = new MasterExternal()
