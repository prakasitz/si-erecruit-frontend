<template>
    <div class="candidate-form" v-if="!pending">
        <v-row>
            <v-col cols="12">
                <v-card class="mx-auto" width="90%">
                    <v-expansion-panels v-model="panelShow">
                        <v-expansion-panel value="secret">
                            <v-expansion-panel-title class="pl-0 py-0">
                                <v-card-title>
                                    <b>ข้อมูลส่วนตัว</b>
                                </v-card-title>
                                <v-card-subtitle>โปรดตรวจสอบเลขบัตรประชาชนและรหัสผ่านของท่าน</v-card-subtitle>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="7">
                                            <v-text-field
                                                readonly
                                                density="compact"
                                                variant="outlined"
                                                :value="pidFormat"
                                                :type="eye1 ? 'text' : 'password'"
                                                :append-icon="eye1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="eye1 = !eye1"
                                                hide-details
                                                class="secret"
                                            >
                                                <template v-slot:prepend>
                                                    <p :style="{ 'font-size': '1.12rem !important' }">
                                                        <b>เลขบัตรประชาชน</b>
                                                    </p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                readonly
                                                density="compact"
                                                variant="outlined"
                                                value="12345"
                                                :append-icon="eye2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="eye2 ? 'text' : 'password'"
                                                @click:append="eye2 = !eye2"
                                                hide-details
                                                class="secret"
                                            >
                                                <template v-slot:prepend>
                                                    <p :style="{ 'font-size': '1.12rem !important' }">
                                                        <b>รหัสผ่าน</b>
                                                    </p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    <v-row class="mt-5 mb-3 d-flex justify-center">
                                        <v-divider :length="'90%'"></v-divider>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-alert height="100%" border="start" variant="tonal">
                                                <div
                                                    class="text-red-darken-1"
                                                    :style="{
                                                        'font-size': '0.9rem',
                                                        lineHeight: '1.4rem !important',
                                                    }"
                                                >
                                                    <v-row no-gutters>
                                                        <v-col><b>เข้าสู่ระบบครั้งล่าสุด</b></v-col>
                                                        <v-col cols="8">03/05/2566, 15:42</v-col>
                                                    </v-row>
                                                </div>
                                            </v-alert>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-alert height="100%" border="start" variant="tonal">
                                                <div
                                                    class="text-blue-darken-1"
                                                    :style="{
                                                        'font-size': '0.9rem',
                                                        lineHeight: '1.4rem !important',
                                                    }"
                                                >
                                                    <v-row no-gutters class="d-flex align-center">
                                                        <v-col cols="3"><b>บันทึกครั้งล่าสุด</b></v-col>
                                                        <v-col cols="">
                                                            <v-row no-gutters>
                                                                <v-col cols="12">03/05/2566, 15:45</v-col>
                                                                <v-col>ระบบจะทำการบันทึกให้อัตโนมัติทุก ๆ 3 นาที</v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                            </v-alert>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-sheet rounded elevation="1" class="mx-auto" width="90%">
                    <v-row justify="space-between" align="center">
                        <v-col cols="1"> <v-btn variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn></v-col>
                        <v-col>
                            <v-item-group v-model="onboardingState" class="text-center" mandatory>
                                <v-row no-gutters>
                                    <v-item
                                        v-for="item in candidateFormState"
                                        v-slot="{ isSelected, toggle }"
                                        :key="item.id"
                                        :value="item.id"
                                    >
                                        <v-col>
                                            <v-btn
                                                block
                                                class="px-lg-5 px-md-2 px-sm-1"
                                                :class="isSelected ? 'btn-candidate font-weight-black ' : ''"
                                                :selected-class="'main-color'"
                                                :variant="isSelected ? 'text' : 'text'"
                                                size="small"
                                                @click="toggle"
                                                ><span>
                                                    {{ item.title }}
                                                </span></v-btn
                                            >
                                        </v-col>
                                    </v-item>
                                </v-row>
                            </v-item-group>
                        </v-col>
                        <v-col cols="1">
                            <v-btn variant="plain" icon="mdi-chevron-right" @click="next"></v-btn>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
            <v-col cols="12">
                <section id="test21">
                    <v-window class="py-1" v-model="onboardingState">
                        <v-window-item v-for="item in candidateFormState" :key="`card-${item.id}`" :value="item.id">
                            <v-card v-if="item.id == 1" class="mx-auto" width="90%">
                                <v-container>
                                    <v-card-title class="pa-auto text-h5 text-red-darken-2"
                                        >โปรดสนใจเป็นพิเศษ</v-card-title
                                    >
                                    <v-card-text>
                                        <div class="text-h5 text-indigo-darken-2 mb-2">
                                            คำอธิบายสำหรับการกรอกข้อมูล SiRecruit สำหรับตำแหน่งทั่วไป
                                        </div>
                                        <v-alert
                                            class="mb-2"
                                            border-color="indigo-darken-2"
                                            border="start"
                                            variant="text"
                                        >
                                            <v-alert-title class="mb-2 text-h6 text-indigo-darken-2">
                                                การเข้าสู่ระบบและการบันทึกข้อมูล
                                            </v-alert-title>
                                            <div :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }">
                                                <p class="mb-4">
                                                    ผู้ใช้งาน จะต้อง<b class="text-decoration-underline">จำรหัสผ่าน</b
                                                    >ที่ระบบได้กำหนดให้ เป็นตัวเลข 6 ตัว (ดังแสดงด้านบน)
                                                    เพื่อใช้สำหรับการเข้าสู่ระบบ คู่กับ หมายเลขบัตรประชาชนของท่าน
                                                    หากผู้ใช้งานลืมรหัสผ่าน จะต้องติดต่อผู้ดูแลระบบ โทร 02-419-8783
                                                    ในวันและเวลาราชการเท่านั้น
                                                </p>
                                                <p>
                                                    ผู้ใช้งาน สามารถบันทึกข้อมูลได้ตลอดเวลาที่ปุ่มบันทึกข้อมูลด้านล่าง
                                                    ระบบจะบันทึกข้อมูลทั้งหมดให้ในทุก ๆ ส่วน
                                                </p>
                                                <p class="mb-2">
                                                    <b class="font-italic text-decoration-underline"
                                                        >ระบบจะบันทึกข้อมูลทั้งหมดให้อัตโนมัติทุก ๆ 3 นาที</b
                                                    >
                                                </p>
                                            </div>
                                        </v-alert>
                                        <v-alert
                                            class="mb-2"
                                            border-color="indigo-darken-2"
                                            border="start"
                                            variant="text"
                                        >
                                            <v-alert-title class="mb-2 text-h6 text-indigo-darken-2">
                                                การส่งข้อมูล
                                            </v-alert-title>
                                            <div :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }">
                                                <p class="mb-4">
                                                    ผู้ใช้งาน จะต้องทำการป้อนข้อมูลครบถ้วนให้และถูกต้อง
                                                    และทำเครื่องหมายถูกที่
                                                    <b class="text-decoration-underline">
                                                        ข้าพเจ้าขอรับรองว่าข้อมูลทั้งหมดข้างต้นเป็นความจริงทุกประการ
                                                    </b>
                                                </p>

                                                <p class="mb-2">
                                                    ปุ่มในการส่งข้อมูลจะปรากฎให้สามารถคลิกได้ เมื่อทำการส่งข้อมูลแล้ว
                                                    <b class="text-decoration-underline text-red-darken-2">
                                                        จะไม่สามารถเข้ามาแก้ไขได้อีก
                                                    </b>
                                                </p>
                                                <p>
                                                    หากต้องการแก้ไขข้อมูลที่ได้กดส่งไปแล้ว จะต้องติดต่อผู้ดูแลระบบ โทร
                                                    02-419-8783 ในวันและเวลาราชการ เพื่อ
                                                    <b class="text-decoration-underline text-blue-darken-2"
                                                        >เปิดสิทธิ์</b
                                                    >
                                                    ในการเข้ามาแก้ไขข้อมูลในลำดับต่อไป
                                                </p>
                                            </div>
                                        </v-alert>
                                        <v-alert border-color="indigo-darken-2" border="start" variant="text">
                                            <v-alert-title class="mb-2 text-h6 text-indigo-darken-2">
                                                การพิมพ์แบบฟอร์มและเอกสารแนบ</v-alert-title
                                            >
                                            <div :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }">
                                                <p class="mb-4">
                                                    เมื่อผู้ใช้งาน ได้ทำการส่งข้อมูลแล้ว
                                                    ระบบจะปรากฎหน้าเว็บที่อธิบายรายละเอียดในการพิมพ์
                                                    และเตรียมเอกสารอีกครั้ง ซึ่งขึ้นอยู่กับตำแหน่งที่บรรจุ
                                                </p>
                                            </div>
                                        </v-alert>
                                    </v-card-text>
                                </v-container>
                            </v-card>
                            <LoadingCandidateCard v-if="item.id != 1 && item.isLoading == true"> </LoadingCandidateCard>
                            <LazyCandidateJobPosition
                                v-if="item.id == 2"
                                :candidate-form="item"
                            ></LazyCandidateJobPosition>
                            <LazyCandidatePersonal v-if="item.id == 3" :candidate-form="item"></LazyCandidatePersonal>
                            <LazyCandidateAddressAndBanking
                                v-if="item.id == 4"
                                :candidate-form="item"
                            ></LazyCandidateAddressAndBanking>
                            <LazyCandidateParent v-if="item.id == 5" :candidate-form="item"></LazyCandidateParent>
                            <LazyCandidateMarriage v-if="item.id == 6" :candidate-form="item"></LazyCandidateMarriage>
                            <LazyCandidateEducationAndJob
                                v-if="item.id == 7"
                                :candidate-form="item"
                            ></LazyCandidateEducationAndJob>
                            <LazyCandidateTax v-if="item.id == 8" :candidate-form="item"></LazyCandidateTax>
                            <LazyCandidateTalent v-if="item.id == 9" :candidate-form="item"></LazyCandidateTalent>
                            <LazyCandidateFiles v-if="item.id == 10" :candidate-form="item"></LazyCandidateFiles>
                        </v-window-item>
                    </v-window>
                </section>
            </v-col>
        </v-row>
        <br />
        <v-btn @click="onSubmited">บันทึกข้อมูล</v-btn>
    </div>
