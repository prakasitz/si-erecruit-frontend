<template>
    <CandidateBaseCard :title="'ข้อมูลประวัติ'">
        <template #card-body>
            <v-alert border="start" type="info" variant="outlined" icon="mdi-information-outline"
                text="ข้อมูลประวัติ กรุณากรอกประวัติการศึกษา, ประวัติการทำงาน (ที่อื่น / ในมหาวิทยาลัยมหิดล) และสถานภาพการทำงานปัจจุบัน">
            </v-alert>
            <v-container class="text-body-1">
                <p class="pb-6 text-h6"> ประวัติการศึกษา </p>
            </v-container>

            <v-container class="text-body-1">
                <p class="pb-6 text-h6"> ประวัติการทำงาน (ที่อื่น) </p>
            </v-container>

            <v-container class="text-body-1">
                <p class="pb-6 text-h6"> ประวัติการทำงาน
                    (ในมหาวิทยาลัยมหิดล) </p>
            </v-container>

            <v-container class="text-body-1">
                <p class="pb-6 text-h6"> สถานภาพการทำงาน </p>
                <v-row>
                    <v-col cols="4"> ปัจจุบัน </v-col>
                    <v-col>
                        <v-radio-group v-model="job_status" inline>
                            <v-radio label="กำลังทำงาน" value="1"></v-radio>
                            <v-radio label="กำลังศึกษาต่อ" value="2"></v-radio>
                            <v-radio label="ว่างงาน" value="3"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <div id="still_working" class="box-detail" v-if="job_status == '1'">
                    <p class="pb-4 text-h6">รายละเอียดงาน</p>
                    <v-row>
                        <v-col cols="4"> ประเภทของงาน <span class="text-red-darken-1"> *</span></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> ตำแหน่ง <span class="text-red-darken-1"> *</span></v-col>
                        <v-col>
                            <v-text-field label="จำนวนเงิน (บาท)" hint="โปรดระบุ" density="compact" variant="outlined"
                                maxLength="10">
                                <template #append>บาท</template>
                            </v-text-field></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> เงินเดือน <span class="text-red-darken-1"> *</span></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> ระยะเวลา <span class="text-red-darken-1"> *</span></v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="4"> สถานที่ <span class="text-red-darken-1"> *</span></v-col>
                    </v-row>
                </div>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
const job_status = ref('1');

</script>

