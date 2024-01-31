import * as formidable from 'formidable'

export type JSONResponse = {
    status: 'success' | 'fail'
    data?: any
    error?: any
}

export type FileUpload = {
    size: number
    filepath: string
    newFilename: string
    mimetype: string
    mtime: string
    originalFilename: string
}

export type FileUploadHandler = {
    file: formidable.File[]
    data: {
        tag: string
        pid: string
    }
}

export type AttachFile = {
    menu: string
    tag: string
    sub_menu?: string[]
    filename: string
    file: File | undefined
    uploading: boolean
    uploaded: boolean
}
