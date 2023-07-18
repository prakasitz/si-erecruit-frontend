<template color="light-blue-lighten-5">
    <div>
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
                                <v-form @submit.prevent="signIn">
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

        <v-overlay v-model="overlay" contained class="align-center justify-center" :persistent="true">
            <v-progress-circular
                indeterminate
                color="primary"
                :size="100"
                :width="10"
                :style="{ marginBottom: '10rem' }"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script setup lang="ts">
import { UserAuth } from '~/auth/user.auth'
import { H3Error } from 'h3'
import { useAuth } from '~/composables/auth/useAuth'

const username = ref('')
const password = ref('')
const overlay = ref(false)

const { login, me } = useAuth()

definePageMeta({
    name: 'login-hr',
    pageTransition: {
        name: 'rotate',
    },
    layout: 'custom',
    middleware: ['guest-only'],
})

async function signIn() {
    try {
        overlay.value = true
        await login(username.value, password.value, RoleEnum.HR)
        await navigateTo({ path: '/' })

        // const res = await useHR().loginHR(username.value, password.value)
        // console.log('signIn', res?.data)
        // await navigateTo({ path: '/' })
    } catch (error: H3Error | any) {
        // show error only init page
        if (error instanceof H3Error) {
            let errorObj = error.data ?? error
            throw showError({
                ...errorObj,
                stack: undefined,
            })
        } else {
            console.error('Internal Error', error)
            throw showError({
                statusCode: 500,
                message: error.message,
                stack: undefined,
            })
        }

        // if (error instanceof H3Error && error.statusCode == 401) {
        //     topDialog.value = true
        // } else {
        //     throw showError({ statusCode: 500, statusMessage: 'Internal Server Error', message: error.message })
        // }
    } finally {
        overlay.value = false
    }
}
</script>
