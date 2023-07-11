import axios, { AxiosError, AxiosInstance } from 'axios'
import { getClientCredentials } from '../authentication'

export class ExternalAPIService {
    protected token: string | undefined
    protected config: any
    protected baseAPI: AxiosInstance
    protected hrSlug = 'hr-user'
    protected candidateSlug = 'candidate'
    protected candidateInfoSlug = 'candidate-info'

    constructor() {
        this.config = useRuntimeConfig()
        this.baseAPI = axios.create({
            baseURL: this.config.baseApi,
            timeout: 1000,
        })
    }

    protected async initializeToken() {
        this.token = (await getClientCredentials())?.toString()
    }

    public async CandidateLogin(pid: string, password: string) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.post(
                `/${this.candidateSlug}/auth`,
                {
                    pid: pid.toString(),
                    password: password.toString(),
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async CandidateUserInfo(candidate_token: string) {
        try {
            const resp = await this.baseAPI.post(
                `/${this.candidateSlug}/auth/userInfo`,
                {},
                {
                    headers: {
                        Authorization: candidate_token,
                    },
                }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async CandidateCheckActive(pid: string) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.post(
                `/${this.candidateInfoSlug}/check-active`,
                {
                    pid: pid.toString(),
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async HRLogin(username: string, password: string) {
        try {
            await this.initializeToken()

            const resp = await this.baseAPI.post(
                `/${this.hrSlug}/auth`,
                {
                    username: username.toString(),
                    password: password.toString(),
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    },
                }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    public async HRUserInfo(hr_token: string) {
        try {
            const resp = await this.baseAPI.post(
                `/${this.hrSlug}/auth/userInfo`,
                {},
                {
                    headers: {
                        Authorization: hr_token,
                    },
                }
            )
            return resp.data
        } catch (error: AxiosError | any) {
            throw this.handleError(error)
        }
    }

    protected handleError(error: Error | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log('=====================ExternalAPI:handleError=====================')
            console.log('ExternalAPI:error:', ' ', {
                statusCode: error.response?.status,
                message: error.response?.statusText,
            })
            console.log('=================================================================')
            return createError({
                statusCode: error.response?.status,
                statusMessage: error.response?.statusText,
                stack: undefined,
            })
        } else {
            return error
        }
    }
}

export const externalAPIService = new ExternalAPIService()
