<template>
    <div>
        <TopicBar :labels="['หน้าหลัก', 'จัดการงาน']" />
        <v-card class="mx-auto" width="90%">
            <v-card-item>
                <v-card-title :style="{ 'font-size': '18px !important' }">
                    <b class="text-h6 text-main-color"> รายชื่องานที่นำข้อมูลเข้า </b><br />

                    <b> ได้ทำการนำข้อมูลเข้าแล้ว <span style="color: red">79</span> รายการ </b>
                </v-card-title>
            </v-card-item>
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
    title: 'รายชื่องานที่นำข้อมูลเข้า',
    pageTransition: {
        name: 'rotate',
    },
})

const route = useRoute()
console.log(route.meta.title) // My home page
</script>