</template>

<style>
.candidate-form .secret input {
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 1.5px;
}
</style>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMasterDataStore } from '~/stores/master.store'
import { usePersonalStore } from '~/stores/personal.store'
import { useUserStore } from '~/stores/user.store'
import { Profile } from '~/utils/types'
import { FetchError } from 'ofetch'

definePageMeta({
    title: 'จัดการข้อมูลผู้สมัคร',
    pageTransition: {
        name: 'rotate',
    },
    layout: false,
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
            href: '/candidate/',
        },
        {
            title: 'จัดการข้อมูลผู้สมัคร',
        },
    ],
    middleware: ['hr-candidate-only'],
})

const router = useRouter()
const route = useRoute()
const { dialogError, showDialog } = await useDialog()

// Master Store
const masterDataStore = useMasterDataStore()
const personalStore = usePersonalStore()
const userStore = useUserStore()

const { isItemsLoaded } = storeToRefs(masterDataStore)
const { isCandidate } = storeToRefs(userStore)

const { getProfileById } = useProfile()
const { data, pending, error } = await getProfileById(route.params.id as string)
// const onboarding = useState<number>('onBoarding')
// const candidateForms = useState<CandidateForm[]>('candidateForms')
const pidFormat = computed(() => {
    // Convert the personalID to a string (in case it's a number)
    const idString = data.value?.id_card_number.toString() ?? ''

    if (idString.length == 0) return '<ไม่มีข้อมูล>'
    if (idString.length !== 13) return idString

    // Split the ID into chunks of 1, 4, 5, 2, and 1 digits
    const formattedID = `${idString.substring(0, 1)} ${idString.substring(1, 5)} ${idString.substring(
        5,
        10
    )} ${idString.substring(10, 12)} ${idString.substring(12, 13)}`
    return formattedID
})

