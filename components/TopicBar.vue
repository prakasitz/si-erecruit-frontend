<template>
    <v-sheet elevation="2" style="margin-bottom: 30px">
        <v-row no-gutters>
            <v-col cols="12">
                <v-sheet class="ma-0s pa-0" max-height="70">
                    <!-- / <strong class="text-h5 font-weight-bold text-main-color"> เมนูทั่วไป </strong> -->
                    <v-row>
                        <v-col cols="7"> <v-breadcrumbs divider=">" :items="props.labels"></v-breadcrumbs> </v-col>
                        <v-col class="mx-4 pt-7 text-right"> <v-icon class="text-main-color mx-1">mdi-account</v-icon>
                            นางสาวแพรวพรรณ
                            เผือกบางนา</v-col>
                    </v-row>

                </v-sheet>
            </v-col>
        </v-row>
    </v-sheet>
</template>
<script setup lang="ts">
export interface Props {
    msg?: string
    labels?: any[]
}

const props = withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => [{ title: 'หนัาหลัก', href: '/' }],
})
</script>
