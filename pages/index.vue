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
    title: 'หน้าหลัก',
    pageTransition: {
        name: 'rotate',
    },
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
        },
    ],
    middleware: ['admin-hr-only'],
})

const userStore = useUserStore()
const { user } = userStore

console.log('index', userStore.user.role)

const route = useRoute()
console.log(route.meta.title) // My home page
</script>
