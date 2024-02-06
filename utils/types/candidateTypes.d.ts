export type CandidateFileDetail = {
    pid: number
    profileId: number
    submitStatus: string
    submitDate: string
    files: CandidateFile[]
}

export type CandidateFile = {
    tag: string
    fileName: string
    path: string
    changeCount: number
    createdDate: string
    lastChangeDate: string
}
