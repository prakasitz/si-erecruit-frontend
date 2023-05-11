<template>
    <CandidateBaseCard :title="'ข้อมูลคู่สมรส/บุตร'">
        <template #card-body>
            <v-alert border="start" type="info" variant="outlined" icon="mdi-information-outline"
                text="ข้อมูลภาษี (ถ้ามี) กรุณาระบุค่าลดหย่อนภาษีบุตร และค่าลดหย่อนอื่น ๆ">
            </v-alert>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="4"> สถานภาพการสมรส <span class="text-red-darken-1"> *</span></v-col>

                    <v-col>
                        <v-radio-group inline>
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
                        <v-text-field v-model="num_of_child" label="
                        จำนวน" hint="ไม่มีใส่ 0" density="compact" variant="outlined" maxLength="1">
                            <template #append>คน</template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <FormsChildForm class="my-4" v-for="i in parseInt(num_of_child)" :key="i" :index="i" />
            </v-container>
            <v-container class="text-body-1">
                <p class=" text-h6"> บุคคลอ้างอิง</p>
                <p class="pb-6 caption">(บุคคลที่สามารถติดต่อได้
                    ในกรณีฉุกเฉิน) </p>
                <v-row>
                    <v-col cols="4"> คำนำหน้า <span class="text-red-darken-1"> *</span></v-col>
                    <v-col cols="6">
                        <v-select density="compact" variant="outlined" label="Select"
                            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"></v-select>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="4"> ชื่อ-นามสกุล (ไทย) <span class="text-red-darken-1"> *</span></v-col>
                    <v-col cols="4">
                        <v-text-field label="ชื่อ" hint="โปรดระบุ" density="compact" variant="outlined" maxLength="50">
                        </v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field label="นามสกุล" hint="โปรดระบุ" density="compact" variant="outlined" maxLength="50">
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="4"> ความสัมพันธ์ <span class="text-red-darken-1"> *</span></v-col>
                    <v-col cols="6">
                        <v-text-field label="ความสัมพันธ์" hint="โปรดระบุ" density="compact" variant="outlined"
                            maxLength="50">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">ที่อยู่บุคคลอ้างอิง<span class="text-red-darken-1">
                            *</span></v-col>
                    <v-col cols="6">
                        <v-radio-group v-model="ref_address">
                            <v-radio label="ใช้ที่อยู่เดียวกันกับ ที่อยู่ตามทะเบียนบ้าน"
                                value="ใช้ที่อยู่เดียวกันกับ ที่อยู่ตามทะเบียนบ้าน"></v-radio>
                            <v-radio label="ใช้ที่อยู่เดียวกันกับ ที่อยู่ปัจจุบัน"
                                value="ใช้ที่อยู่เดียวกันกับ ที่อยู่ปัจจุบัน"></v-radio>
                            <v-radio label="กำหนดเอง" value="กำหนดเอง"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <div id="addintional_address" v-if="ref_address == 'กำหนดเอง'">
                    <v-row>
                        <v-col cols="4"> กำหนดเอง <span class="text-red-darken-1">
                                *</span></v-col>
                        <v-col cols="2"> <v-text-field label="บ้านเลขที่ *" hint="โปรดระบุ" density="compact"
                                variant="outlined" maxLength="10">
                            </v-text-field> </v-col>
                        <v-col cols="2"><v-text-field label="หมู่ " density="compact" variant="outlined" maxLength="2">
                            </v-text-field> </v-col>
                        <v-col cols="2"> <v-text-field label="หมู่บ้าน" density="compact" variant="outlined" maxLength="50">
                            </v-text-field></v-col>
                        <v-col cols="2"> <v-text-field label="หมู่บ้าน" density="compact" variant="outlined" maxLength="50">
                            </v-text-field></v-col>
                    </v-row>
                    <v-row class="mt-0">
                        <v-col cols="4"></v-col>
                        <v-col cols="4"> <v-text-field label="ถนน" hint=" โปรดระบุ" density="compact" variant="outlined"
                                maxLength="10">
                            </v-text-field> </v-col>
                        <v-col cols="4"><v-text-field label="ตำบล/แขวง *" density="compact" variant="outlined"
                                maxLength="2">
                            </v-text-field> </v-col>
                    </v-row>
                    <v-row class="mt-0">
                        <v-col cols="4"></v-col>
                        <v-col cols="4"> <v-text-field label="อำเภอ/เขต *" hint=" โปรดระบุ" density="compact"
                                variant="outlined" maxLength="10">
                            </v-text-field> </v-col>
                        <v-col cols="4"><v-text-field label="จังหวัด *" density="compact" variant="outlined" maxLength="2">
                            </v-text-field> </v-col>
                    </v-row>
                    <v-row class="mt-0">
                        <v-col cols="4"></v-col>
                        <v-col cols="4"> <v-text-field label="รหัสไปรษณีย์ *" hint=" โปรดระบุ" density="compact"
                                variant="outlined" maxLength="10">
                            </v-text-field> </v-col>
                        <v-col cols="4"><v-text-field label="เบอร์ติดต่อ *" density="compact" variant="outlined"
                                maxLength="2">
                            </v-text-field> </v-col>
                    </v-row>
                </div>


            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
const num_of_child = ref('1')
const ref_address = ref('กำหนดเอง')
</script>
