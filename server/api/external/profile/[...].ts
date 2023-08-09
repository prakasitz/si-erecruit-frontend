import { profileService } from '../../../common/externalAPI/profiles.external'
import { IncomingMessage } from 'http'
import { formidable, Options, errors } from 'formidable'
import { BadRequestError, TokenNotFoundError } from '../../../../utils/default'

import { H3Error } from 'h3'

const router = createRouter()

router.post(
    '/get/:id',
    defineEventHandler(async (event) => {
        const id = getRouterParam(event, 'id')
        if (!id) throw BadRequestError('id is required')
        const resp = await profileService.get(event, { profile_ID: id })
        return resp
    })
)

router.post(
    '/import',
    defineEventHandler(async (event) => {
        let bodyFormData: any
        try {
            const headers = getRequestHeaders(event)
            if (headers['content-type']?.includes('multipart/form-data')) {
                bodyFormData = await parseMultipartNodeRequest(event.node.req)
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
    '/suspended',
    defineEventHandler(async (event) => {
        const body = await readBody(event)
        // if (!jobId || !isStringNumber(jobId)) throw BadRequestError('Job ID must be a number')
        const tokenOrUndefined = getCookie(event, 'access_token')
        if (!tokenOrUndefined) return TokenNotFoundError()

        const checkStatus = await profileService.checkStatus(body, event)
        if (!checkStatus.data) {
            throw createError({
                statusCode: 400,
                message: 'Not found any Profiles.',
            })
        }

        const list_status = checkStatus.data;
        let cantChangeProfiles: number[] = []
        list_status.map((item: { profile_ID: number; profile_status: number }) => {
            if (item.profile_status < 1 || item.profile_status > 2) {
                cantChangeProfiles.push(item.profile_ID)
            }
        })

        if (cantChangeProfiles.length > 0) {
            throw createError({
                statusCode: 400,
                message: 'Cannot update these profiles.',
            })
        }
        console.log(cantChangeProfiles.length > 0)

        const response = await profileService.suspenedProfiles(body, event)
        return response
    })
)

function parseMultipartNodeRequest(req: IncomingMessage): Promise<{
    file: any
}> {
    console.log('hello')
    //`C:\Users\Lijinx\AppData\Local\Temp\`
    return new Promise((resolve, reject) => {
        //require only one file
        let cancelUploads = false // create variable at the same scope as form
        const options: Options = {
            filter: function ({ name, originalFilename, mimetype }: any) {
                const valid = name && name == 'file'
                if (!valid) {
                    //@ts-ignore
                    form.emit('error', new errors.default('File name is not valid', 0, 400)) // optional make form.parse error
                    cancelUploads = true //variable to make filter return false after the first problem
                }
                return valid && !cancelUploads
            },
            multiples: false,
        }
        const form = formidable(options)
        form.parse(req, (err, fields, file) => {
            if (err) {
                reject(err)
                return
            }
            resolve({ ...file })
        })
    }) as any
}

export default useBase('/api/external/profile', router.handler)
