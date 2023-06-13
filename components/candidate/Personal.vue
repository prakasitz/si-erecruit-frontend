<template>
    <CandidateBaseCard :title="'ข้อมูลส่วนบุคคล'">
        <template #card-body>
            <!-- คำนำหน้า พิเศษ -->
            <v-container class="text-body-1">
                <v-row>
                    <!-- คำนำหน้า พิเศษ -->
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ยศ/ราชทินนาม</p>
                            </v-col>
                            <v-col cols="8">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    v-model="personal_info.title_conferrend"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ตำแหน่งทางวิชาชีพ</p>
                            </v-col>
                            <v-col cols="8">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    v-model="personal_info.title_spacial"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ตำแหน่งทางวิชาการ</p>
                            </v-col>
                            <v-col cols="8">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    v-model="personal_info.title_academic"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ยศทางทหาร</p>
                            </v-col>
                            <v-col cols="8">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                    v-model="personal_info.title_milirtary"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <!-- ชื่อ-นามสกุล ไทย -->
            <v-container class="text-body-1">
                <v-row>
                    <!-- ชื่อ-นามสกุล ไทย -->
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>คำนำหน้า <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-radio-group
                                    v-model="personal_info.title_name_th"
                                    class="label-field-top"
                                    inline
                                    persistent-hint
                                    hint="กรุณาเลือกคำนำหน้า"
                                >
                                    <v-radio class="mr-4" label="นาย" value="1"></v-radio>
                                    <v-radio class="mr-4" label="นาง" value="2"></v-radio>
                                    <v-radio class="mr-4" label="นางสาว" value="3"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ชื่อ (ภาษาไทย) <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.first_name_th"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>นามสกุล (ภาษาไทย) <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.last_name_th"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ชื่อเล่น <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.nickname_th"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <!-- ชื่อ-นามสกุล อังกฤษ -->
            <v-container class="text-body-1">
                <v-row>
                    <!-- ชื่อ-นามสกุล อังกฤษ -->
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>คำนำหน้า <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-radio-group 
                                v-model="personal_info.title_name_en"
                                class="label-field-top" inline persistent-hint hint="กรุณาเลือกคำนำหน้า">
                                    <v-radio class="mr-4" label="Mr." value="1"></v-radio>
                                    <v-radio class="mr-4" label="Mrs." value="2"></v-radio>
                                    <v-radio class="mr-4" label="Miss" value="3"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ชื่อ (ภาษาอังกฤษ) <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.first_name_en"
                                    density="compact"
                                    variant="outlined"
                                    persistent-hint
                                    hint="ตัวพิมพ์ใหญ่"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>นามสกุล (ภาษาอังกฤษ) <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.last_name_en"
                                    density="compact"
                                    variant="outlined"
                                    persistent-hint
                                    hint="ตัวพิมพ์ใหญ่"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <!-- email / วันเดือนปีเกิด / จังหวัดที่เกิด -->
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>อีเมล์<span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.email_address"
                                    type="email"
                                    placeholder="siriraj@gmail.com"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>วัน/เดือน/ปี เกิด<span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="3">
                                <VueDatePicker
                                    :flow="flow"
                                    :max-date="getMaxBirthDate()"
                                    :start-date="getMaxBirthDate()"
                                    :enable-time-picker="false"
                                    v-model="personal_info.birth_date"
                                />
                            </v-col>
                            <v-col cols="3">
                                <v-text-field
                            
                                    density="compact"
                                    variant="outlined"
                                    :value="calculateAge().years"            
                                    readonly
                                >
                                    <template #prepend>
                                        <div class="label-field-top">อายุ</div>
                                    </template>
                                    <template #append>
                                        <div class="label-field-top">ปี</div>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-text-field
                                    
                                    density="compact"
                                    variant="outlined"
                                    
                                    :value="calculateAge().months"
                                    
                                    readonly
                                >
                                    <template #append>
                                        <div class="label-field-top">เดือน</div>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>จังหวัดที่เกิด</p>
                            </v-col>
                            <v-col cols="8">
                                <v-autocomplete
                                    v-model="personal_info.province_when"
                                    label="กรุณาเลือก"
                                    variant="outlined"
                                    density="compact"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <!-- บัตรประชาชน -->
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>บัตรประจำตัวประชาชน<span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.id_card_number"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>สถานที่ออกบัตร<span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="personal_info.id_card_amphur"
                                    density="compact"
                                    variant="outlined"
                                >
                                    <template #prepend>
                                        <div class="label-field-top">อำเภอ/เขต</div>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-autocomplete
                                    v-model="personal_info.id_card_province"
                                    label="กรุณาเลือก"
                                    variant="outlined"
                                    density="compact"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                >
                                    <template #prepend>
                                        <div class="label-field-top">จังหวัด</div>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>วันที่ออกบัตร <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.id_card_issue_date"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>วันที่บัตรหมดอายุ <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    v-model="personal_info.id_card_expire_date"
                                    density="compact"
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <!-- ส่วนสูง น้ำหนัก หมู่โลหิต -->
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ส่วนสูง <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="personal_info.height"
                                    density="compact"
                                    placeholder="0.00"
                                    variant="outlined"
                                    suffix="เซนติเมตร"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>น้ำหนัก <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="personal_info.weight"
                                    density="compact"
                                    placeholder="0.00"
                                    variant="outlined"
                                    suffix="กิโลกรัม"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>หมู่โลหิต <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-radio-group 
                                v-model="personal_info.blood_type" 
                                class="label-field-top" inline hide-details>
                                    <v-radio class="mr-4" label="A" value="1"></v-radio>
                                    <v-radio class="mr-4" label="AB" value="2"></v-radio>
                                    <v-radio class="mr-4" label="B" value="3"></v-radio>
                                    <v-radio class="mr-4" label="O" value="3"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>

            <!-- ส่วนสูง น้ำหนัก หมู่โลหิต -->
            <v-container class="mb-6 text-body-1">
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>สัญชาติ <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-autocomplete
                                    v-model="personal_info.nationality"
                                    label="กรุณาเลือก"
                                    variant="outlined"
                                    density="compact"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>เชื้อชาติ <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <v-autocomplete
                                    v-model="personal_info.race"
                                    label="กรุณาเลือก"
                                    variant="outlined"
                                    density="compact"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                ></v-autocomplete>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ศาสนา <span class="text-red">*</span></p>
                            </v-col>
                            <v-col>
                                <v-radio-group
                                    v-model="personal_info.religion"
                                    class="label-field-top"
                                    inline
                                    hide-details
                                >
                                    <v-radio class="mr-4" label="พุทธ" value="1"></v-radio>
                                    <v-radio class="mr-4" label="คริสต์" value="2"></v-radio>
                                    <v-radio class="mr-4" label="อิสลาม" value="3"></v-radio>
                                    <v-radio class="mr-4" label="ฮินดู" value="4"></v-radio>
                                    <v-radio class="mr-4" label="ไม่ระบุ" value="5"></v-radio>
                                </v-radio-group>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { usePersonalStore } from '../../stores/personal.store'
import { storeToRefs } from 'pinia'

const personalStore = usePersonalStore()
const { calculateAge } = storeToRefs(personalStore)
const { personal_info } = personalStore


const flow = useDatePickerFlow()
const getMaxBirthDate = () => {
    let fifteenYearsAgo = new Date()
    fifteenYearsAgo.setFullYear(fifteenYearsAgo.getFullYear() - 15)
    return fifteenYearsAgo
}

const hints = {
    bloodInfo: 'hint: กรุณาเลือกหมู่โลหิต',
    religionInfo: 'hint: กรุณาเลือกศาสนา',
}
</script>
