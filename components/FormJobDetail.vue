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

        <v-row class="d-flex justify-end mt-10">
            <BtnJobAction
                v-if="buttonShow.BtnDeleteJob"
                class="mx-1"
                text="Delete"
                color="red"
                :jobId="job.job_ID"
                :cb="deleteJob"
            />
            <BtnJobAction
                v-if="buttonShow.BtnSuspendJob"
                class="mx-1"
                text="Suspend"
                color="orange"
                :jobId="job.job_ID"
                :cb="suspendJob"
            />
            <BtnJobAction
                v-if="buttonShow.BtnCancelledJob"
                class="mx-1"
                text="ยกเลิกงาน"
                color="grey"
                :jobId="job.job_ID"
                :cb="cancelJob"
            />
            <BtnJobAction
                v-if="buttonShow.BtnTerminated"
                class="mx-1"
                text="Terminate"
                color="grey"
                :jobId="job.job_ID"
                :cb="terminateJob"
            />
            <BtnJobAction
                v-if="buttonShow.BtnApproveJob"
                class="mx-1"
                text="Approve"
                color="green"
                :jobId="job.job_ID"
                :cb="approveJob"
            />
            <BtnJobAction
                v-if="buttonShow.BtnPublishedJob"
                class="mx-1"
                text="Publish ยังไม่ทำ"
                color="blue"
                :jobId="job.job_ID"
                :cb="publishJob"
            />
            <BtnJobAction
                v-if="buttonShow.BtnRepublished"
                class="mx-1"
                text="Republish"
                color="indigo"
                :jobId="job.job_ID"
                :cb="republishJob"
            />

            <BtnJobAction
                v-if="buttonShow.BtnDMS"
                class="mx-1"
                text="DMS ยังไม่ทำ"
                color="purple"
                :jobId="job.job_ID"
                :cb="verifiedJob"
            />
            <BtnJobAction
                v-if="buttonShow.BtnVerifyJob"
                class="mx-1"
                text="verify"
                color="main-color "
                :jobId="job.job_ID"
                :cb="verifiedJob"
            />
        </v-row>
    </div>
</template>

<script setup lang="ts">
import { Job } from '~/utils/types'
import { storeToRefs } from 'pinia'
import { useJobComponentStore } from '~/stores/job-component.store'

const useJobComponent = useJobComponentStore()
const { buttonShow } = storeToRefs(useJobComponent)
const { deleteJob, approveJob, cancelJob, publishJob, republishJob, suspendJob, terminateJob, verifiedJob } =
    useButtonAction()

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
