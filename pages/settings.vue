<template>
    <div>
        <v-card v-if="pending" class="mx-auto" width="90%">
            <v-card-item>
                <v-skeleton-loader
                    :loading="pending"
                    type="heading, subtitle, table-tbody, table-tfoot"
                ></v-skeleton-loader>
            </v-card-item>
        </v-card>
        <v-card v-else class="mx-auto" width="90%">
            <v-card-item>
                <v-card-title :style="{ 'font-size': '18px !important' }"> </v-card-title>
                <v-data-table :headers="(headers as any)" :items="data" class="elevation-1" hover :search="search">
                    <template v-slot:top>
                        <v-row class="d-flex justify-end">
                            <v-col class="ma-3">
                                <p class="text-h6 text-main-color font-weight-bold">Settings</p>
                                <p class="text-h7 font-weight-bold">ตั้งค่าระบบ</p>
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
                    <template v-slot:item.action="{ item }">
                        <v-icon size="small" color="blue" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
                    </template>
                </v-data-table>
            </v-card-item>
        </v-card>
        <br />
        <DialogsSettingInfo />
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'ตั้งค่า',
    name: 'settings',
    pageTransition: {
        name: 'rotate',
    },
    middleware: ['admin-hr-only'],
})

useBreadcrumb().setBreadcrumbs([
    {
        title: 'ตั้งค่า',
    },
])

const { fetchSettings, fetchBySettings, updateSetting } = useSettings()
const { showDialogInfo } = useSettingInfoDialog()

const { data, pending } = fetchSettings()
const search = ref()

const headers = [
    { title: 'หัวข้อ', align: 'start', key: 'setting_key' },
    { title: 'ค่า', align: 'start', key: 'value' },
    { title: 'แก้ไข', align: 'start', key: 'action' },
]

const editItem = async (item: any) => {
    const resp = await fetchBySettings([item.columns.setting_key])
    if (resp?.data) {
        let setting_value = resp.data.value?.at(0).value
        showDialogInfo({
            title: item.columns.setting_key,
            value: setting_value,
        })
    }
}
</script>
