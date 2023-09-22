<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-card-item>
                <v-card-title :style="{ 'font-size': '18px !important' }"></v-card-title>
                <v-data-table
                    :items-per-page="20"
                    :headers="(headers as any)"
                    :items="usersData || []"
                    item-value="name"
                    class="elevation-1"
                    :search="search"
                    :loading="usersPending"
                    hover
                >
                    <template v-slot:top>
                        <v-row>
                            <v-col class="mx-4 my-3">
                                <p class="text-h6 text-main-color font-weight-bold">รายชื่อผู้ใช้งาน</p>
                                <p class="text-h7 font-weight-bold">
                                    ผู้ใช้งานทั้งหมด
                                    <span style="color: red">{{ usersData?.length }}</span>
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
                                >
                                    <template #prepend>
                                        <v-btn
                                            :color="'main-color'"
                                            prepend-icon="mdi-plus"
                                            @click="showForm(undefined, 'create')"
                                            >สร้าง
                                        </v-btn>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-slot:item.local_user="{ item }">
                        <v-chip size="small" class="font-weight-bold" :color="item.raw.local_user ? 'main-color' : ''">
                            {{ item.raw.local_user ? 'Local' : 'Non-Local' }}
                        </v-chip>
                    </template>
                    <template v-slot:item.role_ID="{ item }">
                        <v-chip size="small" class="font-weight-bold" v-bind="chipByRoleID(item.raw.role_ID)"> </v-chip>
                    </template>
                    <template v-slot:item.locked_user="{ item }">
                        <v-chip
                            size="small"
                            class="font-weight-bold"
                            :color="item.raw.locked_user ? 'error' : 'success'"
                        >
                            {{ item.raw.locked_user ? 'Locked' : 'Active' }}
                        </v-chip>
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-icon size="small" class="me-2" @click="showForm(item.raw, 'edit')"> mdi-pencil </v-icon>
                        <v-icon size="small" @click="confirmToDeleteUser(item.raw)" color="red"> mdi-delete </v-icon>
                    </template>
                </v-data-table>
                <dialogs-backend-user-form
                    :form-type="form"
                    :dialog="dialog"
                    @update:dialog="updateDialog"
                    :user="userProps"
                />
            </v-card-item>
        </v-card>
        <br />
    </div>
</template>

<script setup lang="ts">
import { SRC_User } from '~/utils/types'

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
    middleware: 'hr-only',
})

const route = useRoute()

const { dialogConfirm, showDialog } = useDialog()
const dialog = ref(false)
const dialogConf = dialogConfirm()

const { fetchSRCUsers, deleteSRCUserById } = useUserManagement()

const { data: usersData, pending: usersPending } = fetchSRCUsers()

const delItem = async (even: any, item: SRC_User) => {
    const resp = await deleteSRCUserById(item)
    if (resp.data.value) {
        return {
            status: true,
            message: `ลบผู้ใช้งาน: <b>${item.SAP_ID}</b> สำเร็จ`,

            callbackActionBtn: [
                {
                    text: 'Close',
                    //href: `/job_management/${data.job_ID}`,
                },
            ],
        }
    } else if (resp?.error?.value?.data) {
        const { showTokenExpired } = useErrorHandler()
        let statusCode = resp?.error.value.statusCode
        if (statusCode === 401) showTokenExpired(route)
        return {
            status: false,
            message: `การลบผู้ใช้งาน: <b>${item.SAP_ID}</b> ไม่สำเร็จ Error: ${resp?.error?.value?.data?.message}`,
        }
    } else {
        return {
            status: false,

            message: `Sorry, something went wrong.`,
        }
    }
}

const confirmToDeleteUser = async (srcUser: SRC_User) => {
    let dialogContext: any = {
        title: `ลบผู้ใช้งาน`,
        dialogColor: 'error',
        message: `คุณต้องการลบผู้ใช้งาน: <br> <b>${srcUser.SAP_ID}</b> ?`,
        item: {
            id: {
                ...srcUser,
            },
        },
        actionButtons: [
            {
                text: 'Delete',
                variant: 'elevated',
                color: 'error',
                cb: delItem,
            },
            {
                text: 'Cancel',
            },
        ],

        persistent: true,
    }
    showDialog(dialogContext, dialogConf)
}

const form: Ref<'' | 'edit' | 'create'> = ref('')
const userProps: Ref<SRC_User | undefined> = ref()
const showForm = (item: SRC_User | undefined, type: 'edit' | 'create') => {
    dialog.value = true
    userProps.value = item
    form.value = type
}

const updateDialog = (updateValue: boolean) => {
    console.log('updateDialog', updateValue)
    dialog.value = updateValue
    form.value = ''
}

const headers = [
    { title: 'SAP ID', align: 'start', key: 'SAP_ID' },
    { title: 'SAP name', align: 'start', key: 'SAP_name' },
    { title: 'ประเภท', align: 'start', key: 'local_user' },
    { title: 'Role', align: 'start', key: 'role_ID' },
    { title: 'สถานะ', align: 'start', key: 'locked_user' },
    { title: 'Last login', align: 'start', key: 'last_login_str' },
    { title: 'แก้ไข/ลบ', align: 'start', key: 'action', sortable: false },
]

const search = ref()

/*
Super Admin
General Admin
HR Officer
Department Officer
*/
const chipByRoleID = computed(() => {
    return (roleID: number) => {
        return roleChipList.value.find((item) => item.id === roleID)
    }
})

const roleChipList = ref([
    {
        id: 0,
        text: 'Super Admin',
        color: 'red',
    },
    {
        id: 1,
        text: 'General Admin',
        color: 'blue',
    },
    {
        id: 2,
        text: 'HR Officer',
        color: 'green',
    },
    {
        id: 3,
        text: 'Department Officer',
        color: '#FFA726',
    },
])

watch([() => dialog.value, () => dialogConf.value], ([val1, val2]) => {
    if (!val1 && !val2) {
        userProps.value = undefined
        refreshNuxtData('fetchSRCUsers')
    }
})

console.log(route.meta.title) // My home page
</script>
