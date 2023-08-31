<template>
    <!-- Button in Quick 
        Action:
        + View | Edit | 
        + Cancel (Waive) | Active |   
        + Publishable | Suspend | Delete

        Props: 
        + job: Job
        + profile: Profile
    -->

    <v-row no-gutters justify="center">
        <v-col cols="2" v-for="btn in btnList">
            <v-tooltip :text="btn.text">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="{ ...props, ...btn }"></v-btn>
                </template>
            </v-tooltip>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { Job, Profile } from '~/utils/types'

const props = defineProps({
    job: {
        type: Object as PropType<Job>,
        required: true,
    },
    profile: {
        type: Object as PropType<Profile>,
        required: true,
    },
})

import { VBtn } from 'vuetify/lib/components/index.mjs'

type VBtnProps = VBtn['$props'] & Record<string, any>

const btnList = ref<VBtnProps[]>([
    {
        id: 'btnViewOrEdit',
        text: 'View/Edit',
        color: 'primary',
        density: 'compact',
        size: 'small',
        icon: 'mdi-eye',
        to: `/candidate/form/${props.profile.profile_ID}`,
    },
    {
        id: 'btnCancelOrWaive',
        text: 'Cancel Or Waive',
        color: 'grey',
        density: 'compact',
        size: 'small',
        icon: 'mdi-minus',
        toggle: {
            condition: (status: string) => {
                return status !== ProfileStatus.IMPORTED
            },
            to: 'btnActive',
        },
    },
    {
        id: 'btnActive',
        text: 'Active',
        color: 'red',
        density: 'compact',
        size: 'small',
        icon: 'mdi-check',
        toggle: {
            condition: (status: string) => {
                return status === ProfileStatus.CANCELLED || status === ProfileStatus.WAIVED
            },
            to: 'btnActive',
        },
    },
    {
        text: 'Publishable',
        color: 'blue',
        density: 'compact',
        size: 'small',
        icon: 'mdi-eye',
    },
    {
        text: 'Suspended',
        color: 'red',
        density: 'compact',
        size: 'small',
        icon: 'mdi-eye',
    },
    {
        text: 'View',
        color: 'red',
        density: 'compact',
        size: 'small',
        icon: 'mdi-eye',
    },
    {
        text: 'View',
        color: 'red',
        density: 'compact',
        size: 'small',
        icon: 'mdi-eye',
    },
    {
        text: 'View',
        color: 'red',
        density: 'compact',
        size: 'small',
        icon: 'mdi-eye',
    },
])

onMounted(() => {
    console.log('job', props.job.job_ID)
    console.log('profile', props.profile.profile_ID)
})
</script>
