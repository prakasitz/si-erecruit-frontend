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

    <!-- <v-row no-gutters class="d-flex justify-center align-center">
        <v-col class="mx-1" v-for="btn in btnList">
            <v-tooltip :text="btn.text" >
                <template v-slot:activator="{ props }">
                    <v-btn block density="compact" size="small" v-bind="{ ...props, ...btn }"></v-btn>
                </template>
            </v-tooltip>
        </v-col>
    </v-row> -->

    <div class="d-flex justify-center flex-wrap">
        <div v-for="btn in btnList">
            <div class="mx-1">
                <v-tooltip :text="btn.text">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            variant="text"
                            density="compact"
                            v-bind="{ ...props, ...btn }"
                            @click="quickActionHandler($event, btn)"
                        >
                        </v-btn>
                    </template>
                </v-tooltip>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { DialogContext, Job, Profile } from '~/utils/types'

/*

fullname: "รัชชานนท์ กุลชนะนิมิต"
job_ID: 2
phone: "0807199103"
pid: "1100702746247"
profile_ID: 35
profile_status: 3

*/

type PropsProfile = {
    fullname: string
    job_ID: number
    phone: string
    pid: string
    profile_ID: number
    profile_status: number
}

const props = defineProps({
    job: {
        type: Object as PropType<Job>,
        required: true,
    },
    profile: {
        type: Object as PropType<PropsProfile>,
        required: true,
    },
})

const { dialogConfirm, showDialog } = useDialog()

