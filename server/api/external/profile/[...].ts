import { profileService } from '../../../common/externalAPI/profiles.external'

import multer from 'multer'
import { callNodeListener } from 'h3'
import { Blob } from 'buffer'

// console.log('helloworld')
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         //for excel 2003 - 2019 file
//         if (
//             file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
//             file.mimetype == 'application/vnd.ms-excel'
//         ) {
//             cb(null, true)
//         } else {
//             cb(new Error('MIMETYPE_NOT_SUPPORT'))
//         }
//     },
// })

const router = createRouter()
router.post(
    '/import',
    defineEventHandler(async (event) => {
        try {
            // let filePaths: string[] = []
            // let fileNames: string[] = []
            // const storage = multer.diskStorage({
            //     destination: (req, file, cb) => {
            //         cb(null, 'public/assets/images')
            //     },
            //     filename: (req, file, cbd) => {
            //         const filePath = `${Date.now()}-${file.originalname
            //             .toLocaleLowerCase()
            //             .replace(/\s+/g, '-')
            //             .replace(/\./g, '-')}`
            //         filePaths.push(filePath)
            //         fileNames.push(file.originalname)
            //         cbd(null, filePath)
            //     },
            // })

            // const upload = multer({
            //     storage: storage,
            //     // fileFilter: (req, file, cb) => {
            //     //     if (
            //     //         file.mimetype == 'image/png' ||
            //     //         file.mimetype == 'image/jpeg' ||
            //     //         file.mimetype === 'image/webp'
            //     //     ) {
            //     //         cb(null, true)
            //     //     } else {
            //     //         cb(new Error('Invalid file type'))
            //     //     }
            //     // },
            // })

            // console.log(event.node.req)

            // function deepCopy(obj: any) {
            //     if (typeof obj !== 'object' || obj === null) {
            //         return obj
            //     }

            //     let copy = Array.isArray(obj) ? [] : {}

            //     Object.keys(obj).forEach((key) => {
            //         //@ts-expect-error
            //         copy[key] = deepCopy(obj[key])
            //     })
            //     return copy
            // }

            // const new_event = deepCopy(event)
            // const rawBody = (await readRawBody(event)) ?? ''
            // new_event.node.req.body = Buffer.from(rawBody, 'utf8').toLocaleString()

            const formDataString = (await readRawBody(event)) ?? ''
            const filenameRegex = /filename="([^"]+)"/
            const match = formDataString.match(filenameRegex)
            const filename = (match && match[1]) ?? 'unknown.xlsx'

            // return {
            //     headers: getRequestHeaders(event),
            //     filename: filename,
            //     formDataString: formDataString,
            // }

            const contentType = getRequestHeader(event, 'content-type')
            const contentLength = getRequestHeader(event, 'content-length')
            const h = { 'content-type': contentType, 'content-length': contentLength }

            const formMultipart = await readMultipartFormData(event)

            if (!formMultipart) return { req: '!formMultipart' }
            const bufferData = formMultipart[0].data
            const blob = new Blob([bufferData], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                encoding: 'utf-8',
            })

            // // const formData = await readMultipartFormData(event)
            // if (!formData || !formData[0].filename) return { req: 'helloworld' }
            // let filename = formData[0].filename?.toString()
            // const decode = decodeURIComponent(filename)
            // console.log(decode)
            // const contentType = getRequestHeader(event, 'content-type')
            // const contentLength = getRequestHeader(event, 'content-length')
            // const headers = { 'content-type': contentType, 'content-length': contentLength }
            const data = await profileService.import(event, {
                filename,
                blob,
                bufferData,
                formDataString,
                h,
                formMultipart,
            })

            // console.log(event.node.req)

            //// @ts-expect-error: Nuxt 3
            // await callNodeListener(upload.single('file'), event.node.req, event.node.res)
            // console.log(event.node.req)
            return data
        } catch (error) {
            console.log(error)
            return { req: 'helloworld' }
        }
    })
)

export default useBase('/api/external/profile', router.handler)
