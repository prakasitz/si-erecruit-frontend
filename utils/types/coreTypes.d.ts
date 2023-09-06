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
