<template>
    <CandidateBaseCard :title="'ข้อมูลตำแหน่งงาน'">
        <template #card-body>
            <v-container class="text-body-1 my-6">
                <v-row>
                    <v-col cols="3">
                        <p>
                            <b>ตำแหน่ง <span class="text-red">*</span></b>
                        </p>
                        <p class="text-caption">ที่เปิดรับบรรจุ</p>
                    </v-col>
                    <v-col cols="8">
                        <v-expand-transition>
                            <div v-if="true">
                                <FormsJobsChoice />
                                <FormsJobsChoice />
                            </div>
                        </v-expand-transition>
                    </v-col>
                </v-row>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>
