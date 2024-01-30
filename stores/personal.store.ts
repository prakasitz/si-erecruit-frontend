import { Profile, IPersonalStore, children_info, education, job } from '../utils/types'
import { checkObjectPropertiesNull, deepCopy } from '../utils/object'
import { defineStore } from 'pinia'

export const usePersonalStore = defineStore('personal', {
    state: (): IPersonalStore => {
        return {
            register_last_update: '',
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
                    address_amphur: '',
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
                    address_amphur: '',
                    address_province: null,
                    address_postcode: '',
                    address_country: '',
                },
                urg_address: {
                    address_no: '',
                    address_moo: '',
                    address_village: '',
                    address_soi: '',
                    address_road: '',
                    address_district: '',
                    address_amphur: '',
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
                        major_other: '',
                        school_other: '',
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
                    language_read: null,
                    language_speak: null,
                    language_write: null,

                    txt_language_read: null,
                    txt_language_speak: null,
                    txt_language_write: null,
                },

                language_test: null,
                language_score: null,

                other_language: '',

                other_language_details: {
                    language_read: null,
                    language_speak: null,
                    language_write: null,

                    txt_language_read: null,
                    txt_language_speak: null,
                    txt_language_write: null,
                },

                sports: '',

                driver_license: '',

                other_talents: '',

                specialization: '',

                announced_from: '',
            },
            job: {
                chk_work_out: '0',
                work_out_list: [
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

                chk_work_in: '0',
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
                mate_info: {
                    mate_title_name: null,
                    mate_title_special: null,
                    mate_wish_title_name: null,
                    mate_wish_last_name: null,
                    mate_first_name: null,
                    mate_last_name: null,
                    mate_birth_date: null,
                    mate_id_card_number: null,
                    mate_nationality: null,
                    mate_race: null,
                    mate_religion: null,
                    mate_date_of_marriage: null,
                    mate_no_marriage: null,
                    mate_career: null,
                    mate_living: null,
                    mate_death_date: null,
                    mate_death_no: null,
                    txt_mate_nationality: null,
                    txt_mate_race: null,
                    txt_mate_religion: null,
                },
                children_list: [],
                ref_person: {
                    address_detail: {
                        address_amphur: '',
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
                    first_name: '',
                    last_name: '',
                    telephone: '',
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
            candidate_info: null
        }
    },
    getters: {
        HasJob: ({ job }): boolean => job.chk_work_out == '1',
        IsWorking: ({ job }): boolean => job.job_status == 'กำลังทำงาน',
        IsStudying: ({ job }): boolean => job.job_status == 'กำลังศึกษาต่อ',
        IsUnemployed: ({ job }): boolean => job.job_status == 'ว่างงาน',
        IsHasJobMahidol: ({ job }): boolean => job.chk_work_in == '1',
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
            this.job.work_out_list.splice(index, 1)
        },
        removeEducationList(index: number) {
            index -= 1
            this.education.education_list.splice(index, 1)
        },
        useRegAddressOnCurAddress() {
            this.address.cur_address = deepCopy(this.address.reg_address)
        },
        useRegAddressOnEmerAddress() {
            this.address.urg_address = deepCopy(this.address.reg_address)
        },
        useRegAddressOnRefAddress() {
            this.marriage.ref_person.address_detail = deepCopy(this.address.reg_address)
        },
        useCurAddressOnEmerAddress() {
            this.address.urg_address = deepCopy(this.address.cur_address)
        },
        useCurAddressOnRefAddress() {
            this.marriage.ref_person.address_detail = deepCopy(this.address.cur_address)
        },

        async mapChildrenList(rawData: Profile) {
            const children_list: children_info[] = []

            for (let i = 1; i <= 3; i++) {
                let child = `child${i}` as 'child1' | 'child2' | 'child3'
                const child_obj: children_info = {
                    title: rawData[`${child}_title_name`],
                    first_name: rawData[`${child}_first_name`],
                    last_name: rawData[`${child}_last_name`],
                    id_card: rawData[`${child}_id_card_number`],
                    birth_date: rawData[`${child}_birth_date`],
                    birth_province: rawData[`${child}_province`],
                    nationality: rawData[`${child}_nationality`],
                    race: rawData[`${child}_race`] || rawData[`txt_${child}_race`],
                    religion: rawData[`${child}_religion`] || rawData[`txt_${child}_religion`],
                    child_welfare: rawData[`${child}_welfare`],
                    // legit_date: rawData[`${child}_legit_date`],
                    // legit_no: rawData[`${child}_legit_no`],
                    // bd_cert_date: rawData[`${child}_bd_cert_date`],
                    // bd_cert_no: rawData[`${child}_bd_cert_no`],
                }

                if (await checkObjectPropertiesNull(child_obj)) {
                    break
                }

                child_obj.id = i
                children_list.push(child_obj)
            }

            return children_list
        },

        async mapEducationList(rawData: Profile) {
            const education_list = [] as education[]
            for (let i = 1; i <= 4; i++) {
                let edu = `edu${i}` as 'edu1' | 'edu2' | 'edu3' | 'edu4'
                const educationObj: education = {
                    education_level: rawData[`${edu}_level`],

                    gpa: rawData[`${edu}_grade`],
                    start_date: rawData[`${edu}_begin`],
                    graduate_date: rawData[`${edu}_end`],

                    degree: rawData[`${edu}_qual`],
                    major: rawData[`${edu}_major`],
                    school: rawData[`${edu}_aca`],

                    major_other: rawData[`${edu}_major_txt`],
                    school_other: rawData[`${edu}_aca_txt`],
                }

                const isNull = await checkObjectPropertiesNull(educationObj)
                if (isNull) break

                educationObj.id = i
                education_list.push(educationObj)
            }
            return education_list
        },
        async mapJobList(rawData: Profile) {
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

                const isNull = await checkObjectPropertiesNull(jobObj)
                if (isNull) break

                job_list.push(jobObj)
            }
            console.log('🐛 mapJobList', job_list)
            return job_list
        },
    },
})
