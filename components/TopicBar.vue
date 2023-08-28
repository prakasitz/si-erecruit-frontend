<template>
    <v-app-bar scroll-behavior="elevate">
        <v-row no-gutters>
            <v-col cols="12">
                <v-sheet class="ma-0s pa-0" max-height="70">
                    <v-row>
                        <v-col cols="6" align-self="center">
                            <v-breadcrumbs
                                v-if="isCandidate"
                                divider=">"
                                :disabled="true"
                                :items="props.labels"
                            ></v-breadcrumbs>
                            <div v-if="isCandidateLayout && (isHR || isAdmin)" class="mx-auto pl-5">
                                <p class="text-h6">
                                    ข้อมูลผู้สมัคร: {{ personal_info?.first_name_th }} {{ personal_info?.last_name_th }} ({{
                                        route.params.id
                                    }})
                                </p>
                            </div>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col class="text-right" align-self="center">
                            <v-menu>
                                <template v-slot:activator="{ props }">
                                    <v-btn :variant="'text'" :size="'large'" v-bind="props">
                                        <template #prepend>
                                            <v-icon class="text-main-color mx-1">mdi-account</v-icon>
                                        </template>
                                        {{ user.displayname }}
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item
                                        v-for="(item, index) in menuItem"
                                        :key="index"
                                        :value="index"
                                        v-bind="item.props"
                                        @click="item.onClick"
                                    >
                                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-app-bar>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAuth } from '~/composables/auth/useAuth'
import { usePersonalStore } from '~/stores/personal.store'
import { useUserStore } from '~/stores/user.store'
import { Profile } from '~/utils/types'

type MenuItem = {
    title: string
    props: any
    onClick?: (event: Event) => Promise<any>
}

export interface Props {
    labels: any[]
}

const props = withDefaults(defineProps<Props>(), {
    labels: () => [{ title: 'หนัาหลัก', href: '/' }],
})

// This will work in both `<script setup>` and `<script>`
const route = useRoute()
const isCandidateLayout = computed(() => route.name === 'candidate-form-id')

const userStore = useUserStore()
const personalStore = usePersonalStore()
const { personal_info } = personalStore
const { logout } = useAuth()
const { user } = userStore
const { isAdmin, isHR, isCandidate } = storeToRefs(userStore)
const menuItem: MenuItem[] = [
    {
        title: 'ข้อมูลส่วนตัว',
        props: { prependIcon: 'mdi-information-outline' },
    },
    { title: 'เปลี่ยนรหัสผ่าน', props: { prependIcon: 'mdi-form-textbox-password' } },
    {
        title: 'ออกจากระบบ',
        props: { prependIcon: 'mdi-logout' },
        onClick: async (event: Event) => {
            console.log(event)
            if (event instanceof PointerEvent) {
                console.log('hello')
                return logout()
            }
        },
    },
]
</script>
