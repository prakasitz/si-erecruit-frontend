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
        <div v-else>
            <v-card class="mx-auto" width="90%">
                <v-toolbar density="compact" color="main-color">
                    <v-card-title :style="{ 'font-size': '16px !important' }">
                        <span class="text-h6">รายละเอียดงาน (ID: {{ route.params.id }})</span><br />
                    </v-card-title>
                </v-toolbar>
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
                        v-model:items-per-page="itemsPerPage"
                        :headers="headers"
                        :items="profile.profiles"
                        item-value="name"
                        class="elevation-0"
                        show-select
                    >
                        <template v-slot:top> </template>
                        <template v-slot:item.status="{ item }">
                            <v-chip v-if="item.raw.status == 0" color="red">Imported</v-chip>
                            <v-chip v-if="item.raw.status == 1" color="black">Closed</v-chip>
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
    middleware: ['hr-auth'],
})
const route = useRoute()
let jobId = route.params.id
const { getProfilesByJobId, fetchJobs } = useJobManagement()
const { data: job, pending: jobPending } = fetchJobs(jobId)
const { data: profile, pending: profilePending } = getProfilesByJobId(jobId)

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
