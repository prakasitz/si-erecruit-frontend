<template>
    <CandidateBaseCard :title="'ข้อมูลอื่น ๆ'">
        <template #card-body>
            <v-alert
                border="start"
                type="info"
                variant="outlined"
                icon="mdi-information-outline"
                text="ข้อมูลอื่น ๆ (ถ้ามี) กรุณาระบุความสามารถพิเศษ และผลงานทางวิชาการ ๆ"
            >
            </v-alert>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="2">
                        <b>ความสามารถพิเศษ</b>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col cols="3"> พิมพ์ดีด </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="talent.typing_th"
                                    density="compact"
                                    type="number"
                                    hide-details
                                    variant="outlined"
                                >
                                    <template #prepend>
                                        <div class="label-field-top">ไทย</div>
                                    </template>
                                    <template #append>
                                        <div class="label-field-top">คำ/นาที</div>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <v-text-field
                                    v-model="talent.typing_en"
                                    density="compact"
                                    type="number"
                                    hide-details
                                    variant="outlined"
                                >
                                    <template #prepend>
                                        <div class="label-field-top">อังกฤษ</div>
                                    </template>
                                    <template #append>
                                        <div class="label-field-top">คำ/นาที</div>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">โปรแกรมคอมพิวเตอร์</v-col>
                            <v-col>
                                <v-textarea
                                    v-model="talent.computer_programs"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"
                                ><b>ภาษาอังกฤษ <span class="text-red">*</span></b>
                            </v-col>
                            <v-col>
                                <FormsLanguageForm
                                    :language-form-model="talent.eng_language_details"
                                ></FormsLanguageForm>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"><b>คะแนนการทดสอบภาษาอังกฤษ</b> </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="talent.language_test"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                >
                                    <template #prepend> ทำได้ </template>
                                    <template #append> คะแนน </template>
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="talent.language_score"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                >
                                    <template #prepend> จาก </template>
                                    <template #append> คะแนน </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3"><b>ภาษาอื่น</b> </v-col>
                            <v-col>
                                <v-row>
                                    <v-col cols="3"> โปรดระบุ </v-col>
                                    <v-col>
                                        <v-text-field
                                            v-model="talent.other_language"
                                            density="compact"
                                            variant="outlined"
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <FormsLanguageForm
                                    :language-form-model="talent.other_language_details"
                                ></FormsLanguageForm>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">กีฬา</v-col>
                            <v-col>
                                <v-textarea
                                    v-model="talent.sports"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">ใบขับขี่รถยนต์</v-col>
                            <v-col>
                                <v-text-field
                                    v-model="talent.driver_license"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="3">ความสามารถพิเศษอื่นๆ</v-col>
                            <v-col>
                                <v-textarea
                                    v-model="talent.other_talents"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider class="my-2"></v-divider>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="2"><b>ผลงานทางวิชาการ</b></v-col>
                    <v-col>
                        <v-row>
                            <v-col>
                                <v-alert
                                    border="start"
                                    type="info"
                                    variant="outlined"
                                    icon="mdi-information-outline"
                                    text="ผลงานแสดงความรู้ความเชี่ยวชาญที่เกี่ยวข้องกับตำแหน่งที่สมัคร หรืออื่นๆ (ถ้ามี)"
                                >
                                </v-alert>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-textarea
                                    v-model="talent.specialization"
                                    density="compact"
                                    variant="outlined"
                                    hide-details
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <v-divider class="my-2"></v-divider>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="2"><b>ทราบประกาศรับสมัครจาก</b></v-col>
                    <v-col>
                        <v-radio-group v-model="talent.announced_from">
                            <v-radio label="บุคคลภายในมหาวิทยาลัย" value="hello"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { usePersonalStore } from '~/stores/personal.store'

const announced_from = 'hello'
const personalStore = usePersonalStore()
const { talent } = personalStore
</script>
