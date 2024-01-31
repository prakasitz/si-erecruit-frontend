import { useRoute } from 'nuxt/app'
import { masterService } from '../../../common/externalAPI/master.external'
import { BadRequestError } from '../../../../utils/default'
import { quickActionHandler } from '../../../common/profileAction/quick_action_handler'
import { Job, Profilez, Profile, JobWithProfile } from '../../../../utils/types'

const router = createRouter()

router.get(
    '/test/quick-action',
    defineEventHandler(async (event) => {
        const { j, p } = getQuery(event)

        const profile: Profile = {
            candidate_info: null,
            profile_ID: 28,
            job_ID: 2,
            profile_status: parseInt(p as string) as number,
            register_id: null,
            register_date_first: null,
            register_last_update: '2023-08-28T00:00:00.000Z',
            register_send_date: null,
            announced_from: 'บุคคลภายในมหาวิทยาลัย',
            position_id: null,
            position_name: null,
            org_unit_m: null,
            org_unit_desc: null,
            EE_Group: null,
            EE_Group_Descr: null,
            EE_Subgroup: null,
            EE_Subgroup_Descr: null,
            employment_type: null,
            time_of_work: null,
            check_in: null,
            check_out: null,
            position_doctor: null,
            position_train: null,
            train_begin_date: null,
            train_end_date: null,
            hospital: null,
            title_special: '1',
            title_conferred: '2',
            title_academic: null,
            title_military: null,
            title_name_th: '3',
            nameTH: 'ธวัลรัตน์',
            lastnameTH: 'ขำสา',
            title_name_en: '7',
            first_name_en: 'THAWANRAT',
            last_name_en: 'KHUMSA',
            email_address: 'thawanratkhumsa@gmail.com',
            birth_date: '1997-11-03',
            age_year: 0,
            age_month: 0,
            province_when: '29',
            id_card_amphur: 'เมือง',
            id_card_province: '29',
            id_card_number: '1100201370643',
            id_card_issue_date: '2010-06-29',
            id_card_expire_date: '2023-11-29',
            height: 120,
            weight: 55,
            blood_type: 'O',
            race: 'TH',
            txt_race: null,
            nationality: 'TH',
            txt_nationality: null,
            religion: '01',
            txt_religion: null,
            txt_military_year_1: null,
            txt_military_year_2: null,
            military: null,
            txt_military: null,
            reg_address: '37/6',
            reg_moo: '4',
            reg_village: '123',
            reg_soi: '12312',
            reg_road: 'บางกรวย-ไทรน้อย',
            reg_district: 'บางกร่าง',
            reg_amphur: 'เมือง',
            reg_province: '29',
            reg_postcode: '11000',
            reg_country: null,
            cur_same_address: false,
            cur_address: '37/6',
            cur_moo: '4',
            cur_village: '123',
            cur_soi: '12312',
            cur_road: 'บางกรวย-ไทรน้อย',
            cur_district: 'บางกร่าง',
            cur_amphur: 'เมือง',
            cur_province: '29',
            cur_postcode: '11000',
            cur_country: null,
            urg_same_address: true,
            urg_address: '37/6',
            urg_moo: '4',
            urg_village: '123',
            urg_soi: '12312',
            urg_road: 'บางกรวย-ไทรน้อย',
            urg_district: 'บางกร่าง',
            urg_amphur: 'เมือง',
            urg_province: '29',
            urg_postcode: '11000',
            urg_country: null,
            cur_telephone: '024199977',
            cur_mobile: '0809794456',
            license_number: null,
            license_begin_date: '2023-07-27',
            license_expire_date: '2023-05-24',
            ss_have: false,
            ss_same_number: false,
            ss_card_number: '1100201370643',
            ss_card_issue_date: null,
            ss_card_expire_date: null,
            ss_card_hospital: 'ศิริราช',
            ss_card_province: '9',
            bank_account_name: 'น.ส.ธวัลรัตน์ ขำสา',
            bank_account_number: '048185898',
            father_title_special: null,
            father_title_name: '1',
            father_first_name: 'ปิยะชาติ',
            father_last_name: 'ขำสา',
            father_living: '0',
            father_death_date: null,
            father_death_no: null,
            father_career: 'รับจ้าง',
            father_id_card_number: null,
            father_race: 'TH',
            txt_father_race: null,
            father_nationality: 'TH',
            txt_father_nationality: null,
            father_religion: '01',
            txt_father_religion: null,
            mother_title_special: null,
            mother_title_name: '3',
            mother_first_name: 'จุตภร',
            mother_last_name: 'ภัทร์พูลผล',
            mother_living: '0',
            mother_death_date: null,
            mother_death_no: null,
            mother_career: 'รับจ้าง ขายของ',
            mother_id_card_number: null,
            mother_race: 'TH',
            txt_mother_race: null,
            mother_nationality: 'TH',
            txt_mother_nationality: null,
            mother_religion: '01',
            txt_mother_religion: null,
            mf_no_marriage: null,
            mf_date_of_marriage: '1979-10-09',
            marital_status: '2',
            txt_marital_status: null,
            mate_title_special: '10',
            mate_title_name: '2',
            mate_first_name: 'ABC',
            mate_last_name: 'ABC',
            mate_birth_date: '2020-03-09',
            mate_id_card_number: '123124124',
            mate_living: '1',
            mate_death_date: null,
            mate_death_no: null,
            mate_race: 'AM',
            txt_mate_race: null,
            mate_nationality: 'AQ',
            txt_mate_nationality: null,
            mate_religion: '02',
            txt_mate_religion: null,
            mate_career: null,
            mate_no_marriage: null,
            mate_date_of_marriage: null,
            mate_wish_title_name: null,
            mate_wish_last_name: null,
            number_of_children: '1',
            child1_title_name: null,
            child1_first_name: 'dddddddddddddddddd',
            child1_last_name: 'dddddddddddddddddd',
            child1_birth_date: '2023-05-04',
            child1_province: '8',
            child1_id_card_number: '123123123123',
            child1_race: null,
            txt_child1_race: null,
            child1_nationality: null,
            txt_child1_nationality: null,
            child1_religion: '99',
            txt_child1_religion: '99',
            child1_welfare: '3',
            child1_legit_date: null,
            child1_legit_no: null,
            child1_bd_cert_date: null,
            child1_bd_cert_no: null,
            child2_title_name: 'ด.ช.',
            child2_first_name: 'สมชาย',
            child2_last_name: 'สมหญิง',
            child2_birth_date: '2021-09-09',
            child2_province: '23',
            child2_id_card_number: '1234567890123',
            child2_race: 'TH',
            txt_child2_race: 'TH',
            child2_nationality: 'TH',
            txt_child2_nationality: null,
            child2_religion: '01',
            txt_child2_religion: '01',
            child2_welfare: '1',
            child2_legit_date: null,
            child2_legit_no: null,
            child2_bd_cert_date: null,
            child2_bd_cert_no: null,
            child3_title_name: 'ด.ช.',
            child3_first_name: 'สมชาย',
            child3_last_name: 'สมหญิง',
            child3_birth_date: '2021-09-09',
            child3_province: '23',
            child3_id_card_number: '1234567890123',
            child3_race: 'TH',
            txt_child3_race: 'TH',
            child3_nationality: 'TH',
            txt_child3_nationality: null,
            child3_religion: '01',
            txt_child3_religion: '01',
            child3_welfare: '1',
            child3_legit_date: null,
            child3_legit_no: null,
            child3_bd_cert_date: null,
            child3_bd_cert_no: null,
            ref_title_name: '2',
            ref_first_name: 'จุตภร',
            ref_last_name: 'ภัทร์พูลผล',
            ref_same_address: true,
            ref_address: '37/6',
            ref_moo: '4',
            ref_village: '123',
            ref_soi: '12312',
            ref_road: 'บางกรวย-ไทรน้อย',
            ref_district: 'บางกร่าง',
            ref_amphur: 'เมือง',
            ref_province: '29',
            ref_postcode: '11000',
            ref_telephone: '0814448199',
            ref_relationship: 'มารดา',
            have_edu: null,
            edu1_qual_MU: null,
            edu1_major_MU: null,
            edu1_aca_MU: null,
            edu1_level: 'O1',
            edu1_qual: 'BI',
            edu1_fac: null,
            edu1_major: '10005',
            edu1_major_txt: null,
            edu1_aca: '1000000090',
            edu1_aca_txt: null,
            edu1_grade: '2.5',
            edu1_begin: '1999-12-29',
            edu1_end: '2006-03-16',
            edu1_cer_first: null,
            edu2_qual_MU: null,
            edu2_major_MU: null,
            edu2_aca_MU: null,
            edu2_level: null,
            edu2_qual: null,
            edu2_fac: null,
            edu2_major: null,
            edu2_major_txt: null,
            edu2_aca: null,
            edu2_aca_txt: null,
            edu2_grade: null,
            edu2_begin: null,
            edu2_end: null,
            edu2_cer_first: null,
            edu3_qual_MU: null,
            edu3_major_MU: null,
            edu3_aca_MU: null,
            edu3_level: null,
            edu3_qual: null,
            edu3_fac: null,
            edu3_major: null,
            edu3_major_txt: null,
            edu3_aca: null,
            edu3_aca_txt: null,
            edu3_grade: null,
            edu3_begin: null,
            edu3_end: null,
            edu3_cer_first: null,
            edu4_level: null,
            edu4_qual: null,
            edu4_fac: null,
            edu4_major: null,
            edu4_major_txt: null,
            edu4_aca: null,
            edu4_aca_txt: null,
            edu4_grade: null,
            edu4_begin: null,
            edu4_end: null,
            edu4_cer_first: null,
            chk_work_out: '1',
            have_emp: null,
            emp1_place: 'Hello World place comp',
            emp1_pos: 'Programmer',
            emp1_sal: '49999',
            emp1_begin: '2009-08-09',
            emp1_present: null,
            emp1_end: '2023-08-02',
            emp1_exit_reason: 'Secret =D',
            emp2_place: null,
            emp2_pos: null,
            emp2_sal: null,
            emp2_begin: null,
            emp2_present: null,
            emp2_end: null,
            emp2_exit_reason: null,
            emp3_place: null,
            emp3_pos: null,
            emp3_sal: null,
            emp3_begin: null,
            emp3_present: null,
            emp3_end: null,
            emp3_exit_reason: null,
            emp4_place: null,
            emp4_pos: null,
            emp4_sal: null,
            emp4_begin: null,
            emp4_present: null,
            emp4_end: null,
            emp4_exit_reason: null,
            chk_work_in: '1',
            work_in_org: 'New Department Value',
            work_in_type: 'พนักงานมหาวิทยาลัย (พม.)',
            work_in_pos: 'New Position Name Value',
            work_in_sal: '10000',
            work_in_begin: '2022-01-05',
            work_in_present: null,
            work_in_end: '2020-05-05',
            work_in_exit_reason: 'New Reason Value',
            work_in_com: '00',
            cur_working: 'กำลังทำงาน',
            cur_working_time: 'งานประจำ',
            cur_working_pos: 'Tester',
            cur_working_sal: '100000',
            cur_working_year: '2',
            cur_working_month: '1',
            cur_working_place: 'Tester Comp.',
            cur_working_province: '9',
            studying_level: null,
            studying_academy: null,
            studying_major: null,
            studying_success: null,
            unemployed_year: null,
            unemployed_month: null,
            unemployed_reason: null,
            child_tax: null,
            child_tax_amount: '1',
            child_amount_not_att_school: '1',
            child_amount_studying: '0',
            child_amount_graduating: '1',
            loan: 'ไม่มี',
            loan_baht: '12452',
            insurance: 'มี',
            insurance_baht: '156',
            donation: 'ไม่มี',
            donation_baht: '0',
            fund: 'ไม่มี',
            fund_baht: '64545',
            money_at_spouse: 'คู่สมรสไม่มีรายได้',
            money_at_spouse_insurance: 'มี',
            money_at_spouse_insurance_baht: '15000',
            deductible_parents: 'มารดา',
            typing_th: '30',
            typing_en: '60',
            computer_programs: 'Photoshop, Adobe all',
            eng_speak: 'อื่น ๆ',
            txt_eng_speak: 'เทส',
            eng_read: 'พอใช้',
            txt_eng_read: null,
            eng_write: 'พอใช้',
            txt_eng_write: null,
            language_test: '605',
            language_score: '990',
            other_language: 'ลาว',
            other_language_speak: 'ดี',
            txt_other_language_speak: null,
            other_language_read: 'ดี',
            txt_other_language_read: null,
            other_language_write: 'ดี',
            txt_other_language_write: null,
            sports: 'test',
            driver_license: '50467939',
            other_talents: 'เต้นบัลเล่ ร้องโอเปล่า แสดงละคร',
            specialization: 'ค้นพบการแผ่ขยายยิ่งยวดของอนุภาคควอนตัม ต่อจาก ดร. ออพเพนไพรเมอร์ (ยังไม่ตีพิมพ์)',
            spec_org_name: null,
            entry_date: null,
            contract_end_date: null,
            pers_area: null,
            sub_area: null,
            fund_1: null,
            func_area: null,
            salary: null,
            announced_no: null,
            announced_year: null,
            announced_date: null,
            PDPA_consent_granted: null,
            PDPA_consent_date: null,
            foreigner_status: null,
            employee_type: null,
        }
        const job: Job = {
            job_ID: 1,
            job_status: parseInt(j as string) as number,
            mu_job_ID: 1,
            mu_job_name: 'test',
            job_name: 'test',
            data_source: 'HR',
            create_date: new Date(),
        }

        const a: JobWithProfile = { ...job, profile: [profile] }

        const data = await quickActionHandler.getAvailableActions(a)
        return data
    })
)

