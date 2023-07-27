import multer from 'multer'

export default function usePreviewFiles() {
    return {
        previewFile,
        handlePreview,
        uploadFile,
    }
}

function previewFile(file: File | null): string | null {
    if (!file) {
        console.error('No file selected.')
        return null
    }
    //normally here will create blob url: if the data already linked to server just
    //send the data from the browser to a server and have the server
    //make it available like an ordinary file.

    //this is method to fetch data from users browser's memory to show file in blob url
    const fileData = new Blob([file], { type: 'application/pdf' })
    const urlCreate = URL.createObjectURL(fileData)
    return urlCreate
}

function handlePreview(fileInput: File | null): void {
    const url = previewFile(fileInput)
    if (url) {
        window.open(url, '_blank')
    }
}

// async function uploadFile(fileInput: HTMLInputElement | null): Promise<void> {
async function uploadFile(index: number, list: any): Promise<void> {
    const fileInput = list[index].file
    if (!fileInput) {
        console.error('No file input element found.')
        return
    }

    // const file = fileInput.files?.[0];
    const file = fileInput

    if (!file) {
        console.error('No file selected.')
        return
    }

    const formData = new FormData()
    formData.append('filetoupload', file)

    try {
        const response = await fetch('/api/fileupload?userId=10452774', {
            method: 'POST',
            body: formData,
        })

        if (response.ok) {
            console.log('File uploaded successfully!')
            // Handle success case, e.g., show a success message
        } else {
            console.error('File upload failed:', response.statusText)
            // Handle error case, e.g., show an error message
        }
    } catch (error) {
        console.error('Error occurred during file upload:', error)
        // Handle error case, e.g., show an error message
    }
}
