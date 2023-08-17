<template>
    <div class="box-detail">
        <div class="pb-6 text-h6">ข้อมูลบุตรคนที่ {{ index }}</div>
        <div class="px-6">
            <v-row>
                <v-col cols="4">
                    <p>คำนำหน้า <span class="text-red-darken-1"> *</span></p>
                </v-col>
                <v-col>
                    <v-select
                        density="compact"
                        variant="outlined"
                        label="กรุณาเลือก"
                        v-model="props.childFormModel.title"
                        :items="tData"
                        :rules="rules_fieldEmpty"
                        :item-title="'long_text'"
                        :item-value="'form_of_address_key'"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">ชื่อ-นามสกุล (ภาษาไทย) <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="props.childFormModel.first_name"
                        label="ชื่อ"
                        density="compact"
                        variant="outlined"
                        maxLength="50"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="props.childFormModel.last_name"
                        label="นามสกุล"
                        hint="ไม่ต้องใส่ - "
                        density="compact"
                        variant="outlined"
                        maxLength="50"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4"> หมายเลขบัตรประชาชน <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="6">
                    <v-text-field
                        v-model="props.childFormModel.id_card"
                        hint="ไม่ต้องใส่ - "
                        density="compact"
                        variant="outlined"
                        maxLength="13"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3"> วัน/เดือน/ปี เกิด <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3">
                    <v-input v-model="props.childFormModel.birth_date" :rules="rules_fieldEmpty">
                        <template #default="{ isValid }">
                            <VueDatePicker
                                placeholder="วัน/เดือน/ปี เกิด"
                                :="defaultVueDatePickerStyle"
                                v-model="childFormModel.birth_date"
                                :rules="rules_fieldEmpty"
                                :state="(isValid.value as boolean)"
                            />
                        </template>
                    </v-input>
                </v-col>
                <v-col cols="3"> จังหวัดที่เกิด <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3">
                    <v-autocomplete
                        :rules="rules_fieldEmpty"
                        v-model="props.childFormModel.birth_province"
                        density="compact"
                        variant="outlined"
                        label="กรุณาเลือก"
                        :items="provinceData"
                        :item-title="'province_name'"
                        :item-value="'province_code'"
                    ></v-autocomplete
                ></v-col>
            </v-row>

            <v-row>
                <v-col cols="3"> สัญชาติ <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3"
                    ><v-autocomplete
                        :rules="rules_fieldEmpty"
                        v-model="props.childFormModel.race"
                        label="กรุณาเลือก"
                        density="compact"
                        variant="outlined"
                        :items="countryRaceData"
                        :item-title="'nationality'"
                        :item-value="'cty'"
                    ></v-autocomplete
                ></v-col>
                <v-col cols="3"> เชื้อชาติ <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3">
                    <v-autocomplete
                        :rules="rules_fieldEmpty"
                        v-model="props.childFormModel.nationality"
                        label="กรุณาเลือก"
                        density="compact"
                        variant="outlined"
                        :items="countryRaceData"
                        :item-title="'nationality'"
                        :item-value="'cty'"
                    ></v-autocomplete
                ></v-col>
            </v-row>
            <v-row>
                <v-col cols="3"> ศาสนา <span class="text-red-darken-1"> *</span></v-col>
                <v-radio-group inline :rules="rules_fieldEmpty" v-model="props.childFormModel.religion">
                    <v-radio
                        v-for="religion in religionData"
                        class="mr-4"
                        :label="religion.religious_denomination_long_text"
                        :value="religion.religious_denomination_key"
                    ></v-radio>
                </v-radio-group>
            </v-row>
            <v-row>
                <v-col cols="3"> สวัสดิการบุตร <span class="text-red-darken-1"> *</span></v-col>
                <v-col>
                    <v-radio-group :rules="rules_fieldEmpty" v-model="props.childFormModel.child_welfare">
                        <v-radio label="ไม่มี" value="1"></v-radio>
                        <v-radio label="บุตรเป็นคนไร้ความสามารถ" value="2"></v-radio>
                        <v-radio label="เบิกสวัสดิการกับท่านเอง" value="3"></v-radio>
                        <v-radio label="เบิกสวัสดิการกับคู่สมรส" value="4"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { children_info } from '~/utils/interface/personal_information.interface'
import { usePersonalStore } from '~/stores/personal.store'

export interface Props {
    index: number
    childFormModel: children_info
}

const personalStore = usePersonalStore()
const { rules_fieldEmpty } = useFillRules()
const props = defineProps<Props>()

const { data: tData } = useNuxtData('master/title')
const { data: countryRaceData } = useNuxtData('master/country-race')
const { data: religionData } = useNuxtData('master/religion')
const { data: provinceData } = useNuxtData('master/province')
</script>
