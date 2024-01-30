<template>
    <CandidateBaseCard v-if="!pending" :candidate-form="props.candidateForm" :form-page="{ form: FormEducationAndJob }">
        <template #card-body>
            <v-form ref="FormEducationAndJob">
                <v-alert
                    border="start"
                    type="info"
                    variant="outlined"
                    icon="mdi-information-outline"
                    text="ข้อมูลประวัติ กรุณากรอกประวัติการศึกษา, ประวัติการทำงาน (ที่อื่น / ในมหาวิทยาลัยมหิดล) และสถานภาพการทำงานปัจจุบัน"
                >
                </v-alert>
                <v-container class="text-body-1">
                    <p class="pb-6 text-h6">ประวัติการศึกษา</p>
                    <v-radio-group v-model="education.education_select">
                        <v-row v-for="i in education.education_list.length">
                            <v-col col="3">
                                <v-radio label="เป็นคุณวุฒิที่ใช้บรรจุ" :value="i"></v-radio>
                            </v-col>
                            <v-col cols="9" class="py-5" v-if="education.education_list.length > 0">
                                <FormsEducationForm
                                    :education-form-model="education.education_list[i - 1]"
                                    class="mt-7"
                                    :key="i"
                                    :index="i"
                                    @update:trash="(v: number) => removeEducationByIndex(v)"
                                />
                            </v-col>
                            <v-divider class="mt-2"></v-divider>
                        </v-row>
                        <div class="text-right mt-2">
                            <v-btn
                                v-if="education.education_list.length < 5"
                                @click="addeducation()"
                                class="btn-candidate-add my-2"
                                text="+ เพิ่ม"
                            ></v-btn>
                        </div>
                    </v-radio-group>
                </v-container>

                <v-container class="text-body-1">
                    <p class="pb-6 text-h6">ประวัติการทำงาน (ที่อื่น)</p>
                    <v-row>
                        <v-col cols="6"> เคยมีประวัติการทำงาน </v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="job.chk_work_out" hide-details inline>
                                <v-radio label="ไม่เคย" value="0"></v-radio>
                                <v-radio label="เคย" value="1"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <div v-if="job.chk_work_out == '1'">
                        <FormsWorkExperienceForm
                            v-for="i in job.work_out_list.length"
                            class="mt-7"
                            :key="i"
                            :index="i"
                            @update:trash="(v: number) => removeJobByIndex(v)"
                            @get:is-filled="hadJobFilleds"
                            :work-experience-form-model="job.work_out_list[i - 1]"
                        />
                        <div class="text-right">
                            <v-btn
                                class="btn-candidate-add my-2"
                                text="+ เพิ่ม"
                                v-if="job.work_out_list.length < 10"
                                @click="add_job()"
                            ></v-btn>
                        </div>
                    </div>
                </v-container>

                <v-container class="text-body-1">
                    <p class="pb-6 text-h6">ประวัติการทำงาน (ในมหาวิทยาลัยมหิดล)</p>
                    <v-row>
                        <v-col cols="6"> เคยมีประวัติการทำงานในมหาวิทยาลัยมหิดล </v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="job.chk_work_in" hide-details inline>
                                <v-radio label="ไม่เคย" value="0"></v-radio>
                                <v-radio label="เคย" value="1"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <div class="box-detail" v-if="job.chk_work_in == '1'">
                        <v-row>
                            <v-col cols="4"> ภาควิชา/หน่วยงาน <span class="text-red-darken-1"> *</span> </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="job.had_job_mahidol_detail.department"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 40 || 'ต้องไม่เกิน 40 ตัวอักษร']"
                                    counter="40"
                                >
                                    <template #prepend-inner>
                                        <v-chip label class="ma-2">มหาวิทยาลัยมหิดล</v-chip>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4"> ประเภทการจ้างของบุคลากร <span class="text-red-darken-1"> *</span> </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="job.had_job_mahidol_detail.sap_type"
                                    variant="outlined"
                                    density="compact"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 50 || 'ต้องไม่เกิน 50 ตัวอักษร']"
                                    @update:focused="handleFocus"
                                >
                                </v-text-field>
                                <v-menu v-model="showOptions">
                                    <template v-slot:activator="{ props }">
                                        <!-- hide -->
                                        <div v-bind="props"></div>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            @click="selectItem($event, item)"
                                            v-for="(item, index) in selectItems"
                                            :key="index"
                                            :value="item"
                                        >
                                            <v-list-item-title>{{ item }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                                <!-- <v-select
                                    v-model="job.had_job_mahidol_detail.sap_type"
                                    label="กรุณาเลือก"
                                    variant="outlined"
                                    density="compact"
                                    :rules="rules_fieldEmpty"
                                    :items="[
                                        'ข้าราชการ',
                                        'พนักงานมหาวิทยาลัย (พม.)',
                                        'พนักงานมหาวิทยาลัย (ชื่อส่วนงาน) (พศ.)',
                                        'ลูกจ้างชั่วคราว',
                                    ]"
                                ></v-select> -->
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4"> ตำแหน่ง <span class="text-red-darken-1"> *</span> </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="job.had_job_mahidol_detail.position_name"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 25 || 'ต้องไม่เกิน 25 ตัวอักษร']"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4"> เงินเดือน<span class="text-red-darken-1"> *</span> </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="job.had_job_mahidol_detail.salary"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="8"
                                    type="number"
                                    min="0"
                                    max="999999"
                                    :rules="[...rules_fieldEmpty, (v: number) => v >= 0 && v <= 999999 || 'ต้องไม่เกิน 999,999']"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4"> วันที่เข้าทำงาน <span class="text-red-darken-1"> *</span> </v-col>
                            <v-col cols="3">
                                <VueDatePicker
                                    v-bind="defaultVueDatePickerStyle"
                                    v-model="job.had_job_mahidol_detail.start_date"
                                    :rules="rules_fieldEmpty"
                                />
                            </v-col>
                            <v-col cols="2">
                                <v-checkbox
                                    v-model="job.had_job_mahidol_detail.still_doing"
                                    hide-details
                                    label="ถึงปัจจุบัน"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row class="m-0 p-0">
                            <v-col cols="4" v-if="!job.had_job_mahidol_detail.still_doing">
                                วันที่ออกจากงาน <span class="text-red-darken-1"> *</span></v-col
                            >
                            <v-col cols="3" v-if="!job.had_job_mahidol_detail.still_doing">
                                <VueDatePicker
                                    v-bind="defaultVueDatePickerStyle"
                                    v-model="job.had_job_mahidol_detail.end_date"
                                    :rules="rules_fieldEmpty"
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4"> สาเหตุที่ออก <span class="text-red-darken-1"> *</span> </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="job.had_job_mahidol_detail.reason"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 50 || 'ต้องไม่เกิน 50 ตัวอักษร']"
                                    counter="50"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4"> เงินชดเชย <span class="text-red-darken-1"> *</span> </v-col>
                            <v-col cols="6">
                                <v-radio-group
                                    :rules="rules_fieldEmpty"
                                    v-model="job.had_job_mahidol_detail.got_compensation"
                                    hide-details
                                    inline
                                >
                                    <v-radio label="ได้รับแล้ว" value="01"></v-radio>
                                    <v-radio label="ยังไม่ได้รับ" value="00"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>

                <v-container id="current_employment" class="text-body-1">
                    <p class="pb-6 text-h6">สถานภาพการทำงาน</p>
                    <v-row>
                        <v-col cols="4">ปัจจุบัน <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="job.job_status" inline>
                                <v-radio label="กำลังทำงาน" value="กำลังทำงาน"></v-radio>
                                <v-radio label="กำลังศึกษาต่อ" value="กำลังศึกษาต่อ"></v-radio>
                                <v-radio label="ว่างงาน" value="ว่างงาน"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <div id="still_working" v-if="job.job_status == 'กำลังทำงาน'">
                        <v-row>
                            <v-col cols="4">ประเภทของงาน <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="6">
                                <v-radio-group :rules="rules_fieldEmpty" v-model="job.current_job.job_type" inline>
                                    <v-radio label="งานประจำ" value="งานประจำ"></v-radio>
                                    <v-radio label="งานชั่วคราว" value="งานชั่วคราว"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">ตำแหน่ง <span class="text-red-darken-1"> *</span></v-col>
                            <v-col>
                                <v-text-field
                                    v-model="job.current_job.position_name"
                                    label="ขื่อตำแหน่งงาน"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 50 || 'ต้องไม่เกิน 50 ตัวอักษร']"
                                    counter="50"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">เงินเดือน <span class="text-red-darken-1"> *</span></v-col>
                            <v-col>
                                <v-text-field
                                    v-model="job.current_job.salary"
                                    label="เงินเดือน"
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                    min="0"
                                    max="999999"
                                    :rules="[...rules_fieldEmpty, (v: number) => v >= 0 && v <= 999999 || 'ต้องไม่เกิน 999,999']"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">ระยะเวลา <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="job.current_job.duration_y"
                                    hint="ไม่ถึง 1 ให้ใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    min="0"
                                    max="99"
                                    type="number"
                                    :rules="[...rules_fieldEmpty, (v: number) => v >= 0 && v <= 99 || 'ต้องไม่เกิน 99']"
                                >
                                    <template #append>ปี</template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="job.current_job.duration_m"
                                    hint="ไม่ถึง 1 ให้ใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    min="0"
                                    max="11"
                                    maxLength="2"
                                    :rules="[...rules_fieldEmpty, (v: number) => v >= 0 && v <= 11 || 'ต้องไม่เกิน 11']"
                                >
                                    <template #append>เดือน</template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">สถานที่ <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="job.current_job.company_name"
                                    label="ชื่อสถานที่"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 50 || 'ต้องไม่เกิน 50 ตัวอักษร']"
                                    counter="50"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-autocomplete
                                    v-model="job.current_job.company_province"
                                    label="จังหวัด"
                                    variant="outlined"
                                    density="compact"
                                    :items="provinceData"
                                    :item-title="'province_name'"
                                    :item-value="'province_code'"
                                    :rules="rules_fieldEmpty"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </div>
                    <div id="stilleducation" v-if="job.job_status == 'กำลังศึกษาต่อ'">
                        <v-row>
                            <v-col cols="4">ศึกษาต่อในระดับ <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="job.current_education.education_level"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 10 || 'ต้องไม่เกิน 10 ตัวอักษร']"
                                    counter="10"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">สถานศึกษา <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="job.current_education.school"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 100 || 'ต้องไม่เกิน 100 ตัวอักษร']"
                                    counter="100"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">สาขาวิชา <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="job.current_education.major"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 50 || 'ต้องไม่เกิน 50 ตัวอักษร']"
                                    counter="50"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">จะสำเร็จในปี พ.ศ. <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="job.current_education.graduate_date"
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 4 || 'ต้องไม่เกิน 4 ตัวอักษร']"
                                    counter="4"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                    <div id="unemployed" v-if="job.job_status == 'ว่างงาน'">
                        <v-row>
                            <v-col cols="4">ระยะเวลา <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="job.current_unemployee.duration_y"
                                    hint="ไม่ถึง 1 ให้ใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                    min="0"
                                    max="99"
                                    :rules="[...rules_fieldEmpty, (v: number) => v >= 0 && v <= 99 || 'ต้องไม่เกิน 99']"
                                >
                                    <template #append>ปี</template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                                    v-model="job.current_unemployee.duration_m"
                                    hint="ไม่ถึง 1 ให้ใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    type="number"
                                    min="0"
                                    max="11"
                                    :rules="[...rules_fieldEmpty, (v: number) => v >= 0 && v <= 11 || 'ต้องไม่เกิน 11']"
                                >
                                    <template #append>เดือน</template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">สาเหตุ <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="job.current_unemployee.reason"
                                    label="เหตุผลที่ว่างงาน"
                                    density="compact"
                                    variant="outlined"
                                    :rules="[...rules_fieldEmpty, (v: string) => v.length <= 50 || 'ต้องไม่เกิน 50 ตัวอักษร']"
                                    counter="50"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
            </v-form>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { usePersonalStore } from '../../stores/personal.store'
