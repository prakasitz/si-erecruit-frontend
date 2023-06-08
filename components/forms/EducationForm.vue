<template>
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
        <v-col cols="3"> สถานศึกษา <span class="text-red-darken-1"> *</span></v-col>
        <v-col>
            <v-text-field
                v-model="educationFormModel.school"
                hint="โปรดระบุ"
                density="compact"
                variant="outlined"
                maxLength="200"
            >
            </v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="3"> ระดับการศึกษา <span class="text-red-darken-1"> *</span></v-col>
        <v-col>
            <v-text-field
                v-model="educationFormModel.education_level"
                hint="โปรดระบุ"
                density="compact"
                variant="outlined"
                maxLength="200"
            >
            </v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="3">คุณวุฒิ/ปริญญา <span class="text-red-darken-1"> *</span> </v-col>
        <v-col>
            <v-text-field
                v-model="educationFormModel.degree"
                hint="โปรดระบุ"
                density="compact"
                variant="outlined"
                maxLength="200"
            >
            </v-text-field>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="3">สาขาวิชา <span class="text-red-darken-1"> *</span></v-col>
        <v-col>
            <v-text-field
                v-model="educationFormModel.major"
                hint="โปรดระบุ"
                density="compact"
                variant="outlined"
                maxLength="200"
            >
            </v-text-field>
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
            >
            </v-text-field
        ></v-col>
    </v-row>
    <v-row>
        <v-col cols="3"> วันที่เริ่มต้นการศึกษา <span class="text-red-darken-1"> *</span></v-col>
        <v-col cols="3">
            <v-text-field
                v-model="educationFormModel.start_date"
                hint="โปรดระบุ"
                density="compact"
                variant="outlined"
                maxLength="4"
            >
            </v-text-field
        ></v-col>
        <v-col cols="3"> วันที่จบการศึกษา <span class="text-red-darken-1"> *</span></v-col>
        <v-col cols="3">
            <v-text-field
                v-model="educationFormModel.graduate_date"
                hint="โปรดระบุ"
                density="compact"
                variant="outlined"
                maxLength="4"
            >
            </v-text-field>
        </v-col>
    </v-row>
</template>
<script setup lang="ts">
import { usePersonalStore } from '../../stores/personal.store'
import { IEducation, education } from '~/stores/interface/personal_information.interface'

const personalStore = usePersonalStore()
const { education } = personalStore

export interface Props {
    index: number
    educationFormModel: education
}

const props = defineProps<Props>()
const emit = defineEmits(['update:trash'])
</script>
