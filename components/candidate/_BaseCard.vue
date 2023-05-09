<template>
    <v-card class="mx-auto" width="90%">
        <v-container>
            <v-card-title class="pa-auto text-h6 text-indigo-darken-2">{{ props.title }}</v-card-title>
            <v-card-subtitle>asdasda</v-card-subtitle>
            <v-card-text>
                <slot name="card-body" />
            </v-card-text>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
export interface Props {
    title?: string
    labels?: any[]
}

const props = withDefaults(defineProps<Props>(), {
    title: 'hello',
})
</script>
