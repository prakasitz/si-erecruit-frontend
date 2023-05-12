<template>
    <v-card class="mb-5" variant="outlined" readonly>
        <v-row no-gutters>
            <v-col cols="1" align-self="start" class="pt-4 mr-2">
                <v-radio readonly :ripple="false" hide-details :model-value="isSelected"></v-radio>
            </v-col>
            <v-divider class="pa-1" vertical></v-divider>
            <v-col cols>
                <v-card-text class="text-body-1 v-col v-col" readonly>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                hide-details
                                density="compact"
                                variant="underlined"
                                readonly
                                value="พนักงานมหาลัย"
                                ><template #prepend>
                                    <div><b>ประเภทการจ้าง</b></div>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                hide-details
                                density="compact"
                                variant="underlined"
                                readonly
                                value="ฝ่ายสารสนเทศ"
                                ><template #prepend>
                                    <div><b>สังกัด</b></div>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                hide-details
                                density="compact"
                                variant="underlined"
                                readonly
                                value="งานวิเคราะห์และพัฒนาโปรแกรม"
                                ><template #prepend>
                                    <div><b>งาน</b></div>
                                </template>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                hide-details
                                density="compact"
                                variant="underlined"
                                readonly
                                value="8:30 - 16.30 น."
                                ><template #prepend>
                                    <div><b>เวลาปฏิบัติงาน</b></div>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text></v-col
            >
        </v-row>
    </v-card>
</template>

<style scoped>
.v-input:deep() .v-field {
    font-size: 14px;
}

.v-input:deep() input {
    cursor: pointer;
}

.v-card {
    transition: border-left-width 0.1s ease-in-out;
}
</style>

<script setup lang="ts">
interface Props {
    isSelected: boolean
}

const props = defineProps<Props>()
</script>
