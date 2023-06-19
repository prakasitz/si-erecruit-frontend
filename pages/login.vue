<template color="light-blue-lighten-5">
    <v-row class="mt-6 justify-center" justify="center">
        <v-col cols="12" sm="10" md="8" xl="5">
            <v-card class="py-5">
                <v-card-text>
                    <v-row justify="center">
                        <v-col cols="4" sm="3" lg="2">
                            <v-img src="/images/MU_Th_Color.png"></v-img>
                        </v-col>
                        <v-col cols="12" class="text-center">
                            <h1 class="font-weight-regular primary--text">Si eRecruit</h1>
                        </v-col>
                    </v-row>

                    <v-row justify="center" class="mt-10">
                        <v-col cols="12" sm="8">
                            <v-form @submit.prevent="signIn()">
                                <v-text-field
                                    variant="outlined"
                                    prepend-inner-icon="mdi-account"
                                    v-model="username"
                                    label="ชื่อผู้ใช้งาน"
                                    hint="ชื่อ.นามสกุล 3 ตัว"
                                    required
                                    autofocus
                                    maxLength="50"
                                ></v-text-field>
                                <v-text-field
                                    variant="outlined"
                                    prepend-inner-icon="mdi-lock"
                                    v-model="password"
                                    label="รหัสผ่าน"
                                    type="password"
                                    required
                                    maxLength="50"
                                ></v-text-field>

                                <p class="text-right">
                                    <NuxtLink href="https://si-eservice3.si.mahidol.ac.th/selfservice/">
                                        ลืมรหัสผ่าน?
                                    </NuxtLink>
                                </p>
                                <v-btn x-large color="main-color" class="btn_lg" block type="submit">
                                    เข้าสู่ระบบ
                                </v-btn>
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
    <DialogsUserLoginFailed />
</template>

<script setup lang="ts">
import { UserAuth } from '~/auth/user.auth'

const topDialog = useTopDialog()
const auth = new UserAuth()

const username = ref('')
const password = ref('')

definePageMeta({
    pageTransition: {
        name: 'rotate',
    },
    layout: 'custom',
})

async function signIn() {
    try {
        await auth.signIn({ username: username.value, password: password.value })
        navigateTo('/')
    } catch {
        topDialog.value = true
    }
}
</script>