import { IEducation, IJob, job, education } from '~/utils/types'
import { storeToRefs } from 'pinia'

import { CandidateForm } from '~/utils/types'
const props = defineProps<{
    candidateForm: CandidateForm
}>()

const { rules_fieldEmpty } = useFillRules()
const personalStore = usePersonalStore()
const { education, job } = personalStore
const { HasJob, IsWorking, IsStudying, IsUnemployed, IsHasJobMahidol } = storeToRefs(personalStore)

const FormEducationAndJob: Ref<HTMLFormElement | null> = ref<HTMLFormElement | null>(null)

const isFilledHadJobs = reactive<any>(Array(job.work_out_list.length))

const { fetchProvince, fetchLevel } = useMaster()
const { data: provinceData, pending: provincePending } = await fetchProvince()
const { pending: levelPending } = await fetchLevel()

const pending = computed(() => {
    return provincePending.value || levelPending.value
})

const selectItems = ref([
    'ข้าราชการ',
    'พนักงานมหาวิทยาลัย (พม.)',
    'พนักงานมหาวิทยาลัย (ชื่อส่วนงาน) (พศ.)',
    'ลูกจ้างชั่วคราว',
])
const showOptions = ref(false)
function handleFocus(focused: boolean) {
    // Show the options when the field is focused
    if (focused) {
        showOptions.value = true
    }
}

