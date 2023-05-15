<template>
    <div class="box-detail">
        <v-row>
            <v-col cols="10">
                <span class="text-h5"> # {{ prop.index }} </span>
            </v-col>
            <v-col class="text-right">
                <v-btn
                    icon="mdi-trash-can"
                    color="red"
                    v-if="prop.index > 1"
                    variant="tonal"
                    density="compact"
                    @click="emit('update:trash', prop.index)"
                >
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"> สถานที่ทำงาน <span class="text-red-darken-1"> *</span> </v-col>
            <v-col>
                <v-text-field
                    v-model="_job.had_job_list[i].company_name"
                    density="compact"
                    variant="outlined"
                    maxLength="100"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"> เงินเดือน <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model="_job.had_job_list[i].salary"
                    density="compact"
                    variant="outlined"
                    maxLength="10"
                ></v-text-field>
            </v-col>
            <v-col cols="2"> ตำแหน่ง <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model="_job.had_job_list[i].position_name"
                    density="compact"
                    variant="outlined"
                    maxLength="100"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="4"> ระยะเวลา <span class="text-red-darken-1"> *</span> </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model="_job.had_job_list[i].start_date"
                    label="วันที่เข้าทำงาน"
                    hide-details
                    density="compact"
                    variant="outlined"
                    maxLength="100"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-checkbox v-model="_job.had_job_list[i].still_doing" hide-details label="ถึงปัจจุบัน"></v-checkbox>
            </v-col>
        </v-row>
        <v-row class="m-0 p-0" v-if="!_job.had_job_list[i].still_doing">
            <v-col cols="4"> </v-col>
            <v-col cols="3">
                <v-text-field
                    v-model="_job.had_job_list[i].end_date"
                    label="วันที่ออกจากงาน"
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
                    v-model="_job.had_job_list[i].reason"
                    density="compact"
                    variant="outlined"
                    maxLength="500"
                ></v-text-field>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { usePersonalStore } from '../../stores/personal.store'
import { IJob } from '~/stores/interface/personal_information.interface'

const personalStore = usePersonalStore()
const prop = defineProps(['index'])
const emit = defineEmits(['update:model', 'update:trash'])
const _job: IJob = reactive({ ...personalStore.$state.job })
const i = prop.index - 1
</script>
