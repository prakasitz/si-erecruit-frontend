<template>
    <div>
        <LoadingFormJobDetail v-if="profilePending" />
        <v-card v-else class="mx-auto" width="90%">
            <v-toolbar density="compact" color="main-color">
                <v-card-title :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6">รายละเอียดงาน (ID: {{ route.params.id }})</span><br />
                </v-card-title>
            </v-toolbar>
            <div
                v-if="
                    ['cancelled', 'suspended', 'terminated'].find(
                        (item) => item == jobData.job_status_code?.job_status_text.toLowerCase()
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
                    <h1 class="d-flex align-center">{{ jobData.job_status_code?.job_status_text }}</h1>
                </v-sheet>
            </div>
            <v-card-text class="d-flex justify-center">
                <v-container>
                    <FormJobDetail :job="jobData" :profileCount="profileCount"></FormJobDetail>
                </v-container>
            </v-card-text>
        </v-card>

        <v-card v-if="profilePending && pageLoad" class="mx-auto mb-5" width="90%">
            <v-card-item>
                <v-skeleton-loader
                    :loading="profilePending"
                    type="heading, subtitle, table-tbody, table-tfoot"
                ></v-skeleton-loader>
            </v-card-item>
        </v-card>

        <v-card v-else class="mx-auto my-5" width="90%">
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
                    :items="(profilesDataTest as any)"
                    item-value="profile_ID"
                    :loading="profilePending"
                    class="elevation-0"
                    show-select
                    hover
                >
                    <template v-slot:item.profile_status_code.profile_status_text="{ item }">
                        <v-chip
                            :class="`status-profile-${toLowerCase(item.raw.profile_status_code.profile_status_text)}`"
                        >
                            {{ item.raw.profile_status_code.profile_status_text }}
                        </v-chip>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <QuickAction :job="jobData" :profile="item.raw" />
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>

        <div class="mx-auto" :style="{ width: '90%' }">
            <v-btn-group class="mx-1" density="compact">
                <v-btn
                    v-if="buttonShow.BtnExport"
                    :text="BtnNameOnJobEnum.EXPORT_PROFILE"
                    color="deep-purple-darken-3"
                    @click="exportProfilesByJob($event, { profile_IDs: [], job_ID: jobData.job_ID }, 'csv')"
                ></v-btn>
                <v-menu>
                    <template v-slot:activator="{ props: menu }">
                        <v-tooltip location="top">
                            <template v-slot:activator="{ props: tooltip }">
                                <v-btn
                                    color="deep-purple"
                                    icon="mdi-dots-vertical"
                                    v-bind="mergeProps(menu, tooltip)"
                                    size=""
                                    value="left"
                                >
                                </v-btn>
                            </template>
                            <span>เพิ่มเติม</span>
                        </v-tooltip>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(item, index) in btnExportTypes"
                            :key="index"
                            @click="exportProfilesByJob($event, { profile_IDs: [], job_ID: jobData.job_ID }, item.type)"
                        >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-btn-group>
            <BtnProfileAction
                v-if="buttonShow.BtnSuspend"
                class="mx-1"
                :text="BtnNameOnJobEnum.SUSPEND_PROFILE"
                color="warning"
                :data="{ profile_IDs: profilesSelected, job_ID: jobData.job_ID }"
                :cb="suspendedProfile"
            />
            <BtnProfileAction
                v-if="buttonShow.BtnPublishable"
                class="mx-1"
                :text="BtnNameOnJobEnum.PUBLISHABLE_PROFILE"
                color="blue"
                :data="{ profile_IDs: profilesSelected, job_ID: jobData.job_ID }"
                :cb="publishableProfile"
            />
            <BtnProfileAction
                v-if="buttonShow.BtnSendSAP"
                class="mx-1"
                :text="BtnNameOnJobEnum.SEND_SAP_PROFILE"
                color="purple"
                :data="{ profile_IDs: profilesSelected, job_ID: jobData.job_ID }"
                :cb="suspendedProfile"
            />
        </div>
        <br />
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useJobComponentStore } from '~/stores/job-component.store'
import { mergeProps } from 'vue'

import { VDataTable } from 'vuetify/lib/labs/VDataTable/index.mjs'
import { Job, ProfileWithQuickAction } from '~/utils/types'

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
    middleware: ['admin-hr-only'],
})
const route = useRoute()
const pageLoad = ref(true)

let jobId = route.params.id as string

const { getProfilesByJobId } = useJobManagement()
const { suspendedProfile, publishableProfile, exportProfilesByJob } = useProfile()
const { data: profilesData, pending: profilePending } = getProfilesByJobId(jobId)

const profilesDataTest = ref<ProfileWithQuickAction[] | null>([])

const jobData = ref<Job>({
    create_date: '',
    job_ID: 0,
    data_source: '',
    job_status: 0,
    job_name: '',
    mu_job_ID: '',
    mu_job_name: '',
})

const profileCount = computed(() => profilesDataTest.value?.length || 0)
// profilesData?.value.profile?.length || 0

const useJobComponent = useJobComponentStore()
const { buttonShow } = storeToRefs(useJobComponent)

const headers: VDataTable['$headers'][] = [
    // { title: 'No.', align: 'start', key: 'no' },
    { title: 'ชื่อ นามสกุล', align: 'start', key: 'fullname', width: 200 },
    {
        title: 'สถานะ',
        align: 'center',
        key: 'profile_status_code.profile_status_text',
    },
    { title: 'เลขบัตรประชาชน', align: 'start', key: 'pid' },
    { title: 'เบอร์โทรศัพท์', align: 'start', key: 'phone' },
    { title: 'จัดการ', align: 'center', key: 'action', sortable: false },
]
const profilesSelected = ref([])

const btnExportTypes = ref([
    {
        title: 'CSV (.csv)',
        type: 'csv',
    },
    {
        title: 'Excel (.xlsx)',
        type: 'excel',
    },
    {
        title: 'JSON (.json)',
        type: 'json',
    },
])

watch(
    () => profilePending.value,
    () => {
        pageLoad.value = false
        jobData.value = profilesData.value.job
        profilesDataTest.value = profilesData.value.profile
        profilesSelected.value = []
    }
)

console.log(route.meta.title) // My home page
</script>
