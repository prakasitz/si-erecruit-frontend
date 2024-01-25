<template>
    <div>
        <v-row>
            <v-col cols="10">
                <span class="text-h5"></span>
            </v-col>
            <v-col class="text-right">
                <v-btn
                    v-if="props.index != 1"
                    @click="emit('update:trash', props.index)"
                    icon="mdi-trash-can"
                    density="compact"
                    color="red"
                    variant="tonal"
                >
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3"> ระดับการศึกษา<span class="text-red-darken-1"> *</span></v-col>
            <v-col>
                <v-autocomplete
                    v-model="educationFormModel.education_level"
                    :items="levelData"
                    :itemTitle="'establishment_text'"
                    :itemValue="'establishment'"
                    variant="outlined"
                    density="compact"
                    :rules="rules_fieldEmpty"
                >
                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">คุณวุฒิ/ปริญญา <span class="text-red-darken-1"> *</span> </v-col>
            <v-col>
                <v-autocomplete
                    v-model="educationFormModel.degree"
                    :loading="cerPending"
                    :items="cerData"
                    :itemTitle="'cerfificate_text'"
                    :itemValue="'certificate_code'"
                    variant="outlined"
                    density="compact"
                    :rules="rules_fieldEmpty"
                    :disabled="cerData.length === 0"
                >
                </v-autocomplete>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">
                สถานศึกษา <span v-if="instituteData.length !== 0" class="text-red-darken-1"> *</span></v-col
            >
            <v-col>
                <v-autocomplete
                    v-model="educationFormModel.school"
                    :loading="institutePending"
                    :items="instituteData"
                    :itemTitle="'institute'"
                    :itemValue="'institute_code'"
                    variant="outlined"
                    density="compact"
                    :disabled="instituteData.length === 0"
                    :hide-details="instituteData.length === 0"
                    :rules="rules_fieldEmpty"
                >
                </v-autocomplete>
            </v-col>
            <v-col cols="9" offset="3">
                <v-text-field
                    v-if="educationFormModel.school === '9999999999'"
                    v-model="educationFormModel.school_other"
                    label="อื่นๆ โปรดระบุ"
                    variant="outlined"
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3">สาขาวิชา <span v-if="majorData.length !== 0" class="text-red-darken-1"> *</span></v-col>
            <v-col>
                <v-autocomplete
                    v-model="educationFormModel.major"
                    :loading="majorPending"
                    branch_of_study_code
                    :itemTitle="'branch_of_study_text'"
                    :itemValue="'branch_of_study_code'"
                    :items="majorData"
                    variant="outlined"
                    density="compact"
                    :disabled="majorData.length === 0"
                    :hide-details="majorData.length === 0"
                    :rules="rules_fieldEmpty"
                >
                </v-autocomplete>
            </v-col>
            <v-col cols="9" offset="3">
                <v-text-field
                    v-if="educationFormModel.major === '99997'"
                    v-model="educationFormModel.major_other"
                    label="อื่นๆ โปรดระบุ"
                    variant="outlined"
                    density="compact"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="3"> เกรดเฉลี่ย <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model="educationFormModel.gpa"
                    hint="โปรดระบุ"
                    density="compact"
                    variant="outlined"
                    maxLength="4"
                    :rules="rules_fieldEmpty"
                >
                </v-text-field
            ></v-col>
        </v-row>
        <v-row>
            <v-col cols="3"> วันที่เริ่มต้นการศึกษา <span class="text-red-darken-1"> *</span></v-col>
            <v-col cols="3">
                <v-input v-model="educationFormModel.start_date" :rules="rules_fieldEmpty">
                    <template #default="{ isValid }">
                        <VueDatePicker
                            placeholder="วัน/เดือน/ปี"
                            :="defaultVueDatePickerStyle"
                            v-model="educationFormModel.start_date"
                            :rules="rules_fieldEmpty"
                            :state="(isValid.value as boolean)"
                        />
                    </template>
                </v-input>
            </v-col>
            <v-col cols="3"> วันที่จบการศึกษา <span class="text-red-darken-1"> *</span></v-col>
            <v-col cols="3">
                <v-input v-model="educationFormModel.graduate_date" :rules="rules_fieldEmpty">
                    <template #default="{ isValid }">
                        <VueDatePicker
                            placeholder="วัน/เดือน/ปี"
                            :="defaultVueDatePickerStyle"
                            v-model="educationFormModel.graduate_date"
                            :rules="rules_fieldEmpty"
                            :state="(isValid.value as boolean)"
                        />
                    </template>
                </v-input>
            </v-col>
        </v-row>
    </div>
</template>
<script setup lang="ts">
import { usePersonalStore } from '../../stores/personal.store'
import { IEducation, education } from '~/utils/types'

export interface Props {
    index: number
    educationFormModel: education
    key: number
}

const props = defineProps<Props>()
const emit = defineEmits(['update:trash'])

const personalStore = usePersonalStore()
const { education } = personalStore
const { rules_fieldEmpty } = useFillRules()

const currentEduLevel = computed(() => {
    return props.educationFormModel.education_level
})

const { data: levelData } = useNuxtData('master/level')

const { data: cerData, pending: cerPending } = await useFetch('/api/external/master/certificate', {
    method: 'GET',
    query: {
        lv: currentEduLevel,
    },
    key: 'master/certificate-' + currentEduLevel.value,
    watch: [currentEduLevel],
})
const { data: majorData, pending: majorPending } = await useFetch('/api/external/master/major', {
    method: 'GET',
    query: {
        lv: currentEduLevel,
    },
    key: 'master/major-' + currentEduLevel.value,
    watch: [currentEduLevel],
})
const { data: instituteData, pending: institutePending } = await useFetch('/api/external/master/institute', {
    method: 'GET',
    query: {
        lv: currentEduLevel,
    },
    key: 'master/institute-' + currentEduLevel.value,
    watch: [currentEduLevel],
})

watch(currentEduLevel, (old_edu, new_edu) => {
    console.log({
        old_edu,
        new_edu,
    })
    if (new_edu) {
        let ind = props.index - 1
        education.education_list[ind].degree = ''

        education.education_list[ind].major = ''
        education.education_list[ind].major_other = undefined

        education.education_list[ind].school = ''
        education.education_list[ind].school_other = undefined
    }
})

</script>

