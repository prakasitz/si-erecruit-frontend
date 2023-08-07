<template>
    <v-row justify="space-around">
        <v-col cols="">
            <v-dialog v-model="topDialog" transition="dialog-top-transition" width="700">
                <template v-slot:default>
                    <v-card>
                        <v-toolbar class="bg-header-card-error" color="red" title="บางอย่างผิดพลาด"></v-toolbar>
                        <v-card-text>
                            <div class="">กรุณาตรวจสอบรหัสผ่านอีกครั้ง</div>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <v-btn variant="text" text="ปิด" @click="topDialog = !topDialog"> </v-btn>
                        </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
const topDialog = useTopDialog()
</script>