const confirmForDoAction = (event: Event, item: Profile, action: unknown) => {
    const dialog = dialogConfirm()
    showDialog(
        {
            title: 'Confirm to do something',
            dialogColor: 'amber',
            message: `Are you sure do something ${item.profile_ID}?`,
            item: {
                id: item.profile_ID,
            },
            actionButtons: [
                {
                    text: 'ACTION',
                    variant: 'elevated',
                    color: 'red',
                    cb: action,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
        dialog
    )
}

type QuickActionName = QuickActionEnum
enum QuickActionEnum {
    CANCLE_OR_WAIVE = 'CANCLE_OR_WAIVE',
    ACTIVE = 'ACTIVE',
    PUBLISHABLE = 'PUBLISHABLE',
    SUSPEND = 'SUSPEND',
    VERIFY = 'VERIFY',
    VERIFYED = 'VERIFYED',
    DELETE = 'DELETE',
}

import { VBtn } from 'vuetify/lib/components/index.mjs'

type VBtnProps = VBtn['$props'] & ExtraProps
type ExtraProps = {
    id: string
    show?: boolean
    toggle?: {
        condition: (status: string) => boolean
        to: string
    }
    actionName?: QuickActionName
    dialogContext?: DialogContext
    // action?: (event: Event, ...arg: any) => void | Promise<void>
}

const quickActionHandler = (event: Event, { actionName, dialogContext }: any) => {
    console.log('actionHandler', actionName, dialogContext)

    const dialog = dialogConfirm()
    showDialog(dialogContext, dialog)

    // switch (actionName) {
    //     case QuickActionEnum.CANCLE_OR_WAIVE:
    //         break
    //     case QuickActionEnum.ACTIVE:
    //         break
    //     case QuickActionEnum.PUBLISHABLE:
    //         break
    //     case QuickActionEnum.SUSPEND:
    //         break
    //     case QuickActionEnum.VERIFY:
    //         break
    //     case QuickActionEnum.VERIFYED:
    //         break
    //     case QuickActionEnum.DELETE:
    //         break
    //     default:
    //         break
    // }
}

const fullNameWithId = (profile: PropsProfile) => {
    return `${profile.fullname} (${profile.profile_ID})`
}

const getProfileFullname = (profile: PropsProfile) => {
    return profile.fullname
}

const getProfileID = (profile: PropsProfile) => {
    return profile.profile_ID
}

const { cancelProfile } = useButtonAction()
const btnList = ref<VBtnProps[]>([
    {
        id: `btnViewOrEdit-${props.profile.profile_ID}`,
        show: true,
        text: 'View/Edit',
        color: 'primary',
        icon: 'mdi-eye',
        to: `/candidate/form/${props.profile.profile_ID}`,
    },
    {
        id: `btnCancelOrWaive-${props.profile.profile_ID}`,
        text: 'Cancel Or Waive',
        color: 'blue-grey',
        icon: 'mdi-account-off',
        actionName: QuickActionEnum.CANCLE_OR_WAIVE,
        dialogContext: {
            title: 'Choose Cancel or Waive',
            dialogColor: 'blue-grey',
            message: `Please, choose <b>CANCEL or WAIVE</b> for <br> 
                        "${fullNameWithId(props.profile)}" ?`,
            item: {
                id: props.profile.profile_ID,
            },
            actionButtons: [
                {
                    text: 'Cancel',
                    variant: 'elevated',
                    color: 'blue-grey',
                    cb: cancelProfile,
                },
                {
                    text: 'Waive',
                    variant: 'elevated',
                    color: 'blue-grey',
                    cb: cancelProfile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
    },
    {
        id: `btnActive-${props.profile.profile_ID}`,
        text: 'Active',
        color: 'green',
        icon: 'mdi-account-reactivate',
        actionName: QuickActionEnum.ACTIVE,
        dialogContext: {
            title: 'Confirm to Active this profile',
            dialogColor: 'green',
            message: `Are you sure to <b>ACTIVE</b> this profile <br> 
                        "${fullNameWithId(props.profile)}" ?`,
            item: {
                id: props.profile.profile_ID,
            },
            actionButtons: [
                {
                    text: 'Active',
                    variant: 'elevated',
                    color: 'green',
                    cb: cancelProfile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
    },
    {
        id: `btnPublishable-${props.profile.profile_ID}`,
        text: 'Publishable',
        color: 'blue',
        icon: 'mdi-account-network-outline',
        actionName: QuickActionEnum.PUBLISHABLE,
        dialogContext: {
            title: 'Confirm to Publishable this profile',
            dialogColor: 'blue',
            message: `Are you sure to <b>PUBLISHABLE</b> this profile <br> 
                        "${fullNameWithId(props.profile)}" ?`,
            item: {
                id: props.profile.profile_ID,
            },
            actionButtons: [
                {
                    text: 'Publishable',
                    variant: 'elevated',
                    color: 'blue',
                    cb: cancelProfile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
    },
    {
        id: `btnSuspend-${props.profile.profile_ID}`,
        text: 'Suspend',
        color: 'error',
        icon: 'mdi-account-lock',
        actionName: QuickActionEnum.SUSPEND,
        dialogContext: {
            title: 'Confirm to Suspend this profile',
            dialogColor: 'error',
            message: `Are you sure to <b>SUSPEND</b> this profile <br> 
                        "${fullNameWithId(props.profile)}" ?`,
            item: {
                id: props.profile.profile_ID,
            },
            actionButtons: [
                {
                    text: 'Suspend',
                    variant: 'elevated',
                    color: 'error',
                    cb: cancelProfile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
    },
    {
        id: `btnVerify-${props.profile.profile_ID}`,
        text: 'Verify',
        color: 'orange-darken-1',
        icon: 'mdi-account-details',
        actionName: QuickActionEnum.VERIFY,
        dialogContext: {
            title: 'Confirm to Verify this profile',
            dialogColor: 'green',
            message: `Are you sure to <b>VERIFY</b> this profile <br> 
                        "${fullNameWithId(props.profile)}" ?`,
            item: {
                id: props.profile.profile_ID,
            },
            actionButtons: [
                {
                    text: 'Verify',
                    variant: 'elevated',
                    color: 'green',
                    cb: cancelProfile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
    },
    {
        id: `btnVerifyed-${props.profile.profile_ID}`,
        text: 'Verifyed',
        color: 'success',
        icon: 'mdi-account-check',
        actionName: QuickActionEnum.VERIFYED,
        dialogContext: {
            title: 'Confirm to revoke Verify this profile',
            dialogColor: 'orange-darken-1',
            message: `Are you sure to <b>REVOKE VERIFY</b> this profile <br> 
                        "${fullNameWithId(props.profile)}" ?`,
            item: {
                id: props.profile.profile_ID,
            },
            actionButtons: [
                {
                    text: 'Revoke Verify',
                    variant: 'elevated',
                    color: 'orange-darken-1',
                    cb: cancelProfile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
    },
    {
        id: `btnDelete-${props.profile.profile_ID}`,
        text: 'Delete',
        color: 'error',
        icon: 'mdi-delete',
        actionName: QuickActionEnum.DELETE,
        dialogContext: {
            title: 'Confirm to Delete this profile',
            dialogColor: 'error',
            message: `Are you sure to <b>DELETE</b> this profile<br>        
                        "${fullNameWithId(props.profile)}" ? <br>
                        System will Permanently <b>DELETE</b> this profile.`,

            item: {
                id: props.profile.profile_ID,
            },
            actionButtons: [
                {
                    text: 'Delete',
                    variant: 'elevated',
                    color: 'error',
                    cb: cancelProfile,
                },
                {
                    text: 'Cancel',
                    color: 'gray',
                },
            ],
            persistent: true,
        },
    },
])

onMounted(() => {
    // console.log('job', props.job.job_ID)
    // console.log('profile', props.profile.profile_ID)
})
</script>
