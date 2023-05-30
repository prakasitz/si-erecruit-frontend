<template>
    <CandidateBaseCard :title="'ข้อมูลอื่น ๆ'">
        <template #card-body>
            <v-alert
                border="start"
                type="info"
                variant="outlined"
                icon="mdi-information-outline"
                text="ข้อมูลอื่น ๆ (ถ้ามี) กรุณาระบุความสามารถพิเศษ และผลงานทางวิชาการ ๆ"
            >
            </v-alert>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="3">
                        <b>ความสามารถพิเศษ</b>
                    </v-col>
                    <v-col>
                        <v-row>
                            <v-col cols="2"> พิมพ์ดีด </v-col>
                            <v-col cols="5">
                                <v-text-field density="compact" hide-details variant="outlined">
                                    <template #prepend>
                                        <div class="label-field-top">ไทย</div>
                                    </template>
                                    <template #append>
                                        <div class="label-field-top">คำ/นาที</div>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="5">
                                <v-text-field density="compact" hide-details variant="outlined">
                                    <template #prepend>
                                        <div class="label-field-top">ไทย</div>
                                    </template>
                                    <template #append>
                                        <div class="label-field-top">คำ/นาที</div>
                                    </template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>
