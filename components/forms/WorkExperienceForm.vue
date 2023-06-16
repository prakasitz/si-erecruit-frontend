<template>
    <div class="box-detail">
        <v-row>
            <v-col cols="10">
                <span class="text-h5"> # {{ props.index }} </span>
            </v-col>
            <v-col class="text-right">
                <v-btn
                    icon="mdi-trash-can"
                    color="red"
                    v-if="props.index > 1"
                    variant="tonal"
                    density="compact"
                    @click="emit('update:trash', props.index)"
                >
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"> สถานที่ทำงาน <span class="text-red-darken-1"> *</span> </v-col>
            <v-col>
                <v-text-field
                    v-model="workExperienceFormModel.company_name"
                    density="compact"
                    variant="outlined"
                    maxLength="100"
                    :rules="rules_fieldEmpty"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"> เงินเดือน <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model="workExperienceFormModel.salary"
                    density="compact"
                    variant="outlined"
                    maxLength="10"
                    :rules="rules_fieldEmpty"
                ></v-text-field>
            </v-col>
            <v-col cols="2"> ตำแหน่ง <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model="workExperienceFormModel.position_name"
                    density="compact"
                    variant="outlined"
                    maxLength="100"
                    :rules="rules_fieldEmpty"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"> วันที่เข้าทำงาน <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="3">
                <VueDatePicker
                    label="วันที่เข้าทำงาน"
                    v-bind="defaultVueDatePickerStyle"
                    v-model="workExperienceFormModel.start_date"
                    hide-details
                    model-type="yyyy/MM/dd"
                    :rules="rules_fieldEmpty"
                />
            </v-col>
            <v-col cols="2">
                <v-checkbox v-model="workExperienceFormModel.still_doing" hide-details label="ถึงปัจจุบัน"></v-checkbox>
            </v-col>
        </v-row>
        <v-row class="m-0 p-0" v-if="!workExperienceFormModel.still_doing">
            <v-col cols="4"> วันที่ออกจากงาน <span class="text-red-darken-1"> *</span></v-col>
            <v-col cols="3">
                <VueDatePicker
                    :rules="rules_fieldEmpty"
                    v-bind="defaultVueDatePickerStyle"
                    v-model="workExperienceFormModel.end_date"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"> สาเหตุที่ออก <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="8">
                <v-text-field
                    v-model="workExperienceFormModel.reason"
                    density="compact"
                    variant="outlined"
                    maxLength="500"
                    :rules="rules_fieldEmpty"
                ></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePersonalStore } from '../../stores/personal.store'
import { IJob, job, job_mahidol } from '~/stores/interface/personal_information.interface'

export interface Props {
    index: number
    workExperienceFormModel: job
}

const { rules_fieldEmpty } = useFillRules()
const personalStore = usePersonalStore()
const props = defineProps<Props>()

const emit = defineEmits(['update:trash', 'get:isFilled'])

const IsOtherStillDoing = toRef(props.workExperienceFormModel, 'still_doing')
watch(IsOtherStillDoing, (newValue) => {
    if (newValue) {
        // Clear the value when the checkbox is checked
        props.workExperienceFormModel.end_date = ''
    }
})

const isFilled = ref(false)
watch(
    props,
    ({ index, workExperienceFormModel }) => {
        if (compareObjects(workExperienceFormModel, default_job)) {
            isFilled.value = false
        } else {
            isFilled.value = true
        }
        emit('get:isFilled', { index, isFilled: isFilled.value })
    },
    { deep: true }
)
</script>