const onboardingState = useOnboarding()
const candidateFormState = useCandidateForms()

const { prev, next } = useWindowsNav()
const eye1 = ref(false)
const eye2 = ref(false)
const panelShow = ref('secret')

const onSubmited = async () => {
    const { submit } = useProfile()
    const { showErrorOnDialog } = useErrorHandler()
    const { data: submitData, pending: submitPending, error } = await submit(route.params.id as string)
    if (error.value) {
        showErrorOnDialog({
            error: error.value,
        })
    } else {
        const { dialogInfo } = useDialog()
        const dialog = dialogInfo()
        showDialog(
            {
                title: 'บันทึกข้อมูลฉบับร่างสำเร็จ',
                message: 'ข้อมูลของท่านได้ถูกบันทึกเรียบร้อยแล้ว',
                actionButtons: [
                    {
                        text: `Colse`,
                        variant: 'elevated',
                        color: 'primary',
                    },
                ],
                persistent: true,
            },
            dialog
        )
    }
}

onMounted(async () => {
    if (isCandidate.value) {
        setPageLayout('defaultcandidate')
    } else {
        setPageLayout('default')
    }

    let profile = data.value as Profile
    if (profile == null && error.value == null) {
        const dialog = dialogError()
        showDialog(
            {
                title: 'ไม่พบข้อมูลผู้สมัคร',
                message: 'ไม่พบข้อมูลผู้สมัครที่ท่านต้องการ กรุณาติดต่อผู้ดูแลระบบ',
                actionButtons: [
                    {
                        text: `ย้อนกลับ`,
                        variant: 'elevated',
                        onclick: () => router.back(),
                    },
                ],
                persistent: true,
            },
            dialog
        )
    } else {
        personalStore.$patch({
            personal_info: {
                title_name_th: profile.title_name_th || '',
                title_name_en: profile.title_name_en,

                title_special: profile.title_special,
                title_academic: profile.title_academic,
                title_military: profile.title_military,

                title_conferred: profile.title_conferred,

                first_name_th: profile.nameTH,
                last_name_th: profile.lastnameTH,
                first_name_en: profile.first_name_en,
                last_name_en: profile.last_name_en,
                email_address: profile.email_address,
                province_when: profile.province_when,
                birth_date: profile.birth_date,
                height: profile.height,
                weight: profile.weight,

                blood_type: profile.blood_type,
                nationality: profile.nationality,
                race: profile.race,
                religion: profile.religion,

                military_status: profile.military,

                id_card_number: profile.id_card_number,
                id_card_issue_date: profile.id_card_issue_date,
                id_card_expire_date: profile.id_card_expire_date,
                id_card_amphur: profile.id_card_amphur,
                id_card_province: profile.id_card_province,
            },
            address: {
                cur_mobile: profile.cur_mobile,
                cur_telephone: profile.cur_telephone,
                cur_same_address: profile.cur_same_address,
                urg_same_address: profile.urg_same_address,
                reg_address: {
                    address_amphur: profile.reg_amphur,
                    address_district: profile.reg_district,
                    address_country: profile.reg_country,
                    address_moo: profile.reg_moo,
                    address_no: profile.reg_address,
                    address_postcode: profile.reg_postcode,
                    address_province: profile.reg_province,
                    address_road: profile.reg_road,
                    address_soi: profile.reg_soi,
                    address_village: profile.reg_village,
                },
                cur_address: {
                    address_amphur: profile.cur_amphur,
                    address_district: profile.cur_district,
                    address_country: profile.cur_country,
                    address_moo: profile.cur_moo,
                    address_no: profile.cur_address,
                    address_postcode: profile.cur_postcode,
                    address_province: profile.cur_province,
                    address_road: profile.cur_road,
                    address_soi: profile.cur_soi,
                    address_village: profile.cur_village,
                },
                urg_address: {
                    address_amphur: profile.urg_amphur,
                    address_district: profile.urg_district,
                    address_country: profile.urg_country,
                    address_moo: profile.urg_moo,
                    address_no: profile.urg_address,
                    address_postcode: profile.urg_postcode,
                    address_province: profile.urg_province,
                    address_road: profile.urg_road,
                    address_soi: profile.urg_soi,
                    address_village: profile.urg_village,
                },
            },
            license: {
                license_number: profile.license_number,
                license_begin_date: profile.license_begin_date,
                license_expire_date: profile.license_expire_date,
            },
            ss: {
                ss_have: profile.ss_have,
                ss_same_number: profile.ss_same_number,
                ss_card_hospital: profile.ss_card_hospital,
                ss_card_number: profile.ss_card_number,
                ss_card_province: profile.ss_card_province,
                ss_card_issue_date: profile.ss_card_issue_date,
                ss_card_expire_date: profile.ss_card_expire_date,
            },
            banking: {
                bank_account_name: profile.bank_account_name,
                bank_account_number: profile.bank_account_number,
            },
            parent: {
                father: {
                    title_special: profile.father_title_special,
                    title_name: profile.father_title_name,
                    first_name: profile.father_first_name,
                    last_name: profile.father_last_name,
                    id_card_number: profile.father_id_card_number,
                    career: profile.father_career,
                    living: profile.father_living,
                    nationality: profile.father_nationality,
                    religion: profile.father_religion,
                    race: profile.father_race,
                },
                mother: {
                    title_special: profile.mother_title_special,
                    title_name: profile.mother_title_name,
                    first_name: profile.mother_first_name,
                    last_name: profile.mother_last_name,
                    id_card_number: profile.mother_id_card_number,
                    career: profile.mother_career,
                    living: profile.mother_living,
                    nationality: profile.mother_nationality,
                    religion: profile.mother_religion,
                    race: profile.mother_race,
                },
                mf_date_of_marriage: profile.mf_date_of_marriage,
                mf_no_marriage: profile.mf_no_marriage,
            },
            marriage: {
                status: profile.marital_status,
                num_of_chlid: profile.number_of_children,
                children_list: await personalStore.mapChildrenList(profile),
                mate_info: {
                    mate_title_name: profile.mate_title_name,
                    mate_title_special: profile.mate_title_special,
                    mate_wish_title_name: profile.mate_wish_title_name,
                    mate_wish_last_name: profile.mate_wish_last_name,
                    mate_first_name: profile.mate_first_name,
                    mate_last_name: profile.mate_last_name,
                    mate_birth_date: profile.mate_birth_date,
                    mate_id_card_number: profile.mate_id_card_number,
                    mate_nationality: profile.mate_nationality,
                    mate_race: profile.mate_race,
                    mate_religion: profile.mate_religion,
                    mate_date_of_marriage: profile.mate_date_of_marriage,
                    mate_no_marriage: profile.mate_no_marriage,
                    mate_career: profile.mate_career,
                    mate_living: profile.mate_living,
                    mate_death_date: profile.mate_death_date,
                    mate_death_no: profile.mate_death_no,
                    txt_mate_nationality: profile.txt_mate_nationality,
                    txt_mate_race: profile.txt_mate_race,
                    txt_mate_religion: profile.txt_mate_religion,
                },
                ref_person: {
                    title: profile.ref_title_name,
                    first_name: profile.ref_first_name,
                    last_name: profile.ref_last_name,
                    relationship: profile.ref_relationship,
                    telephone: profile.ref_telephone,
                    ref_same_address: profile.ref_same_address,
                    address_detail: {
                        address_amphur: profile.ref_amphur,
                        address_district: profile.ref_district,
                        address_country: profile.ref_amphur,
                        address_moo: profile.ref_moo,
                        address_no: profile.ref_address,
                        address_postcode: profile.ref_postcode,
                        address_province: profile.ref_province,
                        address_road: profile.ref_road,
                        address_soi: profile.ref_soi,
                        address_village: profile.ref_village,
                    },
                },
            },
            education: {
                education_select: 1,
                education_list: await personalStore.mapEducationList(profile),
            },
            job: {
                chk_work_out: profile.chk_work_out ?? '0',
                chk_work_in: profile.chk_work_in ?? '0',
                work_out_list: await personalStore.mapJobList(profile),
                job_status: profile.cur_working,
                had_job_mahidol_detail: {
                    department: profile.work_in_org,
                    sap_type: profile.work_in_type,
                    position_name: profile.work_in_pos,
                    salary: profile.work_in_sal,
                    start_date: profile.work_in_begin,
                    still_doing: profile.work_in_present,
                    end_date: profile.work_in_end,
                    reason: profile.work_in_exit_reason,
                    got_compensation: profile.work_in_com,
                },
                current_job: {
                    job_type: profile.cur_working_time,
                    position_name: profile.cur_working_pos,
                    company_name: profile.cur_working_place,
                    company_province: profile.cur_working_province,
                    duration_y: profile.cur_working_year,
                    duration_m: profile.cur_working_month,
                    salary: profile.cur_working_sal,
                },
                current_education: {
                    education_level: profile.studying_level,
                    major: profile.studying_major,
                    graduate_date: profile.studying_success,
                    school: profile.studying_academy,
                },
                current_unemployee: {
                    duration_y: profile.unemployed_year,
                    duration_m: profile.unemployed_month,
                    reason: profile.unemployed_reason,
                },
            },
            tax: {
                num_of_child: profile.child_tax_amount,
                chlid_nonschool: profile.child_amount_not_att_school,
                chlid_school: profile.child_amount_studying,
                chlid_endschool: profile.child_amount_graduating,
                loan: profile.loan,
                loan_amount: profile.loan_baht,
                insurance: profile.insurance,
                insurance_amount: profile.insurance_baht,
                donate: profile.donation,
                donate_amount: profile.donation_baht,
                fund: profile.fund,
                fund_amount: profile.fund_baht,
                marriage_income: profile.money_at_spouse,
                marriage_insurance: profile.money_at_spouse_insurance,
                marriage_insurance_amount: profile.money_at_spouse_insurance_baht,
                parent_support: profile.deductible_parents,
            },
            talent: {
                typing_th: profile.typing_th,
                typing_en: profile.typing_en,

                language_score: profile.language_score,
                language_test: profile.language_test,
                eng_language_details: {
                    language_read: profile.eng_read,
                    language_write: profile.eng_write,
                    language_speak: profile.eng_speak,
                    txt_language_read: profile.txt_eng_read,
                    txt_language_write: profile.txt_eng_write,
                    txt_language_speak: profile.txt_eng_speak,
                },

                other_language: profile.other_language,
                other_language_details: {
                    language_read: profile.other_language_read,
                    language_write: profile.other_language_write,
                    language_speak: profile.other_language_speak,
                    txt_language_read: profile.txt_other_language_read,
                    txt_language_write: profile.txt_other_language_write,
                    txt_language_speak: profile.txt_other_language_speak,
                },

                computer_programs: profile.computer_programs,
                other_talents: profile.other_talents,
                specialization: profile.specialization,
                sports: profile.sports,
                driver_license: profile.driver_license,
                announced_from: profile.announced_from,
            },
        })
    }
})

console.log(useRoute().name)
</script>
