import { callNodeListener, NodeMiddleware } from 'h3'
import * as fs from 'fs'
import * as formidable from 'formidable'
import * as path from 'path'
import { IncomingMessage, ServerResponse } from 'http'
import url from 'url'
import { dateToString } from '../../utils/date'
import * as bcrypt from 'bcrypt'

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

        const form = new formidable.IncomingForm()

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error occurred during form parsing:', err)
                res.statusCode = 500
                res.end('Internal Server Error')
                return
            }

            // Access the file using 'files.filetoupload'
            const uploadedFile = files.filetoupload as formidable.File
            //console.log('Uploaded file:', uploadedFile)

            // Continue with file upload processing
            // ...
            const fileList = [{ file: uploadedFile }]
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

async function uploadFile(userId: string, index: number, list: any): Promise<void> {
    const fileInput = list[index].file
    if (!fileInput) {
        console.error('No file input element found.')
        return
    }

    const file = fileInput
    console.log('file:', file)
    if (!file) {
        console.error('No file selected.')
        return
    }

    // If 'userId' is valid, create a directory with the userId as the destination
    const directory = `./upload/candidate-id-${userId}`
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
    }
    const now = new Date()
    // Construct the new file path
    const newFileName = `${dateToString(now.toString(), 'YYYYMMDD')}-${file[0].originalFilename}`
    const newPath = path.join(directory, newFileName)
    console.log(file[0].filepath)
    console.log(newPath)
    // Move the temporary file to the desired destination
    fs.copyFile(file[0].filepath, newPath, (err) => {
        if (err) {
            console.error('Error moving file:', err)
        } else {
            console.log('File uploaded successfully at destination ', newPath)
            deleteFileTemp(file[0].filepath)
        }
    })
    // console.log(file[0].filepath)
}

function deleteFileTemp(filePath: any) {
    fs.unlink(filePath, (error: any) => {
        if (error) {
            console.error('Error deleting file:', error)
            throw error
        } else {
            console.log('File deleted successfully:', filePath)
        }
    })
}
async function uploadFiles(userId: string, list: any[]): Promise<void> {
    for (let i = 0; i < list.length; i++) {
        try {
            await uploadFile(userId, i, list)
        } catch (error) {
            console.error('Error uploading file:', error)
            // Handle error case, e.g., show an error message
        }
    }
}
