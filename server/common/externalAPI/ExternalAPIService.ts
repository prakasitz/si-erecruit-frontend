import axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios'
import { H3Event, H3Error } from 'h3'
import { getClientCredentials } from '../authentication'
import { TokenNotFoundError, UnauthorizedError, forbiddenError } from '../../../utils/default'
import { ContextUser, FileUpload, FileUploadHandler, Permission } from '../../../utils/types'
import { hasPermission } from '../permission'
import QueryString from 'qs'
import * as fs from 'fs'
import FormData from 'form-data'
import { trimAllSpace } from '../../../utils/string'
import { dateToString } from '../../../utils/date'
import { DateFormatEnum } from '../../../utils/enum'

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
            timeout: 5000,
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
            throw forbiddenError(`You don't have permission, Current permission: ${permission}`)
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

    public async CandidateUploadFile(event: H3Event, fileUpload: FileUploadHandler) {
        try {
            if (!fileUpload) throw new Error('file is required')

            const headers = getHeaders(event)
            const queryObj = getQuery(event)
            const queryStr = QueryString.stringify(queryObj)

            const accessToken = this.getAccessToken(event)

            const { originalFilename, filepath } = fileUpload.file[0]

            const fileStream: fs.ReadStream = fs.createReadStream(filepath)

            //substring originalFilename if more than 50
            let cleanFileName = originalFilename
            if (originalFilename && originalFilename.length > 50) {
                const ext = originalFilename.substring(originalFilename.length - 4)
                const subStr = originalFilename.substring(0, 50)
                cleanFileName = subStr + '...' + ext
            }

            cleanFileName = trimAllSpace(originalFilename!)
            const newFileName = `${fileUpload.data.tag}-${dateToString(
                new Date().toString(),
                DateFormatEnum.DATE_TIME_GENERAL_1
            )}-${cleanFileName}`

            //create formData
            const formData = new FormData()
            formData.append('filetoupload', fileStream, originalFilename || 'filetoupload')
            formData.append('fileName', newFileName)
            formData.append('pid', fileUpload.data.pid)
            formData.append('tag', fileUpload.data.tag)
            const resp = await this.baseAPI.post(`${this.candidateInfoSlug}/file/upload?${queryStr}`, formData, {
                headers: {
                    ...formData.getHeaders(),
                    Authorization: 'Bearer ' + accessToken,
                },
            })

            if (!resp.data) throw new Error(`🎈 CandidateUploadFile: Error Unexpected`)

            return {
                data: resp.data,
                headers: formData.getHeaders(),
            }
        } catch (error: AxiosError | any) {
            console.log('🎈 CandidateUploadFile:error', error)
            return this.handleError(error)
        }
    }

    public async CandidateFileDetail(event: H3Event, profileId: string) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.get(`/${this.candidateInfoSlug}/file/detail/${profileId}`, {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
            })
            return resp.data
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async CandidateFileDelete(event: H3Event, profileId: string, tag: string) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.delete(`/${this.candidateInfoSlug}/file/delete`, {
                data: {
                    profileId: profileId,
                    pid: event.context?.user?.pid,
                    tag: tag,
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

    public async CandidateFileDownload(event: H3Event, profileId: string, path: string) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.get(`/${this.candidateInfoSlug}/file/download/${path}`, {
                params: {
                    profileId: profileId,
                },
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                },
                responseType: 'arraybuffer',
            })
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
            console.log('🔴 handleError:axiosError', { response: error.response })
            // axios timeout
            if (error.code === 'ECONNABORTED') {
                console.log('=================================================================')
                return createError({
                    statusCode: 408,
                    statusMessage: 'Request Timeout',
                    stack: undefined,
                })
            } else {
                console.log('🔴 ExternalAPI:Axios:HTTPError:', ' ', {
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
