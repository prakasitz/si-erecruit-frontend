<template>
    <div>
        <v-card class="mx-auto" width="90%">
            <v-card-title :style="{ 'font-size': '16px !important' }">
                <b>ยินดีต้อนรับคุณ ประกาศิต ช่วยรักษา</b></v-card-title
            >
            <v-card-text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, explicabo voluptas. Mollitia
                quos dicta alias at porro nihil quis, eligendi odio voluptas est repudiandae ex nesciunt suscipit
                consequuntur, quidem asperiores!
            </v-card-text>
        </v-card>
        <br />
    </div>
</template>

<script setup lang="ts">
// This will work in both `<script setup>` and `<script>`
definePageMeta({
    title: 'หน้าหลัก',
    pageTransition: {
        name: 'rotate',
    },
    layout: 'defaultcandidate',
    breadcrumbs: [
        {
            title: 'หน้าหลัก',
        },
    ],
    //middleware: ['candidate-auth'],
})
</script>
