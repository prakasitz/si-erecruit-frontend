<template>
    <CandidateBaseCard :title="'ข้อมูลที่อยู่/บัญชีธนาคาร'">
        <template #card-body>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="3">
                        <b>ที่อยู่ตามทะเบียนบ้าน <span class="text-red">*</span></b>
                    </v-col>
                    <v-col cols="8">
                        <FormsHouseRegistration />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="3">
                        <b>ที่อยู่ปัจจุบัน <span class="text-red">*</span></b>
                    </v-col>
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="12">
                                <v-checkbox
                                    class="float-left"
                                    label="ใช้ที่อยู่ตามทะเบียนบ้าน"
                                    :hint="hints.followHomeland"
                                    hide-details
                                    density="compact"
                                    v-model="currIsHomeland"
                                    :disabled="!homelandSectionValid"
                                    v-bind="!homelandSectionValid ? ForDisabledCheckBox : undefined"
                                >
                                </v-checkbox>
                            </v-col>
                            <v-col cols="12" class="pt-0">
                                <v-expand-transition>
                                    <div v-if="!currIsHomeland">
                                        <FormsHouseRegistration />
                                    </div>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="3">
                        <b>ที่อยู่ฉุกเฉิน <span class="text-red">*</span></b>
                        <p class="text-caption">(ที่สามารถติดต่อได้)</p>
                    </v-col>
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="6" class="pb-0">
                                <v-checkbox
                                    class="float-left"
                                    label="ใช้ที่อยู่ตามทะเบียนบ้าน"
                                    :hint="hints.followHomeland"
                                    hide-details
                                    density="compact"
                                    v-model="emerIsHomeland"
                                    :disabled="!homelandSectionValid"
                                    v-bind="!homelandSectionValid ? ForDisabledCheckBox : undefined"
                                >
                                </v-checkbox>
                            </v-col>
                            <v-col cols="6" v-if="!currIsHomeland">
                                <v-checkbox
                                    class="float-left"
                                    label="ใช้ที่อยู่ปัจจุบัน"
                                    :hint="hints.followCurrent"
                                    hide-details
                                    density="compact"
                                    v-model="emerIsCurrent"
                                    :disabled="!currSectionValid"
                                    v-bind="!currSectionValid ? ForDisabledCheckBox : undefined"
                                >
                                </v-checkbox>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col cols="12">
                                <v-expand-transition>
                                    <div v-if="!emerIsCurrent && !emerIsHomeland">
                                        <FormsHouseRegistration />
                                    </div>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>โทรศัพท์ (บ้าน)</p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field density="compact" hide-details variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>โทรศัพท์ (มือถือ) <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field density="compact" variant="outlined"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider class="my-2"></v-divider>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="3">
                        <b>หมายเลข<br />ใบประกอบวิชาชีพ</b>
                    </v-col>
                    <v-col cols="8">
                        <v-text-field density="compact" variant="outlined" hide-details></v-text-field>
                    </v-col>
                    <v-col cols="8" offset="3">
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    type="date"
                                    label="ออกให้ ณ วันที่"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    type="date"
                                    variant="outlined"
                                    label="วันที่หมดอายุ"
                                    hint="ไม่มีหรือตลอดชีพ ให้ปล่อยว่าง"
                                    density="compact"
                                    persistent-hint
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider class="my-2"></v-divider>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="3" class="pb-0">
                        <b>
                            บัตรรับรองสิทธิ<br />การรักษาพยาบาล<br />/ เลขที่บัตรประกันสังคม
                            <span class="text-red">*</span>
                        </b>
                    </v-col>
                    <v-col cols="8" class="pb-0">
                        <v-radio-group class="label-field-top" hide-details v-model="hasSocialSecurity">
                            <v-radio class="mr-4" label="ยังไม่มีประกันสังคม" :value="false"></v-radio>
                            <v-radio class="mr-4" label="มีประกันสังคมอยู่แล้ว" :value="true"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" class="pt-0">
                        <v-expand-transition>
                            <v-card flat v-if="hasSocialSecurity">
                                <v-container fluid class="pt-1 py-0">
                                    <v-row no-gutters>
                                        <v-col cols="8" offset="3" class="pb-2">
                                            <v-text-field
                                                variant="outlined"
                                                hide-details
                                                label="เลขที่บัตรประกันสังคม"
                                                density="compact"
                                                :disabled="isSamePersonalID"
                                            >
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="8" offset="3" class="pb-5">
                                            <v-checkbox
                                                class="float-left"
                                                label="ใช้เลขที่เดียวกันกับบัตรประจำตัวประชาชน"
                                                hide-details
                                                density="compact"
                                                v-model="isSamePersonalID"
                                            >
                                            </v-checkbox>
                                        </v-col>
                                        <v-col cols="8" offset="3" class="pb-5">
                                            <v-row>
                                                <v-col>
                                                    <v-text-field
                                                        variant="outlined"
                                                        type="date"
                                                        hide-details
                                                        label="ออกให้ ณ วันที่"
                                                        density="compact"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field
                                                        variant="outlined"
                                                        hide-details
                                                        type="date"
                                                        label="วันที่หมดอายุ"
                                                        density="compact"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        <v-col cols="8" offset="3">
                                            <v-row>
                                                <v-col>
                                                    <v-text-field
                                                        variant="outlined"
                                                        hide-details
                                                        label="โรงพยาบาล *"
                                                        density="compact"
                                                    >
                                                    </v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-autocomplete
                                                        label="จังหวัด *"
                                                        variant="outlined"
                                                        density="compact"
                                                        :items="[
                                                            'California',
                                                            'Colorado',
                                                            'Florida',
                                                            'Georgia',
                                                            'Texas',
                                                            'Wyoming',
                                                        ]"
                                                    ></v-autocomplete>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-expand-transition>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider class="my-2"></v-divider>
            <v-container class="mb-6 text-body-1">
                <v-row>
                    <v-col cols="3">
                        <b>ข้อมูลบัญชีธนาคาร <span class="text-red">*</span></b>
                    </v-col>
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="12">
                                <v-alert
                                    class="text-subtitle-2"
                                    border="start"
                                    type="info"
                                    variant="outlined"
                                    icon="mdi-information-outline"
                                    :text="bankInfoDescription"
                                >
                                </v-alert>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    label="ชื่อบัญชี *"
                                    density="compact"
                                    persistent-hint
                                    :hint="hints.bankName"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    variant="outlined"
                                    label="เลขที่บัญชีเงินฝากออมทรัพย์ *"
                                    density="compact"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
const hints = {
    followHomeland: 'hint: กรุณากรอก ที่อยู่ตามทะเบียนบ้าน *',
    followCurrent: 'hint: กรุณากรอก ที่อยู่ปัจจุบัน *',
    bankName: 'hint: ชื่อบัญชีเดี่ยวเท่านั้น',
}

const bankInfoDescription =
    'เป็นบัญชีที่ใช้สำหรับรับเงินเดือนและค่าตอบแทนต่าง ๆ ธนาคารไทยพาณิชย์ (บัญชีออมทรัพย์) สาขาศิริราช หรือ สาขาในเขตกรุงเทพฯ เท่านั้น (บัญชีที่เปิด ต้องไม่ใช่สาขาในห้างสรรพสินค้า และต้องเป็นชื่อบัญชีของตนเองเท่านั้น)'

const hasSocialSecurity = ref(false)
const isSamePersonalID = ref(false)

const homelandSectionValid = ref(true)
const currSectionValid = ref(true)

const currIsHomeland = ref(false)
const emerIsHomeland = ref(false)
const emerIsCurrent = ref(false)

const ForDisabledCheckBox = reactive({
    'hide-details': false,
    'persistent-hint': true,
})

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
