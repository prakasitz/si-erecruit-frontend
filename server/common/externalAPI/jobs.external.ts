import { AxiosError, AxiosRequestConfig } from 'axios'
import { H3Event, H3Error } from 'h3'
import { ExternalAPIService } from './ExternalAPIService'
import { JobWithProfile, JobWithProfileAndQuickAction } from '../../../utils/types'
import { quickActionHandler } from '../profileAction/quick_action_handler'

class JobsExternal extends ExternalAPIService {
    private slug: string = 'jobs'
    constructor() {
        super()
    }
    public async getJobs(event: H3Event, body?: any) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.post(
                `/${this.slug}/get`,
                {
                    ...body,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )

            if (!resp.data) throw new Error(`getJobs: Data not found`)

            let result: any = resp.data
            return new Promise<any>((resolve) => {
                setTimeout(() => {
                    resolve(result)
                }, 1000)
            })
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getProfilesByJobId(event: H3Event, jobId?: string): Promise<JobWithProfileAndQuickAction | Error> {
        try {
            console.log('============= jobs: method => getProfilesByJobId =======================')
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.post<JobWithProfile>(
                `/${this.slug}/getProfileOnJob/${jobId}`,
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )
            return quickActionHandler.getAvailableActions(resp.data)
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        } finally {
            console.log('=================================================')
        }
    }

    public async delJobById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)
            const resp = await this.baseAPI.delete(`/${this.slug}/delete`, {
                data: {
                    job_ID: jobId,
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

    public async approveobById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)

            const resp = await this.baseAPI.patch(
                `/${this.slug}/approved`,
                {
                    job_ID: jobId,
                },
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

    public async cancelById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)

            const resp = await this.baseAPI.patch(
                `/${this.slug}/cancel`,
                {
                    job_ID: jobId,
                },
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

    public async rePublishById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)

            const resp = await this.baseAPI.patch(
                `/${this.slug}/republish`,
                {
                    job_ID: jobId,
                },
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

    public async publishById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)

            const resp = await this.baseAPI.put(
                `/${this.slug}/publish`,
                {
                    job_ID: jobId,
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                    },
                }
            )

            return resp.data
        } catch (error: AxiosError | any) {
            if (error?.response?.data?.statusCode) {
                return createError({
                    statusCode: error.response.data.statusCode,
                    statusMessage: error.response.data.message,
                    stack: undefined,
                })
            } else {
                return this.handleError(error)
            }
        }
    }

    public async suspendById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)

            const resp = await this.baseAPI.patch(
                `/${this.slug}/suspended`,
                {
                    job_ID: jobId,
                },
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

    public async terminateById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)

            const resp = await this.baseAPI.patch(
                `/${this.slug}/terminate`,
                {
                    job_ID: jobId,
                },
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

    public async verifiedById(jobId: number, event: H3Event) {
        try {
            const accessToken = this.getAccessToken(event)

            const resp = await this.baseAPI.patch(
                `/${this.slug}/verified`,
                {
                    job_ID: jobId,
                },
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
}

export const jobService = new JobsExternal()
