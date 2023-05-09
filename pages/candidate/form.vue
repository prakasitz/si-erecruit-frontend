<template>
    <div class="candidate-form">
        <TopicBar :labels="['หนัาหลัก', 'จัดการข้อมูลผู้สมัคร']" />

        <v-row>

            <v-col cols="12">
                <v-card class="mx-auto" width="90%">
                    <v-expansion-panels v-model="panelShow">
                        <v-expansion-panel value="secret">
                            <v-expansion-panel-title class="pl-0 py-0">
                                <v-card-title>
                                    <b>ข้อมูลส่วนตัว</b>
                                </v-card-title>
                                <v-card-subtitle>โปรดตรวจสอบเลขบัตรประชาชนและรหัสผ่านของท่าน</v-card-subtitle>
                            </v-expansion-panel-title>
                            <v-expansion-panel-text>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="7">
                                            <v-text-field
                                                readonly
                                                density="compact"
                                                variant="outlined"
                                                value="1 4098 00357 95 0"
                                                :type="eye1 ? 'text' : 'password'"
                                                :append-icon="eye1 ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append="eye1 = !eye1"
                                                hide-details
                                            >
                                                <template v-slot:prepend>
                                                    <p :style="{ 'font-size': '1.12rem !important' }">
                                                        <b>เลขบัตรประชาชน</b>
                                                    </p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="4">
                                            <v-text-field
                                                readonly
                                                density="compact"
                                                variant="outlined"
                                                value="12345"
                                                :append-icon="eye2 ? 'mdi-eye' : 'mdi-eye-off'"
                                                :type="eye2 ? 'text' : 'password'"
                                                @click:append="eye2 = !eye2"
                                                hide-details
                                            >
                                                <template v-slot:prepend>
                                                    <p :style="{ 'font-size': '1.12rem !important' }">
                                                        <b>รหัสผ่าน</b>
                                                    </p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                        <v-spacer></v-spacer>
                                    </v-row>
                                    <v-row class="mt-5 mb-3 d-flex justify-center">
                                        <v-divider :length="'90%'"></v-divider>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="6">
                                            <v-alert height="100%" border="start" variant="tonal">
                                                <div
                                                    class="text-red-darken-1"
                                                    :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }"
                                                >
                                                    <v-row no-gutters>
                                                        <v-col><b>เข้าสู่ระบบครั้งล่าสุด</b></v-col>
                                                        <v-col cols="8">03/05/2566, 15:42</v-col>
                                                    </v-row>
                                                </div>
                                            </v-alert>
                                        </v-col>
                                        <v-col cols="6">
                                            <v-alert height="100%" border="start" variant="tonal">
                                                <div
                                                    class="text-blue-darken-1"
                                                    :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }"
                                                >
                                                    <v-row no-gutters class="d-flex align-center">
                                                        <v-col cols="3"><b>บันทึกครั้งล่าสุด</b></v-col>
                                                        <v-col cols="">
                                                            <v-row no-gutters>
                                                                <v-col cols="12">03/05/2566, 15:45</v-col>
                                                                <v-col>ระบบจะทำการบันทึกให้อัตโนมัติทุก ๆ 3 นาที</v-col>
                                                            </v-row>
                                                        </v-col>
                                                    </v-row>
                                                </div>
                                            </v-alert>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-expansion-panel-text>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </v-col>

            <v-col cols="12">
                <v-card class="mx-auto" width="90%">
                    <v-container>
                        <v-card-title class="pa-auto text-h5 text-red-darken-2">โปรดสนใจเป็นพิเศษ</v-card-title>
                        <v-card-text>
                            <div class="text-h5 text-indigo-darken-2 mb-2">
                                คำอธิบายสำหรับการกรอกข้อมูล SiRecruit สำหรับตำแหน่งทั่วไป
                            </div>
                            <v-alert class="mb-2" border-color="indigo-darken-2" border="start" variant="text">
                                <v-alert-title class="mb-2 text-h6 text-indigo-darken-2">
                                    การเข้าสู่ระบบและการบันทึกข้อมูล
                                </v-alert-title>
                                <div :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }">
                                    <p class="mb-4">
                                        ผู้ใช้งาน จะต้อง<b class="text-decoration-underline">จำรหัสผ่าน</b
                                        >ที่ระบบได้กำหนดให้ เป็นตัวเลข 6 ตัว (ดังแสดงด้านบน)
                                        เพื่อใช้สำหรับการเข้าสู่ระบบ คู่กับ หมายเลขบัตรประชาชนของท่าน
                                        หากผู้ใช้งานลืมรหัสผ่าน จะต้องติดต่อผู้ดูแลระบบ โทร 02-419-8783
                                        ในวันและเวลาราชการเท่านั้น
                                    </p>
                                    <p>
                                        ผู้ใช้งาน สามารถบันทึกข้อมูลได้ตลอดเวลาที่ปุ่มบันทึกข้อมูลด้านล่าง
                                        ระบบจะบันทึกข้อมูลทั้งหมดให้ในทุก ๆ ส่วน
                                    </p>
                                    <p class="mb-4">
                                        <b class="font-italic text-decoration-underline"
                                            >ระบบจะบันทึกข้อมูลทั้งหมดให้อัตโนมัติทุก ๆ 3 นาที</b
                                        >
                                    </p>
                                </div>
                            </v-alert>
                            <v-alert class="mb-2" border-color="indigo-darken-2" border="start" variant="text">
                                <v-alert-title class="mb-2 text-h6 text-indigo-darken-2"> การส่งข้อมูล </v-alert-title>
                                <div :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }">
                                    <p class="mb-4">
                                        ผู้ใช้งาน จะต้องทำการป้อนข้อมูลครบถ้วนให้และถูกต้อง และทำเครื่องหมายถูกที่
                                        <b class="text-decoration-underline">
                                            ข้าพเจ้าขอรับรองว่าข้อมูลทั้งหมดข้างต้นเป็นความจริงทุกประการ
                                        </b>
                                    </p>

                                    <p class="mb-2">
                                        ปุ่มในการส่งข้อมูลจะปรากฎให้สามารถคลิกได้ เมื่อทำการส่งข้อมูลแล้ว
                                        <b class="text-decoration-underline text-red-darken-2">
                                            จะไม่สามารถเข้ามาแก้ไขได้อีก
                                        </b>
                                    </p>
                                    <p>
                                        หากต้องการแก้ไขข้อมูลที่ได้กดส่งไปแล้ว จะต้องติดต่อผู้ดูแลระบบ โทร 02-419-8783
                                        ในวันและเวลาราชการ เพื่อ
                                        <b class="text-decoration-underline text-blue-darken-2">เปิดสิทธิ์</b>
                                        ในการเข้ามาแก้ไขข้อมูลในลำดับต่อไป
                                    </p>
                                </div>
                            </v-alert>
                            <v-alert border-color="indigo-darken-2" border="start" variant="text">
                                <v-alert-title class="mb-2 text-h6 text-indigo-darken-2">
                                    การพิมพ์แบบฟอร์มและเอกสารแนบ</v-alert-title
                                >
                                <div :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }">
                                    <p class="mb-4">
                                        เมื่อผู้ใช้งาน ได้ทำการส่งข้อมูลแล้ว
                                        ระบบจะปรากฎหน้าเว็บที่อธิบายรายละเอียดในการพิมพ์ และเตรียมเอกสารอีกครั้ง
                                        ซึ่งขึ้นอยู่กับตำแหน่งที่บรรจุ
                                    </p>
                                </div>
                            </v-alert>
                        </v-card-text>
                    </v-container>
                </v-card>
            </v-col>

            <v-col cols="12">
                <section id="hello">
                    <LazyCandidateJobPosition></LazyCandidateJobPosition>
                </section>
            </v-col>

            <v-col cols="12">
                <section id="hello2">
                    <LazyCandidatePersonal></LazyCandidatePersonal>
                </section>
            </v-col>

            <v-col cols="12">
                <LazyCandidateAddressAndBanking></LazyCandidateAddressAndBanking>
            </v-col>

            <v-col cols="12">
                <LazyCandidateParent></LazyCandidateParent>
            </v-col>

            <v-col cols="12">
                <LazyCandidateMarriage></LazyCandidateMarriage>
            </v-col>

            <v-col cols="12">
                <LazyCandidateEducationAndJob></LazyCandidateEducationAndJob>
            </v-col>

            <v-col cols="12">
                <LazyCandidateTax></LazyCandidateTax>
            </v-col>

            <v-col cols="12">
                <LazyCandidateTalent></LazyCandidateTalent>
            </v-col>
        </v-row>

        <br />
    </div>
</template>

<style>
.candidate-form input {
    font-size: 17px;
    font-weight: bold;
    letter-spacing: 1.5px;
}
</style>

<script setup lang="ts">
// This will work in both `<script setup>` and `<script>`
const message = ref('Hey!')
const eye1 = ref(false)
const eye2 = ref(false)
const panelShow = ref('secret')
definePageMeta({
    title: 'แบบฟอร์มกรอกข้อมูลผู้สมัคร',
    pageTransition: {
        name: 'rotate',
    },
})
</script>
