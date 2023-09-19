import { ExternalAPIService } from './ExternalAPIService'
import { AxiosError } from 'axios'
import { H3Event, H3Error } from 'h3'

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

    public async getUserById(event: H3Event, id: string) {
        try {
            await this.initializeToken()
            const resp = await this.baseAPI.get(`/${this.slug}/get/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
                },
            })

            if (!resp.data) throw new Error(`getUserById: Data not found`)

            let result: any = resp.data
            return result
        } catch (error: AxiosError | any) {
            return this.handleError(error)
        }
    }

    public async createUser(event: H3Event) {
        try {
            await this.initializeToken()
            const body = await readBody(event)
            if (body.user == null) throw new H3Error('User is null')
            const resp = await this.baseAPI.post(
                `/${this.slug}/create`,
                { ...body.user },
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
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
            await this.initializeToken()
            const body = await readBody(event)
            if (body.user == null) throw new H3Error('User is null')
            const resp = await this.baseAPI.put(
                `/${this.slug}/update`,
                { ...body.user },
                {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
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
            await this.initializeToken()
            const resp = await this.baseAPI.patch(`/${this.slug}/lock/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
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
            await this.initializeToken()
            const resp = await this.baseAPI.delete(`/${this.slug}/delete/${id}`, {
                headers: {
                    Authorization: 'Bearer ' + this.token,
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
