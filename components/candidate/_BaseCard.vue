<template>
    <v-card class="mx-auto" width="90%">
        <v-container>
            <v-card-title class="pa-auto text-h5 text-indigo-darken-2">
                {{ props.candidateForm.cardTitle }}
            </v-card-title>
            <v-card-subtitle></v-card-subtitle>
            <v-card-text>
                <slot :form="formPage" name="card-body" />
            </v-card-text>
            <v-card-actions class="d-flex justify-space-between mb-6">
                <div v-if="props.candidateForm.title != 'คำอธิบาย'">
                    <v-btn variant="outlined" @click="prev"> ก่อนหน้า </v-btn>
                </div>
                <div v-if="props.candidateForm.title == 'คำอธิบาย'">
                    <v-btn variant="outlined" @click="next()"> ถัดไป </v-btn>
                </div>
                <div>
                    <div v-if="props.candidateForm.title == 'เอกสารอื่นๆ'">
                        <v-btn variant="outlined"> ยืนยันข้อมูล </v-btn>
                    </div>
                    <div v-else-if="props.candidateForm.title != 'คำอธิบาย'">
                        <v-btn variant="outlined" @click="formValidate"> ถัดไป </v-btn>
                    </div>
                </div>
            </v-card-actions>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
import { useLoadingCandidateCard } from '~/composables/useLoading'
import { CandidateForm } from '~/utils/types'

export interface Props {
    candidateForm: CandidateForm
    labels?: any[]
    formPage?: any
}
const props = defineProps<Props>()

const { validate } = useFillRules()

const { candidateForms, prev, next } = useWindowsNav()

useLoadingCandidateCard(props.candidateForm.id)

async function formValidate() {
    const validForm = await validate(props.formPage.form)
    if (validForm) {
        next()
    }
}
</script>
