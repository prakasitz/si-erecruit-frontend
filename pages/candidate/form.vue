<template>
    <div class="candidate-form">
        <TopicBar :labels="['หนัาหลัก', 'จัดการข้อมูลผู้สมัคร']" />

        <v-row>
            <v-col cols="12">
                <v-row class="d-flex justify-center">
                    <v-btn variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn>
                    <v-item-group v-model="onboarding" class="text-center" mandatory>
                        <v-item v-for="n in length" :key="`btn-${n}`" v-slot="{ isSelected, toggle }" :value="n">
                            <v-btn
                                :variant="isSelected ? 'outlined' : 'text'"
                                icon="mdi-record"
                                @click="toggle"
                            ></v-btn>
                        </v-item>
                    </v-item-group>
                    <v-btn variant="plain" icon="mdi-chevron-right" @click="next"></v-btn>
                </v-row>
            </v-col>
            <v-col cols="12">
                <section id="test21">
                    <v-window v-model="onboarding">
                        <v-window-item v-for="n in length" :key="`card-${n}`" :value="n">
                            <v-card v-if="n == 1" class="mx-auto" width="90%">
                                <v-container>
                                    <v-card-title class="pa-auto text-h5 text-red-darken-2"
                                        >โปรดสนใจเป็นพิเศษ</v-card-title
                                    >
                                    <v-card-text>
                                        <div class="text-h5 text-indigo-darken-2 mb-2">
                                            คำอธิบายสำหรับการกรอกข้อมูล SiRecruit สำหรับตำแหน่งทั่วไป
                                        </div>
                                        <v-alert
                                            class="mb-2"
                                            border-color="indigo-darken-2"
                                            border="start"
                                            variant="text"
                                        >
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
                                        <v-alert
                                            class="mb-2"
                                            border-color="indigo-darken-2"
                                            border="start"
                                            variant="text"
                                        >
                                            <v-alert-title class="mb-2 text-h6 text-indigo-darken-2">
                                                การส่งข้อมูล
                                            </v-alert-title>
                                            <div :style="{ 'font-size': '0.9rem', lineHeight: '1.4rem !important' }">
                                                <p class="mb-4">
                                                    ผู้ใช้งาน จะต้องทำการป้อนข้อมูลครบถ้วนให้และถูกต้อง
                                                    และทำเครื่องหมายถูกที่
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
                                                    หากต้องการแก้ไขข้อมูลที่ได้กดส่งไปแล้ว จะต้องติดต่อผู้ดูแลระบบ โทร
                                                    02-419-8783 ในวันและเวลาราชการ เพื่อ
                                                    <b class="text-decoration-underline text-blue-darken-2"
                                                        >เปิดสิทธิ์</b
                                                    >
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
                                                    ระบบจะปรากฎหน้าเว็บที่อธิบายรายละเอียดในการพิมพ์
                                                    และเตรียมเอกสารอีกครั้ง ซึ่งขึ้นอยู่กับตำแหน่งที่บรรจุ
                                                </p>
                                            </div>
                                        </v-alert>
                                    </v-card-text>
                                </v-container>
                            </v-card>
                            <CandidateJobPosition v-if="n == 2"></CandidateJobPosition>
                            <CandidatePersonal v-if="n == 3"></CandidatePersonal>
                            <CandidateAddressAndBanking v-if="n == 4"></CandidateAddressAndBanking>
                            <CandidateParent v-if="n == 5"></CandidateParent>
                            <CandidateMarriage v-if="n == 6"></CandidateMarriage>
                            <CandidateEducationAndJob v-if="n == 7"></CandidateEducationAndJob>
                            <CandidateTax v-if="n == 8"></CandidateTax>
                            <CandidateTalent v-if="n == 9"></CandidateTalent>
                        </v-window-item>
                    </v-window>
                </section>
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

const length = ref(8)
const onboarding = ref(0)

const next = () => {
    onboarding.value = onboarding.value + 1 > length.value ? 1 : onboarding.value + 1
}

const prev = () => {
    onboarding.value = onboarding.value - 1 <= 0 ? length.value : onboarding.value - 1
}

definePageMeta({
    title: 'แบบฟอร์มกรอกข้อมูลผู้สมัคร',
    pageTransition: {
        name: 'rotate',
    },
})
</script>
