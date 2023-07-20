import { profileService } from '../../../common/externalAPI/profiles.external'
import { IncomingMessage } from 'http'
import { Formidable, formidable, Options, File, Files, errors } from 'formidable'

import { FileUpload } from '../../../../utils/types'
import { H3Error } from 'h3'
import { BadRequestError } from '../../../../utils/default'

const router = createRouter()

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