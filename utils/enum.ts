export enum ProfileStatusEnum {
    CREATED = 'Created',
    IMPORTED = 'Imported',
    PUBLISHABLE = 'Publishable',
    SUSPENDED = 'Suspended',
    SUBMITTED = 'Submitted',
    VERIFIED = 'Verified',
    WAIVED = 'Waived',
    CANCELLED = 'Cancelled',
    CLOSED = 'Closed',
}

export enum CandidateStatusEnum {
    CREATED = 'Created',
    ACTIVE = 'Active',
    SUSPENDED = 'Suspended',
    CANCELLED = 'Cancelled',
    WAIVED = 'Waived',
    CLOSED = 'Closed',
}

export enum EXPORT_TYPE {
    JSON = 'json',
    EXCEL = 'excel',
    CSV = 'csv',
}

export enum JobStatusEnum {
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

export enum SRC_RoleEnum {
    SUPER_ADMIN = 'SUPER_ADMIN',
    GENERAL_ADMIN = 'ADMIN',
    HR_OFFICER = 'HR',
    DEPARTMENT_OFFICER = 'DP',
    CANDIDATE = 'CANDIDATE',
}

export enum BtnNameOnJobEnum {
    HEADER_JOB = 'header',
    DELETE_JOB = 'delete',
    PUBLISH_JOB = 'publish',
    REPUBLISH_JOB = 'republish',
    CANCELL_JOB = 'ยกเลิกงาน',
    SUSPEND_JOB = 'suspend',
    VERIFY_JOB = 'verify',
    APPROVE_JOB = 'approve',
    TERMINAT_JOB = 'terminate',
    DMS_JOB = 'dms (ยังไม่ทำ)',

    EXPORT_PROFILE = 'export',
    SUSPEND_PROFILE = 'suspend',
    PUBLISHABLE_PROFILE = 'publishable',
    SEND_SAP_PROFILE = 'send sap (ยังไม่ทำ)',
}

export enum JobStatusColorEnum {
    CREATED = 'label-light-info',
    IMPORTING = 'label-light-megna',
    FAIL_IMPORTED = 'label-red',
    IMPORTED = 'label-megna',
    PUBLISHED = 'label-success',
    SUSPENDED = 'label-warning',
    VERIFYING = 'label-light-warning',
    APPROVED = 'label-primary',
    CANCELLED = 'label-light-danger',
    TERMINATED = 'label-danger',
    CLOSED = 'label-inverse',
}

export enum ProfileStatusColorEnum {
    CREATED = 'label-info',
    IMPORTED = 'label-megna',
    PUBLISHABLE = 'label-success',
    SUSPENDED = 'label-danger',
    SUBMITTED = 'label-light-success',
    VERIFIED = 'label-light-megna',
    WAIVED = 'label-warning',
    CANCELLED = 'label-red',
    CLOSED = 'label-light-inverse',
}

export enum DateFormatEnum {
    DATE_TIME_BUDDHIST_1 = 'DD MMM BBBB, HH:mm',
    DATE_TIME_GENERAL = 'DD/MMM/YYYY HH:mm',
    DATE_ONLY = 'DD/MM/YYYY',
    DATE_ONLY_BUDDHIST = 'DD/MM/BBBB',
    TIME_ONLY_12_HOUR = 'h:mm A',
    TIME_ONLY_24_HOUR = 'HH:mm',
    MONTH_YEAR = 'MMMM YYYY',
    MONTH_DAY_YEAR = 'MMMM DD, YYYY',
    DAY_MONTH_YEAR = 'DD MMMM YYYY',
}

export enum QuickActionEnum {
    VIEW = 'View',
    CANCEL = 'Cancel',
    WAIVE = 'Waive',
    PUBLISHABLE = 'Publishable',
    SUSPEND = 'Suspend',
    VERIFY = 'Verify',
    VERIFYED = 'Verifed',
    DELETE = 'Delete',
    S_CANCEL_OR_WAIVE = 'Cancel Or Waive',
    S_PUBLISHABLE_OR_SUSPEND = 'Publishable Or Suspend',
}
