<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-card-item>
                <v-card-title :style="{ 'font-size': '18px !important' }"> </v-card-title>
                <v-data-table
                    v-model:items-per-page="itemsPerPage"
                    :headers="headers"
                    :items="desserts"
                    item-value="name"
                    class="elevation-1"
                    show-select
                    :search="search"
                >
                    <template v-slot:top>
                        <v-row class="d-flex justify-end">
                            <v-col class="ma-3">
                                <p class="text-h6 text-main-color font-weight-bold">รายชื่องานที่นำข้อมูลเข้า</p>
                                <p class="text-h7 font-weight-bold">
                                    ได้ทำการนำข้อมูลเข้าแล้ว
                                    <span style="color: red">79</span>
                                    รายการ
                                </p>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field
                                    v-model="search"
                                    density="compact"
                                    class="pa-4"
                                    small
                                    variant="outlined"
                                    label="ค้นหา"
                                    append-inner-icon="mdi-magnify"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:[`item.status`]="{ item }">
                        <v-chip v-if="item.raw.status == 0" color="red">Imported</v-chip>
                        <v-chip v-if="item.raw.status == 1" color="black">Closed</v-chip>
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                        <v-icon size="small" class="me-2" @click="editItem(item.raw)"> mdi-pencil </v-icon>
                        <v-icon size="small" @click="deleteItem(item.raw)" color="red"> mdi-delete </v-icon>
                    </template>
                </v-data-table>
            </v-card-item>
        </v-card>
        <br />
    </div>
</template>

<script setup>
definePageMeta({
    title: 'ตั้งค่า',
    pageTransition: {
        name: 'rotate',
    },
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
            href: '/',
        },
        {
            title: 'ตั้งค่า',
        },
    ],
})

const route = useRoute()

const headers = [
    { title: 'ชื่องาน', align: 'start', key: 'name' },
    { title: 'ที่มา', align: 'start', key: 'source' },
    { title: 'สถานะ', align: 'start', key: 'status' },
    { title: 'แก้ไข/ลบ', align: 'start', key: 'action' },
]

const search = ref()

const desserts = [
    {
        name: 'Frozen Yogurt',
        source: 159,
        status: 0,
        select: false,
    },
    {
        name: 'Ice cream sandwich',
        source: 237,
        status: 1,
        select: true,
    },
    {
        name: 'Eclair',
        source: 262,
        status: 0,
        select: true,
    },
    {
        name: 'Cupcake',
        source: 305,
        status: 1,
        select: true,
    },
    {
        name: 'Gingerbread',
        source: 356,
        status: 1,
        select: true,
    },
    {
        name: 'Jelly bean',
        source: 375,
        status: 0,
        select: true,
    },
    {
        name: 'Lollipop',
        source: 392,
        status: 0,
        select: true,
    },
    {
        name: 'Honeycomb',
        source: 408,
        status: 0,
        select: true,
    },
    {
        name: 'Donut',
        source: 452,
        status: 1,
        select: true,
    },
    {
        name: 'KitKat',
        source: 518,
        status: 0,
        select: true,
    },
]

console.log(route.meta.title) // My home page
</script>
