import { callNodeListener, NodeMiddleware } from 'h3'
import * as fs from 'fs'
import * as formidable from 'formidable'
import * as path from 'path'
import { IncomingMessage, ServerResponse } from 'http'
import url from 'url'
import { dateToString } from '../../utils/date'
import * as bcrypt from 'bcrypt'
import { FileUploadHandler } from '../../utils/types'
import { DateFormatEnum } from '../../utils/enum'
import { trimAllSpace } from '../../utils/string'

export default defineEventHandler(async (event) => {
    try {
        await callNodeListener(handleFileUpload, event.node.req, event.node.res)
        return { success: true }
    } catch (e: any) {
        return createError({
            message: e.message,
            statusCode: 422,
            statusMessage: 'Unprocessable Entity',
        })
    }
})

const handleFileUpload = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        // Parse the URL to get query parameters
        const parsedUrl = url.parse(req.url || '', true)
        const userId: string | undefined = parsedUrl.query.userId?.toString()
        console.log('userId:', userId)

        if (!userId || isNaN(Number(userId))) {
            console.error('Invalid userId format on handleFileUpload')
            res.statusCode = 400
            res.end('Invalid userId format.')
            return
        }

        const form = new formidable.IncomingForm({
            multiples: false,
        })

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error occurred during form parsing:', err)
                res.statusCode = 500
                res.end('Internal Server Error')
                return
            }

            const uploadedFile = files.filetoupload as formidable.File[]

            const tag: string = fields.tag[0]
            const pid: string = fields.pid[0]

            console.log('💋 fields:', { pid: pid, tag: tag })

            // Continue with file upload processing
            const fileList: FileUploadHandler[] = [
                {
                    file: uploadedFile,
                    data: {
                        pid: pid,
                        tag: tag,
                    },
                },
            ]

            // Call the function to upload the files
            uploadFiles(userId, fileList)
                .then(() => {
                    console.log('All files uploaded successfully!')
                    res.statusCode = 200
                    res.end('File uploaded successfully.')
                    // Handle success case, e.g., show a success message
                })
                .catch((error) => {
                    console.error('Error occurred during file upload:', error)
                    // Handle error case, e.g., show an error message
                })

            // res.statusCode = 200
            // res.end('File uploaded successfully.')
        })
    } catch (error) {
        console.error('Error occurred during file upload:', error)
        res.statusCode = 500
        res.end('Internal Server Error')
    }
}

const uploadFiles = async (userId: string, list: any[]): Promise<void> => {
    for (let i = 0; i < list.length; i++) {
        try {
            console.log('🔵🔴 start upload file')
            await uploadFile(userId, i, list)
            console.log('🔵🔴 end upload file')
        } catch (error) {
            console.error('❌ Error uploading file:', error)
            // Handle error case, e.g., show an error message
        }
    }
}

const uploadFile = async (userId: string, index: number, list: FileUploadHandler[]): Promise<void> => {
    if (!list[index]) return

    const fileInput = list[index].file
    const { tag, pid } = list[index].data

    if (!fileInput || fileInput.length == 0) {
        console.error('🔴 No file input element found.')
        return
    }

    if (!tag || !pid) {
        console.error('🔴 No tag or pid found.')
        return
    }

    if (!fileInput[0].originalFilename) {
        console.error('🔴 No file name found.')
        return
    }

    // If 'userId' is valid, create a directory with the userId as the destination
    const directory = `./upload/${pid}/profile-${userId}`
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
    }

    // Construct the new file path
    const now = new Date()
    const cleanFileName = trimAllSpace(fileInput[0].originalFilename)
    const newFileName = `${tag}-${dateToString(now.toString(), DateFormatEnum.DATE_TIME_GENERAL_1)}-${cleanFileName}`
    const newPath = path.join(directory, newFileName)

    // Move the temporary file to the desired destination
    fs.copyFile(fileInput[0].filepath, newPath, (err) => {
        if (err) {
            console.error('❌ Error moving file:', err)
        } else {
            console.log('✅ File uploaded successfully at destination ', newPath)
            deleteFileTemp(fileInput[0].filepath)
        }
    })
}

const deleteFileTemp = (filePath: any): void => {
    console.log('🚕 Start Deleting file:', filePath)
    fs.unlink(filePath, (error: any) => {
        if (error) {
            console.error('🚕 End Error deleting file:', error)
            throw error
        } else {
            console.log('🚕 End File deleted successfully:', filePath)
        }
    })
}
