<template>
    <CandidateBaseCard :title="'ข้อมูลภาษี'">
        <template #card-body>
            <v-container class="text-body-1">
                <p class="pb-6 text-h6"> ค่าลดหย่อนภาษีบุตร </p>
                <v-row>
                    <v-col cols="4">
                        <p> จำนวนบุตร <span class="text-red-darken-1"> *</span> </p>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field v-model="_child_tax.num_of_child" label="จำนวนบุตร" hint="หากไม่มีใส่ 0"
                            density="compact" variant="outlined" maxLength="1">
                            <template #append>คน</template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <div id="had_chlids" v-if="_child_tax.num_of_child > 0">
                    <v-row>
                        <v-col cols="4">
                            <p>จำนวนบุตรที่ยังไม่เข้าโรงเรียน <span class="text-red-darken-1">*</span> </p>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="_child_tax.chlid_nonschool" label="จำนวน" hint="หากไม่มีใส่ 0"
                                density="compact" variant="outlined" maxLength="1">
                                <template #append>คน</template></v-text-field>
                        </v-col>


                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <p> จำนวนบุตรที่กำลังศึกษาอยู่ <span class="text-red-darken-1">* </span></p>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="_child_tax.chlid_school" label="จำนวน" hint="หากไม่มีใส่ 0"
                                density="compact" variant="outlined" maxLength="1"> <template
                                    #append>คน</template></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4">
                            <p> จำนวนบุตรที่จบการศึกษาแล้ว <span class="text-red-darken-1">* </span></p>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field v-model="_child_tax.chlid_nonschool" l label="จำนวน" hint="หากไม่มีใส่ 0"
                                density="compact" variant="outlined" maxLength="1">
                                <template #append>คน</template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
            <v-divider class="my-2"></v-divider>
            <v-container class="text-body-1">
                <p class="pb-6 text-h6"> ค่าลดหย่อนอื่น ๆ </p>
                <v-row id="loan">
                    <v-col cols="4">
                        <p> ดอกเบี้ยเงินกู้ยืม <span class="text-red-darken-1"> *</span> </p>
                    </v-col>
                    <v-col cols="2">
                        <v-radio-group v-model="_other_tax.loan" inline>
                            <v-radio label="ไม่มี" value="N"></v-radio>
                            <v-radio label="มี" value="Y"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col v-if="_other_tax.loan == 'Y'">
                        <v-text-field v-model="_other_tax.loan_amount" label="จำนวนเงิน (บาท)" hint="โปรดระบุ"
                            density="compact" variant="outlined" maxLength="10">
                            <template #append>บาท</template>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row id="insurance">
                    <v-col cols="4">
                        <p> เบี้ยประกันชีวิต (เจ้าตัว) <span class="text-red-darken-1"> *</span> </p>
                    </v-col>
                    <v-col cols="2">
                        <v-radio-group v-model="_other_tax.insurance" inline>
                            <v-radio label="ไม่มี" value="N"></v-radio>
                            <v-radio label="มี" value="Y"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col v-if="_other_tax.insurance == 'Y'">
                        <v-text-field v-model="_other_tax.insurance_amount" label="จำนวนเงิน (บาท)" hint="โปรดระบุ"
                            density="compact" variant="outlined" maxLength="10">
                            <template #append>บาท</template>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row id="donated">
                    <v-col cols="4">
                        <p> เบี้ยประกันชีวิต (เจ้าตัว) <span class="text-red-darken-1"> *</span> </p>
                    </v-col>
                    <v-col cols="2">
                        <v-radio-group v-model="_other_tax.donate" inline>
                            <v-radio label="ไม่มี" value="N"></v-radio>
                            <v-radio label="มี" value="Y"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col v-if="_other_tax.donate == 'Y'">
                        <v-text-field v-model="_other_tax.donate_amount" label="จำนวนเงิน (บาท)" hint="โปรดระบุ"
                            density="compact" variant="outlined" maxLength="10">
                            <template #append>บาท</template>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row id="fund">
                    <v-col cols="4">
                        <p> เงินบริจาค <span class="text-red-darken-1"> *</span>
                        </p>
                    </v-col>
                    <v-col cols="2">
                        <v-radio-group v-model="_other_tax.fund" inline>
                            <v-radio label="ไม่มี" value="N"></v-radio>
                            <v-radio label="มี" value="Y"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col v-if="_other_tax.fund == 'Y'">
                        <v-text-field v-model="_other_tax.fund_amount" label="จำนวนเงิน (บาท)" hint="โปรดระบุ"
                            density="compact" variant="outlined" maxLength="10">
                            <template #append>บาท</template>
                        </v-text-field>
                    </v-col>
                </v-row>

                <v-row id="marriage">
                    <v-col cols="4">
                        <p> เงินได้คู่สมรส <span class="text-red-darken-1"> *</span>
                        </p>
                    </v-col>
                    <v-col cols="6">
                        <v-radio-group v-model="_other_tax.marriage_income">
                            <v-radio label="คู่สมรสไม่มีรายได้" value="1"></v-radio>
                            <v-radio label="คู่สมรสมีรายได้ ไม่ลดหย่อนบุตร" value="2"></v-radio>
                            <v-radio label="คู่สมรสมีรายได้ ลดหย่อนบุตร" value="3"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
                <v-row v-if="_other_tax.marriage_income == '1'">
                    <v-col cols="4"> เบี้ยประกันชีวิต (คู่สมรส) กรณีไม่มีเงินรายได้ <span class="text-red-darken-1">
                            *</span></v-col>
                    <v-col cols="2">
                        <v-radio-group v-model="_other_tax.marriage_insurance" inline>
                            <v-radio label="ไม่มี" value="N"></v-radio>
                            <v-radio label="มี" value="Y"></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col v-if="_other_tax.marriage_insurance == 'Y'">
                        <v-text-field v-model="_other_tax.marriage_insurance_amount" label="จำนวนเงิน (บาท)" hint="โปรดระบุ"
                            density="compact" variant="outlined" maxLength="10">
                            <template #append>บาท</template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'



const _child_tax: _child_tax = reactive({
    num_of_child: 0,
    chlid_nonschool: 0,
    chlid_school: 0,
    chlid_endschool: 0,
})


const _other_tax: other_tax = reactive({
    loan: "N",
    loan_amount: 0,
    insurance: "N",
    insurance_amount: 0,
    donate: "N",
    donate_amount: 0,
    fund: "N",
    fund_amount: 0,
    marriage_income: '1',
    marriage_insurance: "N",
    marriage_insurance_amount: 0,
    parent_support: "N",
    parent_support_amount: 0,
})

interface _child_tax {
    num_of_child: number
    chlid_nonschool: number
    chlid_school: number
    chlid_endschool: number
}

interface other_tax {
    loan: string
    loan_amount: number
    insurance: string
    insurance_amount: number
    donate: string
    donate_amount: number
    fund: string
    fund_amount: number
    marriage_income: string //(1= มีรายได้ 2=คู่สมรสมีรายได้ ไม่ลดหย่อนบุตร 3=คู่สมรสมีรายได้ ลดหย่อนบุตร)
    marriage_insurance: string
    marriage_insurance_amount: number
    parent_support: string
    parent_support_amount: number
}

</script>