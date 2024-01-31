<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-card-title :style="{ 'font-size': '16px !important' }">
                <b>ยินดีต้อนรับ {{ user.displayname }}</b>
            </v-card-title>
            <v-card-text class="mx-2" v-if="welcomeData">
                <span class="text-justify" v-html="welcomeData.value" style="white-space: pre-line"></span>
            </v-card-text>
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

const { data: welcomeData } = await useApi('/external/master/welcome', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    transform: (data: any) => {
        const welcome_user_msg = data.find((d: any) => d.setting_key === 'welcome_user_msg')
        return welcome_user_msg
    },
})

console.log(welcomeData.value)
</script>