function selectItem(event: any, item: any) {
    // Update the selected item and hide the options
    job.had_job_mahidol_detail.sap_type = item

    showOptions.value = false
}

function confirmToChnageHadJob() {
    if (isFilledHadJobs.every((item: boolean) => item)) {
        if (confirm('ระบบจะล้างข้อมูลในส่วนนี้ทั้งหมด คุณต้องการเปลี่ยนหรือไม่ ?')) {
            resetToDefaultHadJobList()
        } else {
            return
        }
    }
}

function resetToDefaultHadJobList() {
    job.work_out_list = []
    add_job()
}

function hadJobFilleds(obj: any) {
    isFilledHadJobs[obj.index - 1] = obj.isFilled
}

function add_job() {
    const old_job: job = {
        company_name: '',
        end_date: '',
        position_name: '',
        reason: '',
        salary: '',
        still_doing: false,
        start_date: '',
    }

    if (job.work_out_list.length < 3) {
        personalStore.$patch((state) => {
            state.job.work_out_list.push(old_job)
        })
    }
}

function removeJobByIndex(v: number) {
    personalStore.removeJobList(v)
}

function addeducation() {
    const educated: education = {
        degree: '',
        education_level: '',
        gpa: '',
        graduate_date: '',
        id: 1,
        major: '',
        school: '',
        start_date: '',
    }

    if (job.work_out_list.length < 3) {
        personalStore.$patch((state) => {
            state.education.education_list.push(educated)
        })
    }

    console.log('🏪 education.store', education.education_list)
}

