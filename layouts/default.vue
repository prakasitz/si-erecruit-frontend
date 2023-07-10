<template>
    <v-app>
        <v-app-bar height="70" scroll-behavior="elevate" color="main-color">
            <template v-slot:prepend>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
            </template>
            <v-app-bar-title>
                <div class="d-inline-flex flex-wrap" no-gutters>
                    <v-img :width="45" src="/images/MU_Th_Color.png"></v-img>
                    <v-img class="ml-1" :width="120" src="/images/logo_text.png"></v-img>
                </div>
            </v-app-bar-title>

            <template v-slot:append>
                <v-btn size="x-large" variant="text" icon="mdi-cog-outline" id="settings-menu"> </v-btn>
                <v-menu activator="#settings-menu">
                    <v-list>
                        <v-list-item
                            v-for="item in ['admin', 'candidate']"
                            :key="item"
                            :value="item"
                            @click="useNavigateTo(item)"
                        >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="left" permanent>
            <v-list class="text-xl">
                <div v-for="item in items4Admin">
                    <v-list-item
                        v-if="!item.subgroups"
                        color="main-color"
                        :key="item.title"
                        :value="item.value"
                        :to="item.to"
                        :active="useActiveMenu(item.to)"
                    >
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>

                    <v-list-group @click="'asdasd'" fluid v-else>
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :title="item.title"></v-list-item>
                        </template>

                        <v-list-item
                            class="ml-5"
                            v-for="subitem in item.subgroups"
                            color="main-color"
                            :key="subitem.value"
                            :title="subitem.title"
                            :prepend-icon="subitem.icon"
                            :value="subitem.value"
                            :to="subitem.to ?? undefined"
                            :href="subitem.href ?? undefined"
                            :active="useActiveMenu(subitem.to)"
                        ></v-list-item>
                    </v-list-group>
                </div>
            </v-list>
        </v-navigation-drawer>
        <TopicBar :labels="route.meta.breadcrumbs" />
        <v-main :style="{ 'min-height': '90%', 'margin-top': '36px' }" class="bg-background-color">
            <slot></slot>
        </v-main>

        <BtnScrollToTop :position4show="300" />

        <v-footer app absolute style="font-size: 0.95rem" class="bg-footer-color text-center d-flex flex-column">
            <div class="pt-0">
                ทดสอบ Si-ERecruit Nuxt3 <br />
                V.0.0.1 ({{ $isDev ? 'Development' : 'Production' }})
            </div>

            <div>©{{ new Date().getFullYear() }} — <strong>HRIT</strong></div>
        </v-footer>
    </v-app>
</template>

<script setup>
const route = useRoute()
const { $isDev } = useNuxtApp()

useHead({
    titleTemplate: (productCategory) => {
        return productCategory ? `${productCategory} - ${route.meta.title}` : 'Site Title'
    },
    // meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }],
})

const drawer = ref(true)
const group = ref(null)

const items4Admin = [
    {
        title: 'หน้าหลัก',
        value: 'foo',
        to: '/',
        nav: ['หน้าหลัก'],
    },
    {
        title: 'นำเข้าไฟล์',
        value: 'bar',
        to: '/file_import/',
        nav: [
            {
                title: 'หนัาหลัก',
                href: '/',
            },
            'นำเข้าไฟล์',
        ],
    },
    {
        title: 'จัดการงาน',
        value: 'fizz',
        to: '/job_management/',
        nav: [
            {
                title: 'หนัาหลัก',
                href: '/',
            },
            'จัดการงาน',
        ],
    },
    {
        title: 'ผู้ดูแลระบบ',
        value: 'Admin',
        subgroups: [
            {
                title: 'Management',
                icon: 'mdi-account-multiple-outline',
                value: 'Management',
                to: '/user_management/',
                nav: [
                    {
                        title: 'หนัาหลัก',
                        href: '/',
                    },
                    'Management',
                ],
            },
            {
                title: 'Settings',
                icon: 'mdi-cog-outline',
                value: 'Settings',
                to: '/settings/',
                nav: [
                    {
                        title: 'หนัาหลัก',
                        href: '/',
                    },
                    'Settings',
                ],
            },
        ],
    },
]
//hooks

onUpdated(() => {
    console.log(route.fullPath)
})

watch(group, () => {
    drawer.value = false
})
</script>

<style>
.text-main-color {
    color: #0176f3 !important;
}
</style>
