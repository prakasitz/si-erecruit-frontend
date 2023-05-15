export interface IEducation {
    education_select: string
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


interface address {
    id: number
    address_no: string
    address_moo: string
    address_village: string
    address_soi: string
    address_road: string
    address_district: string
    address_city: string
    address_province: string
    address_postcode: string
}

interface children_info {
    id: number
    title: string
    frist_name: string
    last_name: string
    id_card: string
    birth_date: string
    birth_province: string
    nationality: string
    ethnicity: string
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
    company_province: string
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

interface job_mahidol {
    department: string
    sap_type: string
    position_name: string
    salary: string
    start_date: string
    still_doing: boolean
    end_date: string
    reason: string
    got_compensation: boolean
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