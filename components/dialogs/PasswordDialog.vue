<template >
    <v-row justify="space-around">
        <v-col cols="auto">
            <v-dialog v-model="props.show" transition="dialog-top-transition" width="700">
                <template v-slot:default>
                    <v-card>
                        <v-toolbar class="bg-header-card" title="กรอกรหัสผ่านเพื่อเข้าสู่ระบบ"></v-toolbar>
                        <v-card-text>
                            <div class="">
                                <p>
                                    <v-text-field v-model="props.id_card" class="mt-1" variant="outlined" readonly
                                        prepend-inner-icon="mdi-account" maxLength="13"
                                        hint="x-xx-xx-xxxxx-xx-xx"></v-text-field>
                                </p>
                                <p>
                                    <v-text-field v-model="password" class="mt-1" variant="outlined" label="รหัสผ่าน"
                                        prepend-inner-icon="mdi-key" maxLength="8" type="password"></v-text-field>
                                </p>
                            </div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn variant="text" @click="loginCandidate(props.id_card, '')">เข้าสู่ระบบ</v-btn>
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

const props = defineProps(['id_card', 'btn_disabled', 'show', 'showError', 'error_detail']);
const emit = defineEmits(['update:show', 'update:show_error']);

const password = ref();
function loginCandidate(pid: string, password: string) {
    console.log(props.btn_disabled)
}

</script>

