<template>
    <v-app>
        <v-app-bar height="70" scroll-behavior="elevate" class="bg-candidate">
            <template v-slot:prepend>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" />
            </template>
            <v-app-bar-title>
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
            </v-app-bar-title>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" location="left" permanent>
            <v-list class="text-xl">
                <div v-for="item in items4Candidate">
                    <v-list-item
                        v-if="!item.subgroups"
                        :color="'main-color'"
                        :key="item.title"
                        :value="item.value"
                        :to="item.to"
                        :active="useActiveMenu(item.to)"
                    >
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item>

                    <v-list-group fluid v-else>
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :title="item.title"></v-list-item>
                        </template>

                        <v-list-item
                            class="ml-5"
                            v-for="subitem in item.subgroups"
                            :color="'main-color'"
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

        <TopicBar :labels="(route.meta.breadcrumbs as any[])" />

        <v-main :style="{ 'min-height': '90%', 'margin-top': '36px' }" class="bg-background-color">
            <slot> </slot>
        </v-main>

        <BtnScrollToTop :position4show="300" />

        <v-footer app absolute style="font-size: 0.95rem" class="bg-footer-color text-center d-flex flex-column">
            <div class="pt-0">
                ทดสอบ Si-ERecruit Nuxt3 <br />
                V.0.0.1 (Development)
            </div>

            <div>©{{ new Date().getFullYear() }} — <strong>HRIT</strong></div>
        </v-footer>
    </v-app>
</template>

<style></style>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user.store'

const route = useRoute()

useHead({
    titleTemplate: (productCategory) => {
        return productCategory ? `${productCategory} - ${route.meta.title}` : 'Site Title'
    },
    // meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }],
})

// define a ref to store the scroll position

const drawer = ref(true)
const group = ref(null)

const { commonid } = useUserStore()

const items4Candidate: any = [
    {
        title: 'หน้าหลัก',
        value: 'foo',
        to: '/candidate/',
        nav: ['หนัาหลัก'],
    },
    {
        title: 'จัดการข้อมูลผู้สมัคร',
        value: 'foo2',
        to: `/candidate/form/${commonid ?? route.params.id}`,
        nav: [
            {
                title: 'หน้าหลัก',
                href: '/candidate/',
            },
            'จัดการข้อมูลผู้สมัคร',
        ],
    },
]

// define a function to scroll to the top of the page

onUpdated(() => {
    console.log('route on update: ', route.fullPath, route.path)
})

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
