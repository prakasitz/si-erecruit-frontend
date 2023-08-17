<template>
    <v-card flat>
        <v-card-text class="text-body-1">
            <v-row>
                <v-col cols="12">
                    <v-select
                        label="ยศ/ราชทินนาม"
                        :items="tConferredData"
                        :item-title="'output_text'"
                        :item-value="'name_affix'"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="props.parentFormModel.title_special"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-select
                        label="คำนำหน้า *"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="props.parentFormModel.title_name"
                        :rules="rules_fieldEmpty"
                        :items="tTHData"
                        :item-title="'long_text'"
                        :item-value="'form_of_address_key'"
                    ></v-select>
                </v-col>

                <v-col cols="6">
                    <v-text-field
                        hide-details
                        label="ชื่อ (ภาษาไทย) *"
                        density="compact"
                        variant="outlined"
                        v-model="props.parentFormModel.first_name"
                        :rules="rules_fieldEmpty"
                    ></v-text-field>
                </v-col>

                <v-col cols="6">
                    <v-text-field
                        hide-details
                        label="นามสกุล (ภาษาไทย) *"
                        density="compact"
                        variant="outlined"
                        v-model="props.parentFormModel.last_name"
                        :rules="rules_fieldEmpty"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-radio-group
                        v-model="props.parentFormModel.living"
                        class="label-field-top"
                        inline
                        hide-details
                        :rules="rules_fieldEmpty"
                    >
                        <template #prepend>
                            <div style="position: relative; top: -8.5px">
                                <v-label>สถานภาพ: *</v-label>
                            </div>
                        </template>
                        <v-radio class="mr-4" label="มีชีวิตอยู่" value="1"></v-radio>
                        <v-radio class="mr-4" label="ถึงแก่กรรม" value="2"></v-radio>
                    </v-radio-group>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="props.parentFormModel.career"
                        hide-details
                        label="อาชีพ"
                        density="compact"
                        variant="outlined"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="props.parentFormModel.id_card_number"
                        hide-details
                        label="หมายเลขบัตรประชาชน"
                        density="compact"
                        variant="outlined"
                        persistent-hint
                        :hint="hints.personalID"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        label="สัญชาติ *"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="props.parentFormModel.race"
                        :items="countryRaceData"
                        :item-title="'nationality'"
                        :item-value="'cty'"
                        :rules="rules_fieldEmpty"
                    ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                    <v-autocomplete
                        label="เชื้อชาติ *"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="props.parentFormModel.nationality"
                        :items="countryRaceData"
                        :item-title="'nationality'"
                        :item-value="'cty'"
                        :rules="rules_fieldEmpty"
                    ></v-autocomplete>
                </v-col>
                <v-col>
                    <v-radio-group
                        v-model="props.parentFormModel.religion"
                        label="ศาสนา: *"
                        class="label-field-top"
                        inline
                        hide-details
                        :rules="rules_fieldEmpty"
                    >
                        <v-radio
                            v-for="religion in religionData"
                            class="mr-4"
                            :label="religion.religious_denomination_long_text"
                            :value="religion.religious_denomination_key"
                        ></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { parent_info } from '~/utils/interface/personal_information.interface'

export interface Props {
    parentFormModel: parent_info
}

const { rules_fieldEmpty } = useFillRules()

const { data: tConferredData } = useNuxtData('master/title-conferred')
const { data: tTHData } = useNuxtData('master/titleTH')
const { data: countryRaceData } = useNuxtData('master/country-race')
const { data: religionData } = useNuxtData('master/religion')

// const select = ref(null)
// const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
// const checkbox = ref(false)
//const formRef = ref(null);
//const formParents = ref<HTMLFormElement | null>(null)

// async function validate() {
//     const formInstance = formParents.value

//     if (formInstance) {
//         const {valid} = await formInstance.validate()
//         if (valid) {
//                 alert('Form is valid')
//             } else {
//                 alert('please fill out the form')
//             }
//     }
// }

// function reset() {
//     formRef.value?.reset()
// }

// function resetValidation() {
//     formRef.value?.resetValidation()
// }

const props = defineProps<Props>()

const hints = {
    personalID: 'hint: ไม่มี ให้ปล่อยว่าง',
}
</script>
