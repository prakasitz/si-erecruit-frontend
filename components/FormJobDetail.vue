<template>
    <div>
        <v-row>
            <v-col cols="3">
                <p class="text-h6 my-2">หมายเลขงาน</p>
                <v-text-field
                    hide-details
                    density="compact"
                    variant="outlined"
                    :model-value="job.job_ID"
                    readonly
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <p class="text-h6 my-2">สถานะงาน</p>
                <v-text-field
                    hide-details
                    density="compact"
                    variant="outlined"
                    :model-value="job.job_status_code?.job_status_text"
                    readonly
                ></v-text-field>
            </v-col>
            <v-col cols="4">
                <p class="text-h6 my-2">ตำแหน่งงาน</p>
                <v-text-field
                    hide-details
                    density="compact"
                    variant="outlined"
                    :model-value="job.mu_job_name"
                    readonly
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <p class="text-h6 my-2">จำนวนผู้สมัคร</p>
                <v-text-field
                    hide-details
                    class="w-5/6"
                    density="compact"
                    variant="outlined"
                    :model-value="profileCount"
                    suffix="คน"
                    readonly
                ></v-text-field>
            </v-col>
            <v-col cols="3">
                <p class="text-h6 my-2">นำเข้าเมื่อวันที่</p>
                <v-text-field
                    class="w-100"
                    hide-details
                    variant="outlined"
                    density="compact"
                    :model-value="job.create_date"
                    readonly
                ></v-text-field>
            </v-col>
            <v-col align-self="center" class="d-flex justify-end">
                <StatusBar :status="job.job_status_code?.job_status_text"></StatusBar>
            </v-col>
        </v-row>
        <v-row>
            <v-divider class="my-3"></v-divider>
            <v-col class="d-flex justify-end">
                <v-btn class="btn blue text-body-1" color="main-color"> นำเข้าข้อมูลตั้งต้น </v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { Job } from '~/utils/types'

interface JobDetail {
    jobNumber: string
    jobStatus: string
    jobPosition: string
    applicantCount: string
    importedDate: string
}

const props = defineProps({
    job: {
        type: Object as PropType<Job>,
        required: true,
    },
    profileCount: {
        type: Number,
        required: true,
    },
})

const route = useRoute()
let jobId = route.params.id

watchEffect(() => {
    console.log({
        FormJobDetail: {
            job: props.job,
        },
    })
})
</script>
