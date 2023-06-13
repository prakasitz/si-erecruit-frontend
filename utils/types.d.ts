export enum CandidateStatus {
    CREATED = 'Created',
    ACTIVE = 'Active',
    SUSPENDED = 'Suspended',
    CANCELLED = 'Cancelled',
    WAIVED = 'Waited',
    CLOSED = 'Closed',
}

export enum JobStatus {
    CREATED = 'Created',
    IMPORTING = 'Importing',
    FAIL_IMPORTED = 'Fail Imported',
    IMPORTED = 'Imported',
    PUBLISHED = 'Published',
    SUSPENDED = 'Suspended',
    VERIFYING = 'Verifying',
    APPROVED = 'Approved',
    CANCELLED = 'Cancelled',
    TERMINATED = 'Terminated',
    CLOSED = 'Closed',
}

export enum ProfileStatus {
    CREATED = 'Created',
    IMPORTED = 'Imported',
    PUBLISHABLE = 'Publishable',
    SUSPENDED = 'Suspended',
    SUBMITTED = 'Submitted',
    VERIFIED = 'Verified',
    WAIVED = 'Waived',
    CANCELLED = 'Cancelled',
}

export enum Roles {
    'SUPER_ADMIN',
    'ADMIN',
    'HR',
    'CANDIDATE',
}

export type Candidate = {
    id: string
    pid: string
    password: string
    first_name: string
    last_name: string
    is_active: boolean
    last_login: Date | null

    role: Roles.CANDIDATE
    created_at: Date
}

export type TalentLevel = '' | 'good' | 'fair' | 'other'
export type YesNo = '' | 'Y' | 'N'
export type Skill = {
    label: 'พูด' | 'อ่าน' | 'เขียน'
    selected: TalentLevel
    others: string | ''
}

export type LanguageLevelOption = {
    label: 'ดี' | 'พอใช้' | 'อื่นๆ โปรดระบุ'
    value: TalentLevel
}

export type JSONResponse = {
    status: 'success' | 'fail'
    data?: any
    error?: any
}

export type TokensSession = {
    accessToken: string
    refreshToken: string
    sid?: string
}

export type MasterProvince = {
    province_code: string
    province_name: string
}

export type MasterTitleConferred = {
    name_affix: string,
    output_text: string
}


