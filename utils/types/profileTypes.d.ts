import { ProfileStatusColorEnum, ProfileStatusEnum } from '../enum'
import { Job } from './jobTypes'

export type ProfileStatus = `${ProfileStatusEnum}`
export type ProfileStatusColor = `${ProfileStatusColorEnum}`

export type ProfileStatusCode = {
    profile_status_code: number
    profile_status_text: `${ProfileStatus}`
    zprofile_status_color: `${ProfileStatusColor}`
}


export interface Profilez extends Profile {
    profile_status_code?: ProfileStatusCode
}

export type Profile = {
    profile_ID: any // 3832,
    job_ID: any // 1350,
    profile_status: any // 1,
    register_id: any // null,
    register_date_first: any // null,
    register_last_update: any // null,
    register_send_date: any // null,
    announced_from: any // null,
    position_id: any // null,
    position_name: any // null,
    org_unit_m: any // null,
    org_unit_desc: any // null,
    EE_Group: any // null,
    EE_Group_Descr: any // null,
    EE_Subgroup: any // null,
    EE_Subgroup_Descr: any // null,
    employment_type: any // null,
    time_of_work: any // null,
    check_in: any // null,
    check_out: any // null,
    position_doctor: any // null,
    position_train: any // null,
    train_begin_date: any // null,
    train_end_date: any // null,
    hospital: any // null,
    title_special: any // null,
    title_conferred: any // null,
    title_academic: any // null,
    title_military: any // null,
    title_name_th: any // "3",
    nameTH: any // "ฐิตินันท์",
    lastnameTH: any // "จันทร์ทิพย์",
    title_name_en: any // "Miss",
    first_name_en: any // "Thitinun",
    last_name_en: any // "Juntip",
    email_address: any // "Thitinun.jtp@gmail.com",
    birth_date: any // "2001-01-28",
    age_year: any // null,
    age_month: any // null,
    province_when: any // "7",
    id_card_amphur: any // null,
    id_card_province: any // null,
    id_card_number: any // "1589900116261",
    id_card_issue_date: any // null,
    id_card_expire_date: any // "2028-01-28",
    height: any // null,
    weight: any // null,
    blood_type: any // null,
    race: any // null,
    txt_race: any // null,
    nationality: any // null,
    txt_nationality: any // null,
    religion: any // null,
    txt_religion: any // null,
    txt_military_year_1: any // null,
    txt_military_year_2: any // null,
    military: any // null,
    txt_military: any // null,
    reg_address: any // null,
    reg_moo: any // null,
    reg_village: any // null,
    reg_soi: any // null,
    reg_road: any // null,
    reg_district: any // null,
    reg_amphur: any // null,
    reg_province: any // null,
    reg_postcode: any // null,
    reg_country: any // null,
    cur_same_address: any // null,
    cur_address: any // null,
    cur_moo: any // null,
    cur_village: any // null,
    cur_soi: any // null,
    cur_road: any // null,
    cur_district: any // null,
    cur_amphur: any // null,
    cur_province: any // null,
    cur_postcode: any // null,
    cur_country: any // null,
    urg_same_address: any // null,
    urg_address: any // null,
    urg_moo: any // null,
    urg_village: any // null,
    urg_soi: any // null,
    urg_road: any // null,
    urg_district: any // null,
    urg_amphur: any // null,
    urg_province: any // null,
    urg_postcode: any // null,
    urg_country: any // null,
    cur_telephone: any // null,
    cur_mobile: any // "0890013095",
    license_number: any // null,
    license_begin_date: any // null,
    license_expire_date: any // null,
    ss_have: any // null,
    ss_same_number: any // null,
    ss_card_number: any // null,
    ss_card_issue_date: any // null,
    ss_card_expire_date: any // null,
    ss_card_hospital: any // null,
    ss_card_province: any // null,
    bank_account_name: any // null,
    bank_account_number: any // null,
    father_title_special: any // null,
    father_title_name: any // null,
    father_first_name: any // "สมคิด",
    father_last_name: any // "จันทร์ทิพย์",
    father_living: any // null,
    father_death_date: any // null,
    father_death_no: any // null,
    father_career: any // null,
    father_id_card_number: any // null,
    father_race: any // null,
    txt_father_race: any // null,
    father_nationality: any // null,
    txt_father_nationality: any // null,
    father_religion: any // null,
    txt_father_religion: any // null,
    mother_title_special: any // null,
    mother_title_name: any // null,
    mother_first_name: any // "เข็มทอง",
    mother_last_name: any // "จันทร์ทิพย์",
    mother_living: any // null,
    mother_death_date: any // null,
    mother_death_no: any // null,
    mother_career: any // null,
    mother_id_card_number: any // null,
    mother_race: any // null,
    txt_mother_race: any // null,
    mother_nationality: any // null,
    txt_mother_nationality: any // null,
    mother_religion: any // null,
    txt_mother_religion: any // null,
    mf_no_marriage: any // null,
    mf_date_of_marriage: any // null,
    marital_status: any // "1",
    txt_marital_status: any // null,
    mate_title_special: any // null,
    mate_title_name: any // null,
    mate_first_name: any // null,
    mate_last_name: any // null,
    mate_birth_date: any // null,
    mate_id_card_number: any // null,
    mate_living: any // null,
    mate_death_date: any // null,
    mate_death_no: any // null,
    mate_race: any // null,
    txt_mate_race: any // null,
    mate_nationality: any // null,
    txt_mate_nationality: any // null,
    mate_religion: any // null,
    txt_mate_religion: any // null,
    mate_career: any // null,
    mate_no_marriage: any // null,
    mate_date_of_marriage: any // null,
    mate_wish_title_name: any // null,
    mate_wish_last_name: any // null,
    number_of_children: any // null,
    child1_title_name: any // null,
    child1_first_name: any // null,
    child1_last_name: any // null,
    child1_birth_date: any // null,
    child1_province: any // null,
    child1_id_card_number: any // null,
    child1_race: any // null,
    txt_child1_race: any // null,
    child1_nationality: any // null,
    txt_child1_nationality: any // null,
    child1_religion: any // null,
    txt_child1_religion: any // null,
    child1_welfare: any // null,
    child1_legit_date: any // null,
    child1_legit_no: any // null,
    child1_bd_cert_date: any // null,
    child1_bd_cert_no: any // null,
    child2_title_name: any // null,
    child2_first_name: any // null,
    child2_last_name: any // null,
    child2_birth_date: any // null,
    child2_province: any // null,
    child2_id_card_number: any // null,
    child2_race: any // null,
    txt_child2_race: any // null,
    child2_nationality: any // null,
    txt_child2_nationality: any // null,
    child2_religion: any // null,
    txt_child2_religion: any // null,
    child2_welfare: any // null,
    child2_legit_date: any // null,
    child2_legit_no: any // null,
    child2_bd_cert_date: any // null,
    child2_bd_cert_no: any // null,
    child3_title_name: any // null,
    child3_first_name: any // null,
    child3_last_name: any // null,
    child3_birth_date: any // null,
    child3_province: any // null,
    child3_id_card_number: any // null,
    child3_race: any // null,
    txt_child3_race: any // null,
    child3_nationality: any // null,
    txt_child3_nationality: any // null,
    child3_religion: any // null,
    txt_child3_religion: any // null,
    child3_welfare: any // null,
    child3_legit_date: any // null,
    child3_legit_no: any // null,
    child3_bd_cert_date: any // null,
    child3_bd_cert_no: any // null,
    ref_title_name: any // null,
    ref_first_name: any // null,
    ref_last_name: any // null,
    ref_same_address: any // null,
    ref_address: any // null,
    ref_moo: any // null,
    ref_village: any // null,
    ref_soi: any // null,
    ref_road: any // null,
    ref_district: any // null,
    ref_amphur: any // null,
    ref_province: any // null,
    ref_postcode: any // null,
    ref_telephone: any // null,
    ref_relationship: any // null,
    have_edu: any // null,
    edu1_qual_MU: any // null,
    edu1_major_MU: any // null,
    edu1_aca_MU: any // null,
    edu1_level: any // null,
    edu1_qual: any // null,
    edu1_fac: any // null,
    edu1_major: any // null,
    edu1_major_txt: any // null,
    edu1_aca: any // null,
    edu1_aca_txt: any // null,
    edu1_grade: any // null,
    edu1_begin: any // null,
    edu1_end: any // null,
    edu1_cer_first: any // null,
    edu2_qual_MU: any // null,
    edu2_major_MU: any // null,
    edu2_aca_MU: any // null,
    edu2_level: any // null,
    edu2_qual: any // null,
    edu2_fac: any // null,
    edu2_major: any // null,
    edu2_major_txt: any // null,
    edu2_aca: any // null,
    edu2_aca_txt: any // null,
    edu2_grade: any // null,
    edu2_begin: any // null,
    edu2_end: any // null,
    edu2_cer_first: any // null,
    edu3_qual_MU: any // null,
    edu3_major_MU: any // null,
    edu3_aca_MU: any // null,
    edu3_level: any // null,
    edu3_qual: any // null,
    edu3_fac: any // null,
    edu3_major: any // null,
    edu3_major_txt: any // null,
    edu3_aca: any // null,
    edu3_aca_txt: any // null,
    edu3_grade: any // null,
    edu3_begin: any // null,
    edu3_end: any // null,
    edu3_cer_first: any // null,
    edu4_level: any // null,
    edu4_qual: any // null,
    edu4_fac: any // null,
    edu4_major: any // null,
    edu4_major_txt: any // null,
    edu4_aca: any // null,
    edu4_aca_txt: any // null,
    edu4_grade: any // null,
    edu4_begin: any // null,
    edu4_end: any // null,
    edu4_cer_first: any // null,
    chk_work_out: any // null,
    have_emp: any // null,
    emp1_place: any // null,
    emp1_pos: any // null,
    emp1_sal: any // null,
    emp1_begin: any // null,
    emp1_present: any // null,
    emp1_end: any // null,
    emp1_exit_reason: any // null,
    emp2_place: any // null,
    emp2_pos: any // null,
    emp2_sal: any // null,
    emp2_begin: any // null,
    emp2_present: any // null,
    emp2_end: any // null,
    emp2_exit_reason: any // null,
    emp3_place: any // null,
    emp3_pos: any // null,
    emp3_sal: any // null,
    emp3_begin: any // null,
    emp3_present: any // null,
    emp3_end: any // null,
    emp3_exit_reason: any // null,
    emp4_place: any // null,
    emp4_pos: any // null,
    emp4_sal: any // null,
    emp4_begin: any // null,
    emp4_present: any // null,
    emp4_end: any // null,
    emp4_exit_reason: any // null,
    chk_work_in: any // "1",
    work_in_org: any // null,
    work_in_type: any // null,
    work_in_pos: any // null,
    work_in_sal: any // null,
    work_in_begin: any // null,
    work_in_present: any // null,
    work_in_end: any // null,
    work_in_exit_reason: any // null,
    work_in_com: any // null,
    cur_working: any // null,
    cur_working_time: any // null,
    cur_working_pos: any // null,
    cur_working_sal: any // null,
    cur_working_year: any // null,
    cur_working_month: any // null,
    cur_working_place: any // null,
    cur_working_province: any // null,
    studying_level: any // null,
    studying_academy: any // null,
    studying_major: any // null,
    studying_success: any // null,
    unemployed_year: any // null,
    unemployed_month: any // null,
    unemployed_reason: any // null,
    child_tax: any // null,
    child_tax_amount: any // null,
    child_amount_not_att_school: any // null,
    child_amount_studying: any // null,
    child_amount_graduating: any // null,
    loan: any // null,
    loan_baht: any // null,
    insurance: any // null,
    insurance_baht: any // null,
    donation: any // null,
    donation_baht: any // null,
    fund: any // null,
    fund_baht: any // null,
    money_at_spouse: any // null,
    money_at_spouse_insurance: any // null,
    money_at_spouse_insurance_baht: any // null,
    deductible_parents: any // null,
    typing_th: any // null,
    typing_en: any // null,
    computer_programs: any // "Microsoft word, Microsoft powerpoint, Microsoft excel, Spss",
    eng_speak: any // null,
    txt_eng_speak: any // null,
    eng_read: any // null,
    txt_eng_read: any // null,
    eng_write: any // null,
    txt_eng_write: any // null,
    language_test: any // null,
    language_score: any // null,
    other_language: any // null,
    other_language_speak: any // null,
    txt_other_language_speak: any // null,
    other_language_read: any // null,
    txt_other_language_read: any // null,
    other_language_write: any // null,
    txt_other_language_write: any // null,
    sports: any // null,
    driver_license: any // null,
    other_talents: any // null,
    specialization: any // null,
    spec_org_name: any // null,
    entry_date: any // null,
    contract_end_date: any // null,
    pers_area: any // null,
    sub_area: any // null,
    fund_1: any // null,
    func_area: any // null,
    salary: any // null,
    announced_no: any // null,
    announced_year: any // null,
    announced_date: any // null,
    PDPA_consent_granted: any // null,
    PDPA_consent_date: any // null,
    foreigner_status: any // null,
    employee_type: any // null
}