router.get(
    '/job-status',
    defineEventHandler(async (event) => {
        const data = await masterService.getJobStatus(event)
        return data
    })
)

router.get(
    '/profile-status',
    defineEventHandler(async (event) => {
        const data = await masterService.getProfileStatus(event)
        return data
    })
)

router.get(
    '/title',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitle(event)
        return data
    })
)

router.get(
    '/title-conferred',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleConferred(event)
        return data
    })
)

router.get(
    '/title-special',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleSpecial(event)
        return data
    })
)

router.get(
    '/title-academic',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleAcademic(event)
        return data
    })
)

router.get(
    '/title-military',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleMilitary(event)
        return data
    })
)

router.get(
    '/titleTH',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleTH(event)
        return data
    })
)

router.get(
    '/titleEN',
    defineEventHandler(async (event) => {
        const data = await masterService.getTitleEN(event)
        return data
    })
)

router.get(
    '/province',
    defineEventHandler(async (event) => {
        const data = await masterService.getProvince(event)
        return data
    })
)

router.get(
    '/blood',
    defineEventHandler(async (event) => {
        const data = await masterService.getBlood(event)
        return data
    })
)

router.get(
    '/country-race',
    defineEventHandler(async (event) => {
        const data = await masterService.getRace(event)
        return data
    })
)

