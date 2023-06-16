<template>
    <v-card flat>
        <v-card-text class="text-body-1">
            <v-row>
                <v-col cols="12">
                    <v-select
                        label="ยศ/ราชทินนาม"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="props.parentFormModel.title_special"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-select
                        label="คำนำหน้า *"
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                        variant="outlined"
                        density="compact"
                        hide-details
                        v-model="props.parentFormModel.title_name"
                        :rules="rules_fieldEmpty"
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
                    <v-text-field
                        v-model="props.parentFormModel.race"
                        hide-details
                        label="สัญชาติ *"
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="props.parentFormModel.nationality"
                        hide-details
                        label="เชื้อชาติ *"
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    ></v-text-field>
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
                        <v-radio class="mr-4" label="พุทธ" value="1"></v-radio>
                        <v-radio class="mr-4" label="คริสต์" value="2"></v-radio>
                        <v-radio class="mr-4" label="อิสลาม" value="3"></v-radio>
                        <v-radio class="mr-4" label="ฮินดู" value="4"></v-radio>
                        <v-radio class="mr-4" label="ไม่ระบุ" value="5"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script setup lang="ts">
import { parent_info } from '~/stores/interface/personal_information.interface'
import { ref } from 'vue'

export interface Props {
    parentFormModel: parent_info
}

const { rules_fieldEmpty } = useFillRules()
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
