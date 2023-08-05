<template>
    <CandidateBaseCard :candidate-form="props.candidateForm" :form-page="{ form: formMarriage }">
        <template #card-body>
            <v-form ref="formMarriage">
                <v-alert
                    border="start"
                    type="info"
                    variant="outlined"
                    icon="mdi-information-outline"
                    text="ข้อมูลภาษี (ถ้ามี) กรุณาระบุค่าลดหย่อนภาษีบุตร และค่าลดหย่อนอื่น ๆ"
                >
                </v-alert>
                <v-container class="text-body-1">
                    <v-row>
                        <v-col cols="4"> สถานภาพการสมรส <span class="text-red-darken-1"> *</span></v-col>
                        <v-col>
                            <v-radio-group :rules="rules_fieldEmpty" v-model="marriage.status" inline>
                                <v-radio label="โสด" value="1"></v-radio>
                                <v-radio label="สมรส" value="2"></v-radio>
                                <v-radio label="หย่า" value="3"></v-radio>
                                <v-radio label="หม้าย" value="4"></v-radio>
                                <v-radio label="แยก" value="5"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-expand-transition>
                        <v-row v-if="marriage.status !== '1'">
                            <v-col cols="4"> จำนวนบุตร (เจ้าตัว) <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="6">
                                <v-text-field
                                    :rules="rules_fieldEmpty"
                                    v-model="marriage.num_of_chlid"
                                    label="จำนวน"
                                    hint="ไม่มีใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="1"
                                >
                                    <template #append>คน</template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-expand-transition>
                    <FormsChildForm class="my-4" v-for="i in parseInt(marriage.num_of_chlid)" :key="i" :index="i" />
                </v-container>
                <v-divider></v-divider>
                <v-container class="text-body-1">
                    <p class="text-h6">บุคคลอ้างอิง</p>
                    <p class="pb-6 caption">(บุคคลที่สามารถติดต่อได้ ในกรณีฉุกเฉิน)</p>
                    <v-row>
                        <v-col cols="4"> คำนำหน้า <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-select
                                :rules="rules_fieldEmpty"
                                v-model="marriage.ref_person.title"
                                density="compact"
                                variant="outlined"
                                :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                            ></v-select>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="4"> ชื่อ-นามสกุล (ไทย) <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="4">
                            <v-text-field
                                :rules="rules_fieldEmpty"
                                v-model="marriage.ref_person.frist_name"
                                label="ชื่อ"
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="50"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                :rules="rules_fieldEmpty"
                                v-model="marriage.ref_person.last_name"
                                label="นามสกุล"
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="50"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="3"> ความสัมพันธ์ <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="3">
                            <v-text-field
                                v-model="marriage.ref_person.relationship"
                                label=""
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="50"
                                :rules="rules_fieldEmpty"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="2"> เบอร์ติดต่อ <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="marriage.ref_person.phone_number"
                                label=""
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="50"
                                :rules="rules_fieldEmpty"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">ที่อยู่บุคคลอ้างอิง<span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="marriage.ref_person.ref_same_address" >
                                <v-radio
                                    label="ใช้ที่อยู่เดียวกันกับ ที่อยู่ตามทะเบียนบ้าน"
                                    :value="0"
                                ></v-radio>
                                <v-radio
                                    label="ใช้ที่อยู่เดียวกันกับ ที่อยู่ปัจจุบัน"
                                    :value="1"
                                ></v-radio>
                                <v-radio label="กำหนดเอง" :value="null"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>

                    <div id="addintional_address" v-if="marriage.ref_person.ref_same_address == null">
                        <v-row>
                            <v-col cols="3"> กำหนดเอง <span class="text-red-darken-1"> *</span></v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="marriage.ref_person.address_detail.address_no"
                                    label="บ้านเลขที่ *"
                                    hint="โปรดระบุ"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="10"
                                    :rules="rules_fieldEmpty"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="2"
                                ><v-text-field
                                    v-model="marriage.ref_person.address_detail.address_moo"
                                    label="หมู่ "
                                    density="compact"
                                    variant="outlined"
                                    maxLength="2"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="marriage.ref_person.address_detail.address_soi"
                                    label="ซอย"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="50"
                                >
                                </v-text-field
                            ></v-col>
                            <v-col cols="2">
                                <v-text-field
                                    v-model="marriage.ref_person.address_detail.address_village"
                                    label="หมู่บ้าน"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="50"
                                >
                                </v-text-field
                            ></v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="3"></v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="marriage.ref_person.address_detail.address_road"
                                    label="ถนน"
                                    hint=" โปรดระบุ"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="10"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="4"
                                ><v-text-field
                                    v-model="marriage.ref_person.address_detail.address_district"
                                    label="ตำบล/แขวง *"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="2"
                                    :rules="rules_fieldEmpty"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="3"></v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="marriage.ref_person.address_detail.address_city"
                                    label="อำเภอ/เขต *"
                                    hint=" โปรดระบุ"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="10"
                                    :rules="rules_fieldEmpty"
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="4"
                                ><v-text-field
                                    v-model="marriage.ref_person.address_detail.address_province"
                                    label="จังหวัด *"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="2"
                                    :rules="rules_fieldEmpty"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="mt-0">
                            <v-col cols="3"></v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="marriage.ref_person.address_detail.address_postcode"
                                    label="รหัสไปรษณีย์ *"
                                    hint=" โปรดระบุ"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="10"
                                    :rules="rules_fieldEmpty"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
            </v-form>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePersonalStore } from '../../stores/personal.store'

import { CandidateForm } from '~/utils/types'
import { address } from '~/stores/interface/personal_information.interface';
const props = defineProps<{
    candidateForm: CandidateForm
}>()

const { rules_fieldEmpty } = useFillRules()
const formMarriage: Ref<HTMLFormElement | null> = ref<HTMLFormElement | null>(null)

const personalStore = usePersonalStore()
const { marriage, useCurAddressOnRefAddress, useRegAddressOnRefAddress } = personalStore

watch(marriage.ref_person, ({ref_same_address}) => {
    if (ref_same_address === true) {
        useCurAddressOnRefAddress()
    } else if (ref_same_address === false) {
        useRegAddressOnRefAddress()
    } else {
        marriage.ref_person.address_detail = deepCopy(defaultAddress) as address
    }
}, {
    deep: true
})
</script>
