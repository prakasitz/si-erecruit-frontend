import { IPersonalStore, children_info, education, job } from '../../utils/interface/personal_information.interface'
import { Profile } from '../../utils/types'

type ChildProfileData = {
    [key: string]: any // You can add specific types for known properties if needed
}

export function convertChildrenArrayToRawData(childrenList: children_info[]): ChildProfileData {
    const rawData: any = {}
    for (let i = 1; i <= 3; i++) {
        const childKey = `child${i}` as 'child1' | 'child2' | 'child3'
        let key = i - 1

        rawData[`${childKey}_title_name`] = childrenList[key]?.title || null
        rawData[`${childKey}_first_name`] = childrenList[key]?.first_name || null
        rawData[`${childKey}_last_name`] = childrenList[key]?.last_name || null
        rawData[`${childKey}_id_card_number`] = childrenList[key]?.id_card || null
        rawData[`${childKey}_birth_date`] = childrenList[key]?.birth_date || null
        rawData[`${childKey}_province`] = childrenList[key]?.birth_province || null
        rawData[`${childKey}_nationality`] = childrenList[key]?.nationality || null
        rawData[`txt_${childKey}_race`] = childrenList[key]?.race || null
        rawData[`${childKey}_race`] = childrenList[key]?.race || null
        rawData[`txt_${childKey}_religion`] = childrenList[key]?.religion || null
        rawData[`${childKey}_religion`] = childrenList[key]?.religion || null
        rawData[`${childKey}_welfare`] = childrenList[key]?.child_welfare || null

        // Uncomment and complete this part if needed
        // rawData[`${childKey}_legit_date`] = child.legit_date; || null
        // rawData[`${childKey}_legit_no`] = child.legit_no; || null
        // rawData[`${childKey}_bd_cert_date`] = child.bd_cert_date; || null
        // rawData[`${childKey}_bd_cert_no`] = child.bd_cert_no; || null
    }

    return rawData
}

export function convertEducationArrayToRawData(educationList: education[]): any {
    const rawData: any = {}
    for (let i = 1; i <= 4; i++) {
        const eduKey = `edu${i}` as 'edu1' | 'edu2' | 'edu3' | 'edu4'
        let key = i - 1

        rawData[`${eduKey}_level`] = educationList[key]?.education_level || null
        rawData[`${eduKey}_grade`] = educationList[key]?.gpa || null
        rawData[`${eduKey}_begin`] = educationList[key]?.start_date || null
        rawData[`${eduKey}_end`] = educationList[key]?.graduate_date || null
        rawData[`${eduKey}_qual`] = educationList[key]?.degree || null
        rawData[`${eduKey}_major`] = educationList[key]?.major || null
        rawData[`${eduKey}_aca`] = educationList[key]?.school || null
        rawData[`${eduKey}_major_txt`] = educationList[key]?.major_other || null
        rawData[`${eduKey}_aca_txt`] = educationList[key]?.school_other || null
    }

    return rawData
}

export function convertJobArrayToRawData(jobList: job[]): any {
    const rawData: any = {}
    //key and index
    for (let i = 1; i <= 4; i++) {
        const empKey = `emp${i}` as 'emp1' | 'emp2' | 'emp3' | 'emp4'
        let key = i - 1

        rawData[`${empKey}_place`] = jobList[key]?.company_name || null
        rawData[`${empKey}_pos`] = jobList[key]?.position_name || null
        rawData[`${empKey}_sal`] = jobList[key]?.salary || null
        rawData[`${empKey}_begin`] = jobList[key]?.start_date || null
        rawData[`${empKey}_present`] = jobList[key]?.still_doing || null
        rawData[`${empKey}_end`] = jobList[key]?.end_date || null
        rawData[`${empKey}_exit_reason`] = jobList[key]?.reason || null
    }

    return rawData
}

