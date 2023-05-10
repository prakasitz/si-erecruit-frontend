<template>
    <CandidateBaseCard :title="'ข้อมูลตำแหน่งงาน'">
        <template #card-body>
            <v-row>
                <v-col cols="7">
                    <v-text-field readonly density="compact" variant="outlined" value="1 4098 00357 95 0" hide-details>
                        <template v-slot:prepend>
                            <p :style="{ 'font-size': '1.12rem !important' }">
                                <b>ตำแหน่ง <span class="text-red">*</span></b>
                                <v-tooltip text="ที่เปิดรับบรรจุ" location="bottom">
                                    <template v-slot:activator="{ props }">
                                        <v-icon
                                            v-bind="props"
                                            size="x-small"
                                            icon="mdi-information-variant-circle-outline"
                                        ></v-icon>
                                    </template>
                                </v-tooltip>
                            </p>
                        </template>
                    </v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field density="compact" variant="outlined" value="1 4098 00357 95 0" hide-details>
                        <template v-slot:prepend>
                            <p :style="{ 'font-size': '1.12rem !important' }">
                                <b>ประเภทการจ้าง</b>
                            </p>
                        </template>
                    </v-text-field>
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
        </template>
    </CandidateBaseCard>
</template>
