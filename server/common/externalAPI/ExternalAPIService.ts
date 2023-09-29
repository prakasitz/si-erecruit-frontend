import axios, { AxiosError, AxiosInstance } from 'axios'
import { H3Event, H3Error } from 'h3'
import { getClientCredentials } from '../authentication'
import { TokenNotFoundError, UnauthorizedError } from '../../../utils/default'
import { ContextUser, Permission } from '../../../utils/types'
import { hasPermission } from '../permission'

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
            timeout: 2000,
            proxy: false,
        })
    }

    protected getAccessToken(event: H3Event) {
        let accessTokenWithBearer = getCookie(event, 'access_token')
        if (!accessTokenWithBearer) return TokenNotFoundError('message from getAccessToken')
        return accessTokenWithBearer.split(' ')[1]
    }

    protected checkPermission(event: H3Event, permission: Permission) {
        const user = event.context?.user as ContextUser<any>
        if (!user) throw UnauthorizedError("User doesn't exist")
        if (!hasPermission(user, permission))
            throw UnauthorizedError(`You don't have permission, Current permission: ${permission}`)
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

    public async BackendLogin(username: string, password: string) {
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
            return this.handleError(error)
        }
    }

    public async BackendUserInfo(token: string) {
        try {
            const resp = await this.baseAPI.post(
                `/${this.hrSlug}/auth/userInfo`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            )
            if (!resp.data.role || resp.data.role.length == 0)
                throw new Error('BackendUserInfo: role is undefined or []')

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
            console.log({ response: error.response })
            // axios timeout
            if (error.code === 'ECONNABORTED') {
                console.log('=================================================================')
                return createError({
                    statusCode: 408,
                    statusMessage: 'Request Timeout',
                    stack: undefined,
                })
            } else {
                console.log('ExternalAPI:Axios:HTTPError:', ' ', {
                    statusCode: error.response?.status,
                    statusMessage: error.response?.statusText,
                    message: error.response?.data?.message || error.message,
                    data: error.response?.data,
                })
                console.log('=================================================================')
                return createError({
                    statusCode: error.response?.status,
                    statusMessage: error.response?.statusText,
                    message: error.response?.data?.message || error.message,
                    data: error.response?.data,
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
