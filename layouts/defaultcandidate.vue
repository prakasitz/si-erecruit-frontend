<template>
    <v-app>
        <v-app-bar height="70" scroll-behavior="elevate" class="bg-candidate">
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
                <v-btn size="x-large" variant="text" color="white" icon="mdi-cog-outline" id="settings-menu"> </v-btn>
                <v-menu activator="#settings-menu">
                    <v-list>
                        <v-list-item v-for="item in ['admin', 'candidate']" :key="item" :value="item"
                            @click="setRole(item)">
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="left" permanent>
            <v-list class="text-xl">
                <div v-for="item in items">
                    <v-list-item v-if="!item.subgroups" active-color="main-color" :key="item.title" :value="item.value"
                        :to="item.to">
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>

                    <v-list-group @click="'asdasd'" fluid v-else>
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :title="item.title"></v-list-item>
                        </template>

                        <v-list-item class="ml-5" v-for="subitem in item.subgroups" active-color="main-color"
                            :key="subitem.value" :title="subitem.title" :prepend-icon="subitem.icon" :value="subitem.value"
                            :to="subitem.to ?? undefined" :href="subitem.href ?? undefined"></v-list-item>
                    </v-list-group>
                </div>
            </v-list>
        </v-navigation-drawer>

        <v-main :style="{ 'min-height': '90%', 'margin-top': '36px' }" class="bg-background-color">
            <slot> </slot>
        </v-main>
        <v-layout-item
            class="text-end pointer-events-none"
            style="
                z-index: 1007;
                transform: translateY(0%);
                position: fixed;
                height: inherit;
                bottom: 1.25rem;
                width: calc((100% - 0px) - 0px);
                left: -1.25rem;
            "
            position="bottom"
        >
            <Transition name="swing">
                <v-btn
                    ref="scrollButton"
                    v-if="!shouldShowButton"
                    size="large"
                    color="main-color"
                    elevation="8"
                    class="pointer-events-initial"
                    density="default"
                    icon="mdi-chevron-up"
                    style="transform-origin: center center"
                    @click="scrollToTop"
                ></v-btn>
            </Transition>
        </v-layout-item>

        <v-footer app absolute style="font-size: 0.95rem" class="bg-footer-color text-center d-flex flex-column">
            <div class="pt-0">
                ทดสอบ Si-ERecruit Nuxt3 <br />
                V.0.0.1 (Development)
            </div>

            <div>©{{ new Date().getFullYear() }} — <strong>HRIT</strong></div>
        </v-footer>
    </v-app>
</template>

<style>
.swing-enter-active,
.swing-leave-active {
    transition: transform 0.2 linear;
}

.swing-enter-to {
    transform-style: preserve-3D;
    transform: scale(1);
}

.swing-leave-to {
    transform-style: preserve-3D;
    transform: scale(0);
}

.pointer-events-none {
    pointer-events: none;
}
.pointer-events-initial {
    pointer-events: initial;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'

// define a ref to store the scroll position
const scrollPosition = ref(0)
const scrollButton = ref(null)

// define a function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

function setButtonDisplayNone() {
    scrollButton.value.style.display = 'none'
}

const shouldShowButton = computed(() => scrollPosition.value < 50)

onMounted(() => {
    window.addEventListener('scroll', () => {
        scrollPosition.value = window.pageYOffset
    })
})

onUnmounted(() => {
    window.removeEventListener('scroll', () => {
        scrollPosition.value = window.pageYOffset
    })
})

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

<style scoped>
.v-layout:deep() .bg-candidate {
    background: linear-gradient(135deg, #b6dbde, #74c0f2) !important;
}

.v-layout:deep() .bg-candidate-error {
    background: linear-gradient(135deg, #deb6c0, #f27474);
}

.v-layout:deep() .bg-card-candidate {
    background: #e3f2f9 !important;
    color: #5c7b9c;
}

.v-layout:deep() .bg-header-card {
    background: linear-gradient(315deg, #b6dbde, #74c0f2);
    color: #fff;
}

.v-layout:deep() .bg-header-card-error {
    background: linear-gradient(315deg, #ffc67b, #f27474);
    color: #fff;
}

.v-layout:deep() .btn-candidate {
    color: #fff !important;
    background: #5c7b9c !important;
}

.v-layout:deep() .btn-candidate-add {
    color: #044d06 !important;
    border: 1px solid #044d06;
}

.v-layout:deep() .btn-candidate-del {
    color: red !important;
    border: 1px solid red;
}


.v-layout:deep() .text-main-color {
    color: #5c7b9c !important;
}

.v-layout:deep() .text-main {
    background: #fff;
    color: #5c7b9c !important;
}

.v-layout:deep() .box-detail {
    border: 1px solid #74c0f2;
    border-radius: 5px;
    padding: 15px;
}
</style>
