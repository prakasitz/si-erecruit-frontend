<template>
    <v-card flat :disabled="props.isDisabled">
        <v-card-text class="text-body-1">
            <v-row>
                <v-col md="3" sm="12" cols="12">
                    <v-text-field label="บ้านเลขที่ *" hide-details density="compact" variant="outlined">
                    </v-text-field>
                </v-col>
                <v-col md="2" sm="12" cols="12">
                    <v-text-field label="หมู่ *" hide-details density="compact" variant="outlined"> </v-text-field>
                </v-col>
                <v-col md="4" sm="6" cols="12">
                    <v-text-field label="หมู่บ้าน *" hide-details density="compact" variant="outlined"> </v-text-field>
                </v-col>
                <v-col md="3" sm="6" cols="12">
                    <v-text-field label="ซอย *" hide-details density="compact" variant="outlined"> </v-text-field>
                </v-col>
            </v-row>
            <v-row> </v-row>
            <v-row>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field label="ถนน *" hide-details density="compact" variant="outlined"> </v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field label="ตำบล/แขวง *" hide-details density="compact" variant="outlined"> </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field label="อำเภอ/เขต *" hide-details density="compact" variant="outlined"> </v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                    <v-autocomplete
                        label="จังหวัด *"
                        variant="outlined"
                        density="compact"
                        hide-details
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    ></v-autocomplete>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="6" sm="12" cols="12">
                    <v-text-field label="รหัสไปรษณีย์ *" hide-details density="compact" variant="outlined">
                    </v-text-field>
                </v-col>
                <v-col md="6" sm="12" cols="12">
                    <v-autocomplete
                        label="ประเทศ *"
                        variant="outlined"
                        density="compact"
                        hide-details
                        :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    ></v-autocomplete>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
export interface Props {
    isDisabled: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isDisabled: false,
})
</script>
