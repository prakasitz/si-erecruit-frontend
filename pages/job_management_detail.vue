<template>
    <div>
        <TopicBar :labels="['หนัาหลัก', 'นำเข้าไฟล์']" />
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
        <br />
        <v-card class="mx-auto" width="400" prepend-icon="mdi-home">
            <template v-slot:title>Hello from Vuetify!</template>
            <v-card-text>When you see this inside a card, it worked!</v-card-text>
        </v-card>
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
