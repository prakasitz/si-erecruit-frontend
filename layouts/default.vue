<template>
    <v-app>
        <v-app-bar height="70" scroll-behavior="elevate" color="main-color">
            <template v-slot:prepend>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
            </template>
            <v-app-bar-title>
                <div class="d-inline-flex flex-wrap" no-gutters v-if="role == 'admin'">
                    <v-img :width="45" src="/images/MU_Th_Color.png"></v-img>
                    <v-img class="ml-1" :width="120" src="/images/logo_text.png"></v-img>
                </div>
                <template v-else>
                    <v-row no-gutters class="d-flex align-center">
                        <v-col cols="2">
                            <v-img else :width="220" src="/images/Si_Th_H_Color.png"></v-img>
                        </v-col>
                        <v-col class="ml-5">
                            <div class="d-inline-flex align-end">
                                <v-img :width="150" src="/images/logo_text.png"></v-img>
                                <p class="ml-2">สำหรับตำแหน่งงานทั่วไป</p>
                            </div>
                            <p class="mb-1 text-subtitle-1">
                                แบบฟอร์มกรอกข้อมูลออนไลน์ สำหรับผู้ผ่านการคัดเลือกเพื่อขอบรรจุพนักงานมหาวิทยาลัย
                                (คณะแพทยศาสตร์ศิริราชพยาบาล)
                            </p>
                        </v-col>
                    </v-row>
                </template>
            </v-app-bar-title>

            <template v-slot:append>
                <v-btn size="x-large" variant="text" icon="mdi-cog-outline" id="settings-menu"> </v-btn>
                <v-menu activator="#settings-menu">
                    <v-list>
                        <v-list-item
                            v-for="item in ['admin', 'candidate']"
                            :key="item"
                            :value="item"
                            @click="setRole(item)"
                        >
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="left" permanent>
            <v-list class="text-xl">
                <div v-for="item in items">
                    <v-list-item
                        v-if="!item.subgroups"
                        active-color="main-color"
                        :key="item.title"
                        :value="item.value"
                        :to="item.to"
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
                            active-color="main-color"
                            :key="subitem.value"
                            :title="subitem.title"
                            :prepend-icon="subitem.icon"
                            :value="subitem.value"
                            :to="subitem.to ?? undefined"
                            :href="subitem.href ?? undefined"
                        ></v-list-item>
                    </v-list-group>
                </div>
            </v-list>
        </v-navigation-drawer>
        <v-main :style="{ 'min-height': '90%' }" class="bg-background-color">
            <slot></slot>
        </v-main>

        <v-footer app absolute style="font-size: 0.95rem" class="bg-footer-color text-center d-flex flex-column">
            <div class="pt-0">
                ทดสอบ Si-ERecruit Nuxt3 <br />
                V.0.0.1 (Development)
            </div>

            <div>©{{ new Date().getFullYear() }} — <strong>HRIT</strong></div>
        </v-footer>
    </v-app>
</template>

<script setup>
const drawer = ref(true)
const group = ref(null)
const role = ref(null)

const items = computed(() => (role.value == 'admin' ? items4Admin : items4Candidate))

const setRole = (newRole) => {
    role.value = newRole
}

const items4Admin = reactive([
    {
        title: 'หน้าหลัก',
        value: 'foo',
        to: '/',
    },
    {
        title: 'นำเข้าไฟล์',
        value: 'bar',
        to: '/file_import/',
    },
    {
        title: 'จัดการงาน',
        value: 'fizz',
        to: '/job_management/',
    },
    {
        title: 'ผู้ดูแลระบบ',
        value: 'Admin',
        subgroups: [
            {
                title: 'Management',
                icon: 'mdi-account-multiple-outline',
                value: 'Management',
            },
            {
                title: 'Settings',
                icon: 'mdi-cog-outline',
                value: 'Settings',
            },
        ],
    },
])
const items4Candidate = reactive([
    {
        title: 'หน้าหลัก',
        value: 'foo',
        to: '/candidate/',
    },
    {
        title: 'จัดการข้อมูลผู้สมัคร',
        value: 'bar',
        to: '/candidate/form/',
    },
])

watch(group, () => {
    drawer.value = false
})
</script>

<style>
.text-main-color {
    color: #0176f3 !important;
}
</style>