export function generateProfileJSON({
    job_position,
    personal_info,
    address,
    banking,
    license,
    ss,
    education,
    job,
    marriage,
    parent,
    talent,
    tax,
}: IPersonalStore): Profile {
    const profile: Profile | any = {
        //personal_info
        title_name_th: personal_info.title_name_th,
        title_name_en: personal_info.title_name_en,
        title_special: personal_info.title_special,
        title_academic: personal_info.title_academic,
        title_military: personal_info.title_military,
        title_conferred: personal_info.title_conferred,
        nameTH: personal_info.first_name_th,
        lastnameTH: personal_info.last_name_th,

        // nickname_th: personal_info.nickname_th,
        first_name_en: personal_info.first_name_en,
        last_name_en: personal_info.last_name_en,
        email_address: personal_info.email_address,
        birth_date: personal_info.birth_date,
        province_when: personal_info.province_when,
        age_year: personal_info.age_year,
        age_month: personal_info.age_month,
        id_card_number: personal_info.id_card_number,
        id_card_amphur: personal_info.id_card_amphur,
        id_card_province: personal_info.id_card_province,
        id_card_issue_date: personal_info.id_card_issue_date,
        id_card_expire_date: personal_info.id_card_expire_date,
        height: personal_info.height,
        weight: personal_info.weight,
        blood_type: personal_info.blood_type,
        race: personal_info.race,
        nationality: personal_info.nationality,
        religion: personal_info.religion,
        military: personal_info.military_status,

        //address
        cur_mobile: address.cur_mobile,
        cur_telephone: address.cur_telephone,
        cur_same_address: address.cur_same_address,
        urg_same_address: address.urg_same_address,

        //reg_address
        reg_amphur: address.reg_address.address_amphur,
        reg_district: address.reg_address.address_district,
        reg_country: address.reg_address.address_country,
        reg_moo: address.reg_address.address_moo,
        reg_address: address.reg_address.address_no,
        reg_postcode: address.reg_address.address_postcode,
        reg_province: address.reg_address.address_province,
        reg_road: address.reg_address.address_road,
        reg_soi: address.reg_address.address_soi,
        reg_village: address.reg_address.address_village,

        //cur_address
        cur_amphur: address.cur_address.address_amphur,
        cur_district: address.cur_address.address_district,
        cur_country: address.cur_address.address_country,
        cur_moo: address.cur_address.address_moo,
        cur_address: address.cur_address.address_no,
        cur_postcode: address.cur_address.address_postcode,
        cur_province: address.cur_address.address_province,
        cur_road: address.cur_address.address_road,
        cur_soi: address.cur_address.address_soi,
        cur_village: address.cur_address.address_village,

        //urg_address
        urg_amphur: address.urg_address.address_amphur,
        urg_district: address.urg_address.address_district,
        urg_country: address.urg_address.address_country,
        urg_moo: address.urg_address.address_moo,
        urg_address: address.urg_address.address_no,
        urg_postcode: address.urg_address.address_postcode,
        urg_province: address.urg_address.address_province,
        urg_road: address.urg_address.address_road,
        urg_soi: address.urg_address.address_soi,
        urg_village: address.urg_address.address_village,

        //license
        license_number: license.license_number,
        license_begin_date: license.license_begin_date,
        license_expire_date: license.license_expire_date,

        //ss
        ss_have: ss.ss_have,
        ss_same_number: ss.ss_same_number,
        ss_card_hospital: ss.ss_card_hospital,
        ss_card_number: ss.ss_card_number,
        ss_card_province: ss.ss_card_province,
        ss_card_issue_date: ss.ss_card_issue_date,
        ss_card_expire_date: ss.ss_card_expire_date,

        //banking
        bank_account_name: banking.bank_account_name,
        bank_account_number: banking.bank_account_number,

        //parent
        father_title_special: parent.father.title_special,
        father_title_name: parent.father.title_name,
        father_first_name: parent.father.first_name,
        father_last_name: parent.father.last_name,
        father_id_card_number: parent.father.id_card_number,
        father_career: parent.father.career,
        father_living: parent.father.living,
        father_nationality: parent.father.nationality,
        father_religion: parent.father.religion,
        father_race: parent.father.race,

        mother_title_special: parent.mother.title_special,
        mother_title_name: parent.mother.title_name,
        mother_first_name: parent.mother.first_name,
        mother_last_name: parent.mother.last_name,
        mother_id_card_number: parent.mother.id_card_number,
        mother_career: parent.mother.career,
        mother_living: parent.mother.living,
        mother_nationality: parent.mother.nationality,
        mother_religion: parent.mother.religion,
        mother_race: parent.mother.race,

        mf_date_of_marriage: parent.mf_date_of_marriage,
        mf_no_marriage: parent.mf_no_marriage,

        //marriage
        marital_status: marriage.status,

        // Titles
        mate_title_name: '',
        mate_title_special: '',
        mate_wish_title_name: '',
        mate_wish_last_name: '',

        mate_first_name: '',
        mate_last_name: '',
        mate_birth_date: '',
        mate_id_card_number: '',
        mate_nationality: '',
        mate_race: '',
        mate_religion: '',

        mate_date_of_marriage: '',
        mate_no_marriage: '',

        mate_career: '',

        mate_living: '',
        mate_death_date: '',
        mate_death_no: '',

        txt_mate_nationality: '',
        txt_mate_race: '',
        txt_mate_religion: '',

        number_of_children: marriage.num_of_chlid,
        //children_list
        ...convertChildrenArrayToRawData(marriage.children_list), // This is the function from the snippet above
        //ref_person
        ref_title_name: marriage.ref_person.title,
        ref_first_name: marriage.ref_person.first_name,
        ref_last_name: marriage.ref_person.last_name,
        ref_relationship: marriage.ref_person.relationship,
        ref_telephone: marriage.ref_person.telephone,

        ref_same_address: marriage.ref_person.ref_same_address,

        ref_amphur: marriage.ref_person.address_detail.address_amphur,
        ref_district: marriage.ref_person.address_detail.address_district,
        ref_moo: marriage.ref_person.address_detail.address_moo,
        ref_address: marriage.ref_person.address_detail.address_no,
        ref_postcode: marriage.ref_person.address_detail.address_postcode,
        ref_province: marriage.ref_person.address_detail.address_province,
        ref_road: marriage.ref_person.address_detail.address_road,
        ref_soi: marriage.ref_person.address_detail.address_soi,
        ref_village: marriage.ref_person.address_detail.address_village,

        //education
        //education_list
        ...convertEducationArrayToRawData(education.education_list), // This is the function from the snippet above

        //job
        chk_work_out: job.chk_work_out,
        chk_work_in: job.chk_work_in,
        cur_working: job.job_status,

        work_in_org: job.had_job_mahidol_detail.department,
        work_in_type: job.had_job_mahidol_detail.sap_type,
        work_in_pos: job.had_job_mahidol_detail.position_name,
        work_in_sal: job.had_job_mahidol_detail.salary,
        work_in_begin: job.had_job_mahidol_detail.start_date,
        work_in_present: job.had_job_mahidol_detail.still_doing,
        work_in_end: job.had_job_mahidol_detail.end_date,
        work_in_exit_reason: job.had_job_mahidol_detail.reason,
        work_in_com: job.had_job_mahidol_detail.got_compensation,

        cur_working_time: job.current_job.job_type,
        cur_working_pos: job.current_job.position_name,
        cur_working_place: job.current_job.company_name,
        cur_working_province: job.current_job.company_province,
        cur_working_year: job.current_job.duration_y,
        cur_working_month: job.current_job.duration_m,
        cur_working_sal: job.current_job.salary,

        studying_level: job.current_education.education_level,
        studying_major: job.current_education.major,
        studying_success: job.current_education.graduate_date,
        studying_academy: job.current_education.school,

        unemployed_year: job.current_unemployee.duration_y,
        unemployed_month: job.current_unemployee.duration_m,
        unemployed_reason: job.current_unemployee.reason,

        //job work_out list
        ...convertJobArrayToRawData(job.work_out_list), // This is the function from the snippet above
        //tax
        child_tax_amount: tax.num_of_child,
        child_amount_not_att_school: tax.chlid_nonschool,
        child_amount_studying: tax.chlid_school,
        child_amount_graduating: tax.chlid_endschool,
        loan: tax.loan,
        loan_baht: tax.loan_amount,
        insurance: tax.insurance,
        insurance_baht: tax.insurance_amount,
        donation: tax.donate,
        donation_baht: tax.donate_amount,
        fund: tax.fund,
        fund_baht: tax.fund_amount,
        money_at_spouse: tax.marriage_income,
        money_at_spouse_insurance: tax.marriage_insurance,
        money_at_spouse_insurance_baht: tax.marriage_insurance_amount,
        deductible_parents: tax.parent_support,
        //talent
        typing_th: talent.typing_th,
        typing_en: talent.typing_en,
        language_score: talent.language_score,
        language_test: talent.language_test,

        eng_read: talent.eng_language_details.language_read,
        eng_write: talent.eng_language_details.language_write,
        eng_speak: talent.eng_language_details.language_speak,
        txt_eng_read: talent.eng_language_details.txt_language_read,
        txt_eng_write: talent.eng_language_details.txt_language_write,
        txt_eng_speak: talent.eng_language_details.txt_language_speak,

        other_language: talent.other_language,
        other_language_read: talent.other_language_details.language_read,
        other_language_write: talent.other_language_details.language_write,
        other_language_speak: talent.other_language_details.language_speak,
        txt_other_language_read: talent.other_language_details.txt_language_read,
        txt_other_language_write: talent.other_language_details.txt_language_write,
        txt_other_language_speak: talent.other_language_details.txt_language_speak,

        computer_programs: talent.computer_programs,
        other_talents: talent.other_talents,
        specialization: talent.specialization,
        sports: talent.sports,
        driver_license: talent.driver_license,
        announced_from: talent.announced_from,
    }

    return profile
}
