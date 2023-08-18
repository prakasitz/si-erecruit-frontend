<template>
    <CandidateBaseCard :candidate-form="props.candidateForm" :form-page="{ form: formTax }">
        <template #card-body>
            <v-form ref="formTax">
                <v-alert
                    border="start"
                    type="info"
                    variant="outlined"
                    icon="mdi-information-outline"
                    text="ข้อมูลภาษี (ถ้ามี) กรุณาระบุค่าลดหย่อนภาษีบุตร และค่าลดหย่อนอื่น ๆ"
                >
                </v-alert>
                <v-container class="text-body-1">
                    <p class="pb-6 text-h6">ค่าลดหย่อนภาษีบุตร</p>
                    <v-row>
                        <v-col cols="4">
                            <p>จำนวนบุตร <span class="text-red-darken-1"> *</span></p>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="tax.num_of_child"
                                label="จำนวนบุตร"
                                hint="หากไม่มีใส่ 0"
                                persistent-hint
                                density="compact"
                                variant="outlined"
                                maxLength="1"
                                :rules="rules_fieldEmpty"
                            >
                                <template #append>คน</template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <div id="had_chlids" v-if="tax.num_of_child > 0">
                        <v-row>
                            <v-col cols="4">
                                <p>จำนวนบุตรที่ยังไม่เข้าโรงเรียน <span class="text-red-darken-1">*</span></p>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="tax.chlid_nonschool"
                                    label="จำนวน"
                                    hint="หากไม่มีใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="1"
                                    :rules="rules_fieldEmpty"
                                >
                                    <template #append>คน</template></v-text-field
                                >
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <p>จำนวนบุตรที่กำลังศึกษาอยู่ <span class="text-red-darken-1">* </span></p>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="tax.chlid_school"
                                    label="จำนวน"
                                    hint="หากไม่มีใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="1"
                                    :rules="rules_fieldEmpty"
                                >
                                    <template #append>คน</template></v-text-field
                                >
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <p>จำนวนบุตรที่จบการศึกษาแล้ว <span class="text-red-darken-1">* </span></p>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    v-model="tax.chlid_endschool"
                                    label="จำนวน"
                                    hint="หากไม่มีใส่ 0"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="1"
                                    :rules="rules_fieldEmpty"
                                >
                                    <template #append>คน</template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
                <v-divider class="my-2"></v-divider>
                <v-container class="text-body-1">
                    <p class="pb-6 text-h6">ค่าลดหย่อนอื่น ๆ</p>
                    <v-row id="loan">
                        <v-col cols="4">
                            <p>ดอกเบี้ยเงินกู้ยืม <span class="text-red-darken-1"> *</span></p>
                        </v-col>
                        <v-col cols="3">
                            <v-radio-group v-model="tax.loan" inline>
                                <v-radio label="ไม่มี" value="ไม่มี"></v-radio>
                                <v-radio label="มี" value="มี"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col v-if="tax.loan == 'มี'">
                            <v-text-field
                                v-model="tax.loan_amount"
                                label="จำนวนเงิน (บาท)"
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="10"
                                :rules="rules_fieldEmpty"
                            >
                                <template #append>บาท</template>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row id="insurance">
                        <v-col cols="4">
                            <p>เบี้ยประกันชีวิต (เจ้าตัว) <span class="text-red-darken-1"> *</span></p>
                        </v-col>
                        <v-col cols="3">
                            <v-radio-group v-model="tax.insurance" inline>
                                <v-radio label="ไม่มี" value="ไม่มี"></v-radio>
                                <v-radio label="มี" value="มี"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col v-if="tax.insurance == 'มี'">
                            <v-text-field
                                v-model="tax.insurance_amount"
                                label="จำนวนเงิน (บาท)"
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="10"
                                :rules="rules_fieldEmpty"
                            >
                                <template #append>บาท</template>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row id="donated">
                        <v-col cols="4">
                            <p>เงินบริจาค <span class="text-red-darken-1"> *</span></p>
                        </v-col>
                        <v-col cols="3">
                            <v-radio-group v-model="tax.donate" inline>
                                <v-radio label="ไม่มี" value="ไม่มี"></v-radio>
                                <v-radio label="มี" value="มี"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col v-if="tax.donate == 'มี'">
                            <v-text-field
                                v-model="tax.donate_amount"
                                label="จำนวนเงิน (บาท)"
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="10"
                                :rules="rules_fieldEmpty"
                            >
                                <template #append>บาท</template>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row id="fund">
                        <v-col cols="4">
                            <p>เงินกองทุน <span class="text-red-darken-1"> *</span></p>
                        </v-col>
                        <v-col cols="3">
                            <v-radio-group v-model="tax.fund" inline>
                                <v-radio label="ไม่มี" value="ไม่มี"></v-radio>
                                <v-radio label="มี" value="มี"></v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col v-if="tax.fund == 'มี'">
                            <v-text-field
                                v-model="tax.fund_amount"
                                label="จำนวนเงิน (บาท)"
                                hint="โปรดระบุ"
                                density="compact"
                                variant="outlined"
                                maxLength="10"
                                :rules="rules_fieldEmpty"
                            >
                                <template #append>บาท</template>
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row id="marriage">
                        <v-col cols="4">
                            <p>เงินได้คู่สมรส <span class="text-red-darken-1"> *</span></p>
                        </v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="tax.marriage_income">
                                <v-radio label="คู่สมรสไม่มีรายได้" value="คู่สมรสไม่มีรายได้"></v-radio>
                                <v-radio label="คู่สมรสมีรายได้ ไม่ลดหย่อนบุตร" value="คู่สมรสมีรายได้ ไม่ลดหย่อนบุตร"></v-radio>
                                <v-radio label="คู่สมรสมีรายได้ ลดหย่อนบุตร" value="คู่สมรสมีรายได้ ลดหย่อนบุตร"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                    <v-expand-transition>
                        <v-row v-if="tax.marriage_income == 'คู่สมรสไม่มีรายได้'">
                            <v-col cols="4">
                                เบี้ยประกันชีวิต (คู่สมรส) กรณีไม่มีเงินรายได้
                                <span class="text-red-darken-1"> *</span></v-col
                            >
                            <v-col cols="3">
                                <v-radio-group v-model="tax.marriage_insurance" inline>
                                    <v-radio label="ไม่มี" value="ไม่มี"></v-radio>
                                    <v-radio label="มี" value="มี"></v-radio>
                                </v-radio-group>
                            </v-col>
                            <v-col v-if="tax.marriage_insurance == 'มี'">
                                <v-text-field
                                    v-model="tax.marriage_insurance_amount"
                                    label="จำนวนเงิน (บาท)"
                                    hint="โปรดระบุ"
                                    density="compact"
                                    variant="outlined"
                                    maxLength="10"
                                    :rules="rules_fieldEmpty"
                                >
                                    <template #append>บาท</template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-expand-transition>
                    <v-row>
                        <v-col cols="4">
                            <p>ค่าอุปการะเลี้ยงดูบิดามารดา <span class="text-red-darken-1"> *</span></p>
                        </v-col>
                        <v-col cols="6">
                            <v-radio-group v-model="tax.parent_support">
                                <v-radio label="ไม่มี" value="ไม่มี"></v-radio>
                                <v-radio label="บิดา" value="บิดา"></v-radio>
                                <v-radio label="มารดา" value="มารดา"></v-radio>
                                <v-radio label="บิดาและมารดา" value="บิดาและมารดา"></v-radio>
                            </v-radio-group>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { usePersonalStore } from '../../stores/personal.store'

import { CandidateForm } from '~/utils/types'
const props = defineProps<{
    candidateForm: CandidateForm
}>()

const { rules_fieldEmpty } = useFillRules()
const formTax: Ref<HTMLFormElement | null> = ref<HTMLFormElement | null>(null)

const personalStore = usePersonalStore()
const { tax } = personalStore
</script>
