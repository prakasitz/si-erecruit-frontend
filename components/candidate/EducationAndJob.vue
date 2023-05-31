<template>
    <CandidateBaseCard :title="'ข้อมูลประวัติ'">
        <template #card-body>
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
                <v-radio-group>
                    <v-row v-for="i in _education.education_list.length">
                        <v-col col="3"><v-radio label="เป็นคุณวุฒิที่ใช้บรรจุ" :value="i"></v-radio></v-col>
                        <v-col cols="9" class="py-5">
                            <FormsEducationForm
                                class="mt-7"
                                v-if="_education.education_list.length > 0"
                                :key="i"
                                :index="i"
                                @update:trash="(v: number) => removeEducationByIndex(v)"
                            />
                        </v-col>
                        <v-divider class="mt-2"></v-divider>
                    </v-row>
                    <div class="text-right mt-2">
                        <v-btn
                            v-if="_education.education_list.length < 5"
                            @click="add_education()"
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
                        <v-radio-group v-model="_job.had_job" hide-details inline>
                            <v-radio label="ไม่เคย" value="N"></v-radio>
                            <v-radio label="เคย" value="Y"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <div v-if="_job.had_job == 'Y'">
                    <FormsWorkExperienceForm
                        class="mt-7"
                        v-if="_job.had_job == 'Y'"
                        v-for="i in _job.had_job_list.length"
                        :key="i"
                        :index="i"
                        @update:trash="(v: number) => removeJobByIndex(v)"
                    />
                    <div class="text-right">
                        <v-btn
                            class="btn-candidate-add my-2"
                            text="+ เพิ่ม"
                            v-if="_job.had_job_list.length < 10"
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
                        <v-radio-group v-model="_job.had_job_mahidol" hide-details inline>
                            <v-radio label="ไม่เคย" value="N"></v-radio>
                            <v-radio label="เคย" value="Y"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <div class="box-detail" v-if="_job.had_job_mahidol == 'Y'">
                    <v-row>
                        <v-col cols="4"> ภาควิชา/หน่วยงาน <span class="text-red-darken-1"> *</span> </v-col>
                        <v-col>
                            <v-text-field
                                v-model="_job.had_job_mahidol_detail.department"
                                density="compact"
                                variant="outlined"
                                maxLength="100"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> ประเภทการจ้างของบุคลากร <span class="text-red-darken-1"> *</span> </v-col>
                        <v-col cols="3">
                            <v-select
                                v-model="_job.had_job_mahidol_detail.sap_type"
                                label="กรุณาเลือก"
                                variant="outlined"
                                density="compact"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                            ></v-select>
                        </v-col>
                        <v-col cols="2"> ตำแหน่ง <span class="text-red-darken-1"> *</span> </v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-model="_job.had_job_mahidol_detail.position_name"
                                density="compact"
                                variant="outlined"
                                maxLength="100"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> เงินเดือน<span class="text-red-darken-1"> *</span> </v-col>
                        <v-col cols="8">
                            <v-text-field
                                v-model="_job.had_job_mahidol_detail.salary"
                                density="compact"
                                variant="outlined"
                                maxLength="8"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> ระยะเวลา <span class="text-red-darken-1"> *</span> </v-col>
                        <v-col cols="3">
                            <v-text-field
                                label="วันที่เข้าทำงาน"
                                v-model="_job.had_job_mahidol_detail.start_date"
                                hide-details
                                density="compact"
                                variant="outlined"
                                maxLength="100"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-checkbox
                                v-model="_job.had_job_mahidol_detail.still_doing"
                                hide-details
                                label="ถึงปัจจุบัน"
                            ></v-checkbox>
                        </v-col>
                    </v-row>
                    <v-row class="m-0 p-0" v-if="!_job.had_job_mahidol_detail.still_doing">
                        <v-col cols="4"> </v-col>
                        <v-col cols="3" v-if="!_job.had_job_mahidol_detail.end_date">
                            <v-text-field
                                label="วันที่ออกจากงาน"
                                v-model="_job.had_job_mahidol_detail.start_date"
                                hide-details
                                density="compact"
                                variant="outlined"
                                maxLength="100"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> สาเหตุที่ออก <span class="text-red-darken-1"> *</span> </v-col>
                        <v-col cols="8">
                            <v-text-field
                                v-model="_job.had_job_mahidol_detail.reason"
                                density="compact"
                                variant="outlined"
                                maxLength="100"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> เงินชดเชย <span class="text-red-darken-1"> *</span> </v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="_job.had_job_mahidol_detail.got_compensation" hide-details inline>
                                <v-radio label="ได้รับแล้ว" value="N"></v-radio>
                                <v-radio label="ยังไม่ได้รับ" value="Y"></v-radio>
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
                        <v-radio-group v-model="_job.job_status" inline>
                            <v-radio label="กำลังทำงาน" value="กำลังทำงาน"></v-radio>
                            <v-radio label="กำลังศึกษาต่อ" value="กำลังศึกษาต่อ"></v-radio>
                            <v-radio label="ว่างงาน" value="ว่างงาน"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <div id="still_working" v-if="_job.job_status == 'กำลังทำงาน'">
                    <v-row>
                        <v-col cols="4">ประเภทของงาน <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="_job.current_job.job_type" inline>
                                <v-radio label="งานประจำ" value="งานประจำ"></v-radio>
                                <v-radio label="งานชั่วคราว" value="งานชั่วคราว"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">ตำแหน่ง <span class="text-red-darken-1"> *</span></v-col>
                        <v-col>
                            <v-text-field
                                v-model="_job.current_job.position_name"
                                label="ขื่อตำแหน่งงาน"
                                density="compact"
                                variant="outlined"
                                maxLength="56"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">ระยะเวลา <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="_job.current_job.duration_y"
                                hint="ไม่ถึง 1 ให้ใส่ 0"
                                density="compact"
                                variant="outlined"
                                maxLength="2"
                            >
                                <template #append>ปี</template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="_job.current_job.duration_m"
                                hint="ไม่ถึง 1 ให้ใส่ 0"
                                density="compact"
                                variant="outlined"
                                maxLength="2"
                            >
                                <template #append>เดือน</template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">สถานที่ <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="_job.current_job.company_name"
                                label="ชื่อสถานที่"
                                density="compact"
                                variant="outlined"
                                maxLength="100"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete
                                v-model="_job.current_job.company_province"
                                label="กรุณาเลือก"
                                variant="outlined"
                                density="compact"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </div>
                <div id="still_education" v-if="_job.job_status == 'กำลังศึกษาต่อ'">
                    <v-row>
                        <v-col cols="4">ศึกษาต่อในระดับ <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="_job.current_education.education_level"
                                hide-details
                                density="compact"
                                variant="outlined"
                                maxLength="100"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">สถานศึกษา <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="_job.current_education.school"
                                hide-details
                                density="compact"
                                variant="outlined"
                                maxLength="120"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">สาขาวิชา <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="_job.current_education.major"
                                hide-details
                                density="compact"
                                variant="outlined"
                                maxLength="120"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">จะสำเร็จในปี พ.ศ. <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="_job.current_education.graduate_date"
                                hide-details
                                density="compact"
                                variant="outlined"
                                maxLength="120"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <div id="unemployed" v-if="_job.job_status == 'ว่างงาน'">
                    <v-row>
                        <v-col cols="4">ระยะเวลา <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-model="_job.current_job.duration_y"
                                hint="ไม่ถึง 1 ให้ใส่ 0"
                                density="compact"
                                variant="outlined"
                                maxLength="2"
                            >
                                <template #append>ปี</template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-model="_job.current_job.duration_y"
                                hint="ไม่ถึง 1 ให้ใส่ 0"
                                density="compact"
                                variant="outlined"
                                maxLength="2"
                            >
                                <template #append>เดือน</template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">สาเหตุ <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="_job.current_job.company_name"
                                hide-details
                                label="ชื่อสถานที่"
                                density="compact"
                                variant="outlined"
                                maxLength="200"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { usePersonalStore } from '../../stores/personal.store'
import { IEducation, IJob, job, education } from '~/stores/interface/personal_information.interface'

const personalStore = usePersonalStore()
const _education: IEducation = reactive({
    ...personalStore.$state.education,
})

const _job: IJob = reactive({
    ...personalStore.$state.job,
})

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

    if (_job.had_job_list.length < 3) {
        personalStore.$patch((state) => {
            state.job.had_job_list.push(old_job)
        })
    }
}

function removeJobByIndex(v: number) {
    personalStore.removeJobList(v)
}

function add_education() {
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

    if (_job.had_job_list.length < 3) {
        personalStore.$patch((state) => {
            state.education.education_list.push(educated)
        })
    }

    console.log(_education.education_list)
}

function removeEducationByIndex(v: number) {
    personalStore.removeEducationList(v)
}
</script>
