<template>
    <v-app-bar scroll-behavior="elevate">
        <v-row no-gutters>
            <v-col cols="12">
                <v-sheet class="ma-0s pa-0" max-height="70">
                    <v-row>
                        <v-col cols="7"> <v-breadcrumbs divider=">" :items="props.labels"></v-breadcrumbs> </v-col>
                        <v-col class="mx-4 pt-7 text-right">
                            <v-icon class="text-main-color mx-1">mdi-account</v-icon>คุณ{{ displayname }}
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/user.store'

// This will work in both `<script setup>` and `<script>`
const userStore = useUserStore()
const { displayname } = userStore

export interface Props {
    labels?: any[]
}

const props = withDefaults(defineProps<Props>(), {
    labels: () => [{ title: 'หนัาหลัก', href: '/' }],
})
</script>
