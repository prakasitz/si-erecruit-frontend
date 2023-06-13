import { TalentLevel, YesNo } from '~/utils/types'

export interface IJobPosition {}

export interface IPersonalInfo {
    title_conferrend?: string
    title_academic?: string
    title_milirtary?: string
    title_spacial?: string

    title_name_th: string
    first_name_th: string
    last_name_th: string
    nickname_th: string

    title_name_en: string
    first_name_en: string
    last_name_en: string

    email_address: string
    birth_date: string
    province_when: string | null

    age_year: number | null
    age_month: number | null

    id_card_number: number
    id_card_amphur: string
    id_card_province: string | null
    id_card_issue_date: string
    id_card_expire_date: string

    height: number
    weight: number
    blood_type: string

    race: string
    nationality: string
    religion: string

    military_status: string
}

export interface IAddressInfo {
    reg_address: address
    cur_address: address
    emer_address: address

    cur_telephone?: string
    cur_mobile: string
}

export interface ILisence {
    license_number: string
    license_begin_date: string
    license_expire_date: string
}

export interface ISocailSecurityOfficeInfo {
    ss_have: boolean
    ss_same_number: boolean
    ss_card_number: number | null
    ss_card_issue_date: string
    ss_card_expire_date: string
    ss_card_hospital: string
    ss_card_province: string | null
}

export interface IBankingInfo {
    bank_account_name: string
    bank_account_number: string
}

export interface IParent {
    father: parent_info
    mother: parent_info

    mf_no_marriage?: string
    mf_date_of_marriage?: string
}

export interface IEducation {
    education_select: number
    education_list: education[]
}

export interface IJob {
    had_job: string
    had_job_list: job[]

    had_job_mahidol: string
    had_job_mahidol_detail: job_mahidol

    job_status: string // 1= กำลังทำงาน 2 = กำลังศึกษาต่อ 3 = ว่างงาน
    current_job: current_job
    current_education: current_education
    current_unemployee: {
        duration_y: number
        duration_m: number
        reason: string
    }
}

export interface IMarriage {
    status: string
    num_of_chlid: string
    children_list: children_info[]
    ref_person: ref_person
}

export interface ITax {
    num_of_child: number
    chlid_nonschool: number
    chlid_school: number
    chlid_endschool: number

    loan: string
    loan_amount: number
    insurance: string
    insurance_amount: number
    donate: string
    donate_amount: number
    fund: string
    fund_amount: number
    marriage_income: string //(1= มีรายได้ 2=คู่สมรสมีรายได้ ไม่ลดหย่อนบุตร 3=คู่สมรสมีรายได้ ลดหย่อนบุตร)
    marriage_insurance: string
    marriage_insurance_amount: number
    parent_support: string
    parent_support_amount: number
}

export interface address {
    id?: number
    address_no: string
    address_moo: string
    address_village: string
    address_soi: string
    address_road: string
    address_district: string
    address_city: string
    address_province: string | null
    address_postcode: string
}

export interface children_info {
    id: number
    title: string
    frist_name: string
    last_name: string
    id_card: string
    birth_date: string
    birth_province: string | null
    nationality: string | null
    ethnicity: string | null
    religion: string
    child_welfare: string
}
interface current_education {
    education_level: string
    school: string
    major: string
    graduate_date: string
}

interface current_job {
    job_type: string
    position_name: string
    duration_y: string
    duration_m: string
    company_name: string
    company_province: string | null
}

export interface education {
    id: number
    education_level: string
    degree: string
    major: string
    school: string
    gpa: string
    start_date: string
    graduate_date: string
}

export interface job {
    company_name: string
    position_name: string
    start_date: string
    still_doing: boolean
    end_date: string
    reason: string
    salary: string
}

export interface job_mahidol {
    department: string
    sap_type: string
    position_name: string
    salary: string
    start_date: string
    still_doing: boolean
    end_date: string
    reason: string
    got_compensation: YesNo
}

export interface parent_info {
    title_special: string | null
    title_name: string | null
    first_name: string
    last_name: string
    career: string
    id_card_number: string
    living: boolean
    race: string
    nationality: string
    religion: string
}

export interface ITalent {
    typing_th: number | null
    typing_en: number | null
    computer_programs: string

    eng_language_details: language

    language_test: number | null
    language_score: number | null

    other_language: string

    other_language_details: language

    sports: string

    driver_license: string

    other_talents: string

    specialization: string

    announced_from: string
}

export interface language {
    language_speak: TalentLevel
    txt_language_speak: string

    language_read: TalentLevel
    txt_language_read: string

    language_write: TalentLevel
    txt_language_write: string
}

interface ref_person {
    id: number
    title: string
    frist_name: string
    last_name: string
    relationship: string
    phone_number: string
    address_option: string
    address_detail: address
}
