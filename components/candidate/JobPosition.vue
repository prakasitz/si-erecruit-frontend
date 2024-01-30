<template>
    <CandidateBaseCard :candidate-form="props.candidateForm" :form-page="{ form: formJobPosition }">
        <template #card-body>
            <v-form ref="formJobPosition">
                <v-alert
                    class="text-subtitle-2"
                    border="start"
                    type="info"
                    variant="outlined"
                    icon="mdi-information-outline"
                    :text="jobPositionDescription"
                ></v-alert>
                <v-container class="text-body-1 my-6">
                    <v-row>
                        <v-col cols="2">
                            <p>
                                <b>ตำแหน่ง<span class="text-red">*</span></b>
                            </p>
                            <p class="text-caption">ที่เปิดรับบรรจุ</p>
                        </v-col>
                        <v-col cols>
                            <v-expand-transition>
                                <div v-if="true">
                                    <v-item-group selected-class="card-item-selected">
                                        <v-row>
                                            <v-col cols="6" v-for="i in 4">
                                                <v-item v-slot="{ isSelected, selectedClass, toggle }: any">
                                                    <FormsJobsChoice
                                                        :is-selected="isSelected"
                                                        :class="[selectedClass]"
                                                        @click="toggle"
                                                    />
                                                </v-item>
                                            </v-col>
                                        </v-row>
                                    </v-item-group>
                                </div>
                            </v-expand-transition>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </template>
    </CandidateBaseCard>
</template>

<style scoped>
.card-item-selected {
    border-left-color: rgb(var(--v-theme-main-color));
    border-left-width: 8px;
}
</style>

<script setup lang="ts">
import { CandidateForm } from '~/utils/types'
const props = defineProps<{
    candidateForm: CandidateForm
}>()

const formJobPosition: Ref<HTMLFormElement | null> = ref<HTMLFormElement | null>(null)
const jobPositionDescription = 'กรุณาเลือกตำแหน่งที่ท่านบรรจุ'

useFetch('/api/delay', { server: false }) //ใช้ await เมื่อต้องการ ssr

onMounted(() => {
    console.log('🎇 onMounted JobPosition')
})

onUpdated(() => {
    console.log('🎇 onUpdated JobPosition')
})

onUnmounted(() => {
    console.log('🎇 onUnmounted JobPosition')
})
</script>
