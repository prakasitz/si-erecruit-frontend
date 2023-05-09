<template>
    <v-row class="mt-6 justify-center" justify="center">
        <v-col cols="12" sm="10" md="8" xl="5">
            <v-card class="py-5 bg-card-candidate">
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="4" sm="3" lg="2">
                            <v-img src="/images/MU_Th_Color.png"></v-img>
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <h1 class="font-weight-black primary--text">SiRecruit</h1>
                        </v-col>
                    </v-row>
                    <v-row justify="center" class="mt-10">
                        <v-col cols="12" sm="8">
                            <v-form v-model="valid" @submit.prevent="userLogin">
                                หมายเลขบัตรประจำตัวประชาชน
                                <div class="text-center">
                                    <v-text-field class="mt-1" variant="outlined"
                                        prepend-inner-icon="mdi-account"></v-text-field>
                                    <p> กรุณากรอกหมายเลขบัตรประจำตัวประชาชน (ตัวเลข 13 หลัก ไม่ต้องมี -)</p>
                                    <p> เพื่อตรวจสอบและลงทะเบียนข้อมูลบุคลากร ด้วยหมายเลขดังกล่าว</p>
                                    <v-btn class="mt-5 btn-candidate" type="submit">
                                        ตรวจสอบข้อมูล
                                    </v-btn>
                                </div>
                            </v-form>
                        </v-col>
                    </v-row>
                    <p class="text-center mt-15 mb-0">
                        <v-icon left>mdi-copyright</v-icon>2023 คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล
                    </p>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { parseCommandLine } from 'typescript';

// This will work in both `<script setup>` and `<script>`
definePageMeta({
    pageTransition: {
        name: 'rotate',
    },
    layout: 'logincandidate',
})
</script>
