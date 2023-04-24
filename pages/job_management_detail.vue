<template>
    <div>
        <TopicBar
            :labels="[{ title: 'หนัาหลัก', href: '/' }, { title: 'จัดการงาน', to: '/job_management' }, 'รายละเอียดงาน']"
        />
        <v-card class="mx-auto" width="90%">
            <v-toolbar density="compact" color="main-color">
                <v-card-title :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6">รายละเอียดงาน</span><br />
                </v-card-title>
            </v-toolbar>
            <v-card-text class="d-flex justify-center">
                <v-container>
                    <FormJobDetail></FormJobDetail>
                </v-container>
            </v-card-text>
        </v-card>

        <v-card class="mx-auto my-5" width="90%">
            <v-toolbar density="compact" color="amber-darken-2">
                <v-card-title :style="{ 'font-size': '16px !important' }">
                    <span class="text-h6 text-white">รายละเอียดผู้สมัคร</span><br />
                </v-card-title>
            </v-toolbar>
            <v-card-text class="d-flex justify-center">
                <v-container>
                    <h1 class="test-h1 text-center">ฝากด้วยครับ</h1>
                </v-container>
            </v-card-text>
        </v-card>
        <br />
    </div>
</template>

<script setup>
definePageMeta({
    title: 'รายละเอียดงาน',
    pageTransition: {
        name: 'rotate',
    },
})

const route = useRoute()
console.log(route.meta.title) // My home page
</script>
