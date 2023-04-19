<template>
    <v-app>
        <v-layout>
            <v-app-bar height="70" color="main-color" prominent elevation="4">
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>
                <v-toolbar-title>
                    <v-row no-gutters>
                        <v-col cols="1">
                            <v-img :width="33" src="/images/MU_Th_Color.png"></v-img>
                        </v-col>
                        <v-col>
                            <v-img :width="120" src="/images/logo_text.png"></v-img>
                        </v-col>
                    </v-row>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn size="x-large" variant="text" icon="mdi-cog-outline"></v-btn>
            </v-app-bar>
            <v-navigation-drawer v-model="drawer" location="left" permanent>
                <v-list class="text-xl">
                    <v-list-item
                        v-for="item in items"
                        active-color="main-color"
                        :key="item.title"
                        :value="item.value"
                        :to="item.to"
                    >
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main style="min-height: 100%" class="bg-background-color">
                <slot></slot>
            </v-main>

            <v-footer app style="font-size: 0.95rem" class="bg-footer-color text-center d-flex flex-column">
                <div class="pt-0">
                    ทดสอบ Si-ERecruit Nuxt3 <br />
                    V.0.0.1 (Development)
                </div>

                <div>©{{ new Date().getFullYear() }} — <strong>HRIT</strong></div>
            </v-footer>
        </v-layout>
    </v-app>
</template>

<script setup>
const drawer = ref(true)
const group = ref(null)
const items = [
    {
        title: 'หน้าหลัก',
        value: 'foo',
        to: '/',
    },
    {
        title: 'นำเข้าไฟล์',
        value: 'bar',
        to: '/file_import',
    },
    {
        title: 'จัดการงาน',
        value: 'fizz',
        to: '/job_management',
    },
]

watch(group, () => {
    drawer.value = false
})
</script>
