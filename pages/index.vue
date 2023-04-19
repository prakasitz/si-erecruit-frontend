<template>
    <div>
        <TopicBar :labels="['หนัาหลัก']" />
        <v-card class="mx-auto" width="90%">
            <v-card-title :style="{ 'font-weight': 'bold', 'font-size': '16px !important' }"
                >ยินดีต้อนรับคุณ นาย ประกาศิต ช่วยรักษา</v-card-title
            >
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
    title: 'My home page',
    pageTransition: {
        name: 'rotate',
    },
})

const route = useRoute()
console.log(route.meta.title) // My home page
</script>
