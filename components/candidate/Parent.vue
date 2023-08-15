<template>
    <CandidateBaseCard v-if="!pending" :candidate-form="props.candidateForm" :form-page="{ form: formParents }">
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
            <v-container class="text-body-1 my-6">
                <v-form ref="formParents">
                    <v-row>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="3">
                                    <b>ข้อมูลบิดา <span class="text-red">*</span></b>
                                </v-col>
                                <v-col cols="8">
                                    <FormsParentForm :parent-form-model="parent.father"></FormsParentForm>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="3">
                                    <b>ข้อมูลมารดา <span class="text-red">*</span></b>
                                </v-col>
                                <v-col cols="8">
                                    <FormsParentForm :parent-form-model="parent.mother"></FormsParentForm>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                            <b>บิดา-มารดา</b>
                        </v-col>
                        <v-col cols="4"
                            ><v-text-field
                                v-model="parent.mf_no_marriage"
                                hide-details
                                persistent-hint
                                label="เลขที่ทะเบียนสมรส"
                                density="compact"
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <VueDatePicker
                                placeholder="วันที่ออกทะเบียนสมรส"
                                :="defaultVueDatePickerStyle"
                                v-model="parent.mf_date_of_marriage"
                                :rules="rules_fieldEmpty"
                            />
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
        </template>
    </CandidateBaseCard>
</template>

<script setup lang="ts">
import { usePersonalStore } from '../../stores/personal.store'

import { CandidateForm } from '~/utils/types'
const props = defineProps<{
    candidateForm: CandidateForm
}>()

const formParents: Ref<HTMLFormElement | null> = ref<HTMLFormElement | null>(null)
const personalStore = usePersonalStore()
const { rules_fieldEmpty } = useFillRules()
const { parent } = personalStore

const { fetchTitleConferred, fetchTitleTH, fetchReligion, fetchCountryRace } = useMaster()
const { tConferredPending } = await fetchTitleConferred()
const { tTHPending } = await fetchTitleTH()
const { religionPending } = await fetchReligion()
const { countryRacePending } = await fetchCountryRace()

const pending = computed(() => {
    return tConferredPending.value || tTHPending.value || religionPending.value || countryRacePending.value
})

const parentDescription = 'ข้อมูลบิดา, มารดา ไว้ใช้ในการอ้างอิงกรณีการเบิกสวัสดิการให้แก่บุคคลดังกล่าว'

// watch(formParents,(value) => {
//     console.log('watch',value)
// })
</script>
