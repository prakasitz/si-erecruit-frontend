<template>
    <v-row>
        <v-col cols="10">
            <span class="text-h5"></span>
        </v-col>
        <v-col class="text-right">
            <v-btn
                v-if="i != 0"
                @click="emit('update:trash', i)"
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
                v-model="_education.education_list[i].school"
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
                v-model="_education.education_list[i].education_level"
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
                v-model="_education.education_list[i].degree"
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
                v-model="_education.education_list[i].major"
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
                v-model="_education.education_list[i].gpa"
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
                v-model="_education.education_list[i].start_date"
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
                v-model="_education.education_list[i].graduate_date"
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
const prop = defineProps(['index'])
const emit = defineEmits(['update:trash'])
const _education: IEducation = reactive({ ...personalStore.$state.education })
const i = ref()
i.value = prop.index - 1
</script>
