<template>
    <v-app-bar scroll-behavior="elevate">
        <v-row no-gutters>
            <v-col cols="12">
                <v-sheet class="ma-0s pa-0" max-height="70">
                    <v-row>
                        <v-col cols="5"> <v-breadcrumbs divider=">" :items="props.labels"></v-breadcrumbs> </v-col>
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
import { useUserStore } from '~/stores/user.store'

type MenuItem = {
    title: string
    props: any
    onClick?: (event: Event) => Promise<any>
}

// This will work in both `<script setup>` and `<script>`
const userStore = useUserStore()
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

export interface Props {
    labels?: any[]
}

const props = withDefaults(defineProps<Props>(), {
    labels: () => [{ title: 'หนัาหลัก', href: '/' }],
})
</script>
