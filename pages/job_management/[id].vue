<template>
    <div>
        <div v-if="jobPending || profilePending">
            <v-card class="mx-auto mb-5" width="90%">
                <v-card-item>
                    <v-skeleton-loader
                        :loading="pending"
                        type="heading, subtitle, table-tbody, table-tfoot"
                    ></v-skeleton-loader>
                </v-card-item>
            </v-card>

            <v-card class="mx-auto mb-5" width="90%">
                <v-card-item>
                    <v-skeleton-loader
                        :loading="pending"
                        type="heading, subtitle, table-tbody, table-tfoot"
                    ></v-skeleton-loader>
                </v-card-item>
            </v-card>
        </div>
        <div v-else-if="job">
            <v-card class="mx-auto" width="90%">
                <v-toolbar density="compact" color="main-color">
                    <v-card-title :style="{ 'font-size': '16px !important' }">
                        <span class="text-h6">รายละเอียดงาน (ID: {{ route.params.id }})</span><br />
                    </v-card-title>
                </v-toolbar>
                <div
                    v-if="
                        ['cancelled', 'suspended', 'terminated'].find(
                            (item) => item == job.job_status_code.job_status_text.toLowerCase()
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
                        <h1 class="d-flex align-center">{{ job.job_status_code.job_status_text }}</h1>
                    </v-sheet>
                </div>
                <v-card-text class="d-flex justify-center">
                    <v-container>
                        <FormJobDetail :job="job" :profileCount="profile.profiles.length"></FormJobDetail>
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
                        :items-per-page="10"
                        :headers="headers"
                        :items="profile.profiles"
                        item-value="name"
                        class="elevation-0"
                        show-select
                    >
                        <template v-slot:top> </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip :color="profileStatusComputed(item.raw.status).profile_status_color">
                                {{ profileStatusComputed(item.raw.status).profile_status_text }}
                            </v-chip>
                        </template>
                        <template v-slot:item.action="{ item }">
                            <NuxtLink :to="`/candidate/form/`">
                                <v-icon size="small" class="me-2" @click="editItem(item.raw)"> mdi-eye </v-icon>
                            </NuxtLink>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </div>
        <div v-else>
            {{
                showError({
                    statusCode: 404,
                })
            }}
        </div>
        <br />
    </div>
</template>

<script setup>
definePageMeta({
    title: 'รายละเอียดงาน',
    pageTransition: {
        name: 'rotate',
    },

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
let jobId = route.params.id
const { getProfilesByJobId, fetchJobs } = useJobManagement()
const { data: job, pending: jobPending } = fetchJobs(jobId)
const { data: profile, pending: profilePending } = getProfilesByJobId(jobId)
const profileStatus = [
    {
        profile_status_code: 0,
        profile_status_text: 'Created',
        profile_status_color: 'label label-info m-r-10',
    },
    {
        profile_status_code: 1,
        profile_status_text: 'Imported',
        profile_status_color: 'label label-megna m-r-10',
    },
    {
        profile_status_code: 2,
        profile_status_text: 'Publishable',
        profile_status_color: 'label label-success m-r-10',
    },
    {
        profile_status_code: 3,
        profile_status_text: 'Suspended',
        profile_status_color: 'label label-danger m-r-10',
    },
    {
        profile_status_code: 4,
        profile_status_text: 'Submitted',
        profile_status_color: 'label label-light-success m-r-10',
    },
    {
        profile_status_code: 5,
        profile_status_text: 'Verified',
        profile_status_color: 'label label-light-megna m-r-10',
    },
    {
        profile_status_code: 6,
        profile_status_text: 'Waived',
        profile_status_color: 'label label-warning m-r-10',
    },
    {
        profile_status_code: 9,
        profile_status_text: 'Cancelled',
        profile_status_color: 'label label-red m-r-10',
    },
    {
        profile_status_code: 99,
        profile_status_text: 'Closed',
        profile_status_color: 'label-light-inverse m-r-10',
    },
]

const profileStatusComputed = computed(() => {
    return (status) => {
        const obj = profileStatus.find((item) => item.profile_status_code == status)
        return obj
    }
})

const headers = [
    // { title: 'No.', align: 'start', key: 'no' },
    { title: 'ชื่อ นามสกุล', align: 'start', key: 'fullname', width: 200 },
    { title: 'สถานะ', align: 'center', key: 'status' },
    { title: 'เลขบัตรประชาชน', align: 'start', key: 'pid' },
    { title: 'เบอร์โทรศัพท์', align: 'start', key: 'phone' },
    { title: 'จัดการ', align: 'center', key: 'action' },
]
console.log(route.meta.title) // My home page
</script>
