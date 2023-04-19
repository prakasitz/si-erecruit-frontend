<template>
    <div>
        <TopicBar :labels="['จัดการงาน']" />
        <v-card class="mx-auto" width="90%">
            <v-card-title :style="{ 'font-weight': 'bold', 'font-size': '16px !important' }">
                <span class="text-h5 font-weight-bold text-main-color"> รายชื่องานที่นำข้อมูลเข้า </span><br />

                <span :style="['font-family: \'Krub-Bold\' !important']" class="text-h6 font-weight-bold">
                    ได้ทำการนำข้อมูลเข้าแล้ว <span style="color: red">79</span> รายการ
                </span>
            </v-card-title>
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
