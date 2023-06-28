import axios, { AxiosError, AxiosInstance } from 'axios'
import { getClientCredentials } from './authentication'

const config = useRuntimeConfig()
const baseAPi = axios.create({
    baseURL: config.baseApi,
    timeout: 1000,
})

class BackendService {
    private token: string | undefined
    private config: any
    private baseAPI: AxiosInstance

    constructor() {
        this.config = useRuntimeConfig()
        this.baseAPI = axios.create({
            baseURL: config.baseApi,
            timeout: 1000,
        })
    }

    private async initializeToken() {
        this.token = (await getClientCredentials())?.toString()
    }

    public async CandidateUserInfo(candidate_token: string) {
        try {
            const resp = await this.baseAPI.post(
                '/cadidate/auth/userInfo',
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
                '/candidate-info/check-active',
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

    public async CandidateLogin(pid: string, password: string) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.post(
                '/cadidate/auth',
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
