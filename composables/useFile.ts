import { useUserStore } from '~/stores/user.store'
import { AttachFile } from '~/utils/types'

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
async function uploadFile(index: number, list: AttachFile[]) {
    console.log('🔐 upload file', { index, list })
    const { commonname: pid, commonid: userId } = useUserStore()
    const fileInput = list[index].file
    const tag = list[index].tag

    console.log({ pid, tag })

    if (!userId) throw new Error('User id not found.')
    if (!pid) throw new Error('User pid not found.')
    if (!fileInput) throw new Error('No file selected.')

    const file = fileInput
    if (!file) throw new Error('No file selected.')

    const formData = new FormData()
    formData.append('tag', tag)
    formData.append('pid', pid)
    formData.append('filetoupload', file)
    return useApi(`/fileupload?userId=${userId}`, {
        method: 'POST',
        body: formData,
    })
}