router.get(
    '/religion',
    defineEventHandler(async (event) => {
        const data = await masterService.getReligion(event)
        return data
    })
)

router.get(
    '/welcome',
    defineEventHandler(async (event) => {
        const data = await masterService.getWelcome(event)
        return data
    })
)

router.get(
    '/all',
    defineEventHandler(async (event) => {
        //promise all
        const data = await Promise.all([
            masterService.getProvince(event),
            masterService.getMaritalStatus(event),
            masterService.getBlood(event),
            masterService.getTitle(event),
            masterService.getTitleEN(event),
            masterService.getTitleTH(event),
            masterService.getTitleMilitary(event),
            masterService.getTitleSpecial(event),
            masterService.getRace(event),
            masterService.getReligion(event),
            masterService.getLevel(event),
            // masterService.getMajor(event),
            // masterService.getInstitute(event),
            // masterService.getCertificate(event),
            masterService.getPosition(event),
        ])
    })
)

router.get(
    '/position',
    defineEventHandler(async (event) => {
        const data = await masterService.getPosition(event)
        return data
    })
)

router.get(
    '/level',
    defineEventHandler(async (event) => {
        const data = await masterService.getLevel(event)
        return data
    })
)

router.get(
    '/certificate',
    defineEventHandler(async (event) => {
        let lv = getQuery(event).lv as string | undefined
        if (lv === undefined) throw BadRequestError('lv is required')
        const data = await masterService.getCertificate(lv, event)
        return data
    })
)

router.get(
    '/major',
    defineEventHandler(async (event) => {
        let lv = getQuery(event).lv as string | undefined
        if (lv === undefined) throw BadRequestError('lv is required')
        const data = await masterService.getMajor(lv, event)
        return data
    })
)

router.get(
    '/institute',
    defineEventHandler(async (event) => {
        let lv = getQuery(event).lv as string | undefined
        if (lv === undefined) throw BadRequestError('lv is required')
        const data = await masterService.getInstitute(lv, event)
        return data
    })
)

router.get(
    '/roles',
    defineEventHandler(async (event) => {
        return masterService.getRoles(event)
    })
)

router.get(
    '/settings',
    defineEventHandler(async (event) => {
        return masterService.getSettings(event)
    })
)

router.post(
    '/settings',
    defineEventHandler(async (event) => {
        return masterService.getBySetting(await readBody(event), event)
    })
)

router.put(
    '/setting',
    defineEventHandler(async (event) => {
        return masterService.updateSetting(await readBody(event), event)
    })
)

export default useBase('/api/external/master', router.handler)
