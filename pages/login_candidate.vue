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
                                    <v-text-field v-model="pid" :rules="numberRule" class="mt-1" variant="outlined"
                                        prepend-inner-icon="mdi-account" counter="13" maxLength="13"
                                        hint="x-xx-xx-xxxxx-xx-xx"></v-text-field>
                                    <p>กรุณากรอกหมายเลขบัตรประจำตัวประชาชน (ตัวเลข 13 หลัก ไม่ต้องมี -)</p>
                                    <p>เพื่อตรวจสอบและลงทะเบียนข้อมูลบุคลากร ด้วยหมายเลขดังกล่าว</p>
                                    <v-btn class="mt-5 btn-candidate" @click="onClick_CheckingPID(pid)">
                                        ตรวจสอบข้อมูล
                                    </v-btn>
                                    <!-- <DialogsPasswordDialog :id_card="pid" :btn_disabled="btn_disabled" /> -->
                                    <DialogsPasswordDialog :id_card="pid" :btn_disabled="btn_disabled" :show="show_dialog"
                                        :showError="show_dialog_error" :error_detail="error_detail"
                                        @update:show="(v: boolean) => (show_dialog = v)"
                                        @update:show_error="(e: boolean) => (show_dialog_error = e)" />
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
const { loginCandidate, checkPID } = useCandidate()

const pid = ref('')
const btn_disabled = ref()
const show_dialog = ref(false)
const show_dialog_error = ref(false)

const error_detail = ref('')
const valid = ref(false)
const userLogin = ref()

const numberRule = [
    (v: string) =>
        v.split('-').length > 1
            ? 'ไม่ต้องใส่ -'
            : v.length != 13
                ? 'กรุณากรอกเลขบัตรประจำตัวประชาชนให้ครบ 13 หลัก'
                : true,
]

// This will work in both `<script stup>` and `<script>`
definePageMeta({
    pageTransition: {
        name: 'rotate',
    },
    layout: 'logincandidate',
})

async function onClick_CheckingPID(_id: string) {
    const runtimeConfig = useRuntimeConfig()
    const resp = await checkPID()

    if (resp.data.value) {
        show_dialog.value = true
    } else {
        error_detail.value = `กรุณาตรวจสอบหมายเลขบัตรประจำตัวประชาชนอีกครั้ง`
        show_dialog_error.value = true
    }
    // useFetch(`${runtimeConfig.public.baseApi}/candidate-information/getCandidateInformation`, {
    //     method: 'POST',
    //     body: { pid: pid.value },
    // }).then((d: any) => {
    //     if (d.data.value) {
    //         show_dialog.value = true
    //     } else {
    //         error_detail.value = `กรุณาตรวจสอบหมายเลขบัตรประจำตัวประชาชนอีกครั้ง`
    //         show_dialog_error.value = true
    //     }
    // })
}
</script>
