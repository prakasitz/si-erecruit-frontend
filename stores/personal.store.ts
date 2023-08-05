import {
    IAddressInfo,
    IBankingInfo,
    IEducation,
    IJob,
    ILisence,
    IMarriage,
    IParent,
    IPersonalInfo,
    ISocailSecurityOfficeInfo,
    ITalent,
    ITax,
    address,
    education,
    job,
    job_mahidol,
} from './interface/personal_information.interface'

import { Profile } from '~/utils/types'

import { defineStore } from 'pinia'

interface State {
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

export const usePersonalStore = defineStore('personal', {
    state: (): State => {
        return {
            job_position: {},
            personal_info: {
                title_name_th: '',
                first_name_th: '',
                last_name_th: '',
                nickname_th: '',
                title_name_en: '',
                first_name_en: '',
                last_name_en: '',
                email_address: '',
                birth_date: '',
                province_when: null,
                age_year: 0,
                age_month: 0,
                id_card_number: 0,
                id_card_amphur: '',
                id_card_province: null,
                id_card_issue_date: '',
                id_card_expire_date: '',
                height: 0,
                weight: 0,
                blood_type: '',
                race: '',
                nationality: '',
                religion: '',
                military_status: '',
            },
            address: {
                cur_same_address: false,
                urg_same_address: false,
                reg_address: {
                    address_no: '',
                    address_moo: '',
                    address_village: '',
                    address_soi: '',
                    address_road: '',
                    address_district: '',
                    address_city: '',
                    address_province: null,
                    address_postcode: '',
                    address_country: '',
                },
                cur_address: {
                    address_no: '',
                    address_moo: '',
                    address_village: '',
                    address_soi: '',
                    address_road: '',
                    address_district: '',
                    address_city: '',
                    address_province: null,
                    address_postcode: '',
                    address_country: '',
                },
                emer_address: {
                    address_no: '',
                    address_moo: '',
                    address_village: '',
                    address_soi: '',
                    address_road: '',
                    address_district: '',
                    address_city: '',
                    address_province: null,
                    address_postcode: '',
                    address_country: '',
                },
                cur_mobile: '',
            },
            license: {
                license_begin_date: '',
                license_expire_date: '',
                license_number: '',
            },
            ss: {
                ss_have: false,
                ss_card_expire_date: '',
                ss_card_hospital: '',
                ss_card_number: null,
                ss_card_issue_date: '',
                ss_card_province: null,
                ss_same_number: false,
            },
            banking: {
                bank_account_name: '',
                bank_account_number: '',
            },
            education: {
                education_select: 1,
                education_list: [
                    {
                        id: 0,
                        education_level: '',
                        degree: '',
                        major: '',
                        school: '',
                        gpa: '',
                        start_date: '',
                        graduate_date: '',
                    },
                ],
            },
            parent: {
                father: {
                    title_special: null,
                    title_name: null,
                    first_name: '',
                    last_name: '',
                    career: '',
                    id_card_number: '',
                    living: true,
                    race: '',
                    nationality: '',
                    religion: '',
                },
                mother: {
                    title_special: null,
                    title_name: null,
                    first_name: '',
                    last_name: '',
                    career: '',
                    id_card_number: '',
                    living: true,
                    race: '',
                    nationality: '',
                    religion: '',
                },
                mf_date_of_marriage: '',
                mf_no_marriage: '',
            },
            talent: {
                typing_th: null,
                typing_en: null,
                computer_programs: '',

                eng_language_details: {
                    language_read: '',
                    language_speak: '',
                    language_write: '',

                    txt_language_read: '',
                    txt_language_speak: '',
                    txt_language_write: '',
                },

                language_test: null,
                language_score: null,

                other_language: '',

                other_language_details: {
                    language_read: '',
                    language_speak: '',
                    language_write: '',

                    txt_language_read: '',
                    txt_language_speak: '',
                    txt_language_write: '',
                },

                sports: '',

                driver_license: '',

                other_talents: '',

                specialization: '',

                announced_from: '',
            },
            job: {
                had_job: '0',
                had_job_list: [
                    {
                        company_name: '',
                        end_date: '',
                        position_name: '',
                        reason: '',
                        salary: '',
                        still_doing: false,
                        start_date: '',
                    },
                ],

                had_job_mahidol: '0',
                had_job_mahidol_detail: {
                    department: '',
                    end_date: '',
                    got_compensation: null,
                    position_name: '',
                    reason: '',
                    salary: '',
                    sap_type: '',
                    start_date: '',
                    still_doing: false,
                },
                job_status: '',
                current_job: {
                    company_name: '',
                    company_province: null,
                    duration_m: '',
                    duration_y: '',
                    job_type: '',
                    salary: '',
                    position_name: '',
                },
                current_education: {
                    education_level: '',
                    graduate_date: '',
                    major: '',
                    school: '',
                },
                current_unemployee: {
                    duration_y: 0,
                    duration_m: 0,
                    reason: '',
                },
            },
            marriage: {
                status: '',
                num_of_chlid: '0',
                children_list: [],
                ref_person: {
                    address_detail: {
                        address_city: '',
                        address_district: '',
                        address_moo: '',
                        address_no: '',
                        address_postcode: '',
                        address_province: null,
                        address_road: '',
                        address_soi: '',
                        address_village: '',
                        address_country: '',
                        id: 0,
                    },
                    ref_same_address: null,
                    frist_name: '',
                    last_name: '',
                    phone_number: '',
                    relationship: '',
                    title: '',
                    id: 0,
                },
            },
            tax: {
                chlid_endschool: 0,
                chlid_nonschool: 0,
                chlid_school: 0,
                num_of_child: 0,
                donate: null,
                donate_amount: null,
                fund: null,
                fund_amount: null,
                insurance: null,
                insurance_amount: null,
                loan: null,
                loan_amount: null,
                marriage_income: null,
                marriage_insurance: null,
                marriage_insurance_amount: null,
                parent_support: null,
            },
        }
    },
    getters: {
        HasJob: ({ job }): boolean => job.had_job == '1',
        IsWorking: ({ job }): boolean => job.job_status == 'กำลังทำงาน',
        IsStudying: ({ job }): boolean => job.job_status == 'กำลังศึกษาต่อ',
        IsUnemployed: ({ job }): boolean => job.job_status == 'ว่างงาน',
        IsHasJobMahidol: ({ job }): boolean => job.had_job_mahidol == '1',
        curIsRegAddress: ({ address }): boolean => address.cur_same_address == true,
        emerIsRegAddress: ({ address }): boolean => address.urg_same_address == false,
        emerIsCurAddress: ({ address }): boolean => address.urg_same_address == true,
        calAge: ({ personal_info }): { years: number; months: number } => {
            if (!personal_info.birth_date) {
                return { years: 0, months: 0 }
            }

            let today = new Date()
            let birthDate = new Date(personal_info.birth_date)

            let years = today.getFullYear() - birthDate.getFullYear()
            let months = today.getMonth() - birthDate.getMonth()

            if (months < 0) {
                years--
                months += 12
            }

            return { years, months }
        },
    },
    actions: {
        setBirthDate(birth_date: string) {
            this.personal_info.birth_date = birth_date
            this.setAge()
        },
        setDefaultChildList() {
            this.$patch({
                marriage: {
                    ...this.marriage,
                    ...deepCopy(defaultChildrenInfo),
                },
            })
        },
        setAge() {
            const { years, months } = this.calAge
            this.personal_info.age_year = years
            this.personal_info.age_month = months
        },
        removeJobList(index: number) {
            index -= 1
            this.job.had_job_list.splice(index, 1)
        },
        removeEducationList(index: number) {
            index -= 1
            this.education.education_list.splice(index, 1)
        },
        useRegAddressOnCurAddress() {
            this.address.cur_address = deepCopy(this.address.reg_address)
        },
        useRegAddressOnEmerAddress() {
            this.address.emer_address = deepCopy(this.address.reg_address)
        },
        useRegAddressOnRefAddress() {
            this.marriage.ref_person.address_detail = deepCopy(this.address.reg_address)
        },
        useCurAddressOnEmerAddress() {
            this.address.emer_address = deepCopy(this.address.cur_address)
        },
        useCurAddressOnRefAddress() {
            this.marriage.ref_person.address_detail = deepCopy(this.address.cur_address)
        },

        mapEducationList(rawData: Profile) {
            const education_list = [] as education[]
            for (let i = 1; i <= 4; i++) {
                let edu = `edu${i}` as 'edu1' | 'edu2' | 'edu3' | 'edu4'
                const educationObj: education = {
                    education_level: rawData[`${edu}_level`],
                    major: rawData[`${edu}_major`],
                    degree: rawData[`${edu}_qual`],
                    school: rawData[`${edu}_aca`],
                    gpa: rawData[`${edu}_grade`],
                    start_date: rawData[`${edu}_begin`],
                    graduate_date: rawData[`${edu}_end`],
                }

                if (checkObjectPropertiesNull(educationObj)) break

                educationObj.id = i
                education_list.push(educationObj)
            }
            return education_list
        },
        mapJobList(rawData: Profile) {
            const job_list = [] as job[]
            for (let i = 1; i <= 4; i++) {
                let emp = `emp${i}` as 'emp1' | 'emp2' | 'emp3' | 'emp4'
                const jobObj: job = {
                    company_name: rawData[`${emp}_place`],
                    position_name: rawData[`${emp}_pos`],
                    salary: rawData[`${emp}_sal`],
                    start_date: rawData[`${emp}_begin`],
                    still_doing: rawData[`${emp}_present`],
                    end_date: rawData[`${emp}_end`],
                    reason: rawData[`${emp}_exit_reason`],
                }
                if (checkObjectPropertiesNull(jobObj)) break

                job_list.push(jobObj)
            }
            console.log("job_list", job_list)
            return job_list
        },
    },
})
