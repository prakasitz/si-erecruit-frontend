<template>
    <v-row>
        <v-col cols="3">
            <p class="text-h6 my-2">หมายเลขงาน</p>
            <v-text-field
                hide-details
                density="compact"
                variant="outlined"
                :model-value="jobDetailObject.jobNumber"
                readonly
            ></v-text-field>
        </v-col>
        <v-col cols="2">
            <p class="text-h6 my-2">สถานะงาน</p>
            <v-text-field
                hide-details
                density="compact"
                variant="outlined"
                :model-value="jobDetailObject.jobStatus"
                readonly
            ></v-text-field>
        </v-col>
        <v-col cols="4">
            <p class="text-h6 my-2">ตำแหน่งงาน</p>
            <v-text-field
                hide-details
                density="compact"
                variant="outlined"
                :model-value="jobDetailObject.jobPosition"
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
                :model-value="jobDetailObject.applicantCount"
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
                :model-value="jobDetailObject.importedDate"
                readonly
            ></v-text-field>
        </v-col>
        <v-col align-self="center" class="d-flex justify-end">
            <StatusBar :status="'active'"></StatusBar>
        </v-col>
    </v-row>
    <v-row>
        <v-divider class="my-3"></v-divider>
        <v-col class="d-flex justify-end">
            <v-btn class="btn blue text-body-1" color="main-color"> นำเข้าข้อมูลตั้งต้น </v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
interface JobDetail {
    jobNumber: string
    jobStatus: string
    jobPosition: string
    applicantCount: string
    importedDate: string
}

const jobDetailObject = reactive<JobDetail>({
    jobNumber: '123123',
    jobStatus: 'Imported',
    jobPosition: 'นักวิชาการคอมพิวเตอร์',
    applicantCount: '0',
    importedDate: '22 เม.ย. 2565, 14:48',
})
</script>
