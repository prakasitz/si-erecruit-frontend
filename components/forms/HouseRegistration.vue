<template>
    <v-card flat :disabled="props.isDisabled">
        <v-card-text class="text-body-1">
            <v-row>
                <v-col md="3" sm="12" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_no"
                        label="บ้านเลขที่ *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col md="2" sm="12" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_moo"
                        label="หมู่ *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col md="4" sm="6" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_village"
                        label="หมู่บ้าน *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col md="3" sm="6" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_soi"
                        label="ซอย *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_road"
                        label="ถนน *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_district"
                        label="ตำบล/แขวง *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_city"
                        label="อำเภอ/เขต *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                    <v-autocomplete
                        v-model="props.addressModel.address_province"
                        hide-no-data
                        hide-details
                        label="จังหวัด *"
                        variant="outlined"
                        density="compact"
                        :items="provinceData"
                        :item-title="'province_name'"
                        :item-value="'province_code'"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field
                        v-model="props.addressModel.address_postcode"
                        label="รหัสไปรษณีย์ *"
                        hide-details
                        density="compact"
                        variant="outlined"
                        :rules="rules_fieldEmpty"
                    >
                    </v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                    <v-autocomplete
                        label="ประเทศ *"
                        variant="outlined"
                        density="compact"
                        hide-details
                        countryRaceData
                        :items="countryRaceData"
                        :item-title="'name'"
                        :item-value="'cty'"
                        :rules="rules_fieldEmpty"
                    ></v-autocomplete>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { address } from '~/stores/interface/personal_information.interface'

export interface Props {
    isDisabled: boolean
    addressModel: address
}

const { rules_fieldEmpty } = useFillRules()

const props = withDefaults(defineProps<Props>(), {
    isDisabled: false,
})

const { data: provinceData } = useNuxtData('master/province')
const { data: countryRaceData } = useNuxtData('master/country-race')
</script>
