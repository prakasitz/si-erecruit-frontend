<template>
    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card class="mb-5" width="800">
            <v-toolbar density="compact" :color="bgColor">
                <v-icon class="ml-2" :icon="'mdi-information-outline'"></v-icon>
                <v-card-title class="pl-2" :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6 ml-0"> ข้อมูลการตั้งค่า </span><br />
                </v-card-title>
            </v-toolbar>
            <div id="update-form" v-if="update_form">
                <v-card-text>
                    <v-text-field
                        v-model="settings.title"
                        label="หัวข้อ"
                        class="mt-1"
                        variant="outlined"
                        readonly
                    ></v-text-field>
                    <v-textarea v-model="settings.value" label="ค่า" class="mt-1" variant="outlined"> </v-textarea>
                    <v-checkbox density="compact" v-model="check_accept" label="ยืนยันการบันทึกข้อมูล"></v-checkbox>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        variant="flat"
                        color="blue"
                        :disabled="!check_accept"
                        text="Save"
                        @click="updateSettings()"
                        :loading="loading_form"
                    />
                    <v-btn variant="outlined" text="close" @click="closeDialog()" />
                </v-card-actions>
            </div>
            <!-- <div id="loading-form" v-if="loading_form" height="300" class="mt-3 text-center">
                <v-progress-circular class="mt-6 py-4" :size="150" color="grey" indeterminate></v-progress-circular>
            </div> -->
            <div id="success-form" v-if="success_form" class="mt-3">
                <v-card-text class="text-center" width="800">
                    <v-icon icon="mdi-check-circle-outline" color="green" size="200"></v-icon>
                    <p class="text-h6 ml-0">บักทึกข้อมูลเรียบร้อย</p>
                </v-card-text>
                <v-card-actions class="mt-2">
                    <v-spacer></v-spacer>
                    <v-btn variant="outlined" text="close" @click="closeDialog()" />
                </v-card-actions>
            </div>
            <div id="success-form" v-if="fail_form" class="mt-3">
                <v-card-text class="text-center" width="800">
                    <v-icon icon="mdi-alert-circle-outline" color="red" size="200"></v-icon>
                    <p class="text-h6 ml-0">บันทึกข้อมูลไม่สำเร็จ</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="outlined" text="close" @click="closeDialog()" />
                </v-card-actions>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const { dialogSettings, dialogContext } = useSettingInfoDialog()
const { updateSetting, fetchSettings } = useSettings()

const bgColor = 'indigo'
const dialog = dialogSettings()
const settings = dialogContext()

/* เพื่อ Show div ต่างๆ  */
const update_form = ref(true)
const loading_form = ref(false)
const success_form = ref(false)
const fail_form = ref(false)
const check_accept = ref(false)

const updateSettings = async () => {
    updateShow(true, true, false, false)
    const updateValue = {
        setting_key: settings.value.title,
        value: settings.value.value,
    }
    try {
        const isUpdate = await updateSetting(updateValue)
        console.log(isUpdate?.data.value)
        const rowAffect = isUpdate?.data.value
        updateShow(false, false, true, false)
        console.log(rowAffect)
        if (rowAffect && rowAffect.rowAffects > 0) {
        } else {
            updateShow(false, false, false, true)
        }
    } catch (e) {
        updateShow(false, false, false, true)
    }
}

const updateShow = (_update_form: boolean, _loading_form: boolean, _success_form: boolean, _fail_form: boolean) => {
    update_form.value = _update_form
    loading_form.value = _loading_form
    success_form.value = _success_form
    fail_form.value = _fail_form
}

//* ต้องเคลียร์ค่าทุกครั้งที่ปิด dialog
const closeDialog = async () => {
    updateShow(true, false, false, false)
    check_accept.value = false
    dialog.value = !dialog.value
    await fetchSettings()
}
</script>
