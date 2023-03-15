<template>
    <NuxtLayout>
        <div>
            <TopicBar />
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
    </NuxtLayout>
</template>

<script setup></script>
