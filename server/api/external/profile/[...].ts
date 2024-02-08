import { profileService } from '../../../common/externalAPI/profiles.external'
import { IncomingMessage } from 'http'
import { formidable, Options, errors } from 'formidable'
import { BadRequestError, TokenNotFoundError, UnauthorizedError } from '../../../../utils/default'

import { H3Error } from 'h3'
import { generateProfileJSON } from '../../../utils/profile'
import { parseMultipartNodeRequest } from '../../../utils/multipartNodeRequest'

const router = createRouter()

router.get(
    '/export/:id/:type',
    defineEventHandler(async (event) => {
        const id = getRouterParam(event, 'id')
        const type: string | undefined = getRouterParam(event, 'type')
        if (!id) throw BadRequestError('id is required')
        if (!type) throw BadRequestError('type is required')

        const resp = await profileService.exportProfilesByJob(event, { job_ID: id, type })
        return resp
    })
)

router.post(
    '/get/:id',
    defineEventHandler(async (event) => {
        const id = getRouterParam(event, 'id')
        if (!id) throw BadRequestError('id is required')
        const resp = await profileService.get(event, { profile_ID: id })
        return resp
    })
)

router.put(
    '/draft/:id',
    defineEventHandler(async (event) => {
        const id = getRouterParam(event, 'id')

        if (!id) throw BadRequestError('id is required')

        const body = await readBody(event)
        const obj: { profile_ID?: string } = { profile_ID: id }
        const updateObj = generateProfileJSON(body)

        const resp = await profileService.draft(event, {
            ...obj,
            ...updateObj,
        })
        return resp
    })
)

router.post(
    '/read-profile-file',
    defineEventHandler(async (event) => {
        let bodyFormData: any
        try {
            const headers = getRequestHeaders(event)
            if (headers['content-type']?.includes('multipart/form-data')) {
                bodyFormData = await parseMultipartNodeRequest(event.node.req, { file: 'file' })
            } else {
                throw createError({
                    statusCode: 400,
                    message: 'Invalid content-type',
                })
            }
            const resp = await profileService.readfile(event, bodyFormData)

            return resp
        } catch (error: H3Error | any) {
            throw error
        } finally {
            //delete file
            if (bodyFormData && bodyFormData.file && bodyFormData!.file[0].filepath) {
                profileService.deleteFile(bodyFormData!.file![0].filepath)
            }
        }
    })
)

router.post(
    '/import',
    defineEventHandler(async (event) => {
        let bodyFormData: any
        try {
            const headers = getRequestHeaders(event)
            if (headers['content-type']?.includes('multipart/form-data')) {
                bodyFormData = await parseMultipartNodeRequest(event.node.req, { file: 'file' })
            } else {
                throw createError({
                    statusCode: 400,
                    message: 'Invalid content-type',
                })
            }
            const resp = await profileService.import(event, bodyFormData)

            return resp
        } catch (error: H3Error | any) {
            throw error
        } finally {
            //delete file
            if (bodyFormData && bodyFormData.file && bodyFormData!.file[0].filepath) {
                profileService.deleteFile(bodyFormData!.file![0].filepath)
            }
        }
    })
)

router.patch(
    '/publishable',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return profileService.updateProfileStatus('publishable', body, event)
    })
)

router.patch(
    '/suspend',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return profileService.updateProfileStatus('suspend', body, event)
    })
)

router.patch(
    '/cancel',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return profileService.updateProfileStatus('cancel', body, event)
    })
)

router.patch(
    '/waive',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return profileService.updateProfileStatus('waive', body, event)
    })
)

router.patch(
    '/verify',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return profileService.updateProfileStatus('verify', body, event)
    })
)

router.patch(
    '/verified',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return profileService.updateProfileStatus('verified', body, event)
    })
)

router.delete(
    '/delete',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        return profileService.delete(body, event)
    })
)

// function parseMultipartNodeRequest(req: IncomingMessage): Promise<{
//     file: any
// }> {
//     //`C:\Users\Lijinx\AppData\Local\Temp\`
//     return new Promise((resolve, reject) => {
//         //require only one file
//         let cancelUploads = false // create variable at the same scope as form
//         const options: Options = {
//             filter: function ({ name, originalFilename, mimetype }: any) {
//                 const valid = name && name == 'file'
//                 if (!valid) {
//                     //@ts-ignore
//                     form.emit('error', new errors.default('File name is not valid', 0, 400)) // optional make form.parse error
//                     cancelUploads = true //variable to make filter return false after the first problem
//                 }
//                 return valid && !cancelUploads
//             },
//             multiples: false,
//         }
//         const form = formidable(options)
//         form.parse(req, (err, fields, file) => {
//             if (err) {
//                 reject(err)
//                 return
//             }
//             resolve({ ...file })
//         })
//     }) as any
// }

export default useBase('/api/external/profile', router.handler)
