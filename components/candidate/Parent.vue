<template>
    <CandidateBaseCard :title="'ข้อมูลบิดา/มารดา'">
        <template #card-body>
            <v-alert
                class="text-subtitle-2"
                border="start"
                type="info"
                variant="outlined"
                icon="mdi-information-outline"
                :text="parentDescription"
            >
            </v-alert>
            <v-container class="text-body-1">
                <v-row>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ข้อมูลบิดา <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <FormsParentForm></FormsParentForm>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12">
                        <v-row>
                            <v-col cols="3">
                                <p>ข้อมูลมารดา <span class="text-red">*</span></p>
                            </v-col>
                            <v-col cols="8">
                                <FormsParentForm></FormsParentForm>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="3">
                        <p>บิดา-มารดา</p>
                    </v-col>
                    <v-col cols="4"
                        ><v-text-field
                            persistent-hint
                            label="เลขที่ทะเบียนสมรส"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            type="date"
                            persistent-hint
                            label="เลขที่ทะเบียนสมรส"
                            density="compact"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>

            <v-divider class="my-2"></v-divider>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
const parentDescription = 'ข้อมูลบิดา, มารดา ไว้ใช้ในการอ้างอิงกรณีการเบิกสวัสดิการให้แก่บุคคลดังกล่าว'
</script>
