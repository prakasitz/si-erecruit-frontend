<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-card-title :style="{ 'font-size': '16px !important' }">
                <b>ยินดีต้อนรับ {{ user.displayname }}</b>
            </v-card-title>
        </v-card>
        <br />
    </div>
</template>

<script setup lang="ts">
// import { useAuthUser } from '~/composables/auth/useAuthUser'
import { useUserStore } from '~/stores/user.store'

definePageMeta({
    pageTransition: {
        name: 'rotate',
    },
    middleware: ['admin-hr-only'],
})

useHead({
    title: 'หน้าหลัก',
})

useBreadcrumb().setBreadcrumbs()

const userStore = useUserStore()
const { user } = userStore

const route = useRoute()
</script>
