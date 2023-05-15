<template>
    <CandidateBaseCard :title="'ข้อมูลคู่สมรส/บุตร'">
        <template #card-body>
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
                        <v-radio-group v-model="_marriage.status" inline>
                            <v-radio label="โสด" value="โสด"></v-radio>
                            <v-radio label="สมรส" value="สมรส"></v-radio>
                            <v-radio label="หย่า" value="หย่า"></v-radio>
                            <v-radio label="หม้าย" value="หม้าย"></v-radio>
                            <v-radio label="แยก" value="แยก"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4"> จำนวนบุตร (เจ้าตัว) <span class="text-red-darken-1"> *</span></v-col>
                    <v-col cols="6">
                        <v-text-field
                            v-model="_marriage.num_of_chlid"
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
                <FormsChildForm class="my-4" v-for="i in parseInt(_marriage.num_of_chlid)" :key="i" :index="i" />
            </v-container>
            <v-container class="text-body-1">
                <p class="text-h6">บุคคลอ้างอิง</p>
                <p class="pb-6 caption">(บุคคลที่สามารถติดต่อได้ ในกรณีฉุกเฉิน)</p>
                <v-row>
                    <v-col cols="4"> คำนำหน้า <span class="text-red-darken-1"> *</span></v-col>
                    <v-col cols="6">
                        <v-select
                            v-model="_marriage.ref_person.title"
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
                            v-model="_marriage.ref_person.frist_name"
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
                            v-model="_marriage.ref_person.last_name"
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
                            v-model="_marriage.ref_person.relationship"
                            label=""
                            hint="โปรดระบุ"
                            density="compact"
                            variant="outlined"
                            maxLength="50"
                        >
                        </v-text-field>
                    </v-col>
                    <v-col cols="2"> เบอร์ติดต่อ <span class="text-red-darken-1"> *</span></v-col>
                    <v-col cols="4">
                        <v-text-field
                            v-model="_marriage.ref_person.phone_number"
                            label=""
                            hint="โปรดระบุ"
                            density="compact"
                            variant="outlined"
                            maxLength="50"
                        >
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">ที่อยู่บุคคลอ้างอิง<span class="text-red-darken-1"> *</span></v-col>
                    <v-col cols="6">
                        <v-radio-group v-model="_marriage.ref_person.address_option">
                            <v-radio
                                label="ใช้ที่อยู่เดียวกันกับ ที่อยู่ตามทะเบียนบ้าน"
                                value="ใช้ที่อยู่เดียวกันกับ ที่อยู่ตามทะเบียนบ้าน"
                            ></v-radio>
                            <v-radio
                                label="ใช้ที่อยู่เดียวกันกับ ที่อยู่ปัจจุบัน"
                                value="ใช้ที่อยู่เดียวกันกับ ที่อยู่ปัจจุบัน"
                            ></v-radio>
                            <v-radio label="กำหนดเอง" value="กำหนดเอง"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <div id="addintional_address" v-if="_marriage.ref_person.address_option == 'กำหนดเอง'">
                    <v-row>
                        <v-col cols="3"> กำหนดเอง <span class="text-red-darken-1"> *</span></v-col>
                        <v-col cols="2">
                            <v-text-field
                                v-model="_marriage.ref_person.address_detail.address_no"
                                label="บ้านเลขที่ *"
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="10"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="2"
                            ><v-text-field
                                v-model="_marriage.ref_person.address_detail.address_moo"
                                label="หมู่ "
                                density="compact"
                                variant="outlined"
                                maxLength="2"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="2">
                            <v-text-field
                                v-model="_marriage.ref_person.address_detail.address_soi"
                                label="ซอย"
                                density="compact"
                                variant="outlined"
                                maxLength="50"
                            >
                            </v-text-field
                        ></v-col>
                        <v-col cols="2">
                            <v-text-field
                                v-model="_marriage.ref_person.address_detail.address_village"
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
                                v-model="_marriage.ref_person.address_detail.address_road"
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
                                v-model="_marriage.ref_person.address_detail.address_district"
                                label="ตำบล/แขวง *"
                                density="compact"
                                variant="outlined"
                                maxLength="2"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-0">
                        <v-col cols="3"></v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="_marriage.ref_person.address_detail.address_city"
                                label="อำเภอ/เขต *"
                                hint=" โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="10"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col cols="4"
                            ><v-text-field
                                v-model="_marriage.ref_person.address_detail.address_province"
                                label="จังหวัด *"
                                density="compact"
                                variant="outlined"
                                maxLength="2"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="mt-0">
                        <v-col cols="3"></v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="_marriage.ref_person.address_detail.address_postcode"
                                label="รหัสไปรษณีย์ *"
                                hint=" โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="10"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { usePersonalStore } from '../../stores/personal.store'
import { IMarriage } from '~/stores/interface/personal_information.interface'

const personalStore = usePersonalStore()
const _marriage: IMarriage = reactive({
    ...personalStore.$state.marriage,
})
</script>
