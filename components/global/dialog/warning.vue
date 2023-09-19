<template>
    <v-dialog v-model="dialog" width="auto" :persistent="context.persistent">
        <template v-slot:activator="{ props }"> </template>
        <v-card class="mb-5" width="400">
            <v-toolbar density="compact" :color="bgColor" class="text-white">
                <v-icon class="ml-2" :icon="'mdi-information-outline'"></v-icon>
                <v-card-title class="pl-2" :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6 ml-0">{{ context.title }}</span
                    ><br />
                </v-card-title>
            </v-toolbar>
            <v-card-text v-html="context.message"> </v-card-text>
            <v-card-actions v-if="context.actionButtons && context.actionButtons.length > 0">
                <v-spacer></v-spacer>
                <template v-for="button in context.actionButtons">
                    <v-btn :variant="'outlined'" v-bind="button" @click="dialog = !dialog" />
                </template>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const { dialogWarning, dialogContext } = await useDialog()
const bgColor = 'amber-darken-3'

const dialog = dialogWarning()
const context = dialogContext()

watch(dialog, (value) => {
    if (value == false) {
        context.value = defaultDialogContext
    }
})
</script>
