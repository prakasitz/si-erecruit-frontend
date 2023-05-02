<template>
    <div>
        <TopicBar :labels="['หนัาหลัก']" />
        <v-card class="mx-auto" width="90%">
            <v-card-title :style="{ 'font-size': '16px !important' }"><b>ยินดีต้อนรับคุณ ประกาศิต
                    ช่วยรักษา</b></v-card-title>
        </v-card>
        <br />
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
