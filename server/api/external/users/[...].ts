import { profileService } from '../../../common/externalAPI/profiles.external'
import { IncomingMessage } from 'http'
import { formidable, Options, errors } from 'formidable'
import { BadRequestError, TokenNotFoundError, UnauthorizedError } from '../../../../utils/default'

import { H3Error } from 'h3'
import { IPersonalStore } from '../../../../utils/interface/personal_information.interface'
import { generateProfileJSON } from '../../../utils/profile'
import { userService } from '../../../common/externalAPI/user.external'

const router = createRouter()

router.get(
    '/get',
    defineEventHandler(async (event) => {
        const resp = await userService.getUsers(event)
        return resp
    })
)

router.get(
    '/get/:id',
    defineEventHandler(async (event) => {
        const id = getRouterParam(event, 'id')
        const q = getQuery(event)
        let type = q?.type as string | undefined
        if (!id) throw BadRequestError('id is required')
        const resp = await userService.getUserById(event, id, type)
        return resp
    })
)

router.post(
    '/create',
    defineEventHandler(async (event) => {
        const resp = await userService.createUser(event)
        return resp
    })
)

router.put(
    '/update',
    defineEventHandler(async (event) => {
        const resp = await userService.updateUser(event)
        return resp
    })
)

router.delete(
    '/delete/:id',
    defineEventHandler(async (event) => {
        const id = getRouterParam(event, 'id')
        if (!id) throw BadRequestError('id is required')

        const resp = await userService.deleteUserById(event, id)
        return resp
    })
)

export default useBase('/api/external/users/', router.handler)
