<template>
    <v-app>
        <v-layout>
            <v-app-bar height="70" color="main-color" prominent elevation="4">
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
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
                    <div v-for="item in items">
                        <v-list-item v-if="item.value != 'Admin'" active-color="main-color" :key="item.title"
                            :value="item.value" :to="item.to">
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item>
                        <v-list-group fluid v-else>
                            <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" :title="item.title"></v-list-item>
                            </template>

                            <v-list-item class="ml-5" v-for="item2 in admins" :key="item2.title" :title="item2.title"
                                :prepend-icon="item2.icon" :value="item2.value" :to="item2.to"></v-list-item>
                        </v-list-group>
                    </div>
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
    {
        title: 'ผู้ดูแลระบบ',
        value: 'Admin',
    },
]
const admins = [
    { title: 'Management', icon: 'mdi-account-multiple-outline', to: "/user_management" },
    { title: 'Settings', icon: 'mdi-cog-outline', to: "/settings" },

]

watch(group, () => {
    drawer.value = false
})
</script>
