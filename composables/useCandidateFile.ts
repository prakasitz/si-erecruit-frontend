import { useUserStore } from '~/stores/user.store'
import { AttachFile, CandidateFileDetail, DialogContext } from '~/utils/types'

export default function useCandidateFile() {
    return {
        previewFile,
        handlePreview,
        uploadFile,
        downloadFile,
        deleteFile,
        getDetails,
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

async function uploadFile(index: number, list: AttachFile[]) {
    console.log('🔐 upload file', { index, list })
    const { commonname: pid, commonid: profileId } = useUserStore()
    const { file: fileInput, tag } = list[index]

    if (!profileId) throw new Error('Profile id not found.')
    if (!pid) throw new Error('User pid not found.')
    if (!fileInput) throw new Error('No file selected.')

    const formData = new FormData()
    formData.append('tag', tag)
    formData.append('pid', pid)
    formData.append('filetoupload', fileInput)

    return useApi(`/external/candidate/file/upload?profileId=${profileId}`, {
        method: 'POST',
        key: 'CandidateFileUpload',
        body: formData,
    })
}

function downloadFile(path: string) {
    const { commonid: profileId } = useUserStore()
    if (!profileId) throw new Error('Profile id not found.')
    const appBaseURL = useRuntimeConfig().app.baseURL
    window.open(`${appBaseURL}api/external/candidate/file/download/${path}?profileId=${profileId}`, '_blank')
}

async function deleteFile(
    event: any,
    { tag, refreshDataCallBack }: { tag: string; refreshDataCallBack: () => Promise<void> }
): Promise<DialogContext.BtnActionCallBack> {
    const { commonname: pid, commonid: profileId } = useUserStore()
    if (!profileId) throw new Error('Profile id not found.')
    if (!pid) throw new Error('User pid not found.')
    const { data, error } = await useApi(`/external/candidate/file/delete/?profileId=${profileId}`, {
        headers: {
            Accept: 'application/json',
        },
        key: 'CandidateFileDelete',
        method: 'DELETE',
        body: { pid, profileId, tag },
    })
    if (error.value) {
        return {
            status: false,
            message: `ลบไฟล์ไม่สำเร็จ, <br>
                        <pre>${error.value.data.message ?? error.value.message}</pre>`,
        }
    }
    refreshDataCallBack()
    return {
        status: true,
        message: `ลบไฟล์สำเร็จ`,
    }
}

async function getDetails() {
    const { commonid: profileId } = useUserStore()
    if (!profileId) throw new Error('Profile id not found.')
    return useApi<CandidateFileDetail>(`/external/candidate/file/detail/${profileId}`, {
        headers: {
            Accept: 'application/json',
        },
        key: 'CandidateFileDetails',
        method: 'GET',
    })
}
