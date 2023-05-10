<template>
    <CandidateBaseCard :title="'ข้อมูลส่วนบุคคล'">
        <template #card-body>
            <v-container class="mb-6 text-body-1">
                <v-row>
                    <!-- คำนำหน้า พิเศษ -->
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ยศ/ราชทินนาม</p>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ตำแหน่งทางวิชาชีพ</p>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ตำแหน่งทางวิชาการ</p>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ยศทางทหาร</p>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    hide-details
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>

                    <!-- ชื่อ-นามสกุล -->
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ยศทางทหาร</p>
                            </v-col>
                            <v-col cols="6">
                                <v-select
                                    label="กรุณาเลือก"
                                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                                    variant="outlined"
                                    density="compact"
                                    :persistent-hint="true"
                                    hint="123123"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field density="compact" variant="outlined" value="1 4098 00357 95 0" hide-details>
                            <template v-slot:prepend>
                                <p :style="{ 'font-size': '1.12rem !important' }">
                                    <b>สังกัด</b>
                                </p>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field density="compact" variant="outlined" value="1 4098 00357 95 0" hide-details>
                            <template v-slot:prepend>
                                <p :style="{ 'font-size': '1.12rem !important' }">
                                    <b>งาน</b>
                                </p>
                            </template>
                        </v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field density="compact" variant="outlined" value="1 4098 00357 95 0" hide-details>
                            <template v-slot:prepend>
                                <p :style="{ 'font-size': '1.12rem !important' }">
                                    <b>เวลาปฏิบัติงาน</b>
                                </p>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>
