<template>
    <v-row justify="space-around">
        <v-col cols="auto">
            <v-dialog v-model="props.show" transition="dialog-top-transition" width="700">
                <template v-slot:default>
                    <v-card>
                        <v-toolbar class="bg-header-card" title="กรอกรหัสผ่านเพื่อเข้าสู่ระบบ"></v-toolbar>
                        <v-card-text>
                            <div class="">
                                <p>
                                    <v-text-field
                                        v-model="props.id_card"
                                        class="mt-1"
                                        variant="outlined"
                                        readonly
                                        prepend-inner-icon="mdi-account"
                                        maxLength="13"
                                        hint="x-xx-xx-xxxxx-xx-xx"
                                    ></v-text-field>
                                </p>
                                <p>
                                    <v-text-field
                                        v-model="password"
                                        class="mt-1"
                                        variant="outlined"
                                        label="รหัสผ่าน"
                                        prepend-inner-icon="mdi-key"
                                        maxLength="8"
                                        type="password"
                                    ></v-text-field>
                                </p>
                            </div>
                            <v-label
                                v-if="invalidPassword"
                                text="**กรุณาตรวจสอบรหัสผ่านอีกครั้ง"
                                class="mx-3 text-red"
                            ></v-label>
                        </v-card-text>

                        <v-card-actions class="justify-end">
                            <!-- <dev-only> -->
                            <v-btn v-if="$isDev" variant="text" @click="loginCandidate('1100201370643', '645631')"
                                >Clike me</v-btn
                            >
                            <!-- </dev-only> -->
                            <v-btn variant="text" @click="loginCandidate(props.id_card, password)">เข้าสู่ระบบ</v-btn>
                            <v-btn variant="text" @click="emit('update:show', false)">ยกเลิก</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>

    <v-row justify="space-around">
        <v-col cols="">
            <v-dialog v-model="props.showError" transition="dialog-top-transition" width="700">
                <template v-slot:default>
                    <v-card>
                        <v-toolbar class="bg-header-card-error" title="บางอย่างผิดพลาด"></v-toolbar>
                        <v-card-text>
                            <div class="">
                                {{ error_detail }}
                            </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn variant="text" @click="emit('update:show_error', false)">ยกเลิก</v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { H3Error } from 'h3'
import { useAuth } from '~/composables/auth/useAuth'

const { $isDev } = useNuxtApp()
const route = useRoute()
const props = defineProps(['id_card', 'btn_disabled', 'show', 'showError', 'error_detail'])
const emit = defineEmits(['update:show', 'update:show_error'])
const password = ref('')
const invalidPassword = ref(false)

async function loginCandidate(pid?: string | undefined, password?: string | undefined) {
    if (!pid || !password) {
        invalidPassword.value = !invalidPassword.value
    } else {
        try {
            invalidPassword.value = false
            await useAuth().login(pid, password, 'CANDIDATE')
            // await auth.signIn({ username: pid, password: password })
            // let url = redirectOrNull || 'candidate'
            // return navigateTo(url)
        } catch (error: H3Error | any) {
            console.log('🚩 PasswordDialog.vue', error)
            if (error instanceof H3Error) {
                if (error.statusCode == 401) {
                    invalidPassword.value = !invalidPassword.value
                } else if (error.statusCode == 403) {
                    throw showError({
                        statusCode: 403,
                        statusMessage: 'Forbidden',
                        message: error.message,
                    })
                }
            } else {
                throw showError({
                    statusCode: 500,
                    statusMessage: 'Internal Server Error',
                    message: error.message ?? error.data.message,
                })
            }
        }
    }
}
</script>
