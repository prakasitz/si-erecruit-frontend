<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-toolbar density="compact" color="main-color">
                <v-card-title :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6">รายละเอียดงาน (ID: {{ route.params.id }})</span><br />
                </v-card-title>
            </v-toolbar>
            <v-card-text class="d-flex justify-center">
                <v-container>
                    <FormJobDetail></FormJobDetail>
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
                    :items="data"
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
})

const headers = [
    // { title: 'No.', align: 'start', key: 'no' },
    { title: 'ชื่อ นามสกุล', align: 'start', key: 'fullname', width: 200 },
    { title: 'สถานะ', align: 'center', key: 'status' },
    { title: 'เลขบัตรประชาชน', align: 'start', key: 'pid' },
    { title: 'เบอร์โทรศัพท์', align: 'start', key: 'phone' },
    { title: 'จัดการ', align: 'center', key: 'action' },
]

const data = [
    {
        no: '1',
        fullname: 'นางสาวแก้วใจ ใจซื่อตรง',
        status: 0,
        pid: '110370220200120',
    },
    {
        no: '2',
        fullname: 'นางสาวแพรวพรรณ เผือกบางนาสูดๆ',
        status: 1,
        pid: '140220220200120',
    },
    {
        no: '3',
        name: 'Eclair',
        fullname: 262,
        status: 0,
        pid: '140220220200120',
    },
    {
        no: '4',
        name: 'Cupcake',
        fullname: 305,
        status: 1,
        pid: '140220220200120',
    },
    {
        no: '5',
        name: 'Gingerbread',
        fullname: 356,
        status: 1,
        pid: '140220220200120',
    },
    {
        no: '6',
        name: 'Jelly bean',
        fullname: 375,
        status: 0,
        pid: '140220220200120',
    },
    {
        no: '7',
        name: 'Lollipop',
        fullname: 392,
        status: 0,
        pid: '140220220200120',
    },
    {
        no: '8',
        name: 'Honeycomb',
        fullname: 408,
        status: 0,
        pid: '140220220200120',
    },
    {
        no: '9',
        name: 'Donut',
        fullname: 452,
        status: 1,
        pid: '140220220200120',
    },
    {
        no: '10',
        name: 'KitKat',
        fullname: 518,
        status: 0,
        pid: '140220220200120',
    },
]

const route = useRoute()
console.log(route.meta.title) // My home page
</script>
