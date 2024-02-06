import formidable from 'formidable'
import { IncomingMessage } from 'http'
import { FileUploadHandler } from '../../utils/types'

type FormDataAllowKey = {
    file: string
    fields?: string[]
}

export async function parseMultipartNodeRequest(
    req: IncomingMessage,
    allowKeys: FormDataAllowKey
): Promise<FileUploadHandler> {
    const { file: kFile, fields: kFields = [] } = allowKeys

    return new Promise((resolve, reject) => {
        //require only one file
        let cancelUploads = false // create variable at the same scope as form
        const options: formidable.Options = {}
        const form = formidable(options)
        form.parse(req, (err, fields, files) => {
            if (err) {
                reject(err)
                return
            }

            const allowFieldObject = Object.keys(fields) // array of keys
                .filter((key) => kFields.includes(key)) // filter only allow keys
                .map((key) => {
                    return { [key]: fields[key][0] }
                }) // map to object [{...}]
                .reduce((acc, obj) => ({ ...acc, ...obj }), {}) // reduce from array to object

            const allowFileObject = files[kFile]

            resolve({
                file: allowFileObject,
                data: allowFieldObject,
            })
        })
    }) as any
}
