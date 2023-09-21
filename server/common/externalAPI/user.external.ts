import { ExternalAPIService } from './ExternalAPIService'
import { AxiosError } from 'axios'
import { H3Event, H3Error } from 'h3'
import { userNotFoundError } from '../../../utils/default'

class UserExternal extends ExternalAPIService {
    private slug: string = 'user'
    constructor() {
        super()
    }

    public async getUsers(event: H3Event) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.slug}/get`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getUsers: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async getUserById(event: H3Event, id: string, type?: string) {
        try {
            const token = await this.getAccessToken(event)
            const resp = await this.baseAPI.get(`/${this.slug}/get/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })

            if (type && type == 'chk_unique') {
                if (!resp.data) throw new Error(`getUserById: Data not found`)
                if (Array.isArray(resp.data) && resp.data.length > 0)
                    throw createError({
                        statusCode: 400,
                        message: 'User already exists',
                    })
                return null
            } else {
                if (!resp.data) throw new Error(`getUserById: Data not found`)
                if (Array.isArray(resp.data) && resp.data.length == 0)
                    throw createError({
                        statusCode: 404,
                    })
                let result: any = resp.data[0]
                return result
            }
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async createUser(event: H3Event) {
        try {
            const token = await this.getAccessToken(event)
            const user = event.context.user
            const body = await readBody(event)
            const resp = await this.baseAPI.post(
                `/${this.slug}/create`,
                { ...body, created_by: user?.sub },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            )

            if (!resp.data) throw new Error(`createUser: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async updateUser(event: H3Event) {
        try {
            const token = await this.getAccessToken(event)
            const body = await readBody(event)
            const user = event.context.user
            const resp = await this.baseAPI.put(
                `/${this.slug}/update`,
                { ...body, created_by: user?.sub },
                {
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                }
            )

            if (!resp.data) throw new Error(`updateUser: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async lockUserById(event: H3Event, id: string) {
        try {
            const token = await this.getAccessToken(event)
            const resp = await this.baseAPI.patch(`/${this.slug}/lock/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })

            if (!resp.data) throw new Error(`lockUserById: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async deleteUserById(event: H3Event, id: string) {
        try {
            const token = await this.getAccessToken(event)
            const resp = await this.baseAPI.delete(`/${this.slug}/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            })

            if (!resp.data) throw new Error(`deleteUserById: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }
}

export const userService = new UserExternal()
