import axios, { AxiosError, AxiosInstance } from 'axios'
import { getClientCredentials } from './authentication'

class BackendService {
    private token: string | undefined
    private config: any
    private baseAPI: AxiosInstance
    private hrSlug = 'hr-user'
    private candidateSlug = 'cadidate'
    private candidateInfoSlug = 'candidate-info'

    constructor() {
        this.config = useRuntimeConfig()
        this.baseAPI = axios.create({
            baseURL: this.config.baseApi,
            timeout: 1000,
        })
    }

    private async initializeToken() {
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
            let token = hr_token.split('Bearer ')[1]
            const resp = await this.baseAPI.post(
                `/${this.hrSlug}/auth/userInfo`,
                {
                    body: token,
                },
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

    private handleError(error: Error | AxiosError) {
        if (axios.isAxiosError(error)) {
            console.log('axios error:', error.response)
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

export const backendService = new BackendService()
