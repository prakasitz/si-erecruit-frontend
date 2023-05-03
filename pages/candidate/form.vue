<template>
    <div class="candidate-form">
        <TopicBar :labels="['หนัาหลัก', 'จัดการข้อมูลผู้สมัคร']" />
        <v-card class="mx-auto" width="90%">
            <v-card-title>
                <b>ข้อมูลส่วนตัว</b>
            </v-card-title>
            <v-card-subtitle>โปรดตรวจสอบเลขบัตรประชาชนและรหัสผ่านของท่าน</v-card-subtitle>
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
            </v-card-text>
        </v-card>
        <br />
        <v-card class="mx-auto" width="90%">
            <v-card-title :style="{ 'font-size': '16px !important' }"
                ><b>ยินดีต้อนรับคุณ ประกาศิต ช่วยรักษา</b></v-card-title
            >
            <v-card-text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, explicabo voluptas. Mollitia
                quos dicta alias at porro nihil quis, eligendi odio voluptas est repudiandae ex nesciunt suscipit
                consequuntur, quidem asperiores!
            </v-card-text>
        </v-card>
        <br />
        <v-card class="mx-auto" width="400" prepend-icon="mdi-home">
            <template v-slot:title>Hello from Vuetify!</template>
            <v-card-text>When you see this inside a card, it worked!</v-card-text>
        </v-card>
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
definePageMeta({
    title: 'แบบฟอร์มกรอกข้อมูลผู้สมัคร',
    pageTransition: {
        name: 'rotate',
    },
})
</script>
