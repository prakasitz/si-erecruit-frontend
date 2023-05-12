<template>
    <v-card class="mb-5" variant="outlined">
        <v-card-text class="text-body-1">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <v-text-field hide-details density="compact" variant="outlined" readonly value="พนักงานมหาลัย"
                            ><template #prepend>
                                <div><b>ประเภทการจ้าง</b></div>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field hide-details density="compact" variant="outlined" readonly value="ฝ่ายสารสนเทศ"
                            ><template #prepend>
                                <div><b>สังกัด</b></div>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            hide-details
                            density="compact"
                            variant="outlined"
                            readonly
                            value="งานวิเคราะห์และพัฒนาโปรแกรม"
                            ><template #prepend>
                                <div><b>งาน</b></div>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field hide-details density="compact" variant="outlined" readonly value="8:30 - 16.30 น."
                            ><template #prepend>
                                <div><b>เวลาปฏิบัติงาน</b></div>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts"></script>
