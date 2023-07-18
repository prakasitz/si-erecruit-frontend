<template>
    <v-dialog v-model="dialog" width="auto">
        <template v-slot:activator="{ props }">
            <v-row justify="center" class="ma-2">
                <v-btn :color="bgColor" v-bind="props" class="text-white"> Open Dialog WARNING </v-btn>
            </v-row>
        </template>
        <v-card class="mb-5" width="400">
            <v-toolbar density="compact" :color="bgColor" class="text-white">
                <v-icon class="ml-2" :icon="'mdi-information-outline'"></v-icon>
                <v-card-title class="pl-2" :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6 ml-0">Dialog Warning</span><br />
                </v-card-title>
            </v-toolbar>
            <v-card-text> This is content </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const bgColor = 'amber-darken-3'
const dialog = ref(false)
</script>
