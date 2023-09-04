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

export enum CandidateStatus {
    CREATED = 'Created',
    ACTIVE = 'Active',
    SUSPENDED = 'Suspended',
    CANCELLED = 'Cancelled',
    WAIVED = 'Waived',
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

export enum RoleEnum {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    HR = 'HR',
    CANDIDATE = 'CANDIDATE',
}

export enum JobStatusColor {
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
