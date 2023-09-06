<template>
    <div>
        <div v-if="jobPending || profilePending">
            <v-card class="mx-auto mb-5" width="90%">
                <v-card-item>
                    <v-skeleton-loader
                        :loading="jobPending || profilePending"
                        type="heading, subtitle, table-tbody, table-tfoot"
                    ></v-skeleton-loader>
                </v-card-item>
            </v-card>

            <v-card class="mx-auto mb-5" width="90%">
                <v-card-item>
                    <v-skeleton-loader
                        :loading="jobPending || profilePending"
                        type="heading, subtitle, table-tbody, table-tfoot"
                    ></v-skeleton-loader>
                </v-card-item>
            </v-card>
        </div>
        <div v-else-if="jobData">
            <v-card class="mx-auto" width="90%">
                <v-toolbar density="compact" color="main-color">
                    <v-card-title :style="{ 'font-size': '16px !important' }">
                        <span class="text-h6">รายละเอียดงาน (ID: {{ route.params.id }})</span><br />
                    </v-card-title>
                </v-toolbar>
                <div
                    v-if="
                        ['cancelled', 'suspended', 'terminated'].find(
                            (item) => item == jobData.job_status_code.job_status_text.toLowerCase()
                        )
                    "
                >
                    <v-sheet
                        class="d-flex justify-center"
                        color="black"
                        min-width="100%"
                        min-height="100%"
                        :style="{ opacity: '20%', zIndex: '1000' }"
                    >
                        <h1 class="d-flex align-center">{{ jobData.job_status_code.job_status_text }}</h1>
                    </v-sheet>
                </div>
                <v-card-text class="d-flex justify-center">
                    <v-container>
                        <FormJobDetail :job="jobData" :profileCount="profilesData!.profile.length"></FormJobDetail>
                    </v-container>
                </v-card-text>
            </v-card>

            <v-card class="mx-auto my-5" width="90%">
                <v-toolbar density="compact" color="amber-darken-2">
                    <v-card-title :style="{ 'font-size': '16px !important' }">
                        <span class="text-h6 text-white">รายละเอียดผู้สมัคร</span><br />
                    </v-card-title>
                </v-toolbar>
                <v-card-text class="d-flex justify-center">
                    <v-data-table
                        v-model="profilesSelected"
                        :items-per-page="10"
                        :headers="(headers as any)"
                        :items="profilesData!.profile"
                        item-value="profile_ID"
                        class="elevation-0"
                        show-select
                    >
                        <template v-slot:item.profile_status_code="{ item  }">
                            <v-chip :class="item.raw.profile_status_code.zprofile_status_color">
                                {{ item.raw.profile_status_code.profile_status_text }}
                            </v-chip>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <QuickAction :job="jobData" :profile="item.raw" />
                            <!-- <NuxtLink :to="`/candidate/form/${item.raw.profile_ID}/`">
                                <v-icon size="small" class="me-2"> mdi-eye </v-icon>
                            </NuxtLink> -->
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
            <div class="mx-auto" :style="{ width: '90%' }">
                <BtnProfileAction
                    v-if="buttonShow.BtnExport"
                    class="mx-1"
                    text="Export ยังไม่ทำ"
                    color="indigo"
                    :data="jobData.job_ID"
                    :cb="suspendedProfile"
                />
                <BtnProfileAction
                    v-if="buttonShow.BtnSuspend"
                    class="mx-1"
                    text="suspend"
                    color="warning"
                    :data="{ profile_IDs: profilesSelected, job_ID: jobData.job_ID }"
                    :cb="suspendedProfile"
                />
                <BtnProfileAction
                    v-if="buttonShow.BtnPublishable"
                    class="mx-1"
                    text="Publishable ยังไม่ทำ"
                    color="blue"
                    :data="{ profile_IDs: profilesSelected, job_ID: jobData.job_ID }"
                    :cb="publishableProfile"
                />
                <BtnProfileAction
                    v-if="buttonShow.BtnSendSAP"
                    class="mx-1"
                    text="SAP ยังไม่ทำ"
                    color="purple"
                    :data="jobData.job_ID"
                    :cb="suspendedProfile"
                />
            </div>
        </div>
        <br />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useJobComponentStore } from '~/stores/job-component.store'

import { VDataTable } from 'vuetify/lib/labs/VDataTable/index.mjs'

definePageMeta({
    title: 'รายละเอียดงาน',
    pageTransition: {
        name: 'rotate',
    },

    breadcrumbs: [
        {
            title: 'หน้าหลัก',
            href: '/',
        },
        {
            title: 'จัดการงาน',
            href: '/job_management/',
        },
        {
            title: 'รายละเอียดงาน',
        },
    ],
    middleware: ['hr-only'],
})
const route = useRoute()
let jobId = route.params.id as string
const { getProfilesByJobId, fetchJobs } = useJobManagement()
const { suspendedProfile, publishableProfile } = useProfile()
const { data: jobData, pending: jobPending } = fetchJobs(jobId)
const { data: profilesData, pending: profilePending } = getProfilesByJobId(jobId)

const useJobComponent = useJobComponentStore()
const { buttonShow } = storeToRefs(useJobComponent)

const headers: VDataTable['$headers'] = [
    // { title: 'No.', align: 'start', key: 'no' },
    { title: 'ชื่อ นามสกุล', align: 'start', key: 'fullname', width: 200 },
    { title: 'สถานะ', align: 'center', key: 'profile_status_code' },
    { title: 'เลขบัตรประชาชน', align: 'start', key: 'pid' },
    { title: 'เบอร์โทรศัพท์', align: 'start', key: 'phone' },
    { title: 'จัดการ', align: 'center', key: 'action', sortable: false },
]
const profilesSelected = ref([])
console.log(route.meta.title) // My home page
</script>