function removeEducationByIndex(v: number) {
    personalStore.removeEducationList(v)
}

const IsMUStillDoing = toRef(job.had_job_mahidol_detail, 'still_doing')

watch(IsMUStillDoing, (newValue) => {
    if (newValue) {
        job.had_job_mahidol_detail.end_date = ''
    }
})

watch(HasJob, (newValue) => {
    if (!newValue) {
        confirmToChnageHadJob()
    }
})

watch(IsWorking, (newValue) => {
    if (newValue) {
        job.current_education = {
            education_level: '',
            graduate_date: '',
            major: '',
            school: '',
        }

        job.current_unemployee = {
            duration_y: 0,
            duration_m: 0,
            reason: '',
        }
    }
})

watch(IsStudying, (newValue) => {
    if (newValue) {
        job.current_job = {
            company_name: '',
            company_province: '',
            duration_m: '',
            duration_y: '',
            salary: '',
            job_type: '',
            position_name: '',
        }

        job.current_unemployee = {
            duration_y: 0,
            duration_m: 0,
            reason: '',
        }
    }
})

watch(IsUnemployed, (newValue) => {
    if (newValue) {
        job.current_job = {
            company_name: '',
            company_province: '',
            duration_m: '',
            duration_y: '',
            salary: '',
            job_type: '',
            position_name: '',
        }

        job.current_education = {
            education_level: '',
            graduate_date: '',
            major: '',
            school: '',
        }
    }
})

watch(IsHasJobMahidol, (newValue) => {
    if (!newValue) {
        job.had_job_mahidol_detail = {
            department: '',
            end_date: '',
            got_compensation: null,
            position_name: '',
            reason: '',
            salary: '',
            sap_type: '',
            start_date: '',
            still_doing: false,
        }
    }
})

onBeforeMount(() => {
    //only one time
    for (let i in job.work_out_list) {
        console.log(i, job.work_out_list[i])
        if (compareObjects(job.work_out_list[i], default_job)) {
            isFilledHadJobs[i] = false
        }
    }
})
</script>
