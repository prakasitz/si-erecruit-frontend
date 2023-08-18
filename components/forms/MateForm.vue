<template>
    <div class="box-detail">
        <div class="pb-6 text-h6">ข้อมูลคู่สมรส</div>
        <div class="px-6">
            <v-row>
                <v-col cols="4">
                    <p>ยศ/ราชทินนาม</p>
                </v-col>
                <v-col>
                    <v-select
                        density="compact"
                        variant="outlined"
                        hide-details
                        v-model="props.MateFormModel.mate_title_special"
                        :items="tSpecialData"
                        :item-title="'output_text'"
                        :item-value="'name_affix'"
                    ></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4">
                    <p>คำนำหน้า <span class="text-red-darken-1"> *</span></p>
                </v-col>
                <v-col>
                    <v-select
                        density="compact"
                        variant="outlined"
                        label="กรุณาเลือก"
                        v-model="props.MateFormModel.mate_title_name"
                        :items="tTHData"
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
                        v-model="props.MateFormModel.mate_first_name"
                        label="ชื่อ"
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col cols="4">
                    <v-text-field
                        v-model="props.MateFormModel.mate_last_name"
                        label="นามสกุล"
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
                <v-col cols="8">
                    <v-text-field
                        v-model="props.MateFormModel.mate_id_card_number"
                        hint="ไม่ต้องใส่ - "
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4"> วัน/เดือน/ปี เกิด <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="8">
                    <v-input v-model="props.MateFormModel.mate_birth_date" :rules="rules_fieldEmpty">
                        <template #default="{ isValid }">
                            <VueDatePicker
                                placeholder="วัน/เดือน/ปี เกิด"
                                v-model="MateFormModel.mate_birth_date"
                                :rules="rules_fieldEmpty"
                                :state="(isValid.value as boolean)"
                                :="defaultVueDatePickerStyle"
                            />
                        </template>
                    </v-input>
                </v-col>
                <!-- <v-col cols="3"> จังหวัดที่เกิด <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="3">
                    <v-autocomplete
                        :rules="rules_fieldEmpty"
                        v-model="props.MateFormModel.mate_"
                        density="compact"
                        variant="outlined"
                        label="กรุณาเลือก"
                        :items="provinceData"
                        :item-title="'province_name'"
                        :item-value="'province_code'"
                    ></v-autocomplete
                ></v-col> -->
            </v-row>
            <v-row>
                <v-col cols="4"> สถานภาพ <span class="text-red-darken-1"> *</span> </v-col>
                <v-col>
                    <v-radio-group
                        v-model="props.MateFormModel.mate_living"
                        class="label-field-top"
                        inline
                        hide-details
                        :rules="rules_fieldEmpty"
                    >
                        <v-radio class="mr-4" label="มีชีวิตอยู่" value="1"></v-radio>
                        <v-radio class="mr-4" label="ถึงแก่กรรม" value="2"></v-radio>
                    </v-radio-group>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="4"> สัญชาติ <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="8"
                    ><v-autocomplete
                        :rules="rules_fieldEmpty"
                        v-model="props.MateFormModel.mate_race"
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
                <v-col cols="4"> เชื้อชาติ <span class="text-red-darken-1"> *</span></v-col>
                <v-col cols="8">
                    <v-autocomplete
                        :rules="rules_fieldEmpty"
                        v-model="props.MateFormModel.mate_nationality"
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
                <v-col cols="4"> ศาสนา <span class="text-red-darken-1"> *</span></v-col>
                <v-radio-group inline :rules="rules_fieldEmpty" v-model="props.MateFormModel.mate_religion">
                    <v-radio
                        v-for="religion in religionData"
                        class="mr-4"
                        :label="religion.religious_denomination_long_text"
                        :value="religion.religious_denomination_key"
                    ></v-radio>
                </v-radio-group>
            </v-row>
        </div>
    </div>
</template>
<script setup lang="ts">
import { mate_info } from '~/utils/interface/personal_information.interface'

export interface Props {
    MateFormModel: mate_info
}

const { rules_fieldEmpty } = useFillRules()
const props = defineProps<Props>()

const { data: tSpecialData } = useNuxtData('master/title-special')
const { data: tTHData } = useNuxtData('master/titleTH')
const { data: countryRaceData } = useNuxtData('master/country-race')
const { data: religionData } = useNuxtData('master/religion')
</script>
