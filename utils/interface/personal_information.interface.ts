import { CompensationOption, HavingOption, MarriageIncomeOption, TalentLevel, YesNo } from '~/utils/types'

export interface IPersonalStore {
    job_position: any
    personal_info: IPersonalInfo
    address: IAddressInfo
    banking: IBankingInfo
    license: ILisence
    ss: ISocailSecurityOfficeInfo
    education: IEducation
    talent: ITalent
    job: IJob
    parent: IParent
    marriage: IMarriage
    tax: ITax
}

export interface IJobPosition {}

export interface IPersonalInfo {
    title_conferred?: string
    title_academic?: string
    title_military?: string
    title_special?: string

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
    /**
     * @value false, mean use cur_address as address
     * @value true, mean use reg_address as address
     */
    cur_same_address: boolean
    /**
     * @value false is reg_address
     * @value true is cur_address
     * @value null is use urg_address as address
     **/
    urg_same_address: boolean | null
    reg_address: address
    cur_address: address
    urg_address: address

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
    chk_work_out: '0' | '1'
    chk_work_in: '0' | '1'

    work_out_list: job[]

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
    mate_info: mate_info
    num_of_chlid: string
    children_list: children_info[]
    ref_person: ref_person
}

export interface ITax {
    num_of_child: number
    chlid_nonschool: number
    chlid_school: number
    chlid_endschool: number
    loan?: HavingOption | null
    loan_amount?: number | null
    insurance?: HavingOption | null
    insurance_amount?: number | null
    donate?: HavingOption | null
    donate_amount?: number | null
    fund?: HavingOption | null
    fund_amount?: number | null
    marriage_income?: MarriageIncomeOption | null
    marriage_insurance?: HavingOption | null
    marriage_insurance_amount?: number | null
    parent_support?: string | null
}

export interface address {
    id?: number
    address_no: string
    address_moo: string
    address_village: string
    address_soi: string
    address_road: string
    address_district: string
    address_amphur: string
    address_province: string | null
    address_postcode: string
    address_country: string
}

export interface mate_info {
    mate_title_name: string | null
    mate_title_special: string | null
    mate_wish_title_name: string | null
    mate_wish_last_name: string | null
    mate_first_name: string | null
    mate_last_name: string | null
    mate_birth_date: string | null
    mate_id_card_number: string | null
    mate_nationality: string | null
    mate_race: string | null
    mate_religion: string | null
    mate_date_of_marriage: string | null
    mate_no_marriage: string | null
    mate_career: string | null
    mate_living: string | null
    mate_death_date: string | null
    mate_death_no: string | null
    txt_mate_nationality: string | null
    txt_mate_race: string | null
    txt_mate_religion: string | null
}

export interface children_info {
    id?: number
    title: string
    first_name: string
    last_name: string
    id_card: string
    birth_date: string
    birth_province: string | null
    nationality: string | null
    race: string | null
    religion: string
    child_welfare: string
}
export interface current_education {
    education_level: string
    school: string
    major: string
    graduate_date: string
}

export interface current_job {
    job_type: string
    position_name: string
    salary: string
    duration_y: string
    duration_m: string
    company_name: string
    company_province: string | null
}

/**
 * @param education_level ระดับการศึกษา / Establishment
 * @param degree คุณวุฒิ/ปริญญา / Certificate
 * @param major สาขาวิชา /  Branch_of_Study
 * @param school สถานศึกษา / Institute
 */
export interface education {
    id?: number
    education_level: string
    degree: string
    major: string
    school: string
    major_other?: string
    school_other?: string
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
    got_compensation: CompensationOption | null
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
    language_speak: TalentLevel | null
    txt_language_speak: string | null

    language_read: TalentLevel | null
    txt_language_read: string | null

    language_write: TalentLevel | null
    txt_language_write: string | null
}

export interface ref_person {
    id: number
    title: string
    first_name: string
    last_name: string
    relationship: string
    telephone: string
    /**
     * @value false is reg_address
     * @value true is cur_address
     * @value null is use manual as address
     */
    ref_same_address: boolean | null
    address_detail: address
}
