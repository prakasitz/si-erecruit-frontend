<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-card-item>
                <v-card-title :style="{ 'font-size': '18px !important' }"> </v-card-title>
                <v-data-table
                    :items-per-page="10"
                    :headers="headers"
                    :items="desserts"
                    item-value="name"
                    class="elevation-1"
                    show-select
                    :search="search"
                >
                    <template v-slot:top>
                        <v-row>
                            <v-col class="mx-4 my-3">
                                <p class="text-h6 text-main-color font-weight-bold">รายชื่อผู้ใช้งาน</p>
                                <p class="text-h7 font-weight-bold">
                                    ผู้ใช้งานทั้งหมด
                                    <span style="color: red">{{ desserts.length }}</span>
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
                    <template v-slot:item.status="{ item }">
                        <v-chip v-if="item.raw.status == 0" color="red">Imported</v-chip>
                        <v-chip v-if="item.raw.status == 1" color="black">Closed</v-chip>
                    </template>
                    <template v-slot:item.action="{ item }">
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
    title: 'จัดการผู้ใช้งาน',
    pageTransition: {
        name: 'rotate',
    },
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
            href: '/',
        },
        {
            title: 'จัดการผู้ใช้',
        },
    ],
})

const route = useRoute()

const headers = [
    { title: 'ชื่อ นามสกุล', align: 'start', key: 'name' },
    { title: 'ประเภท User', align: 'start', key: 'type' },
    { title: 'Role', align: 'start', key: 'role' },
    { title: 'Last login', align: 'start', key: 'last_login' },
    { title: 'หมายเหตุ', align: 'start', key: 'remark' },
    { title: 'แก้ไข/ลบ', align: 'start', key: 'action' },
]

const search = ref()

const desserts = [
    {
        name: 'Frozen Yogurt',
        type: 'Admin',
        role: 0,
        last_login: 0,
        remark: 0,
        action: false,
    },
    {
        name: 'Frozen Yogurt',
        type: 'Super Admin',
        role: 0,
        last_login: 0,
        remark: 0,
        action: false,
    },
    {
        name: 'Frozen Yogurt',
        type: 'Super Admin',
        role: 0,
        last_login: 0,
        remark: 0,
        action: false,
    },
    {
        name: 'Frozen Yogurt',
        type: 'Admin',
        role: 0,
        last_login: 0,
        remark: 0,
        action: false,
    },
    {
        name: 'Frozen Yogurt',
        type: 'Admin',
        role: 0,
        last_login: 0,
        remark: 0,
        action: false,
    },
    {
        name: 'Frozen Yogurt',
        type: 'User',
        role: 0,
        last_login: 0,
        remark: 0,
        action: false,
    },
]

console.log(route.meta.title) // My home page
</script>
