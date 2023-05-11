<template>
    <CandidateBaseCard :title="'ข้อมูลที่อยู่/บัญชีธนาคาร'">
        <template #card-body>
            <v-container class="text-body-1">
                <v-row>
                    <!-- คำนำหน้า พิเศษ -->

                    <v-col cols="3">
                        <b>ที่อยู่ตามทะเบียนบ้าน <span class="text-red">*</span></b>
                    </v-col>
                    <v-col>
                        <FormsHouseRegistration />
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="3">
                        <b>ที่อยู่ปัจจุบัน <span class="text-red">*</span></b>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col cols="12">
                                <v-checkbox
                                    label="ใช้ที่อยู่เดียวกันกับ ที่ตามทะเบียนบ้าน"
                                    hide-details
                                    density="compact"
                                    v-model="currIsHomeland"
                                >
                                </v-checkbox>
                            </v-col>
                            <v-col class="pt-0">
                                <v-expand-transition>
                                    <div v-if="!currIsHomeland">
                                        <FormsHouseRegistration />
                                    </div>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="3">
                        <b>ที่อยู่ฉุกเฉิน <span class="text-red">*</span></b>
                        <p class="text-caption">(ที่สามารถติดต่อได้)</p>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col cols="12" class="pb-0">
                                <v-checkbox
                                    label="ใช้ที่อยู่เดียวกันกับ ที่ตามทะเบียนบ้าน"
                                    hide-details
                                    density="compact"
                                    v-model="emerIsHomeland"
                                >
                                </v-checkbox>
                            </v-col>
                            <v-col cols="12" v-if="!currIsHomeland">
                                <v-checkbox
                                    label="ใช้ที่อยู่เดียวกันกับ ที่อยู่ปัจจุบัน"
                                    hide-details
                                    density="compact"
                                    v-model="emerIsCurrent"
                                >
                                </v-checkbox>
                            </v-col>
                            <v-col>
                                <v-expand-transition>
                                    <div v-if="!emerIsCurrent && !emerIsHomeland">
                                        <FormsHouseRegistration />
                                    </div>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
const currIsHomeland = ref(false)
const emerIsHomeland = ref(false)
const emerIsCurrent = ref(false)

watch(emerIsHomeland, (newValue) => {
    if (newValue === true) {
        emerIsCurrent.value = false
    }
})

watch(emerIsCurrent, (newValue) => {
    if (newValue === true) {
        emerIsHomeland.value = false
    }
})
</script>
