import axios, { AxiosError, AxiosInstance } from 'axios'
import { H3Event, H3Error } from 'h3'
import { TokenNotFoundError } from '../../utils/default'
import { getClientCredentials } from './authentication'

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

    protected getAccessToken(event: H3Event) {
        let accessTokenWithBearer = getCookie(event, 'access_token')
        if (!accessTokenWithBearer) return TokenNotFoundError('message from getAccessToken')
        return accessTokenWithBearer.split(' ')[1]
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
            return this.handleError(error)
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
            return this.handleError(error)
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
            console.log(error.data)
            return this.handleError(error)
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
            // modify resp.data on role[] add `HR`
            if (!resp.data.role) resp.data.role = []
            resp.data.role.push('HR')
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
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
            return this.handleError(error)
        }
    }

    protected handleError(error: Error | AxiosError | H3Error) {
        if (axios.isAxiosError(error)) {
            console.log('=====================ExternalAPI:isAxiosError=====================')
            // axios timeout
            if (error.code === 'ECONNABORTED') {
                console.log('ExternalAPI:Axios:Timeout:', ' ', {
                    statusCode: 408,
                    message: 'Request Timeout',
                })
                console.log('=================================================================')
                return createError({
                    statusCode: 408,
                    statusMessage: 'Request Timeout',
                    stack: undefined,
                })
            } else {
                console.log('ExternalAPI:Axios:HTTPError:', ' ', {
                    statusCode: error.response?.status,
                    message: error.response?.statusText,
                })
                console.log('=================================================================')
                return createError({
                    statusCode: error.response?.status,
                    statusMessage: error.response?.statusText,
                    stack: undefined,
                })
            }
        } else if (error instanceof H3Error) {
            return error
        } else {
            return error
        }
    }
}

export const externalAPIService = new ExternalAPIService()
