<template>
    <v-col cols="12">
        <v-card class="mx-auto" width="90%">
            <v-expansion-panels v-model="panelShow">
                <v-expansion-panel value="secret">
                    <v-expansion-panel-title class="pl-0 py-0">
                        <v-card-title>
                            <b>ข้อมูลส่วนตัว</b>
                        </v-card-title>
                        <v-card-subtitle>โปรดตรวจสอบเลขบัตรประชาชนและรหัสผ่านของท่าน</v-card-subtitle>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                        <v-card-text>
                            <v-row>
                                <v-col cols="7">
                                    <v-text-field
                                        readonly
                                        density="compact"
                                        variant="outlined"
                                        :value="pidFormat"
                                        :type="eye1 ? 'text' : 'password'"
                                        :append-icon="eye1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        @click:append="eye1 = !eye1"
                                        @copy="handleCopyEvent"
                                        hide-details
                                        class="secret"
                                    >
                                        <template v-slot:prepend>
                                            <p :style="{ 'font-size': '1.12rem !important' }">
                                                <b>เลขบัตรประชาชน</b>
                                            </p>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="4" v-if="!isHR">
                                    <v-text-field
                                        readonly
                                        density="compact"
                                        variant="outlined"
                                        :value="secret"
                                        :append-icon="eye2 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="eye2 ? 'text' : 'password'"
                                        @click:append="eye2 = !eye2"
                                        hide-details
                                        class="secret"
                                    >
                                        <template v-slot:prepend>
                                            <p :style="{ 'font-size': '1.12rem !important' }">
                                                <b>รหัสผ่าน</b>
                                            </p>
                                        </template>
                                    </v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                            </v-row>
                            <v-row class="mt-5 mb-3 d-flex justify-center">
                                <v-divider :length="'90%'"></v-divider>
                            </v-row>
                            <v-row>
                                <v-col cols="6" v-if="personalStore.candidate_info?.last_login">
                                    <v-alert height="100%" border="start" variant="tonal">
                                        <div
                                            class="text-red-darken-1"
                                            :style="{
                                                'font-size': '0.9rem',
                                                lineHeight: '1.4rem !important',
                                            }"
                                        >
                                            <v-row no-gutters>
                                                <v-col><b>เข้าสู่ระบบครั้งล่าสุด</b></v-col>
                                                <v-col cols="8"
                                                    >{{
                                                        dateToString(
                                                            personalStore.candidate_info.last_login.toString(),
                                                            DateFormatEnum.DATE_TIME_BUDDHIST_1
                                                        )
                                                    }}
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-alert>
                                </v-col>
                                <v-col cols="6" v-if="personalStore.register_last_update">
                                    <v-alert height="100%" border="start" variant="tonal">
                                        <div
                                            class="text-blue-darken-1"
                                            :style="{
                                                'font-size': '0.9rem',
                                                lineHeight: '1.4rem !important',
                                            }"
                                        >
                                            <v-row no-gutters class="d-flex align-center">
                                                <v-col cols="3"><b>บันทึกครั้งล่าสุด</b></v-col>
                                                <v-col cols="">
                                                    <v-row no-gutters>
                                                        <v-col cols="12">{{
                                                            dateToString(
                                                                personalStore.register_last_update!.toString(),
                                                                DateFormatEnum.DATE_TIME_BUDDHIST_1
                                                            )
                                                        }}</v-col>
                                                        <v-col>ระบบจะทำการบันทึกให้อัตโนมัติทุก ๆ 3 นาที</v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </div>
                                    </v-alert>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-expansion-panel-text>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePersonalStore } from '~/stores/personal.store'
import { useUserStore } from '~/stores/user.store'

const panelShow = ref('secret')

const eye1 = ref(false)
const eye2 = ref(false)

const userStore = useUserStore()
const personalStore = usePersonalStore()

function handleCopyEvent(event: ClipboardEvent) {
    event.preventDefault()
    let pidClipboardData = personalStore.personal_info?.id_card_number.toString() ?? pidDefualt
    let pidValue = pidClipboardData!.replace(/\s/g, '')
    event.clipboardData?.setData('text/plain', pidValue)
}

const { isHR, secret, last_login } = storeToRefs(userStore)
const { personal_info } = personalStore

const pidFormat = computed(() => {
    // Convert the personalID to a string (in case it's a number)
    const idString = personal_info?.id_card_number.toString() ?? pidDefualt
    if (idString.length == 0) return pidDefualt
    if (idString.length !== 13) return pidDefualt

    // Split the ID into chunks of 1, 4, 5, 2, and 1 digits
    const formattedID = `${idString.substring(0, 1)} ${idString.substring(1, 5)} ${idString.substring(
        5,
        10
    )} ${idString.substring(10, 12)} ${idString.substring(12, 13)}`
    return formattedID
})
</script>
