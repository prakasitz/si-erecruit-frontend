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

export enum RoleEnum {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    HR = 'HR',
    CANDIDATE = 'CANDIDATE',
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
    CANCLE_OR_WAIVE = 'CANCLE_OR_WAIVE',
    ACTIVE = 'ACTIVE',
    PUBLISHABLE = 'PUBLISHABLE',
    SUSPEND = 'SUSPEND',
    VERIFY = 'VERIFY',
    VERIFYED = 'VERIFYED',
    DELETE = 'DELETE',
}
